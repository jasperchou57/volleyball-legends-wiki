import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Ranks Guide",
  description:
    "Volleyball Legends ranks guide covering ranked unlock requirements, queue structure, and community-ranked progression notes.",
  alternates: { canonical: "/guides/ranks" },
};

const rankTiers = ["Rookie", "Bronze", "Silver", "Gold", "Diamond", "Elite", "Master", "Legend"];

export default function RanksGuidePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Ranks</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Ranks
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Ranked questions usually appear right after players learn the basics. Community wiki pages currently describe ranked as unlocking around level 15, then pushing you through a ladder that rewards consistency and duo coordination more than pure highlight clips.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Queue expectations</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Hit level 15 before you plan around ranked-only improvement routes.</li>
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Small-team queues punish bad serves and weak first touch much harder than public matches.</li>
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Setters and liberos gain value as the lobby skill floor rises, even if spiker clips dominate social media.</li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Rank ladder snapshot</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {rankTiers.map((tier) => (
              <div key={tier} className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3 text-sm font-medium text-white">
                {tier}
              </div>
            ))}
          </div>
        </div>
      </section>

      <p className="mt-8 text-xs leading-5 text-muted">
        Source note: ranked terminology and unlock guidance here follow community-maintained pages and player guides. Exact queue structure and rewards can change with patches.
      </p>
    </div>
  );
}
