import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ArrowRight, Clock3, Gamepad2, Gift, Swords, TrendingUp, Trophy, Wrench } from "lucide-react";
import {
  abilities,
  activeCodes,
  featuredStyles,
  guideCards,
  heroImages,
  homepageFaq,
  mainQueryChips,
  officialSnapshot,
  siteConfig,
  toolCards,
  trendingQueryChips,
  updates,
} from "@/data/volleyball";
import { UpdateCountdown } from "@/components/volleyball/UpdateCountdown";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const numberFormatter = new Intl.NumberFormat("en-US");

const spotlightCards = [
  {
    title: "Volleyball Legends Codes",
    description: "The main traffic page: fresh codes, release timestamps, and official-channel verification notes.",
    href: "/codes",
    icon: Gift,
  },
  {
    title: "Update 65: Season 14 & Easter Season",
    description: "Egg event, Chaos mode teaser, Kisuki buff, and Encho's permanent exit at the April 11 reset.",
    href: "/updates/update-65-season-14",
    icon: TrendingUp,
  },
  {
    title: "Styles Wiki",
    description: "High-demand style pages for Encho, Twins, Mikage, Kijo, Jinko, Ronin, Taichou, and more.",
    href: "/styles",
    icon: Swords,
  },
  {
    title: "Ability Pages",
    description: "Lead Feet, Curve Spike, Extra Touch, Divine Strength, Steel Block, and more.",
    href: "/abilities",
    icon: Wrench,
  },
];

export default function Home() {
  const approvalRate = ((officialSnapshot.upVotes / (officialSnapshot.upVotes + officialSnapshot.downVotes)) * 100).toFixed(1);

  return (
    <>
      <Script
        id="homepage-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 pb-20 pt-10 md:pt-16">
        <section className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-surface to-[#0b1826] px-6 py-10 shadow-[0_30px_90px_rgba(8,21,33,0.38)] md:px-10 md:py-14">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-orange via-accent-gold to-accent-teal" />
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-orange/25 bg-accent-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent-orange">
                <Clock3 className="h-4 w-4" />
                Weekly Saturday spike window
              </div>

              <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-heading font-black tracking-tight text-white md:text-6xl">
              Volleyball Legends Wiki: Codes, Styles, Tier List & Update Guides
            </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                  A query-first hub for the biggest Volleyball Legends search intents: codes, styles, abilities, ranked notes, and fast update coverage. Built to answer what players are already typing into Google.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/codes"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(255,106,43,0.28)] transition hover:translate-y-[-1px]"
                >
                  Get Codes
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/styles"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25"
                >
                  Browse Styles
                </Link>
                <Link
                  href={siteConfig.officialLinks.discord}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Official Discord
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {mainQueryChips.map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.href}
                    className="rounded-full border border-white/10 bg-background/45 px-4 py-2 text-sm text-slate-200 transition hover:border-white/25 hover:text-white"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Codes tracked</p>
                <p className="mt-3 text-4xl font-heading font-black text-accent-orange">{activeCodes.length}</p>
                <p className="mt-2 text-sm leading-6 text-muted">Split into fresh update codes and older still-circulating codes that need fast in-game verification.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Styles live</p>
                <p className="mt-3 text-4xl font-heading font-black text-accent-teal">{featuredStyles.length}</p>
                <p className="mt-2 text-sm leading-6 text-muted">A growing directory of high-intent style pages. Community wiki pages currently track 36 styles overall.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Abilities tracked</p>
                <p className="mt-3 text-4xl font-heading font-black text-accent-gold">{abilities.length}</p>
                <p className="mt-2 text-sm leading-6 text-muted">Coverage now includes the core ability roster plus newer search-driven pages like Lead Feet.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Update cadence</p>
                <p className="mt-3 text-2xl font-heading font-black text-white">{siteConfig.updateSchedule}</p>
                <p className="mt-2 text-sm leading-6 text-muted">A dedicated countdown tool keeps the Saturday posting workflow front and center.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Official preview images</p>
              <h2 className="mt-2 text-2xl font-heading font-bold text-white">Volleyball Legends on Roblox</h2>
            </div>
            <p className="text-xs text-muted">Source: Roblox game media API. Images © the Volleyball Legends developers.</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {heroImages.slice(0, 8).map((img) => (
              <div key={img.cdnUrl} className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-background/60">
                <Image
                  src={img.cdnUrl}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Official snapshot</p>
              <h2 className="mt-2 text-2xl font-heading font-bold text-white">Roblox data as of {officialSnapshot.snapshotDateLabel}</h2>
            </div>
            <p className="max-w-xl text-xs leading-5 text-muted">
              Latest public patch remains <strong className="text-white">{officialSnapshot.latestPublicPatch}</strong> from {officialSnapshot.latestPublicPatchDate}. Roblox itself shows a newer game-page update at <strong className="text-white">{officialSnapshot.gameUpdatedLabel}</strong>.
            </p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Playing now</p>
              <p className="mt-3 text-4xl font-heading font-black text-accent-orange">{numberFormatter.format(officialSnapshot.playing)}</p>
              <p className="mt-2 text-sm leading-6 text-muted">Concurrent players from the Roblox games API.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Total visits</p>
              <p className="mt-3 text-4xl font-heading font-black text-accent-teal">{numberFormatter.format(officialSnapshot.visits)}</p>
              <p className="mt-2 text-sm leading-6 text-muted">Lifetime plays on the official Roblox listing.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Favorites</p>
              <p className="mt-3 text-4xl font-heading font-black text-accent-gold">{numberFormatter.format(officialSnapshot.favorites)}</p>
              <p className="mt-2 text-sm leading-6 text-muted">Favorited count from the official game listing.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Approval rate</p>
              <p className="mt-3 text-4xl font-heading font-black text-white">{approvalRate}%</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {numberFormatter.format(officialSnapshot.upVotes)} upvotes vs {numberFormatter.format(officialSnapshot.downVotes)} downvotes.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Group members</p>
              <p className="mt-3 text-4xl font-heading font-black text-accent-orange">{numberFormatter.format(officialSnapshot.groupMembers)}</p>
              <p className="mt-2 text-sm leading-6 text-muted">Players inside the official Volleyball Game Group.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Official media</p>
              <p className="mt-3 text-4xl font-heading font-black text-accent-teal">
                {officialSnapshot.mediaImages} + {officialSnapshot.mediaVideos}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">Approved Roblox previews: {officialSnapshot.mediaImages} images and {officialSnapshot.mediaVideos} preview video.</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">{officialSnapshot.note}</p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {spotlightCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-3xl border border-border bg-surface/80 p-6 transition hover:border-white/20 hover:bg-surface-raised/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl border border-white/10 bg-background/60 p-3">
                    <Icon className="h-6 w-6 text-accent-orange" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted transition group-hover:translate-x-1 group-hover:text-white" />
                </div>
                <h2 className="mt-5 text-2xl font-heading font-bold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{card.description}</p>
              </Link>
            );
          })}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Rising queries</p>
              <h2 className="mt-2 text-3xl font-heading font-bold text-white">What players are searching right now</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {trendingQueryChips.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="rounded-full border border-white/10 bg-surface/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-accent-orange/40 hover:text-white"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <UpdateCountdown />
        </section>

        <section className="mt-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Top landing pages</p>
              <h2 className="mt-2 text-3xl font-heading font-bold text-white">Featured style pages</h2>
            </div>
            <Link href="/styles" className="text-sm font-semibold text-accent-teal transition hover:text-white">
              View all styles
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredStyles.slice(0, 6).map((style) => (
              <Link
                key={style.slug}
                href={`/styles/${style.slug}`}
                className="group rounded-3xl border border-border bg-surface/80 p-6 transition hover:border-white/20 hover:bg-surface-raised/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex rounded-full border border-white/10 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      {style.rarity} · {style.role}
                    </div>
                    <h3 className="mt-4 text-2xl font-heading font-bold text-white">{style.name}</h3>
                  </div>
                  <div className="rounded-full border border-accent-orange/20 bg-accent-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange">
                    Tier {style.communityTier}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">{style.summary}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-200">
                  <div className="rounded-2xl border border-white/10 bg-background/65 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Offense</p>
                    <p className="mt-1 text-xl font-heading font-bold text-white">{style.scores.offense}/10</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-background/65 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Control</p>
                    <p className="mt-1 text-xl font-heading font-bold text-white">{style.scores.control}/10</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Update coverage</p>
                <h2 className="mt-2 text-3xl font-heading font-bold text-white">Saturday update notes</h2>
              </div>
              <Clock3 className="h-6 w-6 text-accent-orange" />
            </div>
            <div className="mt-6 space-y-4">
              {updates.map((update) => (
                <Link
                  key={update.slug}
                  href={`/updates/${update.slug}`}
                  className="block rounded-3xl border border-white/10 bg-background/65 p-5 transition hover:border-white/20"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-heading font-bold text-white">{update.title}</h3>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
                      {update.published}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{update.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Guides & tools</p>
                <h2 className="mt-2 text-3xl font-heading font-bold text-white">Pages built for retention</h2>
              </div>
              <Trophy className="h-6 w-6 text-accent-teal" />
            </div>

            <div className="mt-6 space-y-4">
              {guideCards.slice(0, 4).map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="block rounded-3xl border border-white/10 bg-background/65 p-5 transition hover:border-white/20"
                >
                  <h3 className="text-lg font-heading font-bold text-white">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{guide.description}</p>
                </Link>
              ))}

              {toolCards.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block rounded-3xl border border-accent-teal/20 bg-accent-teal/10 p-5 transition hover:border-accent-teal/40"
                >
                  <h3 className="text-lg font-heading font-bold text-white">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">SEO foundation</p>
            <h2 className="mt-2 text-3xl font-heading font-bold text-white">Home page FAQ</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              These answers reinforce the site structure and source policy instead of pretending everything is official data.
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

        <section className="mt-10 flex flex-wrap items-center gap-4 rounded-3xl border border-border bg-background/45 px-6 py-4 text-sm text-muted">
          <Gamepad2 className="h-5 w-5 text-accent-orange" />
          <span>Official links: Roblox listing and Discord.</span>
          <span>Community data: styles, abilities, pity notes, and many update-specific stat sheets.</span>
          <span>Site tools: compare, reroll advice, and tier grouping.</span>
        </section>
      </div>
    </>
  );
}
