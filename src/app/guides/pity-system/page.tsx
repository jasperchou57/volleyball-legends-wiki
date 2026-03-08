import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Volleyball Legends Pity System Guide",
  description:
    "Community-maintained Volleyball Legends pity-system guide covering normal spins, lucky spins, 2x luck windows, and reroll discipline.",
};

const pityRows = [
  ["Normal Spins", "Community trackers often cite 62.5% Common, 35% Rare, 2% Legendary, 0.5% Godly, 0.01% Secret, 0.005% Ultra."],
  ["Lucky Spins", "Community trackers usually cite much stronger Godly/Secret rates and feature-specific pity behavior."],
  ["2x Luck Events", "Recent update posts say secret and Ultra rates double while some pity thresholds get cut in half."],
];

export default function PitySystemGuidePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Pity System</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Pity System
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          This page is intentionally labeled as a <strong>community-maintained odds guide</strong>. It exists because queries like <strong>normal pity volleyball legends</strong> and <strong>how to increase secret pity</strong> are already appearing, but the data is not presented as official developer-published math.
        </p>
      </section>

      <div className="mt-8 space-y-4">
        {pityRows.map(([title, description]) => (
          <div key={title} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <h2 className="text-2xl font-heading font-bold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[2rem] border border-accent-orange/20 bg-accent-orange/10 p-6">
        <h2 className="text-2xl font-heading font-bold text-white">How to use this page safely</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
          <li>Use it to decide whether you should save for Saturday events, not to pretend you know exact server-side rates.</li>
          <li>When an event starts, verify the current language in Discord before you publish hard thresholds.</li>
          <li>If you build a spin calculator, keep a clear disclaimer above the fold.</li>
        </ul>
      </div>
    </div>
  );
}
