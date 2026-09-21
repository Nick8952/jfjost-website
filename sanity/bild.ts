import imageUrlBuilder from "@sanity/image-url";
import type { Bild } from "@/lib/inhalt/typen";
import { sanityClient } from "./client";

/** Rohform eines Bildes aus GROQ (siehe sanity/abfragen.ts, Fragment BILD). */
export type SanityBild = {
  asset?: { _ref?: string; url?: string; metadata?: { dimensions?: { width: number; height: number }; lqip?: string } };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  legende?: string;
};

const builder = imageUrlBuilder(sanityClient);
const breiten = [320, 480, 640, 960, 1280, 1600, 1920];

/**
 * Wandelt ein Sanity-Bild in den gemeinsamen Bildtyp: Varianten über das
 * Sanity-CDN (AVIF/WebP je Breite), Masse und LQIP aus den Metadaten.
 * `absolut: true` sagt components/Bild.tsx, dass kein Unterpfad davorgehört.
 */
export function sanityBild(bild: SanityBild | null | undefined, altFallback = ""): Bild | undefined {
  if (!bild?.asset) return undefined;
  const dim = bild.asset.metadata?.dimensions ?? { width: 1600, height: 1000 };
  // auto("format") lässt das Sanity-CDN je nach Browser AVIF oder WebP liefern;
  // die Varianten stehen deshalb nur einmal (unter webp) im Bildtyp.
  const basis = builder.image(bild).auto("format").fit("crop");
  const varianten = breiten.filter((b) => b <= dim.width).map((b) => ({ breite: b, pfad: basis.width(b).quality(80).url() }));
  return {
    src: basis.width(Math.min(dim.width, 1600)).url(),
    breite: dim.width,
    hoehe: dim.height,
    alt: bild.alt ?? altFallback,
    varianten: { avif: [], webp: varianten },
    unschaerfe: bild.asset.metadata?.lqip ?? "",
    absolut: true,
    ...(bild.legende ? { legende: bild.legende } : {}),
  };
}
