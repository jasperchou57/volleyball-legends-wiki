import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Tier List",
  description:
    "Volleyball Legends tier list hub for styles, abilities, and role-based rankings built on community notes and site-maintained grouping.",
};

const tierLinks = [
  {
    title: "Style Tier List",
    href: "/tier-list/styles",
    description: "The main ranking page targeting best styles and styles tier list queries.",
  },
  {
    title: "Ability Tier List",
    href: "/tier-list/abilities",
    description: "Lead Feet, Curve Spike, Shield Breaker, and other ability pages grouped by real query demand.",
  },
  {
    title: "Spiker Tier List",
    href: "/tier-list/spiker",
    description: "Role-specific ranking pages convert generic tier traffic into useful decisions.",
  },
  {
    title: "Setter Tier List",
    href: "/tier-list/setter",
    description: "Captures the smaller but more serious setting-intent audience.",
  },
  {
    title: "Libero Tier List",
    href: "/tier-list/libero",
    description: "Useful for defensive and back-row players who do not care about spiker-first lists.",
  },
  {
    title: "Blocker Tier List",
    href: "/tier-list/blocker",
    description: "Useful for players searching for the best block and jump styles instead of generic offense picks.",
  },
];

export default function TierListHubPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Tier List</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Tier List
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Tier pages work best when they are split by intent. Instead of one giant ranking wall, this site breaks rankings into styles, abilities, and position-leaning views so more queries get their own focused landing page.
        </p>
      </section>

      <div className="mt-8 space-y-4">
        {tierLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20"
          >
            <h2 className="text-2xl font-heading font-bold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
