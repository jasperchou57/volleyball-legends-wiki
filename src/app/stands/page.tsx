import { permanentRedirect } from "next/navigation";

export default function LegacyStandsPage() {
  permanentRedirect("/styles");
}
