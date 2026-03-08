import { permanentRedirect } from "next/navigation";

export default function LegacyLevelingGuidePage() {
  permanentRedirect("/guides/beginner");
}
