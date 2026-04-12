import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { featuredStyles } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Styles Wiki",
  description:
    "Browse Volleyball Legends style pages for Encho, Twins, Mikage, Kijo, Jinko, Ronin, Taichou, and more with community snapshots and search-first summaries.",
};

export default function StylesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Styles</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Styles
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          This is the core long-tail cluster after codes. The community wiki tracks 36 styles overall; this directory now covers the highest-demand styles first, plus key setter, blocker, and legacy secret pages players keep comparing in search.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featuredStyles.map((style) => (
          <Link
            key={style.slug}
            href={`/styles/${style.slug}`}
            className="group rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20 hover:bg-surface-raised/80"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
                  {style.rarity} · {style.role}
                </div>
                <h2 className="mt-4 text-2xl font-heading font-bold text-white">{style.name}</h2>
              </div>
              <div className="rounded-full border border-accent-orange/20 bg-accent-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange">
                {style.communityTier}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{style.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {style.searchTerms.slice(0, 2).map((term) => (
                <span key={term} className="rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs text-slate-200">
                  {term}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
