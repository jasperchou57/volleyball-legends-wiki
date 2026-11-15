import { getLatestAvailability, latestGameUpdate, update96 } from "../../data/volleyball";

export const rerollStyles = [
  { slug: "riku", name: "Riku" },
  { slug: "timeskip-okazu", name: "Timeskip Okazu" },
  { slug: "twins", name: "Twins" },
];

export type StyleRollStatus = {
  kind: "out-of-rotation" | "return-window" | "window-ended";
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

export function getStyleRollStatus(slug: string, now: number | null): StyleRollStatus | undefined {
  if (slug === "riku" && latestGameUpdate.updateNumber === update96.updateNumber) {
    return { kind: "out-of-rotation", text: "Out of the Style rotation in Update 96." };
  }

  const latestReturn = getLatestAvailability("Style", slug);
  if (latestReturn?.sourceTier !== "Official" || !latestReturn.endsAt) return undefined;

  const end = Date.parse(latestReturn.endsAt);
  if (!Number.isFinite(end)) return undefined;

  const deadline = easternDeadline.format(end) + " ET";
  const ended = now === null ? latestReturn.status === "Not currently available" : now >= end;
  return ended
    ? { kind: "window-ended", text: `Announced return window ended ${deadline}.` }
    : { kind: "return-window", text: `Announced return window ends ${deadline}.` };
}
