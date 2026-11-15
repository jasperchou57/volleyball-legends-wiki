"use client";

import { getReturnWindowStatus } from "@/lib/volleyball/return-window";
import { useCurrentTime } from "./useCurrentTime";

export function StyleReturnStatus({ endsAt, recordedEnded, fallback }: {
  endsAt: string;
  recordedEnded: boolean;
  fallback: string;
}) {
  const now = useCurrentTime();
  return <span aria-live="polite">{getReturnWindowStatus(endsAt, now, recordedEnded)?.text ?? fallback}</span>;
}
