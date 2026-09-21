import { basisPfad } from "./pfade";

/**
 * Öffentliche Basisadresse der Website, inklusive Repository-Unterpfad auf
 * GitHub Pages. Für absolute Adressen in Metadaten (Canonical, Open Graph, JSON-LD).
 *
 * Reihenfolge:
 *   1. NEXT_PUBLIC_SITE_URL, falls nicht leer (Kundendomain oder Vercel-Adresse)
 *   2. Vercels eigene Variablen (VERCEL_PROJECT_PRODUCTION_URL, VERCEL_URL)
 *   3. GitHub Pages
 *
 * Eine leere Variable gilt als nicht gesetzt (Vercel liefert leer angelegte
 * Variablen als ""). Fehlt das Protokoll, wird https ergänzt.
 */
function ursprungErmitteln(): string {
  const kandidaten = [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL, process.env.VERCEL_URL];
  for (const kandidat of kandidaten) {
    const wert = kandidat?.trim();
    if (!wert) continue;
    const mitProtokoll = /^https?:\/\//i.test(wert) ? wert : `https://${wert}`;
    try {
      return new URL(mitProtokoll).origin;
    } catch {
      // ungültig, nächsten Kandidaten versuchen
    }
  }
  return "https://nick8952.github.io";
}

const ursprung = ursprungErmitteln();

/** Adresse der Startseite, mit Unterpfad und Schrägstrich am Ende. */
export const seiteUrl = new URL(`${ursprung}${basisPfad}/`);

/**
 * Für Nexts `metadataBase` OHNE Unterpfad: Die dateibasierten Metadaten
 * (app/opengraph-image.png, app/icon.png) hängen den basePath selbst an.
 */
export const metadatenBasis = new URL(`${ursprung}/`);

/** Absolute Adresse einer Route oder Datei unterhalb der Website. */
export function absolut(pfad: string): string {
  return new URL(pfad.replace(/^\//, ""), seiteUrl).toString();
}

/**
 * Die Verkaufs-Demo bleibt unsichtbar für Suchmaschinen (noindex). Erst auf der
 * Kundendomain wird NEXT_PUBLIC_INDEXIEREN=ja gesetzt; dann fallen noindex weg
 * und sitemap.xml wird ausgeliefert (docs/umstellungs-checkliste.md).
 */
export const istIndexierbar = (process.env.NEXT_PUBLIC_INDEXIEREN ?? "").trim().toLowerCase() === "ja";
