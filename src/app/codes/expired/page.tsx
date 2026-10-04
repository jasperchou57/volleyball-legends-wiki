import { Metadata } from "next";
import Link from "next/link";
import { Archive, ChevronRight } from "lucide-react";
import { expiredCodes } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Expired Codes Archive",
  description:
    "Browse older Volleyball Legends codes, their rewards, and release dates. See expired entries and codes marked Check whose redemption status is uncertain.",
  alternates: {
    canonical: "/codes/expired",
  },
};

const disputedCodes = new Set(["UPDATE_80", "HIDARI_FINALLY", "ENCHO_NERF"]);

export default function ExpiredCodesPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/codes" className="hover:text-white transition-colors">Codes</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Expired</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          <Archive className="h-4 w-4" />
          Archive
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
          Expired Volleyball Legends Codes
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Browse older codes and their original rewards. Codes marked Check have conflicting status reports; try them in-game before treating them as expired. For the latest codes, see the main{" "}
          <Link href="/codes" className="text-white underline decoration-accent-orange/50 underline-offset-4">
            Volleyball Legends codes
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Older codes and rewards</h2>
        <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-background/70">
              <tr className="text-xs uppercase tracking-[0.18em] text-muted">
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Reward</th>
                <th className="px-4 py-3">Released</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-surface/70">
              {expiredCodes.map((entry) => (
                <tr key={entry.code}>
                  <td className={`px-4 py-4 font-semibold text-white ${disputedCodes.has(entry.code) ? "" : "line-through decoration-white/30"}`}>{entry.code}</td>
                  <td className="px-4 py-4 text-slate-200">{entry.reward}</td>
                  <td className="px-4 py-4 text-muted">{entry.releaseDate}</td>
                  <td className="px-4 py-4 text-muted">{disputedCodes.has(entry.code) ? "Check" : "Expired"}</td>
                  <td className="px-4 py-4 text-muted">{entry.expiredNote ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">Why keep a record?</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
          <li>Helps you identify older codes and see which ones still need an in-game check.</li>
          <li>Maps each code back to the update that released it, which is useful when you are reading old patch notes.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/codes" className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-5 py-3 text-sm font-semibold text-white">
            Go to current codes
          </Link>
          <Link href="/updates" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
            Browse update archive
          </Link>
        </div>
      </section>
    </div>
  );
}
