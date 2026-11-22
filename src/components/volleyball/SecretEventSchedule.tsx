"use client";

import { getSecretWindowStatus, SECRET_EVENT_WINDOWS } from "@/lib/volleyball/secret-event";
import { useCurrentTime } from "./useCurrentTime";

const eventTimeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
});
const formatEventTime = (value: string) => `${eventTimeFormat.format(new Date(value))} ET`;
const statusLabels = { upcoming: "Upcoming", active: "Scheduled now", ended: "Ended" };

export function SecretEventSchedule() {
  const now = useCurrentTime();
  return <div>
    <p className="text-sm font-semibold text-white">Update 97 event dates (ET)</p>
    <ul className="mt-3 space-y-4 text-sm leading-6 text-slate-200">
      {SECRET_EVENT_WINDOWS.map(event => {
        const status = now === null ? null : getSecretWindowStatus(event, now);
        return <li key={event.id}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <strong>{event.label}</strong>
            <span aria-live="polite" className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${status === "active" ? "border-accent-teal/30 text-accent-teal" : "border-white/15 text-muted"}`}>
              {status ? statusLabels[status] : "Announced"}
            </span>
          </div>
          <p className="mt-1">
            <time dateTime={event.startsAt}>{formatEventTime(event.startsAt)}</time>{" – "}
            <time dateTime={event.endsAt}>{formatEventTime(event.endsAt)}</time>
            {` (${(Date.parse(event.endsAt) - Date.parse(event.startsAt)) / 3600000} hours)`}
          </p>
        </li>;
      })}
    </ul>
  </div>;
}
