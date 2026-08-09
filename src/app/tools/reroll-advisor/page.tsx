import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RerollAdvisor } from "@/components/volleyball/RerollAdvisor";
import { NextStepPanel } from "@/components/volleyball/NextStepPanel";

export const metadata: Metadata = {
  title: "Volleyball Legends Reroll Advisor",
  description:
    "A disclaimer-first Volleyball Legends reroll advisor that helps decide whether to hold spins or push for a better event.",
  alternates: { canonical: "/tools/reroll-advisor" },
};

export default function RerollAdvisorPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Reroll Advisor</span>
      </div>

      <section className="mt-6 mb-8 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Reroll Advisor
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          This is a heuristic tool, not an official probability calculator. It exists because players constantly ask whether they should keep a Godly, chase a limited secret, or save for the next Saturday event.
        </p>
      </section>

      <RerollAdvisor />

      <NextStepPanel
        eyebrow="Continue the loop"
        title="Use the result instead of leaving with a vague feeling"
        description="The advisor should end in an action. Compare your current style, collect more codes, or read the live update before you spend anything irreversible."
        actions={[
          {
            href: "/tools/style-compare",
            title: "Compare your current style",
            description: "Put your keep candidate against the style you want before you commit more spins.",
          },
          {
            href: "/codes",
            title: "Collect more spins first",
            description: "If the result is low-conviction, build a better stack before you force the decision.",
          },
          {
            href: "/updates",
            title: "Check the latest update",
            description: "A reroll decision changes fast when a Saturday patch adds a limited style or a 2x event.",
          },
        ]}
      />
    </div>
  );
}
