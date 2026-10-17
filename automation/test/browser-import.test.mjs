import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState } from '../collector.mjs';
import { importBrowserCapture } from '../browser-import.mjs';
const channels = [{ gameId: 'volleyball-legends', trustedSource: { guildId: '1328110081136398427', channelId: '1328110082226913470' } }];
const capture = { gameId: 'volleyball-legends', method: 'browser-ui', scope: 'text-excerpt',
  sourceUrl: 'https://discord.com/channels/1328110081136398427/1328110082226913470/1561038606280425563',
  displayedDate: '2026-10-17', text: 'Fixture only, no production code' };
const now = '2026-10-18T00:00:00Z';
test('browser import keeps real identities, deduplicates and reopens edited evidence', () => {
  const state = initialState();
  const result = importBrowserCapture(state, channels, capture, now);
  assert.equal(result.changed, true);
  assert.equal(result.timestamp.slice(0, 16), '2026-10-17T15:30');
  const entry = state.messages[result.messageId];
  entry.pending = false;
  assert.equal(importBrowserCapture(state, channels, capture, now).changed, false);
  assert.equal(entry.pending, false);
  assert.equal(importBrowserCapture(state, channels, { ...capture, text: 'Edited fixture' }, now).changed, true);
  assert.equal(state.messages[result.messageId].pending, true);
  assert.equal(Object.values(state.browserReviews)[0].historyComplete, false);
});
test('browser import rejects unconfigured channels, invented dates and future messages', () => {
  for (const bad of [
    { sourceUrl: capture.sourceUrl.replace('1328110082226913470', '1328110082226913471') },
    { displayedDate: '2026-10-16' }, { method: 'model' }, { text: '' },
    { sourceUrl: capture.sourceUrl + '?foo=bar' },
  ]) assert.throws(() => importBrowserCapture(initialState(), channels, { ...capture, ...bad }, now));
  assert.throws(() => importBrowserCapture(initialState(), channels, capture, '2026-10-16T00:00:00Z'), /future-announcement/);
});
