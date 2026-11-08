import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StyleTierCards, StyleRoleNote } from "@/components/volleyball/StyleTierCards";

export const metadata: Metadata = {
  title: "Volleyball Legends Blocker Tier List",
  description:
    "Best blocker and jump-focused styles in Volleyball Legends, grouped for players who care about net defense and first-contact pressure.",
  alternates: { canonical: "/tier-list/blocker" },
};

export default function BlockerTierListPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tier-list" className="hover:text-white transition-colors">Tier List</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Blocker</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Blocker Tier List
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Compare styles for blocking and net defense, including Mamori’s timed Parry and Charge.
        </p>
        <StyleRoleNote />
      </section>

      <StyleTierCards role="Blocker" />
    </div>
  );
}
