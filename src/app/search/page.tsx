import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import {
  abilities,
  activeCodes,
  featuredStyles,
  guideCards,
  pageFreshness,
  toolCards,
  updates,
} from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Search Volleyball Legends Wiki",
  description: "Search Volleyball Legends codes, styles, abilities, updates, guides, tools, and source-labeled wiki pages.",
  alternates: { canonical: "/search" },
};

type SearchPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

type SearchResult = {
  title: string;
  href: string;
  type: string;
  source: string;
  summary: string;
  keywords: string[];
};

const staticResults: SearchResult[] = [
  {
    title: "Codes",
    href: "/codes",
    type: "Codes",
    source: "Community",
    summary: `Reported-active and verification-needed codes. Last checked ${pageFreshness.codesLastChecked}.`,
    keywords: ["codes", "code", "spins", "lucky spins", "redeem"],
  },
  {
    title: "Next Update Tracker",
    href: "/next-update",
    type: "Update",
    source: "Official watch",
    summary: `Official Roblox activity and Discord-first patch-note monitoring. Last checked ${pageFreshness.updateTrackerLastUpdated}.`,
    keywords: ["next update", "latest update", "update tracker", "discord", "roblox api"],
  },
  {
    title: "Style Tier List",
    href: "/tier-list/styles",
    type: "Tier List",
    source: "Community",
    summary: `Community-maintained style ranking. Last updated ${pageFreshness.tierListLastUpdated}.`,
    keywords: ["tier list", "best style", "styles", "meta"],
  },
  {
    title: "Trading Value List",
    href: "/trading",
    type: "Values",
    source: "Site",
    summary: `Editorial value tiers, not official prices. Last updated ${pageFreshness.tradingLastUpdated}.`,
    keywords: ["values", "trading", "trade", "value list"],
  },
  {
    title: "Pity System",
    href: "/guides/pity-system",
    type: "Guide",
    source: "Community",
    summary: `Community-tracked pity math and spin budget context. Last updated ${pageFreshness.pityLastUpdated}.`,
    keywords: ["pity", "spin", "lucky", "secret", "evo", "drop rate"],
  },
];

function buildSearchIndex(): SearchResult[] {
  return [
    ...staticResults,
    ...activeCodes.map((entry) => ({
      title: entry.code,
      href: "/codes",
      type: "Code",
      source: entry.sourceTier,
      summary: `${entry.reward}. Released ${entry.releaseDate}. Status: ${entry.status === "Active" ? "reported active" : "needs check"}.`,
      keywords: [entry.code, entry.reward, entry.releaseDate, entry.status, entry.sourceNote],
    })),
    ...featuredStyles.map((style) => ({
      title: style.name,
      href: `/styles/${style.slug}`,
      type: "Style",
      source: style.sourceTier,
      summary: `${style.rarity} ${style.role}. Tier ${style.communityTier}. ${style.summary}`,
      keywords: [style.slug, style.rarity, style.role, style.communityTier, style.availability, ...style.searchTerms],
    })),
    ...abilities.map((ability) => ({
      title: ability.name,
      href: `/abilities/${ability.slug}`,
      type: "Ability",
      source: ability.sourceTier,
      summary: `${ability.rarity} ${ability.kind}. Tier ${ability.communityTier}. ${ability.summary}`,
      keywords: [ability.slug, ability.rarity, ability.kind, ability.communityTier, ...ability.searchTerms],
    })),
    ...updates.map((update) => ({
      title: update.title,
      href: `/updates/${update.slug}`,
      type: "Update",
      source: update.sourceTier,
      summary: `${update.published}. ${update.summary}`,
      keywords: [update.slug, update.published, ...update.highlights, ...update.codes, ...(update.focusStyles ?? [])],
    })),
    ...guideCards.map((guide) => ({
      title: guide.title,
      href: guide.href,
      type: "Guide",
      source: "Site",
      summary: guide.description,
      keywords: [guide.title, guide.description],
    })),
    ...toolCards.map((tool) => ({
      title: tool.title,
      href: tool.href,
      type: "Tool",
      source: "Site",
      summary: tool.description,
      keywords: [tool.title, tool.description],
    })),
  ];
}

function matches(result: SearchResult, query: string) {
  const haystack = [result.title, result.type, result.source, result.summary, ...result.keywords]
    .join(" ")
    .toLowerCase();

  return query
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = (params?.q ?? "").trim().toLowerCase();
  const results = query ? buildSearchIndex().filter((result) => matches(result, query)).slice(0, 30) : staticResults;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Search</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-teal/20 bg-accent-teal/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">
          <Search className="h-4 w-4" />
          Site search
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
          Search Volleyball Legends Wiki
        </h1>
        <form action="/search" className="mt-6 flex flex-col gap-3 rounded-3xl border border-white/10 bg-background/70 p-3 sm:flex-row">
          <label className="sr-only" htmlFor="search-page-query">
            Search query
          </label>
          <input
            id="search-page-query"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search codes, styles, abilities, pity, updates..."
            className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-surface/80 px-4 text-sm text-white outline-none transition placeholder:text-muted focus:border-accent-teal"
          />
          <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-teal px-5 text-sm font-semibold text-white">
            <Search className="h-4 w-4" />
            Search
          </button>
        </form>
        <p className="mt-3 text-sm leading-6 text-muted">
          Results include official-watch pages, community-tracked data, and site-maintained tools. Source labels are shown on every result.
        </p>
      </section>

      <section className="mt-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              {query ? "Search results" : "Suggested starting points"}
            </p>
            <h2 className="mt-2 text-2xl font-heading font-bold text-white">
              {query ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"` : "High-intent pages"}
            </h2>
          </div>
        </div>

        <div className="grid gap-4">
          {results.map((result) => (
            <Link key={`${result.type}-${result.href}-${result.title}`} href={result.href} className="block rounded-3xl border border-border bg-surface/80 p-5 transition hover:border-white/25">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-heading font-bold text-white">{result.title}</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.16em] text-muted">{result.type}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.16em] text-muted">{result.source}</span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{result.summary}</p>
            </Link>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-background/45 p-8 text-center text-sm text-muted">
            No matching page found. Try a shorter query such as codes, Encho, pity, tier list, or next update.
          </div>
        ) : null}
      </section>
    </div>
  );
}
