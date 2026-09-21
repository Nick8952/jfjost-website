import { defineField, defineType } from "sanity";

/**
 * Die zehn Inhaltsbausteine. Der Kunde ordnet sie je Seite frei an; das
 * Aussehen ist je Baustein festgelegt (keine Farb- oder Layoutfelder).
 */
const kickerTitel = [
  defineField({ name: "kicker", title: "Kicker", type: "string", description: "Kleine Zeile über dem Titel." }),
  defineField({ name: "titel", title: "Titel", type: "string" }),
];

export const textblock = defineType({
  name: "textblock",
  title: "Text",
  type: "object",
  fields: [
    ...kickerTitel,
    defineField({ name: "text", title: "Text", type: "fliesstext", validation: (r) => r.required() }),
    defineField({ name: "breite", title: "Breite", type: "string", options: { list: [{ title: "Lesespalte", value: "schmal" }, { title: "Breit (zweispaltig)", value: "breit" }], layout: "radio" }, initialValue: "schmal" }),
  ],
  preview: { select: { title: "titel", subtitle: "kicker" }, prepare: ({ title, subtitle }) => ({ title: title || "Text", subtitle }) },
});

export const leistungsliste = defineType({
  name: "leistungsliste",
  title: "Leistungen (nummeriert)",
  type: "object",
  fields: [
    ...kickerTitel,
    defineField({
      name: "leistungen",
      title: "Leistungen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "nummer", title: "Nummer", type: "string", description: "z. B. «01»; leer = automatisch." }),
            defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
            defineField({ name: "text", title: "Text", type: "fliesstext", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "titel", subtitle: "nummer" } },
        },
      ],
      validation: (r) => r.min(1),
    }),
  ],
  preview: { select: { title: "titel" }, prepare: ({ title }) => ({ title: title || "Leistungen" }) },
});

export const teaserraster = defineType({
  name: "teaserraster",
  title: "Teaser (Kacheln)",
  type: "object",
  fields: [
    ...kickerTitel,
    defineField({
      name: "teaser",
      title: "Kacheln",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3, validation: (r) => r.required() }),
            defineField({ name: "ziel", title: "Ziel", type: "string", validation: (r) => r.required() }),
            defineField({ name: "aktion", title: "Linktext", type: "string", description: "z. B. «Mietangebote ansehen»", validation: (r) => r.required() }),
            defineField({ name: "bild", title: "Bild", type: "bild" }),
          ],
          preview: { select: { title: "titel", subtitle: "ziel", media: "bild" } },
        },
      ],
      validation: (r) => r.min(1).max(6),
    }),
  ],
  preview: { select: { title: "titel" }, prepare: ({ title }) => ({ title: title || "Teaser" }) },
});

export const bildtext = defineType({
  name: "bildtext",
  title: "Bild mit Text",
  type: "object",
  fields: [
    ...kickerTitel,
    defineField({ name: "text", title: "Text", type: "fliesstext", validation: (r) => r.required() }),
    defineField({ name: "bild", title: "Bild", type: "bild", validation: (r) => r.required() }),
    defineField({ name: "bildSeite", title: "Bild links oder rechts", type: "string", options: { list: [{ title: "Links", value: "links" }, { title: "Rechts", value: "rechts" }], layout: "radio" }, initialValue: "links" }),
  ],
  preview: { select: { title: "titel", media: "bild" }, prepare: ({ title, media }) => ({ title: title || "Bild mit Text", media }) },
});

export const hinweis = defineType({
  name: "hinweis",
  title: "Hinweis (Kasten)",
  type: "object",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({ name: "text", title: "Text", type: "fliesstext", validation: (r) => r.required() }),
    defineField({ name: "art", title: "Art", type: "string", options: { list: [{ title: "Information", value: "info" }, { title: "Wichtig (gelb)", value: "wichtig" }], layout: "radio" }, initialValue: "info" }),
  ],
  preview: { select: { title: "titel", subtitle: "art" }, prepare: ({ title, subtitle }) => ({ title: title || "Hinweis", subtitle }) },
});

export const zeitstrahl = defineType({
  name: "zeitstrahl",
  title: "Zeitstrahl",
  type: "object",
  fields: [
    ...kickerTitel,
    defineField({
      name: "punkte",
      title: "Stationen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "jahr", title: "Jahr", type: "string", validation: (r) => r.required() }),
            defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "titel", subtitle: "jahr" } },
        },
      ],
      validation: (r) => r.min(2),
    }),
  ],
  preview: { select: { title: "titel" }, prepare: ({ title }) => ({ title: title || "Zeitstrahl" }) },
});

export const linkliste = defineType({
  name: "linkliste",
  title: "Linkliste",
  type: "object",
  fields: [
    ...kickerTitel,
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "text", title: "Beschriftung", type: "string", validation: (r) => r.required() }),
            defineField({ name: "url", title: "Adresse", type: "url", validation: (r) => r.required().uri({ scheme: ["http", "https"] }) }),
            defineField({ name: "hinweis", title: "Hinweis", type: "string", description: "z. B. «zurzeit nicht erreichbar»" }),
          ],
          preview: { select: { title: "text", subtitle: "url" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "titel" }, prepare: ({ title }) => ({ title: title || "Linkliste" }) },
});

export const angebotseinbettung = defineType({
  name: "angebotseinbettung",
  title: "Immobilienangebote (homegate.ch)",
  type: "object",
  description: "Zeigt die Trefferliste von homegate.ch. Adressen und Texte werden zentral unter «Externe Angebote» gepflegt.",
  fields: [
    defineField({ name: "art", title: "Art", type: "string", options: { list: [{ title: "Mieten", value: "mieten" }, { title: "Kaufen", value: "kaufen" }], layout: "radio" }, validation: (r) => r.required() }),
  ],
  preview: { select: { subtitle: "art" }, prepare: ({ subtitle }) => ({ title: "Immobilienangebote (homegate.ch)", subtitle }) },
});

export const downloadliste = defineType({
  name: "downloadliste",
  title: "Downloads",
  type: "object",
  description: "Listet Dokumente aus «Downloads». Ohne Kategorie erscheinen alle.",
  fields: [
    ...kickerTitel,
    defineField({ name: "kategorie", title: "Nur Kategorie", type: "string", options: { list: [{ title: "Formulare", value: "formular" }, { title: "Merkblätter", value: "merkblatt" }] } }),
  ],
  preview: { select: { title: "titel", subtitle: "kategorie" }, prepare: ({ title, subtitle }) => ({ title: title || "Downloads", subtitle }) },
});

export const handlungsaufforderung = defineType({
  name: "handlungsaufforderung",
  title: "Aufforderung (schwarzer Balken)",
  type: "object",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
    defineField({ name: "aktionen", title: "Knöpfe", type: "array", of: [{ type: "verweis" }], validation: (r) => r.min(1).max(2) }),
  ],
  preview: { select: { title: "titel" } },
});

export const bausteinTypen = ["textblock", "leistungsliste", "teaserraster", "bildtext", "hinweis", "zeitstrahl", "linkliste", "angebotseinbettung", "downloadliste", "handlungsaufforderung"];
