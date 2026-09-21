import type { Downloadseite } from "@/lib/inhalt/typen";

/**
 * Quelle: www.jfjost.ch/de/formulare-download (7 PDF-Dateien, Stand 21.09.2026).
 * Dateien liegen unverändert unter public/downloads/ (nur umbenannt).
 * Grössen und Seitenzahlen wurden aus den Dateien gelesen (scripts/… bzw. tests/downloads.test.mts).
 */
export const downloadseite: Downloadseite = {
  seo: {
    titel: "Formulare & Downloads",
    beschreibung: "Anmeldeformulare für Wohnungen und Geschäftsräume sowie Merkblätter für Mieterinnen und Mieter von J.F. Jost & Co als PDF.",
  },
  kopf: {
    kicker: "Immobilien",
    titel: "Formulare & Downloads",
    einleitung:
      "Anmeldeformulare für Wohn- und Geschäftsräume sowie Merkblätter für Mieterinnen und Mieter. Alle Dokumente sind PDF-Dateien zum Ausdrucken und handschriftlichen Ausfüllen.",
  },
  downloads: [
    {
      titel: "Anmeldeformular Wohnung",
      beschreibung: "Anmeldung für eine Mietwohnung. Bitte in Blockschrift ausfüllen; benötigte Beilagen stehen auf dem Formular.",
      datei: "/downloads/anmeldeformular-wohnung.pdf",
      format: "PDF",
      bytes: 22369,
      seiten: 1,
      kategorie: "formular",
    },
    {
      titel: "Anmeldeformular Gewerbe",
      beschreibung: "Anmeldung für Geschäftsräume: Ladenlokal, Büro-, Gewerbe- oder Lagerraum.",
      datei: "/downloads/anmeldeformular-gewerbe.pdf",
      format: "PDF",
      bytes: 20998,
      seiten: 1,
      kategorie: "formular",
    },
    {
      titel: "Merkblatt Energiesparen",
      beschreibung: "Raumtemperatur, Lüften, Warmwasser: einfache Massnahmen im Alltag.",
      datei: "/downloads/merkblatt-energiesparen.pdf",
      format: "PDF",
      bytes: 35974,
      seiten: 1,
      kategorie: "merkblatt",
    },
    {
      titel: "Steigende Energiepreise – Tipps für Mieter/innen",
      beschreibung: "Energie-Sparmassnahmen zu Warmwasser, Heizen und Strom.",
      datei: "/downloads/energie-sparmassnahmen-tipps.pdf",
      format: "PDF",
      bytes: 111704,
      seiten: 1,
      kategorie: "merkblatt",
    },
    {
      titel: "Merkblatt Grillieren",
      beschreibung: "Regeln zum Grillieren auf Balkonen, Terrassen und in Gartenanlagen.",
      datei: "/downloads/merkblatt-grillieren.pdf",
      format: "PDF",
      bytes: 125373,
      seiten: 2,
      kategorie: "merkblatt",
    },
    {
      titel: "Merkblatt Tierhaltung",
      beschreibung: "Was bei der Tierhaltung in Mietwohnungen gilt.",
      datei: "/downloads/merkblatt-tierhaltung.pdf",
      format: "PDF",
      bytes: 34619,
      seiten: 1,
      kategorie: "merkblatt",
    },
    {
      titel: "Merkblatt Wohnungsrückgabe",
      beschreibung: "Richtlinien für die Wohnungsabgabe am Ende des Mietverhältnisses.",
      datei: "/downloads/merkblatt-wohnungsrueckgabe.pdf",
      format: "PDF",
      bytes: 55663,
      seiten: 2,
      kategorie: "merkblatt",
    },
  ],
};
