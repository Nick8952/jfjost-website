import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bausteine } from "@/components/Bausteine";
import { Seitenkopf } from "@/components/Seitenkopf";
import { inhalt } from "@/lib/inhalt";
import { absolut } from "@/lib/seite-url";

type Props = { params: Promise<{ slug: string }> };

/** Alle Baustein-Seiten sind zur Bauzeit bekannt (statischer Export). */
export async function generateStaticParams() {
  const slugs = await inhalt.seitenSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seite = await inhalt.seite(slug);
  if (!seite) return {};
  return { title: seite.seo.titel, description: seite.seo.beschreibung, alternates: { canonical: absolut(`/${slug}/`) }, openGraph: { title: seite.seo.titel, description: seite.seo.beschreibung } };
}

export default async function Bausteinseite({ params }: Props) {
  const { slug } = await params;
  const seite = await inhalt.seite(slug);
  if (!seite) notFound();
  const [downloads, angebote] = await Promise.all([inhalt.downloads(), inhalt.externeAngebote()]);
  return (
    <>
      <Seitenkopf kopf={seite.kopf} />
      <Bausteine bausteine={seite.bausteine} kontext={{ downloads: downloads.downloads, angebote }} />
    </>
  );
}
