import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Discord",
  description:
    "Official Volleyball Legends Discord link, what it is used for, and why it matters for codes, updates, and fast verification.",
};

export default function DiscordGuidePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Discord</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Discord
        </h1>
        <p className="mt-4 text-base leading-7 text-muted md:text-lg">
          If you only verify one external source before publishing codes or update notes, make it the official Discord. It is the fastest signal for announcements, events, and community verification after big Saturday patches.
        </p>

        <div className="mt-6 rounded-[2rem] border border-accent-teal/20 bg-accent-teal/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-teal">Official Link</p>
          <a
            href={siteConfig.officialLinks.discord}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-xl font-semibold text-white underline"
          >
            Open the official Volleyball Legends Discord
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          "Codes usually surface here first or get verified here first.",
          "Major updates and events create immediate Discord traffic before search results settle.",
          "If the community is split on whether a code still works, Discord is faster than waiting for generic code sites to refresh.",
        ].map((item) => (
          <div key={item} className="rounded-[2rem] border border-border bg-surface/80 p-6 text-sm leading-6 text-muted">
            {item}
          </div>
        ))}
      </section>
    </div>
  );
}
