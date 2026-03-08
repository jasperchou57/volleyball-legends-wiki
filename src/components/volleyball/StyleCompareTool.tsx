"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { featuredStyles } from "@/data/volleyball";

const scoreLabels = [
  ["Offense", "offense"],
  ["Control", "control"],
  ["Defense", "defense"],
  ["Mobility", "mobility"],
  ["Difficulty", "difficulty"],
] as const;

export function StyleCompareTool() {
  const [leftSlug, setLeftSlug] = useState(featuredStyles[0]?.slug ?? "");
  const [rightSlug, setRightSlug] = useState(featuredStyles[1]?.slug ?? "");
  const [savedComparisons, setSavedComparisons] = useState<string[]>([]);

  const [left, right] = useMemo(() => {
    return [
      featuredStyles.find((style) => style.slug === leftSlug),
      featuredStyles.find((style) => style.slug === rightSlug),
    ];
  }, [leftSlug, rightSlug]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("vl-style-comparisons");
      if (!raw) return;
      const parsed = JSON.parse(raw) as string[];
      setSavedComparisons(parsed.slice(0, 4));
    } catch {}
  }, []);

  if (!left || !right) {
    return null;
  }

  function saveComparison() {
    if (!left || !right) {
      return;
    }

    const label = `${left.name} vs ${right.name}`;
    setSavedComparisons((current) => {
      const updated = [label, ...current.filter((entry) => entry !== label)].slice(0, 4);
      window.localStorage.setItem("vl-style-comparisons", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <div className="rounded-3xl border border-border bg-surface/80 p-6 shadow-[0_24px_80px_rgba(8,21,33,0.35)]">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            Style A
          </span>
          <select
            value={leftSlug}
            onChange={(event) => setLeftSlug(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none transition focus:border-accent-orange"
          >
            {featuredStyles.map((style) => (
              <option key={style.slug} value={style.slug}>
                {style.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            Style B
          </span>
          <select
            value={rightSlug}
            onChange={(event) => setRightSlug(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none transition focus:border-accent-teal"
          >
            {featuredStyles.map((style) => (
              <option key={style.slug} value={style.slug}>
                {style.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
        {[left, right].map((style, index) => (
          <div key={style.slug} className="rounded-2xl border border-white/10 bg-background/70 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  {index === 0 ? "Left pick" : "Right pick"}
                </p>
                <h3 className="mt-2 text-2xl font-heading font-bold text-white">{style.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  {style.rarity} {style.role} · Community Tier {style.communityTier}
                </p>
              </div>
              <Link
                href={`/styles/${style.slug}`}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white transition hover:border-white/30"
              >
                Open page
              </Link>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{style.summary}</p>

            <div className="mt-5 space-y-4">
              {scoreLabels.map(([label, key]) => (
                <div key={key}>
                  <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
                    <span>{label}</span>
                    <span className="text-white">{style.scores[key]}/10</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div
                      className={`h-2 rounded-full ${index === 0 ? "bg-accent-orange" : "bg-accent-teal"}`}
                      style={{ width: `${style.scores[key] * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="hidden items-center justify-center lg:flex">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Compare
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-white/10 bg-background/65 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Decision loop</p>
            <button
              type="button"
              onClick={saveComparison}
              className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-4 py-2 text-sm font-semibold text-white"
            >
              Save comparison
            </button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Link href={`/styles/${left.slug}`} className="rounded-2xl border border-white/10 bg-surface/60 p-4 transition hover:border-white/20">
              <p className="text-lg font-heading font-bold text-white">Open {left.name}</p>
              <p className="mt-2 text-sm leading-6 text-muted">Review the full style page before you commit to replacing it.</p>
            </Link>
            <Link href={`/styles/${right.slug}`} className="rounded-2xl border border-white/10 bg-surface/60 p-4 transition hover:border-white/20">
              <p className="text-lg font-heading font-bold text-white">Open {right.name}</p>
              <p className="mt-2 text-sm leading-6 text-muted">Check the detail page for best abilities, watchouts, and similar styles.</p>
            </Link>
            <Link href="/tools/reroll-advisor" className="rounded-2xl border border-white/10 bg-surface/60 p-4 transition hover:border-white/20">
              <p className="text-lg font-heading font-bold text-white">Run reroll advice</p>
              <p className="mt-2 text-sm leading-6 text-muted">Use your comparison result to decide whether this upgrade is worth more spins.</p>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-background/65 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Recent saved comparisons</p>
          <div className="mt-4 space-y-3">
            {savedComparisons.length > 0 ? (
              savedComparisons.map((entry) => (
                <div key={entry} className="rounded-2xl border border-white/10 bg-surface/60 p-4 text-sm font-semibold text-white">
                  {entry}
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-surface/40 p-4 text-sm leading-6 text-muted">
                Save a few comparisons here to build a lightweight memory of which upgrades are real and which ones only look exciting in tier lists.
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-muted">
        This comparison uses site-maintained role scores and community notes. It is meant to help players decide where to click next, not to replace official patch notes or in-game testing.
      </p>
    </div>
  );
}
