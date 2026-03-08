import { permanentRedirect } from "next/navigation";

export default function LegacyFightingStyleDetailPage() {
  permanentRedirect("/styles");
}
