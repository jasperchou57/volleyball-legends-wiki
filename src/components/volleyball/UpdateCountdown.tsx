"use client";

import { useEffect, useMemo, useState } from "react";

function getEasternNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
}

function getNextUpdateDate(now: Date) {
  const target = new Date(now);
  const day = target.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7;

  target.setDate(target.getDate() + daysUntilSaturday);
  target.setHours(11, 30, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 7);
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
    setNow(getEasternNow());

    const timer = window.setInterval(() => {
      setNow(getEasternNow());
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
            Weekly Reset
          </p>
          <h3 className="mt-2 text-3xl font-heading font-bold text-white">
            Next Saturday Update
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Community trackers and Roblox listing mirrors consistently point to a weekly Saturday update cadence around 11:30 AM ET.
          </p>
        </div>
        <div className="rounded-full border border-accent-orange/40 bg-accent-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
          Community-timed
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
        Displayed schedule: Saturdays at 11:30 AM Eastern Time. Always verify big patches in the official Discord first if you are racing to post codes or update notes.
      </p>
    </div>
  );
}
