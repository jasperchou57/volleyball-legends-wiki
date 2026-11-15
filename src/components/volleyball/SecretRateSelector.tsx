"use client";

import { useId, useState } from "react";
import { getSecretEventStatus, SECRET_SPIN_RATES, usesSecretEventRates, type RateMode } from "@/lib/volleyball/secret-event";
import { useCurrentTime } from "./useCurrentTime";

export function useSecretRates() {
  const [mode, setMode] = useState<RateMode>("auto");
  const now = useCurrentTime();
  return { mode, setMode, now, eventActive: now !== null && usesSecretEventRates(mode, now) };
}

export function SecretRateSelector({ mode, setMode, now }: {
  mode: RateMode;
  setMode: (mode: RateMode) => void;
  now: number | null;
}) {
  const id = useId();
  const status = now === null ? null : getSecretEventStatus(now);
  const boosted = now !== null && usesSecretEventRates(mode, now);
  const { rate, pity } = SECRET_SPIN_RATES[boosted ? "event" : "baseline"];
  return <div className="rounded-2xl border border-white/10 bg-background/65 p-4 text-sm">
    <label htmlFor={id} className="font-semibold text-white">Secret spin rates</label>
    <select id={id} value={mode} onChange={e => setMode(e.target.value as RateMode)} className="mt-2 w-full rounded-xl border border-white/15 bg-background px-3 py-3 text-white">
      <option value="auto">Automatic — follow event dates</option>
      <option value="baseline">Compare normal rates</option>
      <option value="event">Compare Update 96 event rates</option>
    </select>
    <p className="mt-3 font-semibold text-accent-teal">{now === null ? "Checking event schedule…" : `${boosted ? "Event" : "Normal"} rates: ${rate * 100}% per spin · Pity at ${pity} spins`}</p>
    <p className="mt-2 leading-6 text-muted">{status === "active" ? "Update 96 event · Scheduled to end November 16, 2026 at 11:30 AM ET." : status === "ended" ? "Update 96 event · Scheduled window ended November 16, 2026 at 11:30 AM ET." : "Update 96 event · November 14 at 11:30 AM ET – November 16, 2026 at 11:30 AM ET."}</p>
    <p className="mt-2 text-xs leading-5 text-muted">{mode === "auto" ? "Rates follow the announced schedule. Check in-game for any changes." : "For comparison only. Choose Automatic to use rates for the announced event dates."}</p>
  </div>;
}
