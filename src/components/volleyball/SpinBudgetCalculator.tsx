"use client";

import { useMemo, useState } from "react";
import { pageFreshness } from "@/data/volleyball";

type Target = "Secret" | "Evo";

const baseConfig: Record<Target, { rate: number; pity: number; eventRate: number; eventPity: number }> = {
  Secret: { rate: 0.005, pity: 200, eventRate: 0.01, eventPity: 100 },
  Evo: { rate: 0.0025, pity: 400, eventRate: 0.005, eventPity: 200 },
};

function cumulative(spins: number, rate: number, pity: number): number {
  if (spins >= pity) return 1;
  return 1 - Math.pow(1 - rate, spins);
}

function spinsFor(prob: number, rate: number, pity: number): number {
  const raw = Math.log(1 - prob) / Math.log(1 - rate);
  return Math.min(Math.ceil(raw), pity);
}

export function SpinBudgetCalculator() {
  const [target, setTarget] = useState<Target>("Secret");
  const [stack, setStack] = useState<number>(50);
  const [eventActive, setEventActive] = useState<boolean>(false);

  const { rate, pity } = useMemo(() => {
    const cfg = baseConfig[target];
    return eventActive
      ? { rate: cfg.eventRate, pity: cfg.eventPity }
      : { rate: cfg.rate, pity: cfg.pity };
  }, [target, eventActive]);

  const chance = useMemo(() => cumulative(stack, rate, pity), [stack, rate, pity]);
  const spins50 = useMemo(() => spinsFor(0.5, rate, pity), [rate, pity]);
  const spins95 = useMemo(() => spinsFor(0.95, rate, pity), [rate, pity]);

  const verdict = useMemo(() => {
    if (chance >= 0.95) return { tone: "good" as const, line: "If the current community model is accurate, this stack gives you a very high modeled chance." };
    if (chance >= 0.5) return { tone: "fine" as const, line: "If the current community model is accurate, you are above the modeled median but not guaranteed." };
    if (chance >= 0.2) return { tone: "risky" as const, line: "The current model puts this in coin-flip territory. Build a larger stack before spending if the target matters." };
    return { tone: "bad" as const, line: "The current model puts this stack at a low chance. Recheck live rates before choosing to save or wait for an event." };
  }, [chance]);

  const toneClass: Record<string, string> = {
    good: "border-accent-teal/30 bg-accent-teal/10 text-accent-teal",
    fine: "border-white/15 bg-background/65 text-slate-100",
    risky: "border-accent-gold/25 bg-accent-gold/10 text-accent-gold",
    bad: "border-accent-orange/30 bg-accent-orange/10 text-accent-orange",
  };

  return (
    <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
      <p className="mb-6 rounded-2xl border border-accent-gold/20 bg-accent-gold/10 px-4 py-3 text-xs leading-5 text-slate-200">Community probability model · last reviewed {pageFreshness.pityLastUpdated}. Rates and pity thresholds are site-maintained assumptions; verify them after an update.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Target rarity</label>
            <div className="mt-2 flex gap-2">
              {(Object.keys(baseConfig) as Target[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTarget(t)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    target === t
                      ? "border-accent-teal/40 bg-accent-teal/15 text-accent-teal"
                      : "border-white/10 bg-background/65 text-muted hover:border-white/20"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="spin-stack" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Your Lucky Spin stack
            </label>
            <input
              id="spin-stack"
              type="number"
              min={0}
              max={1000}
              value={stack}
              onChange={(e) => setStack(Math.max(0, Number(e.target.value) || 0))}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-lg font-semibold text-white outline-none focus:border-accent-teal/50"
            />
            <input
              type="range"
              min={0}
              max={400}
              value={stack}
              onChange={(e) => setStack(Number(e.target.value))}
              className="mt-3 w-full"
            />
          </div>

          <div>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-background/65 px-4 py-3 text-sm text-slate-100">
              <input
                type="checkbox"
                checked={eventActive}
                onChange={(e) => setEventActive(e.target.checked)}
                className="h-4 w-4"
              />
              2x Luck event is live
              <span className="ml-auto text-xs text-muted">pity halved + rates doubled</span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`rounded-2xl border p-5 ${toneClass[verdict.tone]}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">Chance of any {target} by spin {stack}</p>
            <p className="mt-2 text-4xl font-heading font-black text-white">{(chance * 100).toFixed(1)}%</p>
            <p className="mt-2 text-sm leading-6">{verdict.line}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-background/65 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">50% target</p>
              <p className="mt-1 text-2xl font-heading font-bold text-white">{spins50}</p>
              <p className="text-xs text-muted">spins</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-background/65 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">95% target</p>
              <p className="mt-1 text-2xl font-heading font-bold text-white">{spins95}</p>
              <p className="text-xs text-muted">spins</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-background/65 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Hard pity</p>
              <p className="mt-1 text-2xl font-heading font-bold text-white">{pity}</p>
              <p className="text-xs text-muted">spins</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-background/65 p-4 text-xs leading-6 text-muted">
            Current rate: <strong className="text-white">{(rate * 100).toFixed(2)}%</strong> per spin. Pity ceiling: <strong className="text-white">{pity}</strong> spins.
            {eventActive ? " 2x Luck assumptions are applied." : " Baseline assumptions (no event)."} This calculator models the entered assumptions; it does not prove live game odds.
          </div>
        </div>
      </div>
    </div>
  );
}
