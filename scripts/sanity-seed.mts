/**
 * Inhalte und freigegebene Medien nach Sanity importieren.
 *
 * VORBEREITET, NOCH NICHT AUSGEFÜHRT. Läuft erst, wenn ein Sanity-Projekt
 * existiert (docs/sanity-vercel-einrichtung.md):
 *
 *   cp .env.example .env.local        # Projekt-ID, Dataset, Schreib-Token eintragen
 *   npm run originale                 # Originalbilder/PDFs nach assets/original/ laden
 *   npm run seed -- --trockenlauf     # zeigt nur, was geschrieben würde
 *   npm run seed                      # legt an, was noch nicht existiert (nichts wird überschrieben)
 *   npm run seed -- --aktualisieren   # ersetzt auch vorhandene Dokumente (nach Rückfrage)
 *
 * Sicherungen:
 *  - Projekt-ID, Dataset und Umfang werden vor jeder Schreiboperation angezeigt.
 *  - Ohne --aktualisieren wird kein vorhandenes Dokument verändert.
 *  - --aktualisieren verlangt die Eingabe des Dataset-Namens.
 *  - Dokument-IDs sind deterministisch (Einzeldokumente = Typname, Seiten =
 *    seite-<slug>, Team = team-<kennung>, Referenzen = referenz-<slug>,
 *    Downloads = download-<kennung>, Rechtstexte = rechtstext-<art>).
 *  - Bilder und PDFs werden je Datei nur einmal hochgeladen (Quelle: Originale
 *    aus assets/original/, nicht die verkleinerten Web-Varianten).
 *  - Es wird nichts gelöscht.
 */
import { createClient } from "@sanity/client";
import { createInterface } from "node:readline/promises";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { downloadseite } from "../data/downloads";
import { einstellungen } from "../data/einstellungen";
import { externeAngebote } from "../data/externe-angebote";
import { kontaktseite } from "../data/kontakt";
import { rechtstexte } from "../data/rechtstexte";
import { referenzseite } from "../data/referenzen";
import { seiten } from "../data/seiten";
import { startseite } from "../data/startseite";
import { teamseite } from "../data/team";
import type { Bild } from "../lib/inhalt/typen";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");

// .env.local wie Next lesen (tsx lädt sie nicht selbst). Bereits gesetzte Variablen gewinnen.
const envDatei = join(wurzel, ".env.local");
if (existsSync(envDatei)) {
  for (const zeile of readFileSync(envDatei, "utf8").split(/\r?\n/)) {
    const treffer = /^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/.exec(zeile);
    if (!treffer || zeile.trim().startsWith("#")) continue;
    const wert = treffer[2].replace(/^(['"])(.*)\1$/, "$2");
    if (wert && process.env[treffer[1]] === undefined) process.env[treffer[1]] = wert;
  }
}

const argumente = new Set(process.argv.slice(2));
const trockenlauf = argumente.has("--trockenlauf");
const aktualisieren = argumente.has("--aktualisieren");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID und SANITY_API_WRITE_TOKEN werden gebraucht (siehe .env.example, docs/sanity-vercel-einrichtung.md).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-09-01", useCdn: false });
console.log(`Sanity-Projekt: ${projectId}   Dataset: ${dataset}   Modus: ${trockenlauf ? "Trockenlauf" : aktualisieren ? "aktualisieren (überschreibt)" : "nur anlegen"}`);

if (aktualisieren && !trockenlauf) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const antwort = await rl.question(`Vorhandene Dokumente im Dataset «${dataset}» werden ersetzt. Zum Bestätigen den Dataset-Namen eingeben: `);
  rl.close();
  if (antwort.trim() !== dataset) {
    console.log("Abgebrochen, nichts geändert.");
    process.exit(0);
  }
}

/* ---------------------------------------------------------- Medien-Upload */

/** Zuordnung Bild-ID (Manifest) -> Originaldatei, aus scripts/bilder-aufbereiten.mjs abgeleitet. */
const manifestQuelle = readFileSync(join(wurzel, "assets/original/manifest.json"), "utf8");
const originale = (JSON.parse(manifestQuelle) as { dateien: { datei: string }[] }).dateien.map((d) => d.datei);

function originalFuer(bild: Bild): string {
  // /bilder/<id>-<breite>.webp -> id
  const id = basename(bild.src).replace(/-\d+\.webp$/, "");
  const feste: Record<string, string> = {
    "start-lilie": "startseite/slider_lilie_01.jpg",
    "start-kueche-mattenweg": "startseite/kueche_mattenweg.jpg",
    "start-dusche-uetliberg": "startseite/dusche_uetliberg.jpg",
    "start-am-furtbach": "startseite/slider_am_furtbach_01.jpg",
    "start-baechaustrasse": "startseite/slider_baechaustrasse_01.jpg",
    "start-hofackerstrasse": "startseite/slider_hofackerstrasse_01.jpg",
    "start-langackerstrasse": "startseite/langackerstr_schlieren2.jpg",
    "engagement-ukrainespende": "engagement/ukrainespende-lilie.jpg",
    "team-albertanti-diego": "team/Diego Albertanti.jpg",
    "team-rexhepi-visar": "team/Visar Rexhepi.jpg",
    "team-laib-andre": "team/Andre_Laib.jpg",
    "team-bauteam": "team/Bauteam.JPG",
    "team-ribalta-sandra": "team/SandraRibalta.jpg",
    "team-mueller-eric": "team/Eric.jpg",
    "team-paparo-amelia": "team/Paparo_Amelia_13.jpg",
    "team-menegazzo-diana": "team/DianaMenegazzo.jpg",
    "team-kunz-jsabella": "team/Jsabella Kunz.jpg",
    "team-veliju-enes": "team/Veliju_Enes.jpg",
    "team-gjura-safet": "team/Safet_Gjura.jpg",
    "team-bonifacio-jose": "team/JoseBonifacio.jpg",
    "team-shanker-shimon": "team/ShankerShimon.jpg",
    "team-muehlemann-urs": "team/Muehlemann_Urs hoch.jpg",
    "team-mariani-reto": "team/RetoMariani.jpg",
    "team-meyer-jacqueline": "team/Jacky Meyer.JPG",
    "team-weyermann-susanne": "team/DSC_0422 2.JPG",
    "team-krumdieck-ingrid": "team/Ingrid_.jpg",
  };
  if (feste[id]) return feste[id];
  if (id.startsWith("ref-")) {
    // ref-<ordner>-<datei> -> referenzen/<ordner>_<datei>.<ext>
    const [, ordner, ...rest] = id.split("-");
    const treffer = originale.find((o) => o.startsWith(`referenzen/${ordner}_`) && basename(o).toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-") === rest.join("-"));
    if (treffer) return treffer;
  }
  throw new Error(`Kein Original für Bild «${id}» gefunden.`);
}

const hochgeladen = new Map<string, string>();

async function bildHochladen(bild: Bild | undefined) {
  if (!bild) return undefined;
  const datei = originalFuer(bild);
  const pfad = join(wurzel, "assets/original", datei);
  if (!existsSync(pfad)) throw new Error(`Original fehlt: ${pfad} – zuerst «npm run originale».`);
  let assetId = hochgeladen.get(datei);
  if (!assetId) {
    if (trockenlauf) {
      assetId = `image-trockenlauf-${basename(datei)}`;
    } else {
      const asset = await client.assets.upload("image", createReadStream(pfad), { filename: basename(datei) });
      assetId = asset._id;
    }
    hochgeladen.set(datei, assetId);
    console.log(`  Bild: ${datei}`);
  }
  return { _type: "bild", asset: { _type: "reference", _ref: assetId }, alt: bild.alt, ...(bild.legende ? { legende: bild.legende } : {}) };
}

async function dateiHochladen(oeffentlicherPfad: string) {
  const pfad = join(wurzel, "public", oeffentlicherPfad);
  let assetId = hochgeladen.get(oeffentlicherPfad);
  if (!assetId) {
    if (trockenlauf) assetId = `file-trockenlauf-${basename(pfad)}`;
    else assetId = (await client.assets.upload("file", createReadStream(pfad), { filename: basename(pfad) }))._id;
    hochgeladen.set(oeffentlicherPfad, assetId);
    console.log(`  Datei: ${oeffentlicherPfad}`);
  }
  return { _type: "file", asset: { _type: "reference", _ref: assetId } };
}

/** Bausteine: Bilder ersetzen, Rest 1:1 (Portable Text ist bereits im Sanity-Format). */
async function bausteineUmformen(liste: unknown[]) {
  const ergebnis = [];
  for (const b of liste as Record<string, unknown>[]) {
    if (b._type === "bildtext") ergebnis.push({ ...b, bild: await bildHochladen(b.bild as Bild) });
    else if (b._type === "teaserraster") {
      const teaser = [];
      for (const t of b.teaser as Record<string, unknown>[]) teaser.push({ ...t, _key: t._key ?? kennung(String(t.ziel)), bild: await bildHochladen(t.bild as Bild | undefined) });
      ergebnis.push({ ...b, teaser });
    } else ergebnis.push(b);
  }
  return ergebnis;
}

const kennung = (text: string) =>
  text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Arrays brauchen in Sanity je Eintrag einen _key. */
function mitKeys<T extends object>(liste: T[], praefix: string): (T & { _key: string })[] {
  return liste.map((eintrag, i) => ({ _key: `${praefix}-${i}`, ...eintrag }));
}

/* ------------------------------------------------------------- Dokumente */

const dokumente: Record<string, unknown>[] = [];

dokumente.push({
  _id: "websiteEinstellungen",
  _type: "websiteEinstellungen",
  kontakt: einstellungen.kontakt,
  oeffnungszeiten: mitKeys(einstellungen.oeffnungszeiten, "zeit"),
  navigation: mitKeys(
    einstellungen.navigation.map((p) => ({ ...p, unterpunkte: p.unterpunkte ? mitKeys(p.unterpunkte, kennung(p.text)) : undefined })),
    "nav"
  ),
  fussnavigation: mitKeys(einstellungen.fussnavigation, "fuss"),
  demoHinweis: einstellungen.demoHinweis,
  mitgliedschaften: einstellungen.mitgliedschaften,
});

console.log("Startseite …");
dokumente.push({
  _id: "startseite",
  _type: "startseite",
  seo: startseite.seo,
  hero: { ...startseite.hero, bild: await bildHochladen(startseite.hero.bild), aktionen: mitKeys(startseite.hero.aktionen, "hero") },
  liegenschaften: {
    ...startseite.liegenschaften,
    bilder: await Promise.all(startseite.liegenschaften.bilder.map(async (l, i) => ({ _key: `lieg-${i}`, titel: l.titel, ort: l.ort, bild: await bildHochladen(l.bild) }))),
  },
  bereiche: { ...startseite.bereiche, teaser: mitKeys(startseite.bereiche.teaser, "bereich") },
  geschichte: { ...startseite.geschichte, punkte: mitKeys(startseite.geschichte.punkte, "jahr") },
  abschluss: { ...startseite.abschluss, aktionen: mitKeys(startseite.abschluss.aktionen, "abschluss") },
});

console.log("Seiten …");
for (const s of seiten) {
  dokumente.push({
    _id: `seite-${s.slug}`,
    _type: "seite",
    slug: { _type: "slug", current: s.slug },
    seo: s.seo,
    kopf: { ...s.kopf, bild: await bildHochladen(s.kopf.bild) },
    bausteine: await bausteineUmformen(s.bausteine),
  });
}

console.log("Team …");
// Eine Person kann in mehreren Abteilungen mit verschiedenen Funktionen stehen
// (Diego Albertanti: Geschäftsführer / Abteilungsleiter). Damit die Sanity-Quelle
// dieselbe Darstellung liefert wie die lokale, gibt es je Person UND Funktion ein Dokument.
const personen = new Map<string, Record<string, unknown>>();
const personId = (name: string, funktion?: string) => `team-${kennung(name)}${funktion ? `-${kennung(funktion)}` : ""}`;
for (const a of teamseite.abteilungen) {
  for (const m of a.mitglieder) {
    const id = personId(m.name, m.funktion);
    if (!personen.has(id)) personen.set(id, { _id: id, _type: "teammitglied", name: m.name, funktion: m.funktion, telefone: m.telefone, email: m.email, bild: await bildHochladen(m.bild) });
  }
}
dokumente.push(...personen.values());
dokumente.push({
  _id: "teamseite",
  _type: "teamseite",
  seo: teamseite.seo,
  kopf: teamseite.kopf,
  hinweis: teamseite.hinweis,
  abteilungen: teamseite.abteilungen.map((a, i) => ({
    _key: `abt-${i}`,
    titel: a.titel,
    mitglieder: a.mitglieder.map((m, j) => ({ _key: `m-${i}-${j}`, _type: "reference", _ref: personId(m.name, m.funktion) })),
  })),
});

console.log("Referenzen …");
for (const [i, p] of referenzseite.projekte.entries()) {
  const bilder = [];
  for (const b of p.bilder) bilder.push({ _key: `b-${bilder.length}`, ...(await bildHochladen(b)) });
  dokumente.push({ _id: `referenz-${p.slug}`, _type: "referenzprojekt", titel: p.titel, slug: { _type: "slug", current: p.slug }, ort: p.ort, zeitraum: p.zeitraum, sortierung: i + 1, leistungen: p.leistungen, text: p.text, bilder });
}
dokumente.push({ _id: "referenzseite", _type: "referenzseite", seo: referenzseite.seo, kopf: referenzseite.kopf, hinweis: referenzseite.hinweis });

console.log("Downloads …");
for (const [i, d] of downloadseite.downloads.entries()) {
  dokumente.push({ _id: `download-${kennung(basename(d.datei, ".pdf"))}`, _type: "download", titel: d.titel, beschreibung: d.beschreibung, datei: await dateiHochladen(d.datei), seiten: d.seiten, kategorie: d.kategorie, sortierung: i + 1 });
}
dokumente.push({ _id: "downloadseite", _type: "downloadseite", seo: downloadseite.seo, kopf: downloadseite.kopf });

dokumente.push({ _id: "kontaktseite", _type: "kontaktseite", ...kontaktseite });
dokumente.push({ _id: "externeAngebote", _type: "externeAngebote", ...externeAngebote });
for (const r of rechtstexte) dokumente.push({ _id: `rechtstext-${r.art}`, _type: "rechtstext", ...r });

/* -------------------------------------------------------------- Schlüssel */

/**
 * Sanity verlangt für jedes Objekt in einem Array ein eindeutiges _key (auch für
 * Portable-Text-Spans und verschachtelte Listen). Fehlende Keys werden
 * deterministisch aus dem Pfad vergeben; vorhandene bleiben.
 */
function schluesselErgaenzen(wert: unknown, pfad = "k"): unknown {
  if (Array.isArray(wert)) {
    return wert.map((eintrag, i) => {
      const neu = schluesselErgaenzen(eintrag, `${pfad}${i}`);
      if (neu && typeof neu === "object" && !Array.isArray(neu) && !("_key" in (neu as object))) return { _key: `${pfad}${i}`, ...(neu as object) };
      return neu;
    });
  }
  if (wert && typeof wert === "object") {
    const o = wert as Record<string, unknown>;
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, k === "_key" ? v : schluesselErgaenzen(v, `${pfad}-${k}`)]));
  }
  return wert;
}
for (let i = 0; i < dokumente.length; i += 1) dokumente[i] = schluesselErgaenzen(dokumente[i], `d${i}`) as Record<string, unknown>;

/* --------------------------------------------------------------- Schreiben */

console.log(`\n${dokumente.length} Dokumente, ${hochgeladen.size} Medien.`);
const vorhanden = new Set<string>(trockenlauf ? [] : await client.fetch<string[]>(`*[_id in $ids]._id`, { ids: dokumente.map((d) => d._id) }));
let angelegt = 0;
let ersetzt = 0;
let uebersprungen = 0;
const transaktion = client.transaction();
for (const d of dokumente) {
  const id = d._id as string;
  if (vorhanden.has(id) && !aktualisieren) {
    uebersprungen += 1;
    continue;
  }
  if (vorhanden.has(id)) {
    ersetzt += 1;
    transaktion.createOrReplace(d as { _id: string; _type: string });
  } else {
    angelegt += 1;
    transaktion.createIfNotExists(d as { _id: string; _type: string });
  }
}
if (trockenlauf) {
  console.log(`Trockenlauf: ${angelegt} würden angelegt, ${ersetzt} ersetzt, ${uebersprungen} übersprungen. Nichts geschrieben.`);
} else {
  await transaktion.commit();
  console.log(`Fertig: ${angelegt} angelegt, ${ersetzt} ersetzt, ${uebersprungen} unverändert (bereits vorhanden).`);
}
