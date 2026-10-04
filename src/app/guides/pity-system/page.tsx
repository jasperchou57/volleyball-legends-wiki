import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PityProbabilityChart } from "@/components/volleyball/PityProbabilityChart";


export const metadata: Metadata = {
  title: "Volleyball Legends Pity System Guide",
  description:
    "Community-maintained pity system guide for Volleyball Legends — normal vs lucky spin rates, Secret pity, Evo pity, 2x Luck event math, and expected spin cost tables.",
  alternates: { canonical: "/guides/pity-system" },
};

const pityTable = [
  {
    track: "Secret (Lucky Spins)",
    baseline: "200 spins",
    event: "100 spins (2x Luck)",
    rate: "0.5% → 1%",
  },

];

const costTable = [
  { target: "Any Secret", base50: "139 spins", baseHard: "200 spins", event50: "69 spins", eventHard: "100 spins" },
  { target: "Specific Secret", base50: "Depends on the pool", baseHard: "No confirmed guarantee", event50: "Depends on the pool", eventHard: "No confirmed guarantee" },
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
          Secret pity · Update 90
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Pity System
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          The pity system controls how many spins you can go without pulling a high-rarity reward before the game forces one. Secret pity is 200 Lucky Spins at baseline. The Update 90 event lowers it to 100 and raises the Secret chance from 0.5% to 1%.
        </p>

      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Secret pity: baseline vs. Update 90</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          The Update 90 event runs October 3 at 11:30 AM ET through October 5, 2026 at 11:30 AM ET. During this window, Secret pity is 100 instead of 200 and the Secret Style/Ability chance is 1% instead of 0.5%.
        </p>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-background/70">
              <tr className="text-xs uppercase tracking-[0.18em] text-muted">
                <th className="px-4 py-3">Track</th>
                <th className="px-4 py-3">Baseline pity</th>
                <th className="px-4 py-3">2x Luck event pity</th>
                <th className="px-4 py-3">Baseline → event rate</th>
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

      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Chance of getting a Secret</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          See how your chance of getting at least one Secret increases as you use more Lucky Spins. Compare normal and event rates below; dashed lines mark the pity thresholds.
        </p>
        <div className="mt-5 rounded-3xl border border-white/10 bg-background/65 p-4">
          <PityProbabilityChart
            maxSpins={200}
            curves={[
              { label: "Secret (baseline 0.5%)", color: "#F97316", rate: 0.005, pity: 200 },
              { label: "Secret (2x event 1%)", color: "#22D3EE", rate: 0.01, pity: 100 },
            ]}
          />
        </div>
        <p className="mt-3 text-xs leading-6 text-muted">
          Estimates start from zero pity and assume independent spins with a fixed chance before pity.
        </p>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">How many spins do you need?</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Starting from zero pity, 139 normal-rate spins or 69 event-rate spins give an estimated 50% chance of getting <em>any</em> Secret. A 50% chance is not a guarantee.
        </p>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-white/10">
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
          Secret pity guarantees the rarity, not a specific character. Your chance of getting a particular character depends on the available pool and its individual drop rate.
        </p>
      </section>



      <section className="mt-8 rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Plan your Lucky Spins</h2>
        <p className="mt-3 text-sm leading-6 text-slate-100">
          Enter your budget in the <Link href="/tools/spin-budget" className="text-accent-teal underline">Spin Budget Calculator</Link> to estimate your Secret chance, or use the <Link href="/tools/reroll-advisor" className="text-accent-teal underline">Reroll Advisor</Link> to compare saving and rerolling.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          Find free spins on the <Link href="/codes" className="text-accent-teal underline">active codes page</Link>. Check the <Link href="/updates/update-90" className="text-accent-teal underline">Update 90 event details</Link> for the October 3–5 Secret boost.
        </p>
      </section>
    </div>
  );
}
