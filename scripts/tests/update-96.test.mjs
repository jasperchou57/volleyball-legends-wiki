import test from 'node:test';
import assert from 'node:assert/strict';
import { loadSiteModule } from '../lib/load-site-module.mjs';
const rates = loadSiteModule('src/lib/volleyball/secret-event.ts');
const site = loadSiteModule('src/data/volleyball.ts');
const { comparisonStyles } = loadSiteModule('src/data/style-comparison.ts');
const { newestCodeBatch, codeRewardTotals } = loadSiteModule('src/data/codes-automation.ts');
test('Update 96 auto rates activate and expire at the announced Eastern boundaries', () => {
  assert.equal(rates.SECRET_EVENT_START, Date.parse('2026-11-14T16:30:00Z'));
  assert.equal(rates.SECRET_EVENT_END, Date.parse('2026-11-16T16:30:00Z'));
  assert.equal(rates.usesSecretEventRates('auto', rates.SECRET_EVENT_START - 1), false);
  assert.equal(rates.usesSecretEventRates('auto', rates.SECRET_EVENT_START), true);
  assert.equal(rates.usesSecretEventRates('auto', rates.SECRET_EVENT_END - 1), true);
  assert.equal(rates.usesSecretEventRates('auto', rates.SECRET_EVENT_END), false);
  assert.equal(rates.usesSecretEventRates('baseline', rates.SECRET_EVENT_START), false);
  assert.equal(rates.usesSecretEventRates('event', rates.SECRET_EVENT_END), true);
});
test('new codes and rewards agree with the release without expiring omitted codes', () => {
  assert.equal(site.latestGameUpdate.updateNumber, 96);
  const batch = newestCodeBatch(site.activeCodes);
  assert.deepEqual(batch.map(c => c.code).sort(), ['UPDATE_96','RIKU_REWORK','NEW_CHAT_BUBBLES'].sort());
  assert.deepEqual(codeRewardTotals(batch), {styleSpins:10,abilitySpins:5});
  assert.ok(site.activeCodes.some(c => c.code === 'UPDATE_95'));
  assert.equal(site.updates[0].slug, 'update-96');
});
test('Twins extension does not extend TSO or imply a Riku return or tier rating', () => {
  assert.deepEqual(site.currentlyAvailableStyles.map(s => s.subjectSlug), ['twins']);
  assert.match(site.getLatestAvailability('Style','twins').window, /November 7–21/);
  assert.equal(site.getLatestAvailability('Style','timeskip-okazu').status, 'Not currently available');
  const riku = comparisonStyles.find(s => s.slug === 'riku');
  assert.match(riku.mechanic, /3–4 spikes/);
  assert.match(riku.mechanic, /one bounce/);
  assert.match(riku.mechanic, /has not returned/);
  assert.equal(riku.tier, null);
  assert.equal(riku.scores, null);
});
