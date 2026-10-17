import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { assertEnvelope, validateObservation } from '../automation/shared/contract.ts';
const data = JSON.parse(await readFile('src/data/codes-automated.json', 'utf8'));
assert.equal(data.version, 1);
assert.equal(new Set(data.codes.map(c => c.code)).size, data.codes.length);
for (const event of data.announcements) {
  assertEnvelope(event);
  for (const observation of event.observations) assert.equal(validateObservation(event, observation), null);
}
for (const row of data.codes) {
  assert.ok(['active', 'expired'].includes(row.status));
  assert.ok(data.announcements.some(a => `${a.guildId}/${a.channelId}/${a.messageId}` === row.sourceId && a.hash === row.evidenceHash && a.observations.some(o => o.code === row.code && o.status === row.status)));
}
const page = await readFile('src/app/codes/page.tsx', 'utf8');
assert.ok(page.includes('title: "Volleyball Legends Codes"'));
assert.ok(page.includes('Track Volleyball Legends codes, recent update codes, reward notes, and the fastest official places to verify fresh drops.'));
assert.match(page, /<h1[^>]*>\s*Volleyball Legends Codes\s*<\/h1>/);
console.log('Codes evidence, unique records, source references and frozen metadata passed. Gameplay snapshots were not refreshed.');
