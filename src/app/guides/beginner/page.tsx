import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Beginner Guide",
  description:
    "A beginner guide for Volleyball Legends covering your first spins, role choices, early practice goals, and what to do before ranked.",
};

const steps = [
  {
    title: "1. Learn one role before you chase rare styles",
    body: "New players lose more time bouncing between roles than they gain from a lucky spin. Pick one simple role first: spiker if you want clean point-ending reps, setter if you like control, or libero if you want to stabilize games.",
  },
  {
    title: "2. Practice serve timing and first touch immediately",
    body: "Bad serves and weak receives throw points faster than almost anything else. Before you care about a tier list, make sure you can serve with intent and keep the ball playable on defense.",
  },
  {
    title: "3. Do not overspend spins before a Saturday event",
    body: "Codes and weekend updates create the best reroll windows. If your current style is playable, saving spins can be stronger than chasing every midweek rumor.",
  },
  {
    title: "4. Hit ranked only after your fundamentals stop collapsing",
    body: "Community guides usually place ranked access around level 15. Use public matches to fix your control flow, jumping rhythm, and camera discipline before you care about ladder progress.",
  },
];

export default function BeginnerGuidePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Beginner Guide</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Beginner Guide
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          This page is built for tutorial-style searches. The goal is to reduce early confusion fast: what to practice, when to save spins, and which mistakes matter before ranked.
        </p>
      </section>

      <div className="mt-8 space-y-4">
        {steps.map((step) => (
          <section key={step.title} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">{step.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/guides/controls" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Controls</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Start here if your camera, jump timing, or movement already feels awkward.</p>
        </Link>
        <Link href="/guides/how-to-serve" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">How to Serve</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Serve timing is the cleanest beginner skill win and one of the fastest ways to stop giving points away.</p>
        </Link>
        <Link href="/guides/ranks" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Ranks</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Check this before you commit to ranked progression or ladder-focused role choices.</p>
        </Link>
      </section>
    </div>
  );
}
