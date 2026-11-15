"use client";

import { useState } from "react";
import { getSecretEventStatus, SECRET_SPIN_RATES } from "@/lib/volleyball/secret-event";
import { SecretRateSelector, useSecretRates } from "./SecretRateSelector";

type Target = "Secret" | "Evo";
type PityEntry = { remaining: string; phase: ReturnType<typeof getSecretEventStatus> };

const evoEstimate = { rate: 0.0025, pity: 400 };
const maxBudget = 1000;

function cumulative(spins: number, rate: number, spinsToPity: number) {
  return spins >= spinsToPity ? 1 : 1 - Math.pow(1 - rate, spins);
}

function spinsFor(probability: number, rate: number, spinsToPity: number) {
  const spins = Math.ceil(Math.log(1 - probability) / Math.log(1 - rate));
  return Math.min(spins, spinsToPity);
}

export function SpinBudgetCalculator() {
  const [target, setTarget] = useState<Target>("Secret");
  const [budget, setBudget] = useState(50);
  const [pityEntry, setPityEntry] = useState<PityEntry | null>(null);
  const rates = useSecretRates();
  const { now, mode, eventActive } = rates;
  const isSecret = target === "Secret";
  const phase = now === null ? null : getSecretEventStatus(now);
  const { rate, pity } = isSecret ? SECRET_SPIN_RATES[eventActive ? "event" : "baseline"] : evoEstimate;

  // Compare from zero and use the entered counter only within its current event phase.
  const currentPityPhase = isSecret && mode === "auto" ? phase : null;
  const remainingText = currentPityPhase && pityEntry?.phase === currentPityPhase ? pityEntry.remaining : "";
  const remaining = remainingText === "" ? null : Number(remainingText);
  const invalidPity = remaining !== null && (!Number.isInteger(remaining) || remaining < 1 || remaining > pity);
  const counterNeedsCheck = currentPityPhase !== null && !!pityEntry?.remaining && pityEntry.phase !== currentPityPhase;
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
              max={maxBudget}
              step={1}
              value={budget}
              onChange={e => setBudget(Math.min(maxBudget, Math.max(0, Math.floor(e.target.valueAsNumber || 0))))}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-lg font-semibold text-white outline-none focus:border-accent-teal/50"
            />
            <input
              aria-label="Lucky Spin budget"
              type="range"
              min={0}
              max={maxBudget}
              value={budget}
              onChange={e => setBudget(e.target.valueAsNumber)}
              className="mt-3 w-full"
            />
          </div>

          {isSecret && <SecretRateSelector {...rates} />}

          {currentPityPhase && (
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
                onChange={e => setPityEntry({ remaining: e.target.value, phase: currentPityPhase })}
                aria-invalid={invalidPity || undefined}
                aria-describedby={invalidPity ? "secret-pity-help secret-pity-error" : "secret-pity-help"}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-lg font-semibold text-white outline-none focus:border-accent-teal/50 aria-[invalid=true]:border-accent-orange"
              />
              <p id="secret-pity-help" className="mt-2 text-xs leading-5 text-muted">
                Use your in-game counter. If it shows {pity - 30} of {pity}, enter 30. Leave blank to start from zero.
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
                  {isSecret ? "Secret chance estimate" : "Historical Evo estimate"}
                </p>
                <p className="mt-2 text-4xl font-heading font-black text-white">{(chance * 100).toFixed(1)}%</p>
                <p className="mt-2 text-sm leading-6">
                  At least one {target} from your pool in {budget} {budget === 1 ? "spin" : "spins"}.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  {remaining === null ? "Starting from zero pity" : "Using your pity counter"} · {pityBudget}
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
