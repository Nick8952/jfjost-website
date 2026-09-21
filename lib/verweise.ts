/**
 * Erlaubte Linkziele: interne Pfade (/…), https/http, mailto, tel. Alles andere
 * (z. B. javascript:) wird beim Rendern nicht verlinkt. Gilt für Fliesstext-Links
 * und Verweise, auch wenn sie später aus dem CMS kommen.
 */
export function zielErlaubt(ziel: string): boolean {
  return /^(\/(?!\/)|https?:\/\/|mailto:|tel:)/i.test(ziel.trim());
}
export const ZIEL_MUSTER = /^(\/(?!\/)|https?:\/\/|mailto:|tel:)/i;
