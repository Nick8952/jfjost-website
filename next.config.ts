import type { NextConfig } from "next";

/**
 * Zwei Build-Profile aus einer Codebasis:
 *
 *   DEPLOY_TARGET=pages   (Standard) -> statischer Export für GitHub Pages,
 *                                        inkl. Repository-Unterpfad (NEXT_PUBLIC_BASE_PATH).
 *   DEPLOY_TARGET=vercel             -> Server-Build für Vercel, ohne Unterpfad.
 *
 * Die Demo läuft ohne jede Sanity-/Vercel-Variable. Fehlt NEXT_PUBLIC_BASE_PATH,
 * wird ohne Unterpfad gebaut (lokale Vorschau).
 */
const istStatisch = process.env.DEPLOY_TARGET !== "vercel";
const basisPfad = istStatisch ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  output: istStatisch ? "export" : undefined,
  basePath: basisPfad,
  trailingSlash: true,
  reactStrictMode: true,
  // Der statische Export hat keinen Bildserver. Alle Bilder entstehen zur Bauzeit
  // aus assets/original/ (scripts/bilder-aufbereiten.mjs) als AVIF/WebP in
  // mehreren Breiten; components/Bild.tsx liefert sie als <picture> aus.
  // Auf Vercel mit Sanity-Bildern kann diese Zeile entfallen (docs/sanity-vercel-einrichtung.md).
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basisPfad },
};

export default nextConfig;
