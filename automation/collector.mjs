import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { dirname } from 'node:path';

export const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
export const initialState = () => ({ version: 1, channels: {}, messages: {}, sites: {}, errors: [] });
export async function loadState(file) {
  try { const state = JSON.parse(await readFile(file, 'utf8')); if (state.version !== 1) throw Error('unsupported-state-version'); return state; }
  catch (e) { if (e.code === 'ENOENT') return initialState(); throw e; }
}
export async function saveJson(file, value) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(`${file}.tmp`, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 });
  await rename(`${file}.tmp`, file);
}
export async function discordGet(route, token, fetcher = fetch) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetcher(`https://discord.com/api/v10/${route}`, { headers: { Authorization: `Bot ${token}` }, signal: AbortSignal.timeout(30000) });
    if (response.status === 429 || response.status >= 500) {
      if (attempt === 3) throw Error(`discord-http-${response.status}`);
      const seconds = response.status === 429 ? Number((await response.json()).retry_after ?? 3) : 2 ** attempt;
      if (!Number.isFinite(seconds) || seconds > 60) throw Error('discord-retry-next-run');
      await new Promise(resolve => setTimeout(resolve, Math.max(1, seconds) * 1000)); continue;
    }
    if (!response.ok) throw Error(`discord-http-${response.status}`);
    return response.json();
  }
}
export function normalizeMessage(raw, channel, now = new Date().toISOString()) {
  const ref = raw.message_reference, trust = channel.trustedSource;
  if (raw.type !== 0 || !(raw.flags & 2) || !trust || ref?.guild_id !== trust.guildId || ref?.channel_id !== trust.channelId || !ref.message_id) return null;
  if (raw.channel_id !== channel.channelId || !/^\d+$/.test(raw.id)) throw Error('receipt-channel-mismatch');
  const segments = [{ id: 'body', text: raw.content ?? '' }];
  (raw.embeds ?? []).forEach((embed, i) => {
    for (const [key, text] of Object.entries({ title: embed.title, description: embed.description, footer: embed.footer?.text })) if (text) segments.push({ id: `embed:${i}:${key}`, text });
    (embed.fields ?? []).forEach((f, j) => segments.push({ id: `embed:${i}:field:${j}`, text: `${f.name}\n${f.value}` }));
  });
  const images = (raw.attachments ?? []).filter(a => /^image\/(png|jpeg|webp)$/.test(a.content_type ?? '')).map(a => ({ id: a.id, url: a.url, size: a.size }));
  (raw.embeds ?? []).forEach((e, i) => { if (e.image?.url) images.push({ id: `embed-${i}`, url: e.image.url, size: 0 }); });
  const envelope = { gameId: channel.gameId, guildId: ref.guild_id, channelId: ref.channel_id, messageId: ref.message_id,
    receivedChannelId: raw.channel_id, receivedMessageId: raw.id, timestamp: raw.timestamp, editedTimestamp: raw.edited_timestamp ?? null,
    capturedAt: now, segments, observations: [], update: null };
  // Discord CDN signatures rotate without the announcement changing.
  envelope.hash = hash({ ...envelope, capturedAt: null, images: images.map(a => ({ id: a.id, url: a.url.split('?')[0] })) });
  return { envelope, images, pending: true, parsed: null, attempts: 0 };
}
export async function collect(state, channels, get, now = new Date().toISOString()) {
  const errors = [];
  for (const channel of channels) {
    const saved = state.channels[channel.channelId] ?? {};
    let before, newest = saved.cursor, seen = new Set();
    try {
      // Walk backwards from the latest message to the saved high-water mark.
      // Commit the cursor only after every page was safely saved in memory.
      for (let page = 0; ; page++) {
        if (page >= 1000) throw Error('pagination-budget-exceeded-cursor-retained');
        const rows = await get(`channels/${channel.channelId}/messages?limit=100${before ? `&before=${before}` : ''}`);
        if (!Array.isArray(rows)) throw Error('invalid-discord-response');
        if (!rows.length) break;
        if (rows.some(row => !/^\d+$/.test(row.id))) throw Error('invalid-message-id');
        rows.sort((a, b) => BigInt(a.id) > BigInt(b.id) ? -1 : 1);
        newest = !newest || BigInt(rows[0].id) > BigInt(newest) ? rows[0].id : newest;
        for (const raw of rows) {
          seen.add(raw.id);
          const entry = normalizeMessage(raw, channel, now);
          if (!entry) continue;
          const old = state.messages[raw.id];
          if (!old || old.envelope.hash !== entry.envelope.hash) state.messages[raw.id] = entry;
          else old.images = entry.images;
        }
        if (rows.length < 100 || (saved.cursor && rows.some(row => BigInt(row.id) <= BigInt(saved.cursor)))) break;
        const next = rows.at(-1).id;
        if (before && BigInt(next) >= BigInt(before)) throw Error('pagination-not-progressing');
        before = next;
      }
      state.channels[channel.channelId] = { cursor: newest ?? null, lastFetchedAt: now, lastReadMessageCount: seen.size };
      // A high-water mark alone cannot detect edits to old messages.
      for (const [id, old] of Object.entries(state.messages)) {
        if (old.envelope.receivedChannelId !== channel.channelId || seen.has(id)) continue;
        try {
          const raw = await get(`channels/${channel.channelId}/messages/${id}`);
          const entry = normalizeMessage(raw, channel, now);
          if (entry && entry.envelope.hash !== old.envelope.hash) state.messages[id] = entry;
          else if (entry) old.images = entry.images;
        } catch (error) {
          if (error.message === 'discord-http-404') old.deleted = true; // never expire codes
          else errors.push({ channel: channel.channelId, message: id, error: error.message });
        }
      }
    } catch (error) { errors.push({ channel: channel.channelId, error: error.message }); }
  }
  state.errors = errors;
  return state;
}

// A followed channel is a delivery mechanism, not proof that the official source has no news.
export async function verifySourceCoverage(state, channels, get, now = new Date().toISOString()) {
  state.sourceCoverage ??= {};
  for (const channel of channels) {
    const known = Object.values(state.messages).filter(m => m.envelope.receivedChannelId === channel.channelId);
    const result = { gameId: channel.gameId, receiptChannelId: channel.channelId,
      sourceUrl: `https://discord.com/channels/${channel.trustedSource.guildId}/${channel.trustedSource.channelId}`,
      checkedAt: now, receivedOfficialMessages: known.length, status: 'unverified', reason: 'follow-feed-is-not-complete-source' };
    try {
      const source = await get(`channels/${channel.trustedSource.channelId}`);
      if (source.id !== channel.trustedSource.channelId || source.guild_id !== channel.trustedSource.guildId) throw Error('source-channel-identity-mismatch');
      const rows = await get(`channels/${channel.trustedSource.channelId}/messages?limit=1`);
      if (!Array.isArray(rows)) throw Error('invalid-source-response');
      if (rows.length) {
        result.latestSourceMessageId = rows[0].id;
        const delivered = known.find(m => m.envelope.messageId === rows[0].id);
        // Latest-message presence alone cannot prove earlier messages or edits were delivered.
        result.reason = delivered ? 'latest-message-delivered-history-still-unverified' : 'latest-source-message-not-delivered';
      } else result.reason = 'source-returned-empty-requires-review';
    } catch (error) { result.reason = error.message; }
    state.sourceCoverage[channel.channelId] = result;
  }
  return state.sourceCoverage;
}
