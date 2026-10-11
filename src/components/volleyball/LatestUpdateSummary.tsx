import Link from "next/link";
import { latestGameUpdate } from "@/data/volleyball";

export function LatestUpdateSummary() {
  return <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Released {latestGameUpdate.releasedAt}</p>
    <h2 className="mt-3 text-3xl font-heading font-bold text-white">Update 91: Instant replays</h2>
    <p className="mt-3 text-muted leading-7">{latestGameUpdate.summary}</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {[ ["Instant replays", "Vote with Replay or Z after a point. A majority vote starts the replay."], ["Match highlights", "Watch a highlight reel after each match, starting with the MVP’s winning points."], ["2× Lucky event", "October 10 at 11:30 AM ET through October 12, 2026 at 11:30 AM ET. During the event: 1% Secret chance and 100-spin pity."], ["Three new codes", "10 Lucky Style Spins and 5 Lucky Ability Spins."] ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-background/60 p-4"><p className="font-semibold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}
    </div>
    <Link href="/updates/update-91" className="mt-5 inline-flex rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 font-semibold text-white">Read Update 91 notes</Link>
  </div>;
}
