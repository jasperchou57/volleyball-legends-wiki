import Link from "next/link";
import { getTierStyles, styleReviewDate, type TierStyle } from "@/data/style-reviews";
import type { Role } from "@/data/volleyball";

function StyleCard({ style }: { style: TierStyle }) {
  return <article className="flex flex-col rounded-3xl border border-border bg-surface/80 p-6">
    <div className="flex items-start justify-between gap-3">
      <h2 className="text-2xl font-heading font-bold text-white">{style.name}</h2>
      <span className={`shrink-0 rounded-full border px-3 py-1 text-sm font-bold ${style.review ? "border-accent-teal/30 bg-accent-teal/10 text-accent-teal" : "border-white/15 text-slate-300"}`}>{style.tier ?? "Not rated"}</span>
    </div>
    <p className="mt-2 text-sm text-slate-200">{style.rarity} · {style.role}</p>
    {style.slug === "kyoshin" && <p className="mt-2 text-xs text-muted">Formerly Kosumi</p>}
    {style.slug === "sagafura" && <p className="mt-2 text-xs text-muted">Formerly Sagafura</p>}
    {style.slug === "twins" && <p className="mt-3 text-sm leading-7 text-muted">Akuto: serve and set. Okuro: spike and block. Switch forms to fit the next play.</p>}
    <p className="mt-3 text-xs text-muted">{style.review ? <>{style.tier ? style.review.status === "Provisional" ? "Provisional rating" : "Site rating" : "Mechanics reviewed"} · <time dateTime={styleReviewDate}>Nov 8, 2026</time></> : "Earlier rating · July 27, 2026"}</p>
    {style.review ? <>
      <p className="mt-4 text-sm leading-7 text-slate-200">{style.review.reason}</p>
      <p className="mt-4 text-sm leading-7 text-muted"><strong className="text-slate-200">Keep in mind: </strong>{style.review.limitation}</p>
    </> : <p className="mt-4 text-sm leading-7 text-muted">{style.summary}</p>}
    <Link href={style.href} className="mt-auto pt-5 text-sm font-semibold text-accent-teal hover:text-white">{style.slug === "roketto" ? "Read the Update 95 fix" : "Explore this style"} →</Link>
  </article>;
}

export function StyleTierCards({ role }: { role?: Role }) {
  const styles = getTierStyles(role);
  const reviewed = styles.filter(style => style.review);
  const earlier = styles.filter(style => !style.review);
  return <>
    {reviewed.length > 0 && <section className="mt-8" aria-label="Recently reviewed styles">
      <p className="mb-4 text-sm font-semibold text-accent-teal">Recently reviewed styles</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{reviewed.map(style => <StyleCard key={style.slug} style={style} />)}</div>
    </section>}
    {earlier.length > 0 && <section className="mt-10" aria-label="Earlier community ratings">
      <p className="text-lg font-semibold text-white">Earlier community ratings</p>
      <p className="mb-5 mt-2 max-w-3xl text-sm leading-7 text-muted">These ratings date from July 27, 2026 and have not been checked against Update 95. Use them as an older reference when comparing styles.</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{earlier.map(style => <StyleCard key={style.slug} style={style} />)}</div>
    </section>}
  </>;
}

export function StyleRoleNote() {
  return <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">These are the overall ratings filtered by role, not separate ratings for this position. Compare each style’s strengths, limits, and rating date.</p>;
}
