import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Radio } from "lucide-react";
import { datamineSources, officialSnapshot } from "@/data/volleyball";
import { UpdateCountdown } from "@/components/volleyball/UpdateCountdown";

export const metadata: Metadata = {
  title: "Volleyball Legends Next Update — Official Watch",
  description:
    "Live monitoring board for the next Volleyball Legends update. Tracks Roblox game-page changes, dev teasers on X, Discord announcements, and the latest public patch status between Saturday releases.",
  alternates: { canonical: "/next-update" },
};

export default function NextUpdatePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Next Update</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-teal/20 bg-accent-teal/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">
          <Radio className="h-4 w-4" />
          Monitoring board
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
          Next Volleyball Legends Update
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          A live monitoring board for the next Volleyball Legends update. This page is intentionally built as a dashboard instead of an article: three status sections (Confirmed / Rumored / Datamined), a list of sources we are watching, and a changelog of teaser sightings as they happen. If nothing is confirmed yet, the page says so honestly — no fabricated leaks.
        </p>
      </section>

      <div className="mt-6">
        <UpdateCountdown />
      </div>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Latest official activity</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Public patch-note status</p>
            <p className="mt-3 text-2xl font-heading font-black text-white">{officialSnapshot.latestPublicPatch}</p>
            <p className="mt-2 text-sm leading-6 text-muted">Latest check: {officialSnapshot.latestPublicPatchDate}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Roblox game page updated</p>
            <p className="mt-3 text-2xl font-heading font-black text-accent-orange">{officialSnapshot.gameUpdatedLabel}</p>
            <p className="mt-2 text-sm leading-6 text-muted">Official games API shows a newer live-build change than the last patch note we can publicly index.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Working assumption</p>
            <p className="mt-3 text-2xl font-heading font-black text-accent-teal">Live build changed</p>
            <p className="mt-2 text-sm leading-6 text-muted">No newer official patch write-up is publicly indexed, so we are treating the newer Roblox timestamp as a live change awaiting Discord confirmation.</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-5 text-muted">{officialSnapshot.note}</p>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] border border-accent-teal/20 bg-accent-teal/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-teal">Confirmed</p>
          <h2 className="mt-2 text-xl font-heading font-bold text-white">No public patch note yet</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            No officially confirmed feature list is publicly accessible on the open web. The only newer official signal we currently have is the Roblox game-page timestamp from {officialSnapshot.gameUpdatedLabel}.
          </p>
        </div>
        <div className="rounded-[2rem] border border-accent-gold/20 bg-accent-gold/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-gold">Rumored</p>
          <h2 className="mt-2 text-xl font-heading font-bold text-white">Nothing credible yet</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            No credible community rumors sighted. We will not seed speculation here until a source is quotable.
          </p>
        </div>
        <div className="rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-orange">Datamined</p>
          <h2 className="mt-2 text-xl font-heading font-bold text-white">Not applicable</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Roblox experiences are not meaningfully datamineable the way Unity or Unreal games are. Expect teaser-driven information, not file rips.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Sources we are watching</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Channels where the dev and community most often surface next-update information. Official sources always take precedence; community sources are useful for speed but should be cross-referenced before you plan around them.
        </p>
        <div className="mt-5 space-y-3">
          {datamineSources.map((source) => (
            <a
              key={source.label}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-3xl border border-white/10 bg-background/65 p-4 transition hover:border-white/25"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-lg font-heading font-bold text-white">{source.label}</p>
                <span
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                    source.kind === "Official"
                      ? "border-accent-teal/30 bg-accent-teal/10 text-accent-teal"
                      : "border-white/10 bg-white/5 text-muted"
                  }`}
                >
                  {source.kind}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted"><strong className="text-slate-200">Watch for:</strong> {source.watchFor}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Changelog of teaser sightings</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Append-only log of teaser screenshots, clips, and dev quotes. Empty until the next wave of pre-patch teasers surfaces.
        </p>
        <div className="mt-5 space-y-3">
          <div className="rounded-3xl border border-white/10 bg-background/65 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">{officialSnapshot.snapshotDateLabel}</p>
            <p className="mt-2 text-lg font-heading font-bold text-white">Roblox listing timestamp moved again</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              The official Roblox games API shows Volleyball Legends updating at {officialSnapshot.gameUpdatedLabel}. No public Discord or web-indexed patch note was visible when we checked, so this entry is logged as an official activity signal rather than a confirmed named patch.
            </p>
          </div>
          <div className="rounded-3xl border border-dashed border-white/15 bg-background/40 p-8 text-center text-sm text-muted">
            No teaser screenshots or quotable dev posts are indexed yet for the next patch. This log fills in once the dev starts previewing the patch publicly.
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Why no datamine leaks?</h2>
        <p className="mt-3 text-sm leading-6 text-slate-100">
          Roblox experiences run server-authoritative logic that the client never sees. Unlike Unity or Unreal games where the shipped binary can be inspected, almost all Volleyball Legends content (style stats, ability rates, pity thresholds, unreleased assets) lives on the server side. The useful pre-patch information almost always comes from the developer&rsquo;s own teasers on X and in the official Discord — not from file rips.
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-100">
          That is why this page is structured as a monitoring board: it tracks where teasers appear, not a hypothetical datamine that does not exist.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/updates" className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white">
            Browse past updates
          </Link>
          <Link href="/codes" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
            Check current codes
          </Link>
        </div>
      </section>
    </div>
  );
}
