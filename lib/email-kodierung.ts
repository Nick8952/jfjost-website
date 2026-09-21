/**
 * Kodiert eine E-Mail-Adresse für components/EmailKnopf.tsx: Zeichen umkehren,
 * dann Base64. Läuft auf dem Server (Buffer), die Umkehrung im Browser.
 */
export function emailKodieren(adresse: string): string {
  return Buffer.from(Array.from(adresse).reverse().join(""), "utf8").toString("base64");
}
