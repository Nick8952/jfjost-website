#!/usr/bin/env node
/**
 * Lädt die Originaldateien der bisherigen Website www.jfjost.ch erneut nach
 * assets/original/ (Ordner liegt nicht im Repository, siehe .gitignore).
 * Quelle jeder Datei steht in assets/original/manifest.json – diese Liste ist
 * versioniert, die Binärdateien nicht.
 *
 *   npm run originale
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPfad = join(wurzel, "assets/original/manifest.json");
if (!existsSync(manifestPfad)) {
  console.error("assets/original/manifest.json fehlt.");
  process.exit(1);
}
const manifest = JSON.parse(await readFile(manifestPfad, "utf8"));
let ok = 0;
for (const eintrag of manifest.dateien) {
  const ziel = join(wurzel, "assets/original", eintrag.datei);
  if (existsSync(ziel)) {
    ok += 1;
    continue;
  }
  await mkdir(dirname(ziel), { recursive: true });
  const antwort = await fetch(encodeURI(eintrag.quelle), { headers: { "user-agent": "Mozilla/5.0" } });
  if (!antwort.ok) {
    console.warn(`  fehlt (${antwort.status}): ${eintrag.quelle}`);
    continue;
  }
  await writeFile(ziel, Buffer.from(await antwort.arrayBuffer()));
  ok += 1;
  console.log(`  geladen: ${eintrag.datei}`);
}
console.log(`${ok} von ${manifest.dateien.length} Dateien vorhanden.`);
