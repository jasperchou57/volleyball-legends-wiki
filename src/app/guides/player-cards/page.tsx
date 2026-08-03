import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Player Cards Guide",
  description:
    "Community-focused Volleyball Legends player cards guide covering secret card searches, event card demand, and where to verify limited card drops.",
};

const cardNotes = [
  {
    title: "Why this page exists",
    body: "Search demand is already showing up for player cards, secret player cards, and specific card names like Brainrot Baller. The problem is that card information is much less centralized than codes or styles.",
  },
  {
    title: "What to treat as community data",
    body: "Card acquisition paths, event windows, and exact drop wording often circulate through community posts faster than through any official searchable document. That means this topic should stay clearly labeled as community-tracked unless the game surfaces a clean in-game source.",
  },
  {
    title: "Where to verify card drops",
    body: "Check Saturday update notes, the official Discord, and new code/event announcements first. Historically, card-related searches tend to rise around event patches and limited reward campaigns.",
  },
  {
    title: "Historical signal",
    body: "Community code trackers have circulated older code names such as PLAYERCARDS and SECRET_CARDS, which is one reason this intent keeps resurfacing in search even when the information is fragmented.",
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
          This guide collects the community-led information available for secret and named player cards. It stays conservative when the game has not published a reliable exact detail.
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
        <Link href="/updates" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Update Tracker</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Use this first if a new card release is tied to a fresh event patch.</p>
        </Link>
        <Link href="/codes" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Codes</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Card-related reward terms often piggyback on code chatter, so it is worth checking both pages together.</p>
        </Link>
      </section>
    </div>
  );
}
