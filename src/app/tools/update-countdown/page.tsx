import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { UpdateCountdown } from "@/components/volleyball/UpdateCountdown";

export const metadata: Metadata = {
  title: "Volleyball Legends Update Countdown",
  description:
    "Track the next weekly Volleyball Legends update window and plan your code posts, rerolls, and Saturday event pages.",
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
          This page supports both players and your own publishing workflow. If search spikes keep landing on Saturday, the countdown becomes a useful utility and a branding signal at the same time.
        </p>
      </section>

      <UpdateCountdown />
    </div>
  );
}
