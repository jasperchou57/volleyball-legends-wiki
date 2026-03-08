import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for using Volleyball Legends Wiki and its community-maintained tools.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-[2rem] border border-border bg-surface/80 p-8">
        <h1 className="text-4xl font-heading font-black text-white md:text-5xl">Terms of Service</h1>
        <p className="mt-5 text-sm leading-7 text-muted">
          Volleyball Legends Wiki is a fan-made informational site. The content is provided as-is, especially where pages rely on community-maintained data such as pity notes, stat sheets, and tier lists.
        </p>
        <p className="mt-4 text-sm leading-7 text-muted">
          By using the site, you agree that gameplay advice, codes, and update summaries may change quickly and should be verified through official sources where possible. Roblox and Volleyball Legends remain the property of their respective owners.
        </p>
      </div>
    </div>
  );
}
