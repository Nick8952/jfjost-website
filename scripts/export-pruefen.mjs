#!/usr/bin/env node
/**
 * Prüft den statischen Export in out/ auf die typischen Fallen einer
 * Auslieferung unter einem Repository-Unterpfad:
 *  - jeder lokale Verweis (href, src, srcset) trägt den Unterpfad und existiert
 *  - jeder Seitenlink führt auf eine vorhandene index.html
 *  - jede Seite trägt noindex (Demo) bzw. keins (NEXT_PUBLIC_INDEXIEREN=ja)
 *  - CSS-url()-Referenzen existieren
 *  - keine localhost-Adresse, keine Sanity-Adresse, kein Token-Muster im Ergebnis
 *  - 404.html vorhanden
 *
 *   node scripts/export-pruefen.mjs --pfad /jfjost-website
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const argumente = process.argv.slice(2);
const index = argumente.indexOf("--pfad");
const basis = index >= 0 && argumente[index + 1] ? argumente[index + 1] : (process.env.NEXT_PUBLIC_BASE_PATH ?? "");
const indexierbar = (process.env.NEXT_PUBLIC_INDEXIEREN ?? "").trim().toLowerCase() === "ja";

const fehler = [];
const warnung = [];

async function alleDateien(ordner) {
  const ergebnis = [];
  for (const eintrag of await readdir(ordner, { withFileTypes: true })) {
    const pfad = join(ordner, eintrag.name);
    if (eintrag.isDirectory()) ergebnis.push(...(await alleDateien(pfad)));
    else ergebnis.push(pfad);
  }
  return ergebnis;
}

if (!existsSync(wurzel)) {
  console.error("out/ fehlt. Zuerst 'npm run build:pages' ausführen.");
  process.exit(1);
}

const dateien = await alleDateien(wurzel);
const htmlDateien = dateien.filter((datei) => datei.endsWith(".html"));

if (!existsSync(join(wurzel, "404.html"))) fehler.push("out/404.html fehlt.");
if (!existsSync(join(wurzel, ".nojekyll"))) warnung.push("out/.nojekyll fehlt – wird beim Deploy angelegt.");

const verbotenesMuster = [
  { muster: /http:\/\/localhost/gi, text: "localhost-Adresse im Ergebnis" },
  { muster: /\.api\.sanity\.io/gi, text: "Sanity-Adresse im Ergebnis" },
  { muster: /\bsk[A-Za-z0-9]{40,}\b/g, text: "möglicher Sanity-Token im Ergebnis" },
  { muster: /SANITY_API_WRITE_TOKEN|SANITY_REVALIDATE_SECRET/g, text: "private Umgebungsvariable im Ergebnis" },
];

for (const datei of dateien.filter((d) => /\.(css|js|txt|json|xml)$/.test(d))) {
  const inhalt = await readFile(datei, "utf8");
  const anzeige = datei.slice(wurzel.length);
  for (const { muster, text } of verbotenesMuster) {
    if (muster.test(inhalt)) fehler.push(`${anzeige}: ${text}.`);
    muster.lastIndex = 0;
  }
}

for (const datei of dateien.filter((d) => d.endsWith(".css"))) {
  const inhalt = await readFile(datei, "utf8");
  const anzeige = datei.slice(wurzel.length);
  for (const treffer of inhalt.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) {
    const ziel = treffer[2];
    if (/^(data:|https?:|#)/.test(ziel)) continue;
    let ohneBasis;
    if (ziel.startsWith("/")) {
      if (basis && !ziel.startsWith(`${basis}/`)) {
        fehler.push(`${anzeige}: url() ohne Unterpfad -> ${ziel}`);
        continue;
      }
      ohneBasis = basis ? ziel.slice(basis.length) : ziel;
    } else {
      ohneBasis = join(datei.slice(wurzel.length), "..", ziel);
    }
    if (!existsSync(join(wurzel, ohneBasis.split("?")[0]))) fehler.push(`${anzeige}: url()-Datei fehlt -> ${ziel}`);
  }
}

for (const datei of htmlDateien) {
  const inhalt = await readFile(datei, "utf8");
  const anzeige = datei.slice(wurzel.length) || "/";
  const hatNoindex = /<meta name="robots" content="[^"]*noindex/i.test(inhalt);
  if (!indexierbar && !hatNoindex) fehler.push(`${anzeige}: kein noindex im Kopfbereich.`);
  if (indexierbar && hatNoindex) fehler.push(`${anzeige}: noindex trotz NEXT_PUBLIC_INDEXIEREN=ja.`);

  const og = /property="og:image" content="([^"]+)"/.exec(inhalt)?.[1];
  if (og && basis && og.split(basis + "/").length !== 2) fehler.push(`${anzeige}: og:image mit doppeltem oder fehlendem Unterpfad: ${og}`);

  for (const { muster, text } of verbotenesMuster) {
    if (muster.test(inhalt)) fehler.push(`${anzeige}: ${text}.`);
    muster.lastIndex = 0;
  }

  const geprueft = inhalt.replace(/<link[^>]*rel="(?:preconnect|dns-prefetch)"[^>]*>/gi, "");
  const verweise = new Set();
  for (const treffer of geprueft.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) verweise.add(treffer[1]);
  for (const treffer of geprueft.matchAll(/srcSet="([^"]+)"|srcset="([^"]+)"/g)) {
    for (const teil of (treffer[1] ?? treffer[2]).split(",")) {
      const adresse = teil.trim().split(/\s+/)[0];
      if (adresse.startsWith("/")) verweise.add(adresse);
    }
  }

  for (const verweis of [...verweise].filter((eintrag) => !eintrag.startsWith("//"))) {
    if (basis && !verweis.startsWith(`${basis}/`) && verweis !== basis) {
      fehler.push(`${anzeige}: Verweis ohne Unterpfad -> ${verweis}`);
      continue;
    }
    const ohneBasis = decodeURIComponent(basis ? verweis.slice(basis.length) || "/" : verweis);
    const ziel = join(wurzel, ohneBasis);
    if (extname(ohneBasis)) {
      if (!existsSync(ziel)) fehler.push(`${anzeige}: Datei fehlt -> ${verweis}`);
      continue;
    }
    if (!existsSync(join(ziel, "index.html"))) {
      try {
        const info = await stat(ziel);
        if (!info.isFile()) fehler.push(`${anzeige}: Seite fehlt -> ${verweis}`);
      } catch {
        fehler.push(`${anzeige}: Seite fehlt -> ${verweis}`);
      }
    }
  }
}

console.log(`Geprüft: ${htmlDateien.length} Seiten, ${dateien.length} Dateien, Unterpfad "${basis || "(keiner)"}"`);
for (const eintrag of warnung) console.log(`  Hinweis: ${eintrag}`);
if (fehler.length === 0) {
  console.log("Keine Fehler gefunden.");
} else {
  console.log(`\n${fehler.length} Fehler:`);
  for (const eintrag of fehler) console.log(`  - ${eintrag}`);
  process.exit(1);
}
