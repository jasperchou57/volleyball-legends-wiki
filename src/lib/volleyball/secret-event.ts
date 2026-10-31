// Update 94: a 48-hour window across the US daylight saving time change.
export const SECRET_EVENT_START = Date.parse("2026-10-31T11:30:00-04:00");
export const SECRET_EVENT_END = Date.parse("2026-11-02T10:30:00-05:00");
export type RateMode = "auto" | "baseline" | "event";
export function getSecretEventStatus(now: number) {
  return now < SECRET_EVENT_START ? "upcoming" : now < SECRET_EVENT_END ? "active" : "ended";
}
export function usesSecretEventRates(mode: RateMode, now: number) {
  return mode === "event" || (mode === "auto" && getSecretEventStatus(now) === "active");
}
