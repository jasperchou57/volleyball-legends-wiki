"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRerollAdvice, type SlotStatus, type ChaseTarget } from "@/lib/volleyball/reroll-advice";
import { getStyleRollStatus, rerollStyles, type StyleRollStatus } from "@/lib/volleyball/style-roll-status";
import { getSecretRatePeriod, usesSecretEventRates } from "@/lib/volleyball/secret-event";
import { SecretRateSelector, useSecretRates } from "./SecretRateSelector";
import { MAX_SPIN_BUDGET, spinBudgetHref } from "@/lib/volleyball/spin-budget-params";

type SavedPlan = {
  id: string;
  keep: boolean;
  slots: SlotStatus;
  available: SlotStatus;
  spins: number;
  target: ChaseTarget;
  event: boolean;
  styleSlug?: string;
  ratePeriod?: string;
};

type PoolCheck = { answer: SlotStatus; status?: StyleRollStatus["kind"] };

const storageKey = "vl-reroll-plans-v2";
const choices = ["unsure", "yes", "no"] as const;
const rarities = ["Secret", "Limited Secret", "Ultra"] as const;
const choiceLabel = { unsure: "Not sure yet", yes: "Yes", no: "No" };
const selectClass = "mt-2 w-full rounded-xl border border-white/15 bg-background px-3 py-3 text-white";
const savedDateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  month: "short",
  day: "numeric",
  year: "numeric",
});

function getPlanSavedDate(id: string) {
  // The v2 storage key has used the save time in milliseconds as the ID.
  return /^\d{13}$/.test(id) ? new Date(Number(id)) : null;
}

function validPlan(value: unknown): value is SavedPlan {
  if (!value || typeof value !== "object") return false;
  const plan = value as SavedPlan;
  return typeof plan.id === "string" &&
    typeof plan.keep === "boolean" &&
    choices.includes(plan.slots) &&
    choices.includes(plan.available) &&
    Number.isInteger(plan.spins) && plan.spins >= 0 &&
    rarities.includes(plan.target) &&
    typeof plan.event === "boolean" &&
    (plan.ratePeriod === undefined || typeof plan.ratePeriod === "string") &&
    (plan.styleSlug === undefined || rerollStyles.some(style => style.slug === plan.styleSlug));
}

export function RerollAdvisor() {
  const [keep, setKeep] = useState(true);
  const [slots, setSlots] = useState<SlotStatus>("unsure");
  const [poolCheck, setPoolCheck] = useState<PoolCheck>({ answer: "unsure" });
  const [spins, setSpins] = useState(80);
  const [rarity, setRarity] = useState<ChaseTarget>("Limited Secret");
  const [styleSlug, setStyleSlug] = useState("");
  const [saved, setSaved] = useState<SavedPlan[]>([]);
  const [saveMessage, setSaveMessage] = useState("");
  const rates = useSecretRates();
  const announcedEventRates = rates.now === null ? null : usesSecretEventRates("auto", rates.now);

  const style = rerollStyles.find(entry => entry.slug === styleSlug);
  const rollStatus = style ? getStyleRollStatus(style.slug, rates.now) : undefined;
  const outOfRotation = rollStatus?.kind === "out-of-rotation";
  const poolAnswer = poolCheck.status === rollStatus?.kind ? poolCheck.answer : "unsure";
  const available = outOfRotation ? "no" : poolAnswer;
  const target = style ? "Secret" : rarity;
  const advice = getRerollAdvice(
    keep, slots, available, spins, target,
    style ? { name: style.name, rollStatus: rollStatus?.kind } : undefined,
  );
  const adviceHref = advice.href === "/tools/spin-budget"
    ? spinBudgetHref(spins, rates.mode, style?.slug)
    : advice.href;

  useEffect(() => {
    const targetSlug = new URLSearchParams(window.location.search).get("target");
    if (targetSlug && rerollStyles.some(entry => entry.slug === targetSlug)) setStyleSlug(targetSlug);

    try {
      const raw: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      if (Array.isArray(raw)) setSaved(raw.filter(validPlan).slice(0, 4));
    } catch {}
  }, []);

  function changeStyle(slug: string) {
    setStyleSlug(slug);
    setPoolCheck({ answer: "unsure" });
    setSaveMessage("");
  }

  function savePlan() {
    const plan: SavedPlan = {
      id: String(Date.now()),
      keep, slots, available, spins, target,
      event: !outOfRotation && target !== "Ultra" && rates.eventActive,
      styleSlug: style?.slug,
      ratePeriod: rates.now === null ? undefined : getSecretRatePeriod(rates.now),
    };
    const next = [plan, ...saved].slice(0, 4);
    setSaved(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setSaveMessage("Saved on this device.");
    } catch {
      setSaveMessage("Your plan is shown below, but could not be saved. It will be lost when you leave this page.");
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-surface/80 p-6">
      <h2 className="text-3xl font-heading font-bold text-white">Before you reroll</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        Check your target and the slot you plan to roll in.
      </p>

      <div className="mt-6 grid items-start gap-5 md:grid-cols-2">
        <label className="text-sm text-white">
          Target style
          <select value={styleSlug} onChange={e => changeStyle(e.target.value)} className={selectClass}>
            <option value="">Choose by rarity</option>
            {rerollStyles.map(entry => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}
          </select>
        </label>
        {style ? (
          <div className="rounded-xl border border-white/10 bg-background/65 px-4 py-3 text-sm leading-6 text-slate-200" aria-live="polite">
            {rollStatus?.text ?? "Check the in-game Style pool."}
          </div>
        ) : (
          <label className="text-sm text-white">
            Target rarity
            <select value={rarity} onChange={e => {
              setRarity(e.target.value as ChaseTarget);
              setPoolCheck({ answer: "unsure" });
            }} className={selectClass}>
              {rarities.map(entry => <option key={entry}>{entry}</option>)}
            </select>
          </label>
        )}
        <label className="text-sm text-white">
          Do you want to keep your current style?
          <select value={keep ? "yes" : "no"} onChange={e => setKeep(e.target.value === "yes")} className={selectClass}>
            <option value="yes">Yes — keep it</option>
            <option value="no">No — I am willing to replace it</option>
          </select>
        </label>
        {keep && (
          <label className="text-sm text-white">
            Do you have a separate slot ready for rolling?
            <select value={slots} onChange={e => setSlots(e.target.value as SlotStatus)} className={selectClass}>
              {choices.map(choice => <option key={choice} value={choice}>{choiceLabel[choice]}</option>)}
            </select>
          </label>
        )}
        {!outOfRotation && (
          <label className="text-sm text-white">
            Is your target in the current in-game Style pool?
            <select value={available} onChange={e => {
              setPoolCheck({ answer: e.target.value as SlotStatus, status: rollStatus?.kind });
            }} className={selectClass}>
              {choices.map(choice => <option key={choice} value={choice}>{choiceLabel[choice]}</option>)}
            </select>
          </label>
        )}
        <label className="text-sm text-white">
          Your Lucky Spins
          <input type="number" min={0} max={MAX_SPIN_BUDGET} step={1} value={spins}
            onChange={e => setSpins(Math.min(MAX_SPIN_BUDGET, Math.max(0, Math.floor(Number(e.target.value) || 0))))}
            className={selectClass}
          />
        </label>
      </div>

      {!outOfRotation && (
        <div className="mt-6">
          {target === "Ultra" ? (
            <p className="rounded-2xl border border-white/10 bg-background/65 p-4 text-sm leading-6 text-slate-200">
              Check your Ultra odds in-game. Update 97’s luck boost applies to Secret rolls.
            </p>
          ) : (
            <SecretRateSelector {...rates} />
          )}
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-accent-teal/25 bg-accent-teal/5 p-5" aria-live="polite">
        <h3 className="text-xl font-bold text-white">{advice.headline}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{advice.body}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link href={adviceHref} className="font-semibold text-accent-teal underline">{advice.action}</Link>
          <button type="button" disabled={rates.now === null} onClick={savePlan}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white disabled:opacity-50">
            Save this plan
          </button>
        </div>
        <p role="status" className="mt-2 text-xs text-muted">{saveMessage}</p>
      </div>

      <section className="mt-6">
        <h3 className="font-semibold text-white">Saved plans</h3>
        <p className="mt-2 text-xs leading-6 text-muted">Check the current pool and rates in-game before using a saved plan.</p>
        <div className="mt-3 space-y-3">
          {saved.length ? saved.map(plan => {
            const styleName = rerollStyles.find(entry => entry.slug === plan.styleSlug)?.name;
            const savedDate = getPlanSavedDate(plan.id);
            const latestStatus = plan.styleSlug ? getStyleRollStatus(plan.styleSlug, rates.now) : undefined;
            const showRateLabel = !styleName || plan.available !== "no";
            const ratesDiffer = showRateLabel && plan.target !== "Ultra" &&
              announcedEventRates !== null && plan.event !== announcedEventRates;
            const savedPeriod = plan.ratePeriod ?? (savedDate ? getSecretRatePeriod(savedDate.getTime()) : undefined);
            const periodChanged = showRateLabel && plan.target !== "Ultra" && savedPeriod !== undefined &&
              rates.now !== null && savedPeriod !== getSecretRatePeriod(rates.now);
            const rateLabel = plan.target === "Ultra" ? "Check Ultra odds in-game" : plan.event ? "Plan uses event rates" : "Plan uses normal rates";
            return (
              <div key={plan.id} className="rounded-2xl border border-border bg-background/60 p-4 text-sm leading-6 text-muted">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-semibold text-white">Target: {styleName ?? plan.target}</p>
                  <p className="text-xs">
                    {savedDate ? (
                      <>Saved <time dateTime={savedDate.toISOString()}>{savedDateFormat.format(savedDate)}</time> ET</>
                    ) : "Save date unavailable"}
                  </p>
                </div>
                <p>{plan.keep ? "Keep current style" : "May replace current style"} · {plan.spins} Lucky Spins</p>
                <p>
                  Pool check when saved: {choiceLabel[plan.available]}
                  {plan.keep && <> · Separate slot: {choiceLabel[plan.slots]}</>}
                </p>
                {showRateLabel && <p>{rateLabel}</p>}
                {latestStatus && latestStatus.kind !== "return-window" && (
                  <p className="mt-2 text-slate-200">{latestStatus.text}</p>
                )}
                {ratesDiffer && (
                  <p className="mt-2 text-accent-gold">Plan rates differ from the announced schedule. Check in-game.</p>
                )}
                {!ratesDiffer && periodChanged && (
                  <p className="mt-2 text-accent-gold">This plan was saved in an earlier event period. Recheck rates and pity in-game.</p>
                )}
              </div>
            );
          }) : <p className="text-sm text-muted">No saved plans yet.</p>}
        </div>
      </section>
    </div>
  );
}
