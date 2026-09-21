import Link from "next/link";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import type { WebsiteEinstellungen } from "@/lib/inhalt/typen";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import stile from "./Kopf.module.css";

/**
 * Kopfzeile: Logo-Quadrat mit Wortmarke, Hauptnavigation mit drei Gruppen
 * (Immobilien, Bau, Über uns) plus Kontakt, Telefon als gelber Knopf.
 * Bleibt beim Scrollen oben; auf schmalen Bildschirmen öffnet der Knopf «Menü»
 * ein vollflächiges Panel (components/Navigation.tsx).
 */
export function Kopf({ einstellungen }: { einstellungen: WebsiteEinstellungen }) {
  const { kontakt } = einstellungen;
  return (
    <header className={stile.kopf}>
      <div className={`rahmen ${stile.zeile}`}>
        <Link href="/" className={stile.marke} aria-label="J.F. Jost & Co – zur Startseite" data-hinter-menue>
          <Logo groesse={44} className={stile.logo} />
          <span className={stile.wortmarke}>
            <span className={stile.name}>J.F. Jost &amp; Co</span>
            <span className={stile.zusatz}>Immobilien · Bau · Schlieren</span>
          </span>
        </Link>
        <Navigation punkte={einstellungen.navigation} telefon={kontakt.telefon} telefonLink={kontakt.telefonLink} />
        <a className={`knopf ${stile.telefon}`} href={kontakt.telefonLink}>
          <Phone weight="bold" aria-hidden="true" />
          <span>{kontakt.telefon}</span>
        </a>
      </div>
    </header>
  );
}
