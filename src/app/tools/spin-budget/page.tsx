import { Metadata } from "next";
import { SpinBudgetCalculator } from "@/components/volleyball/SpinBudgetCalculator";
import Link from "next/link";
import { ChevronRight, Calculator } from "lucide-react";
import { readSpinBudgetParams, type SpinBudgetQuery } from "@/lib/volleyball/spin-budget-params";

export const metadata: Metadata = {
  title: "Volleyball Legends Spin Budget Calculator",
  description:
    "Estimate your Volleyball Legends Lucky Spin chances and pity budget. Compare normal and event Secret rates, with a separate historical Evo estimate.",
  alternates: { canonical: "/tools/spin-budget" },
};

export default async function SpinBudgetPage({ searchParams }: { searchParams?: Promise<SpinBudgetQuery> }) {
  const initialPlan = readSpinBudgetParams(await searchParams ?? {});
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Spin Budget</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-teal/20 bg-accent-teal/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">
          <Calculator className="h-4 w-4" />
          Spin budget calculator
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Spin Budget Calculator
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Choose a rarity and enter the Lucky Spins for the Style or Ability pool you plan to roll in.
        </p>
      </section>

      <div className="mt-8">
        <SpinBudgetCalculator key={JSON.stringify(initialPlan)} initialPlan={initialPlan} />
      </div>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Understanding your results</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
          <li>The estimate uses a fixed rate per spin until pity.</li>
          <li><strong className="text-white">50% and 95%:</strong> the spins you need for each estimate, capped at pity.</li>
          <li><strong className="text-white">Pity:</strong> reaching pity gives a reward of that rarity. Check the in-game pool for the styles or abilities you can get.</li>
        </ul>
      </section>

      <section className="mt-8 rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Before you spin</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
          <li><strong>Check the rates.</strong> Automatic follows the announced event schedule. Normal and event comparisons start from zero pity.</li>
          <li><strong>Check your target and slot.</strong> Confirm your target is currently available and select the slot you want to roll in.</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/guides/pity-system" className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white">
            Read the full pity guide
          </Link>
          <Link href="/tools/reroll-advisor" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
            Run reroll advisor
          </Link>
        </div>
      </section>
    </div>
  );
}
