import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Slots: Style & Ability Slot Costs",
  description: "See Style and Ability slot prices in Gems, the 100-slot limits, how to buy more slots, and what happens to existing slots after Update 90.",
  alternates: { canonical: "/guides/style-ability-slots" },
};

const prices = [
  ["3rd", "20 Gems"], ["4th", "100 Gems"], ["5th", "250 Gems"],
  ["6th", "370 Gems"], ["7th", "750 Gems"], ["8th", "1,000 Gems"],
  ["9th and above", "1,250 Gems each"],
];

const sections = [
  { title: "How to buy more slots", text: "Open the slot menu for Styles or Abilities to purchase additional slots with Gems." },
  { title: "How many slots can you have?", text: "You can have up to 100 Style slots and 100 Ability slots. These are separate limits. Before Update 90, the caps were 20 Style slots and 6 Ability slots." },
  { title: "What happens to your existing slots?", text: "Your existing Styles, Abilities, slot locks, and previously purchased slot gamepasses carry over. The old slot gamepasses are no longer available to buy." },
  { title: "Can you gift a slot?", text: "You can gift a Style or Ability slot to a friend for 199 Robux." },
];

export default function StyleAbilitySlotsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/" className="transition-colors hover:text-white">Home</Link>
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
        <Link href="/guides" className="transition-colors hover:text-white">Guides</Link>
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
        <span aria-current="page" className="text-white">Style &amp; Ability Slots</span>
      </nav>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Update 90 · Slot rework</p>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">Volleyball Legends Style &amp; Ability Slots</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">Buy additional Style and Ability slots with Gems directly from the slot menu. Each category supports up to 100 slots following Update 90.</p>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h2 className="text-2xl font-heading font-bold text-white">Slot prices</h2>
        <p className="mt-3 text-sm leading-7 text-muted">The price depends on which slot you are unlocking. From the ninth slot onward, each additional slot costs 1,250 Gems.</p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-background/70 text-muted"><tr><th scope="col" className="px-4 py-3">Slot</th><th scope="col" className="px-4 py-3">Cost</th></tr></thead>
            <tbody className="divide-y divide-white/10">{prices.map(([slot, cost]) => <tr key={slot}><th scope="row" className="px-4 py-4 font-medium text-white">{slot}</th><td className="px-4 py-4 font-semibold text-accent-teal">{cost}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {sections.map((section) => <section key={section.title} className="rounded-[2rem] border border-border bg-surface/80 p-6"><h2 className="text-2xl font-heading font-bold text-white">{section.title}</h2><p className="mt-3 text-sm leading-7 text-muted">{section.text}</p></section>)}
      </div>
      <p className="mt-8 text-sm leading-7 text-muted">See the <Link href="/updates/update-90" className="text-accent-teal underline underline-offset-4 hover:text-white">Update 90 changes</Link> for more details about the slot rework.</p>
    </div>
  );
}
