import { MetadataRoute } from "next";
import { abilities, featuredStyles, pageFreshness, siteConfig, updates } from "@/data/volleyball";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteLastUpdated = new Date(pageFreshness.siteLastUpdatedIso);
  const codesLastUpdated = new Date(pageFreshness.codesLastChecked);
  const base = siteConfig.domain;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: siteLastUpdated, changeFrequency: "daily", priority: 1 },
    { url: `${base}/codes`, lastModified: codesLastUpdated, changeFrequency: "daily", priority: 0.95 },
    { url: `${base}/codes/expired`, changeFrequency: "weekly", priority: 0.72 },
    { url: `${base}/haikyuu-legends-codes`, changeFrequency: "daily", priority: 0.82 },
    { url: `${base}/patch-diff`, changeFrequency: "weekly", priority: 0.88 },
    { url: `${base}/trading`, changeFrequency: "weekly", priority: 0.86 },
    { url: `${base}/next-update`, changeFrequency: "daily", priority: 0.82 },
    { url: `${base}/style-return-dates`, changeFrequency: "weekly", priority: 0.87 },
    { url: `${base}/styles`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/abilities`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/updates`, changeFrequency: "daily", priority: 0.85 },
    { url: `${base}/tier-list`, changeFrequency: "weekly", priority: 0.82 },
    { url: `${base}/tier-list/styles`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/tier-list/abilities`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/tier-list/spiker`, changeFrequency: "weekly", priority: 0.78 },
    { url: `${base}/tier-list/setter`, changeFrequency: "weekly", priority: 0.76 },
    { url: `${base}/tier-list/libero`, changeFrequency: "weekly", priority: 0.76 },
    { url: `${base}/tier-list/blocker`, changeFrequency: "weekly", priority: 0.74 },
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/guides/beginner`, changeFrequency: "monthly", priority: 0.76 },
    { url: `${base}/guides/controls`, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/how-to-spike`, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/how-to-serve`, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/how-to-set`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/guides/tutorial`, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/best-binds`, changeFrequency: "monthly", priority: 0.68 },
    { url: `${base}/guides/fps-settings`, changeFrequency: "monthly", priority: 0.68 },
    { url: `${base}/guides/ranks`, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/discord`, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/player-cards`, changeFrequency: "monthly", priority: 0.66 },
    { url: `${base}/guides/top-100`, changeFrequency: "monthly", priority: 0.66 },
    { url: `${base}/guides/trello`, changeFrequency: "monthly", priority: 0.68 },
    { url: `${base}/guides/pity-system`, changeFrequency: "monthly", priority: 0.74 },
    { url: `${base}/tools`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/tools/spin-budget`, changeFrequency: "weekly", priority: 0.78 },
    { url: `${base}/tools/style-compare`, changeFrequency: "weekly", priority: 0.72 },
    { url: `${base}/tools/update-countdown`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/tools/reroll-advisor`, changeFrequency: "weekly", priority: 0.68 },
    { url: `${base}/wiki`, changeFrequency: "weekly", priority: 0.74 },
    { url: `${base}/sources`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const styleRoutes: MetadataRoute.Sitemap = featuredStyles.map((style) => ({
    url: `${base}/styles/${style.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.84,
  }));

  const abilityRoutes: MetadataRoute.Sitemap = abilities.map((ability) => ({
    url: `${base}/abilities/${ability.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.78,
  }));

  const updateRoutes: MetadataRoute.Sitemap = updates.map((update) => ({
    url: `${base}/updates/${update.slug}`,
    lastModified: new Date(update.lastChecked ?? update.published),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...styleRoutes, ...abilityRoutes, ...updateRoutes];
}
