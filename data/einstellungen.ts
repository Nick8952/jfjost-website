import type { WebsiteEinstellungen } from "@/lib/inhalt/typen";

/**
 * Firmenangaben, Öffnungszeiten, Navigation.
 * Quellen: www.jfjost.ch (Fusszeile, /de/kontakt, /de/unternehmen), Handelsregister
 * (Zefix, Abfrage 21.09.2026: «J.F. Jost & Co KmG», CHE-105.786.236, Sitz Schlieren).
 */
export const einstellungen: WebsiteEinstellungen = {
  kontakt: {
    firma: "J.F. Jost & Co",
    firmaRegister: "J.F. Jost & Co KmG",
    uid: "CHE-105.786.236",
    strasse: "Steinwiesenstrasse 3",
    plz: "8952",
    ort: "Schlieren",
    telefon: "044 755 53 53",
    telefonLink: "tel:+41447555353",
    email: "info@jfjost.ch",
    routenLink: "https://www.google.com/maps/dir/?api=1&destination=Steinwiesenstrasse%203%2C%208952%20Schlieren",
  },
  oeffnungszeiten: [
    { tage: "Montag bis Donnerstag", zeiten: ["07.30 – 12.00 Uhr", "13.15 – 17.00 Uhr"] },
    { tage: "Freitag", zeiten: ["07.30 – 12.00 Uhr", "13.15 – 16.00 Uhr"] },
  ],
  navigation: [
    {
      text: "Immobilien",
      ziel: "/mieten/",
      unterpunkte: [
        { text: "Mieten", ziel: "/mieten/", hinweis: "Aktuelle Mietangebote" },
        { text: "Kaufen", ziel: "/kaufen/", hinweis: "Kauf und Verkauf von Liegenschaften" },
        { text: "Formulare & Downloads", ziel: "/formulare/", hinweis: "Anmeldeformulare und Merkblätter" },
      ],
    },
    {
      text: "Bau",
      ziel: "/renovationen/",
      unterpunkte: [
        { text: "Renovationen", ziel: "/renovationen/", hinweis: "Umbau, Fassaden, Bauleitung, Instandsetzung" },
        { text: "Referenzen", ziel: "/referenzen/", hinweis: "Ausgeführte Sanierungen 2017 – 2019" },
      ],
    },
    {
      text: "Über uns",
      ziel: "/unternehmen/",
      unterpunkte: [
        { text: "Unternehmen", ziel: "/unternehmen/", hinweis: "Familienunternehmen seit 1929" },
        { text: "Team", ziel: "/team/", hinweis: "Ansprechpersonen nach Abteilung" },
        { text: "Jobs", ziel: "/jobs/", hinweis: "Stellen und Lehrstellen" },
        { text: "Engagement", ziel: "/engagement/", hinweis: "Regionales und soziales Engagement" },
        { text: "Links", ziel: "/links/", hinweis: "Partner und Region" },
      ],
    },
    { text: "Kontakt", ziel: "/kontakt/" },
  ],
  fussnavigation: [
    { text: "Impressum", ziel: "/impressum/" },
    { text: "Datenschutz", ziel: "/datenschutz/" },
    { text: "Cookie-Einstellungen", ziel: "/datenschutz-einstellungen/" },
  ],
  demoHinweis:
    "Unverbindliche Design-Demo von Nick Holzbecher – nicht die offizielle Website von J.F. Jost & Co. Inhalte nach dem Stand von www.jfjost.ch am 21. September 2026.",
  mitgliedschaften: [
    "Baumeister-Verband Zürich",
    "Standortförderung Limmattal",
    "Wirtschaftskammer Schlieren",
    "Gewerbeverein Schlieren",
    "Interessengemeinschaft Rietbach",
    "Interessengemeinschaft für Bauschäden Prävention IGBP",
  ],
};
