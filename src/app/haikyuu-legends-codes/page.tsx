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
  const communityCodes = activeCodes.filter((entry) => entry.status === "Community verified");

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
          Many players still search for <strong>Haikyuu Legends codes</strong>, but the game is now called <strong>Volleyball Legends</strong>. This page exists to catch that legacy keyword and route you to the live code hub instead of forcing you through an outdated old-name article.
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
        <h2 className="text-2xl font-heading font-bold text-white">Current community-verified codes</h2>
        <p className="mt-3 text-sm leading-6 text-muted">Multiple public trackers agree on these codes. They are not presented as official; redeem in-game before relying on them.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {communityCodes.map((entry) => (
            <Link
              key={entry.code}
              href="/codes"
              className="rounded-full border border-white/10 bg-background/65 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20"
            >
              {entry.code}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
