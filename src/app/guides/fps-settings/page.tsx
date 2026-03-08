import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Best FPS Settings for Volleyball Legends",
  description:
    "FPS and performance settings for Volleyball Legends, with practical advice on timing, input stability, and what to test before changing your whole setup.",
};

const fpsChecks = [
  "If your timing feels random, test graphics and background apps before changing your style or binds.",
  "Stable FPS matters more than pretty visuals in a timing-heavy sports game.",
  "Lower input delay usually helps jump timing, dive reactions, and cleaner contact windows.",
  "When possible, use a consistent frame rate and avoid switching performance modes every match.",
];

export default function FpsSettingsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">FPS Settings</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Best FPS Settings for Volleyball Legends
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          This page exists because players do search for FPS guidance. The real answer is less about magic settings and more about stable performance, lower input delay, and removing obvious timing noise from your setup.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {fpsChecks.map((item, index) => (
          <section key={item} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Check {index + 1}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{item}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">What not to do</h2>
        <p className="mt-3 text-sm leading-7 text-slate-100">
          Do not use FPS settings as an excuse for every mistake. If your performance is already stable, your next improvements are almost always timing, role discipline, and reading the ball earlier.
        </p>
      </section>
    </div>
  );
}
