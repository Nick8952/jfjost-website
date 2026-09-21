import { defineField, defineType } from "sanity";

/**
 * Gemeinsame Objekte des Studios. Feldnamen und Hilfetexte auf Deutsch, damit
 * der Kunde ohne technische Kenntnisse pflegen kann. Die Typen entsprechen
 * lib/inhalt/typen.ts; die GROQ-Abfragen in sanity/abfragen.ts übersetzen sie.
 */
export const seo = defineType({
  name: "seo",
  title: "Suchmaschinen (SEO)",
  type: "object",
  fields: [
    defineField({ name: "titel", title: "Seitentitel", type: "string", description: "Erscheint im Browser-Tab und in Suchergebnissen (max. 60 Zeichen).", validation: (r) => r.required().max(60) }),
    defineField({ name: "beschreibung", title: "Beschreibung", type: "text", rows: 3, description: "Kurztext für Suchergebnisse (60 – 160 Zeichen).", validation: (r) => r.required().min(60).max(165) }),
  ],
});

export const bild = defineType({
  name: "bild",
  title: "Bild",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Bildbeschreibung (Alt-Text)", type: "string", description: "Was ist zu sehen? Für Screenreader und wenn das Bild nicht lädt.", validation: (r) => r.required().min(5) }),
    defineField({ name: "legende", title: "Legende", type: "string", description: "Optionaler Text unter dem Bild, z. B. «vor der Sanierung»." }),
  ],
});

export const fliesstext = defineType({
  name: "fliesstext",
  title: "Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Absatz", value: "normal" },
        { title: "Zwischentitel", value: "h3" },
        { title: "Kleiner Zwischentitel", value: "h4" },
        { title: "Zitat", value: "blockquote" },
      ],
      lists: [
        { title: "Aufzählung", value: "bullet" },
        { title: "Nummerierung", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Fett", value: "strong" },
          { title: "Kursiv", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({ name: "href", title: "Adresse", type: "string", description: "Interner Pfad (/kontakt/) oder vollständige Adresse (https://…).", validation: (r) => r.required() }),
              defineField({ name: "blank", title: "In neuem Tab öffnen", type: "boolean", initialValue: false }),
            ],
          },
        ],
      },
    },
  ],
});

export const verweis = defineType({
  name: "verweis",
  title: "Verweis",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Beschriftung", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ziel", title: "Ziel", type: "string", description: "Interner Pfad (/mieten/), Telefon (tel:+41…) oder Adresse (https://…).", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "text", subtitle: "ziel" } },
});

export const navigationspunkt = defineType({
  name: "navigationspunkt",
  title: "Navigationspunkt",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Beschriftung", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ziel", title: "Ziel", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "unterpunkte",
      title: "Unterpunkte",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "text", title: "Beschriftung", type: "string", validation: (r) => r.required() }),
            defineField({ name: "ziel", title: "Ziel", type: "string", validation: (r) => r.required() }),
            defineField({ name: "hinweis", title: "Kurzhinweis", type: "string", description: "Eine Zeile unter dem Eintrag im Menü." }),
          ],
          preview: { select: { title: "text", subtitle: "ziel" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "text", subtitle: "ziel" } },
});

export const zeitfenster = defineType({
  name: "zeitfenster",
  title: "Öffnungszeit",
  type: "object",
  fields: [
    defineField({ name: "tage", title: "Tage", type: "string", description: "z. B. «Montag bis Donnerstag»", validation: (r) => r.required() }),
    defineField({ name: "zeiten", title: "Zeiten", type: "array", of: [{ type: "string" }], description: "Je Zeile ein Zeitfenster, z. B. «07.30 – 12.00 Uhr»", validation: (r) => r.required().min(1) }),
  ],
  preview: { select: { title: "tage", subtitle: "zeiten.0" } },
});

export const seitenkopf = defineType({
  name: "seitenkopf",
  title: "Seitenkopf",
  type: "object",
  fields: [
    defineField({ name: "kicker", title: "Kicker", type: "string", description: "Kleine Zeile über dem Titel, z. B. «Immobilien»." }),
    defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "einleitung", title: "Einleitung", type: "text", rows: 4 }),
    defineField({ name: "bild", title: "Bild", type: "bild" }),
  ],
});
