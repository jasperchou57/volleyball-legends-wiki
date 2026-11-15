export type ReturnWindowStatus = {
  kind: "return-window" | "window-ended";
  text: string;
};

const easternDeadline = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function getReturnWindowStatus(
  endsAt: string,
  now: number | null,
  recordedEnded: boolean,
): ReturnWindowStatus | undefined {
  const end = Date.parse(endsAt);
  if (!Number.isFinite(end)) return undefined;

  const deadline = easternDeadline.format(end) + " ET";
  if (now === null && !recordedEnded) {
    return { kind: "return-window", text: `Announced end: ${deadline}.` };
  }

  const ended = now === null || now >= end;
  return ended
    ? { kind: "window-ended", text: `Announced return window ended ${deadline}.` }
    : { kind: "return-window", text: `Announced return window ends ${deadline}.` };
}
