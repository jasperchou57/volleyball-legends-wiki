import { existsSync } from 'node:fs';
import { readFile, mkdir, rm, appendFile } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initialState, loadState, saveJson, collect, discordGet } from './collector.mjs';
import { prepareExtraction, acceptExtraction, runLocalCodex } from './extract.mjs';
import { publishBrixumi, publishVolleyball } from './writers.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const command = process.argv[2] ?? 'status';
const stateFile = resolve(process.env.AUTOMATION_STATE_FILE ?? join(root, 'state/state.json'));
const work = resolve(process.env.AUTOMATION_WORK_DIR ?? join(root, '.run'));
const configFile = resolve(process.env.AUTOMATION_CHANNELS_FILE ?? join(root, existsSync(join(root, 'channels.json')) ? 'channels.json' : 'automation/channels.json'));
if (!process.env.GITHUB_ACTIONS) { try { process.loadEnvFile(join(root, '.env')); } catch { /* CI uses scoped environment */ } }
await mkdir(dirname(stateFile), { recursive: true });
const lock = `${stateFile}.lock`;
try { await mkdir(lock); } catch { console.error('Another local run owns the state lock. Check the process before removing the lock.'); process.exit(2); }
let state;
try {
  state = await loadState(stateFile);
  const persist = () => saveJson(stateFile, state);
  if (command === 'prepare' || command === 'run' || command === 'next') {
    if (command !== 'next') {
    if (!process.env.DISCORD_BOT_TOKEN) throw Error('missing-DISCORD_BOT_TOKEN');
    const channels = JSON.parse(await readFile(configFile, 'utf8'));
    await collect(state, channels, route => discordGet(route, process.env.DISCORD_BOT_TOKEN));
    await persist();
    }
    const prepared = await prepareExtraction(state, work);
    await persist();
    if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `has_work=${prepared.hasWork}\nhas_images=${prepared.files.length > 0}\ncodex_args=${JSON.stringify(prepared.files.length ? ['--skip-git-repo-check', '--image', prepared.files.join(',')] : ['--skip-git-repo-check'])}\n`);
    if (command === 'run' && prepared.hasWork) {
      const result = await runLocalCodex(work, prepared.files);
      const second = prepared.files.length ? await runLocalCodex(work, prepared.files, 'second.json') : null;
      acceptExtraction(state, prepared.batch, result, second); await persist();
    }
  }
  if (command === 'accept') {
    const batch = JSON.parse(await readFile(join(work, 'batch.json'), 'utf8'));
    const result = JSON.parse(await readFile(join(work, 'result.json'), 'utf8'));
    let second = null; try { second = JSON.parse(await readFile(join(work, 'second.json'), 'utf8')); } catch { /* images fail closed */ }
    acceptExtraction(state, batch, result, second); await persist();
  }
  if (command === 'retry-extraction') {
    const id = process.argv[3]; if (!state.messages[id]) throw Error('unknown-message-id');
    state.messages[id].pending = true; await persist();
  }
  if (command === 'publish' || command === 'run') {
    const errors = [];
    const games = [...new Set(Object.values(state.messages).filter(m => m.parsed).map(m => m.parsed.gameId))];
    for (const game of games) for (const name of ['brixumi', ...(game === 'volleyball-legends' ? ['volleyball'] : [])]) {
      const site = state.sites[`${name}:${game}`] ??= { phase: 'idle', receipts: {} };
      const pending = Object.values(state.messages).filter(m => m.parsed?.gameId === game && site.receipts[m.parsed.receivedMessageId] !== m.parsed.hash);
      if (!pending.length && site.phase === 'published') continue;
      if (!pending.length && !site.batch) continue;
      // Freeze the batch before doing external work. A resumed deployment cannot acknowledge newer messages.
      site.batch ??= pending.map(m => m.parsed);
      if (!site.batch.length) continue;
      await persist();
      try {
        if (name === 'brixumi') {
          const receipts = await publishBrixumi(site.batch, process.env.BRIXUMI_UPDATE_TOKEN);
          site.conflicts = receipts.flatMap(r => r.conflicts); site.changed = receipts.some(r => r.changed); site.phase = 'published'; site.revision = receipts[0]?.revision;
        } else {
          const checkout = process.env.VOLLEYBALL_CHECKOUT;
          if (!checkout) throw Error('missing-VOLLEYBALL_CHECKOUT');
          await publishVolleyball(resolve(checkout), site.batch, site, persist);
        }
        if (site.conflicts?.length) site.phase = site.changed ? 'published-with-exceptions' : 'review-required';
        for (const event of site.batch) site.receipts[event.receivedMessageId] = event.hash;
        site.batch = null; site.error = null; site.publishedAt = new Date().toISOString();
      } catch (error) { site.error = error.message; errors.push({ site: name, game, error: error.message }); }
      await persist();
    }
    if (errors.length) { console.error(JSON.stringify(errors)); process.exitCode = 1; }
  }
  const summary = { collectedChannels: Object.keys(state.channels).length, officialMessages: Object.keys(state.messages).length,
    pendingExtraction: Object.values(state.messages).filter(m => m.pending).length, fetchErrors: state.errors,
    exceptions: Object.values(state.messages).flatMap(m => (m.issues ?? []).map(issue => ({ message: m.envelope.receivedMessageId, issue }))),
    sites: Object.fromEntries(Object.entries(state.sites).map(([name, site]) => [name, { phase: site.phase, revision: site.revision, publishedAt: site.publishedAt, error: site.error, conflicts: site.conflicts }])) };
  await saveJson(join(work, 'summary.json'), summary);
  console.log(JSON.stringify(summary, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `### Official code automation\n\n\`\`\`json\n${JSON.stringify(summary, null, 2)}\n\`\`\`\n`);
  if (state.errors.length) process.exitCode = 1;
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { await rm(lock, { recursive: true, force: true }); }
