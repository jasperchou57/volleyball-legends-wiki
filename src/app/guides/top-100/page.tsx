import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Reach Top 100 in Volleyball Legends",
  description:
    "A practical guide to climbing toward the top 100 in Volleyball Legends with ranked discipline, role choices, duo play, and update-aware progression.",
  alternates: { canonical: "/guides/top-100" },
};

const top100Points = [
  "Play with a consistent duo or trio if possible. Ladder stability matters more than random highlight games.",
  "Use styles and abilities that reduce mistakes first. Top-100 climbs are usually built on consistency, not just ceiling.",
  "Treat Saturday updates seriously. New styles, reworks, and code drops can shift what is practical to grind that week.",
  "Track your serve faults, first-touch failures, and bad set decisions. Those are often the real blockers to ranked progress.",
];

export default function Top100GuidePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Top 100</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          How to Reach Top 100 in Volleyball Legends
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          This page is designed for <strong>top 100 volleyball legends</strong> and ranked-grind searches. The point is not to invent fake leaderboard secrets, but to give a cleaner progression framework than random social clips.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {top100Points.map((point, index) => (
          <section key={point} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Top 100 note {index + 1}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{point}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/guides/ranks" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Ranks</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Start with ranked structure and queue expectations.</p>
        </Link>
        <Link href="/tier-list/setter" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Setter Tier List</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Reliable team roles usually matter more than pure solo offense at higher ladder levels.</p>
        </Link>
        <Link href="/guides/how-to-set" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">How to Set</h2>
          <p className="mt-3 text-sm leading-6 text-muted">A cleaner setter game increases your win rate faster than random rerolls once fundamentals matter.</p>
        </Link>
      </section>
    </div>
  );
}
