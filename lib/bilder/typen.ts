/** Eine erzeugte Bildvariante (Breite in CSS-Pixeln, Pfad relativ zur Website-Wurzel). */
export type Bildvariante = { breite: number; pfad: string };

/** Eintrag im automatisch erzeugten Bildmanifest (lib/bilder/manifest.ts). */
export type Manifesteintrag = {
  breite: number;
  hoehe: number;
  standard: string;
  varianten: { avif: Bildvariante[]; webp: Bildvariante[] };
  unschaerfe: string;
};

export type Bildmanifest = Record<string, Manifesteintrag>;
