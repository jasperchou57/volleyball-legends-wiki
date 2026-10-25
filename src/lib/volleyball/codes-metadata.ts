import type { Metadata } from "next";
import type { CodeEntry } from "@/data/volleyball";

export function buildCodesMetadata(updateNumber: number, activeCodes: Pick<CodeEntry, "code">[], now = new Date()): Metadata {
  const latestUpdateName = `Update ${updateNumber}`;
  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long", year: "numeric", timeZone: "Asia/Shanghai",
  }).format(now);
  const exampleCode = activeCodes[0]?.code;
  const redemptionDescription = exampleCode
    ? `Redeem active codes like ${exampleCode} for free Lucky Style Spins & Ability Spins.`
    : "Check back for new codes offering free Lucky Style Spins & Ability Spins.";
  return {
    title: { absolute: `Volleyball Legends Codes (${monthYear}) - [${latestUpdateName}] Working Spins` },
    description: `All ${activeCodes.length} working Volleyball Legends codes for ${latestUpdateName} (${monthYear}). ${redemptionDescription} Updated and verified daily.`,
    alternates: { canonical: "/codes" },
  };
}
