"use client";

import { useState } from "react";
import { getSecretRatePeriod, SECRET_SPIN_RATES } from "@/lib/volleyball/secret-event";
import { SecretRateSelector, useSecretRates } from "./SecretRateSelector";
import { MAX_SPIN_BUDGET, type SpinBudgetPlan } from "@/lib/volleyball/spin-budget-params";
import { getStyleRollStatus } from "@/lib/volleyball/style-roll-status";

type Target = "Secret" | "Evo";
type PityEntry = { remaining: string; period: string };

const evoEstimate = { rate: 0.0025, pity: 400 };

function cumulative(spins: number, rate: number, spinsToPity: number) {
  return spins >= spinsToPity ? 1 : 1 - Math.pow(1 - rate, spins);
}

function spinsFor(probability: number, rate: number, spinsToPity: number) {
  const spins = Math.ceil(Math.log(1 - probability) / Math.log(1 - rate));
  return Math.min(spins, spinsToPity);
}

export function SpinBudgetCalculator({ initialPlan }: { initialPlan: SpinBudgetPlan }) {
  const [target, setTarget] = useState<Target>("Secret");
  const [budget, setBudget] = useState(initialPlan.spins);
  const [sliderMax, setSliderMax] = useState(Math.max(1000, initialPlan.spins));
  const [pityEntry, setPityEntry] = useState<PityEntry | null>(null);
  const rates = useSecretRates(initialPlan.mode);
  const { now, mode, eventActive } = rates;
  const isSecret = target === "Secret";
  const stylePool = isSecret && initialPlan.pool === "style";
  const plannedStyle = stylePool ? initialPlan.style : undefined;
  const rollStatus = plannedStyle ? getStyleRollStatus(plannedStyle.slug, now) : undefined;
  const period = now === null ? null : getSecretRatePeriod(now);
  const { rate, pity } = isSecret ? SECRET_SPIN_RATES[eventActive ? "event" : "baseline"] : evoEstimate;

  // Compare from zero and use the entered counter only within its current window.
  const currentPityPeriod = isSecret && mode === "auto" ? period : null;
  const remainingText = currentPityPeriod && pityEntry?.period === currentPityPeriod ? pityEntry.remaining : "";
  const remaining = remainingText === "" ? null : Number(remainingText);
  const invalidPity = remaining !== null && (!Number.isInteger(remaining) || remaining < 1 || remaining > pity);
  const counterNeedsCheck = currentPityPeriod !== null && !!pityEntry?.remaining && pityEntry.period !== currentPityPeriod;
  const spinsToPity = invalidPity ? pity : remaining ?? pity;
  const shortfall = Math.max(0, spinsToPity - budget);
  const chance = cumulative(budget, rate, spinsToPity);
  const pityBudget = shortfall === 0
    ? "Budget reaches pity"
    : `${shortfall} more ${shortfall === 1 ? "spin" : "spins"} to reach pity`;

  const chanceColor = chance >= 0.95
    ? "border-accent-teal/30 bg-accent-teal/10 text-accent-teal"
    : chance >= 0.5
      ? "border-white/15 bg-background/65 text-slate-100"
      : "border-accent-gold/25 bg-accent-gold/10 text-accent-gold";

  return (
    <div className="rounded-[2rem] border border-border bg-surface/80 p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          {stylePool && <div className="rounded-xl border border-accent-teal/25 bg-accent-teal/5 px-4 py-3 text-sm text-slate-200">
            <p>{plannedStyle ? <>Your target: <strong className="text-white">{plannedStyle.name}</strong> · Style pool</> : "Style pool"}</p>
            {rollStatus && <p className="mt-2 leading-6 text-muted">{rollStatus.text}</p>}
          </div>}
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Target rarity</legend>
            <div className="mt-2 flex gap-2">
              {(["Secret", "Evo"] as const).map(rarity => (
                <button
                  key={rarity}
                  type="button"
                  aria-pressed={target === rarity}
                  onClick={() => setTarget(rarity)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    target === rarity
                      ? "border-accent-teal/40 bg-accent-teal/15 text-accent-teal"
                      : "border-white/10 bg-background/65 text-muted hover:text-white"
                  }`}
                >
                  {rarity}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="spin-stack" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Your Lucky Spins
            </label>
            <input
              id="spin-stack"
              type="number"
              min={0}
              max={MAX_SPIN_BUDGET}
              step={1}
              value={budget}
              onChange={e => {
                const next = Math.min(MAX_SPIN_BUDGET, Math.max(0, Math.floor(e.target.valueAsNumber || 0)));
                setBudget(next);
                setSliderMax(Math.max(1000, next));
              }}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-lg font-semibold text-white outline-none focus:border-accent-teal/50"
            />
            <input
              aria-label="Lucky Spin budget"
              type="range"
              min={0}
              max={sliderMax}
              value={budget}
              onChange={e => setBudget(e.target.valueAsNumber)}
              className="mt-3 w-full"
            />
          </div>

          {isSecret && <SecretRateSelector {...rates} />}

          {currentPityPeriod && (
            <div>
              <label htmlFor="secret-pity-left" className="text-sm font-semibold text-white">
                Spins left until Secret pity <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="secret-pity-left"
                type="number"
                min={1}
                max={pity}
                step={1}
                inputMode="numeric"
                value={remainingText}
                onChange={e => setPityEntry({ remaining: e.target.value, period: currentPityPeriod })}
                aria-invalid={invalidPity || undefined}
                aria-describedby={invalidPity ? "secret-pity-help secret-pity-error" : "secret-pity-help"}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-lg font-semibold text-white outline-none focus:border-accent-teal/50 aria-[invalid=true]:border-accent-orange"
              />
              <p id="secret-pity-help" className="mt-2 text-xs leading-5 text-muted">
                If your in-game counter shows {pity - 30}/{pity}, enter 30. Blank estimates from zero pity.
              </p>
              {invalidPity && (
                <p id="secret-pity-error" className="mt-2 text-sm text-accent-orange">Enter a whole number from 1 to {pity}.</p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4" aria-live="polite">
          {isSecret && now === null ? (
            <p className="text-muted">Checking event schedule…</p>
          ) : invalidPity ? (
            <p className="rounded-2xl border border-accent-orange/25 bg-accent-orange/5 p-5 text-sm text-slate-200">
              Check the spins left until pity to see your estimate.
            </p>
          ) : (
            <>
              <div className={`rounded-2xl border p-5 ${chanceColor}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  {isSecret ? stylePool ? "Any Secret Style chance" : "Any Secret chance" : "Historical Evo estimate"}
                </p>
                {isSecret && <p className="mt-2 text-sm font-semibold">
                  {mode === "auto" ? "Automatic · Announced rates" : mode === "baseline" ? "Normal-rate comparison" : "Event-rate comparison"}
                </p>}
                <p className="mt-2 text-4xl font-heading font-black text-white">{(chance * 100).toFixed(1)}%</p>
                <p className="mt-2 text-sm leading-6">
                  At least one {stylePool ? "Secret Style" : target} from your pool in {budget} {budget === 1 ? "spin" : "spins"}.
                </p>
                {isSecret && <p className="mt-2 text-sm leading-6">
                  {plannedStyle
                    ? `Secret pity does not guarantee ${plannedStyle.name}.`
                    : "Secret pity guarantees the rarity, not a specific style or ability."}
                </p>}
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  {!isSecret ? "Estimated from zero pity"
                    : mode !== "auto" ? "Compared from zero pity"
                      : remaining === null ? "No pity entered; estimated from zero"
                        : "Using your entered pity counter"} · {pityBudget}
                </p>
                {counterNeedsCheck && (
                  <p className="mt-2 text-sm leading-6 text-accent-gold">The event window changed. Recheck your in-game counter.</p>
                )}
                {!isSecret && (
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Uses {rate * 100}% per spin. Check current Evo odds and pity in-game.
                  </p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center sm:gap-3">
                <div className="rounded-2xl border border-white/10 bg-background/65 p-2 sm:p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">≥50% chance</p>
                  <p className="mt-1 text-2xl font-heading font-bold text-white">{spinsFor(0.5, rate, spinsToPity)}</p>
                  <p className="text-xs text-muted">spins</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-background/65 p-2 sm:p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">≥95% chance</p>
                  <p className="mt-1 text-2xl font-heading font-bold text-white">{spinsFor(0.95, rate, spinsToPity)}</p>
                  <p className="text-xs text-muted">spins</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-background/65 p-2 sm:p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">{remaining === null ? "Pity limit" : "Until pity"}</p>
                  <p className="mt-1 text-2xl font-heading font-bold text-white">{spinsToPity}</p>
                  <p className="text-xs text-muted">spins</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
