"use client";

import { ArrowSquareOut, MapPin } from "@phosphor-icons/react/dist/ssr";
import { useEinwilligung } from "@/lib/einwilligung-hook";
import stile from "./Karte.module.css";

const KARTE_URL = "https://www.google.com/maps?q=Steinwiesenstrasse%203%2C%208952%20Schlieren&z=15&output=embed";

/**
 * Standortkarte (Google Maps) nur nach Einwilligung «karte». Vorher ein
 * Platzhalter mit Adresse, Knopf «Karte anzeigen» und Routenlink.
 */
export function Karte({ hinweis, routenLink, adresse }: { hinweis: string; routenLink: string; adresse: string }) {
  const { erlaubt, geladen, setzen, einwilligung } = useEinwilligung();
  const aktiv = geladen && erlaubt("karte");
  const routen = (
    <a className="knopf knopf--zweit" href={routenLink} target="_blank" rel="noopener noreferrer">
      <span>Route in Google Maps öffnen</span>
      <ArrowSquareOut weight="bold" aria-hidden="true" />
    </a>
  );
  if (aktiv) {
    return (
      <div className={stile.karte}>
        <iframe className={stile.iframe} src={KARTE_URL} title="Karte: Steinwiesenstrasse 3, 8952 Schlieren (Google Maps)" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="" />
        <div className={stile.unterzeile}>
          {routen}
          <button type="button" className={stile.zurueck} onClick={() => setzen({ ...einwilligung!.kategorien, karte: false })}>
            Karte wieder ausblenden
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={stile.platzhalter}>
      <MapPin weight="fill" aria-hidden="true" className={stile.symbol} />
      <p className={stile.adresse}>{adresse}</p>
      <p className={stile.hinweis}>{hinweis}</p>
      <div className={stile.aktionen}>
        <button type="button" className="knopf" onClick={() => setzen({ ...(einwilligung?.kategorien ?? {}), karte: true })} disabled={!geladen}>
          Karte anzeigen
        </button>
        {routen}
      </div>
    </div>
  );
}
