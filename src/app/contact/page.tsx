import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Volleyball Legends Wiki",
  description:
    "Contact Volleyball Legends Wiki for data corrections, update tips, or feedback about the site structure and tools.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-[2rem] border border-border bg-surface/80 p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">
          Contact
        </h1>
        <p className="mt-5 text-base leading-7 text-muted md:text-lg">
          For corrections, partnership questions, or update tips, email:
        </p>
        <a
          href="mailto:hello@volleyballlegends.wiki"
          className="mt-4 inline-block text-2xl font-semibold text-accent-orange underline"
        >
          hello@volleyballlegends.wiki
        </a>
        <ul className="mt-8 space-y-3 text-sm leading-6 text-muted">
          <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Data corrections for styles, abilities, codes, or update pages.</li>
          <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Suggestions for new landing pages, tools, or keyword clusters.</li>
          <li className="rounded-2xl border border-white/10 bg-background/65 px-4 py-3">Feedback on source labeling when a page feels too official or not verified enough.</li>
        </ul>
      </div>
    </div>
  );
}
