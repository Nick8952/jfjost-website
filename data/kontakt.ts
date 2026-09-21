import type { Kontaktseite } from "@/lib/inhalt/typen";

/** Quelle: www.jfjost.ch/de/kontakt (Text, Öffnungszeiten, Anliegen des Kontaktformulars). */
export const kontaktseite: Kontaktseite = {
  seo: {
    titel: "Kontakt",
    beschreibung: "J.F. Jost & Co, Steinwiesenstrasse 3, 8952 Schlieren. Telefon 044 755 53 53. Öffnungszeiten, Anfahrt und Kontaktformular.",
  },
  kopf: {
    kicker: "Kontakt",
    titel: "Wir sind für Sie da",
    einleitung:
      "Haben Sie Fragen zu unserem Angebot und unseren Dienstleistungen, oder suchen Sie ein ganz bestimmtes Objekt oder Ihre Traumwohnung? Zögern Sie nicht, uns zu kontaktieren. Wir stehen Ihnen zur Verfügung und helfen gerne weiter.",
  },
  anliegen: ["Mieten", "Kaufen", "Jobs", "Baudienstleistungen"],
  formularHinweis:
    "«E-Mail vorbereiten» öffnet Ihr E-Mail-Programm mit einer vorbereiteten Nachricht an info@jfjost.ch. Es wird nichts automatisch versendet: Sie prüfen die Nachricht und senden sie selbst. Unterlagen wie Ausweiskopien oder Lohnnachweise gehören nicht in dieses Formular, sondern zur schriftlichen Anmeldung.",
  karteHinweis:
    "Die Karte wird von Google Maps geladen. Dabei werden Daten (unter anderem Ihre IP-Adresse) an Google übermittelt. Alternativ können Sie die Route direkt in Google Maps öffnen.",
};
