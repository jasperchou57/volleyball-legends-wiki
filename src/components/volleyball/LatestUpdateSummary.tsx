import Link from "next/link";
import { latestGameUpdate } from "@/data/volleyball";

export function LatestUpdateSummary() {
  return <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Released {latestGameUpdate.releasedAt}</p>
    <h2 className="mt-3 text-3xl font-heading font-bold text-white">Update 90: Jinko returns</h2>
    <p className="mt-3 text-muted leading-7">{latestGameUpdate.summary}</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {[ ["Jinko & Mastery", "October 3–17 return window. Five levels of Mastery rewards."], ["More room for styles", "100 Style slots and 100 Ability slots. Buy new slots with Gems."], ["2× Lucky event", "October 3–5, ending at 11:30 AM ET. Secret pity: 100; Secret chance: 1% during the event."], ["Four new codes", "10 Lucky Style Spins, 5 Lucky Ability Spins, and 100 Gems."] ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-background/60 p-4"><p className="font-semibold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}
    </div>
    <Link href="/updates/update-90" className="mt-5 inline-flex rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 font-semibold text-white">Read Update 90 notes</Link>
  </div>;
}
