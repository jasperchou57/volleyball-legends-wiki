import { getLatestAvailability } from "../../data/volleyball";
import { rikuRotationNotice } from "../../data/update-97";
import { getReturnWindowStatus, type ReturnWindowStatus } from "./return-window";

export const rerollStyles = [
  { slug: "yogan", name: "Yogan" },
  { slug: "riku", name: "Riku" },
  { slug: "timeskip-okazu", name: "Timeskip Okazu" },
  { slug: "twins", name: "Twins" },
];

export type StyleRollStatus = ReturnWindowStatus | { kind: "out-of-rotation"; text: string };

export function getStyleRollStatus(slug: string, now: number | null): StyleRollStatus | undefined {
  const latestReturn = getLatestAvailability("Style", slug);
  if (slug === "riku" && (!latestReturn || latestReturn.updateNumber <= 96)) {
    return { kind: "out-of-rotation", text: rikuRotationNotice };
  }

  if (latestReturn?.sourceTier !== "Official" || !latestReturn.endsAt) return undefined;

  return getReturnWindowStatus(latestReturn.endsAt, now, latestReturn.status === "Not currently available");
}
