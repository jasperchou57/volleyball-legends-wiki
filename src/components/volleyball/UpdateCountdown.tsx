"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const EASTERN_TIME_ZONE = "America/New_York";
const TARGET_WEEKDAY = 6;
const TARGET_HOUR = 11;
const TARGET_MINUTE = 30;

const easternDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: EASTERN_TIME_ZONE,
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const easternOffsetFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: EASTERN_TIME_ZONE,
  timeZoneName: "shortOffset",
});

const weekdayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function getEasternParts(date: Date) {
  const parts = easternDateFormatter.formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    weekday: weekdayMap[values.weekday] ?? 0,
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

function getEasternOffsetMs(date: Date) {
  const offsetLabel = easternOffsetFormatter
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;

  const match = offsetLabel?.match(/^GMT([+-]\d{1,2})(?::?(\d{2}))?$/);
  if (!match) {
    return 0;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2] ?? "0");
  return (hours * 60 + Math.sign(hours || 1) * minutes) * 60 * 1000;
}

function addDays(year: number, month: number, day: number, daysToAdd: number) {
  const date = new Date(Date.UTC(year, month - 1, day + daysToAdd));

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

function getEasternDate(year: number, month: number, day: number, hour: number, minute: number) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  return new Date(utcGuess.getTime() - getEasternOffsetMs(utcGuess));
}

function getNextUpdateDate(now: Date) {
  const easternNow = getEasternParts(now);
  let targetDate = addDays(
    easternNow.year,
    easternNow.month,
    easternNow.day,
    (TARGET_WEEKDAY - easternNow.weekday + 7) % 7
  );
  let target = getEasternDate(
    targetDate.year,
    targetDate.month,
    targetDate.day,
    TARGET_HOUR,
    TARGET_MINUTE
  );

  if (target <= now) {
    targetDate = addDays(targetDate.year, targetDate.month, targetDate.day, 7);
    target = getEasternDate(
      targetDate.year,
      targetDate.month,
      targetDate.day,
      TARGET_HOUR,
      TARGET_MINUTE
    );
  }

  return target;
}

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export function UpdateCountdown({ detailed = false }: { detailed?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());

    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const target = useMemo(() => (now ? getNextUpdateDate(now) : null), [now]);
  const remaining = target && now ? formatRemaining(target.getTime() - now.getTime()) : null;

  const easternDate = target ? new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TIME_ZONE, month: "long", day: "numeric", year: "numeric",
  }).format(target) : null;
  const localDate = target ? new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
    timeZoneName: "short",
  }).format(target) : null;
  // Official Roblox event: https://www.roblox.com/events/4776371537748034221
  // Hide this announcement when its scheduled start passes; never reuse it next week.
  const showPreview = now && now.getTime() < Date.parse("2026-10-03T15:30:00Z");

  return (
    <div>
      <section className="relative overflow-hidden rounded-3xl border border-accent-teal/30 bg-surface/90 p-5 shadow-[0_24px_80px_rgba(8,21,33,0.35)] sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-accent-teal/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Weekly countdown</p>
          <h3 className="mt-3 font-heading text-3xl font-bold text-white">Next update</h3>
          <p className="mt-3 text-sm leading-6 text-muted">Updates every Saturday at 11:30 AM ET.</p>
          <p className="mt-5 min-h-8 text-xl font-semibold text-white sm:text-2xl">
            {target ? <time dateTime={target.toISOString()}>{easternDate} · 11:30 AM ET</time> : "Saturday · 11:30 AM ET"}
          </p>
          <p className="mt-2 min-h-6 text-sm leading-6 text-muted">Your local time: {localDate ?? "Loading…"}</p>

          <div className="mt-7 grid grid-cols-4 gap-2 sm:gap-4" role="timer" aria-label="Time until the next scheduled update" aria-live="off">
            {[
              ["Days", remaining?.days], ["Hours", remaining?.hours],
              ["Minutes", remaining?.minutes], ["Seconds", remaining?.seconds],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-accent-teal/15 bg-background/70 px-1 py-5 text-center sm:py-7">
                <p className="font-heading text-3xl font-black tabular-nums text-accent-teal sm:text-5xl md:text-6xl">{value === undefined ? "--" : String(value).padStart(2, "0")}</p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-xs">{label}</p>
              </div>
            ))}
          </div>
          {!detailed && (
            <Link href="/tools/update-countdown" className="mt-6 inline-block text-sm font-semibold text-accent-teal underline underline-offset-4">View update countdown →</Link>
          )}
        </div>
      </section>
      {detailed && showPreview && (
        <section className="mt-6 rounded-3xl border border-border bg-surface/60 p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-bold text-white">What&apos;s coming</h2>
          <ul className="mt-4 space-y-3 text-muted">
            <li>A style is returning.</li>
            <li>New Skeleton Bundle.</li>
          </ul>
        </section>
      )}
    </div>
  );
}
