"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Search, SlidersHorizontal, X } from "lucide-react";

type DirectoryStyle = {
  slug: string;
  name: string;
  rarity: string;
  roles: string[];
  mechanic: string;
  href: string | null;
  olderNotes: boolean;
  aliases: string[];
  returnWindow: { window: string; update: number } | null;
};

const roles = ["Spiker", "Setter", "Blocker", "Libero", "Server", "All-Rounder"];
const controlClass = "min-h-11 rounded-xl border border-white/20 bg-background px-3 py-2 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-teal";
const buttonClass = "min-h-11 rounded-xl border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-teal";

export function StyleDirectory({ styles }: { styles: DirectoryStyle[] }) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");
  const [rarity, setRarity] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const rarities = [...new Set(styles.map(style => style.rarity))].sort();
  const search = query.trim().toLowerCase();
  const filtered = styles.filter(style =>
    (!search || [style.name, ...style.aliases].some(name => name.toLowerCase().includes(search))) &&
    (!role || style.roles.includes(role)) && (!rarity || style.rarity === rarity));
  const pair = selected.map(slug => styles.find(style => style.slug === slug)!);
  const hasFilters = Boolean(query || role || rarity);

  function resetFilters() { setQuery(""); setRole(""); setRarity(""); }
  function toggleStyle(slug: string) {
    setSelected(current => current.includes(slug) ? current.filter(value => value !== slug) : current.length < 2 ? [...current, slug] : current);
  }

  return <section className="mt-8" aria-label="Style directory">
    <div className="rounded-3xl border border-border bg-surface/80 p-5 md:p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-white"><SlidersHorizontal className="h-4 w-4 text-accent-teal" aria-hidden="true" />Find your style</div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <label className="min-w-0 sm:col-span-2 lg:col-span-1">
          <span className="mb-2 block text-sm text-slate-300">Search styles</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted" aria-hidden="true" />
            <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Name or alias, e.g. Mamori or TSO" className={`${controlClass} w-full pl-10`} />
          </div>
        </label>
        <label className="min-w-0"><span className="mb-2 block text-sm text-slate-300">Role</span>
          <select value={role} onChange={event => setRole(event.target.value)} className={`${controlClass} w-full`}><option value="">All roles</option>{roles.map(value => <option key={value}>{value}</option>)}</select>
        </label>
        <label className="min-w-0"><span className="mb-2 block text-sm text-slate-300">Rarity</span>
          <select value={rarity} onChange={event => setRarity(event.target.value)} className={`${controlClass} w-full`}><option value="">All rarities</option>{rarities.map(value => <option key={value}>{value}</option>)}</select>
        </label>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs leading-6 text-muted">Roles describe where a style fits in a team. Rarity is not a strength ranking.</p>
        {hasFilters && <button type="button" onClick={resetFilters} className="min-h-11 text-sm font-semibold text-accent-teal underline underline-offset-4">Clear filters</button>}
      </div>
    </div>

    <div className="my-5 flex flex-wrap items-center justify-between gap-2 text-sm">
      <p role="status" className="text-slate-200">Showing <strong className="text-white">{filtered.length}</strong> of {styles.length} styles</p>
      <p className="text-muted">Choose two styles to compare.</p>
    </div>

    {filtered.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filtered.map(style => {
        const chosen = selected.includes(style.slug);
        const full = selected.length === 2 && !chosen;
        return <article key={style.slug} className={`flex min-w-0 flex-col rounded-3xl border bg-surface/80 p-5 md:p-6 ${chosen ? "border-accent-teal" : "border-border"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-teal">{style.rarity}</p>
          <h2 className="mt-3 text-2xl font-heading font-bold text-white">{style.name}</h2>
          {style.aliases.length > 0 && <p className="mt-1 text-xs text-muted">{style.slug === "timeskip-okazu" ? "Also known as" : "Formerly"} {style.aliases.join(", ")}</p>}
          <p className="mt-3 text-sm font-medium text-slate-200">{style.roles.join(" · ")}</p>
          <p className="mt-4 text-sm leading-7 text-slate-300">{style.mechanic}</p>
          {style.olderNotes && <details className="mt-2 text-xs leading-6 text-muted">
            <summary className="cursor-pointer underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-teal">Older playstyle notes</summary>
            <p className="mt-2">Based on July 2026 information; later changes may apply.</p>
          </details>}
          {style.returnWindow && <div className="mt-4 rounded-xl border border-white/10 bg-background/50 p-3 text-xs leading-6">
            <p className="font-semibold text-slate-200">Return history · Update {style.returnWindow.update}</p>
            <p className="text-muted">{style.returnWindow.window}</p>
            <Link href="/style-return-dates" className="text-accent-teal underline underline-offset-4">Return details</Link>
          </div>}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
            {style.href && <Link href={style.href} aria-label={style.slug === "roketto" ? "Read Roketto update notes" : `View ${style.name} guide`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-teal hover:text-white">{style.slug === "roketto" ? "Update notes" : "View guide"}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
            <button type="button" onClick={() => toggleStyle(style.slug)} aria-label={chosen ? `Remove ${style.name} from comparison` : `Add ${style.name} to comparison`} aria-pressed={chosen} disabled={full} className={`${buttonClass} ${chosen ? "border-accent-teal bg-accent-teal/10 text-accent-teal" : "border-white/20 text-white hover:border-accent-teal disabled:cursor-not-allowed disabled:opacity-40"}`}>
              {chosen ? <span className="flex items-center gap-2"><Check className="h-4 w-4" aria-hidden="true" />Selected</span> : "Add to compare"}
            </button>
          </div>
        </article>;
      })}
    </div> : <div className="rounded-3xl border border-border bg-surface/80 p-8 text-center">
      <p className="text-xl font-semibold text-white">No styles match your filters.</p>
      <p className="mt-3 text-sm text-muted">Try another name or clear the role and rarity filters.</p>
      <button type="button" onClick={resetFilters} className={`${buttonClass} mt-5 border-accent-teal text-accent-teal`}>Reset filters</button>
    </div>}

    {selected.length > 0 && <aside aria-label="Styles selected for comparison" className="sticky bottom-3 z-30 mt-6 rounded-2xl border border-accent-teal/50 bg-background p-4 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <p role="status" className="text-sm font-semibold text-white">{selected.length === 2 ? "Ready to compare" : "Choose one more style"}</p>
          <div className="mt-2 flex flex-wrap gap-2">{pair.map(style => <button type="button" key={style.slug} onClick={() => toggleStyle(style.slug)} aria-label={`Remove selected ${style.name}`} className="flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-3 text-sm text-slate-200 hover:border-accent-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-teal">{style.name}<X className="h-4 w-4 shrink-0" aria-hidden="true" /></button>)}</div>
        </div>
        {pair.length === 2 ? <Link href={`/tools/style-compare?a=${encodeURIComponent(pair[0].slug)}&b=${encodeURIComponent(pair[1].slug)}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent-teal px-5 py-3 text-sm font-bold text-background hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Compare styles<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link> : <p className="text-xs text-muted">Your selection stays when you change filters.</p>}
      </div>
    </aside>}
  </section>;
}
