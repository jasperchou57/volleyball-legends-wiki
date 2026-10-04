"use client";

import { useId, useState } from "react";

export function CodeCheckStatus() {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}
        className="rounded-full border border-accent-gold/25 bg-accent-gold/10 px-3 py-1 text-xs font-semibold text-accent-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
      >
        Check
      </button>
      {open && (
        <span id={id} role="tooltip" className="absolute bottom-full left-0 z-20 w-56 max-w-[65vw] pb-2">
          <span className="block rounded-xl border border-white/15 bg-slate-950 p-3 text-xs font-normal leading-5 text-slate-200 shadow-xl">
            This code’s current status hasn’t been confirmed. Try redeeming it in-game.
          </span>
        </span>
      )}
    </span>
  );
}
