"use client";

import { useEffect, useState } from "react";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { useEinwilligung } from "@/lib/einwilligung-hook";
import type { ExterneAngebote } from "@/lib/inhalt/typen";
import stile from "./Angebotseinbettung.module.css";

/**
 * Miet- oder Kaufangebote von homegate.ch.
 *
 * Ohne Einwilligung: Platzhalter mit Erklärung, Knopf «Angebote anzeigen»
 * (erteilt die Einwilligung «homegate») und gleichwertigem Direktlink.
 * Mit Einwilligung: <iframe> der Homegate-Trefferliste, darunter weiterhin der
 * Direktlink; nach 12 s erscheint ein Hinweis für den Fall, dass nichts
 * sichtbar ist (ob der Inhalt tatsächlich geladen wurde, lässt sich wegen der
 * Same-Origin-Regel nicht feststellen). Widerruf entfernt den iframe.
 */
export function Angebotseinbettung({ angebote, art }: { angebote: ExterneAngebote; art: "mieten" | "kaufen" }) {
  const { erlaubt, geladen, setzen, einwilligung } = useEinwilligung();
  const eintrag = angebote[art];
  const aktiv = geladen && erlaubt("homegate") && eintrag.einbettungAktiv;
  const [hinweisAb, setHinweisAb] = useState(false);
  const hinweis = aktiv && hinweisAb;

  useEffect(() => {
    if (!aktiv) return;
    const t = window.setTimeout(() => setHinweisAb(true), 12000);
    return () => window.clearTimeout(t);
  }, [aktiv]);

  const direktlink = (
    <a className="knopf knopf--zweit" href={eintrag.url} target="_blank" rel="noopener noreferrer">
      <span>Direkt auf homegate.ch öffnen</span>
      <ArrowSquareOut weight="bold" aria-hidden="true" />
    </a>
  );

  return (
    <section className={stile.bereich} aria-labelledby={`angebote-${art}`}>
      <div className="rahmen">
        <p className="kicker">{angebote.anbieter}</p>
        <div className={stile.kopf}>
          <h2 id={`angebote-${art}`}>{eintrag.titel}</h2>
          <p className={stile.text}>{eintrag.text}</p>
        </div>

        {aktiv ? (
          <div className={stile.einbettung}>
            <iframe
              className={stile.iframe}
              src={eintrag.url}
              title={`${eintrag.titel} auf homegate.ch`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow=""
              // Homegate braucht Skripte, eigene Herkunft (Cookies/Storage), Formulare (Filter) und
              // neue Tabs (Inserat öffnen). Mit allow-same-origin + allow-scripts ist die Sandbox
              // nur eine schwache Schranke; sie verhindert vor allem Top-Navigation ohne Nutzeraktion.
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
            />
            <div className={stile.unterzeile}>
              {hinweis && (
                <p className={stile.stoerung} role="status">
                  {angebote.stoerungHinweis}
                </p>
              )}
              {direktlink}
              <button type="button" className={stile.zurueck} onClick={() => setzen({ ...einwilligung!.kategorien, homegate: false })}>
                Einbettung wieder ausblenden
              </button>
            </div>
          </div>
        ) : (
          <div className={stile.platzhalter}>
            <div className={stile.platzhalterInnen}>
              <h3 className={stile.platzhalterTitel}>{angebote.platzhalterTitel}</h3>
              <p className={stile.platzhalterText}>{angebote.platzhalterText}</p>
              <div className={stile.aktionen}>
                <button type="button" className="knopf" onClick={() => {
                    setHinweisAb(false);
                    setzen({ ...(einwilligung?.kategorien ?? {}), homegate: true });
                  }} disabled={!geladen}>
                  Angebote hier anzeigen
                </button>
                {direktlink}
              </div>
              <p className={stile.fussnote}>
                Mit «Angebote hier anzeigen» erlauben Sie das Laden von homegate.ch auf dieser Website (Kategorie «Immobilienangebote»). Änderbar unter Cookie-Einstellungen.
              </p>
            </div>
          </div>
        )}
        <p className={stile.stand}>Angebote, Preise und Verfügbarkeiten stammen ausschliesslich von homegate.ch. Einbettung zuletzt geprüft am {new Date(angebote.zuletztGeprueft).toLocaleDateString("de-CH", { dateStyle: "long" })}.</p>
      </div>
    </section>
  );
}
