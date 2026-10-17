// Shared by the collector and both writers. No model-provided source identities.
export type Segment = { id: string; text: string }
export type Observation = { code: string; status: "active" | "expired"; reward: string | null; segment: string; quote: string }
export type Announcement = {
  gameId: string; guildId: string; channelId: string; messageId: string;
  receivedChannelId: string; receivedMessageId: string; timestamp: string;
  editedTimestamp: string | null; capturedAt: string; hash: string;
  segments: Segment[]; observations: Observation[];
  update: { number: number; segment: string; quote: string } | null;
}
export type ManagedCode = {
  code: string; reward: string; status: "active" | "expired";
  addedAt: string; sourceCheckedAt: string; eventTime: string; sourceId: string; evidenceHash: string;
}
export type CodeData = { version: 1; codes: ManagedCode[]; announcements: Announcement[]; update: Announcement["update"] & { announcedAt: string; checkedAt: string } | null }
export type Baseline = { code: string; reward: string; status: string; sourceCheckedAt?: string; addedAt?: string }
export const emptyData = (): CodeData => ({ version: 1, codes: [], announcements: [], update: null })
export const SOURCES: Record<string, { guildId: string; channelIds: string[] }> = {
  "volleyball-legends": { guildId: "1328110081136398427", channelIds: ["1328110082226913470"] },
  "run-a-dance-studio": { guildId: "1524008570797166652", channelIds: ["1524302921397960779", "1524664433874436176"] },
}
export const sourceId = (a: Announcement) => `${a.guildId}/${a.channelId}/${a.messageId}`
export const evidenceId = (a: Announcement) => `${sourceId(a)}#${a.hash}`
export const sourceUrl = (a: Announcement) => `https://discord.com/channels/${sourceId(a)}`
export const dateOnly = (value: string) => value.slice(0, 10)
const validDate = (value: unknown) => typeof value === "string" && Number.isFinite(Date.parse(value))
const clean = (value: string) => value.replace(/[*`_~]/g, "").replace(/\s+/g, " ").trim()
export function assertEnvelope(a: Announcement) {
  const source = SOURCES[a?.gameId]
  if (!source || source.guildId !== a.guildId || !source.channelIds.includes(a.channelId)) throw new Error("untrusted-source")
  if (![a.guildId, a.channelId, a.messageId, a.receivedChannelId, a.receivedMessageId].every(id => /^\d{15,22}$/.test(id))) throw new Error("invalid-source-id")
  if (!validDate(a.timestamp) || !validDate(a.capturedAt) || (a.editedTimestamp !== null && !validDate(a.editedTimestamp))) throw new Error("invalid-date")
  if (Date.parse(a.timestamp) > Date.parse(a.capturedAt) + 300000 || Date.parse(a.editedTimestamp ?? a.timestamp) > Date.parse(a.capturedAt) + 300000) throw new Error("future-announcement")
  if (!/^[a-f0-9]{64}$/.test(a.hash) || !Array.isArray(a.segments) || a.segments.length > 100 || !Array.isArray(a.observations) || a.observations.length > 100) throw new Error("invalid-envelope")
  if (a.segments.some(s => typeof s.id !== "string" || typeof s.text !== "string" || s.text.length > 30000)) throw new Error("invalid-segment")
  if (new Set(a.segments.map(s => s.id)).size !== a.segments.length) throw new Error("duplicate-segment")
}
export function validateObservation(a: Announcement, o: Observation): string | null {
  if (!o || typeof o.code !== "string" || !/^[A-Za-z0-9_! =.\-]{1,100}$/.test(o.code) || o.code !== o.code.trim()) return "invalid-code"
  if (!["active", "expired"].includes(o.status)) return "invalid-status"
  const segment = a.segments.find(s => s.id === o.segment)
  if (!segment || typeof o.quote !== "string" || !o.quote || !segment.text.includes(o.quote)) return "quote-not-in-source"
  if (!o.quote.includes(o.code)) return "code-not-in-quote"
  if (o.status === "active" && (typeof o.reward !== "string" || !o.reward.trim() || o.reward.length > 250 || !clean(o.quote).includes(clean(o.reward)))) return "reward-not-in-quote"
  if (o.status === "expired" && !/\b(expired?|inactive|invalid|disabled|no longer (?:works?|valid|active))\b|失效|过期|停用/i.test(o.quote)) return "expiry-not-explicit"
  return null
}
export function applyAnnouncement(current: CodeData, a: Announcement, baseline: Baseline[] = []) {
  assertEnvelope(a)
  const data: CodeData = structuredClone(current)
  const conflicts: { code: string; reason: string }[] = []
  const accepted: Observation[] = []
  const id = sourceId(a), eventTime = a.editedTimestamp ?? a.timestamp
  const previous = [...data.announcements].reverse().find(item => sourceId(item) === id)
  if (previous?.hash === a.hash) return { data, conflicts, accepted, changed: false }
  if (previous && Date.parse(previous.editedTimestamp ?? previous.timestamp) > Date.parse(eventTime)) return { data, conflicts: [{ code: "*", reason: "older-message-revision" }], accepted, changed: false }
  for (const o of a.observations) {
    const reason = validateObservation(a, o)
    if (reason) { conflicts.push({ code: o?.code ?? "?", reason }); continue }
    if (a.observations.filter(other => other.code === o.code).some(other => other.status !== o.status || other.reward !== o.reward)) { conflicts.push({ code: o.code, reason: "conflicting-claims-in-message" }); continue }
    if (accepted.some(other => other.code === o.code)) continue
    const old = data.codes.find(row => row.code === o.code)
    const base = baseline.find(row => row.code === o.code)
    if (old && Date.parse(old.eventTime) > Date.parse(eventTime)) { conflicts.push({ code: o.code, reason: "older-than-existing-evidence" }); continue }
    if (!old && base?.sourceCheckedAt && dateOnly(eventTime) < dateOnly(base.sourceCheckedAt)) { conflicts.push({ code: o.code, reason: "older-than-baseline-review" }); continue }
    if (o.status === "active" && (old ?? base)?.status === "expired") { conflicts.push({ code: o.code, reason: "reactivation-needs-review" }); continue }
    if (o.status === "active" && (old ?? base)?.reward && clean((old ?? base)!.reward) !== clean(o.reward!) && old?.sourceId !== id) { conflicts.push({ code: o.code, reason: "reward-conflict" }); continue }
    if (o.status === "expired" && !old && !base) { conflicts.push({ code: o.code, reason: "unknown-code-expiry" }); continue }
    const row: ManagedCode = { code: o.code, reward: o.status === "expired" ? (old ?? base)!.reward : o.reward!, status: o.status,
      addedAt: old?.addedAt ?? base?.addedAt ?? dateOnly(a.timestamp), sourceCheckedAt: dateOnly(a.capturedAt), eventTime, sourceId: id, evidenceHash: a.hash }
    data.codes = [...data.codes.filter(item => item.code !== o.code), row]
    accepted.push(o)
  }
  if (previous) for (const o of previous.observations) if (!a.observations.some(item => item.code === o.code)) conflicts.push({ code: o.code, reason: "removed-from-edited-message-status-retained" })
  let acceptedUpdate: Announcement["update"] = null
  if (a.update) {
    const s = a.segments.find(s => s.id === a.update!.segment)
    const u = a.update
    if (typeof u.quote === "string" && typeof u.segment === "string" && Number.isInteger(u.number) && u.number > 0 && u.number < 100000 && s?.text.includes(u.quote) && new RegExp(`(?:update|upd|更新)\\s*#?\\s*${u.number}(?![0-9])`, "i").test(clean(u.quote))) {
      acceptedUpdate = u
      if (!data.update || u.number >= data.update.number) data.update = { ...u, announcedAt: dateOnly(a.timestamp), checkedAt: dateOnly(a.capturedAt) }
    } else conflicts.push({ code: "update", reason: "update-number-not-explicit" })
  }
  // Preserve immutable source revisions; omitted codes keep their original quote and review date.
  if (accepted.length || JSON.stringify(data.update) !== JSON.stringify(current.update)) {
    data.announcements.push({ ...a, update: acceptedUpdate, observations: accepted })
  }
  return { data, conflicts, accepted, changed: JSON.stringify(data) !== JSON.stringify(current) }
}
