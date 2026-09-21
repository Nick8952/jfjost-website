import { bildmanifest } from "@/lib/bilder/manifest";
import type { Bild } from "./typen";

/**
 * Bild aus dem zur Bauzeit erzeugten Manifest (scripts/bilder-aufbereiten.mjs).
 * Wirft beim Build, wenn eine ID fehlt: lieber ein Build-Fehler als ein leeres Bild.
 */
export function bild(id: string, alt: string, legende?: string): Bild {
  const eintrag = bildmanifest[id];
  if (!eintrag) throw new Error(`Bild «${id}» fehlt im Manifest. Zuerst «npm run bilder» ausführen oder die ID in scripts/bilder-aufbereiten.mjs prüfen.`);
  return {
    src: eintrag.standard,
    breite: eintrag.breite,
    hoehe: eintrag.hoehe,
    alt,
    varianten: eintrag.varianten,
    unschaerfe: eintrag.unschaerfe,
    absolut: false,
    ...(legende ? { legende } : {}),
  };
}
