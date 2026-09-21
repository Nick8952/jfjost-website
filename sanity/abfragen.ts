import { defineQuery } from "next-sanity";

/**
 * GROQ-Abfragen. Die Ergebnisformen entsprechen so weit wie möglich
 * lib/inhalt/typen.ts; Bilder werden in sanity/inhaltsquelle.ts umgeformt.
 */
export const BILD = `{ asset->{ _ref, url, metadata{ dimensions, lqip } }, hotspot, crop, alt, legende }`;

const BAUSTEINE = `bausteine[]{ ..., _type == "bildtext" => { bild ${BILD} }, _type == "teaserraster" => { teaser[]{ ..., bild ${BILD} } } }`;

export const EINSTELLUNGEN = defineQuery(`*[_id == "websiteEinstellungen"][0]{ kontakt, oeffnungszeiten, navigation, fussnavigation, demoHinweis, mitgliedschaften }`);

export const STARTSEITE = defineQuery(`*[_id == "startseite"][0]{
  seo,
  hero{ titel, untertitel, aktionen, bild ${BILD} },
  liegenschaften{ kicker, titel, bilder[]{ titel, ort, bild ${BILD} } },
  bereiche,
  geschichte,
  abschluss
}`);

export const SEITE = defineQuery(`*[_type == "seite" && slug.current == $slug][0]{ "slug": slug.current, seo, kopf{ ..., bild ${BILD} }, ${BAUSTEINE} }`);

export const SEITEN_SLUGS = defineQuery(`*[_type == "seite" && defined(slug.current)].slug.current`);

export const TEAM = defineQuery(`*[_id == "teamseite"][0]{
  seo, kopf{ ..., bild ${BILD} }, hinweis,
  abteilungen[]{ titel, mitglieder[]->{ name, funktion, telefone, email, bild ${BILD} } }
}`);

export const REFERENZEN = defineQuery(`{
  "seite": *[_id == "referenzseite"][0]{ seo, kopf{ ..., bild ${BILD} }, hinweis },
  "projekte": *[_type == "referenzprojekt"] | order(sortierung asc, _createdAt desc){ "slug": slug.current, titel, ort, zeitraum, leistungen, text, bilder[] ${BILD} }
}`);

export const DOWNLOADS = defineQuery(`{
  "seite": *[_id == "downloadseite"][0]{ seo, kopf{ ..., bild ${BILD} } },
  "downloads": *[_type == "download"] | order(sortierung asc, titel asc){ titel, beschreibung, seiten, kategorie, "datei": datei.asset->url, "bytes": datei.asset->size }
}`);

export const KONTAKT = defineQuery(`*[_id == "kontaktseite"][0]{ seo, kopf{ ..., bild ${BILD} }, anliegen, formularHinweis, karteHinweis }`);

export const EXTERNE_ANGEBOTE = defineQuery(`*[_id == "externeAngebote"][0]{ anbieter, anbieterDatenschutz, mieten, kaufen, zuletztGeprueft, platzhalterTitel, platzhalterText, stoerungHinweis }`);

export const RECHTSTEXT = defineQuery(`*[_type == "rechtstext" && art == $art][0]{ art, seo, titel, stand, text }`);
