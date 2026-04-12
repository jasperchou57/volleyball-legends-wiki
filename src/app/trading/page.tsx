import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { tradeValues, featuredStyles } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Trading Value List (April 2026)",
  description:
    "Volleyball Legends trading value list. Editorial tier ratings for Secret, Evo, Ultra and Godly styles based on rarity, obtainability, and current meta demand. Updated for Update 65 / Season 14.",
  alternates: { canonical: "/trading" },
};

const tierOrder: Record<string, number> = { T1: 0, T2: 1, T3: 2, T4: 3, T5: 4 };

const tierMeta: Record<string, { label: string; description: string; color: string }> = {
  T1: { label: "Tier 1 — Grail", description: "Permanently unobtainable or game-first items. These appreciate over time.", color: "text-accent-orange" },
  T2: { label: "Tier 2 — High value", description: "Limited Secrets with consistent trading demand. Expect long-tail value.", color: "text-accent-teal" },
  T3: { label: "Tier 3 — Mid value", description: "Permanent Secrets or strong Ultras. Value moves with meta, not scarcity.", color: "text-slate-200" },
  T4: { label: "Tier 4 — Low value", description: "Common Secret/Godly picks. Mostly trade fodder or beginner upgrades.", color: "text-muted" },
  T5: { label: "Tier 5 — Fodder", description: "Low demand, frequently traded in bulk.", color: "text-muted" },
};

export default function TradingValueListPage() {
  const sorted = [...tradeValues].sort((a, b) => tierOrder[a.valueTier] - tierOrder[b.valueTier]);
  const byTier: Record<string, typeof sorted> = {};
  for (const entry of sorted) {
    (byTier[entry.valueTier] ||= []).push(entry);
  }

  const nameFor = (slug: string) =>
    featuredStyles.find((s) => s.slug === slug)?.name ?? slug;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Trading Value List</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-orange/20 bg-accent-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
          <TrendingUp className="h-4 w-4" />
          Editorial value list
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Trading Value List
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          A tier-banded value list for Volleyball Legends trading. Rankings combine <strong className="text-white">rarity</strong>, <strong className="text-white">obtainability</strong>, <strong className="text-white">current meta demand</strong>, and whether a style is permanent, limited, or permanently unobtainable. Updated for Update 65 and the Season 14 reset.
        </p>
        <p className="mt-3 max-w-3xl rounded-3xl border border-accent-gold/20 bg-accent-gold/10 p-4 text-xs leading-6 text-accent-gold">
          <strong>Disclaimer:</strong> no official or market-verified value data exists publicly for this game. This list is an <strong>editorial estimate</strong> derived from rarity tiers, obtainability windows, and community meta consensus. Real trades may diverge significantly. If you have corrections from in-game trading, please ping the Discord.
        </p>
      </section>

      <section className="mt-8 space-y-6">
        {(["T1", "T2", "T3", "T4", "T5"] as const).map((tier) => {
          const entries = byTier[tier];
          if (!entries || entries.length === 0) return null;
          const meta = tierMeta[tier];
          return (
            <div key={tier} className="rounded-[2rem] border border-border bg-surface/80 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${meta.color}`}>{tier}</p>
                  <h2 className="mt-2 text-2xl font-heading font-bold text-white">{meta.label}</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-background/65 px-3 py-1 text-xs text-muted">
                  {entries.length} {entries.length === 1 ? "entry" : "entries"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{meta.description}</p>
              <div className="mt-5 space-y-3">
                {entries.map((entry) => (
                  <div key={entry.styleSlug} className="rounded-3xl border border-white/10 bg-background/65 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={`/styles/${entry.styleSlug}`}
                        className="text-lg font-heading font-bold text-white underline decoration-white/20 underline-offset-4 hover:decoration-accent-orange"
                      >
                        {nameFor(entry.styleSlug)}
                      </Link>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full border border-white/10 px-3 py-1 text-slate-200">{entry.rarity}</span>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-slate-200">{entry.obtainability}</span>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-slate-200">Demand: {entry.demand}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">{entry.note}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">How the tiers are built</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
          <li><strong className="text-white">T1 (Grail):</strong> items that are permanently unobtainable or are the first of their kind (Evo rarity). These only get more valuable over time.</li>
          <li><strong className="text-white">T2 (High value):</strong> limited Secrets and returning limiteds that have demonstrated repeat demand during past return windows.</li>
          <li><strong className="text-white">T3 (Mid value):</strong> permanent Secrets and strong Ultras where meta strength — not scarcity — drives trading interest.</li>
          <li><strong className="text-white">T4–T5:</strong> Godlies and below. Traded in bulk or as stepping stones.</li>
        </ul>
        <p className="mt-4 text-sm leading-6 text-muted">
          Demand is tagged as <strong className="text-white">High / Medium / Low</strong> based on how often a style shows up in the top searches, tier lists, and trading Discord pinned messages. High demand inside a tier usually means faster trades; low demand inside the same tier means you may need to sweeten the offer.
        </p>
      </section>

      <section className="mt-8 rounded-[2rem] border border-accent-teal/20 bg-accent-teal/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">What to do with this list</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
          <li><strong>Before a trade:</strong> check both sides against the table. T1 for T2 is almost always too rich.</li>
          <li><strong>Before a return window:</strong> expect T2 limiteds to temporarily depreciate when the banner returns and their obtainability window reopens.</li>
          <li><strong>After a big meta shift:</strong> T3 permanents can jump a tier if they become the new meta answer. Keep an eye on the tier list updates.</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/tier-list/styles" className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white">
            Open meta tier list
          </Link>
          <Link href="/styles" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
            Browse all styles
          </Link>
        </div>
      </section>
    </div>
  );
}
