import { latestGameUpdate } from "../../data/volleyball";
import type { StyleRollStatus } from "./style-roll-status";

export type SlotStatus = "unsure" | "yes" | "no";
export type ChaseTarget = "Secret" | "Limited Secret" | "Ultra";

export function getRerollAdvice(
  keep: boolean,
  slots: SlotStatus,
  available: SlotStatus,
  spins: number,
  target: ChaseTarget,
  style?: { name: string; rollStatus?: StyleRollStatus["kind"] },
) {
  if (style?.rollStatus === "out-of-rotation") return {
    headline: `Save your spins for ${style.name}`,
    body: `Wait for ${style.name} to return to the Style pool before rolling for this style.`,
    href: "/style-return-dates", action: "Check return dates",
  };
  if (style?.rollStatus === "window-ended" && available !== "yes") return {
    headline: `Save your spins for ${style.name}`,
    body: `Check for ${style.name} in the current in-game Style pool before rolling.`,
    href: "/style-return-dates", action: "Check return dates",
  };
  if (keep && slots !== "yes") return {
    headline: slots === "no" ? "Make room before rolling" : "Check your slots first",
    body: "Keep the style you want to save in its own slot. Check its lock and your selected slot in-game before rolling. If you need more room, additional Style slots can be bought with Gems.",
    href: "/guides/style-ability-slots", action: "See slot prices and limits",
  };
  if (available !== "yes") return {
    headline: available === "no" ? "Save spins until your target is available" : "Check the current style selection",
    body: "Confirm that your target appears in the in-game style selection. A past return or a luck event does not make every limited style available.",
    href: "/style-return-dates", action: "Check return dates",
  };
  if (spins <= 0) return { headline: "Build your spin budget", body: "You have no Lucky Spins entered. Check available codes and decide how many spins you want to save for your target.", href: "/codes", action: "View current codes" };
  if (target === "Ultra") return {
    headline: "Set a spin limit",
    body: "Check your selected slot and decide how many Lucky Spins to spend.",
    href: `/updates/update-${latestGameUpdate.updateNumber}`,
    action: `Read Update ${latestGameUpdate.updateNumber} details`,
  };
  return {
    headline: "Plan your budget before rolling",
    body: keep ? "Select a separate slot and check the lock on the style you are keeping. Set a spin limit and check your in-game pity progress. Secret pity does not guarantee the specific style you want." : "Confirm that you are comfortable replacing the style in the selected slot. Set a spin limit and check your in-game pity progress. Secret pity does not guarantee the specific style you want.",
    href: "/tools/spin-budget", action: "Estimate your Secret budget",
  };
}
