import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { featuredStyles, getUpdate, siteConfig, updates } from "@/data/volleyball";
import { NextStepPanel } from "@/components/volleyball/NextStepPanel";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return updates.map((update) => ({ slug: update.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const update = getUpdate(slug);

  if (!update) {
    return {};
  }

  return {
    title: update.title,
    description: update.summary,
    alternates: { canonical: `/updates/${update.slug}` },
  };
}

export default async function UpdateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const update = getUpdate(slug);

  if (!update) {
    notFound();
  }

  const focusStyles = (update.focusStyles ?? [])
    .map((slug) => featuredStyles.find((style) => style.slug === slug))
    .filter(Boolean);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/updates" className="hover:text-white transition-colors">Updates</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">{update.title}</span>
      </div>

      <article className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <div className="inline-flex rounded-full border border-accent-orange/20 bg-accent-orange/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent-orange">
          {update.sourceTier} source set
        </div>
        <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">
          {update.title}
        </h1>
        <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">{update.published}</p>
        <p className="mt-5 text-base leading-7 text-muted md:text-lg">{update.summary}</p>

        <div className="mt-8 rounded-[2rem] border border-accent-gold/20 bg-accent-gold/10 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Evidence and affected pages</h2>
          <p className="mt-3 text-sm leading-6 text-slate-200">Source tier: <strong className="text-white">{update.sourceTier}</strong> · last checked {update.lastChecked ?? update.published}.</p>
          <p className="mt-3 text-sm leading-6 text-muted">{update.evidenceNote ?? "This is a historical update summary. Cross-check the official Discord before treating a time-sensitive item as current."}</p>
          <a href={siteConfig.officialLinks.discord} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-accent-teal hover:text-white">Official Discord verification route</a>
          {update.affectedPages?.length ? <div className="mt-5 flex flex-wrap gap-3">{update.affectedPages.map((page) => <Link key={page.href} href={page.href} className="rounded-full border border-white/10 bg-background/65 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25">{page.label}</Link>)}</div> : null}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-background/65 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Key patch takeaways</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
            {update.highlights.map((highlight) => (
              <li key={highlight} className="rounded-2xl border border-white/10 bg-surface/60 px-4 py-3">
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-background/65 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">Codes connected to this patch</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {update.codes.map((code) => (
              <Link
                key={code}
                href="/codes"
                className="rounded-full border border-white/10 bg-surface/70 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25"
              >
                {code}
              </Link>
            ))}
          </div>
        </div>
      </article>

      <NextStepPanel
        eyebrow="After reading the patch"
        title="Turn this update into a decision"
        description="Patch notes only matter if they change what you chase next. Use the live update to decide whether to spend spins now, compare the featured style against your current pick, or just bank resources."
        actions={[
          {
            href: focusStyles[0] ? `/styles/${focusStyles[0]!.slug}` : "/styles",
            title: focusStyles[0] ? `Open ${focusStyles[0]!.name}` : "Open featured styles",
            description: "Go from patch notes to the specific style pages this update actually changed demand for.",
          },
          {
            href: "/codes",
            title: "Grab the linked codes",
            description: "Max out the update's obvious free value before you decide whether to spend anything.",
          },
          {
            href: "/tools/reroll-advisor",
            title: "Decide whether this banner is worth it",
            description: "Use the reroll tool to turn the patch hype into a keep-or-spin call.",
          },
        ]}
      />
    </div>
  );
}
