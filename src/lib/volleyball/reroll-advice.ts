export type SlotStatus = "unsure" | "yes" | "no";
export type ChaseTarget = "Secret" | "Limited Secret" | "Ultra";
export function getRerollAdvice(keep: boolean, slots: SlotStatus, available: SlotStatus, spins: number, target: ChaseTarget) {
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
  if (target === "Ultra") return { headline: "Check Ultra odds in-game", body: "Update 90’s announced boost applies to Secret Styles and Abilities. Do not apply the Secret chance or pity threshold to an Ultra target.", href: "/updates/update-90", action: "Read Update 90 details" };
  return {
    headline: "Plan your budget before rolling",
    body: keep ? "Select a separate slot and check the lock on the style you are keeping. Set a spin limit and check your in-game pity progress. Secret pity does not guarantee the specific style you want." : "Confirm that you are comfortable replacing the style in the selected slot. Set a spin limit and check your in-game pity progress. Secret pity does not guarantee the specific style you want.",
    href: "/tools/spin-budget", action: "Estimate your Secret budget",
  };
}
