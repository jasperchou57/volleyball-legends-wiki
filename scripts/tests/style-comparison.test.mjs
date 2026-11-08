import test from 'node:test';
import assert from 'node:assert/strict';
import { loadSiteModule } from '../lib/load-site-module.mjs';
const { comparisonStyles, comparisonPair, readSavedComparisons, comparisonHref } = loadSiteModule('src/data/style-comparison.ts');
const { tierStyles } = loadSiteModule('src/data/style-reviews.ts');

test('every tier-list entry can be compared without inventing missing scores', () => {
  assert.ok(tierStyles.every(s => comparisonStyles.some(entry => entry.slug === s.slug)));
  assert.equal(new Set(comparisonStyles.map(s => s.slug)).size, comparisonStyles.length);
  for (const slug of ['mamori', 'roketto']) assert.equal(comparisonStyles.find(s => s.slug === slug).scores, null);
  assert.equal(comparisonStyles.find(s => s.slug === 'roketto').tier, null);
});
test('shared links resolve aliases and recover from missing, duplicate or invalid selections', () => {
  assert.deepEqual(comparisonPair('kosumi', 'sazuroku'), {a: 'kyoshin', b: 'sagafura'});
  for (const a of [undefined, 'missing', ...comparisonStyles.map(s => s.slug)]) {
    for (const b of [undefined, a, 'missing']) {
      const pair = comparisonPair(a,b);
      assert.notEqual(pair.a, pair.b);
      const params = new URL(comparisonHref(pair), 'https://example.com').searchParams;
      assert.deepEqual(comparisonPair(params.get('a'), params.get('b')), pair);
    }
  }
});
test('saved comparisons migrate old names and reject invalid or duplicate records', () => {
  assert.deepEqual(readSavedComparisons(['Kosumi vs Sagafura', 'Kyoshin vs Sazuroku', {a:'mamori',b:'roketto'}, null, 12, 'unknown vs Twins', {a:'mamori',b:'mamori'}]), [
    {a:'kyoshin',b:'sagafura'}, {a:'mamori',b:'roketto'}
  ]);
  assert.deepEqual(readSavedComparisons({a:'mamori'}), []);
  assert.equal(readSavedComparisons(comparisonStyles.map(s => ({a:s.slug,b:'roketto'}))).length, 4);
});

test('additional directory styles compare without fabricated ratings, scores or guide URLs', () => {
  assert.equal(comparisonStyles.length, 45);
  const added = comparisonStyles.filter(s => !tierStyles.some(t => t.slug === s.slug));
  assert.equal(added.length, 16);
  for (const style of added) {
    assert.equal(style.tier, null);
    assert.equal(style.scores, null);
    assert.equal(style.href, null);
    assert.ok(style.mechanic && style.constraint);
  }
  assert.deepEqual(comparisonPair('hakka', 'shiro'), { a: 'hakka', b: 'shiro' });
  assert.deepEqual(comparisonPair('hinoto', 'tso'), { a: 'hinto', b: 'timeskip-okazu' });
  for (const slug of ['okazu', 'timeskip-okazu', 'twins']) assert.ok(comparisonStyles.find(s => s.slug === slug).bestRoles.includes('Server'));
  assert.deepEqual(comparisonStyles.find(s => s.slug === 'yachikusai').bestRoles, ['Server', 'Blocker']);
});
