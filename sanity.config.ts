/**
 * Sanity Studio, VORBEREITET, NOCH NICHT IN BETRIEB.
 *
 * Das Studio ist eine eigene Build-Einheit (npm run studio bzw. npx sanity
 * deploy) und keine Route der Next-Website. So bleibt der statische Export
 * für GitHub Pages unberührt; siehe docs/sanity-vercel-einrichtung.md.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { einzeldokumente, schemaTypes } from "./sanity/schemas";

const titel: Record<string, string> = {
  websiteEinstellungen: "Website-Einstellungen",
  startseite: "Startseite",
  teamseite: "Team (Seite)",
  referenzseite: "Referenzen (Seite)",
  downloadseite: "Downloads (Seite)",
  kontaktseite: "Kontakt (Seite)",
  externeAngebote: "Externe Angebote (homegate.ch)",
};

export default defineConfig({
  name: "jfjost",
  title: "J.F. Jost & Co",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Inhalte")
          .items([
            ...einzeldokumente.map((typ) => S.listItem().title(titel[typ] ?? typ).id(typ).child(S.document().schemaType(typ).documentId(typ))),
            S.divider(),
            S.documentTypeListItem("seite").title("Seiten"),
            S.documentTypeListItem("teammitglied").title("Teammitglieder"),
            S.documentTypeListItem("referenzprojekt").title("Referenzprojekte"),
            S.documentTypeListItem("download").title("Downloads"),
            S.documentTypeListItem("rechtstext").title("Rechtstexte"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (vorlagen) => vorlagen.filter((vorlage) => !einzeldokumente.includes(vorlage.schemaType)),
  },
  document: {
    actions: (aktionen, kontext) =>
      einzeldokumente.includes(kontext.schemaType) ? aktionen.filter((aktion) => !["unpublish", "delete", "duplicate"].includes(aktion.action ?? "")) : aktionen,
  },
});
