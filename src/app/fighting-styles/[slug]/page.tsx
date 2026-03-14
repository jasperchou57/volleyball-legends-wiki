import { permanentRedirect, notFound } from "next/navigation";
import { getStyle } from "@/data/volleyball";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyFightingStyleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const style = getStyle(slug);

  if (!style) {
    notFound();
  }

  permanentRedirect(`/styles/${style.slug}`);
}
