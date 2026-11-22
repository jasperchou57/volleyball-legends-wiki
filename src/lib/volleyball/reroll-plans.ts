import type { SlotStatus, ChaseTarget } from "./reroll-advice";
import { MAX_SPIN_BUDGET } from "./spin-budget-params";
import { rerollStyles } from "./style-roll-status";

export const REROLL_PLANS_STORAGE_KEY = "vl-reroll-plans-v2";
export const REROLL_SLOT_CHOICES = ["unsure", "yes", "no"] as const;
export const REROLL_TARGET_RARITIES = ["Secret", "Limited Secret", "Ultra"] as const;

export type SavedRerollPlan = {
  id: string;
  keep: boolean;
  slots: SlotStatus;
  available: SlotStatus;
  spins: number;
  target: ChaseTarget;
  event: boolean;
  styleSlug?: string;
  ratePeriod?: string;
};

function validPlan(value: unknown): value is SavedRerollPlan {
  if (!value || typeof value !== "object") return false;
  const plan = value as SavedRerollPlan;
  return typeof plan.id === "string" && plan.id.length > 0 &&
    typeof plan.keep === "boolean" &&
    REROLL_SLOT_CHOICES.includes(plan.slots) &&
    REROLL_SLOT_CHOICES.includes(plan.available) &&
    Number.isInteger(plan.spins) && plan.spins >= 0 && plan.spins <= MAX_SPIN_BUDGET &&
    REROLL_TARGET_RARITIES.includes(plan.target) &&
    typeof plan.event === "boolean" &&
    (plan.ratePeriod === undefined || typeof plan.ratePeriod === "string") &&
    (plan.styleSlug === undefined || rerollStyles.some(style => style.slug === plan.styleSlug));
}

export function readSavedRerollPlans(value: unknown): SavedRerollPlan[] {
  if (!Array.isArray(value)) return [];
  const ids = new Set<string>();
  return value.filter((plan): plan is SavedRerollPlan => {
    if (!validPlan(plan) || ids.has(plan.id)) return false;
    ids.add(plan.id);
    return true;
  }).slice(0, 4);
}

export function resumeRerollPlan(plan: SavedRerollPlan) {
  return {
    keep: plan.keep,
    spins: plan.spins,
    rarity: plan.target,
    styleSlug: plan.styleSlug ?? "",
    slots: "unsure" as const,
    available: "unsure" as const,
    mode: "auto" as const,
  };
}
