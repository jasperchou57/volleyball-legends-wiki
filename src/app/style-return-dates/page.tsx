import { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronRight, CircleAlert } from "lucide-react";
import { availabilityEvents, currentGameState, featuredStyles, pageFreshness } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Style Return Dates",
  description: "Documented Volleyball Legends style and ability return history. Future return dates are marked not announced until official channels confirm them.",
  alternates: { canonical: "/style-return-dates" },
};

function subjectLink(subjectType: "Style" | "Ability", slug: string) {
  return `/${subjectType === "Style" ? "styles" : "abilities"}/${slug}`;
}

function subjectName(subjectType: "Style" | "Ability", slug: string) {
  if (subjectType === "Style") return featuredStyles.find((style) => style.slug === slug)?.name ?? slug;
  return slug === "lead-feet" ? "Lead Feet" : slug;
}

export default function StyleReturnDatesPage() {
  const newestFirst = [...availabilityEvents].sort((a, b) => b.updateNumber - a.updateNumber);
  const latestReports = newestFirst.filter((event) => event.status === "Limited window");

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="transition-colors hover:text-white">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Return Dates</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-orange/20 bg-accent-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
          <CalendarDays className="h-4 w-4" />
          History, not prediction
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">Volleyball Legends Return Dates</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          This calendar records documented limited-style and ability windows. It does not guess the next banner: if the developer has not announced a return, the answer is simply <strong className="text-white">not announced</strong>.
        </p>
        <p className="mt-3 text-sm text-muted">Last cross-checked: {pageFreshness.siteLastUpdated} · {currentGameState.verificationStatus}</p>
      </section>

      <section className="mt-8 rounded-[2rem] border border-accent-teal/20 bg-accent-teal/10 p-6">
        <div className="flex items-start gap-3">
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-accent-teal" />
          <div>
            <h2 className="text-2xl font-heading font-bold text-white">Latest reported banner</h2>
            {latestReports.length ? latestReports.map((event) => (
              <p key={`${event.subjectType}-${event.subjectSlug}`} className="mt-2 text-sm leading-6 text-slate-100">
                <Link href={subjectLink(event.subjectType, event.subjectSlug)} className="font-semibold underline decoration-accent-teal/50 underline-offset-4">{subjectName(event.subjectType, event.subjectSlug)}</Link> — {event.window}. {event.note}
              </p>
            )) : <p className="mt-2 text-sm text-slate-100">No active limited window is recorded in this snapshot.</p>}
            <p className="mt-3 text-xs leading-5 text-muted">The latest state is Update {currentGameState.updateNumber}; use the in-game banner and official Discord for a same-day check.</p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-heading font-bold text-white">Documented release and return history</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Newest first. A historical return only proves that an item has returned before; it does not create a schedule.</p>
          </div>
          <Link href="/next-update" className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25">Track the next update</Link>
        </div>
        <div className="mt-6 space-y-3">
          {newestFirst.map((event) => (
            <article key={`${event.subjectType}-${event.subjectSlug}-${event.updateNumber}`} className="rounded-3xl border border-white/10 bg-background/65 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Update {event.updateNumber} · {event.subjectType}</p>
                  <h3 className="mt-2 text-xl font-heading font-bold text-white">
                    <Link href={subjectLink(event.subjectType, event.subjectSlug)} className="transition hover:text-accent-teal">{event.label}</Link>
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">{event.status}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-100">{event.window}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{event.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">What is the next return date?</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Not announced. Weekly Saturday updates are a release cadence, not a promise about which style or ability will return. Save spins only if you are comfortable waiting without a confirmed target.</p>
      </section>
    </div>
  );
}
