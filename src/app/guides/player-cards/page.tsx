import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Player Cards Guide",
  description:
    "Explore Volleyball Legends Season 20 player cards, the Easy Money Bundle’s Outlaw card, Jinko Mastery rewards, and past tournament cards.",
  alternates: { canonical: "/guides/player-cards" },
};

const cardNotes = [
  { title: "Season 20 player cards", body: "The Wild West season adds the Saloon player card, Spiky Camo player card, and Season 20 Dynamic Ranked Card." },
  { title: "Outlaw Player Card", body: "Included in the Easy Money Bundle, available until November 21, 2026 at 11:30 AM ET. The bundle also includes the Money Bag ball, Coin Flip emote, John Hood score effect, and Sundown profile art." },
  { title: "Cosmic Horror Player Card", body: "Was offered for 10,000 Challenger Tokens in the limited-stock Cursed Tournament Shop. That shop window ended November 7, 2026 at 10:30 AM ET." },
  { title: "Cursed Tournament Top 1 custom card", body: "The custom player card was a Top 1 reward in the Cursed Tournament, alongside the Cursed Top 1 title and Cursed 1 Flame Jersey. The competition ended October 31, 2026 at 11:30 AM ET." },
  {
    title: "Jinko Cooked Player Card",
    body: "Complete quests with Jinko and reach Mastery Level 4 to unlock the Jinko Cooked Player Card.",
  },
  {
    title: "Skeleton Player Card",
    body: "The Skeleton Player Card was offered in the 1,299-Robux Skeleton Bundle during Update 90, with an announced end date of October 17, 2026. The bundle also included the Rattling Jaw Ball, Skeleton Grab Score Effect, and Shield Bash Emote.",
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
          Explore the new Season 20 cards and Outlaw card from the Easy Money Bundle, alongside Jinko Mastery rewards and past tournament cards.
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
        <Link href="/guides/cursed-tournament" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20"><h2 className="text-xl font-heading font-bold text-white">Cursed Tournament rewards</h2><p className="mt-3 text-sm leading-6 text-muted">Review placement rewards and the past Tournament Shop. Its window ended November 7, 2026.</p></Link>
        <Link href="/updates/update-95" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Season 20 rewards</h2>
          <p className="mt-3 text-sm leading-6 text-muted">See the Wild West season cosmetics and Easy Money Bundle.</p>
        </Link>
        <Link href="/styles/jinko" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Jinko Mastery</h2>
          <p className="mt-3 text-sm leading-6 text-muted">See all five Jinko Mastery reward levels and the announced return window.</p>
        </Link>
      </section>
    </div>
  );
}
