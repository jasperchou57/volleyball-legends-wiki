"use client";

import { useId, useState } from "react";
import { getActiveSecretEvent, getNextSecretEvent, getSecretEventStatus, SECRET_EVENT_WINDOWS, SECRET_SPIN_RATES, usesSecretEventRates, type RateMode } from "@/lib/volleyball/secret-event";
import { useCurrentTime } from "./useCurrentTime";

const eventTimeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
});
const formatEventTime = (value: string) => `${eventTimeFormat.format(new Date(value))} ET`;

export function useSecretRates(initialMode: RateMode = "auto") {
  const [mode, setMode] = useState<RateMode>(initialMode);
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
  const active = now === null ? null : getActiveSecretEvent(now);
  const next = now === null ? null : getNextSecretEvent(now);
  const boosted = now !== null && usesSecretEventRates(mode, now);
  const { rate, pity } = SECRET_SPIN_RATES[boosted ? "event" : "baseline"];
  return <div className="rounded-2xl border border-white/10 bg-background/65 p-4 text-sm">
    <label htmlFor={id} className="font-semibold text-white">Secret spin rates</label>
    <select id={id} value={mode} onChange={e => setMode(e.target.value as RateMode)} className="mt-2 w-full rounded-xl border border-white/15 bg-background px-3 py-3 text-white">
      <option value="auto">Automatic — event dates</option>
      <option value="baseline">Normal-rate comparison</option>
      <option value="event">Event-rate comparison</option>
    </select>
    <p className="mt-3 font-semibold text-accent-teal">{now === null ? "Checking event schedule…" : `${mode === "auto" ? "Announced rates" : "Comparison"}: ${rate * 100}% per spin · Pity at ${pity} spins`}</p>
    <p className="mt-2 leading-6 text-muted">
      <span className="font-semibold">Announced schedule: </span>
      {active ? `${active.label} · Scheduled to end ${formatEventTime(active.endsAt)}.`
        : next ? `${status === "between" ? "Normal rates between events. " : ""}Next: ${next.label}, ${formatEventTime(next.startsAt)}.`
          : status === "ended" ? "Both announced Update 97 event windows have ended."
            : "Update 97 announces two separate 2× Lucky events."}
    </p>
    <ul className="mt-3 space-y-2 text-xs leading-5 text-muted" aria-label="Update 97 event dates">
      {SECRET_EVENT_WINDOWS.map(event => <li key={event.id}>
        <span className="font-semibold text-slate-200">{event.label}: </span>
        <time dateTime={event.startsAt}>{formatEventTime(event.startsAt)}</time>{" – "}
        <time dateTime={event.endsAt}>{formatEventTime(event.endsAt)}</time>
        {event.id === "update-97-thanksgiving" && " (24 hours)"}
      </li>)}
    </ul>
    <p className="mt-2 text-xs leading-5 text-muted">{mode === "auto" ? "Check rates in-game before rolling." : "Comparison only. Automatic follows the schedule."}</p>
  </div>;
}
