// Update 90 announcement: October 3–5, 2026, 11:30 AM Eastern (EDT).
export const SECRET_EVENT_START = Date.parse("2026-10-03T11:30:00-04:00");
export const SECRET_EVENT_END = Date.parse("2026-10-05T11:30:00-04:00");
export type RateMode = "auto" | "baseline" | "event";
export function getSecretEventStatus(now: number) {
  return now < SECRET_EVENT_START ? "upcoming" : now < SECRET_EVENT_END ? "active" : "ended";
}
export function usesSecretEventRates(mode: RateMode, now: number) {
  return mode === "event" || (mode === "auto" && getSecretEventStatus(now) === "active");
}
