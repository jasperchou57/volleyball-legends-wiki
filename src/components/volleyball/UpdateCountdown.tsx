"use client";

import { useEffect, useMemo, useState } from "react";

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

export function UpdateCountdown() {
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

  return (
    <div className="rounded-3xl border border-border bg-surface/80 p-6 shadow-[0_24px_80px_rgba(8,21,33,0.35)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Expected weekly window
          </p>
          <h3 className="mt-2 text-3xl font-heading font-bold text-white">
            Next Saturday check-in
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            The game has historically listed Saturday updates around 11:30 AM ET. Treat this as a check-in time; Discord and the in-game banner decide the exact release and contents.
          </p>
        </div>
        <div className="rounded-full border border-accent-orange/40 bg-accent-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
          Expected window
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["Days", remaining?.days ?? "--"],
          ["Hours", remaining?.hours ?? "--"],
          ["Minutes", remaining?.minutes ?? "--"],
          ["Seconds", remaining?.seconds ?? "--"],
        ].map(([label, value], index) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-background/70 p-5 text-center">
            <p className={`text-4xl font-heading font-black ${index % 2 === 0 ? "text-accent-orange" : "text-accent-teal"}`}>
              {value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted">{label}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-5 text-muted">
        Displayed schedule: Saturdays at 11:30 AM Eastern Time. Always verify codes, banners, and major notes in the official Discord or in-game first.
      </p>
    </div>
  );
}
