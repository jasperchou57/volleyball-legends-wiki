import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock3, Gift, ShieldCheck } from "lucide-react";
import { activeCodes, latestGameUpdate, previousCodes, expiredCodes, pageFreshness, siteConfig, updates, type CodeEntry } from "@/data/volleyball";
import { NextStepPanel } from "@/components/volleyball/NextStepPanel";
import { CodeCheckStatus } from "./CodeCheckStatus";
import { CodeCopyButton } from "./CodeCopyButton";
import styles from "./CodesTable.module.css";

export const metadata: Metadata = {
  title: "Volleyball Legends Codes",
  description:
    "Track Volleyball Legends codes, recent update codes, reward notes, and the fastest official places to verify fresh drops.",
  alternates: {
    canonical: "/codes",
  },
};

function formatCheckDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function CodeTable({ entries }: { entries: CodeEntry[] }) {
  return (
    <div className="mt-4">
      <div className={styles.wrapper}>
        <table className={styles.table} role="table" aria-label="Codes, rewards and last checked dates">
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" role="columnheader">Code</th>
              <th scope="col" role="columnheader">Reward</th>
              <th scope="col" role="columnheader">Status</th>
              <th scope="col" role="columnheader"><span className="sr-only">Copy</span></th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {entries.map((entry) => (
              <tr key={entry.code} role="row">
                <td role="cell" className={styles.code}>
                  {entry.releaseDate === latestGameUpdate.releasedAt && <span className="mb-2 block w-fit rounded bg-accent-teal/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-accent-teal">NEW</span>}
                  <code>{entry.code}</code>
                </td>
                <td role="cell" className={styles.reward}>{entry.reward}</td>
                <td role="cell" className={styles.status}>
                  {entry.availability === "Unconfirmed" ? <CodeCheckStatus /> : (
                    <span className="text-accent-teal">{entry.availability ?? entry.status}</span>
                  )}
                  <span className="mt-1 block text-xs leading-5 text-muted">
                    Last checked: {entry.lastChecked ? formatCheckDate(entry.lastChecked) : "Not recorded"}
                  </span>
                </td>
                <td role="cell" className={styles.copy}><CodeCopyButton code={entry.code} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default function CodesPage() {


  return (
    <div className="container mx-auto max-w-5xl px-4 py-6 md:py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Codes</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-orange/20 bg-accent-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent-orange">
              <Gift className="h-4 w-4" />
              Last checked: {formatCheckDate(pageFreshness.codesLastChecked)}
            </div>
            <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
              Volleyball Legends Codes
            </h1>
            <p className="mt-4 text-lg font-semibold text-accent-teal">Update {latestGameUpdate.updateNumber} · {activeCodes.length} new codes</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">Added October 4, 2026 — 10 Lucky Style Spins, 5 Lucky Ability Spins &amp; 100 Gems.</p>
            <p className="mt-2 text-sm leading-6 text-muted">Update {latestGameUpdate.updateNumber} codes include {activeCodes.map((entry) => entry.code).join(", ")}, offering free spins and Gems.</p>
            <p className="mt-3 text-sm leading-6 text-muted">Copy a code below, then redeem it in-game at level 15.</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-accent-teal" />
            <h2 className="text-2xl font-heading font-bold text-white">Code status</h2>
          </div>
          <h3 className="mt-6 text-lg font-heading font-bold text-accent-teal">Active codes</h3>
          <CodeTable entries={activeCodes} />
          <details className="mt-6">
            <summary className="cursor-pointer text-sm text-muted">Earlier codes</summary>
            <CodeTable entries={previousCodes} />
          </details>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-accent-orange" />
              <h2 className="text-2xl font-heading font-bold text-white">Archived code reports</h2>
            </div>
            <div className="mt-5 space-y-3">
              {expiredCodes.slice(0, 4).map((entry) => (
                <div key={entry.code} className="rounded-3xl border border-white/10 bg-background/65 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold text-white line-through decoration-white/30">{entry.code}</p>
                    <span className="rounded-full border border-accent-gold/20 bg-accent-gold/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-gold">
                      Archived
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-200">{entry.reward}</p>
                  <p className="mt-1 text-xs text-muted">
                    Released {entry.releaseDate}.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">Verify fast</h2>
            <div className="mt-4 space-y-3 text-sm text-muted">
              <a
                href={siteConfig.officialLinks.discord}
                target="_blank"
                rel="noreferrer"
                className="block rounded-3xl border border-white/10 bg-background/65 p-4 text-white transition hover:border-white/25"
              >
                Official Discord
              </a>
              <a
                href={siteConfig.officialLinks.roblox}
                target="_blank"
                rel="noreferrer"
                className="block rounded-3xl border border-white/10 bg-background/65 p-4 text-white transition hover:border-white/25"
              >
                Roblox Listing
              </a>
              <Link href="/updates" className="block rounded-3xl border border-white/10 bg-background/65 p-4 text-white transition hover:border-white/25">
                Update Tracker
              </Link>
              <Link href="/style-return-dates" className="block rounded-3xl border border-white/10 bg-background/65 p-4 text-white transition hover:border-white/25">
                Return-date history
              </Link>
              <Link href="/codes/expired" className="block rounded-3xl border border-white/10 bg-background/65 p-4 text-white transition hover:border-white/25">
                Expired codes archive
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">How to redeem Volleyball Legends codes</h2>
          <ol className="mt-5 space-y-3 text-sm leading-7 text-muted">
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Reach level 15 to unlock code redemption.</li>
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Open the <strong className="text-white">Shop</strong> menu at the bottom of the screen.</li>
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Move to the <strong className="text-white">Codes</strong> tab on the left of the Shop menu.</li>
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Paste the complete code into the text box and press <strong className="text-white">Use Code</strong>.</li>
          </ol>
          <p className="mt-4 text-xs leading-5 text-muted">
            Check the game’s response and your reward balance after submitting.
          </p>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Why codes fail</h2>
          <div className="mt-5 space-y-3 text-sm leading-7 text-muted">
            <div className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Below level 15? Check your level and play until you meet the requirement.</div>
            <div className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Game says the code has expired? Try another code from the current list; expiry dates are not guaranteed.</div>
            <div className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Input error? Copy the complete code, preserving capital letters and underscores, with no extra spaces.</div>
            <div className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Already claimed? Check whether this account redeemed the code before. For other errors, check the official Discord; an error alone does not prove expiry.</div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={siteConfig.officialLinks.discord}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-background/65 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20"
            >
              Discord Announcements
            </a>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Recent updates and their code clusters</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {updates.map((update) => (
            <Link
              key={update.slug}
              href={`/updates/${update.slug}`}
              className="rounded-3xl border border-white/10 bg-background/65 p-5 transition hover:border-white/20"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{update.published}</p>
              <h3 className="mt-2 text-xl font-heading font-bold text-white">{update.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{update.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Codes FAQ</h2>
        <div className="mt-5 space-y-4">
          <details className="rounded-2xl border border-white/10 bg-background/65 p-4">
            <summary className="cursor-pointer list-none text-lg font-semibold text-white">When do new Volleyball Legends codes usually drop?</summary>
            <p className="mt-3 text-sm leading-6 text-muted">Most code spikes happen around Saturday updates, hotfixes, limited style launches, and community milestone posts. This is a pattern to check, not a guarantee that a code is live.</p>
          </details>
          <details className="rounded-2xl border border-white/10 bg-background/65 p-4">
            <summary className="cursor-pointer list-none text-lg font-semibold text-white">Are all codes on this page official?</summary>
            <p className="mt-3 text-sm leading-6 text-muted">The current active codes come from the official Volleyball Legends Discord announcement. We’ve checked the code names and rewards against the announcement.</p>
          </details>
          <details className="rounded-2xl border border-white/10 bg-background/65 p-4">
            <summary className="cursor-pointer list-none text-lg font-semibold text-white">What rewards do codes usually give?</summary>
            <p className="mt-3 text-sm leading-6 text-muted">Update 90 codes give Lucky Style Spins, Lucky Ability Spins, and Gems. Check the reward next to each code before redeeming.</p>
          </details>
        </div>
      </section>

      <NextStepPanel
        eyebrow="After you claim codes"
        title="Use the free spins deliberately"
        description="After you collect spins, decide whether the current limited banner fits your role or whether saving for an unannounced return is the better call."
        actions={[
          {
            href: "/tools/reroll-advisor",
            title: "Run reroll advice",
            description: "Convert fresh spins into a keep-or-roll decision instead of spending blindly.",
          },
          {
            href: "/next-update",
            title: "Check official update activity",
            description: "See the latest release and the next weekly update window.",
          },
          {
            href: "/tools/style-compare",
            title: "Compare target styles",
            description: "Stack the styles you want side by side before you turn codes into a bad reroll.",
          },
        ]}
      />
    </div>
  );
}
