"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { comparisonStyles, comparisonPair, comparisonHref, defaultComparison, readSavedComparisons, type ComparisonPair } from "@/data/style-comparison";
import { styleRatingLabel } from "@/data/style-reviews";

const storageKey = "vl-style-comparisons";
const scoreLabels = [["Offense", "offense"], ["Control", "control"], ["Defense", "defense"], ["Mobility", "mobility"], ["Difficulty", "difficulty"]] as const;
const controlClass = "rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-accent-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-teal";

export function StyleCompareTool() {
  const [pair, setPair] = useState<ComparisonPair>(defaultComparison);
  const [saved, setSaved] = useState<ComparisonPair[]>([]);
  const [message, setMessage] = useState("");
  const [shareFallback, setShareFallback] = useState("");

  useEffect(() => {
    function readUrl() {
      const params = new URLSearchParams(window.location.search);
      setPair(comparisonPair(params.get("a"), params.get("b")));
      setMessage(""); setShareFallback("");
    }
    readUrl();
    window.addEventListener("popstate", readUrl);
    try { setSaved(readSavedComparisons(JSON.parse(window.localStorage.getItem(storageKey) ?? "[]"))); } catch {}
    return () => window.removeEventListener("popstate", readUrl);
  }, []);

  const left = comparisonStyles.find(style => style.slug === pair.a)!;
  const right = comparisonStyles.find(style => style.slug === pair.b)!;
  const sharedRoles = left.bestRoles.filter(role => right.bestRoles.includes(role));

  function selectPair(next: ComparisonPair) {
    const valid = comparisonPair(next.a, next.b);
    setPair(valid); setMessage(""); setShareFallback("");
    window.history.replaceState(window.history.state, "", comparisonHref(valid));
  }
  function saveComparison() {
    const next = [pair, ...saved.filter(entry => entry.a !== pair.a || entry.b !== pair.b)].slice(0, 4);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      setSaved(next); setMessage("Saved in this browser. Select the pair below to compare again.");
    } catch { setMessage("Your browser could not save this comparison. Use Copy link to keep it."); }
  }
  async function copyLink() {
    const url = new URL(comparisonHref(pair), window.location.origin).href;
    try { await navigator.clipboard.writeText(url); setMessage("Comparison link copied."); setShareFallback(""); }
    catch { setShareFallback(url); setMessage("Select and copy the link below."); }
  }

  return <div className="rounded-3xl border border-border bg-surface/80 p-4 md:p-6">
    <div className="grid gap-4 md:grid-cols-2">
      {(["a", "b"] as const).map((side, index) => <label key={side} className="min-w-0 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Style {index === 0 ? "A" : "B"}</span>
        <select value={pair[side]} onChange={event => selectPair({ ...pair, [side]: event.target.value })} className="w-full rounded-2xl border border-white/15 bg-background p-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-teal">
          {comparisonStyles.map(style => <option key={style.slug} value={style.slug} disabled={style.slug === pair[side === "a" ? "b" : "a"]}>{style.name}</option>)}
        </select>
      </label>)}
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      <button type="button" onClick={() => selectPair({ a: pair.b, b: pair.a })} className={controlClass}>Swap styles</button>
      <button type="button" onClick={saveComparison} className={controlClass}>Save comparison</button>
      <button type="button" onClick={copyLink} className={controlClass}>Copy link</button>
    </div>
    <p role="status" className="mt-2 text-sm text-accent-teal">{message}</p>
    {shareFallback && <input aria-label="Comparison link" readOnly value={shareFallback} onFocus={event => event.target.select()} className="mt-2 w-full rounded-xl border border-white/20 bg-background p-3 text-sm text-white" />}

    <div className="mt-6 rounded-2xl border border-accent-teal/25 bg-accent-teal/5 p-4 text-sm leading-7 text-slate-200">
      {sharedRoles.length ? <>Shared roles: <strong className="text-white">{sharedRoles.join(" / ")}</strong>. Compare the setup and timing each style needs.</> : <><strong className="text-white">Different roles:</strong> {left.name} covers {left.bestRoles.join(" / ")}; {right.name} covers {right.bestRoles.join(" / ")}. Choose the role your team needs and compare the mechanics below.</>}
    </div>

    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {[left, right].map((style, index) => <section key={`${index}-${style.slug}`} aria-label={`${style.name} comparison`} className="min-w-0 rounded-2xl border border-white/10 bg-background/70 p-5">
        <p className={`text-xs font-semibold uppercase tracking-widest ${index === 0 ? "text-accent-orange" : "text-accent-teal"}`}>Style {index === 0 ? "A" : "B"}</p>
        <h3 className="mt-2 text-2xl font-heading font-bold text-white">{style.name}</h3>
        <p className="mt-2 text-sm text-muted">{style.rarity} · {style.tier ? styleRatingLabel(style.slug, style.tier) : "Not rated"}</p>
        <dl className="mt-5 space-y-5 text-sm leading-7">
          <div><dt className="font-semibold text-white">Role fit</dt><dd className="mt-1 text-slate-300">{style.bestRoles.join(" · ")}</dd></div>
          <div><dt className="font-semibold text-white">{style.olderNotes ? "Earlier playstyle notes" : "How it plays"}</dt><dd className="mt-1 text-slate-300">{style.mechanic}</dd></div>
          <div><dt className="font-semibold text-white">{style.constraint ? "Keep in mind" : "Before choosing"}</dt><dd className="mt-1 text-slate-300">{style.constraint ?? "Not rechecked for Update 95. Compare these notes with the current in-game description before spending spins."}</dd></div>
        </dl>
        {style.olderNotes && <p className="mt-4 text-xs leading-6 text-muted">Playstyle information: July 2026.</p>}
        <Link href={style.href} className="mt-5 inline-block text-sm font-semibold text-accent-teal underline underline-offset-4">{style.slug === "roketto" ? "Read the Update 95 fix" : `View ${style.name} guide`} →</Link>
      </section>)}
    </div>

    <details className="mt-6 rounded-2xl border border-white/10 bg-background/60 p-5">
      <summary className="cursor-pointer font-semibold text-white">Earlier community scores · July 2026</summary>
      <p className="mt-3 text-sm leading-7 text-muted">These older estimates are not measured in-game attributes and may not reflect recent changes. A higher Difficulty score means a steeper learning curve.</p>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {[left, right].map((style, index) => <div key={`${index}-${style.slug}`}><p className="mb-4 font-semibold text-white">{style.name}</p>{style.scores ? <div className="space-y-3">{scoreLabels.map(([label, key]) => <div key={key}>
          <div className="flex justify-between text-sm text-muted"><span>{label}</span><span>{style.scores![key]}/10</span></div>
          <div className="mt-1 h-1.5 rounded-full bg-white/5"><div className="h-1.5 rounded-full bg-slate-500" style={{ width: `${style.scores![key] * 10}%` }} /></div>
        </div>)}</div> : <p className="text-sm text-muted">No numeric scores available for {style.name}.</p>}</div>)}
      </div>
    </details>

    <div className="mt-6 rounded-2xl border border-white/10 p-5">
      <p className="font-semibold text-white">Saved comparisons</p>
      <p className="mt-2 text-sm text-muted">{saved.length ? "Select a saved pair to compare again. Saves stay in this browser." : "Save a pair to compare again later in this browser."}</p>
      <div className="mt-4 flex flex-wrap gap-2">{saved.map(entry => <button key={`${entry.a}-${entry.b}`} type="button" className={controlClass} onClick={() => selectPair(entry)}>{comparisonStyles.find(style => style.slug === entry.a)!.name} vs {comparisonStyles.find(style => style.slug === entry.b)!.name}</button>)}</div>
    </div>
    <p className="mt-5 text-xs leading-6 text-muted">These are unofficial ratings. Choose for your role and playstyle, not just the tier letter.</p>
    <div className="mt-4 flex flex-wrap gap-4 text-sm"><Link href="/tier-list/styles" className="text-accent-teal underline">Browse the style tier list</Link><Link href="/tools/spin-budget" className="text-accent-teal underline">Plan your spin budget</Link></div>
  </div>;
}
