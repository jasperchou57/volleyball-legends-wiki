import { hash } from './collector.mjs';
import { assertEnvelope } from './shared/contract.ts';

// Input is a source capture made by the current Codex session through browser UI.
// It is never supplied by announcement text or the extraction model.
export function importBrowserCapture(state, channels, capture, now = new Date().toISOString()) {
  const match = /^https:\/\/discord\.com\/channels\/(\d{15,22})\/(\d{15,22})\/(\d{15,22})$/.exec(capture?.sourceUrl ?? '');
  if (!match) throw Error('invalid-browser-message-link');
  const [, guildId, channelId, messageId] = match;
  const config = channels.find(c => c.gameId === capture.gameId && c.trustedSource?.guildId === guildId && c.trustedSource?.channelId === channelId);
  if (!config) throw Error('browser-source-not-configured');
  if (capture.method !== 'browser-ui' || typeof capture.text !== 'string' || !capture.text.trim() || capture.text.length > 30000) throw Error('invalid-browser-capture');
  if (!['full-text', 'text-excerpt'].includes(capture.scope)) throw Error('invalid-browser-capture-scope');
  // Discord snowflake time comes from the observed message link, not model inference.
  const timestamp = new Date(Number((BigInt(messageId) >> 22n) + 1420070400000n)).toISOString();
  if (typeof capture.displayedDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(capture.displayedDate) ||
      ![timestamp.slice(0, 10), new Date(Date.parse(timestamp) + 8 * 3600000).toISOString().slice(0, 10)].includes(capture.displayedDate)) throw Error('browser-message-date-mismatch');
  const envelope = { gameId: capture.gameId, guildId, channelId, messageId,
    receivedChannelId: channelId, receivedMessageId: messageId, timestamp,
    editedTimestamp: capture.editedTimestamp ?? null, capturedAt: now,
    segments: [{ id: 'browser-text', text: capture.text }], observations: [], update: null };
  envelope.hash = hash({ ...envelope, capturedAt: null });
  assertEnvelope(envelope);
  const old = state.messages[messageId];
  const changed = !old || old.envelope.hash !== envelope.hash;
  if (changed) state.messages[messageId] = { envelope, images: [], pending: true, parsed: null, attempts: 0,
    browserCapture: { method: capture.method, scope: capture.scope, sourceUrl: capture.sourceUrl, displayedDate: capture.displayedDate,
      attachmentReview: capture.attachmentReview ?? 'not-captured', checkedAt: now } };
  // A particular inspected message is evidence, not a claim of complete historical coverage.
  state.browserReviews ??= {};
  state.browserReviews[`${guildId}/${channelId}`] = { checkedAt: now, messageId, sourceUrl: capture.sourceUrl, scope: capture.scope, historyComplete: false };
  return { changed, messageId, timestamp };
}
