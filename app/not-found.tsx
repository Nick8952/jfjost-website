import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import stile from "./nichtgefunden.module.css";

/** Gestaltete 404-Seite; Next exportiert sie als out/404.html, GitHub Pages liefert sie bei unbekannten Adressen aus. */
export default function NichtGefunden() {
  return (
    <section className={`abschnitt ${stile.seite}`}>
      <div className="rahmen">
        <p className="kicker">Fehler 404</p>
        <h1 className={stile.titel}>Diese Seite gibt es nicht.</h1>
        <p className={stile.text}>Die Adresse ist falsch geschrieben, oder die Seite wurde verschoben. Vielleicht hilft einer dieser Wege weiter:</p>
        <ul role="list" className={stile.liste}>
          {[
            ["Startseite", "/"],
            ["Mietangebote ansehen", "/mieten/"],
            ["Kaufangebote ansehen", "/kaufen/"],
            ["Renovationen", "/renovationen/"],
            ["Kontakt aufnehmen", "/kontakt/"],
          ].map(([text, ziel]) => (
            <li key={ziel}>
              <Link href={ziel} className="pfeillink">
                <span>{text}</span>
                <ArrowRight weight="bold" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
