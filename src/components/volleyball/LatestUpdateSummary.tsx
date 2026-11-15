import Link from "next/link";
import { latestGameUpdate } from "@/data/volleyball";

export function LatestUpdateSummary({ showCodeDetails = true }: { showCodeDetails?: boolean }) {
  return <div className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Released {latestGameUpdate.releasedAt}</p>
    <h2 className="mt-3 text-3xl font-heading font-bold text-white">Update 96: Riku Rework & Chat Bubbles</h2>
    <p className="mt-3 text-muted leading-7">{latestGameUpdate.summary}</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {[
        ["Riku rework", "Charge REBOUND with 3–4 spikes, then press Special to raise walls that break after one bounce. Riku has not returned to the style rotation."],
        ["Twins extended", "The Twins’ return has been extended until November 21, 2026 at 11:30 AM ET. TSO’s announced return window ended November 14."],
        ["2× Luck Weekend", "November 14–16, 2026, from 11:30 AM ET to 11:30 AM ET: 1% Secret chance and 100-spin pity."],
        showCodeDetails
          ? ["Three new codes", "UPDATE_96, RIKU_REWORK, and NEW_CHAT_BUBBLES offer a combined total of 10 Lucky Style Spins and 5 Lucky Ability Spins."]
          : ["Chat bubbles", "New chat bubbles and a 2x Bubble Chat Gamepass have been added."],
      ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-background/60 p-4"><p className="font-semibold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-4">
      <Link href="/updates/update-96" className="inline-flex rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 font-semibold text-white">Read Update 96 notes</Link>
      <Link href="/styles/twins" className="text-accent-teal underline underline-offset-4">Twins return and guide</Link>
    </div>
  </div>;
}
