import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Serve in Volleyball Legends",
  description:
    "Learn how to serve in Volleyball Legends with better timing, power control, jump-serve discipline, and safer early-game habits.",
  alternates: { canonical: "/guides/how-to-serve" },
};

const serveTips = [
  {
    title: "Start with a repeatable toss rhythm",
    body: "Serve timing falls apart when your toss and jump rhythm change every point. Find one stable routine first, then layer power and angle on top.",
  },
  {
    title: "Aim for playable pressure, not random aces",
    body: "A controlled tough serve is better than a hard miss. For beginners, reducing throwaway faults matters more than highlight-reel risk.",
  },
  {
    title: "Use jump serves when you can keep the contact clean",
    body: "Jump serves add pressure, but only if your timing is stable. If your jump serve is spraying free points, drop back to a safer serve until your rhythm improves.",
  },
  {
    title: "Abilities change serve plans",
    body: "Curve Spike and other directional tools make your serve game far more dangerous. Build your serve patterns around what your current ability actually does well.",
  },
];

export default function HowToServePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">How to Serve</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          How to Serve in Volleyball Legends
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          A reliable serve starts with consistent contact. Once that is stable, add speed, jump timing, and movement options one at a time.
        </p>
      </section>

      <div className="mt-8 space-y-4">
        {serveTips.map((tip) => (
          <section key={tip.title} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">{tip.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{tip.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href="/abilities/curve-spike" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Curve Spike</h2>
          <p className="mt-3 text-sm leading-6 text-muted">One of the most important ability pages for serve-focused players.</p>
        </Link>
        <Link href="/styles/jinko" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Jinko</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Jinko stays popular because players want curve-heavy serving and spiking in one package.</p>
        </Link>
      </section>
    </div>
  );
}
