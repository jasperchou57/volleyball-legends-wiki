import { permanentRedirect } from "next/navigation";

export default function LegacySubAbilitiesPage() {
  permanentRedirect("/abilities");
}
