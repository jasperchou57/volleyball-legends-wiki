import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { collect, initialState, normalizeMessage, hash, saveJson, loadState, verifySourceCoverage } from '../collector.mjs';
import { applyAnnouncement, emptyData, validateObservation, assertEnvelope } from '../shared/contract.ts';
import { acceptExtraction, chatgptEnvironment } from '../extract.mjs';
import { writeVolleyball, publishVolleyball, publishBrixumi, waitGitPublication } from '../writers.mjs';

const channel = { gameId: 'volleyball-legends', channelId: '1560933912740495442', trustedSource: { guildId: '1328110081136398427', channelId: '1328110082226913470' } };
function raw(id = '1560951689320857671') { return { id, channel_id: channel.channelId, type: 0, flags: 2, timestamp: '2026-10-17T12:00:00Z', content: 'New code TEST_ONLY_ALPHA: 5 Lucky Style Spins', message_reference: { guild_id: channel.trustedSource.guildId, channel_id: channel.trustedSource.channelId, message_id: '1560951689320857600' }, embeds: [], attachments: [] }; }
function event() { const a = normalizeMessage(raw(), channel, '2026-10-17T13:00:00Z').envelope; a.observations = [{ code: 'TEST_ONLY_ALPHA', status: 'active', reward: '5 Lucky Style Spins', segment: 'body', quote: a.segments[0].text }]; return a; }
test('system Follow notifications and ordinary messages never become official announcements', () => {
  assert.equal(normalizeMessage({ ...raw(), type: 12 }, channel), null);
  assert.equal(normalizeMessage({ ...raw(), flags: 0 }, channel), null);
  assert.equal(normalizeMessage({ ...raw(), message_reference: { ...raw().message_reference, guild_id: '000000000000000000' } }, channel), null);
});
test('new code, repeated delivery, omission, explicit expiration', () => {
  const a = event(), first = applyAnnouncement(emptyData(), a);
  assert.equal(first.data.codes.length, 1);
  assert.equal(applyAnnouncement(first.data, a).changed, false);
  const other = { ...a, messageId: '1560951689320857601', hash: hash('other'), observations: [] };
  assert.equal(applyAnnouncement(first.data, other).data.codes[0].status, 'active');
  const expiry = { ...other, segments: [{ id: 'body', text: 'TEST_ONLY_ALPHA has expired' }], observations: [{ ...a.observations[0], status: 'expired', reward: null, quote: 'TEST_ONLY_ALPHA has expired' }] };
  assert.equal(applyAnnouncement(first.data, expiry).data.codes[0].status, 'expired');
});
test('one conflicting code does not suspend valid entries', () => {
  const a = event(); a.segments[0].text += '\nNew code TEST_ONLY_BETA: 3 Lucky Ability Spins';
  a.observations.push({ code: 'TEST_ONLY_BETA', reward: '3 Lucky Ability Spins', status: 'active', segment: 'body', quote: 'New code TEST_ONLY_BETA: 3 Lucky Ability Spins' });
  const r = applyAnnouncement(emptyData(), a, [{ code: 'TEST_ONLY_ALPHA', reward: '9 Gems', status: 'active' }]);
  assert.deepEqual(r.data.codes.map(c => c.code), ['TEST_ONLY_BETA']); assert.equal(r.conflicts.length, 1);
});
test('edited announcements correct their own reward and preserve removed codes', () => {
  const a = event(); const first = applyAnnouncement(emptyData(), a);
  const edit = { ...a, editedTimestamp: '2026-10-17T12:30:00Z', hash: hash('edit'), segments: [{ id: 'body', text: 'New code TEST_ONLY_ALPHA: 10 Lucky Style Spins' }], observations: [{ ...a.observations[0], reward: '10 Lucky Style Spins', quote: 'New code TEST_ONLY_ALPHA: 10 Lucky Style Spins' }] };
  const second = applyAnnouncement(first.data, edit); assert.equal(second.data.codes[0].reward, '10 Lucky Style Spins');
  const deletedClaim = { ...edit, hash: hash('removed'), observations: [] };
  assert.equal(applyAnnouncement(second.data, deletedClaim).data.codes[0].status, 'active');
});
test('wrong quote, invented reward, implicit expiry, and source spoofing fail closed', () => {
  const a = event(); assert.ok(validateObservation(a, { ...a.observations[0], reward: '100 Gems' }));
  assert.ok(validateObservation(a, { ...a.observations[0], quote: 'made up' }));
  assert.ok(validateObservation(a, { ...a.observations[0], status: 'expired', reward: null }));
  assert.throws(() => applyAnnouncement(emptyData(), { ...a, guildId: '000000000000000000' }));
});
test('older messages cannot overwrite newer evidence and no inferred reactivation', () => {
  const a = event(), first = applyAnnouncement(emptyData(), a);
  const older = { ...a, hash: hash('old'), timestamp: '2026-10-16T12:00:00Z' };
  assert.equal(applyAnnouncement(first.data, older).changed, false);
  assert.equal(applyAnnouncement(emptyData(), a, [{ code: a.observations[0].code, reward: '5 Lucky Style Spins', status: 'expired' }]).data.codes.length, 0);
});
test('pagination reads more than 20 and preserves cursor on network failure', async () => {
  const state = initialState(); state.channels[channel.channelId] = { cursor: '1560951689320857500' };
  let calls = 0;
  await collect(state, [channel], async route => { calls++; if (route.includes('before=')) return [raw('1560951689320857500')]; return Array.from({ length: 100 }, (_, i) => raw(String(1560951689320857700n - BigInt(i)))); });
  assert.equal(calls, 2); assert.equal(Object.keys(state.messages).length, 101);
  const cursor = state.channels[channel.channelId].cursor;
  await collect(state, [channel], async () => { throw Error('fetch-failed'); });
  assert.equal(state.channels[channel.channelId].cursor, cursor); assert.equal(state.errors.length, 1);
});
test('empty fetch and deleted message preserve known status', async () => {
  const state = initialState(), a = event(); state.messages[a.receivedMessageId] = { envelope: a, parsed: a };
  await collect(state, [channel], async route => { if (route.includes('?')) return []; throw Error('discord-http-404'); });
  assert.equal(state.messages[a.receivedMessageId].deleted, true); assert.equal(state.messages[a.receivedMessageId].parsed.observations[0].status, 'active');
});
test('hash ignores capture time and refreshed signed CDN query parameters', () => {
  const a = { ...raw(), attachments: [{ id: 'image', content_type: 'image/png', url: 'https://cdn.discordapp.com/a.png?ex=1' }] };
  const b = { ...a, attachments: [{ ...a.attachments[0], url: 'https://cdn.discordapp.com/a.png?ex=2' }] };
  assert.equal(normalizeMessage(a, channel, '2026-10-17T12:00:00Z').envelope.hash, normalizeMessage(b, channel, '2026-10-17T13:00:00Z').envelope.hash);
});
test('model output cannot choose source IDs, mismatched receipt stays pending', () => {
  const state = initialState(), entry = normalizeMessage(raw(), channel); state.messages[raw().id] = entry;
  acceptExtraction(state, [{ receiptId: raw().id, hash: entry.envelope.hash, images: [] }], { messages: [{ receiptId: 'wrong', hash: entry.envelope.hash }] });
  assert.equal(entry.pending, true);
});
test('image claims require two matching independent readings', () => {
  const entry = normalizeMessage(raw(), channel), a = event();
  const state = initialState(); state.messages[raw().id] = entry;
  const row = { receiptId: raw().id, hash: entry.envelope.hash, observations: [{ ...a.observations[0], segment: 'image:1' }], update: null, images: [{ id: 'image:1', text: a.segments[0].text }], issues: [] };
  const batch = [{ receiptId: raw().id, hash: entry.envelope.hash, images: [{ id: 'image:1' }] }];
  acceptExtraction(state, batch, { messages: [row] }); assert.equal(entry.parsed.observations.length, 0);
  acceptExtraction(state, batch, { messages: [row] }, { messages: [row] }); assert.equal(entry.parsed.observations.length, 1);
});
async function fixture() {
  const dir = await mkdtemp(join(tmpdir(), 'official-codes-test-'));
  await mkdir(join(dir, 'src/data'), { recursive: true });
  await writeFile(join(dir, 'src/data/codes-automated.json'), JSON.stringify({ ...emptyData(), revision: 'baseline' }));
  await writeFile(join(dir, 'src/data/codes-baseline.json'), '[]'); return dir;
}
test('writer is deterministic and touches only managed data', async () => {
  const dir = await fixture(); try {
    await writeFile(join(dir, 'src/data/volleyball.ts'), 'frozen guides and styles');
    assert.equal((await writeVolleyball(dir, [event()])).changed, true);
    assert.equal((await writeVolleyball(dir, [event()])).changed, false);
    assert.equal(await readFile(join(dir, 'src/data/volleyball.ts'), 'utf8'), 'frozen guides and styles');
  } finally { await rm(dir, { recursive: true }); }
});
test('build failure never commits or deploys', async () => {
  const dir = await fixture(), called = []; try {
    await assert.rejects(publishVolleyball(dir, [event()], {}, async () => {}, { command: async (exe, args) => { called.push(args); if (args[0] === 'diff') return 'src/data/codes-automated.json'; if (args[1] === 'build') throw Error('build-failed'); return ''; }, triggerVercel: () => { throw Error('must-not-deploy'); } }));
    assert.ok(!called.some(args => args.includes('commit') || args.includes('push')));
  } finally { await rm(dir, { recursive: true }); }
});
test('failed deployment resumes same ID and is not marked published', async () => {
  const site = { phase: 'deploying', deploymentId: 'existing', revision: 'expected' }; let checked = 0;
  await assert.rejects(publishVolleyball('/unused', [], site, async () => {}, { waitVercel: async () => { throw Error('still-failed'); }, verifyVolleyball: async () => { checked++; } }));
  assert.equal(site.phase, 'deploying'); assert.equal(checked, 0);
  await publishVolleyball('/unused', [], site, async () => {}, { waitVercel: async id => assert.equal(id, 'existing'), verifyVolleyball: async () => { checked++; } });
  assert.equal(site.phase, 'published'); assert.equal(checked, 1);
});
test('Brixumi write alone is not publication: visible readback must pass', async () => {
  await assert.rejects(publishBrixumi([event()], 'test-only-token', { fetchJson: async (_url, init) => init ? { revision: 1, conflicts: [] } : { revision: 1, codes: [{ code: 'TEST_ONLY_ALPHA' }] }, fetchPage: async () => new Response('<html>old page</html>') }), /visible-code-missing/);
});
test('persistent state round trip and corrupt state never silently resets', async () => {
  const dir = await fixture(); try {
    const file = join(dir, 'state.json'); await saveJson(file, initialState()); assert.deepEqual(await loadState(file), initialState());
    await writeFile(file, '{'); await assert.rejects(loadState(file));
  } finally { await rm(dir, { recursive: true }); }
});

test('partial message edits retain immutable evidence for omitted codes', () => {
  const a = event(), first = applyAnnouncement(emptyData(), a);
  const text = 'New code TEST_ONLY_BETA: 3 Lucky Ability Spins';
  const edit = { ...a, editedTimestamp: '2026-10-18T12:00:00Z', capturedAt: '2026-10-18T13:00:00Z', hash: hash('partial-edit'),
    segments: [{ id: 'body', text }], observations: [{ code: 'TEST_ONLY_BETA', status: 'active', reward: '3 Lucky Ability Spins', segment: 'body', quote: text }] };
  const result = applyAnnouncement(first.data, edit);
  assert.equal(result.data.codes.length, 2);
  assert.equal(result.data.codes.find(c => c.code === 'TEST_ONLY_ALPHA').sourceCheckedAt, '2026-10-17');
  assert.equal(result.data.codes.find(c => c.code === 'TEST_ONLY_BETA').sourceCheckedAt, '2026-10-18');
  for (const source of result.data.announcements) {
    assertEnvelope(source);
    for (const o of source.observations) assert.equal(validateObservation(source, o), null);
  }
  for (const row of result.data.codes) assert.ok(result.data.announcements.find(e => e.hash === row.evidenceHash).observations.some(o => o.code === row.code));
  assert.equal(applyAnnouncement(result.data, edit).changed, false);
});

test('deliberate extraction retries publish corrected facts without refetching or freshening dates', () => {
  const entry = normalizeMessage(raw(), channel, '2026-10-17T13:00:00Z');
  const state = initialState(); state.messages[raw().id] = entry;
  const input = [{ receiptId: raw().id, hash: entry.envelope.hash, images: [] }];
  const output = { receiptId: raw().id, hash: entry.envelope.hash, observations: [], update: null, images: [], issues: [] };
  acceptExtraction(state, input, { messages: [output] });
  const firstHash = entry.parsed.hash;
  output.observations = event().observations;
  acceptExtraction(state, input, { messages: [output] });
  const correctedHash = entry.parsed.hash;
  assert.notEqual(correctedHash, firstHash);
  assert.equal(entry.parsed.capturedAt, '2026-10-17T13:00:00Z');
  acceptExtraction(state, input, { messages: [output] });
  assert.equal(entry.parsed.hash, correctedHash);
});

test('local Codex uses existing login and never inherits model API or deployment keys', () => {
  const env = chatgptEnvironment({ PATH: '/bin', HOME: '/home/user', CODEX_HOME: '/user/codex', OPENAI_API_KEY: 'must-not-pass', CODEX_API_KEY: 'must-not-pass', VERCEL_TOKEN: 'must-not-pass', DISCORD_BOT_TOKEN: 'must-not-pass' });
  assert.deepEqual(env, { PATH: '/bin', HOME: '/home/user', CODEX_HOME: '/user/codex' });
});
test('local publication uses Git integration and waits for verified online content without Vercel API', async () => {
  const dir = await fixture(), site = {}, calls = [];
  try {
    await publishVolleyball(dir, [event()], site, async () => {}, { mode: 'git-integration',
      command: async (exe, args) => { calls.push({ exe, args }); if (args[0] === 'diff') return 'src/data/codes-automated.json'; if (args[0] === 'rev-parse') return 'a'.repeat(40); return ''; },
      triggerVercel: () => { throw Error('API must not run'); },
      waitGitPublication: async (commit, revision) => { assert.equal(commit, 'a'.repeat(40)); assert.ok(revision); assert.equal(site.phase, 'awaiting-git-deployment'); },
    });
    assert.equal(site.phase, 'published');
    assert.ok(calls.some(c => c.args[0] === 'push'));
    assert.ok(calls.some(c => c.args.includes('node_modules/next/dist/bin/next')));
    assert.ok(!calls.some(c => c.exe === 'npm'));
  } finally { await rm(dir, { recursive: true }); }
});
test('Git deployment success must match Vercel status and live readback; failure stays retryable', async () => {
  let verified = 0, polls = 0;
  await waitGitPublication('a'.repeat(40), 'revision', { attempts: 2, sleep: async () => {}, fetchStatus: async () => ({ statuses: [{ context: 'Vercel', state: ++polls === 1 ? 'pending' : 'success' }] }), verify: async revision => { assert.equal(revision, 'revision'); verified++; } });
  assert.equal(verified, 1);
  await assert.rejects(waitGitPublication('a'.repeat(40), 'revision', { attempts: 1, fetchStatus: async () => ({ statuses: [{ context: 'Vercel', state: 'failure' }] }), verify: async () => { throw Error('must-not-verify'); } }), /vercel-git-deployment-failed/);
  await assert.rejects(waitGitPublication('a'.repeat(40), 'revision', { attempts: 1, fetchStatus: async () => ({ statuses: [{ context: 'Vercel', state: 'success' }] }), verify: async () => { throw Error('wrong-live-data'); } }), /not-verified/);
});

test('an empty followed feed and inaccessible official source is unverified, never no-update proof', async () => {
  const state = initialState();
  await collect(state, [channel], async () => [ { ...raw(), type: 12 } ]);
  await verifySourceCoverage(state, [channel], async () => { throw Error('discord-http-403'); });
  assert.equal(Object.keys(state.messages).length, 0);
  assert.equal(state.sourceCoverage[channel.channelId].status, 'unverified');
  assert.equal(state.sourceCoverage[channel.channelId].reason, 'discord-http-403');
  assert.equal(state.channels[channel.channelId].lastReadMessageCount, 1);
});
test('source message absent from relay produces an explicit coverage gap', async () => {
  const state = initialState();
  await verifySourceCoverage(state, [channel], async path => path.includes('messages?') ? [{ id: '1560951689320857600' }] : { id: channel.trustedSource.channelId, guild_id: channel.trustedSource.guildId });
  assert.equal(state.sourceCoverage[channel.channelId].reason, 'latest-source-message-not-delivered');
  assert.equal(state.sourceCoverage[channel.channelId].status, 'unverified');
});
