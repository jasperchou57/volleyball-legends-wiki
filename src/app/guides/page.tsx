import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { guideCards } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Guides",
  description:
    "Beginner-friendly Volleyball Legends guides for controls, ranked, Discord, and pity-system questions that keep appearing in search.",
};

export default function GuidesPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Guides</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Guides
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          These are the search-support pages that clean up real beginner friction: controls, ranked unlocks, official Discord, and the pity language that appears during major events.
        </p>
      </section>

      <div className="mt-8 space-y-4">
        {guideCards.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20"
          >
            <h2 className="text-2xl font-heading font-bold text-white">{guide.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
