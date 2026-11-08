import Link from "next/link";
import { latestGameUpdate } from "@/data/volleyball";

export function LatestUpdateSummary({ showCodeDetails = true }: { showCodeDetails?: boolean }) {
  return <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Released {latestGameUpdate.releasedAt}</p>
    <h2 className="mt-3 text-3xl font-heading font-bold text-white">Update 95: Season 20 & Twins Return</h2>
    <p className="mt-3 text-muted leading-7">{latestGameUpdate.summary}</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {[
        ["Season 20: Wild West", "New cosmetics and Cowboy Season Classic and Pro maps arrive alongside the Easy Money Bundle."],
        ["Twins return", "The Twins return following the community poll. Both the Twins and TSO are available until November 14, 2026 at 11:30 AM ET."],
        ["2× Luck Weekend", "November 7–9, 2026, from 11:30 AM ET to 11:30 AM ET: 1% Secret chance and 100-spin pity."],
        showCodeDetails
          ? ["Three new codes", "UPDATE_95, YEEHAW, and TWINS_STANDOFF offer a combined total of 10 Lucky Style Spins and 5 Lucky Ability Spins."]
          : ["Gameplay fixes", "Fixes address Roketto’s jetpack remaining after a style switch and TSO incorrectly gaining Anger from a low Rainbow Serve."],
      ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-background/60 p-4"><p className="font-semibold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-4">
      <Link href="/updates/update-95" className="inline-flex rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 font-semibold text-white">Read Update 95 notes</Link>
      <Link href="/styles/twins" className="text-accent-teal underline underline-offset-4">Twins return and guide</Link>
    </div>
  </div>;
}
