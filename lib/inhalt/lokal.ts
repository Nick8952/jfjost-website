import { downloadseite } from "@/data/downloads";
import { einstellungen } from "@/data/einstellungen";
import { externeAngebote } from "@/data/externe-angebote";
import { kontaktseite } from "@/data/kontakt";
import { rechtstexte } from "@/data/rechtstexte";
import { referenzseite } from "@/data/referenzen";
import { seiten } from "@/data/seiten";
import { startseite } from "@/data/startseite";
import { teamseite } from "@/data/team";
import type { Inhaltsquelle } from "./typen";

/**
 * Lokale Inhaltsquelle: liest die versionierten Dateien unter data/.
 * Das ist die Quelle der Demo auf GitHub Pages. Sie braucht weder Netz noch
 * Umgebungsvariablen. Die Sanity-Quelle (sanity/inhaltsquelle.ts) liefert
 * dieselben Typen aus dem CMS.
 */
export const lokaleInhaltsquelle: Inhaltsquelle = {
  async einstellungen() {
    return einstellungen;
  },
  async startseite() {
    return startseite;
  },
  async seite(slug) {
    return seiten.find((seite) => seite.slug === slug) ?? null;
  },
  async seitenSlugs() {
    return seiten.map((seite) => seite.slug);
  },
  async team() {
    return teamseite;
  },
  async referenzen() {
    return referenzseite;
  },
  async downloads() {
    return downloadseite;
  },
  async kontakt() {
    return kontaktseite;
  },
  async externeAngebote() {
    return externeAngebote;
  },
  async rechtstext(art) {
    const text = rechtstexte.find((eintrag) => eintrag.art === art);
    if (!text) throw new Error(`Rechtstext «${art}» fehlt in data/rechtstexte.ts.`);
    return text;
  },
};
