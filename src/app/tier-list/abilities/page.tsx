import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { abilities } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Ability Tier List",
  description:
    "Community-maintained Volleyball Legends ability tier list for Lead Feet, Curve Spike, Shield Breaker, Steel Block, and more.",
};

const order = { S: 0, A: 1, B: 2, C: 3 };

export default function AbilityTierListPage() {
  const sorted = [...abilities].sort((a, b) => order[a.communityTier] - order[b.communityTier]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tier-list" className="hover:text-white transition-colors">Tier List</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Abilities</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Ability Tier List
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Ability intent is smaller than codes, but it is high quality. This page groups abilities by how often they change actual decision-making rather than how flashy they look in clips.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((ability) => (
          <Link
            key={ability.slug}
            href={`/abilities/${ability.slug}`}
            className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-heading font-bold text-white">{ability.name}</h2>
              <span className="rounded-full border border-accent-teal/20 bg-accent-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-teal">
                {ability.communityTier}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-200">{ability.rarity} · {ability.kind}</p>
            <p className="mt-4 text-sm leading-6 text-muted">{ability.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
