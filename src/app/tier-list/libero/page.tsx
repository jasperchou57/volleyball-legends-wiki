import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { featuredStyles } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Libero Tier List",
  description:
    "Community tier notes for Volleyball Legends libero and defensive styles, including Kisuki and Kyoshin.",
  alternates: { canonical: "/tier-list/libero" },
};

const order = { S: 0, A: 1, B: 2, C: 3 };

export default function LiberoTierListPage() {
  const picks = [...featuredStyles]
    .filter((style) => style.bestRoles.includes("Libero"))
    .sort((a, b) => order[a.communityTier] - order[b.communityTier]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tier-list" className="hover:text-white transition-colors">Tier List</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Libero</span>
      </div>
      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">Volleyball Legends Libero Tier List</h1>
      </section>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {picks.map((style) => (
          <Link key={style.slug} href={`/styles/${style.slug}`} className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-heading font-bold text-white">{style.name}</h2>
              <span className="rounded-full border border-accent-gold/20 bg-accent-gold/10 px-3 py-1 text-xs font-semibold text-accent-gold">{style.communityTier}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{style.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
