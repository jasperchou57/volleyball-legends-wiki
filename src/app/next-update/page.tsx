import { Metadata } from "next";
import Link from "next/link";

import { LatestUpdateSummary } from "@/components/volleyball/LatestUpdateSummary";
import { UpdateCountdown } from "@/components/volleyball/UpdateCountdown";

export const metadata: Metadata = {
  title: "Volleyball Legends Next Update — Official Watch",
  description:
    "Live monitoring board for the next Volleyball Legends update. Tracks Roblox game-page changes, dev teasers on X, Discord announcements, and the latest public patch status between Saturday releases.",
  alternates: { canonical: "/next-update" },
};

export default function NextUpdatePage() {
  return <div className="container mx-auto max-w-5xl px-4 py-10">
    <Link href="/" className="text-sm text-muted">Home</Link>
    <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <h1 className="text-4xl font-heading font-black text-white md:text-5xl">Next Volleyball Legends Update</h1>
      <p className="mt-4 text-muted leading-7">See the next weekly update window in your local time, then catch up on the latest release. The countdown follows the Saturday schedule; upcoming content is confirmed separately.</p>
    </section>
    <div className="mt-6"><UpdateCountdown /></div>
    <div className="mt-8"><LatestUpdateSummary /></div>
    <p className="mt-5 text-sm leading-6 text-muted">Update 90’s announcement covers the October 3 release. It does not announce the next update’s new styles or abilities.</p>
  </div>;
}
