import Link from "next/link";

const stats = { Block: 0, Jump: 100, Speed: 70, Bump: 40, Serve: 80, Set: 20, Spike: 100, Dive: 70, Tilt: 100 };
const sections = [["mechanic", "Super Tilt"], ["stats", "Stats"], ["practice", "Practice tips"], ["availability", "Availability"], ["faq", "FAQ"]];

export function KijoGuide() {
  return <div className="container mx-auto max-w-5xl px-4 py-10">
    <nav aria-label="Breadcrumb" className="flex gap-3 text-sm text-muted"><Link href="/">Home</Link><span>/</span><Link href="/styles">Styles</Link><span>/</span><span className="text-white">Kijo</span></nav>
    <header className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Secret · Spiker · Super Tilt</p>
      <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">Kijo Style Guide &amp; Community Stats</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">Kijo is a Secret style in Volleyball Legends built around charged Super Tilts. Holding a tilt direction charges a wider left or right shot, giving you another way to change your attack angle.</p>
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">{sections.map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border border-border px-4 py-2 text-sm text-slate-200 transition hover:border-accent-teal hover:text-white">{label}</a>)}</nav>
    </header>

    <section id="mechanic" className="mt-8 scroll-mt-28 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <h2 className="text-2xl font-heading font-bold text-white">How Kijo’s Super Tilt works</h2>
      <p className="mt-4 leading-7 text-muted">Hold a tilt direction to charge a Super Tilt. The charged shot sends the ball farther to the left or right than a regular tilt. Direction and timing are the core skills to practice.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-accent-teal/20 bg-accent-teal/5 p-5"><h3 className="font-semibold text-white">Change the angle</h3><p className="mt-2 text-sm leading-6 text-muted">Kijo’s distinctive mechanic is the wider sideways trajectory of a charged tilt.</p></div>
        <div className="rounded-2xl border border-border bg-background/60 p-5"><h3 className="font-semibold text-white">Learn the placement</h3><p className="mt-2 text-sm leading-6 text-muted">Practice where charged shots land so you can choose an angle that stays inside the court.</p></div>
      </div>
    </section>

    <section id="stats" className="mt-8 scroll-mt-28 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <h2 className="text-2xl font-heading font-bold text-white">Kijo stats</h2>
      <p className="mt-3 text-sm leading-6 text-muted">Community-reported stats from Update 75. Later balance changes may affect these values.</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{Object.entries(stats).map(([label,value]) => <div key={label} className="rounded-2xl border border-border bg-background/60 p-4"><dt className="text-sm text-muted">{label}</dt><dd className="mt-2 text-2xl font-bold text-white">{value}%</dd></div>)}</dl>
      <p className="mt-4 text-sm leading-6 text-muted">The reported sheet emphasizes Spike, Jump and Tilt, with much lower Block and Set values. Attribute percentages are not success probabilities.</p>
    </section>

    <section id="practice" className="mt-8 scroll-mt-28 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <h2 className="text-2xl font-heading font-bold text-white">Practicing with Kijo</h2>
      <p className="mt-3 leading-7 text-muted">If you enjoy attacking through different angles, start with shot placement before experimenting with combinations.</p>
      <ol className="mt-5 space-y-4 text-muted">
        <li><strong className="text-white">1. Compare normal and charged tilts.</strong> Practice from a similar position so you can see how charging changes the landing point.</li>
        <li><strong className="text-white">2. Practice both directions.</strong> Learn the left and right options instead of repeating the same shot.</li>
        <li><strong className="text-white">3. Choose the shot for the space.</strong> Watch the opposing court and use the angle you can place reliably.</li>
      </ol>
    </section>

    <section id="availability" className="mt-8 scroll-mt-28 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <h2 className="text-2xl font-heading font-bold text-white">Getting Kijo and past returns</h2>
      <p className="mt-4 leading-7 text-muted">Kijo is a limited style. Before spending spins, check that Kijo appears in the current in-game style selection.</p>
      <div className="mt-5 rounded-2xl border border-border bg-background/60 p-5"><h3 className="font-semibold text-white">Update 75 return</h3><p className="mt-2 text-sm leading-6 text-muted">Kijo had a one-week return in June 2026 during Update 75. This return window has ended.</p></div>
      <Link href="/style-return-dates" className="mt-5 inline-block font-semibold text-accent-teal underline">View style return history</Link>
    </section>

    <section id="faq" className="mt-8 scroll-mt-28 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <h2 className="text-2xl font-heading font-bold text-white">Kijo FAQ</h2>
      <div className="mt-5 space-y-3">{[
        ["What makes Kijo different?", "Its charged Super Tilt sends the ball farther left or right. The mechanic gives Kijo a distinct attacking option beyond a regular tilt."],
        ["Is Kijo worth keeping?", "Consider keeping Kijo if you enjoy practicing charged tilt attacks. If you mainly want to set or block, compare those attributes with your current style before deciding."],
        ["Can I get Kijo right now?", "Check the current in-game style selection before spending spins. The June 2026 return listed here has ended and does not establish current availability."],
        ["Does 100% Spike mean every spike scores?", "No. The percentage is an attribute value, not a scoring chance. Shot placement and the opposing defense still matter."],
      ].map(([q,a]) => <details key={q} className="rounded-2xl border border-border bg-background/60 p-4"><summary className="cursor-pointer font-semibold text-white">{q}</summary><p className="mt-3 text-sm leading-7 text-muted">{a}</p></details>)}</div>
    </section>
  </div>;
}
