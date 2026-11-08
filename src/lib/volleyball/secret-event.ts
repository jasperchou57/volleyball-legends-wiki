// Update 95: the officially announced 48-hour Secret event.
export const SECRET_EVENT_START = Date.parse("2026-11-07T11:30:00-05:00");
export const SECRET_EVENT_END = Date.parse("2026-11-09T11:30:00-05:00");
export type RateMode = "auto" | "baseline" | "event";
export function getSecretEventStatus(now: number) {
  return now < SECRET_EVENT_START ? "upcoming" : now < SECRET_EVENT_END ? "active" : "ended";
}
export function usesSecretEventRates(mode: RateMode, now: number) {
  return mode === "event" || (mode === "auto" && getSecretEventStatus(now) === "active");
}
