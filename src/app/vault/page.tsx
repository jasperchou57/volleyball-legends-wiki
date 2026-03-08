import { permanentRedirect } from "next/navigation";

export default function LegacyVaultPage() {
  permanentRedirect("/tools");
}
