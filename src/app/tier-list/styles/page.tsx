import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { featuredStyles } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Style Tier List",
  description:
    "Community-maintained Volleyball Legends style tier list covering Encho, Twins, Mikage, Kijo, Jinko, Ronin, Taichou, and more — updated for Update 65 and Season 14.",
};

const order = { S: 0, A: 1, B: 2, C: 3 };

export default function StyleTierListPage() {
  const sorted = [...featuredStyles].sort((a, b) => order[a.communityTier] - order[b.communityTier]);

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
          This ranking is explicitly community-maintained. It is designed to satisfy style-tier queries while still pushing players into the underlying style pages for real context.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((style) => (
          <Link
            key={style.slug}
            href={`/styles/${style.slug}`}
            className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-heading font-bold text-white">{style.name}</h2>
              <span className="rounded-full border border-accent-orange/20 bg-accent-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange">
                {style.communityTier}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-200">{style.rarity} · {style.role}</p>
            <p className="mt-4 text-sm leading-6 text-muted">{style.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
