import { permanentRedirect } from "next/navigation";

export default function LegacySubAbilityDetailPage() {
  permanentRedirect("/abilities");
}
