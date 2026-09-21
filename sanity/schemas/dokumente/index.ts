import { defineField, defineType } from "sanity";
import { bausteinTypen } from "../objekte/bausteine";

/**
 * Dokumenttypen. Einzeldokumente (genau eines, _id = Typname):
 * websiteEinstellungen, startseite, teamseite, referenzseite, downloadseite,
 * kontaktseite, externeAngebote. Mehrfach: seite, teammitglied,
 * referenzprojekt, download, rechtstext.
 */
const bausteine = defineField({
  name: "bausteine",
  title: "Inhaltsbausteine",
  type: "array",
  description: "Reihenfolge per Ziehen ändern. Jeder Baustein hat eine feste Form.",
  of: bausteinTypen.map((type) => ({ type })),
});

export const websiteEinstellungen = defineType({
  name: "websiteEinstellungen",
  title: "Website-Einstellungen",
  type: "document",
  groups: [
    { name: "kontakt", title: "Kontakt", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "sonstiges", title: "Sonstiges" },
  ],
  fields: [
    defineField({
      name: "kontakt",
      title: "Firma und Kontakt",
      type: "object",
      group: "kontakt",
      fields: [
        defineField({ name: "firma", title: "Firmenname (Anzeige)", type: "string", validation: (r) => r.required() }),
        defineField({ name: "firmaRegister", title: "Name laut Handelsregister", type: "string", description: "Inklusive Rechtsform, z. B. «J.F. Jost & Co KmG».", validation: (r) => r.required() }),
        defineField({ name: "uid", title: "UID", type: "string", description: "Format CHE-000.000.000", validation: (r) => r.regex(/^CHE-\d{3}\.\d{3}\.\d{3}$/, { name: "UID" }) }),
        defineField({ name: "strasse", title: "Strasse und Nummer", type: "string", validation: (r) => r.required() }),
        defineField({ name: "plz", title: "PLZ", type: "string", validation: (r) => r.required() }),
        defineField({ name: "ort", title: "Ort", type: "string", validation: (r) => r.required() }),
        defineField({ name: "telefon", title: "Telefon (Anzeige)", type: "string", description: "z. B. 044 755 53 53", validation: (r) => r.required() }),
        defineField({ name: "telefonLink", title: "Telefon (Link)", type: "string", description: "Internationales Format ohne Leerzeichen: tel:+41447555353", validation: (r) => r.required().regex(/^tel:\+\d+$/, { name: "tel-Link" }) }),
        defineField({ name: "email", title: "E-Mail", type: "string", validation: (r) => r.required().email() }),
        defineField({ name: "routenLink", title: "Routenlink (Google Maps)", type: "url", description: "Normaler Link, keine Einbettung." }),
      ],
    }),
    defineField({ name: "oeffnungszeiten", title: "Öffnungszeiten", type: "array", of: [{ type: "zeitfenster" }], group: "kontakt" }),
    defineField({ name: "navigation", title: "Hauptnavigation", type: "array", of: [{ type: "navigationspunkt" }], group: "navigation" }),
    defineField({ name: "fussnavigation", title: "Rechtslinks im Fuss", type: "array", of: [{ type: "verweis" }], group: "navigation" }),
    defineField({ name: "demoHinweis", title: "Demo-Hinweis", type: "text", rows: 2, description: "Erscheint im Fuss. Vor dem Go-Live leeren.", group: "sonstiges" }),
    defineField({ name: "mitgliedschaften", title: "Mitgliedschaften", type: "array", of: [{ type: "string" }], group: "sonstiges" }),
  ],
  preview: { prepare: () => ({ title: "Website-Einstellungen" }) },
});

export const startseite = defineType({
  name: "startseite",
  title: "Startseite",
  type: "document",
  fields: [
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
    defineField({
      name: "hero",
      title: "Einstieg",
      type: "object",
      fields: [
        defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
        defineField({ name: "untertitel", title: "Untertitel", type: "text", rows: 4 }),
        defineField({ name: "bild", title: "Bild", type: "bild", validation: (r) => r.required() }),
        defineField({ name: "aktionen", title: "Knöpfe", type: "array", of: [{ type: "verweis" }], validation: (r) => r.max(3) }),
      ],
    }),
    defineField({
      name: "liegenschaften",
      title: "Liegenschaften (Bilderwand)",
      type: "object",
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "titel", title: "Titel", type: "string" }),
        defineField({
          name: "bilder",
          title: "Bilder",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "bild", title: "Bild", type: "bild", validation: (r) => r.required() }),
                defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
                defineField({ name: "ort", title: "Ort", type: "string" }),
              ],
              preview: { select: { title: "titel", subtitle: "ort", media: "bild" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "bereiche",
      title: "Vier Wege (Kacheln)",
      type: "object",
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "titel", title: "Titel", type: "string" }),
        defineField({
          name: "teaser",
          title: "Kacheln",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
                defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
                defineField({ name: "ziel", title: "Ziel", type: "string", validation: (r) => r.required() }),
                defineField({ name: "aktion", title: "Linktext", type: "string", validation: (r) => r.required() }),
              ],
              preview: { select: { title: "titel", subtitle: "ziel" } },
            },
          ],
          validation: (r) => r.max(4),
        }),
      ],
    }),
    defineField({
      name: "geschichte",
      title: "Geschichte (Kurzfassung)",
      type: "object",
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "titel", title: "Titel", type: "string" }),
        defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
        defineField({
          name: "punkte",
          title: "Jahreszahlen",
          type: "array",
          of: [{ type: "object", fields: [defineField({ name: "jahr", title: "Jahr", type: "string" }), defineField({ name: "titel", title: "Titel", type: "string" })], preview: { select: { title: "titel", subtitle: "jahr" } } }],
          validation: (r) => r.max(4),
        }),
        defineField({ name: "ziel", title: "Link", type: "verweis" }),
      ],
    }),
    defineField({ name: "abschluss", title: "Aufforderung am Ende", type: "handlungsaufforderung" }),
  ],
  preview: { prepare: () => ({ title: "Startseite" }) },
});

export const seite = defineType({
  name: "seite",
  title: "Seite",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Adresse", type: "slug", description: "Teil der Web-Adresse, z. B. «mieten» → /mieten/", options: { source: "kopf.titel" }, validation: (r) => r.required() }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", validation: (r) => r.required() }),
    defineField({ name: "kopf", title: "Seitenkopf", type: "seitenkopf", validation: (r) => r.required() }),
    bausteine,
  ],
  preview: { select: { title: "kopf.titel", subtitle: "slug.current" } },
});

export const teammitglied = defineType({
  name: "teammitglied",
  title: "Teammitglied",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", description: "Vorname Nachname", validation: (r) => r.required() }),
    defineField({ name: "funktion", title: "Funktion", type: "string" }),
    defineField({ name: "telefone", title: "Telefonnummern", type: "array", of: [{ type: "string" }], description: "Format 044 755 53 53" }),
    defineField({ name: "email", title: "E-Mail", type: "string", description: "Wird auf der Website nie im Klartext ausgegeben.", validation: (r) => r.email() }),
    defineField({ name: "bild", title: "Foto", type: "bild" }),
  ],
  preview: { select: { title: "name", subtitle: "funktion", media: "bild" } },
});

export const teamseite = defineType({
  name: "teamseite",
  title: "Team (Seite)",
  type: "document",
  fields: [
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
    defineField({ name: "kopf", title: "Seitenkopf", type: "seitenkopf" }),
    defineField({
      name: "abteilungen",
      title: "Abteilungen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "titel", title: "Abteilung", type: "string", validation: (r) => r.required() }),
            defineField({ name: "mitglieder", title: "Personen", type: "array", of: [{ type: "reference", to: [{ type: "teammitglied" }] }], description: "Eine Person kann in mehreren Abteilungen stehen." }),
          ],
          preview: { select: { title: "titel" } },
        },
      ],
    }),
    defineField({ name: "hinweis", title: "Hinweis unter der Liste", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Team (Seite)" }) },
});

export const referenzprojekt = defineType({
  name: "referenzprojekt",
  title: "Referenzprojekt",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Kennung", type: "slug", options: { source: "titel" }, validation: (r) => r.required() }),
    defineField({ name: "ort", title: "Ort / Objekt", type: "string" }),
    defineField({ name: "zeitraum", title: "Zeitraum", type: "string", description: "z. B. «August – September 2019»" }),
    defineField({ name: "sortierung", title: "Sortierung", type: "number", description: "Kleinere Zahl = weiter oben." }),
    defineField({ name: "leistungen", title: "Ausgeführte Arbeiten", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "text", title: "Text", type: "fliesstext" }),
    defineField({ name: "bilder", title: "Fotos", type: "array", of: [{ type: "bild" }], description: "Legende je Foto, z. B. «vor der Sanierung».", validation: (r) => r.min(1) }),
  ],
  preview: { select: { title: "titel", subtitle: "ort", media: "bilder.0" } },
});

export const referenzseite = defineType({
  name: "referenzseite",
  title: "Referenzen (Seite)",
  type: "document",
  fields: [
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
    defineField({ name: "kopf", title: "Seitenkopf", type: "seitenkopf" }),
    defineField({ name: "hinweis", title: "Hinweis am Ende", type: "hinweis" }),
  ],
  preview: { prepare: () => ({ title: "Referenzen (Seite)" }) },
});

export const download = defineType({
  name: "download",
  title: "Download",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "beschreibung", title: "Beschreibung", type: "text", rows: 2 }),
    defineField({ name: "datei", title: "Datei (PDF)", type: "file", options: { accept: "application/pdf" }, validation: (r) => r.required() }),
    defineField({ name: "seiten", title: "Seitenzahl", type: "number" }),
    defineField({ name: "kategorie", title: "Kategorie", type: "string", options: { list: [{ title: "Formular", value: "formular" }, { title: "Merkblatt", value: "merkblatt" }], layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "sortierung", title: "Sortierung", type: "number" }),
  ],
  preview: { select: { title: "titel", subtitle: "kategorie" } },
});

export const downloadseite = defineType({
  name: "downloadseite",
  title: "Downloads (Seite)",
  type: "document",
  fields: [
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
    defineField({ name: "kopf", title: "Seitenkopf", type: "seitenkopf" }),
  ],
  preview: { prepare: () => ({ title: "Downloads (Seite)" }) },
});

export const kontaktseite = defineType({
  name: "kontaktseite",
  title: "Kontakt (Seite)",
  type: "document",
  fields: [
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
    defineField({ name: "kopf", title: "Seitenkopf", type: "seitenkopf" }),
    defineField({ name: "anliegen", title: "Anliegen im Formular", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "formularHinweis", title: "Hinweis zum Formular", type: "text", rows: 3 }),
    defineField({ name: "karteHinweis", title: "Hinweis zur Karte", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Kontakt (Seite)" }) },
});

const angebot = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "url", title: "Adresse der Trefferliste", type: "url", description: "Nur homegate.ch-Adressen mit Anbieterkennung (a=jos).", validation: (r) => r.required().uri({ scheme: ["https"] }).custom((wert) => (typeof wert === "string" && !wert.startsWith("https://www.homegate.ch/") ? "Nur Adressen von https://www.homegate.ch/" : true)) }),
      defineField({ name: "einbettungAktiv", title: "Einbettung aktiv", type: "boolean", description: "Aus: nur Direktlink, keine Einbettung.", initialValue: true }),
      defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
      defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
    ],
  });

export const externeAngebote = defineType({
  name: "externeAngebote",
  title: "Externe Angebote (homegate.ch)",
  type: "document",
  description: "Führende Quelle für Miet- und Kaufangebote bleibt homegate.ch. Hier nur Adressen und Texte – keine Inserate.",
  fields: [
    defineField({ name: "anbieter", title: "Anbietername", type: "string", initialValue: "homegate.ch" }),
    defineField({ name: "anbieterDatenschutz", title: "Datenschutzerklärung des Anbieters", type: "url" }),
    angebot("mieten", "Mietangebote"),
    angebot("kaufen", "Kaufangebote"),
    defineField({ name: "zuletztGeprueft", title: "Einbettung zuletzt geprüft am", type: "date", description: "Nach jeder manuellen Kontrolle aktualisieren." }),
    defineField({ name: "platzhalterTitel", title: "Platzhalter: Titel", type: "string" }),
    defineField({ name: "platzhalterText", title: "Platzhalter: Text", type: "text", rows: 4 }),
    defineField({ name: "stoerungHinweis", title: "Hinweis bei Störung", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Externe Angebote (homegate.ch)" }) },
});

export const rechtstext = defineType({
  name: "rechtstext",
  title: "Rechtstext",
  type: "document",
  fields: [
    defineField({ name: "art", title: "Art", type: "string", options: { list: [{ title: "Impressum", value: "impressum" }, { title: "Datenschutzerklärung", value: "datenschutz" }], layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
    defineField({ name: "titel", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "stand", title: "Stand", type: "string", description: "z. B. «21. September 2026»" }),
    defineField({ name: "text", title: "Text", type: "fliesstext", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "titel", subtitle: "stand" } },
});
