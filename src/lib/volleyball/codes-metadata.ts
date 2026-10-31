import type { Metadata } from "next";
import type { CodeEntry } from "@/data/volleyball";
import { codeRewardTotals, newestCodeBatch } from "../../data/codes-automation";

export function buildCodesMetadata(updateNumber: number, activeCodes: CodeEntry[], now = new Date()): Metadata {
  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long", year: "numeric", timeZone: "America/New_York",
  }).format(now);
  const newest = newestCodeBatch(activeCodes);
  const rewards = codeRewardTotals(newest);
  const rewardText = [rewards.styleSpins ? `${rewards.styleSpins} Lucky Style Spins` : "", rewards.abilitySpins ? `${rewards.abilitySpins} Lucky Ability Spins` : ""].filter(Boolean).join(" and ");
  return {
    title: { absolute: `Volleyball Legends Codes (${monthYear}) - [Update ${updateNumber}] Working Spins` },
    description: newest.length
      ? `Find ${newest.length} new Volleyball Legends Update ${updateNumber} codes${rewardText ? ` for ${rewardText}` : ""}, plus rewards and redemption steps.`
      : "Find Volleyball Legends code updates and redemption steps. Check back for newly announced codes.",
    alternates: { canonical: "/codes" },
  };
}
