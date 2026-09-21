import type { Metadata } from "next";
import { absolut } from "./seite-url";

/**
 * Seitenmetadaten mit seitenspezifischem Canonical und Open-Graph-Adresse.
 * Das Open-Graph-Bild wird ausdrücklich gesetzt, weil ein `openGraph`-Objekt in
 * einer Unterseite das dateibasierte Bild des Wurzel-Layouts nicht erbt.
 */
export function seitenMetadaten(titel: string, beschreibung: string, pfad: string): Metadata {
  const url = absolut(pfad);
  return {
    title: titel,
    description: beschreibung,
    alternates: { canonical: url },
    openGraph: { title: titel, description: beschreibung, url, images: [{ url: absolut("/opengraph-image.png"), width: 1200, height: 630 }] },
  };
}
