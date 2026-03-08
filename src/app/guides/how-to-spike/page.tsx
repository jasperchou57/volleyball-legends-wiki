import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Spike in Volleyball Legends",
  description:
    "Learn how to spike in Volleyball Legends with cleaner timing, approach rhythm, tilt control, and better decision-making at the net.",
};

const spikeNotes = [
  "Get your jump timing stable before you add advanced tilt tricks. Late jumps turn strong styles into weak contacts.",
  "Watch blockers before you commit. The best spike is often the one that avoids the block entirely instead of trying to brute-force through it.",
  "Use tilt direction with purpose. Small directional changes matter more than wild last-second flicks if you want repeatable angles.",
  "Practice off-set and emergency spikes. Real matches rarely give you perfect balls, so your value depends on how often you can salvage messy touches.",
];

export default function HowToSpikePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">How to Spike</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          How to Spike in Volleyball Legends
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Spiking intent is bigger than just “press jump and click.” This page focuses on repeatable offense: approach rhythm, clean contact, reading the block, and using tilt without throwing away consistency.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {spikeNotes.map((note, index) => (
          <section key={note} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Spike note {index + 1}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{note}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Good styles for learning spikes</h2>
        <p className="mt-3 text-sm leading-7 text-slate-100">
          Straightforward offensive styles like Ronin, Kozei, Uchikai, and Azmei make it easier to feel timing errors. High-skill styles like Kijo and Jinko are stronger long term, but they punish weak fundamentals much harder.
        </p>
      </section>
    </div>
  );
}
