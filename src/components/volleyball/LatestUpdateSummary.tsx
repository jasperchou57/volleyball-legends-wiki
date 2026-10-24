import Link from "next/link";
import { latestGameUpdate } from "@/data/volleyball";

export function LatestUpdateSummary() {
  return <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Released {latestGameUpdate.releasedAt}</p>
    <h2 className="mt-3 text-3xl font-heading font-bold text-white">Update 93: Cursed Tournament & Kijo</h2>
    <p className="mt-3 text-muted leading-7">{latestGameUpdate.summary}</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {[
        ["Cursed 1v1 Tournament", "Earn Challenger Tokens through October 31. Gates open twice daily; spend tokens on limited shop rewards."],
        ["Kijo returns", "The limited return runs October 24 – November 7, 2026, ending at 11:30 AM ET."],
        ["2× Lucky event", "October 24 at 11:30 AM ET through October 26, 2026 at 11:30 AM ET: 1% Secret chance and 100-spin pity."],
        ["Three new codes", "UPDATE_93, CURSED, and TOURNAMENT offer 10 Lucky Style Spins and 5 Lucky Ability Spins."],
      ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-background/60 p-4"><p className="font-semibold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-4">
      <Link href="/updates/update-93" className="inline-flex rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 font-semibold text-white">Read Update 93 notes</Link>
      <Link href="/guides/cursed-tournament" className="text-accent-teal underline underline-offset-4">Tournament schedule and rewards</Link>
    </div>
  </div>;
}
