import Link from "next/link";
import type { WebsiteEinstellungen } from "@/lib/inhalt/typen";
import { Logo } from "./Logo";
import stile from "./Fuss.module.css";

/**
 * Fusszeile auf Schwarz mit gelber Kante: Adresse, Öffnungszeiten, die drei
 * Navigationsgruppen, Mitgliedschaften, Rechtslinks und der Demo-Hinweis.
 * Impressum, Datenschutz und Cookie-Einstellungen sind damit auf jeder Seite
 * erreichbar.
 */
export function Fuss({ einstellungen }: { einstellungen: WebsiteEinstellungen }) {
  const { kontakt, oeffnungszeiten, navigation, fussnavigation, mitgliedschaften, demoHinweis } = einstellungen;
  return (
    <footer className={stile.fuss}>
      <div className={`rahmen ${stile.raster}`}>
        <div className={stile.adresse}>
          <Logo groesse={56} />
          <p className={stile.firma}>{kontakt.firma}</p>
          <address className={stile.anschrift}>
            {kontakt.strasse}
            <br />
            {kontakt.plz} {kontakt.ort}
          </address>
          <p>
            <a href={kontakt.telefonLink}>{kontakt.telefon}</a>
            <br />
            <a href={`mailto:${kontakt.email}`}>{kontakt.email}</a>
          </p>
        </div>

        <div className={stile.spalte}>
          <h2 className={stile.titel}>Öffnungszeiten</h2>
          <dl className={stile.zeiten}>
            {oeffnungszeiten.map((z) => (
              <div key={z.tage}>
                <dt>{z.tage}</dt>
                {z.zeiten.map((t) => (
                  <dd key={t}>{t}</dd>
                ))}
              </div>
            ))}
          </dl>
          <a className={stile.route} href={kontakt.routenLink} target="_blank" rel="noopener noreferrer">
            Route in Google Maps öffnen
          </a>
        </div>

        {navigation
          .filter((p) => p.unterpunkte)
          .map((p) => (
            <div key={p.text} className={stile.spalte}>
              <h2 className={stile.titel}>{p.text}</h2>
              <ul role="list" className={stile.links}>
                {p.unterpunkte!.map((u) => (
                  <li key={u.ziel}>
                    <Link href={u.ziel}>{u.text}</Link>
                  </li>
                ))}
                {p.text === "Über uns" && (
                  <li>
                    <Link href="/kontakt/">Kontakt</Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
      </div>

      <div className={`rahmen ${stile.mitglied}`}>
        <h2 className={stile.titel}>Mitgliedschaften</h2>
        <p>{mitgliedschaften.join(" · ")}</p>
      </div>

      <div className={`rahmen ${stile.unten}`}>
        <ul role="list" className={stile.rechtslinks}>
          {fussnavigation.map((v) => (
            <li key={v.ziel}>
              <Link href={v.ziel}>{v.text}</Link>
            </li>
          ))}
        </ul>
        <p className={stile.demo}>{demoHinweis}</p>
      </div>
    </footer>
  );
}
