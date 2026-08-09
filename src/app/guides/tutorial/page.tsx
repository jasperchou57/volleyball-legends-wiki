import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Tutorial",
  description:
    "Volleyball Legends tutorial hub for new players who need a fast path into controls, serving, spiking, and early role decisions.",
  alternates: { canonical: "/guides/tutorial" },
};

export default function TutorialPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Tutorial</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Tutorial
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          This page exists for players who search for a general tutorial before they know which exact guide they need. Think of it as the shortest path into the rest of the site.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Beginner Guide", "/guides/beginner", "Start here if you are learning the game from zero."],
          ["Controls", "/guides/controls", "Fix your movement and camera first."],
          ["How to Serve", "/guides/how-to-serve", "Serve timing is the easiest early win."],
          ["How to Spike", "/guides/how-to-spike", "Learn clean approach timing and net reads."],
        ].map(([title, href, desc]) => (
          <Link key={href} href={href} className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
            <h2 className="text-xl font-heading font-bold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
