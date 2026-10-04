import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { activeCodes } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Haikyuu Legends Codes (Now Volleyball Legends)",
  description:
    "Looking for Haikyuu Legends codes? The game is now Volleyball Legends. This page routes old-name searches to the current codes hub and latest working code list.",
  alternates: {
    canonical: "/haikyuu-legends-codes",
  },
};

export default function HaikyuuLegendsCodesPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Haikyuu Legends Codes</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Haikyuu Legends Codes
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Many players still search for <strong>Haikyuu Legends codes</strong>, but the game is now called <strong>Volleyball Legends</strong>. The codes below are for the renamed game. Copy a code and redeem it in Volleyball Legends.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/codes" className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white">
            Open Current Codes Page
          </Link>
          <Link href="/next-update" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
            Check Official Update Watch
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Current codes</h2>
        <p className="mt-3 text-sm leading-6 text-muted">Redeem the latest codes for free spins and Gems.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {activeCodes.map((entry) => (
            <Link
              key={entry.code}
              href="/codes"
              className="min-w-0 rounded-2xl border border-white/10 bg-background/65 px-4 py-3 text-sm text-white transition hover:border-white/20"
            >
              <span className="block break-all font-semibold">{entry.code}</span>
              <span className="mt-1 block text-slate-200">{entry.reward}</span>
              <span className="mt-2 block text-accent-teal">{entry.availability ?? entry.status}</span>
              <span className="mt-1 block text-xs text-muted">Last checked: {entry.lastChecked ? `${entry.lastChecked} (ET)` : "Not recorded"}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
