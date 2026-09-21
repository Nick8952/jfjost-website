#!/usr/bin/env node
/**
 * Statischer Vorschauserver für out/. Bildet GitHub Pages nach, inklusive
 * Repository-Unterpfad und 404.html, damit sich Deep-Links und Pfade vor dem
 * Deploy prüfen lassen.
 *
 *   node scripts/vorschau-server.mjs [--port 4321] [--pfad /jfjost-website]
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const argumente = process.argv.slice(2);
const wert = (name, standard) => {
  const index = argumente.indexOf(name);
  return index >= 0 && argumente[index + 1] ? argumente[index + 1] : standard;
};
const port = Number(wert("--port", "4321"));
const basis = wert("--pfad", process.env.NEXT_PUBLIC_BASE_PATH ?? "");

const typen = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

createServer(async (anfrage, antwort) => {
  let pfad = decodeURIComponent((anfrage.url ?? "/").split("?")[0]);
  if (basis && pfad !== basis && !pfad.startsWith(`${basis}/`)) {
    antwort.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    antwort.end(`Ausserhalb des Unterpfads ${basis}`);
    return;
  }
  if (basis) pfad = pfad.slice(basis.length) || "/";
  const kandidaten = pfad.endsWith("/") ? [join(pfad, "index.html")] : [pfad, `${pfad}.html`, join(pfad, "index.html")];
  for (const kandidat of kandidaten) {
    const datei = join(wurzel, normalize(kandidat).replace(/^(\.\.[/\\])+/, ""));
    try {
      const info = await stat(datei);
      if (!info.isFile()) continue;
      antwort.writeHead(200, { "content-type": typen[extname(datei)] ?? "application/octet-stream", "cache-control": "no-store" });
      antwort.end(await readFile(datei));
      return;
    } catch {
      // nächster Kandidat
    }
  }
  try {
    antwort.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    antwort.end(await readFile(join(wurzel, "404.html")));
  } catch {
    antwort.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    antwort.end("404");
  }
}).listen(port, () => console.log(`Vorschau: http://localhost:${port}${basis || "/"}`));
