import { Metadata } from "next";
import { SpinBudgetCalculator } from "@/components/volleyball/SpinBudgetCalculator";
import Link from "next/link";
import { ChevronRight, Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Spin Budget Calculator",
  description:
    "Plan exactly how many Lucky Spins you need to hit your Secret or Evo target. Interactive calculator using community pity and rate data, with 2x Luck event math baked in.",
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
          Tell the calculator your target rarity, your current spin stack, and whether a 2x Luck event is live. It returns the probability of pulling your target by the time you run out of spins, plus the expected cost to reach 50% and 95% confidence levels, plus the hard-pity ceiling. The math uses community-tracked rates and the Update 64 pity changes.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted">
          All numbers are community estimates. The calculator assumes no per-style pity (a spin reaching hard pity can still drop a Secret you do not want). Use the result as a planning floor, not a guarantee.
        </p>
      </section>

      <div className="mt-8">
        <SpinBudgetCalculator />
      </div>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">How to read the output</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
          <li><strong className="text-white">Chance by spin N:</strong> probability of having pulled at least one target-rarity drop by the time you burn N spins.</li>
          <li><strong className="text-white">50% target:</strong> the spin count where half of players in your situation would have already pulled. Median expectation.</li>
          <li><strong className="text-white">95% target:</strong> the spin count where almost everyone has pulled. If you want a safety-net budget, plan for this number.</li>
          <li><strong className="text-white">Hard pity:</strong> the guaranteed ceiling. Once you hit this, the game forces a drop regardless of luck.</li>
        </ul>
      </section>

      <section className="mt-8 rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Best practices</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
          <li><strong>Save for 2x Luck events.</strong> The calculator&rsquo;s event toggle shows just how much you save — usually around 4× more efficient than baseline.</li>
          <li><strong>Do not chase a specific style.</strong> There is no per-style pity, so the &ldquo;any Secret&rdquo; probability is almost always easier than the &ldquo;the exact Secret I want&rdquo; probability.</li>
          <li><strong>Check the live banner first.</strong> A fresh limited Secret is only worth chasing if it solves a real role gap in your build.</li>
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
