import { update97SecretEvents } from "../../data/update-97";

// These are separate windows. The gap between them uses baseline rates.
export const SECRET_EVENT_WINDOWS = update97SecretEvents;
export const SECRET_SPIN_RATES = {
  baseline: { rate: 0.005, pity: 200 },
  event: { rate: 0.01, pity: 100 },
};
export type RateMode = "auto" | "baseline" | "event";

export function getSecretWindowStatus(window: { startsAt: string; endsAt: string }, now: number) {
  if (now < Date.parse(window.startsAt)) return "upcoming";
  return now < Date.parse(window.endsAt) ? "active" : "ended";
}

export function getActiveSecretEvent(now: number) {
  return SECRET_EVENT_WINDOWS.find(event => getSecretWindowStatus(event, now) === "active");
}

export function getNextSecretEvent(now: number) {
  return SECRET_EVENT_WINDOWS.find(event => getSecretWindowStatus(event, now) === "upcoming");
}

export function getSecretEventStatus(now: number) {
  if (getActiveSecretEvent(now)) return "active";
  if (now < Date.parse(SECRET_EVENT_WINDOWS[0].startsAt)) return "upcoming";
  return getNextSecretEvent(now) ? "between" : "ended";
}

// A counter entered during one event must not be reused for another event.
export function getSecretRatePeriod(now: number) {
  return getActiveSecretEvent(now)?.id ?? `normal-before-${getNextSecretEvent(now)?.id ?? "none"}`;
}

export function usesSecretEventRates(mode: RateMode, now: number) {
  return mode === "event" || (mode === "auto" && Boolean(getActiveSecretEvent(now)));
}
