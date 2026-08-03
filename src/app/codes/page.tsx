import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock3, Gift, ShieldCheck } from "lucide-react";
import { activeCodes, currentGameState, expiredCodes, pageFreshness, siteConfig, updates, type CodeEntry } from "@/data/volleyball";
import { NextStepPanel } from "@/components/volleyball/NextStepPanel";
import { CopyCodeButton } from "@/components/volleyball/CopyCodeButton";

export const metadata: Metadata = {
  title: "Volleyball Legends Codes",
  description:
    "Track Volleyball Legends codes, recent update codes, reward notes, and the fastest official places to verify fresh drops.",
  alternates: {
    canonical: "/codes",
  },
};

function CodeTable({ entries }: { entries: CodeEntry[] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-3xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm">
        <thead className="bg-background/70">
          <tr className="text-xs uppercase tracking-[0.18em] text-muted">
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">Reward</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Last checked</th>
            <th className="px-4 py-3"><span className="sr-only">Copy</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 bg-surface/70">
          {entries.map((entry) => (
            <tr key={entry.code}>
              <td className="px-4 py-4 font-semibold text-white">{entry.code}</td>
              <td className="px-4 py-4 text-slate-200">{entry.reward}</td>
              <td className="px-4 py-4 text-muted">{entry.status}</td>
              <td className="px-4 py-4 text-muted">{entry.lastChecked}</td>
              <td className="px-4 py-4"><CopyCodeButton code={entry.code} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CodesPage() {
  const officialCodes = activeCodes.filter((entry) => entry.status === "Officially announced");
  const communityCodes = activeCodes.filter((entry) => entry.status === "Community verified");
  const reviewCodes = activeCodes.filter((entry) => entry.status === "Needs verification");

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Codes</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-orange/20 bg-accent-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
              <Gift className="h-4 w-4" />
              Last code check: {pageFreshness.codesLastChecked}
            </div>
            <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
              Volleyball Legends Codes
            </h1>
            <p className="mt-4 text-base leading-7 text-muted md:text-lg">
              Codes are separated by evidence level below. A code is never presented as official unless the developer published it; older community reports remain visible only as a last-known reference.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-background/70 p-5 text-sm text-muted">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Verification policy</p>
            <p className="mt-2 text-lg font-semibold text-white">Evidence before convenience</p>
            <p className="mt-2 max-w-xs leading-6">
              Last cross-checked: <strong className="text-white">{pageFreshness.codesLastChecked}</strong>. Current site status: {currentGameState.verificationStatus}. Use the official Discord or in-game redemption box before spending around a code.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-accent-teal" />
            <h2 className="text-2xl font-heading font-bold text-white">Code status by source</h2>
          </div>
          {officialCodes.length > 0 ? (
            <>
              <h3 className="mt-6 text-lg font-heading font-bold text-white">Officially announced</h3>
              <CodeTable entries={officialCodes} />
            </>
          ) : (
            <p className="mt-5 rounded-3xl border border-dashed border-white/15 bg-background/45 p-4 text-sm leading-6 text-muted">
              No official code is recorded in this snapshot. We do not promote a community report into this group.
            </p>
          )}
          {communityCodes.length > 0 && (
            <>
              <h3 className="mt-6 text-lg font-heading font-bold text-white">Community verified</h3>
              <CodeTable entries={communityCodes} />
            </>
          )}
          {reviewCodes.length > 0 && (
            <>
              <h3 className="mt-6 text-lg font-heading font-bold text-accent-gold">Needs a current check</h3>
              <CodeTable entries={reviewCodes} />
              <p className="mt-4 text-xs leading-5 text-muted">
                These are the last-known community reports from Update {currentGameState.updateNumber}, not a claim that they still work. Each can expire without notice.
              </p>
            </>
          )}
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
                  {entry.expiredNote && <p className="mt-2 text-xs leading-5 text-muted">{entry.expiredNote}</p>}
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
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Reach level 15 first. Community guides consistently say the codes tab only works after that point.</li>
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Open the <strong className="text-white">Shop</strong> menu at the bottom of the screen.</li>
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Move to the <strong className="text-white">Codes</strong> section on the left or by scrolling through the shop tabs.</li>
            <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Paste a working code into the text box and hit <strong className="text-white">Use Code</strong>.</li>
          </ol>
          <p className="mt-4 text-xs leading-5 text-muted">
            These steps match multiple community guides and code pages. They are consistent, but still not an official developer-written help page.
          </p>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Why codes fail</h2>
          <div className="mt-5 space-y-3 text-sm leading-7 text-muted">
            <div className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">You are below level 15.</div>
            <div className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">The code expired after the latest Saturday update or hotfix.</div>
            <div className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">You typed the code incorrectly or added an extra space.</div>
            <div className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">The code is being circulated by third-party sites before players have actually verified it in game.</div>
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
            <p className="mt-3 text-sm leading-6 text-muted">No. Official announcements, community-verified reports, and entries that need a new check are shown separately. Redeem in-game before relying on any non-official entry.</p>
          </details>
          <details className="rounded-2xl border border-white/10 bg-background/65 p-4">
            <summary className="cursor-pointer list-none text-lg font-semibold text-white">What rewards do codes usually give?</summary>
            <p className="mt-3 text-sm leading-6 text-muted">Most recent codes have centered on Lucky Style Spins and Lucky Ability Spins, especially around major update drops.</p>
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
            description: "Use the official watch page to see whether Roblox moved again before you burn spins into an outdated banner read.",
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
