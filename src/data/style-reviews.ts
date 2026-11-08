import { featuredStyles, type CommunityTier, type Role } from "./volleyball";

// Evidence and decisions: review-notes/tier-list-2026-11-08.json.
// This is a source review, not an in-game test or an official ranking.
export const styleReviewDate = "2026-11-08";
export interface StyleReview {
  status: "Reviewed" | "Provisional";
  reason: string;
  limitation: string;
  basis: string;
  href?: string;
}

export const styleReviews: Record<string, StyleReview> = {
  "timeskip-okazu": {
    status: "Provisional",
    reason: "Anger makes Rainbow Serves easier to time, while Border Set helps place sets near court boundaries. Suits players who want both serving and setting options.",
    limitation: "Each Rainbow Serve uses one Anger level. You still need to time the serve and aim your Border Sets.",
    basis: "Mechanics: Updates 94–95. Rating: editorial judgment, provisional after the rework.",
    href: "/updates/update-94",
  },
  taichou: {
    status: "Reviewed",
    reason: "Boosted Set strengthens a teammate’s attack. A support pick for setters who coordinate with their spiker.",
    limitation: "The boost depends on a teammate attacking from your set. Communicate where you plan to send the ball.",
    basis: "Based on community-documented Boosted Set mechanics. A is our editorial recommendation, not an announced nerf.",
  },
  kyoshin: {
    status: "Reviewed",
    reason: "A back-row Legendary for receiving and supporting sets. Suits players who focus on keeping rallies alive.",
    limitation: "Its receive-oriented kit offers less direct scoring pressure than an attacking specialist.",
    basis: "Role and former name checked against community documentation. B is our editorial recommendation.",
  },
  sagafura: {
    status: "Reviewed",
    reason: "A support-focused Legendary for receiving the ball and setting up teammates.",
    limitation: "Best suited to a support role; choose an attacking specialist if you want to lead the offense.",
    basis: "Role and former name checked against community documentation. This rating does not indicate a new balance change.",
  },
  mamori: {
    status: "Provisional",
    reason: "Parry knocks opponents back when you time your block. Charge lets you reach the ball in the air for a return or a pop-up.",
    limitation: "Perfect Parry unlocks at Mastery 1 and needs tighter timing. Charge has a 3.5-second cooldown, so commit carefully.",
    basis: "Mechanics: Updates 92–93. Rating: editorial judgment; player assessments differ.",
    href: "/styles/mamori",
  },
};

export function getStyleReview(slug: string) {
  return styleReviews[slug === "kosumi" ? "kyoshin" : slug];
}

export function styleDisplayName(slug: string, name: string) {
  return slug === "sagafura" ? "Sazuroku" : slug === "kosumi" ? "Kyoshin" : name;
}

export function styleRatingLabel(slug: string, tier: CommunityTier) {
  const review = getStyleReview(slug);
  return `${tier} · ${review ? review.status === "Provisional" ? "Provisional" : "Site rating" : "July 2026 rating"}`;
}

export interface TierStyle {
  slug: string;
  name: string;
  rarity: string;
  role: Role;
  bestRoles: Role[];
  tier: CommunityTier | null;
  summary: string;
  href: string;
  review?: StyleReview;
}

export const tierStyles: TierStyle[] = [
  ...featuredStyles.map(style => ({
    slug: style.slug, name: styleDisplayName(style.slug, style.name), rarity: style.rarity,
    role: style.role, bestRoles: style.bestRoles, tier: style.communityTier,
    summary: style.summary, href: `/styles/${style.slug}`, review: getStyleReview(style.slug),
  })),
  {
    slug: "mamori", name: "Mamori", rarity: "Ultra", role: "Blocker", bestRoles: ["Blocker"],
    tier: "A", summary: "Middle blocker with Parry, airborne Charge, and five Mastery upgrades.",
    href: "/styles/mamori", review: styleReviews.mamori,
  },
  {
    slug: "roketto", name: "Roketto", rarity: "Secret", role: "Spiker", bestRoles: ["Spiker", "Blocker"],
    tier: null, summary: "Jetpack style for aerial movement. Update 95 fixed the jetpack remaining active after switching to another style.",
    href: "/updates/update-95",
    review: {
      status: "Reviewed", reason: "Jetpack adds an aerial movement option. Compare its timing with the style you already use before spending spins.",
      limitation: "Not rated yet: available player assessments differ too much to support a reliable grade.",
      basis: "Community-documented Jetpack. Update 95 fixed it remaining active after switching styles.", href: "/updates/update-95",
    },
  },
];

const tierOrder = { S: 0, A: 1, B: 2, C: 3 };
export function getTierStyles(role?: Role) {
  return tierStyles.filter(style => !role || style.bestRoles.includes(role)).sort((a,b) =>
    Number(Boolean(b.review)) - Number(Boolean(a.review)) ||
    (a.tier ? tierOrder[a.tier] : 4) - (b.tier ? tierOrder[b.tier] : 4) || a.name.localeCompare(b.name));
}
