import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { availabilityEvents } from "@/data/volleyball";
import { styleAliases } from "@/data/style-catalog";
import { comparisonStyles } from "@/data/style-comparison";
import { StyleDirectory } from "@/components/volleyball/StyleDirectory";

export const metadata: Metadata = {
  title: "Volleyball Legends Styles Wiki",
  description:
    "Browse Volleyball Legends style pages with community snapshots, mechanics, tier context, and documented limited-return history.",
  alternates: { canonical: "/styles" },
};

export default function StylesPage() {
  const styles = comparisonStyles.map(style => {
    const latestReturn = availabilityEvents
      .filter(event => event.subjectType === "Style" && event.subjectSlug === style.slug)
      .sort((a, b) => b.updateNumber - a.updateNumber)[0];
    return {
      slug: style.slug, name: style.name, rarity: style.rarity,
      roles: style.bestRoles,
      mechanic: style.slug === "roketto" ? "Jetpack adds an aerial movement option." : style.mechanic,
      href: style.href,
      olderNotes: style.olderNotes,
      aliases: styleAliases[style.slug] ?? [],
      returnWindow: latestReturn ? {
        window: /^[A-Za-z]+ \d{1,2}, \d{4}$/.test(latestReturn.window)
          ? `Started ${latestReturn.window}`
          : latestReturn.window.replace(/^Began /, "Started "),
        update: latestReturn.updateNumber,
      } : null,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Styles</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Volleyball Legends Styles
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Find a style for your position. Search by name, filter by role or rarity, and compare two styles to see how their mechanics differ.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link href="/tier-list/styles" className="text-accent-teal underline underline-offset-4 hover:text-white">View style rankings</Link>
          <Link href="/style-return-dates" className="text-accent-teal underline underline-offset-4 hover:text-white">Check limited return dates</Link>
        </div>
      </section>

      <StyleDirectory styles={styles} />
    </div>
  );
}
