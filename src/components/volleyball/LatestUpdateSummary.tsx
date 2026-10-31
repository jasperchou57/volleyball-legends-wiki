import Link from "next/link";
import { latestGameUpdate } from "@/data/volleyball";

export function LatestUpdateSummary() {
  return <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Released {latestGameUpdate.releasedAt}</p>
    <h2 className="mt-3 text-3xl font-heading font-bold text-white">Update 94: TSO Rework & Vampire Bundle</h2>
    <p className="mt-3 text-muted leading-7">{latestGameUpdate.summary}</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {[
        ["Timeskip Okazu returns", "Update 94 brings Anger and Border Set mechanics. The return ends November 14, 2026 at 11:30 AM ET."],
        ["Tournament ended; shop deadline", "Spend Challenger Tokens before the Tournament Shop closes on November 7, 2026 at 10:30 AM ET."],
        ["2× Lucky event", "October 31 at 11:30 AM ET through November 2, 2026 at 10:30 AM ET (48 hours): 1% Secret chance and 100-spin pity."],
        ["Three new codes", "UPDATE_94, TSO_RETURNS, and VAMPIRES offer a combined total of 10 Lucky Style Spins and 5 Lucky Ability Spins."],
      ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-background/60 p-4"><p className="font-semibold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-4">
      <Link href="/updates/update-94" className="inline-flex rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 font-semibold text-white">Read Update 94 notes</Link>
      <Link href="/guides/cursed-tournament" className="text-accent-teal underline underline-offset-4">Tournament rewards and shop</Link>
    </div>
  </div>;
}
