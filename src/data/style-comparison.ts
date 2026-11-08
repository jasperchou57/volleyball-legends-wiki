import { featuredStyles } from "./volleyball";
import { tierStyles } from "./style-reviews";

// Mechanics already documented in the style guides and the tier-list evidence review.
// Keep unreviewed legacy notes visibly separate from recent mechanics.
const mechanics: Record<string, { mechanic: string; constraint: string }> = {
  "timeskip-okazu": {
    mechanic: "Anger adds Rainbow Serve segments to the power bar. Jump Set with tilt performs a Border Set, slowing the ball before a court boundary or the net.",
    constraint: "Each Rainbow Serve uses one Anger level. Practice serve timing and aim your Border Set toward the intended boundary.",
  },
  mamori: {
    mechanic: "Block as the ball arrives to Parry. Use Special in the air to Charge toward the ball; early contact can return it, while late contact pops it up on your side.",
    constraint: "Perfect Parry unlocks at Mastery 1 and needs tighter timing. Charge has a 3.5-second cooldown.",
  },
  twins: {
    mechanic: "Switch to Akuto for serving and setting, or Okuro for spiking and blocking. Akuto can use back tilt on a serve to perform a Float Serve.",
    constraint: "The two forms have different attributes. Practice each form and switch to suit your next touch.",
  },
  mikage: {
    mechanic: "Bumps, dives, and sets charge Ghost Arms. Once charged, the wider block and directional tilts help redirect the return.",
    constraint: "Build Ghost Arms through touches before relying on the charged block.",
  },
  roketto: {
    mechanic: "Jetpack adds an aerial movement option. Update 95 fixed the jetpack remaining active after switching styles.",
    constraint: "A tier rating and numeric scores are not yet available for Roketto.",
  },
  taichou: {
    mechanic: "Boosted Set strengthens a teammate’s attack from your set.",
    constraint: "The benefit depends on a teammate using the set. Coordinate your placement with your spiker.",
  },
};

// Neutral summaries of the existing July notes; these are not new balance checks.
const earlierNotes: Record<string, string> = {
  hidari: "Front-row spiker focused on attacking from a teammate’s set.",
  encho: "Stretch extends the arms in mid-air for blocks, spikes, serves, and sets.",
  kyamo: "Setter focused on setting up attacks, with serving as a secondary role.",
  kisuki: "Charged dive increases coverage when recovering difficult balls.",
  sanju: "Directional tilt changes the path of a spike in mid-air.",
  yogan: "Touches and dives build a Rage meter for a temporary power increase.",
  okazu: "Setter-server style for players who want to contribute in both phases.",
  uchikai: "Legendary focused on jumping and spiking at the net.",
  yokai: "Movement-focused style for covering the court and reaching the next touch.",
  kozei: "Legendary with a mix of jump, block, and serve attributes.",
  azmei: "Legendary focused on serves and spikes.",
  sagumi: "Common all-rounder with a mix of setting, spiking, and serving.",
  yachikusai: "Common style with a serving focus.",
  bakuri: "Godly spiker focused on finishing attacks from a teammate’s set.",
  hirakumi: "Block-focused style with a tradeoff in movement speed.",
  "timeskip-kyamo": "Super Set sends the ball toward a fixed point, where it floats before dropping.",
  akari: "Dash-based air movement allows additional airborne actions around the dash.",
};

export const comparisonStyles = tierStyles.map(style => {
  const legacy = featuredStyles.find(entry => entry.slug === style.slug);
  const detail = mechanics[style.slug];
  return {
    ...style,
    mechanic: detail?.mechanic ?? style.review?.reason ?? earlierNotes[style.slug] ?? legacy?.signature ?? style.summary,
    constraint: detail?.constraint ?? style.review?.limitation ?? null,
    olderNotes: !detail && !style.review,
    scores: legacy?.scores ?? null,
  };
});

export type ComparisonPair = { a: string; b: string };
export const defaultComparison: ComparisonPair = { a: "mamori", b: "timeskip-okazu" };
export function resolveComparisonSlug(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const slug = value === "kosumi" ? "kyoshin" : value === "sazuroku" ? "sagafura" : value;
  return comparisonStyles.some(style => style.slug === slug) ? slug : undefined;
}
export function comparisonPair(a: unknown, b: unknown): ComparisonPair {
  const left = resolveComparisonSlug(a) ?? defaultComparison.a;
  const right = resolveComparisonSlug(b);
  return { a: left, b: right && right !== left ? right : left === defaultComparison.b ? defaultComparison.a : defaultComparison.b };
}
export function comparisonHref(pair: ComparisonPair) {
  return `/tools/style-compare?a=${encodeURIComponent(pair.a)}&b=${encodeURIComponent(pair.b)}`;
}

// Accept old name-only saves without keeping obsolete display names in the UI.
export function readSavedComparisons(raw: unknown): ComparisonPair[] {
  if (!Array.isArray(raw)) return [];
  const result: ComparisonPair[] = [];
  const byName = (name: string) => {
    const old = featuredStyles.find(style => style.name === name)?.slug;
    return resolveComparisonSlug(old ?? comparisonStyles.find(style => style.name === name)?.slug ?? (name === "Kosumi" ? "kyoshin" : undefined));
  };
  for (const entry of raw) {
    let a, b;
    if (typeof entry === "string") {
      const names = entry.split(" vs ");
      a = byName(names[0]); b = byName(names[1]);
    } else if (entry && typeof entry === "object") {
      a = resolveComparisonSlug(entry.a); b = resolveComparisonSlug(entry.b);
    }
    if (a && b && a !== b && !result.some(pair => pair.a === a && pair.b === b)) result.push({ a, b });
    if (result.length === 4) break;
  }
  return result;
}
