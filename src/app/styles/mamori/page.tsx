import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield } from "lucide-react";
import { mamoriMastery } from "@/data/volleyball";

export const metadata: Metadata = {
  title: "Mamori in Volleyball Legends: Skills & Mastery",
  description: "Learn Mamori’s Parry, Perfect Parry, and Charge in Volleyball Legends, including the 3.5-second cooldown, keyboard controls, and five Mastery upgrades.",
  alternates: { canonical: "/styles/mamori" },
};

export default function MamoriPage() {
  return <div className="container mx-auto max-w-5xl px-4 py-10">
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
      <Link href="/" className="hover:text-white">Home</Link><ChevronRight className="h-4 w-4" />
      <Link href="/styles" className="hover:text-white">Styles</Link><ChevronRight className="h-4 w-4" /><span className="text-white">Mamori</span>
    </nav>
    <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <div className="flex items-center gap-2 text-sm font-semibold text-accent-teal"><Shield className="h-5 w-5" />Middle blocker · Introduced in Update 92</div>
      <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">Volleyball Legends Mamori</h1>
      <p className="mt-4 text-lg leading-8 text-muted">Mamori, the Shieldbearer, turns a well-timed block into a parry that knocks opponents back. Use Charge in the air to reach the ball, then choose between a harder return and a controlled pop-up.</p>
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-3">{[["skills", "Skills"], ["charge", "Charge controls"], ["mastery", "Mastery"], ["practice", "Practice tips"]].map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:border-accent-teal">{label}</a>)}</nav>
    </section>
    <section className="mt-8 rounded-[2rem] border border-accent-teal/20 bg-accent-teal/10 p-6">
      <h2 className="text-2xl font-heading font-bold text-white">What changed in Update 93?</h2>
      <p className="mt-3 text-sm leading-7 text-muted">Perfect Parry now launches opponents in a short arc in the direction of the parried ball, rather than pushing them flat along the floor. Another version of the snake-jump bug was also fixed.</p>
      <Link href="/updates/update-93" className="mt-4 inline-block text-sm text-accent-teal underline underline-offset-4">Read Update 93 patch notes</Link>
    </section>
    <section id="skills" className="mt-8 scroll-mt-44 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <h2 className="text-2xl font-heading font-bold text-white">How Mamori’s Parry works</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-background/65 p-5"><h3 className="text-lg font-semibold text-accent-teal">Parry</h3><p className="mt-3 text-sm leading-7 text-muted">Block just as the ball reaches you. A successful parry returns the ball and knocks back opponents in front of you. It works on your team’s ball as well as the opposing team’s.</p></div>
        <div className="rounded-2xl border border-white/10 bg-background/65 p-5"><h3 className="text-lg font-semibold text-accent-orange">Perfect Parry</h3><p className="mt-3 text-sm leading-7 text-muted">Mastery 1 unlocks Perfect Parry. Its timing is tighter, but the return has more impact and gravity, and opponents are launched in a short arc in the direction of the parried ball.</p></div>
      </div>
    </section>
    <section id="charge" className="mt-8 scroll-mt-44 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <h2 className="text-2xl font-heading font-bold text-white">Charge controls and timing</h2>
      <p className="mt-3 text-sm leading-7 text-muted">Activate Special while airborne to launch toward the ball. Charge has a 3.5-second cooldown.</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">{[
        ["Early contact", "Reaching the ball early in the Charge triggers a Perfect Parry."],
        ["Late contact", "Reaching it late pops the ball up safely on your side."],
        ["Hold S", "Pop the ball up for yourself."],
        ["Hold W · Mastery 3", "During a Charge toward your team’s ball, hold W to guarantee a Perfect Parry."],
      ].map(([label, detail]) => <div key={label} className="rounded-2xl border border-white/10 bg-background/65 p-5"><dt className="font-semibold text-white">{label}</dt><dd className="mt-2 text-sm leading-7 text-muted">{detail}</dd></div>)}</dl>
      <p className="mt-4 text-sm leading-7 text-muted">S and W are keyboard inputs. Check your in-game controls for your platform’s Special and movement inputs.</p>
    </section>
    <section id="mastery" className="mt-8 scroll-mt-44 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <h2 className="text-2xl font-heading font-bold text-white">Mamori Mastery levels</h2>
      <ol className="mt-5 space-y-3">{mamoriMastery.map(item => <li key={item.level} className="rounded-2xl border border-white/10 bg-background/65 p-5"><h3 className="font-semibold text-white"><span className="text-accent-teal">Level {item.level}</span> · {item.name}</h3><p className="mt-2 text-sm leading-7 text-muted">{item.detail}</p></li>)}</ol>
    </section>
    <section id="practice" className="mt-8 scroll-mt-44 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <h2 className="text-2xl font-heading font-bold text-white">What to practice first</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted"><li>Start with Parry timing before adding Charge. Aim to block as the ball arrives.</li><li>Practice early and late Charge contact separately so you can choose a return or a pop-up.</li><li>After unlocking Mastery 3, practice the W input on your team’s ball. The guaranteed Perfect Parry applies to that situation.</li></ul>
    </section>
    <div className="mt-6 flex flex-wrap gap-4 text-sm"><Link href="/updates/update-92" className="text-accent-teal underline underline-offset-4">Update 92 patch notes</Link><Link href="/codes" className="text-accent-teal underline underline-offset-4">Current codes and spin rewards</Link></div>
  </div>;
}
