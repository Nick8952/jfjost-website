"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CaretDown, List, Phone, X } from "@phosphor-icons/react/dist/ssr";
import type { Navigationspunkt } from "@/lib/inhalt/typen";
import stile from "./Navigation.module.css";

/**
 * Hauptnavigation. Desktop: Gruppen als Knöpfe mit Ausklappmenü (Klick, Enter,
 * Escape; aria-expanded). Mobil: Knopf «Menü» öffnet ein Panel über die volle
 * Höhe mit allen Gruppen offen – eine Ebene, keine versteckten Untermenüs.
 */
export function Navigation({ punkte, telefon, telefonLink }: { punkte: Navigationspunkt[]; telefon: string; telefonLink: string }) {
  const pfad = usePathname();
  // Zustand ist an den Pfad gebunden: nach einem Seitenwechsel gilt er nicht mehr,
  // Panel und Ausklappmenüs sind damit automatisch geschlossen.
  const [zustand, setZustand] = useState<{ pfad: string | null; offen: boolean; gruppe: string | null }>({ pfad: null, offen: false, gruppe: null });
  const offen = zustand.pfad === pfad && zustand.offen;
  const gruppe = zustand.pfad === pfad ? zustand.gruppe : null;
  const setOffen = (wert: boolean | ((o: boolean) => boolean)) => setZustand({ pfad, offen: typeof wert === "function" ? wert(offen) : wert, gruppe });
  const setGruppe = (wert: string | null | ((g: string | null) => string | null)) => setZustand({ pfad, offen, gruppe: typeof wert === "function" ? wert(gruppe) : wert });
  const navRef = useRef<HTMLElement>(null);
  const menueId = useId();

  // Escape und Klick ausserhalb schliessen Ausklappmenüs
  useEffect(() => {
    const taste = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setZustand({ pfad, offen: false, gruppe: null });
      if (offen) navRef.current?.querySelector<HTMLButtonElement>("button[data-menue]")?.focus();
    };
    const klick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setZustand((z) => (z.gruppe ? { ...z, gruppe: null } : z));
    };
    document.addEventListener("keydown", taste);
    document.addEventListener("click", klick);
    return () => {
      document.removeEventListener("keydown", taste);
      document.removeEventListener("click", klick);
    };
  }, [offen, pfad]);

  // Mobiles Panel: Seite dahinter weder scrollen noch fokussieren (inert)
  useEffect(() => {
    document.documentElement.style.overflow = offen ? "hidden" : "";
    const hintergrund = document.querySelectorAll<HTMLElement>("main, footer, [data-hinter-menue]");
    hintergrund.forEach((el) => (offen ? el.setAttribute("inert", "") : el.removeAttribute("inert")));
    return () => {
      document.documentElement.style.overflow = "";
      hintergrund.forEach((el) => el.removeAttribute("inert"));
    };
  }, [offen]);

  const aktiv = (ziel: string) => (ziel === "/" ? pfad === "/" : pfad?.startsWith(ziel));
  const gruppeAktiv = (p: Navigationspunkt) => aktiv(p.ziel) || p.unterpunkte?.some((u) => aktiv(u.ziel));

  return (
    <nav ref={navRef} className={stile.nav} aria-label="Hauptnavigation">
      <button
        type="button"
        className={stile.menueKnopf}
        data-menue
        aria-expanded={offen}
        aria-controls={menueId}
        onClick={() => setOffen((o) => !o)}
      >
        {offen ? <X weight="bold" aria-hidden="true" /> : <List weight="bold" aria-hidden="true" />}
        <span>{offen ? "Schliessen" : "Menü"}</span>
      </button>

      <div id={menueId} className={[stile.panel, offen ? stile.panelOffen : ""].join(" ")}>
        <ul className={stile.liste} role="list">
          {punkte.map((p, index) =>
            p.unterpunkte ? (
              <li key={p.text} className={stile.gruppe}>
                <button
                  type="button"
                  className={[stile.gruppenKnopf, gruppeAktiv(p) ? stile.aktiv : ""].join(" ")}
                  aria-expanded={gruppe === p.text}
                  aria-controls={`${menueId}-gruppe-${index}`}
                  onClick={() => setGruppe((g) => (g === p.text ? null : p.text))}
                >
                  {p.text}
                  <CaretDown weight="bold" aria-hidden="true" className={stile.caret} />
                </button>
                <ul id={`${menueId}-gruppe-${index}`} className={[stile.unterliste, gruppe === p.text ? stile.unterlisteOffen : ""].join(" ")} role="list">
                  {p.unterpunkte.map((u) => (
                    <li key={u.ziel}>
                      <Link href={u.ziel} className={[stile.unterpunkt, aktiv(u.ziel) ? stile.aktiv : ""].join(" ")} aria-current={aktiv(u.ziel) ? "page" : undefined}>
                        <span className={stile.unterpunktText}>{u.text}</span>
                        {u.hinweis && <span className={stile.unterpunktHinweis}>{u.hinweis}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={p.text}>
                <Link href={p.ziel} className={[stile.punkt, aktiv(p.ziel) ? stile.aktiv : ""].join(" ")} aria-current={aktiv(p.ziel) ? "page" : undefined}>
                  {p.text}
                </Link>
              </li>
            )
          )}
        </ul>
        <div className={stile.panelFuss}>
          <a className="knopf" href={telefonLink}>
            <Phone weight="bold" aria-hidden="true" />
            <span>{telefon}</span>
          </a>
          <p className={stile.panelAdresse}>Steinwiesenstrasse 3 · 8952 Schlieren</p>
        </div>
      </div>
    </nav>
  );
}
