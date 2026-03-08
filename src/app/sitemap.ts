import { MetadataRoute } from "next";
import { abilities, featuredStyles, siteConfig, updates } from "@/data/volleyball";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.domain;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/codes`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${base}/haikyuu-legends-codes`, lastModified: now, changeFrequency: "daily", priority: 0.82 },
    { url: `${base}/styles`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/abilities`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/updates`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${base}/tier-list`, lastModified: now, changeFrequency: "weekly", priority: 0.82 },
    { url: `${base}/tier-list/styles`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/tier-list/abilities`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/tier-list/spiker`, lastModified: now, changeFrequency: "weekly", priority: 0.78 },
    { url: `${base}/tier-list/setter`, lastModified: now, changeFrequency: "weekly", priority: 0.76 },
    { url: `${base}/tier-list/libero`, lastModified: now, changeFrequency: "weekly", priority: 0.76 },
    { url: `${base}/tier-list/blocker`, lastModified: now, changeFrequency: "weekly", priority: 0.74 },
    { url: `${base}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/guides/beginner`, lastModified: now, changeFrequency: "monthly", priority: 0.76 },
    { url: `${base}/guides/controls`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/how-to-spike`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/how-to-serve`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/how-to-set`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/guides/tutorial`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/best-binds`, lastModified: now, changeFrequency: "monthly", priority: 0.68 },
    { url: `${base}/guides/fps-settings`, lastModified: now, changeFrequency: "monthly", priority: 0.68 },
    { url: `${base}/guides/ranks`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/discord`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/guides/player-cards`, lastModified: now, changeFrequency: "monthly", priority: 0.66 },
    { url: `${base}/guides/top-100`, lastModified: now, changeFrequency: "monthly", priority: 0.66 },
    { url: `${base}/guides/trello`, lastModified: now, changeFrequency: "monthly", priority: 0.68 },
    { url: `${base}/guides/pity-system`, lastModified: now, changeFrequency: "monthly", priority: 0.74 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/tools/style-compare`, lastModified: now, changeFrequency: "weekly", priority: 0.72 },
    { url: `${base}/tools/update-countdown`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/tools/reroll-advisor`, lastModified: now, changeFrequency: "weekly", priority: 0.68 },
    { url: `${base}/wiki`, lastModified: now, changeFrequency: "weekly", priority: 0.74 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const styleRoutes: MetadataRoute.Sitemap = featuredStyles.map((style) => ({
    url: `${base}/styles/${style.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.84,
  }));

  const abilityRoutes: MetadataRoute.Sitemap = abilities.map((ability) => ({
    url: `${base}/abilities/${ability.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.78,
  }));

  const updateRoutes: MetadataRoute.Sitemap = updates.map((update) => ({
    url: `${base}/updates/${update.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...styleRoutes, ...abilityRoutes, ...updateRoutes];
}
