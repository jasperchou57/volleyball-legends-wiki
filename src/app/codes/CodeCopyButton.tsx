"use client";

import { useEffect, useId, useRef, useState } from "react";

export function CodeCopyButton({ code }: { code: string }) {
  const [state, setState] = useState<"idle" | "pending" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inFlight = useRef(false);
  const mounted = useRef(true);
  const feedbackId = useId();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copyCode() {
    if (inFlight.current) return;
    inFlight.current = true;
    if (timer.current) clearTimeout(timer.current);
    setState("pending");
    try {
      await navigator.clipboard.writeText(code);
      if (!mounted.current) return;
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), 2000);
    } catch {
      if (mounted.current) setState("failed");
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={copyCode}
        disabled={state === "pending"}
        aria-label={`Copy ${code}`}
        aria-describedby={feedbackId}
        className="min-h-11 min-w-20 rounded-full border border-white/20 bg-background/65 px-3 py-2 text-sm font-semibold text-white transition hover:border-accent-teal/60 hover:text-accent-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-teal disabled:opacity-60"
      >
        {state === "copied" ? "Copied!" : state === "pending" ? "Copying…" : "Copy"}
      </button>
      <span id={feedbackId} role="status" aria-live="polite" aria-atomic="true" className={state === "failed" ? "mt-2 block max-w-40 text-xs leading-5 text-accent-gold" : "sr-only"}>
        {state === "copied" ? `${code} copied.` : state === "failed" ? "Copy failed. Select the code text and copy it manually." : ""}
      </span>
    </div>
  );
}
