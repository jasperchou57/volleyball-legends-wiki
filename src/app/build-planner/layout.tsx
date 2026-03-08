import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legacy Redirect",
  description: "Legacy route redirect.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BuildPlannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
