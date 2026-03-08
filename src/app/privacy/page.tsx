import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Volleyball Legends Wiki. Learn how analytics, cookies, local tools, and contact requests are handled.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-[2rem] border border-border bg-surface/80 p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">Privacy Policy</h1>
        <p className="mt-5 text-sm leading-7 text-muted">
          Last updated: March 8, 2026
        </p>
        <p className="mt-5 text-sm leading-7 text-muted">
          Volleyball Legends Wiki uses standard analytics and browser storage features to improve the site experience. Tool outputs like compare choices or reroll inputs are intended to stay local in your browser unless a future feature explicitly says otherwise.
        </p>
        <p className="mt-4 text-sm leading-7 text-muted">
          If you contact the site directly, your email is only used to reply to that request. External links such as Discord, Roblox, Fandom, or guide sites follow their own privacy rules once you leave this domain.
        </p>
      </div>
    </div>
  );
}
