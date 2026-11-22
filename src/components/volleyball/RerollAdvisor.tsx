"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getRerollAdvice, type SlotStatus, type ChaseTarget } from "@/lib/volleyball/reroll-advice";
import { getStyleRollStatus, rerollStyles, type StyleRollStatus } from "@/lib/volleyball/style-roll-status";
import { getSecretRatePeriod, usesSecretEventRates } from "@/lib/volleyball/secret-event";
import { SecretRateSelector, useSecretRates } from "./SecretRateSelector";
import { MAX_SPIN_BUDGET, spinBudgetHref } from "@/lib/volleyball/spin-budget-params";
import { readSavedRerollPlans, resumeRerollPlan, REROLL_PLANS_STORAGE_KEY, REROLL_SLOT_CHOICES, REROLL_TARGET_RARITIES, type SavedRerollPlan } from "@/lib/volleyball/reroll-plans";

type PoolCheck = { answer: SlotStatus; status?: StyleRollStatus["kind"] };

const storageKey = REROLL_PLANS_STORAGE_KEY;
const choices = REROLL_SLOT_CHOICES;
const rarities = REROLL_TARGET_RARITIES;
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

export function RerollAdvisor() {
  const [keep, setKeep] = useState(true);
  const [slots, setSlots] = useState<SlotStatus>("unsure");
  const [poolCheck, setPoolCheck] = useState<PoolCheck>({ answer: "unsure" });
  const [spins, setSpins] = useState(80);
  const [rarity, setRarity] = useState<ChaseTarget>("Limited Secret");
  const [styleSlug, setStyleSlug] = useState("");
  const [saved, setSaved] = useState<SavedRerollPlan[]>([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [resumeMessage, setResumeMessage] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [deletedPlans, setDeletedPlans] = useState<SavedRerollPlan[] | null>(null);
  const targetSelectRef = useRef<HTMLSelectElement>(null);
  const savedHeadingRef = useRef<HTMLHeadingElement>(null);
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
      setSaved(readSavedRerollPlans(raw));
    } catch {}

    function syncPlans(event: StorageEvent) {
      if (event.storageArea !== localStorage || (event.key !== storageKey && event.key !== null)) return;
      try { setSaved(readSavedRerollPlans(JSON.parse(event.newValue ?? "[]"))); } catch {}
      setDeletedPlans(null);
      setSavedMessage("");
    }
    window.addEventListener("storage", syncPlans);
    return () => window.removeEventListener("storage", syncPlans);
  }, []);

  function updateTargetUrl(slug: string) {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("target", slug);
    else url.searchParams.delete("target");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }

  function changeStyle(slug: string) {
    setStyleSlug(slug);
    setPoolCheck({ answer: "unsure" });
    setSaveMessage("");
    setResumeMessage("");
    updateTargetUrl(slug);
  }

  function continuePlan(plan: SavedRerollPlan) {
    const next = resumeRerollPlan(plan);
    setStyleSlug(next.styleSlug);
    setRarity(next.rarity);
    setKeep(next.keep);
    setSpins(next.spins);
    setSlots(next.slots);
    setPoolCheck({ answer: next.available });
    rates.setMode(next.mode);
    setSaveMessage("");
    setResumeMessage("Plan loaded. Recheck the Style pool, slots, and current rates.");
    updateTargetUrl(next.styleSlug);
    targetSelectRef.current?.focus();
  }

  function deletePlan(id: string) {
    const next = saved.filter(plan => plan.id !== id);
    setDeletedPlans(saved);
    setSaved(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setSavedMessage("Plan deleted.");
    } catch {
      setSavedMessage("Could not save the deletion. The plan may return after refresh.");
    }
    savedHeadingRef.current?.focus();
  }

  function undoDelete() {
    if (!deletedPlans) return;
    setSaved(deletedPlans);
    try {
      localStorage.setItem(storageKey, JSON.stringify(deletedPlans));
      setSavedMessage("Plan restored to saved list.");
    } catch {
      setSavedMessage("Restored on this page only. It may disappear after refresh.");
    }
    setDeletedPlans(null);
  }

  function savePlan() {
    const plan: SavedRerollPlan = {
      id: String(Date.now()),
      keep, slots, available, spins, target,
      event: !outOfRotation && target !== "Ultra" && rates.eventActive,
      styleSlug: style?.slug,
      ratePeriod: rates.now === null ? undefined : getSecretRatePeriod(rates.now),
    };
    const next = readSavedRerollPlans([plan, ...saved]);
    setSaved(next);
    setDeletedPlans(null);
    setSavedMessage("");
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setSaveMessage("Saved in this browser.");
    } catch {
      setSaveMessage("Not saved in this browser. This plan may disappear after refresh.");
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-surface/80 p-6">
      <h2 className="text-3xl font-heading font-bold text-white">Before you reroll</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        Check your target and the slot you plan to roll in.
      </p>
      <p role="status" className="mt-2 text-sm text-accent-teal">{resumeMessage}</p>

      <div className="mt-6 grid items-start gap-5 md:grid-cols-2">
        <label className="text-sm text-white">
          Target style
          <select ref={targetSelectRef} value={styleSlug} onChange={e => changeStyle(e.target.value)} className={selectClass}>
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
            Save new plan
          </button>
        </div>
        <p role="status" className="mt-2 text-xs text-muted">{saveMessage}</p>
      </div>

      <section className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 ref={savedHeadingRef} tabIndex={-1} className="font-semibold text-white">Saved plans</h3>
          {deletedPlans && <button type="button" onClick={undoDelete} className="min-h-11 px-3 text-sm font-semibold text-accent-teal underline underline-offset-4">Undo last delete</button>}
        </div>
        <p className="mt-2 text-xs leading-6 text-muted">Keeps your latest 4 plans in this browser. A fifth replaces the oldest.</p>
        <p role="status" className="mt-2 text-sm text-accent-teal">{savedMessage}</p>
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
            const rateLabel = plan.target === "Ultra" ? "Check Ultra odds in-game" : plan.event ? "Saved rates: event" : "Saved rates: normal";
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
                <div className="mt-3 flex flex-wrap gap-3">
                  <button type="button" onClick={() => continuePlan(plan)} aria-label={`Continue planning for ${styleName ?? plan.target}`} disabled={rates.now === null}
                    className="min-h-11 rounded-full border border-accent-teal/30 px-4 py-2 font-semibold text-accent-teal disabled:opacity-50">Continue planning</button>
                  <button type="button" onClick={() => deletePlan(plan.id)} aria-label={`Delete plan for ${styleName ?? plan.target}`}
                    className="min-h-11 rounded-full border border-white/20 px-4 py-2 text-slate-200 hover:border-white/40">Delete plan</button>
                </div>
              </div>
            );
          }) : <p className="text-sm text-muted">No saved plans yet.</p>}
        </div>
      </section>
    </div>
  );
}
