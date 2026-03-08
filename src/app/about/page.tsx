import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Volleyball Legends Wiki",
  description:
    "About Volleyball Legends Wiki, a fan-made search-first hub for codes, styles, abilities, and update tracking.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-[2rem] border border-border bg-surface/80 p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          About Volleyball Legends Wiki
        </h1>
        <p className="mt-5 text-base leading-7 text-muted md:text-lg">
          Volleyball Legends Wiki is a fan-made content and tools hub built around the search intents players already have: codes, styles, abilities, tier lists, update pages, and lightweight decision tools.
        </p>
        <p className="mt-4 text-sm leading-7 text-muted">
          The site deliberately separates <strong className="text-white">official links</strong> from <strong className="text-white">community-confirmed notes</strong> and <strong className="text-white">site-generated tools</strong>. That source labeling is the main quality control system for the entire project.
        </p>
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-background/65 p-6 text-sm leading-6 text-muted">
          Volleyball Legends Wiki is not affiliated with Roblox, the Volleyball Legends developers, Fandom, or any third-party community tracker.
        </div>
      </div>
    </div>
  );
}
