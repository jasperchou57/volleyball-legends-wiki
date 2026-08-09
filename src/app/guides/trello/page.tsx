import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Trello",
  description:
    "Looking for a Volleyball Legends Trello? This page explains what we found, what we did not find, and where to verify updates instead.",
  alternates: { canonical: "/guides/trello" },
};

export default function TrelloGuidePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Trello</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Trello
        </h1>
        <p className="mt-4 text-base leading-7 text-muted md:text-lg">
          We did not find a clearly indexed public official Trello board for Volleyball Legends in current research. If you are looking for the fastest reliable source, use the official Discord and Roblox listing before trusting random copycat Trello pages.
        </p>
      </section>
    </div>
  );
}
