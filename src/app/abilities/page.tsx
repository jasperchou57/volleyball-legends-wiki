import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { abilities } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Abilities Wiki",
  description:
    "Browse Volleyball Legends abilities including Lead Feet, Curve Spike, Shield Breaker, Extra Touch, Divine Strength, and more with community tier notes.",
  alternates: { canonical: "/abilities" },
};

export default function AbilitiesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Abilities</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Abilities
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Find the ability that fixes the job you are struggling with: movement, defense, utility, or point-ending offense. Limited ability pages include dated return history when it is documented.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {abilities.map((ability) => (
          <Link
            key={ability.slug}
            href={`/abilities/${ability.slug}`}
            className="group rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20 hover:bg-surface-raised/80"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
                  {ability.rarity} · {ability.kind}
                </div>
                <h2 className="mt-4 text-2xl font-heading font-bold text-white">{ability.name}</h2>
              </div>
              <div className="rounded-full border border-accent-teal/20 bg-accent-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-teal">
                {ability.communityTier}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{ability.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
