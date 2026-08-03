import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { featuredStyles } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Styles Wiki",
  description:
    "Browse Volleyball Legends style pages with community snapshots, mechanics, tier context, and documented limited-return history.",
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
          Browse the styles covered by this wiki, then open a guide for role fit, mechanics, tier context, and any documented limited-return history.
        </p>
        <p className="mt-3 text-sm text-muted">Planning around a limited style? <Link href="/style-return-dates" className="font-semibold text-accent-teal hover:text-white">See the return-date history</Link>; future banners are marked not announced until confirmed.</p>
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
            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted">{style.availability}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
