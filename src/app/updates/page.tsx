import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { updates } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Updates",
  description:
    "Track Volleyball Legends update notes, rising patch queries, and the code drops that usually follow Saturday resets.",
};

export default function UpdatesPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Updates</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Updates
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Update pages are where this site turns fresh search spikes into durable internal links. Every post points back to codes, style pages, and the tools most relevant to the patch.
        </p>
      </section>

      <div className="mt-8 space-y-4">
        {updates.map((update) => (
          <Link
            key={update.slug}
            href={`/updates/${update.slug}`}
            className="block rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-heading font-bold text-white">{update.title}</h2>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
                {update.published}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{update.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
