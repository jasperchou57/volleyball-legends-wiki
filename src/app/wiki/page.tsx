import { Metadata } from "next";
import Link from "next/link";
import { abilities, featuredStyles, guideCards, toolCards, updates } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Wiki",
  description:
    "Volleyball Legends Wiki hub linking to codes, styles, abilities, guides, updates, and tools in one crawl-friendly landing page.",
};

export default function WikiPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">Volleyball Legends Wiki</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          This page exists to catch the <strong>volleyball legends wiki</strong> query and route players into the same high-intent sections the homepage prioritizes.
        </p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Styles</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {featuredStyles.slice(0, 8).map((style) => (
              <Link key={style.slug} href={`/styles/${style.slug}`} className="rounded-full border border-white/10 bg-background/65 px-3 py-2 text-sm text-white">
                {style.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Abilities</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {abilities.map((ability) => (
              <Link key={ability.slug} href={`/abilities/${ability.slug}`} className="rounded-full border border-white/10 bg-background/65 px-3 py-2 text-sm text-white">
                {ability.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Guides</h2>
          <div className="mt-4 space-y-3">
            {guideCards.map((guide) => (
              <Link key={guide.href} href={guide.href} className="block rounded-2xl border border-white/10 bg-background/65 px-4 py-3 text-sm text-white">
                {guide.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Updates & Tools</h2>
          <div className="mt-4 space-y-3">
            {updates.map((update) => (
              <Link key={update.slug} href={`/updates/${update.slug}`} className="block rounded-2xl border border-white/10 bg-background/65 px-4 py-3 text-sm text-white">
                {update.title}
              </Link>
            ))}
            {toolCards.map((tool) => (
              <Link key={tool.href} href={tool.href} className="block rounded-2xl border border-white/10 bg-background/65 px-4 py-3 text-sm text-white">
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
