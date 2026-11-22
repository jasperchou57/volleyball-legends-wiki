import test from 'node:test';
import assert from 'node:assert/strict';
import { loadSiteModule } from '../lib/load-site-module.mjs';

const { readSpinBudgetParams, spinBudgetHref, MAX_SPIN_BUDGET } = loadSiteModule('src/lib/volleyball/spin-budget-params.ts');
const { usesSecretEventRates } = loadSiteModule('src/lib/volleyball/secret-event.ts');
const readLink = href => readSpinBudgetParams(Object.fromEntries(new URL(href, 'https://example.com').searchParams));

test('reroll links preserve the budget, mode and selected style without transferring pity or pool confirmation', () => {
  for (const mode of ['auto', 'baseline', 'event']) {
    for (const spins of [0, 37, 1001, MAX_SPIN_BUDGET]) {
      const href = spinBudgetHref(spins, mode, 'yogan');
      assert.deepEqual(readLink(href), { spins, mode, pool: 'style', style: { slug: 'yogan', name: 'Yogan' } });
      assert.deepEqual([...new URL(href, 'https://example.com').searchParams.keys()].sort(), ['mode', 'pool', 'spins', 'target']);
    }
  }
  assert.deepEqual(readLink(spinBudgetHref(80, 'baseline')), { spins: 80, mode: 'baseline', pool: 'style' });
});

test('automatic links keep following the schedule across the weekend, gap and Thanksgiving', () => {
  const plan = readLink(spinBudgetHref(37, 'auto', 'yogan'));
  for (const [time, boosted] of [
    ['2026-11-22T12:00:00Z', true],
    ['2026-11-25T12:00:00Z', false],
    ['2026-11-26T12:00:00Z', true],
    ['2026-11-28T12:00:00Z', false],
  ]) assert.equal(usesSecretEventRates(plan.mode, Date.parse(time)), boosted);
});

test('invalid, repeated and unsupported query values fall back safely', () => {
  assert.deepEqual(readSpinBudgetParams({}), { spins: 50, mode: 'auto' });
  for (const spins of ['', '-1', '1.5', 'NaN', 'Infinity', '1e3', '100001', ['37', '80']]) {
    assert.equal(readSpinBudgetParams({ spins }).spins, 50);
  }
  for (const mode of ['unknown', ['event', 'baseline']]) assert.equal(readSpinBudgetParams({ mode }).mode, 'auto');
  for (const target of ['unknown', ['yogan', 'riku']]) {
    assert.deepEqual(readSpinBudgetParams({ target, pity: '30', available: 'yes' }), { spins: 50, mode: 'auto' });
  }
});
