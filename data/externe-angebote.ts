import type { ExterneAngebote } from "@/lib/inhalt/typen";

/**
 * Führende Quelle für Miet- und Kaufangebote ist und bleibt Homegate. Die
 * bisherige Website bindet dort dieselben Trefferlisten als <iframe> ein
 * (/de/mieten, /de/kaufen). Diese Demo lädt die Einbettung erst nach
 * Einwilligung und zeigt daneben immer den direkten Link.
 *
 * Es werden keine Inserate kopiert, keine Preise und keine Verfügbarkeiten
 * hinterlegt. Änderungen an den Adressen nur nach Rücksprache mit J.F. Jost & Co
 * (der Parameter a=jos kennzeichnet den Anbieter bei Homegate).
 */
export const externeAngebote: ExterneAngebote = {
  anbieter: "homegate.ch",
  anbieterDatenschutz: "https://privacy.swissmarketplace.group/de/",
  mieten: {
    url: "https://www.homegate.ch/mieten/alle-mietinserate/trefferliste?a=jos&incsubs=1",
    einbettungAktiv: true,
    titel: "Aktuelle Mietangebote",
    text: "Alle zurzeit ausgeschriebenen Wohnungen und Geschäftsflächen von J.F. Jost & Co, gepflegt auf homegate.ch. Angebote, Preise und Verfügbarkeiten stammen direkt von dort.",
  },
  kaufen: {
    url: "https://www.homegate.ch/kaufen/alle-kaufinserate/trefferliste?a=jos",
    einbettungAktiv: true,
    titel: "Aktuelle Kaufangebote",
    text: "Alle zurzeit ausgeschriebenen Kaufobjekte von J.F. Jost & Co, gepflegt auf homegate.ch. Angebote, Preise und Verfügbarkeiten stammen direkt von dort.",
  },
  zuletztGeprueft: "2026-09-21",
  platzhalterTitel: "Angebote von homegate.ch anzeigen",
  platzhalterText:
    "Die Angebotsliste wird von homegate.ch geladen. Dabei werden Daten (unter anderem Ihre IP-Adresse) an homegate.ch, Cloudflare und DataDome übermittelt und Cookies dieser Anbieter gesetzt. Sie können die Angebote stattdessen direkt auf homegate.ch öffnen.",
  stoerungHinweis: "Wird die Liste nicht angezeigt? Öffnen Sie die Angebote direkt auf homegate.ch.",
};
