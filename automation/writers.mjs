import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { applyAnnouncement } from './shared/contract.ts';
import { hash, saveJson } from './collector.mjs';

export async function writeVolleyball(checkout, events) {
  const file = join(checkout, 'src/data/codes-automated.json');
  const before = JSON.parse(await readFile(file, 'utf8'));
  const baseline = JSON.parse(await readFile(join(checkout, 'src/data/codes-baseline.json'), 'utf8'));
  let data = before; const conflicts = [];
  for (const event of events.filter(e => e.gameId === 'volleyball-legends')) {
    const result = applyAnnouncement(data, event, baseline); data = result.data; conflicts.push(...result.conflicts);
  }
  const { revision: _revision, ...content } = data;
  const changed = JSON.stringify(content) !== JSON.stringify((({ revision, ...rest }) => rest)(before));
  const revision = changed ? hash(content) : before.revision;
  if (changed) await saveJson(file, { ...content, revision });
  return { changed, revision, conflicts };
}
export function command(executable, args, cwd, env = process.env) {
  return new Promise((resolve, reject) => {
    const safeEnv = { ...env };
    for (const key of ['OPENAI_API_KEY', 'CODEX_API_KEY', 'DISCORD_BOT_TOKEN', 'BRIXUMI_UPDATE_TOKEN', 'VERCEL_TOKEN']) delete safeEnv[key];
    const proc = spawn(executable, args, { cwd, env: safeEnv, stdio: ['ignore', 'pipe', 'pipe'] });
    let output = ''; proc.stdout.on('data', data => { output = (output + data).slice(-200000); });
    // Never relay subprocess output that may include remote credentials.
    proc.stderr.on('data', () => {});
    proc.on('error', () => reject(Error(`command-unavailable:${executable}`)));
    proc.on('exit', code => code === 0 ? resolve(output.trim()) : reject(Error(`command-failed:${executable}:${args[0] ?? ''}:${code}`)));
  });
}
const timeout = () => AbortSignal.timeout(30000);
async function jsonFetch(url, init = {}) {
  const r = await fetch(url, { ...init, redirect: 'error', signal: timeout() });
  if (!r.ok) throw Error(`http-${r.status}:${new URL(url).hostname}`);
  return r.json();
}
export async function publishBrixumi(events, token, { fetchJson = jsonFetch, fetchPage = fetch } = {}) {
  if (!token) throw Error('missing-BRIXUMI_UPDATE_TOKEN');
  const receipts = [];
  for (const gameId of [...new Set(events.map(e => e.gameId))]) {
    const gameEvents = events.filter(e => e.gameId === gameId);
    let result; let anyChanged = false; const allConflicts = [];
    for (let offset = 0; offset < gameEvents.length; offset += 25) {
    result = await fetchJson('https://brixumi.com/api/automation/codes', {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, events: gameEvents.slice(offset, offset + 25) }),
    });
    anyChanged ||= Boolean(result.changed); allConflicts.push(...(result.conflicts ?? []));
    }
    const live = await fetchJson(`https://brixumi.com/api/automation/codes?gameId=${encodeURIComponent(gameId)}`);
    if (live.revision < result.revision) throw Error('brixumi-readback-revision-mismatch');
    const response = await fetchPage(`https://brixumi.com/games/${encodeURIComponent(gameId)}/codes?verify=${result.revision}`, { signal: timeout(), cache: 'no-store' });
    if (!response.ok) throw Error('brixumi-page-unavailable');
    const html = await response.text();
    for (const code of live.codes) if (!html.includes(`<code>${escapeHtml(code.code)}</code>`)) throw Error('brixumi-visible-code-missing');
    receipts.push({ gameId, revision: result.revision, conflicts: allConflicts, changed: anyChanged });
  }
  return receipts;
}
function escapeHtml(s) { return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;'); }
export async function verifyVolleyball(revision, fetchJson = jsonFetch, fetchPage = fetch) {
  const data = await fetchJson(`https://www.volleyballlegends.wiki/api/code-status?verify=${revision}`);
  if (data.revision !== revision) throw Error('volleyball-live-revision-mismatch');
  const response = await fetchPage(`https://www.volleyballlegends.wiki/codes?verify=${revision}`, { signal: timeout(), cache: 'no-store' });
  if (!response.ok) throw Error('volleyball-page-unavailable');
  const html = await response.text();
  for (const code of data.active) if (!html.includes(`<code>${escapeHtml(code.code)}</code>`) || !html.includes(escapeHtml(code.reward))) throw Error('volleyball-visible-code-or-reward-missing');
  return true;
}
export async function triggerVercel(commit, env = process.env) {
  if (!env.VERCEL_TOKEN) throw Error('missing-VERCEL_TOKEN');
  return jsonFetch(`https://api.vercel.com/v13/deployments?slug=${encodeURIComponent(env.VERCEL_TEAM_SLUG || "jasperchous-projects-84a4d356")}`, {
    method: 'POST', headers: { Authorization: `Bearer ${env.VERCEL_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'volleyball-legends-wiki', project: env.VERCEL_PROJECT_ID || "volleyball-legends-wiki", target: 'production',
      gitSource: { type: 'github', repoId: "1176003381", ref: commit, sha: commit } }),
  });
}
export async function waitVercel(id, env = process.env) {
  for (let attempt = 0; attempt < 50; attempt++) {
    const d = await jsonFetch(`https://api.vercel.com/v13/deployments/${encodeURIComponent(id)}?slug=${encodeURIComponent(env.VERCEL_TEAM_SLUG || "jasperchous-projects-84a4d356")}`, { headers: { Authorization: `Bearer ${env.VERCEL_TOKEN}` } });
    if (d.readyState === 'READY') return;
    if (['ERROR', 'CANCELED'].includes(d.readyState)) throw Error('vercel-deployment-failed');
    await new Promise(resolve => setTimeout(resolve, 12000));
  }
  throw Error('vercel-deployment-timeout');
}
export async function publishVolleyball(checkout, events, site, persist, deps = {}) {
  const run = deps.command ?? command;
  if (site.deploymentId && site.phase === 'deploying') {
    try { await (deps.waitVercel ?? waitVercel)(site.deploymentId); } catch (error) {
      if (error.message === 'vercel-deployment-failed') { site.phase = 'committed'; site.deploymentId = null; await persist(); }
      throw error;
    }
    await (deps.verifyVolleyball ?? verifyVolleyball)(site.revision);
    site.phase = 'published'; await persist(); return;
  }
  const result = await writeVolleyball(checkout, events);
  site.conflicts = result.conflicts; site.revision = result.revision; site.changed = result.changed;
  if (result.changed) {
    const files = (await run('git', ['diff', '--name-only'], checkout)).split('\n').filter(Boolean);
    if (files.some(file => file !== 'src/data/codes-automated.json')) throw Error('unexpected-changed-file');
    await run('npm', ['run', 'check:codes'], checkout);
    await run('npm', ['run', 'lint'], checkout);
    await run('npm', ['run', 'build'], checkout);
    await run('git', ['add', '--', 'src/data/codes-automated.json'], checkout);
    await run('git', ['-c', 'user.name=Official Codes Bot', '-c', 'user.email=official-codes-bot@users.noreply.github.com', 'commit', '-m', 'Update codes from official Discord announcements'], checkout);
    await run('git', ['push', 'origin', 'HEAD:main'], checkout); // rejects branch protections / races
    site.phase = 'committed'; site.commit = await run('git', ['rev-parse', 'HEAD'], checkout); await persist();
  }
  if (!result.changed && site.phase !== 'committed') {
    // Retry can arrive after a crash between push and state persistence.
    try { await (deps.verifyVolleyball ?? verifyVolleyball)(site.revision); site.phase = 'published'; await persist(); return; } catch { /* explicitly redeploy this commit */ }
    site.commit = await run('git', ['rev-parse', 'HEAD'], checkout);
  }
  site.commit = await run('git', ['rev-parse', 'HEAD'], checkout);
  const deployment = await (deps.triggerVercel ?? triggerVercel)(site.commit);
  site.deploymentId = deployment.id; site.phase = 'deploying'; await persist();
  await (deps.waitVercel ?? waitVercel)(deployment.id);
  await (deps.verifyVolleyball ?? verifyVolleyball)(site.revision);
  site.phase = 'published'; await persist();
}
