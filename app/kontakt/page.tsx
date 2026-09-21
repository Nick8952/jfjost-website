import type { Metadata } from "next";
import { Karte } from "@/components/Karte";
import { Kontaktformular } from "@/components/Kontaktformular";
import { Seitenkopf } from "@/components/Seitenkopf";
import { inhalt } from "@/lib/inhalt";
import { seitenMetadaten } from "@/lib/metadaten";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const k = await inhalt.kontakt();
  return seitenMetadaten(k.seo.titel, k.seo.beschreibung, "/kontakt/");
}

export default async function Kontaktseite() {
  const [k, e] = await Promise.all([inhalt.kontakt(), inhalt.einstellungen()]);
  const { kontakt, oeffnungszeiten } = e;
  return (
    <>
      <Seitenkopf kopf={k.kopf} />
      <section className={stile.inhalt}>
        <div className={`rahmen ${stile.kontakt}`}>
          <div>
            <p className="kicker">Kontaktformular</p>
            <h2 className={stile.formularTitel}>Schreiben Sie uns</h2>
            <Kontaktformular anliegen={k.anliegen} empfaenger={kontakt.email} hinweis={k.formularHinweis} />
          </div>
          <div className={stile.kontaktSpalte}>
            <div className={stile.kontaktBlock}>
              <h2>Adresse</h2>
              <address>
                {kontakt.firma}
                <br />
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
            <div className={stile.kontaktBlock}>
              <h2>Öffnungszeiten</h2>
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
            </div>
            <div>
              <p className="kicker">Anfahrt</p>
              <Karte hinweis={k.karteHinweis} routenLink={kontakt.routenLink} adresse={`${kontakt.strasse}, ${kontakt.plz} ${kontakt.ort}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
