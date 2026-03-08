import { permanentRedirect } from "next/navigation";

export default function LegacyPrestigeGuidePage() {
  permanentRedirect("/guides/ranks");
}
