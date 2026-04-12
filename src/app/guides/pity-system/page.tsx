import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Pity System Guide (Update 65)",
  description:
    "Community-maintained pity system guide for Volleyball Legends — normal vs lucky spin rates, Secret pity, Evo pity, 2x Luck event math, and expected spin cost tables updated for Update 65.",
};

const rarityRows = [
  { rarity: "Common", normal: "62.5%", lucky: "—", note: "Filler pool on normal spins." },
  { rarity: "Rare", normal: "35%", lucky: "—", note: "Most of what you will see early." },
  { rarity: "Legendary", normal: "2%", lucky: "—", note: "Community trackers; not officially published." },
  { rarity: "Godly", normal: "0.5%", lucky: "Inflated", note: "Lucky spins weight toward Godly+." },
  { rarity: "Secret", normal: "0.01%", lucky: "~0.5%", note: "Baseline Lucky Spin Secret rate pre-event." },
  { rarity: "Ultra", normal: "0.005%", lucky: "Track varies", note: "Shares an Ultra pity ceiling in some community writeups." },
  { rarity: "Evo", normal: "—", lucky: "~0.25%", note: "Introduced in Update 63. Separate pity track from Secret." },
];

const pityTable = [
  {
    track: "Secret (Lucky Spins)",
    baseline: "200 spins",
    event: "100 spins (2x Luck)",
    rate: "0.5% → 1%",
    note: "U64 halved the pity threshold and doubled the base rate during the event window.",
  },
  {
    track: "Evo (Lucky Spins)",
    baseline: "400 spins",
    event: "200 spins (2x Luck)",
    rate: "0.25% → 0.5%",
    note: "Added with Encho in Update 63. Runs on a separate counter from Secret pity.",
  },
  {
    track: "Ultra (Lucky Spins)",
    baseline: "~400 spins",
    event: "~200 spins",
    rate: "Approximately doubled during 2x Luck",
    note: "Community-estimated. Not officially published.",
  },
];

const costTable = [
  { target: "Any Secret", base50: "~140 spins", baseHard: "200 spins", event50: "~70 spins", eventHard: "100 spins" },
  { target: "Any Evo (Encho era)", base50: "~280 spins", baseHard: "400 spins", event50: "~140 spins", eventHard: "200 spins" },
  { target: "Specific Secret (no style pity)", base50: "substantially higher", baseHard: "still caps at 200", event50: "halved", eventHard: "still caps at 100" },
];

export default function PitySystemGuidePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Pity System</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-orange/20 bg-accent-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
          Updated for Update 65
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Pity System
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          The pity system controls how many spins you can go without pulling a high-rarity reward before the game forces one. This page covers normal spin odds, Lucky Spin rates, the Secret pity track, the new Evo pity track introduced in Update 63, and how 2x Luck events change the math.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted">
          Note: all numbers below are community-tracked and cross-referenced with Update 63 and Update 64 patch notes. None of this is officially published by the developer. Always verify in Discord before betting a big spin stack on a specific threshold.
        </p>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Drop rates by rarity</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Rates listed are per-spin baseline. Secret and Evo rarities have dedicated pity counters that force a drop at a fixed ceiling regardless of luck.
        </p>
        <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-background/70">
              <tr className="text-xs uppercase tracking-[0.18em] text-muted">
                <th className="px-4 py-3">Rarity</th>
                <th className="px-4 py-3">Normal spin</th>
                <th className="px-4 py-3">Lucky spin</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-surface/70">
              {rarityRows.map((row) => (
                <tr key={row.rarity}>
                  <td className="px-4 py-4 font-semibold text-white">{row.rarity}</td>
                  <td className="px-4 py-4 text-slate-200">{row.normal}</td>
                  <td className="px-4 py-4 text-slate-200">{row.lucky}</td>
                  <td className="px-4 py-4 text-muted">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Pity thresholds and 2x Luck math</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Update 64 explicitly halved the Secret and Evo pity thresholds during its 2x Luck window and doubled the per-spin rates. This is the single most efficient time to burn spins if you are chasing either tier.
        </p>
        <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-background/70">
              <tr className="text-xs uppercase tracking-[0.18em] text-muted">
                <th className="px-4 py-3">Track</th>
                <th className="px-4 py-3">Baseline pity</th>
                <th className="px-4 py-3">2x Luck event pity</th>
                <th className="px-4 py-3">Base rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-surface/70">
              {pityTable.map((row) => (
                <tr key={row.track}>
                  <td className="px-4 py-4 font-semibold text-white">{row.track}</td>
                  <td className="px-4 py-4 text-slate-200">{row.baseline}</td>
                  <td className="px-4 py-4 text-slate-200">{row.event}</td>
                  <td className="px-4 py-4 text-slate-200">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 space-y-2 text-xs leading-6 text-muted">
          {pityTable.map((row) => (
            <p key={row.track}><strong className="text-slate-200">{row.track}:</strong> {row.note}</p>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Expected spin cost</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          How many Lucky Spins should you actually budget to get <em>any</em> Secret or Evo? The 50% column is the median — half of players pull by this point. The hard-pity column is the worst case, the ceiling where the game guarantees a drop.
        </p>
        <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-background/70">
              <tr className="text-xs uppercase tracking-[0.18em] text-muted">
                <th className="px-4 py-3">Target</th>
                <th className="px-4 py-3">Baseline 50%</th>
                <th className="px-4 py-3">Baseline hard pity</th>
                <th className="px-4 py-3">2x event 50%</th>
                <th className="px-4 py-3">2x event hard pity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-surface/70">
              {costTable.map((row) => (
                <tr key={row.target}>
                  <td className="px-4 py-4 font-semibold text-white">{row.target}</td>
                  <td className="px-4 py-4 text-slate-200">{row.base50}</td>
                  <td className="px-4 py-4 text-slate-200">{row.baseHard}</td>
                  <td className="px-4 py-4 text-accent-teal">{row.event50}</td>
                  <td className="px-4 py-4 text-accent-teal">{row.eventHard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-6 text-muted">
          &ldquo;Specific Secret&rdquo; means you want one particular style — since there is no per-style pity, you might hit multiple other Secrets before you see the one you are chasing. Plan for substantially more spins than the &ldquo;any Secret&rdquo; row suggests.
        </p>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">About the Evo pity track</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Update 63 introduced the Evo rarity tier alongside Encho, the first Evo style. Community trackers describe Evo as running on a <strong className="text-white">separate pity counter</strong> from Secret — spinning for one does not progress the other. The baseline Evo rate on Lucky Spins is roughly 0.25%, far rarer than Secret, and the baseline pity threshold sits around 400 spins.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          Encho itself went permanently unobtainable on April 11, 2026 at the Season 14 reset, so the Evo pity track is currently dormant until the next Evo style is introduced. The math above will resurface the next time the developer drops a new Evo banner.
        </p>
      </section>

      <section className="mt-8 rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">How to use this page safely</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
          <li><strong>Do not over-commit to hard-pity math.</strong> The thresholds above come from community patch-note reads and can shift with any update.</li>
          <li><strong>Save spins for 2x Luck windows.</strong> Halved pity plus doubled rates means a 2x event is roughly four times more efficient than a baseline spin.</li>
          <li><strong>Check the current event before you pull.</strong> Each update can change which pity tracks are active and how long the window lasts.</li>
          <li><strong>Verify in Discord.</strong> When numbers matter, cross-reference against the latest patch post before burning a large stack.</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/codes" className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white">
            Grab fresh codes
          </Link>
          <Link href="/updates/update-64-tournament-week" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
            Read the U64 pity change
          </Link>
          <Link href="/updates/update-63-encho-evo" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
            Read the Evo rarity debut
          </Link>
        </div>
      </section>
    </div>
  );
}
