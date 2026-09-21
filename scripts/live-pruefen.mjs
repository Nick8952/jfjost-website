#!/usr/bin/env node
/**
 * Prüft die veröffentlichte Demo per HTTP: jede Route antwortet mit 200, trägt
 * noindex, alle referenzierten lokalen Dateien (CSS, JS, Bilder, PDFs) sind
 * abrufbar, unbekannte Adressen liefern die eigene 404-Seite, robots.txt
 * erlaubt das Crawlen.
 *
 *   node scripts/live-pruefen.mjs https://nick8952.github.io/jfjost-website
 */
const basis = (process.argv[2] ?? process.env.LIVE_URL ?? "").replace(/\/$/, "");
if (!basis) {
  console.error("Adresse angeben: node scripts/live-pruefen.mjs https://…/jfjost-website");
  process.exit(1);
}
const unterpfad = new URL(basis).pathname.replace(/\/$/, "");
const routen = ["/", "/mieten/", "/kaufen/", "/formulare/", "/renovationen/", "/referenzen/", "/unternehmen/", "/team/", "/jobs/", "/engagement/", "/links/", "/kontakt/", "/impressum/", "/datenschutz/", "/datenschutz-einstellungen/"];

const fehler = [];
const geprueft = new Set();
const abrufen = (url) => fetch(url, { redirect: "manual", headers: { "user-agent": "live-pruefen" } });

function dateien(html) {
  const set = new Set();
  for (const t of html.matchAll(/(?:href|src)="([^"]+\.(?:css|js|png|webp|avif|ico|svg|txt|pdf))(?:\?[^"]*)?"/g)) if (t[1].startsWith("/")) set.add(t[1]);
  for (const t of html.matchAll(/srcset="([^"]+)"/gi)) for (const teil of t[1].split(",")) {
    const pfad = teil.trim().split(/\s+/)[0];
    if (pfad.startsWith("/")) set.add(pfad);
  }
  return [...set];
}

for (const route of routen) {
  const antwort = await abrufen(basis + route);
  if (antwort.status !== 200) {
    fehler.push(`${route}: Status ${antwort.status}`);
    continue;
  }
  const html = (await antwort.text()).replace(/<link rel="preconnect"[^>]*>/g, "");
  if (!/<meta name="robots" content="noindex/.test(html)) fehler.push(`${route}: kein noindex`);
  if (!/<title>[^<]+<\/title>/.test(html)) fehler.push(`${route}: kein Titel`);
  for (const v of [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((t) => t[1]).filter((v) => v.startsWith("/") && !v.startsWith("//"))) {
    if (!v.startsWith(unterpfad + "/") && v !== unterpfad) fehler.push(`${route}: Verweis ohne Unterpfad: ${v}`);
  }
  const og = /property="og:image" content="([^"]+)"/.exec(html)?.[1];
  if (!og) fehler.push(`${route}: kein og:image`);
  else if (unterpfad && og.split(unterpfad + "/").length !== 2) fehler.push(`${route}: og:image mit falschem Unterpfad: ${og}`);
  else if (!geprueft.has(og)) {
    geprueft.add(og);
    if ((await abrufen(og)).status !== 200) fehler.push(`${route}: og:image nicht abrufbar`);
  }
  const liste = dateien(html);
  let n = 0;
  for (const datei of liste) {
    if (geprueft.has(datei)) continue;
    geprueft.add(datei);
    n += 1;
    const r = await abrufen(new URL(datei, basis + "/").toString());
    if (r.status !== 200) fehler.push(`${route}: Datei ${datei} -> ${r.status}`);
  }
  console.log(`ok  ${route} (${n} neue Dateien geprüft)`);
}

const nichtVorhanden = await abrufen(basis + "/diese-seite-gibt-es-nicht/");
if (nichtVorhanden.status !== 404) fehler.push(`Unbekannte Adresse liefert ${nichtVorhanden.status} statt 404`);
else if (!(await nichtVorhanden.text()).includes("Diese Seite gibt es nicht")) fehler.push("404 zeigt nicht die eigene Fehlerseite");
else console.log("ok  404-Seite");

const robots = await abrufen(basis + "/robots.txt");
if (robots.status !== 200 || !/Allow: \//.test(await robots.text())) fehler.push("robots.txt fehlt oder verbietet das Crawlen");
else console.log("ok  robots.txt");

if (fehler.length) {
  console.error(`\n${fehler.length} Fehler:\n- ${fehler.join("\n- ")}`);
  process.exit(1);
}
console.log(`\nAlles in Ordnung: ${routen.length} Routen, ${geprueft.size} Dateien.`);
