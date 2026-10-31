import type { Metadata } from "next";
import type { CodeEntry } from "@/data/volleyball";

// Date-only evidence remains an ISO date. Full timestamps must include their timezone.
export function normalizeCodesDate(value: string): string {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const timestamp = /^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value);
  const editorialDate = /^[A-Za-z]+ \d{1,2}, \d{4}$/.test(value);
  const parsed = new Date(editorialDate ? `${value} UTC` : value);
  if ((!dateOnly && !timestamp && !editorialDate) || !Number.isFinite(parsed.getTime())) {
    throw new Error("Codes freshness requires a recorded date or timestamp with timezone.");
  }
  if (dateOnly && parsed.toISOString().slice(0, 10) !== value) throw new Error("Invalid Codes date.");
  return timestamp ? parsed.toISOString() : parsed.toISOString().slice(0, 10);
}

export function formatCodesDate(value: string, monthOnly = false): string {
  const iso = normalizeCodesDate(value);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric", month: "long", ...(monthOnly ? {} : { day: "numeric" as const }),
    // A calendar date has no clock or timezone; keep that date intact.
    timeZone: iso.length === 10 ? "UTC" : "America/New_York",
  }).format(new Date(iso));
}

export function buildCodesMetadata(updateNumber: number, activeCodes: Pick<CodeEntry, "code">[], contentUpdatedAt: string): Metadata {
  if (!Number.isInteger(updateNumber) || updateNumber < 1) throw new Error("A real game update number is required.");
  const currentMonthYear = formatCodesDate(contentUpdatedAt, true);
  const latestUpdateName = `Update ${updateNumber}`;
  return {
    title: { absolute: `Volleyball Legends Codes (${currentMonthYear}) - [${latestUpdateName}] Working Spins` },
    description: `All ${activeCodes.length} working Volleyball Legends codes for ${latestUpdateName} (${currentMonthYear}). Copy the brand-new update codes to claim free Lucky Style Spins & Ability Spins before they expire!`,
    alternates: { canonical: "/codes" },
  };
}

export function buildCodesWebPageSchema(description: string, contentUpdatedAt: string, verifiedAt: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.volleyballlegends.wiki/codes#webpage",
    url: "https://www.volleyballlegends.wiki/codes",
    name: "Volleyball Legends Codes",
    description,
    inLanguage: "en",
    dateModified: normalizeCodesDate(contentUpdatedAt),
    lastReviewed: normalizeCodesDate(formatCodesDate(verifiedAt)),
  };
}
