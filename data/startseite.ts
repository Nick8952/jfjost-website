import { bild } from "@/lib/inhalt/bild";
import type { Startseite } from "@/lib/inhalt/typen";

/**
 * Quelle: www.jfjost.ch/de/home (Slider mit 7 Motiven und Titeln), /de/unternehmen
 * (Geschichte), /de/kaufen (Dienstleistungsumfang). Die Slider-Titel sind
 * wörtlich übernommen, nur Rechtschreibung korrigiert («Idylisch», «renovierten»).
 * Die Motive sind Liegenschaften aus dem Umfeld des Unternehmens – sie sind
 * KEINE aktuellen Angebote und tragen deshalb weder Preise noch Verfügbarkeit.
 */
export const startseite: Startseite = {
  seo: {
    titel: "J.F. Jost & Co – Immobilien und Bau in Schlieren",
    beschreibung:
      "Familienunternehmen seit 1929: Liegenschaftenverwaltung, Wohnungen und Geschäftsflächen zur Miete, Kauf und Verkauf sowie eigene Bauabteilung für Renovationen und Sanierungen im Grossraum Zürich.",
  },
  hero: {
    titel: "Bauen, vermieten, verwalten. Seit 1929 in Schlieren.",
    untertitel:
      "J.F. Jost & Co ist ein Familienunternehmen in dritter Generation. Wir bewirtschaften Wohn- und Geschäftsliegenschaften, vermitteln Miet- und Kaufobjekte und führen mit unserer eigenen Bauabteilung Renovationen, Umbauten und Sanierungen aus – von der Badezimmer-Renovation bis zur Gesamtsanierung.",
    bild: bild("start-hofackerstrasse", "Gelb verputztes Mehrfamilienhaus in Dietikon mit Bäumen davor, aufgenommen bei Sonnenschein"),
    aktionen: [
      { text: "Mietangebote ansehen", ziel: "/mieten/" },
      { text: "Kaufangebote ansehen", ziel: "/kaufen/" },
      { text: "Renovationen", ziel: "/renovationen/" },
    ],
  },
  liegenschaften: {
    kicker: "Liegenschaften",
    titel: "Aus unserem Umfeld",
    bilder: [
      { bild: bild("start-lilie", "Lilie Shoppingpoint in Schlieren, Gebäudefassade mit Geschäftslogos"), titel: "Unser Shoppingpoint mit 25 Geschäften in Schlieren", ort: "Lilie Shoppingpoint, Schlieren" },
      { bild: bild("start-baechaustrasse", "Reiheneinfamilienhäuser mit Dachterrassen und Garten in Bäch am Zürichsee"), titel: "Unsere exklusiven Reiheneinfamilienhäuser direkt am Zürichsee in Bäch", ort: "Bäch" },
      { bild: bild("start-am-furtbach", "Wohnhaus am Furtbach in Adlikon mit Teich und Steg im Vordergrund"), titel: "Familienfreundliche Wohnungen in Adlikon b. Regensdorf", ort: "Adlikon bei Regensdorf" },
      { bild: bild("start-hofackerstrasse", "Gelbes Mehrfamilienhaus in Dietikon"), titel: "Unsere grosszügigen und sonnigen Wohnungen in Dietikon", ort: "Dietikon" },
      { bild: bild("start-langackerstrasse", "Mehrfamilienhaus mit Balkonen und Hecken in Schlieren"), titel: "Idyllisch gelegene und frisch renovierte Wohnungen in Schlieren", ort: "Schlieren" },
      { bild: bild("start-kueche-mattenweg", "Moderne weisse Küche mit dunkler Arbeitsfläche und Fenster"), titel: "Schöner kochen" },
      { bild: bild("start-dusche-uetliberg", "Geflieste Dusche mit Glaswand und Regendusche"), titel: "Gönnen Sie sich eine Dusche wie ein schöner Sommerregen" },
    ],
  },
  bereiche: {
    kicker: "Angebot",
    titel: "Vier Wege zu uns",
    teaser: [
      {
        titel: "Mieten",
        text: "Wohn- und Geschäftsflächen zur Miete – für jeden Bedarf, mit Beratung durch unsere Immobilienbewirtschaftung.",
        ziel: "/mieten/",
        aktion: "Mietangebote ansehen",
      },
      {
        titel: "Kaufen / Verkaufen",
        text: "Erwerb oder Verkauf von Liegenschaften jeder Art, mit Bauabteilung und Partnernetzwerk aus einer Hand.",
        ziel: "/kaufen/",
        aktion: "Kaufangebote ansehen",
      },
      {
        titel: "Renovationen & Umbau",
        text: "Unsere Bauabteilung plant und führt Renovationen, Umbauten, Fassaden- und Betonsanierungen sowie Abdichtungen aus.",
        ziel: "/renovationen/",
        aktion: "Bauleistungen ansehen",
      },
      {
        titel: "Formulare & Merkblätter",
        text: "Anmeldeformulare für Wohnung und Gewerbe sowie Merkblätter für Mieterinnen und Mieter zum Herunterladen.",
        ziel: "/formulare/",
        aktion: "Formulare herunterladen",
      },
    ],
  },
  geschichte: {
    kicker: "Unternehmen",
    titel: "Drei Generationen, ein Standort",
    text: "1929 gründete Johann Friedrich «Fritz» Jost in Schlieren sein Baugeschäft. Heute begleitet das Familienunternehmen im Grossraum Zürich den gesamten Lebenszyklus von Geschäfts- und Wohnliegenschaften – von der Entwicklung über die Realisierung bis zur Bewirtschaftung.",
    punkte: [
      { jahr: "1929", titel: "Gründung als «J.F. Jost Hoch- und Tiefbau»" },
      { jahr: "2000", titel: "Dritte Generation übernimmt die strategische Leitung" },
      { jahr: "2020", titel: "Diego Albertanti übernimmt die Geschäftsführung" },
      { jahr: "2024", titel: "95-jähriges Firmenjubiläum" },
    ],
    ziel: { text: "Zur Firmengeschichte", ziel: "/unternehmen/" },
  },
  abschluss: {
    _type: "handlungsaufforderung",
    _key: "start-abschluss",
    titel: "Fragen zu einem Objekt oder zu einem Bauvorhaben?",
    text: "Wir beraten Sie unverbindlich – telefonisch, per E-Mail oder persönlich an der Steinwiesenstrasse 3 in Schlieren.",
    aktionen: [
      { text: "Kontakt aufnehmen", ziel: "/kontakt/" },
      { text: "044 755 53 53", ziel: "tel:+41447555353", extern: true },
    ],
  },
};
