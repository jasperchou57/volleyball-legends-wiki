import { permanentRedirect } from "next/navigation";

export default function LegacyBuildPlannerPage() {
  permanentRedirect("/tools/style-compare");
}
