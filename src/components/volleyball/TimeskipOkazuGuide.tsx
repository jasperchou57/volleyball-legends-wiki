import Link from "next/link";
import { getStyle, pageFreshness, tsoAngerMechanics, tsoBorderSet } from "@/data/volleyball";

const sectionClass = "mt-8 scroll-mt-44 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8";

export function TimeskipOkazuGuide() {
  const style = getStyle("timeskip-okazu")!;
  return <div className="container mx-auto max-w-5xl px-4 py-10">
    <nav aria-label="Breadcrumb" className="flex flex-wrap gap-3 text-sm text-muted"><Link href="/">Home</Link><span>/</span><Link href="/styles">Styles</Link><span>/</span><span className="text-white">Timeskip Okazu</span></nav>
    <header className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">TSO rework · Update 94</p>
      <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">Timeskip Okazu Style Guide &amp; Community Stats</h1>
      <p className="mt-5 text-lg leading-8 text-muted">Timeskip Okazu (TSO) builds Anger to make Rainbow Serves easier to hit. His new Border Set slows the ball before the line you aim at, giving you another way to place a set.</p>
      <p className="mt-5 rounded-2xl border border-accent-teal/20 bg-accent-teal/10 p-4 text-sm leading-7 text-slate-100">Announced return: October 31 – November 14, 2026 at 11:30 AM ET.</p>
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">{[["anger", "Anger & Rainbow Serves"], ["border-set", "Border Set"], ["return", "Return window"], ["stats", "Earlier stats"]].map(([id, text]) => <a key={id} href={`#${id}`} className="rounded-full border border-border px-4 py-2 text-sm text-slate-200 hover:border-accent-teal">{text}</a>)}</nav>
    </header>
    <section id="anger" className={sectionClass}>
      <h2 className="text-2xl font-heading font-bold text-white">How TSO’s Anger works</h2>
      <ul className="mt-5 list-disc space-y-4 pl-5 text-sm leading-7 text-muted">{tsoAngerMechanics.map(item => <li key={item}>{item}</li>)}</ul>
    </section>
    <section id="border-set" className={sectionClass}>
      <h2 className="text-2xl font-heading font-bold text-white">How to perform a Border Set</h2>
      <p className="mt-4 text-sm leading-7 text-muted">{tsoBorderSet}</p>
      <Link href="/guides/how-to-set" className="mt-4 inline-block text-accent-teal underline underline-offset-4">Practice setting fundamentals</Link>
    </section>
    <section id="return" className={sectionClass}>
      <h2 className="text-2xl font-heading font-bold text-white">When does Timeskip Okazu leave?</h2>
      <p className="mt-4 text-sm leading-7 text-muted">TSO’s two-week return ends November 14, 2026 at 11:30 AM ET. Check the in-game style banner before spending spins.</p>
      <p className="mt-3 text-sm leading-7 text-muted">The Update 94 code <Link href="/codes" className="font-semibold text-accent-teal underline">TSO_RETURNS</Link> gives 5 Lucky Style Spins.</p>
      <Link href="/style-return-dates" className="mt-4 inline-block text-accent-teal underline underline-offset-4">All announced return windows</Link>
    </section>
    <section id="stats" className={sectionClass}>
      <h2 className="text-2xl font-heading font-bold text-white">Earlier community stats</h2>
      <p className="mt-3 text-sm leading-7 text-muted">These stats were last reviewed {pageFreshness.tierListLastUpdated}, before the Update 94 rework. Check current attributes in-game.</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{Object.entries(style.stats ?? {}).map(([label,value]) => <div key={label} className="rounded-2xl border border-border bg-background/60 p-4"><dt className="text-sm text-muted">{label}</dt><dd className="mt-2 text-xl font-bold text-white">{value}</dd></div>)}</dl>
    </section>
    <footer className="mt-8 flex flex-wrap gap-4 text-sm"><Link href="/updates/update-94" className="text-accent-teal underline underline-offset-4">Update 94 patch notes</Link><Link href="/guides/how-to-serve" className="text-accent-teal underline underline-offset-4">Serving guide</Link><Link href="/tools/reroll-advisor" className="text-accent-teal underline underline-offset-4">Plan your Lucky Spins</Link></footer>
  </div>;
}
