import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { featuredStyles, getStyle, abilities } from "@/data/volleyball";
import { NextStepPanel } from "@/components/volleyball/NextStepPanel";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return featuredStyles.map((style) => ({ slug: style.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const style = getStyle(params.slug);

  if (!style) {
    return {};
  }

  return {
    title: `${style.name} Style Guide & Stats`,
    description: `${style.name} in Volleyball Legends: rarity, role, community snapshot, best abilities, and search-driven notes.`,
  };
}

function getStrengthLines(slug: string) {
  const style = getStyle(slug);
  if (!style) return [];

  const lines: string[] = [];

  if (style.scores.offense >= 8) lines.push("Strong point-ending pressure when the set quality is good.");
  if (style.scores.control >= 8) lines.push("More forgiving than average when you need to shape the ball or stabilize awkward contacts.");
  if (style.scores.defense >= 8) lines.push("Reliable in longer rallies and much better than average at preventing easy points.");
  if (style.scores.mobility >= 8) lines.push("Can cover more of the court than most styles, which raises its value in broken plays.");
  if (style.role === "Setter") lines.push("Fits players who care about tempo, readability, and enabling teammates instead of only finishing points.");
  if (style.role === "Spiker") lines.push("Fits players who want a clearer front-row identity and more ways to convert good sets into points.");
  if (style.role === "Libero") lines.push("Rewards players who would rather stabilize games than coinflip every rally on offense.");

  return lines.slice(0, 4);
}

function getWatchoutLines(slug: string) {
  const style = getStyle(slug);
  if (!style) return [];

  const lines: string[] = [];

  if (style.scores.difficulty >= 8) lines.push("This style punishes weak mechanics quickly, so it is a poor fit if your timing is still unstable.");
  if (style.scores.defense <= 4) lines.push("You will feel exposed in longer rallies if your team cannot end points quickly.");
  if (style.scores.control <= 4) lines.push("It is easier to overcommit with this style because it gives you fewer safe adjustments once the play breaks down.");
  if (style.scores.mobility <= 4) lines.push("Positioning mistakes hurt more because the recovery tools are limited.");
  if (style.role === "Setter") lines.push("If your team cannot read your tempo, the style will feel much worse than it looks on paper.");
  if (style.role === "Spiker") lines.push("This is still not a free carry button; poor reads into the block will erase a lot of its upside.");

  return lines.slice(0, 4);
}

export default function StyleDetailPage({ params }: PageProps) {
  const style = getStyle(params.slug);

  if (!style) {
    notFound();
  }

  const linkedAbilities = style.bestAbilities
    .map((slug) => abilities.find((ability) => ability.slug === slug))
    .filter(Boolean);
  const similarStyles = featuredStyles
    .filter((entry) => entry.slug !== style.slug && (entry.role === style.role || entry.bestRoles.some((role) => style.bestRoles.includes(role))))
    .slice(0, 3);
  const strengths = getStrengthLines(style.slug);
  const watchouts = getWatchoutLines(style.slug);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/styles" className="hover:text-white transition-colors">Styles</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">{style.name}</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-white/10 bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted">
              {style.rarity} · {style.role} · Community Tier {style.communityTier}
            </div>
            <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
              {style.name} Style Guide & Community Stats
            </h1>
            <p className="mt-4 text-base leading-7 text-muted md:text-lg">
              {style.summary}
            </p>
          </div>
          <div className="rounded-3xl border border-accent-teal/20 bg-accent-teal/10 px-4 py-3 text-sm text-slate-100">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-teal">Source tier</p>
            <p className="mt-1 font-semibold">{style.sourceTier}</p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">Why players search {style.name}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{style.whyPlayersSearch}</p>
            <p className="mt-4 rounded-3xl border border-white/10 bg-background/65 p-4 text-sm leading-6 text-slate-200">
              <strong className="text-white">Signature mechanic:</strong> {style.signature}
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              <strong className="text-white">Availability:</strong> {style.availability}
            </p>
          </div>

          <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">Community snapshot</h2>
            <div className="mt-6 space-y-4">
              {Object.entries(style.scores).map(([label, value]) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
                    <span>{label}</span>
                    <span className="text-white">{value}/10</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-2 rounded-full bg-gradient-to-r from-accent-orange to-accent-teal" style={{ width: `${value * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">Best ability pairings</h2>
            <div className="mt-5 space-y-3">
              {linkedAbilities.map((ability) => (
                <Link
                  key={ability!.slug}
                  href={`/abilities/${ability!.slug}`}
                  className="block rounded-3xl border border-white/10 bg-background/65 p-4 transition hover:border-white/20"
                >
                  <p className="text-lg font-heading font-bold text-white">{ability!.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{ability!.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">Where {style.name} feels strongest</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
              {strengths.map((line) => (
                <li key={line} className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {style.stats && (
            <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
              <h2 className="text-2xl font-heading font-bold text-white">Community stat sheet</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {Object.entries(style.stats).map(([label, value]) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-background/65 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
                    <p className="mt-2 text-2xl font-heading font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">What to watch out for</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
              {watchouts.map((line) => (
                <li key={line} className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">Search terms this page targets</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {style.searchTerms.map((term) => (
                <span key={term} className="rounded-full border border-white/10 bg-background/65 px-3 py-1 text-xs text-slate-200">
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">{style.name} FAQ</h2>
          <div className="mt-5 space-y-4">
            <details className="rounded-2xl border border-white/10 bg-background/65 p-4">
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">
                Is {style.name} worth keeping?
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">
                If you like the role profile and the mechanical demands fit your level, usually yes. The real decision is whether it solves the job you want better than your current style.
              </p>
            </details>
            <details className="rounded-2xl border border-white/10 bg-background/65 p-4">
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">
                Who should use {style.name}?
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">
                Players who want a <strong className="text-white">{style.role.toLowerCase()}</strong>-leaning style with community-tier <strong className="text-white">{style.communityTier}</strong> upside and are comfortable with a difficulty score of <strong className="text-white">{style.scores.difficulty}/10</strong>.
              </p>
            </details>
            <details className="rounded-2xl border border-white/10 bg-background/65 p-4">
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">
                Is {style.name} official data on this site?
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">
                No. This page is openly labeled as <strong className="text-white">{style.sourceTier}</strong> data. Treat the summary, stat sheet, and ranking notes as community-maintained unless the game itself publishes the same details in an official place.
              </p>
            </details>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">If you like {style.name}, try next</h2>
          <div className="mt-5 space-y-3">
            {similarStyles.map((entry) => (
              <Link
                key={entry.slug}
                href={`/styles/${entry.slug}`}
                className="block rounded-2xl border border-white/10 bg-background/65 p-4 transition hover:border-white/20"
              >
                <p className="text-lg font-heading font-bold text-white">{entry.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NextStepPanel
        eyebrow="Decision loop"
        title={`What to do after checking ${style.name}`}
        description={`A style page should end in a decision, not in a dead end. If ${style.name} looks close to what you want, compare it, check the best ability fit, then decide whether the banner is worth more spins.`}
        actions={[
          {
            href: "/tools/style-compare",
            title: "Compare with another style",
            description: `Put ${style.name} next to your current pick and see whether the upgrade is real or just hype.`,
          },
          {
            href: linkedAbilities[0] ? `/abilities/${linkedAbilities[0]!.slug}` : "/abilities",
            title: linkedAbilities[0] ? `Open ${linkedAbilities[0]!.name}` : "Open ability pages",
            description: "Check the ability pairing before you decide the style alone is enough.",
          },
          {
            href: "/tools/reroll-advisor",
            title: "Decide whether to reroll now",
            description: "Use your current tier, spin stack, and banner goal to make the next call.",
          },
        ]}
      />

      <p className="mt-8 text-xs leading-5 text-muted">
        Source policy: the page layout and role scores are site-maintained. Most style names, stat sheets, and banner timing notes on this page should be treated as community-confirmed rather than official developer-posted data.
      </p>
    </div>
  );
}
