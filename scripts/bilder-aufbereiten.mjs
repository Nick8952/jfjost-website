#!/usr/bin/env node
/**
 * Bildaufbereitung für den statischen Export.
 *
 * Liest die Originale aus assets/original/ (Herkunft: assets/original/manifest.json),
 * erzeugt AVIF- und WebP-Varianten in mehreren Breiten unter public/bilder/ und
 * schreibt ein typisiertes Manifest nach lib/bilder/manifest.ts. Zusätzlich
 * entstehen aus dem Original-Logo (SVG) Favicon, Apple-Icon und Open-Graph-Bild.
 *
 * Der Lauf ist deterministisch (gleiche Originale, gleiche Ausgabe) und darf im
 * CI laufen. Motive werden nicht verändert – nur skaliert, beschnitten (nur wo
 * angegeben) und komprimiert. Referenz- und Teamfotos behalten ihr Verhältnis,
 * damit nichts irreführend wirkt.
 *
 *   npm run bilder
 */
import sharp from "sharp";
import { mkdir, writeFile, rm, readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, basename, extname } from "node:path";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");
const quelleOrdner = join(wurzel, "assets/original");
const zielOrdner = join(wurzel, "public/bilder");
const appOrdner = join(wurzel, "app");

/** Markengelb aus dem Original-Logo (fill="#FFDD00"). */
const GELB = "#FFDD00";

if (!existsSync(quelleOrdner)) {
  console.error("assets/original/ fehlt. Zuerst 'npm run originale' ausführen.");
  process.exit(1);
}

/**
 * @type {{id:string, datei:string, seitenverhaeltnis?:number, position?:string, maxBreite?:number}[]}
 * Startseite: Querformat 16:9 für Hero/Liegenschaften (Original ist bereits ~16:9).
 * Team: Hochformat 4:5, Ausschnitt oben (Kopf), max. 640 px – Porträts brauchen nicht mehr.
 */
const bilder = [
  { id: "start-lilie", datei: "startseite/slider_lilie_01.jpg", maxBreite: 1920 },
  { id: "start-kueche-mattenweg", datei: "startseite/kueche_mattenweg.jpg", maxBreite: 1600 },
  { id: "start-dusche-uetliberg", datei: "startseite/dusche_uetliberg.jpg", maxBreite: 1600 },
  { id: "start-am-furtbach", datei: "startseite/slider_am_furtbach_01.jpg", maxBreite: 1600 },
  { id: "start-baechaustrasse", datei: "startseite/slider_baechaustrasse_01.jpg", maxBreite: 1920 },
  { id: "start-hofackerstrasse", datei: "startseite/slider_hofackerstrasse_01.jpg", maxBreite: 1600 },
  { id: "start-langackerstrasse", datei: "startseite/langackerstr_schlieren2.jpg", maxBreite: 1600 },
  { id: "engagement-ukrainespende", datei: "engagement/ukrainespende-lilie.jpg", maxBreite: 1280 },

  { id: "team-albertanti-diego", datei: "team/Diego Albertanti.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-rexhepi-visar", datei: "team/Visar Rexhepi.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-laib-andre", datei: "team/Andre_Laib.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-bauteam", datei: "team/Bauteam.JPG", maxBreite: 1280 },
  { id: "team-ribalta-sandra", datei: "team/SandraRibalta.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-mueller-eric", datei: "team/Eric.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-paparo-amelia", datei: "team/Paparo_Amelia_13.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-menegazzo-diana", datei: "team/DianaMenegazzo.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-kunz-jsabella", datei: "team/Jsabella Kunz.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-veliju-enes", datei: "team/Veliju_Enes.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-gjura-safet", datei: "team/Safet_Gjura.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-bonifacio-jose", datei: "team/JoseBonifacio.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-shanker-shimon", datei: "team/ShankerShimon.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-muehlemann-urs", datei: "team/Muehlemann_Urs hoch.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-mariani-reto", datei: "team/RetoMariani.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-meyer-jacqueline", datei: "team/Jacky Meyer.JPG", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-weyermann-susanne", datei: "team/DSC_0422 2.JPG", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
  { id: "team-krumdieck-ingrid", datei: "team/Ingrid_.jpg", seitenverhaeltnis: 4 / 5, position: "top", maxBreite: 640 },
];

// Referenzfotos: alle Dateien aus assets/original/referenzen, ID = "ref-<ordner>-<datei>", Verhältnis unverändert.
for (const datei of (await readdir(join(quelleOrdner, "referenzen"))).sort()) {
  const name = basename(datei, extname(datei)).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  bilder.push({ id: `ref-${name}`, datei: `referenzen/${datei}`, maxBreite: 1280 });
}

const breitenraster = [320, 480, 640, 960, 1280, 1600, 1920];

await rm(zielOrdner, { recursive: true, force: true });
await mkdir(zielOrdner, { recursive: true });

const manifest = {};

for (const bild of bilder) {
  const pfad = join(quelleOrdner, bild.datei);
  const info = await sharp(pfad, { failOn: "none" }).rotate().metadata();
  // rotate() ohne Argument dreht nach EXIF; Breite/Höhe danach ggf. vertauscht
  const gedreht = (info.orientation ?? 1) >= 5;
  let breite = (gedreht ? info.height : info.width) ?? 0;
  let hoehe = (gedreht ? info.width : info.height) ?? 0;
  if (bild.seitenverhaeltnis) {
    if (breite / hoehe > bild.seitenverhaeltnis) breite = Math.round(hoehe * bild.seitenverhaeltnis);
    else hoehe = Math.round(breite / bild.seitenverhaeltnis);
  }
  const maxBreite = Math.min(bild.maxBreite ?? breite, breite);
  const breiten = breitenraster.filter((b) => b < maxBreite).concat(maxBreite);
  const varianten = { avif: [], webp: [] };

  for (const b of breiten) {
    const h = Math.round((b / breite) * hoehe);
    const zuschnitt = sharp(pfad, { failOn: "none" })
      .rotate()
      .resize(b, h, { fit: "cover", position: bild.position ?? "centre", withoutEnlargement: true });
    await zuschnitt.clone().avif({ quality: 52, effort: 4 }).toFile(join(zielOrdner, `${bild.id}-${b}.avif`));
    await zuschnitt.clone().webp({ quality: 80, effort: 4 }).toFile(join(zielOrdner, `${bild.id}-${b}.webp`));
    varianten.avif.push({ breite: b, pfad: `/bilder/${bild.id}-${b}.avif` });
    varianten.webp.push({ breite: b, pfad: `/bilder/${bild.id}-${b}.webp` });
  }

  const unschaerfe = await sharp(pfad, { failOn: "none" })
    .rotate()
    .resize(20, Math.max(1, Math.round((20 / breite) * hoehe)), { fit: "cover", position: bild.position ?? "centre" })
    .webp({ quality: 40 })
    .toBuffer();

  manifest[bild.id] = {
    breite: maxBreite,
    hoehe: Math.round((maxBreite / breite) * hoehe),
    standard: `/bilder/${bild.id}-${breiten[breiten.length - 1]}.webp`,
    varianten,
    unschaerfe: `data:image/webp;base64,${unschaerfe.toString("base64")}`,
  };
  console.log(`aufbereitet: ${bild.id} (${breiten.length} Breiten bis ${maxBreite}px)`);
}

/* ------------------------------------------------------------- Logo/Symbole */

/**
 * Das Original-Logo ist ein SVG (gelbes Quadrat, schwarze Buchstaben «JFJ»).
 * Es wird unverändert nach public/logo.svg kopiert (nur ohne Illustrator-Kopf)
 * und daraus Favicon, Apple-Icon und Open-Graph-Bild gerastert.
 */
const logoQuelle = await readFile(join(quelleOrdner, "logo/logo.svg"), "utf8");
const logoSvg = logoQuelle.replace(/<\?xml[^>]*>\s*/, "").replace(/<!--[\s\S]*?-->\s*/g, "").replace(/<!DOCTYPE[^>]*>\s*/, "");
await mkdir(join(wurzel, "public"), { recursive: true });
await writeFile(join(wurzel, "public/logo.svg"), logoSvg, "utf8");

async function symbol(groesse, dateiname) {
  await sharp(Buffer.from(logoSvg), { density: Math.round((groesse / 41.75) * 72) })
    .resize(groesse, groesse, { fit: "contain", background: GELB })
    .png({ compressionLevel: 9 })
    .toFile(join(appOrdner, dateiname));
}
await symbol(64, "icon.png");
await symbol(180, "apple-icon.png");
console.log("aufbereitet: icon.png, apple-icon.png, public/logo.svg");

{
  // Open-Graph-Bild 1200x630: Logo links auf Gelb, rechts Firmenname in Schwarz.
  const logoPng = await sharp(Buffer.from(logoSvg), { density: 600 }).resize(330, 330).png().toBuffer();
  const grund = Buffer.from(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="${GELB}"/>
      <rect x="0" y="590" width="1200" height="40" fill="#141414"/>
      <text x="480" y="300" font-family="Helvetica, Arial, sans-serif" font-size="78" font-weight="700" fill="#141414">J.F. Jost &amp; Co</text>
      <text x="482" y="360" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#141414">Immobilien · Bau · Schlieren</text>
      <text x="482" y="410" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#3a3a3a">Steinwiesenstrasse 3 · 8952 Schlieren</text>
    </svg>`
  );
  await sharp(grund)
    .composite([{ input: logoPng, left: 110, top: 150 }])
    .png({ compressionLevel: 9 })
    .toFile(join(appOrdner, "opengraph-image.png"));
  console.log("aufbereitet: opengraph-image.png");
}

/* ---------------------------------------------------------------- Manifest */

const zeilen = [
  "// Automatisch erzeugt von scripts/bilder-aufbereiten.mjs. Nicht von Hand bearbeiten.",
  "// Neu erzeugen mit: npm run bilder",
  "",
  'import type { Bildmanifest } from "./typen";',
  "",
  `export const bildmanifest: Bildmanifest = ${JSON.stringify(manifest, null, 2)} as const;`,
  "",
];
await mkdir(join(wurzel, "lib/bilder"), { recursive: true });
await writeFile(join(wurzel, "lib/bilder/manifest.ts"), zeilen.join("\n"), "utf8");
const dateien = await readdir(zielOrdner);
console.log(`\nFertig: ${dateien.length} Dateien in public/bilder/, ${Object.keys(manifest).length} Bilder im Manifest`);
