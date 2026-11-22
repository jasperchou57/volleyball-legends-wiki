import test from 'node:test';
import assert from 'node:assert/strict';
import { loadSiteModule } from '../lib/load-site-module.mjs';

const { readSavedRerollPlans, resumeRerollPlan } = loadSiteModule('src/lib/volleyball/reroll-plans.ts');
const { getRerollAdvice } = loadSiteModule('src/lib/volleyball/reroll-advice.ts');
const { getStyleRollStatus } = loadSiteModule('src/lib/volleyball/style-roll-status.ts');
const { usesSecretEventRates } = loadSiteModule('src/lib/volleyball/secret-event.ts');
const plan = { id:'1794690000000', keep:true, slots:'yes', available:'yes', spins:37, target:'Secret', event:true, styleSlug:'yogan' };

test('old browser plans remain readable while malformed, duplicate and oversized records are ignored', () => {
  assert.deepEqual(readSavedRerollPlans([null, { ...plan, spins:-1 }, { ...plan, spins:100001 }, { ...plan, styleSlug:'unknown' }, plan, plan]), [plan]);
  assert.deepEqual(readSavedRerollPlans({}), []);
  assert.equal(readSavedRerollPlans(Array.from({length:6},(_,i)=>({...plan,id:String(i)}))).length, 4);
});

test('continuing a plan keeps preferences but requires fresh checks and announced rates', () => {
  const original = { ...plan, pity:30, ratePeriod:'old-event' };
  const next = resumeRerollPlan(original);
  assert.deepEqual(next, { keep:true, spins:37, rarity:'Secret', styleSlug:'yogan', slots:'unsure', available:'unsure', mode:'auto' });
  assert.equal(original.available, 'yes');
  assert.equal(original.slots, 'yes');
  assert.equal(usesSecretEventRates(next.mode, Date.parse('2026-11-25T12:00:00Z')), false);
  assert.equal(usesSecretEventRates(next.mode, Date.parse('2026-11-26T12:00:00Z')), true);
  assert.equal(resumeRerollPlan({ ...plan, keep:false, styleSlug:undefined, target:'Ultra' }).styleSlug, '');
});

test('old pool confirmations cannot bypass current Riku or expired return restrictions', () => {
  for (const [slug,time] of [['riku','2026-11-22T12:00:00Z'],['yogan','2026-12-06T12:00:00Z']]) {
    const next = resumeRerollPlan({ ...plan, styleSlug:slug, keep:false });
    const status = getStyleRollStatus(slug, Date.parse(time));
    const advice = getRerollAdvice(next.keep, next.slots, next.available, next.spins, next.rarity, {name:slug, rollStatus:status.kind});
    assert.equal(advice.href, '/style-return-dates');
  }
  const next = resumeRerollPlan(plan);
  assert.equal(getRerollAdvice(next.keep,next.slots,next.available,next.spins,next.rarity).href, '/guides/style-ability-slots');
});
