import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volleyball Legends Tier List",
  description:
    "Volleyball Legends tier list hub for styles, abilities, and role-based rankings built from community notes and site-maintained grouping.",
};

export default function TierListLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
