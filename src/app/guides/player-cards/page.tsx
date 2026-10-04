import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Player Cards Guide",
  description:
    "Community-focused Volleyball Legends player cards guide covering secret card searches, event card demand, and where to verify limited card drops.",
  alternates: { canonical: "/guides/player-cards" },
};

const cardNotes = [
  {
    title: "Jinko Cooked Player Card",
    body: "Complete quests with Jinko and reach Mastery Level 4 to unlock the Jinko Cooked Player Card.",
  },
  {
    title: "Skeleton Player Card",
    body: "The Skeleton Player Card is included in the Skeleton Bundle, priced at 1,299 Robux and available until October 17, 2026. The bundle also includes the Rattling Jaw Ball, Skeleton Grab Score Effect, and Shield Bash Emote.",
  },
];

export default function PlayerCardsGuidePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Player Cards</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Player Cards
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Find the player cards announced in Update 90 and how to unlock them through Jinko Mastery or the Skeleton Bundle.
        </p>
      </section>

      <div className="mt-8 space-y-4">
        {cardNotes.map((note) => (
          <section key={note.title} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">{note.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{note.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href="/updates/update-90" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Update 90 rewards</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Read the announcement details for Jinko Mastery and the Skeleton Bundle.</p>
        </Link>
        <Link href="/styles/jinko" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Jinko Mastery</h2>
          <p className="mt-3 text-sm leading-6 text-muted">See all five Jinko Mastery reward levels and the announced return window.</p>
        </Link>
      </section>
    </div>
  );
}
