import { permanentRedirect, notFound } from "next/navigation";
import { getAbility } from "@/data/volleyball";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacySubAbilityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ability = getAbility(slug);

  if (!ability) {
    notFound();
  }

  permanentRedirect(`/abilities/${ability.slug}`);
}
