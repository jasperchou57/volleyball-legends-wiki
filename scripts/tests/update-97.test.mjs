import test from 'node:test';
import assert from 'node:assert/strict';
import { loadSiteModule } from '../lib/load-site-module.mjs';

const rates = loadSiteModule('src/lib/volleyball/secret-event.ts');
const site = loadSiteModule('src/data/volleyball.ts');
const { getStyleRollStatus, rerollStyles } = loadSiteModule('src/lib/volleyball/style-roll-status.ts');
const { newestCodeBatch, codeRewardTotals } = loadSiteModule('src/data/codes-automation.ts');

test('each announced window changes its status at the exact start and end', () => {
  for (const window of rates.SECRET_EVENT_WINDOWS) {
    const start = Date.parse(window.startsAt);
    const end = Date.parse(window.endsAt);
    assert.equal(rates.getSecretWindowStatus(window, start - 1), 'upcoming');
    assert.equal(rates.getSecretWindowStatus(window, start), 'active');
    assert.equal(rates.getSecretWindowStatus(window, end - 1), 'active');
    assert.equal(rates.getSecretWindowStatus(window, end), 'ended');
  }
});

test('both Update 97 windows use the announced timezones and exclude their end instants', () => {
  const expected = [
    ['2026-11-21T16:30:00Z', '2026-11-23T16:30:00Z', 48],
    ['2026-11-26T05:00:00Z', '2026-11-27T05:00:00Z', 24],
  ];
  expected.forEach(([start, end, hours], index) => {
    const window = rates.SECRET_EVENT_WINDOWS[index];
    assert.equal(Date.parse(window.startsAt), Date.parse(start));
    assert.equal(Date.parse(window.endsAt), Date.parse(end));
    assert.equal(Date.parse(end) - Date.parse(start), hours * 3600000);
    for (const [time, active] of [[Date.parse(start) - 1, false], [Date.parse(start), true], [Date.parse(end) - 1, true], [Date.parse(end), false]]) {
      assert.equal(rates.usesSecretEventRates('auto', time), active);
      assert.equal(rates.usesSecretEventRates('baseline', time), false);
      assert.equal(rates.usesSecretEventRates('event', time), true);
    }
  });
  assert.equal(rates.getSecretEventStatus(Date.parse('2026-11-21T16:29:59Z')), 'upcoming');
  assert.equal(rates.getSecretEventStatus(Date.parse('2026-11-25T12:00:00Z')), 'between');
  assert.equal(rates.getSecretEventStatus(Date.parse('2026-11-27T05:00:00Z')), 'ended');
});

test('pity counters and saved plans can distinguish two boosted periods and the normal gap', () => {
  const times = ['2026-11-15T12:00:00Z', '2026-11-22T12:00:00Z', '2026-11-25T12:00:00Z', '2026-11-26T12:00:00Z', '2026-11-28T12:00:00Z'];
  assert.equal(new Set(times.map(time => rates.getSecretRatePeriod(Date.parse(time)))).size, times.length);
  assert.equal(rates.getSecretRatePeriod(Date.parse('2026-11-22T13:00:00Z')), rates.getSecretRatePeriod(Date.parse('2026-11-22T14:00:00Z')));
});

test('Update 97 codes retain official rewards and do not expire older omitted codes', () => {
  assert.equal(site.latestGameUpdate.updateNumber, 97);
  assert.equal(site.updates[0].slug, 'update-97');
  const batch = newestCodeBatch(site.activeCodes);
  assert.deepEqual(batch.map(code => code.code).sort(), ['UPDATE_97', 'YOGAN_RETURNS', 'TURKEY_STAMPEDE'].sort());
  assert.deepEqual(codeRewardTotals(batch), { styleSpins: 10, abilitySpins: 5 });
  assert.equal(site.activeCodes.length, 21);
  assert.ok(site.activeCodes.some(code => code.code === 'UPDATE_96'));
  assert.equal(new Set(site.activeCodes.map(code => code.code)).size, site.activeCodes.length);
});

test('Yogan is selectable and expires at the announced deadline without implying a Riku return', () => {
  assert.ok(rerollStyles.some(style => style.slug === 'yogan'));
  const end = Date.parse('2026-12-05T16:30:00Z');
  assert.equal(getStyleRollStatus('yogan', end - 1).kind, 'return-window');
  assert.equal(getStyleRollStatus('yogan', end).kind, 'window-ended');
  assert.match(getStyleRollStatus('yogan', end).text, /December 5, 2026 at 11:30 AM ET/);
  assert.equal(getStyleRollStatus('riku', Date.parse('2026-11-22T12:00:00Z')).kind, 'out-of-rotation');
  assert.match(getStyleRollStatus('riku', end).text, /does not announce a return/);
});
