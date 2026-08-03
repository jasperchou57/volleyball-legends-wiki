import { currentGameState, pageFreshness, siteConfig } from "@/data/volleyball";

export type LegacyRouteOutcome = "Permanent redirect" | "404";

export interface SourceRecord {
  label: string;
  tier: "Official" | "Community" | "Site-maintained";
  url?: string;
  usedFor: string;
  rule: string;
}

export interface LegacyRouteDecision {
  path: string;
  outcome: LegacyRouteOutcome;
  destination?: string;
  reason: string;
  nextReview: string;
}

export const sourceRegistry: SourceRecord[] = [
  {
    label: "Official Discord announcements",
    tier: "Official",
    url: siteConfig.officialLinks.discord,
    usedFor: "Named updates, codes, events, and developer corrections.",
    rule: "Takes precedence over every community report.",
  },
  {
    label: "Roblox game page",
    tier: "Official",
    url: siteConfig.officialLinks.roblox,
    usedFor: "Game availability, public description changes, and release signals.",
    rule: "Useful for confirmation, but not treated as a complete patch note archive.",
  },
  {
    label: "Public player references",
    tier: "Community",
    usedFor: "Working-code reports, return windows, role fit, and patch observations.",
    rule: "Must be dated and corroborated before it becomes a community-verified snapshot.",
  },
  {
    label: "Wiki planning data",
    tier: "Site-maintained",
    usedFor: "Tier ranks, build suggestions, calculator assumptions, and comparisons.",
    rule: "Explains assumptions and never presents editorial judgment as a developer fact.",
  },
];

export const updateVerificationChecklist = [
  "Record the official announcement URL or mark the item as community-reported.",
  "Test new codes in-game when possible; otherwise leave them in Needs verification.",
  "Update the current game snapshot and the affected update, entity, tier, build, and value pages.",
  "Set each relevant last-checked date only after the page content actually changed.",
  "Add new entities to their directory, detail page, homepage path, and related-page links.",
  "Run the content freshness check, lint, and build before publishing.",
];

export const maintenanceCadence = [
  {
    label: "Update day",
    detail: "Refresh the tracker first, then codes, entities, tier/build guidance, and affected internal links.",
  },
  {
    label: "Weekly",
    detail: "Recheck code validity, time-sensitive tier claims, banner availability, and source labels.",
  },
  {
    label: "Monthly",
    detail: "Review Search Console queries and legacy-route performance before creating, redirecting, noindexing, or removing pages.",
  },
];

export const legacyRouteDecisions: LegacyRouteDecision[] = [
  {
    path: "/fighting-styles",
    outcome: "Permanent redirect",
    destination: "/styles",
    reason: "Legacy terminology now maps directly to the real Styles directory.",
    nextReview: "Keep unless Search Console shows a distinct intent that needs its own real page.",
  },
  {
    path: "/sub-abilities",
    outcome: "Permanent redirect",
    destination: "/abilities",
    reason: "Legacy terminology now maps directly to the real Abilities directory.",
    nextReview: "Keep unless Search Console shows a distinct intent that needs its own real page.",
  },
  {
    path: "/vault",
    outcome: "Permanent redirect",
    destination: "/tools",
    reason: "The old destination is replaced by the real tool directory and remains non-indexable.",
    nextReview: "Keep unless an external link requires a more specific replacement.",
  },
  {
    path: "/stands",
    outcome: "404",
    reason: "There is no equivalent Volleyball Legends content, so a redirect would be misleading.",
    nextReview: "Only create a replacement if Search Console or user demand proves a real game-specific intent.",
  },
];

export const maintenanceSnapshot = {
  update: `Update ${currentGameState.updateNumber}`,
  status: currentGameState.verificationStatus,
  lastVerified: currentGameState.lastVerified,
  officialActivity: currentGameState.officialActivity?.observedAt ?? "Not recorded",
  codesLastChecked: pageFreshness.codesLastChecked,
};
