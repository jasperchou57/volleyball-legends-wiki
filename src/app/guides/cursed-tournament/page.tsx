import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Volleyball Legends Cursed Tournament: Times & Rewards",
  description: "Find Cursed Tournament gate times, 1v1 rules, retries, Challenger Token rewards, and shop prices in Volleyball Legends, including the event deadlines.",
  alternates: { canonical: "/guides/cursed-tournament" },
};

const prizes = [
  ["Top 1", "Cursed Top 1 title (Secret), Cursed 1 Flame Jersey, and a custom player card made by the developers."],
  ["Top 100", "Cursed Top 100 title, Cursed 100 Flame Jersey, and The Cursed 100 score effect."],
  ["Top 1K", "Cursed Top 1K title, Cursed 1K Flame Jersey, and Ghost Skull ball."],
  ["Top 10K", "Cursed Top 10K title."],
];
const shop = [
  ["The Beat of Madness score effect", "16,000"],
  ["Cosmic Horror player card", "10,000"],
  ["Soul Catch emote", "6,000"],
  ["BOO / EVIL titles", "3,000 each"],
  ["The Ancient One ball", "1,500"],
  ["Lucky Style Spins (1 / 3 / 5 / 10)", "From 400"],
  ["Lucky Ability Spins (1 / 3 / 5 / 10)", "From 300"],
  ["Gems (250 / 500 / 1,000)", "From 700"],
];
const sectionClass = "mt-8 scroll-mt-44 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8";

export default function CursedTournamentPage() {
  return <div className="container mx-auto max-w-5xl px-4 py-10">
    <nav aria-label="Breadcrumb" className="flex flex-wrap gap-3 text-sm text-muted"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span className="text-white">Cursed Tournament</span></nav>
    <header className="mt-6 rounded-[2rem] border border-border bg-surface/80 p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">Update 93 · October 24, 2026</p>
      <h1 className="mt-4 text-4xl font-heading font-black text-white md:text-5xl">Volleyball Legends Cursed Tournament</h1>
      <p className="mt-5 text-lg leading-8 text-muted">Enter the Cursed Portal in the lobby during an open gate to play 1v1 matches. Wins earn Challenger Tokens for the event leaderboard and the Tournament Shop.</p>
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">{[["schedule", "Gate times"], ["enter", "How to enter"], ["rules", "Rules & retries"], ["tokens", "Tokens"], ["rewards", "Prizes"], ["shop", "Shop"]].map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border border-border px-4 py-2 text-sm text-slate-200 hover:border-accent-teal">{label}</a>)}</nav>
    </header>
    <section id="schedule" className={sectionClass}>
      <h2 className="text-2xl font-heading font-bold text-white">Cursed Tournament times</h2>
      <p className="mt-3 text-sm leading-7 text-muted">All times below are US Eastern Time (ET). The tournament runs from October 24 at 11:30 AM to October 31, 2026 at 11:30 AM.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-accent-teal/20 bg-accent-teal/10 p-5"><h3 className="font-semibold text-white">Morning gate</h3><p className="mt-2 text-2xl font-bold text-accent-teal">6:00–8:00 AM ET</p></div>
        <div className="rounded-2xl border border-accent-orange/20 bg-accent-orange/10 p-5"><h3 className="font-semibold text-white">Evening gate</h3><p className="mt-2 text-2xl font-bold text-accent-orange">6:00–8:00 PM ET</p></div>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">Gates open twice daily for two hours during the tournament. The first gate is October 24 at 6:00 PM ET; the last scheduled gate is October 31 at 6:00 AM ET.</p>
      <dl className="mt-5 space-y-3 text-sm leading-7"><div><dt className="font-semibold text-white">Tournament ends</dt><dd className="text-muted">October 31, 2026 · 11:30 AM ET</dd></div><div><dt className="font-semibold text-white">Shop closes</dt><dd className="text-muted">November 7, 2026 · 10:30 AM ET</dd></div><div><dt className="font-semibold text-white">Kijo return ends</dt><dd className="text-muted">November 7, 2026 · 11:30 AM ET — one hour after the shop closes.</dd></div></dl>
    </section>
    <section id="enter" className={sectionClass}>
      <h2 className="text-2xl font-heading font-bold text-white">How to enter the Cursed Tournament</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-muted"><li>Join Volleyball Legends and go to the lobby.</li><li>Find the Cursed Portal.</li><li>Enter during an open gate to start your 1v1 run.</li></ol>
      <p className="mt-4 text-sm leading-7 text-muted">If the gate is closed, check the next morning or evening window above.</p>
    </section>
    <section id="rules" className={sectionClass}>
      <h2 className="text-2xl font-heading font-bold text-white">Match rules and retries</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted"><li>Matches are 1v1, first to <strong className="text-white">10 points</strong>. You must win by two.</li><li>A loss gives one strike. <strong className="text-white">Three strikes end your run.</strong></li><li>Leaving a tournament match also counts as a strike.</li><li>After elimination, you get <strong className="text-white">one free retry per gate</strong>. You can also buy back in for 2,000 Gems.</li><li>If you are out when a new gate opens, you receive a fresh run automatically.</li></ul>
    </section>
    <section id="tokens" className={sectionClass}>
      <h2 className="text-2xl font-heading font-bold text-white">Challenger Tokens and leaderboard scoring</h2>
      <p className="mt-4 text-sm leading-7 text-muted">Every win earns Challenger Tokens. Bigger bonus payouts come at 5, 10, 15, 20, 25, 30, and 40 wins.</p>
      <p className="mt-3 text-sm leading-7 text-muted">Your leaderboard score is the total tokens earned across the whole tournament. Retrying does not erase that score. Spending tokens in the shop does not subtract from the total you earned.</p>
    </section>
    <section id="rewards" className={sectionClass}>
      <h2 className="text-2xl font-heading font-bold text-white">Leaderboard rewards</h2>
      <p className="mt-3 text-sm leading-7 text-muted">Placement rewards stack. A Top 100 finish also earns the Top 1K and Top 10K rewards.</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">{prizes.map(([rank, reward]) => <div key={rank} className="rounded-2xl border border-border bg-background/60 p-5"><dt className="text-lg font-bold text-accent-teal">{rank}</dt><dd className="mt-3 text-sm leading-7 text-muted">{reward}</dd></div>)}</dl>
    </section>
    <section id="shop" className={sectionClass}>
      <h2 className="text-2xl font-heading font-bold text-white">Tournament Shop prices</h2>
      <p className="mt-3 text-sm leading-7 text-muted">All prices use Challenger Tokens. Stock is limited, and the shop closes November 7, 2026 at 10:30 AM ET. Spend your tokens before then: they reset with the next tournament.</p>
      <table className="mt-5 w-full text-left text-sm"><caption className="sr-only">Cursed Tournament Shop items and Challenger Token prices</caption><thead className="border-b border-border text-slate-200"><tr><th scope="col" className="py-3 pr-4">Reward</th><th scope="col" className="py-3">Tokens</th></tr></thead><tbody>{shop.map(([item, cost]) => <tr key={item} className="border-b border-border/60"><th scope="row" className="py-4 pr-4 font-normal leading-6 text-muted">{item}</th><td className="py-4 font-semibold text-white">{cost}</td></tr>)}</tbody></table>
      <p className="mt-4 text-sm leading-7 text-muted">“From” prices are the starting cost. Check each pack’s price in the shop before buying.</p>
    </section>
    <footer className="mt-8 flex flex-wrap gap-4 text-sm"><Link href="/updates/update-93" className="text-accent-teal underline underline-offset-4">Update 93 patch notes</Link><Link href="/styles/kijo" className="text-accent-teal underline underline-offset-4">Kijo return and skills</Link><Link href="/guides/player-cards" className="text-accent-teal underline underline-offset-4">Player card rewards</Link></footer>
  </div>;
}
