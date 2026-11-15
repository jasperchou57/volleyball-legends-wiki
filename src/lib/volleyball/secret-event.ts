// Update 96: the officially announced 48-hour Secret event.
export const SECRET_EVENT_START = Date.parse("2026-11-14T11:30:00-05:00");
export const SECRET_EVENT_END = Date.parse("2026-11-16T11:30:00-05:00");
export const SECRET_SPIN_RATES = {
  baseline: { rate: 0.005, pity: 200 },
  event: { rate: 0.01, pity: 100 },
};
export type RateMode = "auto" | "baseline" | "event";
export function getSecretEventStatus(now: number) {
  return now < SECRET_EVENT_START ? "upcoming" : now < SECRET_EVENT_END ? "active" : "ended";
}
export function usesSecretEventRates(mode: RateMode, now: number) {
  return mode === "event" || (mode === "auto" && getSecretEventStatus(now) === "active");
}
