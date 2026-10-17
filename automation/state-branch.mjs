import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { command } from './writers.mjs';
const repo = process.env.GITHUB_REPOSITORY;
if (!/^[\w.-]+\/[\w.-]+$/.test(repo ?? '')) throw Error('missing-or-invalid-GITHUB_REPOSITORY');
const directory = resolve(process.env.STATE_CHECKOUT ?? '.state');
const branch = 'codes-automation-state';
await mkdir(directory, { recursive: true });
if (process.argv[2] === 'load') {
  await command('git', ['init', '-q'], directory);
  await command('git', ['remote', 'add', 'origin', `https://github.com/${repo}.git`], directory);
  // Read the checkout's existing scoped Git authentication, never print or copy credentials to state.
  const header = await command('git', ['config', '--get', 'http.https://github.com/.extraheader'], process.cwd());
  await command('git', ['config', 'http.https://github.com/.extraheader', header], directory);
  const refs = await command('git', ['ls-remote', '--heads', 'origin', branch], directory);
  if (refs) {
    await command('git', ['fetch', '--depth=1', 'origin', branch], directory);
    await command('git', ['checkout', '-B', branch, 'FETCH_HEAD'], directory);
  } else await command('git', ['checkout', '--orphan', branch], directory);
} else if (process.argv[2] === 'save') {
  try { JSON.parse(await readFile(`${directory}/state.json`, 'utf8')); } catch { throw Error('state-not-written-no-push'); }
  await writeFile(`${directory}/vercel.json`, JSON.stringify({ git: { deploymentEnabled: false } }) + '\n');
  await command('git', ['add', '--', 'state.json', 'vercel.json'], directory);
  if (await command('git', ['diff', '--cached', '--name-only'], directory)) {
    await command('git', ['-c', 'user.name=Official Codes Bot', '-c', 'user.email=official-codes-bot@users.noreply.github.com', 'commit', '-m', 'Persist official code processing state'], directory);
    await command('git', ['push', 'origin', `HEAD:${branch}`], directory);
  }
} else throw Error('use-load-or-save');
