"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRerollAdvice, type SlotStatus, type ChaseTarget } from "@/lib/volleyball/reroll-advice";
import { SecretRateSelector, useSecretRates } from "./SecretRateSelector";

type SavedPlan = { id: string; keep: boolean; slots: SlotStatus; available: SlotStatus; spins: number; target: ChaseTarget; event: boolean };
const choices = ["unsure", "yes", "no"] as const;
const choiceLabel = { unsure: "Not sure yet", yes: "Yes", no: "No" };
const selectClass = "mt-2 w-full rounded-xl border border-white/15 bg-background px-3 py-3 text-white";

function validPlan(value: unknown): value is SavedPlan {
  if (!value || typeof value !== "object") return false;
  const p = value as SavedPlan;
  return typeof p.id === "string" && typeof p.keep === "boolean" && choices.includes(p.slots) && choices.includes(p.available) && Number.isInteger(p.spins) && p.spins >= 0 && ["Secret", "Limited Secret", "Ultra"].includes(p.target) && typeof p.event === "boolean";
}

export function RerollAdvisor() {
  const [keep, setKeep] = useState(true);
  const [slots, setSlots] = useState<SlotStatus>("unsure");
  const [available, setAvailable] = useState<SlotStatus>("unsure");
  const [spins, setSpins] = useState(80);
  const [target, setTarget] = useState<ChaseTarget>("Limited Secret");
  const [saved, setSaved] = useState<SavedPlan[]>([]);
  const [saveMessage, setSaveMessage] = useState("");
  const rates = useSecretRates();
  const advice = getRerollAdvice(keep, slots, available, spins, target);
  useEffect(() => {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem("vl-reroll-plans-v2") ?? "[]");
      if (Array.isArray(raw)) setSaved(raw.filter(validPlan).slice(0, 4));
    } catch {}
  }, []);
  function savePlan() {
    const plan = { id: String(Date.now()), keep, slots, available, spins, target, event: target !== "Ultra" && rates.eventActive };
    const next = [plan, ...saved].slice(0, 4);
    setSaved(next);
    try { localStorage.setItem("vl-reroll-plans-v2", JSON.stringify(next)); setSaveMessage("Saved on this device."); }
    catch { setSaveMessage("Your plan is shown below, but could not be saved. It will be lost when you leave this page."); }
  }
  return <div className="rounded-3xl border border-border bg-surface/80 p-6">
    <h2 className="text-3xl font-heading font-bold text-white">Before you reroll</h2>
    <p className="mt-3 text-sm leading-7 text-muted">Decide what to keep, check your slots, and confirm that your target is available before spending spins.</p>
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      <label className="text-sm text-white">Do you want to keep your current style?<select value={keep ? "yes" : "no"} onChange={e => setKeep(e.target.value === "yes")} className={selectClass}><option value="yes">Yes — keep it</option><option value="no">No — I am willing to replace it</option></select></label>
      {keep && <label className="text-sm text-white">Do you have a separate slot ready for rolling?<select value={slots} onChange={e => setSlots(e.target.value as SlotStatus)} className={selectClass}>{choices.map(c => <option key={c} value={c}>{choiceLabel[c]}</option>)}</select></label>}
      <label className="text-sm text-white">Target rarity<select value={target} onChange={e => { setTarget(e.target.value as ChaseTarget); setAvailable("unsure"); }} className={selectClass}>{["Secret", "Limited Secret", "Ultra"].map(t => <option key={t}>{t}</option>)}</select></label>
      <label className="text-sm text-white">Is your target in the current in-game selection?<select value={available} onChange={e => setAvailable(e.target.value as SlotStatus)} className={selectClass}>{choices.map(c => <option key={c} value={c}>{choiceLabel[c]}</option>)}</select></label>
      <label className="text-sm text-white">Your Lucky Spins<input type="number" min={0} max={100000} step={1} value={spins} onChange={e => setSpins(Math.min(100000, Math.max(0, Math.floor(Number(e.target.value) || 0))))} className={selectClass}/></label>
    </div>
    <div className="mt-6"><SecretRateSelector {...rates} eligible={target !== "Ultra"}/></div>
    <div className="mt-6 rounded-2xl border border-accent-teal/25 bg-accent-teal/5 p-5" aria-live="polite">
      <h3 className="text-xl font-bold text-white">{advice.headline}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{advice.body}</p>
      <div className="mt-5 flex flex-wrap items-center gap-4"><Link href={advice.href} className="font-semibold text-accent-teal underline">{advice.action}</Link><button type="button" disabled={rates.now === null} onClick={savePlan} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white disabled:opacity-50">Save this plan</button></div>
      <p role="status" className="mt-2 text-xs text-muted">{saveMessage}</p>
    </div>
    <section className="mt-6"><h3 className="font-semibold text-white">Saved plans</h3><p className="mt-2 text-xs leading-6 text-muted">These plans keep your saved choices. Check availability and rates again before rolling.</p>
      <div className="mt-3 space-y-3">{saved.length ? saved.map(p => <div key={p.id} className="rounded-2xl border border-border bg-background/60 p-4 text-sm leading-6 text-muted"><p className="font-semibold text-white">{p.keep ? "Keep current style" : "Willing to replace"} · {p.target}</p><p>{p.spins} Lucky Spins · {p.target === "Ultra" ? "Secret event rates do not apply" : p.event ? "Event rates" : "Normal rates"}</p><p>Separate slot: {choiceLabel[p.slots]} · Target available: {choiceLabel[p.available]}</p></div>) : <p className="text-sm text-muted">Save your choices here to compare plans on this device.</p>}</div>
    </section>
  </div>;
}
