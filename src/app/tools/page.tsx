import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { toolCards } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Volleyball Legends Tools",
  description:
    "Lightweight Volleyball Legends tools for style comparison, update countdowns, and reroll advice built on community notes.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Tools</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Tools
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Tools are where the site stops looking like a copy of every other code page. They are also where you need the clearest disclaimers around community data and site-generated advice.
        </p>
      </section>

      <div className="mt-8 space-y-4">
        {toolCards.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20"
          >
            <h2 className="text-2xl font-heading font-bold text-white">{tool.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
