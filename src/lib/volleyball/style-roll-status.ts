import { getLatestAvailability, latestGameUpdate, update96 } from "../../data/volleyball";
import { getReturnWindowStatus, type ReturnWindowStatus } from "./return-window";

export const rerollStyles = [
  { slug: "riku", name: "Riku" },
  { slug: "timeskip-okazu", name: "Timeskip Okazu" },
  { slug: "twins", name: "Twins" },
];

export type StyleRollStatus = ReturnWindowStatus | { kind: "out-of-rotation"; text: string };

export function getStyleRollStatus(slug: string, now: number | null): StyleRollStatus | undefined {
  if (slug === "riku" && latestGameUpdate.updateNumber === update96.updateNumber) {
    return { kind: "out-of-rotation", text: "Out of the Style rotation in Update 96." };
  }

  const latestReturn = getLatestAvailability("Style", slug);
  if (latestReturn?.sourceTier !== "Official" || !latestReturn.endsAt) return undefined;

  return getReturnWindowStatus(latestReturn.endsAt, now, latestReturn.status === "Not currently available");
}
