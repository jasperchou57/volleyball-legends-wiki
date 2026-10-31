import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { assertEnvelope, validateObservation } from '../automation/shared/contract.ts';
import { loadSiteModule } from './lib/load-site-module.mjs';
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
const site = loadSiteModule('src/data/volleyball.ts');
const { latestCodeUpdateNumber } = loadSiteModule('src/data/codes-automation.ts');
const { buildCodesMetadata } = loadSiteModule('src/lib/volleyball/codes-metadata.ts');
const metadata = buildCodesMetadata(latestCodeUpdateNumber(site.latestGameUpdate.updateNumber), site.activeCodes, site.codesPageFreshness.contentUpdatedAt);
assert.match(page, /export function generateMetadata\(\)/);
assert.ok(page.includes('return buildCodesMetadata(latestCodeUpdateNumber(latestGameUpdate.updateNumber), activeCodes, codesPageFreshness.contentUpdatedAt)'));
assert.match(metadata.title.absolute, /^Volleyball Legends Codes \([A-Za-z]+ \d{4}\) - \[Update \d+\] Working Spins$/);
assert.ok(site.activeCodes.every(row => row.availability === 'Active'));
assert.ok(Date.parse(site.codesPageFreshness.contentUpdatedAt) >= Math.max(...site.activeCodes.map(row => Date.parse(row.releaseDate))), 'Record the real substantive Codes content update date when adding a new batch.');
assert.equal(new Set(site.activeCodes.map(row => row.code)).size, site.activeCodes.length);
assert.ok(metadata.description.startsWith(`All ${site.activeCodes.length} working Volleyball Legends codes for Update `));
assert.ok(site.activeCodes.every(row => !metadata.description.includes(row.code)));
assert.ok(!metadata.description.includes('verified daily'));
assert.match(page, /<h1[^>]*>\s*Volleyball Legends Codes\s*<\/h1>/);
console.log('Codes evidence, unique records, source references, dynamic metadata and unchanged H1 passed. Gameplay snapshots were not refreshed.');
