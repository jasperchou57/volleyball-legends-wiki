import { Metadata } from "next";
import { SpinBudgetCalculator } from "@/components/volleyball/SpinBudgetCalculator";
import Link from "next/link";
import { ChevronRight, Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Spin Budget Calculator",
  description:
    "Estimate your Volleyball Legends Lucky Spin chances and pity budget. Compare normal and event Secret rates, with a separate historical Evo estimate.",
  alternates: { canonical: "/tools/spin-budget" },
};

export default function SpinBudgetPage() {
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
          Choose a rarity and enter your Lucky Spins to estimate your chance of getting at least one reward of that rarity. Calculations start from zero pity.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted">
          Secret rates switch automatically during the announced Update 90 event. Evo estimates use older rates; check them in-game before planning your spins.
        </p>
      </section>

      <div className="mt-8">
        <SpinBudgetCalculator />
      </div>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Understanding your results</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
          <li><strong className="text-white">Estimated chance:</strong> your chance of getting at least one reward of the selected rarity within the number of spins entered.</li>
          <li><strong className="text-white">50% chance:</strong> the number of spins needed to reach an estimated chance of at least 50%.</li>
          <li><strong className="text-white">95% chance:</strong> the number of spins needed to reach an estimated chance of at least 95%. A 95% chance still leaves a possibility of missing the rarity.</li>
          <li><strong className="text-white">Pity limit:</strong> the number of spins at which this calculation assumes a reward of the selected rarity is guaranteed. This does not guarantee a specific style. Check your current pity progress in-game.</li>
        </ul>
      </section>

      <section className="mt-8 rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Before you spin</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
          <li><strong>Check the rates.</strong> Use Automatic for the announced event schedule, or select normal or event rates to compare your chances.</li>
          <li><strong>Know what the result means.</strong> The estimate covers any reward of the selected rarity, not the specific style you want.</li>
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
