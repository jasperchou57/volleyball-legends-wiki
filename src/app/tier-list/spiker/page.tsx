import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StyleTierCards, StyleRoleNote } from "@/components/volleyball/StyleTierCards";

export const metadata: Metadata = {
  title: "Volleyball Legends Spiker Tier List",
  description:
    "Best spiker styles in Volleyball Legends, grouped into a focused role tier list instead of a generic all-in-one ranking page.",
  alternates: { canonical: "/tier-list/spiker" },
};

export default function SpikerTierListPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tier-list" className="hover:text-white transition-colors">Tier List</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Spiker</span>
      </div>
      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">Volleyball Legends Spiker Tier List</h1>
        <StyleRoleNote />
      </section>
      <StyleTierCards role="Spiker" />
    </div>
  );
}
