import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Volleyball Legends Wiki",
  description:
    "About Volleyball Legends Wiki, a fan-made reference for codes, styles, abilities, return history, and update tracking.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-[2rem] border border-border bg-surface/80 p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          About Volleyball Legends Wiki
        </h1>
        <p className="mt-5 text-base leading-7 text-muted md:text-lg">
          Volleyball Legends Wiki is a fan-made reference for players checking codes, styles, abilities, tier lists, updates, and limited-return history.
        </p>
        <p className="mt-4 text-sm leading-7 text-muted">
          The site deliberately separates <strong className="text-white">official links</strong> from <strong className="text-white">community-confirmed notes</strong> and <strong className="text-white">site-generated tools</strong>. That source labeling is the main quality control system for the entire project.
        </p>
        <section className="mt-8 rounded-[2rem] border border-white/10 bg-background/65 p-6">
          <h2 className="text-2xl font-heading font-bold text-white">How entries are labeled</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
            <li><strong className="text-white">Official:</strong> developer, Roblox, or official Discord information.</li>
            <li><strong className="text-white">Community verified:</strong> a dated player-report snapshot corroborated by more than one public source.</li>
            <li><strong className="text-white">Review required:</strong> historical information that needs an in-game or official recheck before it is treated as current.</li>
            <li><strong className="text-white">Site-maintained:</strong> tier, build, and calculator guidance that explains its assumptions instead of presenting community judgment as fact.</li>
          </ul>
        </section>
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-background/65 p-6 text-sm leading-6 text-muted">
          Volleyball Legends Wiki is not affiliated with Roblox, the Volleyball Legends developers, Fandom, or any third-party community tracker.
        </div>
      </div>
    </div>
  );
}
