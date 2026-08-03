import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import { currentGameState } from "@/data/volleyball";
import {
  legacyRouteDecisions,
  maintenanceCadence,
  maintenanceSnapshot,
  sourceRegistry,
  updateVerificationChecklist,
} from "@/data/content-operations";

export const metadata: Metadata = {
  title: "Sources & Update Policy | Volleyball Legends Wiki",
  description: "How Volleyball Legends Wiki labels official, community, and site-maintained data, plus its update and legacy-route review policy.",
  alternates: { canonical: "/sources" },
};

const tierClass = {
  Official: "border-accent-teal/30 bg-accent-teal/10 text-accent-teal",
  Community: "border-accent-gold/30 bg-accent-gold/10 text-accent-gold",
  "Site-maintained": "border-accent-orange/30 bg-accent-orange/10 text-accent-orange",
};

export default function SourcesPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="transition-colors hover:text-white">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Sources & Update Policy</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-teal/20 bg-accent-teal/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">
          <ShieldCheck className="h-4 w-4" />
          Editorial policy
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">Sources & Update Policy</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">This wiki separates official facts, dated community reports, and site-maintained judgment. A fast answer is useful only when its evidence is clear.</p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-5">
        {[
          ["Last verified", maintenanceSnapshot.lastVerified],
          ["Snapshot", maintenanceSnapshot.update],
          ["Status", maintenanceSnapshot.status],
          ["Official activity", maintenanceSnapshot.officialActivity],
          ["Codes checked", maintenanceSnapshot.codesLastChecked],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-border bg-surface/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</p>
            <p className="mt-3 text-lg font-heading font-bold text-white">{value}</p>
          </div>
        ))}
      </section>

      {currentGameState.reviewNote && <p className="mt-4 rounded-3xl border border-accent-gold/20 bg-accent-gold/10 p-5 text-sm leading-6 text-slate-100">{currentGameState.reviewNote}</p>}

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Source register</h2>
        <div className="mt-5 space-y-4">
          {sourceRegistry.map((source) => (
            <div key={source.label} className="rounded-3xl border border-white/10 bg-background/65 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-heading font-bold text-white">{source.label}</h3>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${tierClass[source.tier]}`}>{source.tier}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted"><strong className="text-slate-200">Used for:</strong> {source.usedFor}</p>
              <p className="mt-2 text-sm leading-6 text-muted"><strong className="text-slate-200">Rule:</strong> {source.rule}</p>
              {source.url && <a href={source.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-teal transition hover:text-white">Open source <ExternalLink className="h-4 w-4" /></a>}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Update-day checklist</h2>
          <ol className="mt-5 space-y-3 text-sm leading-6 text-muted">
            {updateVerificationChecklist.map((item, index) => <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-background/65 p-4"><span className="font-heading font-bold text-accent-teal">{index + 1}</span><span>{item}</span></li>)}
          </ol>
        </div>
        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Maintenance cadence</h2>
          <div className="mt-5 space-y-3">
            {maintenanceCadence.map((item) => <div key={item.label} className="rounded-2xl border border-white/10 bg-background/65 p-4"><h3 className="font-semibold text-white">{item.label}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p></div>)}
          </div>
          <p className="mt-5 text-sm leading-6 text-muted">Report a correction through the <Link href="/contact" className="font-semibold text-accent-teal hover:text-white">contact page</Link>. A correction remains labeled as unverified until its source is reviewed.</p>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Legacy URL policy</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">Older URLs are only redirected when there is a truthful replacement. Pages without an equivalent return 404 instead of being sent to unrelated content. Search Console performance and external links are reviewed before any future removal decision.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {legacyRouteDecisions.map((route) => <div key={route.path} className="rounded-2xl border border-white/10 bg-background/65 p-4"><div className="flex items-center justify-between gap-3"><p className="font-semibold text-white">{route.path}</p><span className="text-xs uppercase tracking-[0.16em] text-muted">{route.outcome}</span></div><p className="mt-2 text-sm leading-6 text-muted">{route.reason}</p><p className="mt-3 text-xs leading-5 text-slate-300">Review: {route.nextReview}</p></div>)}
        </div>
      </section>
    </div>
  );
}
