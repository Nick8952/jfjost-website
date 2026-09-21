"use client";

import { useRef } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { Bild as Bildtyp } from "@/lib/inhalt/typen";
import { Bild } from "./Bild";
import stile from "./Referenzgalerie.module.css";

/**
 * Fotostreifen eines Referenzprojekts: nativ scrollbar (Touch, Tastatur,
 * Mausrad), mit Scroll-Snap und zwei Knöpfen zum Blättern. Jede Aufnahme trägt
 * ihre Legende («vor / während / nach der Sanierung») direkt unter dem Bild.
 */
export function Referenzgalerie({ bilder, titel }: { bilder: Bildtyp[]; titel: string }) {
  const streifen = useRef<HTMLUListElement>(null);
  const blaettern = (richtung: 1 | -1) => {
    const el = streifen.current;
    if (!el) return;
    const schritt = el.querySelector<HTMLElement>("li")?.getBoundingClientRect().width ?? 320;
    el.scrollBy({ left: richtung * (schritt + 16), behavior: "smooth" });
  };
  return (
    <div className={stile.galerie}>
      <ul ref={streifen} className={stile.streifen} role="list" aria-label={`Fotos: ${titel}`} tabIndex={0}>
        {bilder.map((b, i) => (
          <li key={b.src} className={stile.foto}>
            <figure>
              <Bild bild={b} sizes="(min-width: 64rem) 30rem, 85vw" seitenverhaeltnis="4 / 3" />
              <figcaption className={stile.legende}>
                <span className={stile.nummer}>
                  {i + 1}/{bilder.length}
                </span>
                {b.legende ?? ""}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {bilder.length > 1 && (
        <div className={stile.knoepfe}>
          <button type="button" className={stile.knopf} onClick={() => blaettern(-1)} aria-label={`Vorheriges Foto: ${titel}`}>
            <CaretLeft weight="bold" aria-hidden="true" />
          </button>
          <button type="button" className={stile.knopf} onClick={() => blaettern(1)} aria-label={`Nächstes Foto: ${titel}`}>
            <CaretRight weight="bold" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
