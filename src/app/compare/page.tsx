import { permanentRedirect } from "next/navigation";

export default function LegacyComparePage() {
  permanentRedirect("/tools/style-compare");
}
