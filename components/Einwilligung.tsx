"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ALLE, KATEGORIEN, KATEGORIE_INFO, KEINE, type Kategorie } from "@/lib/einwilligung";
import { useEinwilligung } from "@/lib/einwilligung-hook";
import stile from "./Einwilligung.module.css";

/**
 * Einwilligungsverwaltung in drei Erscheinungsformen:
 *  - Banner beim ersten Besuch (unten, nicht blockierend): «Alle akzeptieren»,
 *    «Nur notwendige», «Einstellungen» – gleichwertig, nichts vorausgewählt.
 *  - Dialog «Einstellungen» (modal, Fokus gefangen, Escape schliesst).
 *  - Eingebettete Einstellungsansicht auf /datenschutz-einstellungen/ mit
 *    Widerruf; identische Logik.
 */
function Kategorienliste({ auswahl, setAuswahl }: { auswahl: Record<Kategorie, boolean>; setAuswahl: (a: Record<Kategorie, boolean>) => void }) {
  const praefix = useId();
  return (
    <ul role="list" className={stile.kategorien}>
      <li className={stile.kategorie}>
        <div className={stile.kategorieKopf}>
          <span className={stile.kategorieTitel}>Notwendig</span>
          <span className={stile.immer}>immer aktiv</span>
        </div>
        <p className={stile.kategorieText}>Speichert nur Ihre Entscheidung zu dieser Einwilligung im lokalen Speicher Ihres Browsers (Schlüssel «jfjost-einwilligung»). Keine Cookies, keine Übermittlung.</p>
      </li>
      {KATEGORIEN.map((k) => {
        const info = KATEGORIE_INFO[k];
        const id = `${praefix}-${k}`;
        return (
          <li key={k} className={stile.kategorie}>
            <div className={stile.kategorieKopf}>
              <label htmlFor={id} className={stile.kategorieTitel}>
                {info.titel}
              </label>
              <input
                id={id}
                type="checkbox"
                className={stile.schalter}
                checked={auswahl[k]}
                onChange={(e) => setAuswahl({ ...auswahl, [k]: e.target.checked })}
              />
            </div>
            <p className={stile.kategorieText}>{info.text}</p>
            <p className={stile.anbieter}>Anbieter: {info.anbieter}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function Einwilligungseinstellungen({ eingebettet = false, onFertig }: { eingebettet?: boolean; onFertig?: () => void }) {
  const { einwilligung, geladen, setzen, widerrufen } = useEinwilligung();
  const [auswahl, setAuswahl] = useState<Record<Kategorie, boolean>>({ ...KEINE });
  const [meldung, setMeldung] = useState<string>("");
  // Gespeicherte Entscheidung als Ausgangswert übernehmen, sobald sie sich ändert
  // (Muster «Zustand beim Rendern anpassen», kein Effekt nötig).
  const [gesehen, setGesehen] = useState(einwilligung);
  if (einwilligung !== gesehen) {
    setGesehen(einwilligung);
    setAuswahl(einwilligung ? { ...einwilligung.kategorien } : { ...KEINE });
  }

  const speichernUndMelden = (kategorien: Record<Kategorie, boolean>, text: string) => {
    setzen(kategorien);
    setMeldung(text);
    onFertig?.();
  };

  return (
    <div className={eingebettet ? stile.eingebettet : undefined}>
      {eingebettet && geladen && (
        <p className={stile.status} aria-live="polite">
          {einwilligung
            ? `Ihre Entscheidung vom ${new Date(einwilligung.zeitpunkt).toLocaleString("de-CH", { dateStyle: "medium", timeStyle: "short" })}: ${
                KATEGORIEN.filter((k) => einwilligung.kategorien[k]).map((k) => KATEGORIE_INFO[k].titel).join(", ") || "keine externen Inhalte"
              }.`
            : "Sie haben noch keine Entscheidung gespeichert. Externe Inhalte werden nicht geladen."}
        </p>
      )}
      <Kategorienliste auswahl={auswahl} setAuswahl={setAuswahl} />
      <div className={stile.aktionen}>
        <button type="button" className="knopf" onClick={() => speichernUndMelden(auswahl, "Auswahl gespeichert.")}>
          Auswahl speichern
        </button>
        <button type="button" className="knopf knopf--zweit" onClick={() => speichernUndMelden({ ...ALLE }, "Alle externen Inhalte erlaubt.")}>
          Alle akzeptieren
        </button>
        <button type="button" className="knopf knopf--zweit" onClick={() => speichernUndMelden({ ...KEINE }, "Nur notwendige. Keine externen Inhalte.")}>
          Nur notwendige
        </button>
        {eingebettet && einwilligung && (
          <button
            type="button"
            className={stile.widerruf}
            onClick={() => {
              widerrufen();
              setAuswahl({ ...KEINE });
              setMeldung("Einwilligung widerrufen und gespeicherte Entscheidung gelöscht. Eingebettete Inhalte werden entfernt.");
            }}
          >
            Einwilligung widerrufen und löschen
          </button>
        )}
      </div>
      {meldung && (
        <p className={stile.meldung} role="status">
          {meldung}
        </p>
      )}
      <p className={stile.fussnote}>
        Bereits von homegate.ch oder Google gesetzte Cookies kann diese Website nicht löschen; das geht über die Cookie-Einstellungen Ihres Browsers. Einzelheiten in der{" "}
        <Link href="/datenschutz/" className="textlink">Datenschutzerklärung</Link>.
      </p>
    </div>
  );
}

export function Einwilligungsbanner() {
  const { einwilligung, geladen, setzen } = useEinwilligung();
  const [dialog, setDialog] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titelId = useId();

  // Fokus in den Dialog und wieder zurück; Escape schliesst.
  useEffect(() => {
    if (!dialog) return;
    const vorher = document.activeElement as HTMLElement | null;
    const el = dialogRef.current;
    el?.querySelector<HTMLElement>("input, button")?.focus();
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDialog(false);
      if (e.key === "Tab" && el) {
        const fokussierbar = el.querySelectorAll<HTMLElement>("a[href], button, input, [tabindex]:not([tabindex='-1'])");
        const erstes = fokussierbar[0];
        const letztes = fokussierbar[fokussierbar.length - 1];
        if (e.shiftKey && document.activeElement === erstes) {
          e.preventDefault();
          letztes.focus();
        } else if (!e.shiftKey && document.activeElement === letztes) {
          e.preventDefault();
          erstes.focus();
        }
      }
    };
    document.addEventListener("keydown", taste);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", taste);
      document.documentElement.style.overflow = "";
      vorher?.focus();
    };
  }, [dialog]);

  if (!geladen || einwilligung) return null;

  return (
    <>
      {!dialog && (
        <section className={stile.banner} aria-labelledby={`${titelId}-banner`}>
          <div className={stile.bannerInnen}>
            <div className={stile.bannerText}>
              <h2 id={`${titelId}-banner`} className={stile.bannerTitel}>
                Externe Inhalte
              </h2>
              <p>
                Diese Website setzt keine eigenen Cookies. Die Angebotslisten von homegate.ch (Mieten, Kaufen) und die Karte von Google Maps (Kontakt) werden nur mit Ihrer Zustimmung geladen; dabei erhalten diese
                Anbieter Ihre IP-Adresse und setzen Cookies. <Link href="/datenschutz/" className="textlink">Datenschutzerklärung</Link>
              </p>
            </div>
            <div className={stile.bannerAktionen}>
              <button type="button" className="knopf" onClick={() => setzen({ ...ALLE })}>
                Alle akzeptieren
              </button>
              <button type="button" className="knopf knopf--zweit" onClick={() => setzen({ ...KEINE })}>
                Nur notwendige
              </button>
              <button type="button" className="knopf knopf--zweit" onClick={() => setDialog(true)} aria-haspopup="dialog">
                Einstellungen
              </button>
            </div>
          </div>
        </section>
      )}
      {dialog && (
        <div className={stile.hintergrund} onClick={() => setDialog(false)}>
          <div ref={dialogRef} className={stile.dialog} role="dialog" aria-modal="true" aria-labelledby={`${titelId}-dialog`} onClick={(e) => e.stopPropagation()}>
            <h2 id={`${titelId}-dialog`} className={stile.dialogTitel}>
              Cookie- und Datenschutz-Einstellungen
            </h2>
            <p className={stile.dialogText}>Wählen Sie, welche externen Inhalte geladen werden dürfen. Nichts ist vorausgewählt.</p>
            <Einwilligungseinstellungen onFertig={() => setDialog(false)} />
            <button type="button" className={stile.schliessen} onClick={() => setDialog(false)}>
              Schliessen ohne zu speichern
            </button>
          </div>
        </div>
      )}
    </>
  );
}
