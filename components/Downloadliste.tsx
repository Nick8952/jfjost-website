import { FilePdf, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { oeffentlicherPfad } from "@/lib/pfade";
import type { Download } from "@/lib/inhalt/typen";
import stile from "./Downloadliste.module.css";

const groesse = (bytes: number) => (bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB` : `${Math.round(bytes / 1024)} KB`);

/**
 * Downloads als Liste mit Format, Grösse und Seitenzahl. Der Link öffnet das
 * PDF im Browser (target _blank), «Herunterladen» speichert es (download-Attribut).
 * Beide Ziele sind mindestens 44 px hoch.
 */
export function Downloadliste({ downloads }: { downloads: Download[] }) {
  return (
    <ul role="list" className={stile.liste}>
      {downloads.map((d) => {
        const pfad = /^https?:\/\//.test(d.datei) ? d.datei : oeffentlicherPfad(d.datei);
        return (
          <li key={d.datei} className={stile.eintrag}>
            <FilePdf weight="regular" aria-hidden="true" className={stile.symbol} />
            <div className={stile.text}>
              <a href={pfad} target="_blank" rel="noopener" className={stile.titel}>
                {d.titel}
              </a>
              {d.beschreibung && <p className={stile.beschreibung}>{d.beschreibung}</p>}
              <p className={stile.meta}>
                {d.format} · {groesse(d.bytes)}
                {d.seiten ? ` · ${d.seiten} ${d.seiten === 1 ? "Seite" : "Seiten"}` : ""}
              </p>
            </div>
            <a href={pfad} download className={stile.laden} aria-label={`${d.titel} herunterladen (${d.format}, ${groesse(d.bytes)})`}>
              <DownloadSimple weight="bold" aria-hidden="true" />
              <span>Herunterladen</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
