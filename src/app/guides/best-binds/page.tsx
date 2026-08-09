import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Binds for Volleyball Legends",
  description:
    "A practical best-binds guide for Volleyball Legends on PC and controller, focused on fast reactions instead of one-size-fits-all layouts.",
  alternates: { canonical: "/guides/best-binds" },
};

const bindPrinciples = [
  "Keep jump, dive, and your most-used action on keys you can hit without twisting your hand out of position.",
  "If you are learning advanced tilt styles, prioritize camera comfort and repeated directional input before anything else.",
  "Copying a streamer layout is fine as a starting point, but your binds are only good if they reduce input errors under pressure.",
  "The best bind setup is the one that shortens your reaction path, not the one that looks most advanced in a screenshot.",
];

export default function BestBindsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Best Binds</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Best Binds for Volleyball Legends
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          There is no single official bind sheet. This page answers the query by giving you a decision framework: keep your core movement, jump, dive, and ability inputs fast enough that your mechanics survive real pressure.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {bindPrinciples.map((item, index) => (
          <section key={item} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Principle {index + 1}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{item}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-[2rem] border border-accent-teal/20 bg-accent-teal/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">When to change binds</h2>
        <p className="mt-3 text-sm leading-7 text-slate-100">
          Change binds when you can identify a specific failure: late dives, awkward camera swings, repeated missed jump timing, or trouble using ability inputs while moving. Do not rebuild your whole layout every time you roll a new style.
        </p>
      </section>
    </div>
  );
}
