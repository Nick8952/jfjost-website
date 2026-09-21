import type { MetadataRoute } from "next";
import { inhalt } from "@/lib/inhalt";
import { absolut, istIndexierbar } from "@/lib/seite-url";

export const dynamic = "force-static";

/**
 * Sitemap nur für den indexierbaren Betrieb (Kundendomain). Auf der Demo mit
 * noindex bleibt sie leer, damit sie dem noindex nicht widerspricht.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!istIndexierbar) return [];
  const slugs = await inhalt.seitenSlugs();
  const routen = ["/", "/team/", "/referenzen/", "/kontakt/", "/impressum/", "/datenschutz/", "/datenschutz-einstellungen/", ...slugs.map((s) => `/${s}/`)];
  return routen.map((r) => ({ url: absolut(r), changeFrequency: "monthly", priority: r === "/" ? 1 : 0.6 }));
}
