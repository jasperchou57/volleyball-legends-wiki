import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, GitCompareArrows } from "lucide-react";
import { patchDiffs } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Patch Diff (U63 → U64 → U65)",
  description:
    "Numerical patch-diff comparison between Volleyball Legends updates. Side-by-side before/after tables covering pity thresholds, drop rates, new rarities, currency systems, and style obtainability — the math behind each patch, not just the headline.",
  alternates: { canonical: "/patch-diff" },
};

export default function PatchDiffPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Patch Diff</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-teal/20 bg-accent-teal/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">
          <GitCompareArrows className="h-4 w-4" />
          Patch-to-patch diff
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Patch Diff
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Every Volleyball Legends guide replays the same patch notes. This page does the opposite: it extracts only what <strong className="text-white">changed numerically</strong> between consecutive updates so old players can quickly answer &ldquo;what is actually different about the game this week?&rdquo; Each section is a before/after table — what the value was, what it is now, and what that delta means in practice.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted">
          Data is community-tracked from patch notes and pity-math posts. Treat hard percentages as directionally correct unless confirmed in Discord.
        </p>
      </section>

      <div className="mt-8 space-y-8">
        {patchDiffs.map((diff) => (
          <section key={diff.label} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-orange">{diff.label}</p>
                <h2 className="mt-2 text-2xl font-heading font-bold text-white">
                  <Link href={`/updates/${diff.fromSlug}`} className="underline decoration-white/20 underline-offset-4 hover:decoration-accent-orange">
                    {diff.fromSlug.replace("update-", "Update ").split("-")[0]}
                  </Link>
                  {" → "}
                  <Link href={`/updates/${diff.toSlug}`} className="underline decoration-white/20 underline-offset-4 hover:decoration-accent-teal">
                    {diff.toSlug.replace("update-", "Update ").split("-")[0]}
                  </Link>
                </h2>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{diff.summary}</p>
            <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-background/70">
                  <tr className="text-xs uppercase tracking-[0.18em] text-muted">
                    <th className="px-4 py-3">Field</th>
                    <th className="px-4 py-3">Before</th>
                    <th className="px-4 py-3">After</th>
                    <th className="px-4 py-3">Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-surface/70">
                  {diff.rows.map((row) => (
                    <tr key={row.field}>
                      <td className="px-4 py-4 font-semibold text-white">{row.field}</td>
                      <td className="px-4 py-4 text-muted line-through decoration-white/30">{row.before}</td>
                      <td className="px-4 py-4 text-slate-100">{row.after}</td>
                      <td className="px-4 py-4 text-accent-teal">{row.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Why a diff page instead of patch notes?</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
          <li><strong>Faster decision-making.</strong> You already know the game. You just want to know what changed and whether it affects your build, your spin plan, or your ranked strategy.</li>
          <li><strong>Math-first.</strong> Pity thresholds, drop rates, and currency changes are surfaced as explicit numbers instead of buried in hype copy.</li>
          <li><strong>Roll-up view.</strong> Three patches on one page makes it trivial to see the pity-system trajectory and the rarity-ceiling trajectory in one glance.</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/updates" className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white">
            Read full update archive
          </Link>
          <Link href="/guides/pity-system" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
            Pity system math
          </Link>
        </div>
      </section>
    </div>
  );
}
