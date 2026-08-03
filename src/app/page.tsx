import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  ArrowRight,
  Clock3,
  Gamepad2,
  ListChecks,
  Search,
  ShieldCheck,
  Swords,
  Trophy,
  Wrench,
} from "lucide-react";
import {
  abilities,
  activeCodes,
  currentGameState,
  datamineSources,
  featuredStyles,
  guideCards,
  heroImages,
  homepageRecentlyUpdatedPages,
  homepageFaq,
  mainQueryChips,
  pageFreshness,
  siteConfig,
  toolCards,
  updates,
} from "@/data/volleyball";
import { UpdateCountdown } from "@/components/volleyball/UpdateCountdown";
import { CopyCodeButton } from "@/components/volleyball/CopyCodeButton";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteConfig.name,
      alternateName: "VolleyballLegends.wiki",
      url: siteConfig.domain,
    },
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
      description: "Fan-made reference for Roblox Volleyball Legends.",
    },
  ],
};

const decisionCards = [
  {
    title: "Return Dates",
    description: "Dated limited-banner history without pretending that a past return predicts the next one.",
    href: "/style-return-dates",
    source: "Community verified",
    icon: Clock3,
  },
  {
    title: "Style Tier List",
    description: "Community-ranked style tiers with links into the underlying style pages.",
    href: "/tier-list/styles",
    source: "Community",
    icon: Swords,
  },
  {
    title: "Patch Diff",
    description: "Before/after tables for known patch changes, separated from raw patch-note replay.",
    href: "/patch-diff",
    source: "Site",
    icon: ListChecks,
  },
  {
    title: "Pity System",
    description: "Community-tracked pity math, event thresholds, and spin-budget implications.",
    href: "/guides/pity-system",
    source: "Community",
    icon: Trophy,
  },
  {
    title: "Best Style + Ability Pairs",
    description: "Role-first pairings for players who need an answer, not a generic planner.",
    href: "/guides/best-builds",
    source: "Site + Community",
    icon: ShieldCheck,
  },
  {
    title: "Style Compare",
    description: "A site-maintained comparison tool for role fit, offense, control, defense, and mobility.",
    href: "/tools/style-compare",
    source: "Site tool",
    icon: Wrench,
  },
];

const roleCards = [
  { title: "Best Spiker Styles", description: "Front-row pressure, timing, and direct point conversion.", href: "/tier-list/spiker" },
  { title: "Best Setter Styles", description: "Tempo, accuracy, and teammate-enabling picks.", href: "/tier-list/setter" },
  { title: "Best Libero Styles", description: "Rally stability, coverage, and defensive recovery.", href: "/tier-list/libero" },
  { title: "Best Blocker Styles", description: "Net control and denial-focused decisions.", href: "/tier-list/blocker" },
  { title: "Overall Style Tier List", description: "Use this only after you know the role you want to play.", href: "/tier-list/styles" },
];

const categoryLinks = [
  { label: "Search", href: "/search" },
  { label: "Codes", href: "/codes" },
  { label: "Updates", href: "/updates" },
  { label: "Styles", href: "/styles" },
  { label: "Abilities", href: "/abilities" },
  { label: "Tier Lists", href: "/tier-list" },
  { label: "Guides", href: "/guides" },
  { label: "Tools", href: "/tools" },
  { label: "Trading", href: "/trading" },
  { label: "Patch Diff", href: "/patch-diff" },
  { label: "Next Update", href: "/next-update" },
  { label: "Return Dates", href: "/style-return-dates" },
];

const beginnerGuideTitles = new Set(["Beginner Guide", "Tutorial", "Controls", "How to Spike", "How to Serve", "How to Set"]);

export default function Home() {
  const codeSummary = activeCodes.slice(0, 5);
  const heroImage = heroImages[0]?.cdnUrl;
  const beginnerGuides = guideCards.filter((guide) => beginnerGuideTitles.has(guide.title)).slice(0, 4);
  const officialSources = datamineSources.filter((source) => source.kind === "Official").slice(0, 4);

  return (
    <>
      <Script
        id="homepage-site-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />

      <div className="pb-20">
        <section
          className="relative overflow-hidden border-b border-border bg-surface"
          style={
            heroImage
              ? {
                  backgroundImage: `linear-gradient(90deg, rgba(6, 12, 22, 0.96) 0%, rgba(6, 12, 22, 0.82) 48%, rgba(6, 12, 22, 0.35) 100%), url(${heroImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }
              : undefined
          }
        >
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-orange/25 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent-orange">
                <Search className="h-4 w-4" />
                Gameplay snapshot: Update {currentGameState.updateNumber}
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-heading font-black text-white md:text-6xl">
                Volleyball Legends Wiki: Codes, Styles, Tier List, Abilities & Update Tracker
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
                Check current codes, limited-return history, style choices, abilities, and update notes without mixing confirmed facts with guesses.
              </p>

              <form action="/search" className="mt-6 flex max-w-2xl flex-col gap-3 rounded-3xl border border-white/10 bg-background/70 p-3 sm:flex-row">
                <label className="sr-only" htmlFor="homepage-search">
                  Search Volleyball Legends Wiki
                </label>
                <input
                  id="homepage-search"
                  name="q"
                  type="search"
                  placeholder="Search codes, styles, abilities, pity, updates..."
                  className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-surface/80 px-4 text-sm text-white outline-none transition placeholder:text-muted focus:border-accent-teal"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-teal px-5 text-sm font-semibold text-white"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </form>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/codes"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(255,106,43,0.28)] transition hover:translate-y-[-1px]"
                >
                  Get Codes
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/style-return-dates"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/70 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30"
                >
                  Check Return Dates
                </Link>
                <Link
                  href="/tier-list/styles"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/50 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
                >
                  Style Tier List
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {mainQueryChips.map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.href}
                    className="rounded-full border border-white/10 bg-background/55 px-4 py-2 text-sm text-slate-200 transition hover:border-white/25 hover:text-white"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <main className="container mx-auto px-4">
          <section className="mt-10 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Codes first</p>
                <h2 className="mt-2 text-3xl font-heading font-bold text-white">Current community-verified codes</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                  Last checked: <strong className="text-slate-200">{pageFreshness.codesLastChecked}</strong>. Multiple public trackers agree on this code cluster; use the in-game redemption box or official Discord for final confirmation.
                </p>
              </div>
              <Link href="/codes" className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white">
                Verify codes
              </Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {codeSummary.map((entry) => (
                <div key={entry.code} className="rounded-3xl border border-accent-gold/20 bg-background/65 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-heading text-lg font-bold text-white">{entry.code}</p>
                    <CopyCodeButton code={entry.code} />
                  </div>
                  <p className="mt-2 text-sm text-slate-200">{entry.reward}</p>
                  <p className="mt-2 text-xs leading-5 text-accent-teal">{entry.status} · {entry.sourceTier}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Last verified game state</p>
                  <h2 className="mt-2 text-3xl font-heading font-bold text-white">Update {currentGameState.updateNumber}: {currentGameState.summary}</h2>
                </div>
                <span className="rounded-full border border-accent-gold/25 bg-accent-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-gold">
                  {currentGameState.verificationStatus}
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Last cross-check</p>
                  <p className="mt-3 text-2xl font-heading font-black text-white">{currentGameState.lastVerified}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">Update notes are Discord-first, so this snapshot only includes details corroborated by multiple public references.</p>
                </div>
                {currentGameState.officialActivity && <div className="rounded-3xl border border-accent-teal/20 bg-accent-teal/10 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-teal">Latest official activity</p>
                  <p className="mt-3 text-2xl font-heading font-black text-white">{currentGameState.officialActivity.observedAt}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{currentGameState.officialActivity.summary}</p>
                </div>}
                <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">What is not confirmed</p>
                  <p className="mt-3 text-2xl font-heading font-black text-accent-orange">Next return: not announced</p>
                  <p className="mt-2 text-sm leading-6 text-muted">A weekly update cadence is not a promise that any particular style or ability will be back next Saturday.</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted">{currentGameState.reviewNote ?? currentGameState.nextUpdateNote}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/next-update" className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white">
                  View update tracker
                </Link>
                <Link href={siteConfig.officialLinks.roblox} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
                  Roblox listing
                </Link>
                <Link href="/style-return-dates" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
                  Return history
                </Link>
                <Link href={siteConfig.officialLinks.discord} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
                  Official Discord
                </Link>
              </div>
            </div>

            <div>
              <UpdateCountdown />
            </div>
          </section>

          <section className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Choose by role</p>
                  <h2 className="mt-2 text-3xl font-heading font-bold text-white">Find the right style before the best tier</h2>
                </div>
                <Swords className="h-6 w-6 text-accent-orange" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {roleCards.map((card) => (
                  <Link key={card.href} href={card.href} className="rounded-3xl border border-white/10 bg-background/65 p-4 transition hover:border-white/25">
                    <h3 className="font-heading text-lg font-bold text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{card.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Decision hub</p>
                  <h2 className="mt-2 text-3xl font-heading font-bold text-white">Make the next play or spin count</h2>
                </div>
                <span className="text-xs leading-5 text-muted">Source labels separate official signals, community data, and site-maintained tools.</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {decisionCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <Link
                      key={card.href}
                      href={card.href}
                      className="group rounded-3xl border border-white/10 bg-background/65 p-5 transition hover:border-white/25"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <Icon className="h-5 w-5 text-accent-orange" />
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted">
                          {card.source}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-heading font-bold text-white">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{card.description}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Recently updated</p>
                <h2 className="mt-2 text-3xl font-heading font-bold text-white">Pages to check first</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-muted">
                Start here for the latest verified codes, banner context, and changed mechanics.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {homepageRecentlyUpdatedPages.map((page) => (
                <Link key={page.href} href={page.href} className="group rounded-3xl border border-border bg-surface/80 p-5 transition hover:border-white/25">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted">{page.sourceLabel}</span>
                    <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <h3 className="mt-4 text-xl font-heading font-bold text-white">{page.title}</h3>
                  <p className="mt-1 text-xs text-muted">Updated {page.updatedAt}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{page.reason}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Top wiki pages</p>
                <h2 className="mt-2 text-3xl font-heading font-bold text-white">Styles and abilities players keep checking</h2>
              </div>
              <div className="flex gap-3">
                <Link href="/styles" className="text-sm font-semibold text-accent-teal transition hover:text-white">Styles</Link>
                <Link href="/abilities" className="text-sm font-semibold text-accent-teal transition hover:text-white">Abilities</Link>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredStyles.slice(0, 4).map((style) => (
                <Link key={style.slug} href={`/styles/${style.slug}`} className="group rounded-3xl border border-border bg-surface/80 p-6 transition hover:border-white/25">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex rounded-full border border-white/10 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        {style.rarity} / {style.role}
                      </div>
                      <h3 className="mt-4 text-2xl font-heading font-bold text-white">{style.name}</h3>
                    </div>
                    <span className="rounded-full border border-accent-orange/20 bg-accent-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange">
                      Tier {style.communityTier}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted">{style.summary}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">Source: {style.sourceTier}</p>
                </Link>
              ))}
              {abilities.slice(0, 2).map((ability) => (
                <Link key={ability.slug} href={`/abilities/${ability.slug}`} className="group rounded-3xl border border-border bg-surface/80 p-6 transition hover:border-white/25">
                  <div className="inline-flex rounded-full border border-white/10 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {ability.rarity} / {ability.kind}
                  </div>
                  <h3 className="mt-4 text-2xl font-heading font-bold text-white">{ability.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted">{ability.summary}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">Source: {ability.sourceTier}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Browse by category</p>
                <h2 className="mt-2 text-3xl font-heading font-bold text-white">Full wiki map</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {categoryLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-2xl border border-border bg-surface/80 p-4 text-sm font-semibold text-white transition hover:border-white/25">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Beginner and how-to</p>
                <h2 className="mt-2 text-3xl font-heading font-bold text-white">Useful, but no longer the homepage lead</h2>
              </div>
              <div className="space-y-3">
                {beginnerGuides.map((guide) => (
                  <Link key={guide.href} href={guide.href} className="block rounded-3xl border border-border bg-surface/80 p-5 transition hover:border-white/25">
                    <h3 className="text-lg font-heading font-bold text-white">{guide.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{guide.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Official media</p>
                <h2 className="mt-2 text-3xl font-heading font-bold text-white">Roblox preview images</h2>
              </div>
              <p className="text-xs text-muted">Source: Roblox game media API. Images © the Volleyball Legends developers.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {heroImages.slice(0, 4).map((img) => (
                <div key={img.cdnUrl} className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-background/60">
                  <Image
                    src={img.cdnUrl}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Official sources</p>
                <h2 className="mt-2 text-3xl font-heading font-bold text-white">Where official signals come from</h2>
              </div>
              <p className="text-xs text-muted">Official data synced: {pageFreshness.officialDataLastSynced}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {officialSources.map((source) => (
                <a
                  key={source.label}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-3xl border border-white/10 bg-background/65 p-5 transition hover:border-white/25"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-teal">Official</p>
                  <h3 className="mt-3 text-lg font-heading font-bold text-white">{source.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{source.watchFor}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Update archive</p>
                  <h2 className="mt-2 text-3xl font-heading font-bold text-white">Indexed Saturday notes</h2>
                </div>
                <Clock3 className="h-6 w-6 text-accent-orange" />
              </div>
              <div className="mt-6 space-y-4">
                {updates.slice(0, 3).map((update) => (
                  <Link key={update.slug} href={`/updates/${update.slug}`} className="block rounded-3xl border border-white/10 bg-background/65 p-5 transition hover:border-white/20">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-xl font-heading font-bold text-white">{update.title}</h3>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted">
                        {update.sourceTier}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted">{update.published}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">{update.summary}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Tools</p>
                  <h2 className="mt-2 text-3xl font-heading font-bold text-white">Site-maintained helpers</h2>
                </div>
                <Gamepad2 className="h-6 w-6 text-accent-teal" />
              </div>
              <div className="mt-6 space-y-4">
                {toolCards.slice(0, 3).map((tool) => (
                  <Link key={tool.href} href={tool.href} className="block rounded-3xl border border-accent-teal/20 bg-accent-teal/10 p-5 transition hover:border-accent-teal/40">
                    <h3 className="text-lg font-heading font-bold text-white">{tool.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">FAQ and sources</p>
              <h2 className="mt-2 text-3xl font-heading font-bold text-white">Source policy</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Official Roblox API data, official Discord signals, community reporting, and site-maintained planner data are labeled separately.
              </p>
            </div>
            <div className="space-y-4">
              {homepageFaq.map((item) => (
                <details key={item.question} className="rounded-3xl border border-white/10 bg-background/65 p-5">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-white">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
