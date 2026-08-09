"use client";

import { useState } from "react";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyCode}
      className="rounded-full border border-white/15 bg-background/65 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-accent-teal/60 hover:text-accent-teal"
      aria-label={`Copy ${code}`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
