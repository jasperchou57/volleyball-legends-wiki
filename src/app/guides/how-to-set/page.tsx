import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Get Better at Setting in Volleyball Legends",
  description:
    "Setter guide for Volleyball Legends covering positioning, tempo, dump-set pressure, and the best styles to learn setting fundamentals.",
  alternates: { canonical: "/guides/how-to-set" },
};

const settingTips = [
  "Your first job is giving your hitter a playable ball, not forcing highlight dump sets every point.",
  "Face the court early so your directional set choices stay clear instead of rushed.",
  "Learn one fast, reliable set before you branch into tricky cross-court or delayed looks.",
  "Strong setters manipulate tempo. A slightly slower accurate set is usually better than a fancy set your spiker cannot read.",
];

export default function HowToSetPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">How to Set</span>
      </div>

      <section className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          How to Get Better at Setting in Volleyball Legends
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
          Setter searches are smaller than codes, but the audience is serious. This page focuses on tempo, readability, and role discipline instead of empty “best setter” claims.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {settingTips.map((tip, index) => (
          <section key={tip} className="rounded-[2rem] border border-border bg-surface/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Setter tip {index + 1}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{tip}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/styles/kyamo" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Kyamo</h2>
          <p className="mt-3 text-sm leading-6 text-muted">The cleanest starter setter page in the current dataset.</p>
        </Link>
        <Link href="/styles/okazu" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Okazu</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Good if you want stronger serving pressure alongside your setting role.</p>
        </Link>
        <Link href="/styles/feiko" className="rounded-[2rem] border border-border bg-surface/80 p-6 transition hover:border-white/20">
          <h2 className="text-xl font-heading font-bold text-white">Feiko</h2>
          <p className="mt-3 text-sm leading-6 text-muted">The most advanced setter page currently live because of the dump-set mechanic.</p>
        </Link>
      </section>
    </div>
  );
}
