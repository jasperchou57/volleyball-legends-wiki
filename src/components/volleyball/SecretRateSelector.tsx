"use client";

import { useEffect, useId, useState } from "react";
import { getSecretEventStatus, usesSecretEventRates, type RateMode } from "@/lib/volleyball/secret-event";

export function useSecretRates() {
  const [mode, setMode] = useState<RateMode>("auto");
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const refresh = () => setNow(Date.now());
    refresh();
    const timer = window.setInterval(refresh, 1000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  return { mode, setMode, now, eventActive: now !== null && usesSecretEventRates(mode, now) };
}

export function SecretRateSelector({ mode, setMode, now, eligible = true }: {
  mode: RateMode;
  setMode: (mode: RateMode) => void;
  now: number | null;
  eligible?: boolean;
}) {
  const id = useId();
  const status = now === null ? null : getSecretEventStatus(now);
  const boosted = eligible && now !== null && usesSecretEventRates(mode, now);
  return <div className="rounded-2xl border border-white/10 bg-background/65 p-4 text-sm">
    <label htmlFor={id} className="font-semibold text-white">Secret spin rates</label>
    <select id={id} value={mode} disabled={!eligible} onChange={e => setMode(e.target.value as RateMode)} className="mt-2 w-full rounded-xl border border-white/15 bg-background px-3 py-3 text-white disabled:opacity-50">
      <option value="auto">Automatic — follow event dates</option>
      <option value="baseline">Compare normal rates</option>
      <option value="event">Compare Update 90 event rates</option>
    </select>
    <p className="mt-3 font-semibold text-accent-teal">{!eligible ? "Secret boost does not apply to this rarity." : now === null ? "Checking event schedule…" : `${boosted ? "Event" : "Normal"} rates: ${boosted ? "1% per spin · Pity at 100 spins" : "0.5% per spin · Pity at 200 spins"}`}</p>
    <p className="mt-2 leading-6 text-muted">{status === null ? "" : status === "active" ? "Update 90 event: active on the announced schedule." : status === "ended" ? "Update 90 event: ended on the announced schedule." : "Update 90 event: upcoming."} October 3, 2026 at 11:30 AM – October 5, 2026 at 11:30 AM ET.</p>
    {eligible && <p className="mt-2 text-xs leading-5 text-muted">{mode === "auto" ? "Rates return to normal after the scheduled end. Check in-game for any changes." : "For comparison only. Choose Automatic to use rates for the announced event dates."}</p>}
  </div>;
}
