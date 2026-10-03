import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { UpdateCountdown } from "@/components/volleyball/UpdateCountdown";

export const metadata: Metadata = {
  title: "Volleyball Legends Update Countdown",
  description:
    "Track the expected weekly Volleyball Legends update window and decide when to check codes, banners, and official announcements.",
  alternates: { canonical: "/tools/update-countdown" },
};

export default function UpdateCountdownPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Update Countdown</span>
      </div>

      <section className="mt-6 mb-8 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Update Countdown
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          See when the next Volleyball Legends update is scheduled, with a countdown and the start time in your time zone.
        </p>
      </section>

      <UpdateCountdown detailed />

      <section className="mt-8 rounded-3xl border border-border bg-surface/60 p-6 md:p-8">
        <h2 className="font-heading text-2xl font-bold text-white">Common questions</h2>
        <details className="mt-5 border-b border-border pb-5">
          <summary className="cursor-pointer font-semibold text-white">When does Volleyball Legends update?</summary>
          <p className="mt-3 text-muted leading-7">Updates are usually scheduled for Saturdays at 11:30 AM Eastern Time. The countdown adjusts for daylight saving time and shows the start time in your time zone.</p>
        </details>
        <details className="pt-5">
          <summary className="cursor-pointer font-semibold text-white">What happens when the countdown ends?</summary>
          <p className="mt-3 text-muted leading-7">The countdown automatically moves to the following Saturday. For release announcements or schedule changes, check the <Link href="/guides/discord" className="text-accent-teal underline underline-offset-4">official Discord</Link>.</p>
        </details>
      </section>
    </div>
  );
}
