import { bild } from "@/lib/inhalt/bild";
import { liste, link, p } from "@/lib/inhalt/text";
import type { Referenzprojekt, Referenzseite } from "@/lib/inhalt/typen";

/**
 * Quelle: www.jfjost.ch/de/sanierung-renovation-referenzen, Stand 21.09.2026.
 * Reihenfolge, Titel, Zeiträume, Stichworte und Bildlegenden («vor / während /
 * nach der Sanierung») sind wörtlich übernommen. Die Bilder sind die
 * Originalfotos, nur skaliert und komprimiert. Es gibt keine weiteren Angaben
 * (Bauherrschaft, Kosten, Flächen) – und hier werden auch keine erfunden.
 * Alle Projekte sind historische Referenzen (2017 – 2019), keine aktuellen Angebote.
 */
const r = (id: string, alt: string, legende?: string) => bild(id, alt, legende);

const projekte: Referenzprojekt[] = [
  {
    slug: "welbrigring-geroldswil",
    titel: "Sanierung Wohnzimmer mit Naturofloor",
    ort: "Welbrigring 3, Geroldswil",
    zeitraum: "August – September 2019",
    leistungen: ["Sanierung Wohnzimmer mit Naturofloor"],
    text: [p("Naturofloor besteht zu 90 % aus natürlichen Produkten und wird für fugenlose Wand- und Bodenbeläge verwendet.")],
    bilder: [
      r("ref-32-009", "Wohnzimmer Welbrigring 3, Geroldswil, vor der Sanierung", "vor der Sanierung"),
      r("ref-32-011-2", "Wohnzimmer Welbrigring 3, Geroldswil, während der Sanierung", "während der Sanierung"),
      r("ref-32-021", "Wohnzimmer Welbrigring 3, Geroldswil, während der Sanierung", "während der Sanierung"),
      r("ref-32-009-3", "Wohnzimmer Welbrigring 3, Geroldswil, während der Sanierung", "während der Sanierung"),
      r("ref-32-046", "Wohnzimmer Welbrigring 3, Geroldswil, während der Sanierung", "während der Sanierung"),
      r("ref-32-023-2", "Wohnzimmer Welbrigring 3, Geroldswil, nach der Sanierung", "nach der Sanierung"),
      r("ref-32-052", "Wohnzimmer Welbrigring 3, Geroldswil, nach der Sanierung", "nach der Sanierung"),
      r("ref-32-033", "Wohnzimmer Welbrigring 3, Geroldswil, vor der Sanierung", "vor der Sanierung"),
      r("ref-32-044", "Wohnzimmer Welbrigring 3, Geroldswil, während der Sanierung", "während der Sanierung"),
      r("ref-32-045", "Wohnzimmer Welbrigring 3, Geroldswil, während der Sanierung", "während der Sanierung"),
      r("ref-32-024", "Wohnzimmer Welbrigring 3, Geroldswil, während der Sanierung", "während der Sanierung"),
    ],
  },
  {
    slug: "naglerwiesenstrasse-zuerich",
    titel: "Renovation Bad",
    ort: "Naglerwiesenstrasse 90, Zürich",
    zeitraum: "August – September 2019",
    leistungen: ["neues Lavabo", "neues Bad mit Dusche", "neue Böden und Wände"],
    bilder: [
      r("ref-34-002", "Bad Naglerwiesenstrasse 90, Zürich, vor der Renovation", "vor der Renovation"),
      r("ref-34-003-2", "Bad Naglerwiesenstrasse 90, Zürich, während der Renovation", "während der Renovation"),
      r("ref-34-027", "Bad Naglerwiesenstrasse 90, Zürich, während der Renovation", "während der Renovation"),
      r("ref-34-029", "Bad Naglerwiesenstrasse 90, Zürich, während der Renovation", "während der Renovation"),
      r("ref-34-052", "Bad Naglerwiesenstrasse 90, Zürich, während der Renovation", "während der Renovation"),
      r("ref-34-055", "Bad Naglerwiesenstrasse 90, Zürich, während der Renovation", "während der Renovation"),
      r("ref-34-008", "Bad Naglerwiesenstrasse 90, Zürich, nach der Renovation", "nach der Renovation"),
      r("ref-34-007", "Bad Naglerwiesenstrasse 90, Zürich, nach der Renovation", "nach der Renovation"),
      r("ref-34-005-2", "Bad Naglerwiesenstrasse 90, Zürich, nach der Renovation", "nach der Renovation"),
      r("ref-34-006", "Bad Naglerwiesenstrasse 90, Zürich, nach der Renovation", "nach der Renovation"),
    ],
  },
  {
    slug: "naturofloor",
    titel: "Zertifizierte Fachhandwerker für Naturofloor-Beläge",
    leistungen: ["Naturofloor wird für fugenlose Wand- und Bodenbeläge angewendet.", "Auch für den Nassbereich geeignet.", "Verschiedene Musterplatten sind bei uns ausgestellt."],
    text: [p("Mehr zum Material: ", link("naturofloor.ch", "https://naturofloor.ch"))],
    bilder: [
      r("ref-33-004-2", "Naturofloor-Belag, Beispiel 1"),
      r("ref-33-030-3", "Naturofloor-Belag, Beispiel 2"),
      r("ref-33-023", "Naturofloor-Belag, Beispiel 3"),
      r("ref-33-013", "Naturofloor-Belag, Beispiel 4"),
    ],
  },
  {
    slug: "bachstrasse-urdorf",
    titel: "Renovation Bad",
    ort: "Bachstrasse, Urdorf",
    zeitraum: "Mai 2019",
    leistungen: ["neues WC", "neues Lavabo", "neue Dusche", "neue Böden und Wände"],
    bilder: [
      r("ref-31-013-2", "Bad Bachstrasse, Urdorf, Ansicht 1"),
      r("ref-31-011", "Bad Bachstrasse, Urdorf, Ansicht 2"),
      r("ref-31-014", "Bad Bachstrasse, Urdorf, Ansicht 3"),
      r("ref-31-014-2", "Bad Bachstrasse, Urdorf, Ansicht 4"),
    ],
  },
  {
    slug: "wiesenstrasse-schlieren",
    titel: "Neuer Duschboden",
    ort: "Wiesenstrasse 33, Schlieren",
    zeitraum: "April 2019",
    leistungen: ["Neuer Duschboden"],
    bilder: [
      r("ref-30-042", "Duschboden Wiesenstrasse 33, Schlieren, Ansicht 1"),
      r("ref-30-040", "Duschboden Wiesenstrasse 33, Schlieren, Ansicht 2"),
      r("ref-30-039", "Duschboden Wiesenstrasse 33, Schlieren, Ansicht 3"),
      r("ref-30-041", "Duschboden Wiesenstrasse 33, Schlieren, Ansicht 4"),
      r("ref-30-044", "Duschboden Wiesenstrasse 33, Schlieren, Ansicht 5"),
    ],
  },
  {
    slug: "tiefgarage-berikon",
    titel: "Betonstützeninstandstellung",
    ort: "Tiefgarage, Berikon",
    zeitraum: "Februar 2019",
    leistungen: ["Betonstützeninstandstellung"],
    bilder: [
      r("ref-27-002", "Betonstütze Tiefgarage Berikon, Ansicht 1"),
      r("ref-27-005", "Betonstütze Tiefgarage Berikon, Ansicht 2"),
      r("ref-27-004", "Betonstütze Tiefgarage Berikon, Ansicht 3"),
      r("ref-27-013", "Betonstütze Tiefgarage Berikon, Ansicht 4"),
      r("ref-27-003", "Betonstütze Tiefgarage Berikon, Ansicht 5"),
      r("ref-27-010", "Betonstütze Tiefgarage Berikon, Ansicht 6"),
      r("ref-27-011", "Betonstütze Tiefgarage Berikon, Ansicht 7"),
      r("ref-27-012", "Betonstütze Tiefgarage Berikon, Ansicht 8"),
      r("ref-27-009", "Betonstütze Tiefgarage Berikon, Ansicht 9"),
    ],
  },
  {
    slug: "widenbuehlstrasse-unterengstringen",
    titel: "Umbau Badezimmer",
    ort: "Widenbühlstrasse 26, Unterengstringen",
    zeitraum: "September 2018",
    leistungen: ["neue Badewanne mit Dusche", "neues WC", "neues Lavabo", "neue Böden"],
    text: [p("Fotos nach dem Umbau.")],
    bilder: [
      r("ref-26-007", "Badezimmer Widenbühlstrasse 26, Unterengstringen, nach dem Umbau, Ansicht 1"),
      r("ref-26-006", "Badezimmer Widenbühlstrasse 26, Unterengstringen, nach dem Umbau, Ansicht 2"),
      r("ref-26-015", "Badezimmer Widenbühlstrasse 26, Unterengstringen, nach dem Umbau, Ansicht 3"),
      r("ref-26-014", "Badezimmer Widenbühlstrasse 26, Unterengstringen, nach dem Umbau, Ansicht 4"),
      r("ref-26-016", "Badezimmer Widenbühlstrasse 26, Unterengstringen, nach dem Umbau, Ansicht 5"),
    ],
  },
  {
    slug: "oberstufenschulhaus-weiningen",
    titel: "Belagersatz und Wandsanierung",
    ort: "Oberstufenschulhaus Weiningen",
    zeitraum: "April 2018",
    leistungen: ["Belagersatz", "Wandsanierung"],
    bilder: [
      r("ref-18-017", "Oberstufenschulhaus Weiningen, neuer Belag", "Neuer Belag"),
      r("ref-18-003", "Oberstufenschulhaus Weiningen, während der Sanierung", "Während der Sanierung"),
      r("ref-18-028", "Oberstufenschulhaus Weiningen, während der Sanierung", "Während der Sanierung"),
      r("ref-18-002", "Oberstufenschulhaus Weiningen, nach der Sanierung", "Nach der Sanierung"),
    ],
  },
  {
    slug: "farbhalde-oetwil",
    titel: "Umbau Badezimmer",
    ort: "Farbhalde 4, Oetwil",
    zeitraum: "März 2018",
    leistungen: ["neue Badewanne und Dusche", "neues Lavabo", "neue Böden"],
    text: [p("Fotos nach dem Umbau.")],
    bilder: [
      r("ref-17-021", "Badezimmer Farbhalde 4, Oetwil, nach dem Umbau, Ansicht 1"),
      r("ref-17-022", "Badezimmer Farbhalde 4, Oetwil, nach dem Umbau, Ansicht 2"),
      r("ref-17-023", "Badezimmer Farbhalde 4, Oetwil, nach dem Umbau, Ansicht 3"),
      r("ref-17-028", "Badezimmer Farbhalde 4, Oetwil, nach dem Umbau, Ansicht 4"),
      r("ref-17-029", "Badezimmer Farbhalde 4, Oetwil, nach dem Umbau, Ansicht 5"),
    ],
  },
  {
    slug: "ottikerstrasse-zuerich",
    titel: "Ausbau Dachstock und neue Terrasse",
    ort: "Ottikerstrasse 23, Zürich",
    zeitraum: "August – Dezember 2017",
    leistungen: ["Ausbau Dachstock", "neue Terrasse"],
    bilder: [
      r("ref-19-img-8921", "Dachstock Ottikerstrasse 23, Zürich, während dem Umbau", "Dachstock während dem Umbau"),
      r("ref-19-img-8881", "Dachstock Ottikerstrasse 23, Zürich, während dem Umbau", "Dachstock während dem Umbau"),
      r("ref-19-img-9089", "Terrasse Ottikerstrasse 23, Zürich, während dem Umbau", "Terrasse während dem Umbau"),
      r("ref-19-img-0244", "Dachstock Ottikerstrasse 23, Zürich, nach dem Umbau", "Dachstock nach dem Umbau"),
      r("ref-19-img-6906", "Dachstock Ottikerstrasse 23, Zürich, nach dem Umbau", "Dachstock nach dem Umbau"),
      r("ref-19-img-9080", "Dachstock Ottikerstrasse 23, Zürich, nach dem Umbau", "Dachstock nach dem Umbau"),
      r("ref-19-img-9090", "Terrasse Ottikerstrasse 23, Zürich, nach dem Umbau", "Terrasse nach dem Umbau"),
    ],
  },
  {
    slug: "ringstrasse-birmenstorf",
    titel: "Umbau Dusche / WC",
    ort: "Ringstrasse 10, Birmenstorf",
    zeitraum: "September – Oktober 2017",
    leistungen: ["neue Dusche", "neues WC"],
    text: [p("Fotos nach dem Umbau.")],
    bilder: [
      r("ref-20-006-3", "Dusche/WC Ringstrasse 10, Birmenstorf, nach dem Umbau, Ansicht 1"),
      r("ref-20-1270", "Dusche/WC Ringstrasse 10, Birmenstorf, nach dem Umbau, Ansicht 2"),
      r("ref-20-1271-2", "Dusche/WC Ringstrasse 10, Birmenstorf, nach dem Umbau, Ansicht 3"),
      r("ref-20-1269", "Dusche/WC Ringstrasse 10, Birmenstorf, nach dem Umbau, Ansicht 4"),
      r("ref-20-1271", "Dusche/WC Ringstrasse 10, Birmenstorf, nach dem Umbau, Ansicht 5"),
    ],
  },
  {
    slug: "sichtbetonpool-geroldswil",
    titel: "Sichtbetonpool",
    ort: "Welbrigstrasse 22 b, Geroldswil",
    zeitraum: "Juli – August 2017",
    leistungen: ["neuer Sichtbetonpool"],
    bilder: [
      r("ref-21-001", "Sichtbetonpool Welbrigstrasse 22 b, Geroldswil, Ansicht 1"),
      r("ref-21-001-2", "Sichtbetonpool Welbrigstrasse 22 b, Geroldswil, Ansicht 2"),
      r("ref-21-015", "Sichtbetonpool Welbrigstrasse 22 b, Geroldswil, Ansicht 3"),
      r("ref-21-022", "Sichtbetonpool Welbrigstrasse 22 b, Geroldswil, Ansicht 4"),
      r("ref-21-009", "Sichtbetonpool Welbrigstrasse 22 b, Geroldswil, Ansicht 5"),
      r("ref-21-005", "Sichtbetonpool Welbrigstrasse 22 b, Geroldswil, Ansicht 6"),
      r("ref-21-008", "Sichtbetonpool Welbrigstrasse 22 b, Geroldswil, Ansicht 7"),
    ],
  },
  {
    slug: "bauernhof",
    titel: "Sanierung eines alten Bauernhofs",
    leistungen: ["Impressionen alt / neu"],
    bilder: [
      r("ref-36-bauernhof-1", "Sanierung Bauernhof, Impression 1"),
      r("ref-36-bauernhof-0", "Sanierung Bauernhof, Impression 2"),
      r("ref-36-bauernhof-3", "Sanierung Bauernhof, Impression 3"),
      r("ref-36-bauernhof-2", "Sanierung Bauernhof, Impression 4"),
      r("ref-36-bauernhof-4", "Sanierung Bauernhof, Impression 5"),
      r("ref-36-bauernhof-5", "Sanierung Bauernhof, Impression 6"),
      r("ref-36-bauernhof-7", "Sanierung Bauernhof, Impression 7"),
      r("ref-36-bauernhof-6", "Sanierung Bauernhof, Impression 8"),
      r("ref-36-bauernhof-9", "Sanierung Bauernhof, Impression 9"),
      r("ref-36-bauernhof-8", "Sanierung Bauernhof, Impression 10"),
      r("ref-36-bauernhof-10", "Sanierung Bauernhof, Impression 11"),
      r("ref-36-bauernhof-11", "Sanierung Bauernhof, Impression 12"),
      r("ref-36-bauernhof-12", "Sanierung Bauernhof, Impression 13"),
      r("ref-36-bauernhof-13", "Sanierung Bauernhof, Impression 14"),
      r("ref-36-bauernhof-14", "Sanierung Bauernhof, Impression 15"),
    ],
  },
];

export const referenzseite: Referenzseite = {
  seo: {
    titel: "Referenzen Sanierung und Renovation",
    beschreibung: "Ausgeführte Sanierungen und Umbauten der Bauabteilung von J.F. Jost & Co: Bäder, Dachstock, Fassaden, Beton, Naturofloor-Beläge. Referenzen 2017 bis 2019 mit Fotos.",
  },
  kopf: {
    kicker: "Bau",
    titel: "Sanierung und Renovationen: Referenzen",
    einleitung:
      "Ausgeführte Arbeiten unserer Bauabteilung, dokumentiert mit Fotos vor, während und nach der Sanierung. Alle Projekte stammen aus den Jahren 2017 bis 2019.",
  },
  projekte,
  hinweis: {
    _type: "hinweis",
    _key: "referenzen-hinweis",
    titel: "Ihr Projekt",
    text: [...liste("Kleine und grosse Renovationen, Umbauten, Fassaden- und Betonsanierungen, Abdichtungen", "Bauleitung und Beratung der Bauherrschaft"), p("Beschreiben Sie uns Ihr Vorhaben über das Kontaktformular (Anliegen «Baudienstleistungen») oder telefonisch unter 044 755 53 53.")],
    art: "info",
  },
};
