import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { abilities, currentGameState, featuredStyles, getAbility, getAvailabilityHistory, pageFreshness } from "@/data/volleyball";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return abilities.map((ability) => ({ slug: ability.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ability = getAbility(slug);
  if (!ability) {
    return {};
  }

  return {
    title: `${ability.name} Ability Guide`,
    description: `${ability.name} in Volleyball Legends: rarity, availability history, community tier note, and best style pairings.`,
    alternates: { canonical: `/abilities/${ability.slug}` },
  };
}

export default async function AbilityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ability = getAbility(slug);

  if (!ability) {
    notFound();
  }

  const bestWith = ability.bestWith
    .map((slug) => featuredStyles.find((style) => style.slug === slug))
    .filter(Boolean);
  const alternates = abilities
    .filter((entry) => entry.slug !== ability.slug && entry.kind === ability.kind)
    .slice(0, 3);
  const availabilityHistory = getAvailabilityHistory("Ability", ability.slug);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/abilities" className="hover:text-white transition-colors">Abilities</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">{ability.name}</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex rounded-full border border-white/10 bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted">
          {ability.rarity} · {ability.kind} · Community Tier {ability.communityTier}
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
          {ability.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          {ability.summary}
        </p>
        <p className="mt-4 text-xs leading-5 text-muted">Source: {ability.sourceTier} · snapshot last reviewed {pageFreshness.tierListLastUpdated}</p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Why this ability matters</h2>
          <p className="mt-4 text-sm leading-7 text-muted">{ability.whyItMatters}</p>
          {ability.availability && <p className="mt-4 rounded-3xl border border-white/10 bg-background/65 p-4 text-sm leading-6 text-slate-200"><strong className="text-white">Last verified availability (Update {currentGameState.updateNumber}):</strong> {ability.availability}</p>}
          {currentGameState.reviewNote && <p className="mt-4 text-sm leading-6 text-accent-gold">{currentGameState.reviewNote}</p>}
          <div className="mt-5 flex flex-wrap gap-2">
            {ability.searchTerms.map((term) => (
              <span key={term} className="rounded-full border border-white/10 bg-background/65 px-3 py-1 text-xs text-slate-200">
                {term}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Best style pairings</h2>
          <div className="mt-5 space-y-3">
            {bestWith.map((style) => (
              <Link
                key={style!.slug}
                href={`/styles/${style!.slug}`}
                className="block rounded-3xl border border-white/10 bg-background/65 p-4 transition hover:border-white/20"
              >
                <p className="text-lg font-heading font-bold text-white">{style!.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{style!.summary}</p>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">
            Pairings are site-maintained suggestions built from community notes rather than official developer advice.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-heading font-bold text-white">Release and return history</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Past availability does not predict a future banner.</p>
          </div>
          <Link href="/style-return-dates" className="text-sm font-semibold text-accent-teal hover:text-white">All return dates</Link>
        </div>
        {availabilityHistory.length ? <div className="mt-5 space-y-3">{availabilityHistory.map((event) => (
          <div key={`${event.updateNumber}-${event.label}`} className="rounded-3xl border border-white/10 bg-background/65 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Update {event.updateNumber} · {event.sourceTier}</p>
            <p className="mt-2 font-semibold text-white">{event.label}: {event.window}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{event.note}</p>
          </div>
        ))}</div> : <p className="mt-5 rounded-3xl border border-white/10 bg-background/65 p-4 text-sm leading-6 text-muted">No dated return window is in this snapshot. The next return is not announced.</p>}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">{ability.name} FAQ</h2>
          <div className="mt-5 space-y-4">
            <details className="rounded-2xl border border-white/10 bg-background/65 p-4">
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">
                Is {ability.name} worth keeping?
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">
                Usually yes if it directly supports your role or fixes a specific weakness in your style. The best abilities are the ones that actually change your win conditions, not just the ones with the rarest label.
              </p>
            </details>
            <details className="rounded-2xl border border-white/10 bg-background/65 p-4">
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">When does {ability.name} return?</summary>
              <p className="mt-3 text-sm leading-6 text-muted">{availabilityHistory.length ? `The latest documented return was ${availabilityHistory[0]?.window} in Update ${availabilityHistory[0]?.updateNumber}. The next return is not announced.` : "The next return is not announced."}</p>
            </details>
            <details className="rounded-2xl border border-white/10 bg-background/65 p-4">
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">
                Is {ability.name} official data on this site?
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">
                No. This page is labeled <strong className="text-white">{ability.sourceTier}</strong>. Treat the ranking, pairings, and summary as community-maintained unless they are mirrored by an official in-game or developer source.
              </p>
            </details>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Similar ability pages</h2>
          <div className="mt-5 space-y-3">
            {alternates.map((entry) => (
              <Link
                key={entry.slug}
                href={`/abilities/${entry.slug}`}
                className="block rounded-2xl border border-white/10 bg-background/65 p-4 transition hover:border-white/20"
              >
                <p className="text-lg font-heading font-bold text-white">{entry.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
