import type { RateMode } from "./secret-event";
import { rerollStyles } from "./style-roll-status";

export const MAX_SPIN_BUDGET = 100000;

export type SpinBudgetQuery = Record<string, string | string[] | undefined>;
export type SpinBudgetPlan = {
  spins: number;
  mode: RateMode;
  pool?: "style";
  style?: { slug: string; name: string };
};

export function readSpinBudgetParams(query: SpinBudgetQuery): SpinBudgetPlan {
  const value = typeof query.spins === "string" && /^\d+$/.test(query.spins)
    ? Number(query.spins) : NaN;
  const spins = Number.isSafeInteger(value) && value >= 0 && value <= MAX_SPIN_BUDGET ? value : 50;
  const mode = query.mode === "baseline" || query.mode === "event" ? query.mode : "auto";
  const style = rerollStyles.find(entry => entry.slug === query.target);
  return {
    spins, mode,
    ...(query.pool === "style" || style ? { pool: "style" as const } : {}),
    ...(style ? { style } : {}),
  };
}

export function spinBudgetHref(spins: number, mode: RateMode, target?: string) {
  const query = new URLSearchParams({ spins: String(spins), mode, pool: "style" });
  const style = rerollStyles.find(entry => entry.slug === target);
  if (style) query.set("target", style.slug);
  return `/tools/spin-budget?${query}`;
}
