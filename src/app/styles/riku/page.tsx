import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Riku in Volleyball Legends: REBOUND Rework Guide",
  description: "Learn Riku’s Update 96 REBOUND rework in Volleyball Legends: charge with 3–4 spikes, activate hologram walls with Special, and check his return status.",
  alternates: { canonical: "/styles/riku" },
};

const sectionClass = "mt-8 scroll-mt-44 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8";
const jumpLinkClass = "rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:border-accent-teal";

const reboundSteps = [
  { title: "Charge REBOUND", description: "Use 3–4 spikes." },
  { title: "Raise the hologram walls", description: "Press Special once REBOUND is charged." },
  { title: "Play the bounce", description: "Either team’s ball can bounce off the walls. The walls break after one bounce." },
];

export default function RikuPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
        <Link href="/styles" className="hover:text-white">Styles</Link>
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
        <span aria-current="page" className="text-white">Riku</span>
      </nav>

      <header className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">Volleyball Legends Riku Guide</h1>
        <div id="availability" className="mt-5 scroll-mt-44 rounded-2xl border border-accent-orange/25 bg-accent-orange/10 p-4 text-sm leading-7 text-slate-100">
          <p className="font-semibold">Riku is unavailable to roll in Update 96.</p>
          <Link href="/style-return-dates" className="text-accent-teal underline underline-offset-4">
            Check style return dates
          </Link>
        </div>
        <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-3">
          <a href="#rebound" className={jumpLinkClass}>How to use REBOUND</a>
          <a href="#changes" className={jumpLinkClass}>What changed</a>
        </nav>
      </header>

      <section id="rebound" className={sectionClass}>
        <h2 className="text-2xl font-heading font-bold text-white">How to use Riku’s REBOUND</h2>
        <ol className="mt-5 grid gap-4 md:grid-cols-3">
          {reboundSteps.map(({ title, description }, index) => (
            <li key={title} className="rounded-2xl border border-white/10 bg-background/65 p-5">
              <span aria-hidden="true" className="text-sm font-bold text-accent-teal">{index + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="changes" className={sectionClass}>
        <h2 className="text-2xl font-heading font-bold text-white">What changed in Update 96?</h2>
        <p className="mt-4 text-sm leading-7 text-muted">
          Riku’s walls used to stay up automatically. The rework lets you choose when to raise them.
        </p>
        <Link href="/updates/update-96" className="mt-4 inline-block text-sm font-semibold text-accent-teal underline underline-offset-4">
          Read the Update 96 patch notes
        </Link>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-heading font-bold text-white">Compare Riku with your current style</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/tools/style-compare?a=riku" className="rounded-full bg-accent-teal px-5 py-3 text-sm font-semibold text-background hover:opacity-90">
            Compare Riku
          </Link>
          <Link href="/tier-list/styles" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-accent-teal">
            View style tier list
          </Link>
        </div>
      </section>
    </div>
  );
}
