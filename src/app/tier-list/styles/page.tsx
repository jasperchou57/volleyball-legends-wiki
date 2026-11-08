import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StyleTierCards } from "@/components/volleyball/StyleTierCards";
import { styleReviewDate } from "@/data/style-reviews";

export const metadata: Metadata = {
  title: "Volleyball Legends Style Tier List",
  description:
    "Community-maintained Volleyball Legends style tier list covering Encho, Twins, Mikage, Kijo, Jinko, Ronin, Taichou, and more.",
  alternates: { canonical: "/tier-list/styles" },
};


export default function StyleTierListPage() {

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tier-list" className="hover:text-white transition-colors">Tier List</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Styles</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Style Tier List
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Choose a style for the way you play. Compare its role, useful mechanics, and limitations before deciding what to keep or roll for.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted">
          Last reviewed: <time dateTime={styleReviewDate} className="text-slate-200">November 8, 2026</time> · Includes Update 95 changes. Older July ratings are listed separately below.
        </p>
      </section>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">How to use this list</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">Our ratings help you choose a style for team play; they are not official rankings. S: strong specialist pick. A: strong with conditions. B: useful for a narrower role. C: starter-level option. Provisional ratings may change. Use the role filters to find styles that fit your position.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {[['Overall', '/tier-list/styles'], ['Spiker', '/tier-list/spiker'], ['Setter', '/tier-list/setter'], ['Libero', '/tier-list/libero'], ['Blocker', '/tier-list/blocker']].map(([label, href]) => <Link key={href} href={href} className="rounded-full border border-white/10 bg-background/65 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25">{label}</Link>)}
        </div>
      </section>

      <p className="mt-4 text-sm text-muted">Looking for a limited pick? <Link href="/style-return-dates" className="font-semibold text-accent-teal hover:text-white">Check return dates</Link> to see its announced availability.</p>

      <StyleTierCards />
    </div>
  );
}
