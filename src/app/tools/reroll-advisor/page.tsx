import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RerollAdvisor } from "@/components/volleyball/RerollAdvisor";
import { NextStepPanel } from "@/components/volleyball/NextStepPanel";

export const metadata: Metadata = {
  title: "Volleyball Legends Reroll Advisor",
  description:
    "Plan your Volleyball Legends rerolls: check style availability, protect the styles you want to keep, and review your Lucky Spin budget before rolling.",
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
          Plan around the style you want to keep, your available slots, and your spin budget.
        </p>
      </section>

      <RerollAdvisor />

      <NextStepPanel
        eyebrow="Next steps"
        title="Compare styles and plan your next roll"
        description="Compare your options, collect free spins, and check the latest update before rolling."
        actions={[
          {
            href: "/tools/style-compare",
            title: "Compare your current style",
            description: "Compare your current style with the one you want to roll.",
          },
          {
            href: "/codes",
            title: "Collect more spins first",
            description: "Check the latest codes for Lucky Spins before planning your budget.",
          },
          {
            href: "/updates",
            title: "Check the latest update",
            description: "Check for returning styles and changes to spin rates.",
          },
        ]}
      />
    </div>
  );
}
