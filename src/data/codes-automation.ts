import raw from './codes-automated.json';
import type { CodeEntry, ExpiredCodeEntry } from './volleyball';
type Managed = { code: string; reward: string; status: string; addedAt: string; sourceCheckedAt: string; sourceId: string };
type Announcement = { guildId: string; channelId: string; messageId: string };
const data = raw as { codes: Managed[]; announcements: Announcement[]; revision: string; update: { number: number; announcedAt: string; checkedAt: string } | null };
export const codeDataRevision = data.revision;
const date = (value: string) => new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(value));
export function mergeAutomatedCodes(active: CodeEntry[], previous: CodeEntry[], expired: ExpiredCodeEntry[]) {
  const replaced = new Set(data.codes.map(c => c.code));
  const rows: CodeEntry[] = data.codes.filter(c => c.status === 'active').map(c => ({ code: c.code, reward: c.reward, releaseDate: date(c.addedAt),
    status: 'Officially announced', sourceTier: 'Official', lastChecked: date(c.sourceCheckedAt), availability: 'Active',
    sourceNote: 'Official Discord announcement reviewed. Not tested in-game.', sources: [{ label: 'Official Discord announcement', url: `https://discord.com/channels/${c.sourceId}` }] }));
  return { activeCodes: [...rows, ...active.filter(c => !replaced.has(c.code))], previousCodes: previous.filter(c => !replaced.has(c.code)),
    expiredCodes: [...data.codes.filter(c => c.status === 'expired').map(c => ({ code: c.code, reward: c.reward, releaseDate: date(c.addedAt), expiredNote: `Explicitly announced expired: https://discord.com/channels/${c.sourceId}` })), ...expired.filter(c => !replaced.has(c.code))] };
}
export function automatedCheckedAt(fallback: string) {
  const latest = data.codes.map(c => c.sourceCheckedAt).sort().at(-1);
  return latest && Date.parse(latest) > Date.parse(fallback) ? date(latest) : fallback;
}
export function latestCodeUpdateNumber(fallback: number) {
  return data.update && data.update.number > fallback ? data.update.number : fallback;
}
export function codeRewardTotals(rows: Pick<CodeEntry, 'reward'>[]) {
  const total = (kind: string) => rows.reduce((sum, c) => sum + Number(c.reward.match(new RegExp(`([0-9,]+) (?:Lucky )?${kind} Spins?`, 'i'))?.[1]?.replaceAll(',', '') ?? 0), 0);
  return { styleSpins: total('Style'), abilitySpins: total('Ability') };
}

export function newestCodeBatch(rows: CodeEntry[]) {
  const dates = rows.map(row => Date.parse(row.releaseDate)).filter(Number.isFinite);
  const newest = Math.max(...dates);
  return rows.filter(row => Date.parse(row.releaseDate) === newest);
}
