import Link from "next/link";
import { latestGameUpdate } from "@/data/volleyball";

export function LatestUpdateSummary({ showCodeDetails = true }: { showCodeDetails?: boolean }) {
  return <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Released {latestGameUpdate.releasedAt}</p>
    <h2 className="mt-3 text-3xl font-heading font-bold text-white">Update 97: Yogan Return & Riku Buff</h2>
    <p className="mt-3 text-muted leading-7">{latestGameUpdate.summary}</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {[
        ["Yogan returns", "Two-week return with an announced end of December 5, 2026 at 11:30 AM ET."],
        ["Riku charges faster", "REBOUND needs one fewer spike to charge. Press Special once charged to raise the walls. No Riku return is announced."],
        ["Two 2× Lucky events", "Weekend: Nov 21, 11:30 AM ET – Nov 23, 11:30 AM ET. Thanksgiving: Nov 26, 12:00 AM ET – Nov 27, 12:00 AM ET (24 hours). Secret chance: 1%; pity: 100 spins."],
        showCodeDetails
          ? ["Three new codes", "UPDATE_97, YOGAN_RETURNS, and TURKEY_STAMPEDE offer 10 Lucky Style Spins and 5 Lucky Ability Spins."]
          : ["Thanksgiving Bundle", "Turkey Stampede score effect, Thanksgiving Dinner collaborative emote for up to five players, and Roast Turkey player card."],
      ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-background/60 p-4"><p className="font-semibold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-4">
      <Link href="/updates/update-97" className="inline-flex rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 font-semibold text-white">Read Update 97 notes</Link>
      <Link href="/styles/yogan" className="text-accent-teal underline underline-offset-4">Yogan return and guide</Link>
      <Link href="/styles/riku" className="text-accent-teal underline underline-offset-4">Riku REBOUND guide</Link>
    </div>
  </div>;
}
