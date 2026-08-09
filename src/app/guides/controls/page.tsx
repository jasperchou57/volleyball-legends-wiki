import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Controls Guide",
  description:
    "Community-maintained Volleyball Legends controls guide for PC, controller, and mobile players looking for a clean starting layout.",
  alternates: { canonical: "/guides/controls" },
};

const controlCards = [
  {
    platform: "PC",
    notes: [
      "WASD movement and camera management are the first skill checks new players struggle with.",
      "Most community guides treat jump timing, spike timing, and dive reaction as the three key learning blocks.",
      "If your binds feel awkward, prioritize quick access to jump, dive, and your most-used ability rather than copying someone else exactly.",
    ],
  },
  {
    platform: "Controller",
    notes: [
      "Controller players benefit from simplifying camera movement and keeping jump timing consistent.",
      "If you are learning setter timing, test a slower camera sensitivity before changing everything else.",
      "Ranked players usually care more about clean reaction windows than flashy custom bind layouts.",
    ],
  },
  {
    platform: "Mobile",
    notes: [
      "Mobile players should keep the UI uncluttered and practice serve timing first because touch accuracy falls off under pressure.",
      "Move the camera and jump controls into positions that support repeated tilt inputs if you play high-skill spikers.",
      "If you are dropping inputs, reduce your screen clutter before blaming the style or ability.",
    ],
  },
];

export default function ControlsGuidePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Controls</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Controls
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          There is heavy search demand for controls, but control advice changes by platform and player preference. This page stays intentionally practical: set up a clean control flow, then spend your time on jump timing, serves, and reads.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {controlCards.map((card) => (
          <div key={card.platform} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">{card.platform}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              {card.notes.map((note) => (
                <li key={note} className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs leading-5 text-muted">
        Source note: this is a community-maintained starting guide, not an official bind sheet. The goal is to answer the search intent cleanly without pretending there is one perfect universal layout.
      </p>
    </div>
  );
}
