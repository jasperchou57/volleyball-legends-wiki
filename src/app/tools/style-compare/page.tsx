import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StyleCompareTool } from "@/components/volleyball/StyleCompareTool";

export const metadata: Metadata = {
  title: "Volleyball Legends Style Compare Tool",
  description:
    "Compare two Volleyball Legends styles side by side with role, offense, control, defense, mobility, and difficulty snapshots.",
};

export default function StyleComparePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Style Compare</span>
      </div>

      <section className="mt-6 mb-8 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Style Compare
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          This is the first real moat page after codes. It helps players decide between the styles they are actually pulling rather than reading another generic best-styles list.
        </p>
      </section>

      <StyleCompareTool />
    </div>
  );
}
