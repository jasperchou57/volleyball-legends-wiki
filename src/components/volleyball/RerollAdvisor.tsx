"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CurrentTier = "Legendary or lower" | "Godly" | "Secret" | "Ultra";
type ChaseTarget = "Any upgrade" | "Permanent secret" | "Limited secret" | "Ultra";
type SavedPlan = {
  id: string;
  currentTier: CurrentTier;
  luckySpins: number;
  chasing: ChaseTarget;
  eventActive: boolean;
  headline: string;
};

function getAdvice(currentTier: CurrentTier, luckySpins: number, chasing: ChaseTarget, eventActive: boolean) {
  const boostedThreshold = eventActive ? 60 : 120;
  const ultraThreshold = eventActive ? 140 : 260;

  if (currentTier === "Ultra") {
    return {
      headline: "Stop and bank your spins",
      tone: "text-accent-teal",
      body: "Ultra outcomes are rare enough that you usually need a limited banner or a very specific target before rerolling again makes sense.",
    };
  }

  if (currentTier === "Secret" && chasing !== "Ultra") {
    return {
      headline: "Usually hold",
      tone: "text-accent-teal",
      body: "If you already have a secret style, most players only reroll during a featured return, a 2x luck window, or when they are chasing one exact limited style.",
    };
  }

  if (chasing === "Ultra" && luckySpins >= ultraThreshold) {
    return {
      headline: "Reasonable push window",
      tone: "text-accent-orange",
      body: "You have enough Lucky Spins to make an Ultra chase realistic by community standards, especially if a 2x event is active.",
    };
  }

  if (currentTier === "Godly" && luckySpins < boostedThreshold && chasing !== "Any upgrade") {
    return {
      headline: "Hold for a better event",
      tone: "text-yellow-300",
      body: "Community-tracked pity systems reward patience. Godly is a solid stopping point unless you are entering a banner with boosted luck or a must-have style.",
    };
  }

  if (luckySpins >= boostedThreshold) {
    return {
      headline: "Worth testing now",
      tone: "text-accent-orange",
      body: "Your spin stack is big enough to justify a push for a better style, especially if you are still on Legendary-or-lower and the current update added a must-play style.",
    };
  }

  return {
    headline: "Low-conviction reroll spot",
    tone: "text-white",
    body: "You can still spin, but the stronger play is usually to stack more Lucky Spins, watch for codes, and wait for a Saturday event where pity and secret odds feel better.",
  };
}

export function RerollAdvisor() {
  const [currentTier, setCurrentTier] = useState<CurrentTier>("Godly");
  const [luckySpins, setLuckySpins] = useState(80);
  const [chasing, setChasing] = useState<ChaseTarget>("Limited secret");
  const [eventActive, setEventActive] = useState(true);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);

  const advice = useMemo(
    () => getAdvice(currentTier, luckySpins, chasing, eventActive),
    [currentTier, luckySpins, chasing, eventActive]
  );
  const nextActions = useMemo(() => {
    if (advice.headline === "Stop and bank your spins") {
      return [
        { href: "/codes", title: "Wait for more codes", description: "Build a safer stack before you take another high-cost spin decision." },
        { href: "/updates", title: "Track the next banner", description: "Watch for a limited return or stronger Saturday event before rerolling again." },
        { href: "/tools/style-compare", title: "Compare what you already own", description: "Use compare to make sure your current style actually needs replacing." },
      ];
    }

    if (advice.headline === "Usually hold" || advice.headline === "Hold for a better event") {
      return [
        { href: "/updates", title: "Check current updates", description: "See if the live patch introduced a style important enough to break your hold plan." },
        { href: "/guides/pity-system", title: "Review pity timing", description: "Use the community pity guide to decide how much more discipline actually matters here." },
        { href: "/codes", title: "Collect more spins first", description: "Grab the current codes before you convert a decent position into a worse one." },
      ];
    }

    return [
      { href: "/codes", title: "Use today's codes first", description: "If you're going to push now, maximize the stack before you start spending." },
      { href: "/updates/update-65-season-14", title: "Review the live banner", description: "Double-check whether the current update really justifies a reroll window." },
      { href: "/tools/style-compare", title: "Compare before you commit", description: "Make sure the style you're chasing is meaningfully better than what you already have." },
    ];
  }, [advice.headline]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("vl-reroll-plans");
      if (!raw) return;
      const parsed = JSON.parse(raw) as SavedPlan[];
      setSavedPlans(parsed.slice(0, 4));
    } catch {}
  }, []);

  function savePlan() {
    const nextPlan: SavedPlan = {
      id: `${Date.now()}`,
      currentTier,
      luckySpins,
      chasing,
      eventActive,
      headline: advice.headline,
    };

    setSavedPlans((current) => {
      const updated = [nextPlan, ...current].slice(0, 4);
      window.localStorage.setItem("vl-reroll-plans", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <div className="rounded-3xl border border-border bg-surface/80 p-6 shadow-[0_24px_80px_rgba(8,21,33,0.35)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Tool Beta
          </p>
          <h3 className="mt-2 text-3xl font-heading font-bold text-white">
            Should I Reroll?
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Heuristic only. This tool is based on community-tracked odds and pity language, not officially published rates.
          </p>
        </div>
        <label className="flex items-center gap-3 rounded-full border border-white/10 bg-background/70 px-4 py-2 text-sm text-white">
          <input
            type="checkbox"
            checked={eventActive}
            onChange={(event) => setEventActive(event.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-transparent accent-[var(--accent-orange)]"
          />
          2x luck event active
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Current style tier
          </span>
          <select
            value={currentTier}
            onChange={(event) => setCurrentTier(event.target.value as CurrentTier)}
            className="w-full rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none transition focus:border-accent-orange"
          >
            {["Legendary or lower", "Godly", "Secret", "Ultra"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Lucky Spins
          </span>
          <input
            type="number"
            min={0}
            value={luckySpins}
            onChange={(event) => setLuckySpins(Number(event.target.value))}
            className="w-full rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none transition focus:border-accent-orange"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Chase target
          </span>
          <select
            value={chasing}
            onChange={(event) => setChasing(event.target.value as ChaseTarget)}
            className="w-full rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none transition focus:border-accent-orange"
          >
            {["Any upgrade", "Permanent secret", "Limited secret", "Ultra"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-accent-orange/20 bg-accent-orange/10 p-5">
        <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${advice.tone}`}>
          {advice.headline}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90">{advice.body}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={savePlan}
            className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-4 py-2 text-sm font-semibold text-white"
          >
            Save this plan
          </button>
          <Link
            href={nextActions[0].href}
            className="rounded-full border border-white/10 bg-background/65 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20"
          >
            {nextActions[0].title}
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-white/10 bg-background/65 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Recommended next step</p>
          <div className="mt-4 space-y-3">
            {nextActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="block rounded-2xl border border-white/10 bg-surface/60 p-4 transition hover:border-white/20"
              >
                <p className="text-lg font-heading font-bold text-white">{action.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-background/65 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Saved plans</p>
          <div className="mt-4 space-y-3">
            {savedPlans.length > 0 ? (
              savedPlans.map((plan) => (
                <div key={plan.id} className="rounded-2xl border border-white/10 bg-surface/60 p-4">
                  <p className="text-sm font-semibold text-white">{plan.headline}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {plan.currentTier} · {plan.luckySpins} Lucky Spins · {plan.chasing}
                    {plan.eventActive ? " · 2x active" : " · no event"}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-surface/40 p-4 text-sm leading-6 text-muted">
                Save a few reroll scenarios here so you can compare “spin now” versus “wait” without re-entering everything every visit.
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-muted">
        The decision logic here intentionally uses broad thresholds. It is meant to support spin discipline, not to present a fake official pity calculator.
      </p>
    </div>
  );
}
