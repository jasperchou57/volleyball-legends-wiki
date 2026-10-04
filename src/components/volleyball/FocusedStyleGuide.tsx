import Link from "next/link";
import { getStyle, jinkoMasteryRewards } from "@/data/volleyball";

const guides = {
  feiko: {
    label: "Secret · Setter · Dump Set",
    intro: "Feiko is a Secret setter in Volleyball Legends with two set types: Stop Set and Dump Set. Use them to set up a teammate or send the ball into space on the opposing court.",
    mechanic: "Feiko’s Stop Set and Dump Set",
    cards: [
      ["Stop Set", "The ball travels toward the setting point, then slows down. Practice the timing with a teammate so they can meet the set."],
      ["Dump Set", "The dump directs the ball downward according to your tilt. Look for open space on the opposing court when choosing where to place it."],
    ],
    practice: [
      ["Learn each set separately.", "Practice Stop Sets and Dump Sets before switching between them during a rally."],
      ["Watch your teammate and the defense.", "Choose whether to build an attack with a set or try a dump into an open area."],
      ["Mix sets and dumps.", "Avoid using a dump on every contact. Work on making both options comfortable."],
    ],
    statsNote: "The recorded Set value is higher than Spike. Feiko’s distinctive attacking option is its Dump Set, rather than a focus on conventional spikes.",
    faqs: [
      ["What is the difference between Stop Set and Dump Set?", "Stop Set slows the ball at the setting point for a teammate. Dump Set directs it downward toward the area you tilt toward."],
      ["Who should use Feiko?", "Feiko suits players who enjoy setting and want the option to attack with a dump. Practice both set types so your choice fits the rally."],
      ["Can I get Feiko now?", "Check that Feiko appears in the current in-game style selection before spending spins. The May 2026 return listed here is a historical event."],
    ],
  },
  jinko: {
    label: "Secret · Spiker · Curve",
    intro: "Jinko is a Secret spiker in Volleyball Legends that adds curve to serves and spikes, giving you more ways to vary your shot placement.",
    mechanic: "How Jinko’s curve works",
    cards: [
      ["Shape your shot", "Directional tilt changes the ball’s path. Practice the curve from a consistent position so you can learn where each shot lands."],
      ["Build consistent placement", "Start with shots you can keep in the court. Add more variation once you can place them reliably."],
    ],
    practice: [
      ["Practice serves and spikes separately.", "Learn where the ball lands from each type of contact before combining different shots in a match."],
      ["Change one thing at a time.", "Keep your starting position similar while practicing different tilt directions. Then try the same shot from another position."],
      ["Read the receiving players.", "Aim for available space and vary your placement instead of repeating the same curve every time."],
    ],
    statsNote: "The recorded attributes favor Jump, Serve, Spike and Tilt over Speed. Practice court positioning alongside shot placement.",
    faqs: [
      ["When does Jinko’s return end?", "The Update 90 announcement gives October 17, 2026 as the end date. It does not specify an exact closing time."],
      ["How do I unlock Jinko Mastery rewards?", "Complete quests with Jinko to progress through the five reward levels. The reward table above lists what each level unlocks."],
      ["Does Mastery give Lucky Spins?", "Yes. Level 2 awards 3 Lucky Style Spins and Level 3 awards 6 Lucky Style Spins, for 9 across those two levels."],
      ["Is Jinko worth keeping?", "Consider keeping Jinko if you enjoy curved serves and spikes and want to practice their placement. Its Mastery quests also offer rewards while you play with the style."],
    ],
  },
};

export function FocusedStyleGuide({ slug }: { slug: keyof typeof guides }) {
  const style = getStyle(slug)!;
  const guide = guides[slug];
  const sections = slug === "jinko"
    ? [["mastery", "Mastery rewards"], ["mechanic", "Curve"], ["stats", "Stats"], ["practice", "Practice tips"], ["faq", "FAQ"]]
    : [["mechanic", "Set types"], ["stats", "Stats"], ["practice", "Practice tips"], ["availability", "Availability"], ["faq", "FAQ"]];
  const panel = "mt-8 scroll-mt-28 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8";
  return <div className="container mx-auto max-w-5xl px-4 py-10">
    <nav aria-label="Breadcrumb" className="flex gap-3 text-sm text-muted"><Link href="/">Home</Link><span>/</span><Link href="/styles">Styles</Link><span>/</span><span className="text-white">{style.name}</span></nav>
    <header className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">{guide.label}</p>
      <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">{style.name} Style Guide &amp; Community Stats</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{guide.intro}</p>
      {slug === "jinko" && <div className="mt-5 rounded-2xl border border-accent-teal/30 bg-accent-teal/10 p-4"><p className="font-semibold text-accent-teal">Update 90 return · October 3–17, 2026</p><p className="mt-2 text-sm leading-6 text-slate-200">Jinko is available until October 17. An exact closing time has not been announced.</p></div>}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">{sections.map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border border-border px-4 py-2 text-sm text-slate-200 transition hover:border-accent-teal hover:text-white">{label}</a>)}</nav>
    </header>

    {slug === "jinko" && <section id="mastery" className={panel}>
      <h2 className="text-2xl font-heading font-bold text-white">Jinko Mastery rewards</h2>
      <p className="mt-3 leading-7 text-muted">Complete quests with Jinko to unlock five reward levels, including an emote, Lucky Style Spins, a player card and a title.</p>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-border"><table className="w-full text-left text-sm"><thead className="bg-background/60 text-muted"><tr><th scope="col" className="px-4 py-3">Level</th><th scope="col" className="px-4 py-3">Reward</th></tr></thead><tbody className="divide-y divide-white/10">{jinkoMasteryRewards.map((reward,index) => <tr key={reward}><th scope="row" className="px-4 py-4 font-semibold text-accent-teal">{index + 1}</th><td className="px-4 py-4 text-slate-200">{reward}</td></tr>)}</tbody></table></div>
      <Link href="/updates/update-90" className="mt-4 inline-block text-accent-teal underline">Read the Update 90 changes</Link>
    </section>}

    <section id="mechanic" className={panel}>
      <h2 className="text-2xl font-heading font-bold text-white">{guide.mechanic}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{guide.cards.map(([title,body]) => <div key={title} className="rounded-2xl border border-border bg-background/60 p-5"><h3 className="font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-muted">{body}</p></div>)}</div>
    </section>

    <section id="stats" className={panel}>
      <h2 className="text-2xl font-heading font-bold text-white">{style.name} stats</h2>
      <p className="mt-3 text-sm leading-6 text-muted">Community-reported stats recorded in July 2026. Later balance changes may affect these values.</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{Object.entries(style.stats ?? {}).map(([label,value]) => <div key={label} className="rounded-2xl border border-border bg-background/60 p-4"><dt className="text-sm text-muted">{label}</dt><dd className="mt-2 text-2xl font-bold text-white">{value}%</dd></div>)}</dl>
      <p className="mt-4 text-sm leading-7 text-muted">{guide.statsNote} Attribute percentages are not success probabilities.</p>
    </section>

    <section id="practice" className={panel}>
      <h2 className="text-2xl font-heading font-bold text-white">Practicing with {style.name}</h2>
      <ol className="mt-5 space-y-4 text-muted">{guide.practice.map(([title,body],index) => <li key={title} className="leading-7"><strong className="text-white">{index + 1}. {title}</strong> {body}</li>)}</ol>
    </section>

    {slug === "feiko" && <section id="availability" className={panel}>
      <h2 className="text-2xl font-heading font-bold text-white">Getting Feiko and past returns</h2>
      <p className="mt-4 leading-7 text-muted">Feiko is a limited style. Check that it appears in the current in-game style selection before spending spins.</p>
      <div className="mt-5 rounded-2xl border border-border bg-background/60 p-5"><h3 className="font-semibold text-white">Update 72 return</h3><p className="mt-2 text-sm leading-7 text-muted">Feiko returned on May 30, 2026. Check the in-game style selection for current availability.</p></div>
      <Link href="/style-return-dates" className="mt-5 inline-block font-semibold text-accent-teal underline">View style return history</Link>
    </section>}

    <section id="faq" className={panel}>
      <h2 className="text-2xl font-heading font-bold text-white">{style.name} FAQ</h2>
      <div className="mt-5 space-y-3">{guide.faqs.map(([question,answer]) => <details key={question} className="rounded-2xl border border-border bg-background/60 p-4"><summary className="cursor-pointer font-semibold text-white">{question}</summary><p className="mt-3 text-sm leading-7 text-muted">{answer}</p></details>)}</div>
    </section>
  </div>;
}
