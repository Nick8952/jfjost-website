import type { Metadata } from "next";
import { Info } from "@phosphor-icons/react/dist/ssr";
import { Einblenden } from "@/components/Einblenden";
import { Fliesstext } from "@/components/Fliesstext";
import { Referenzgalerie } from "@/components/Referenzgalerie";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Handlungsaufforderung } from "@/components/Bausteine";
import { inhalt } from "@/lib/inhalt";
import { seitenMetadaten } from "@/lib/metadaten";
import bausteine from "@/components/Bausteine.module.css";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const r = await inhalt.referenzen();
  return seitenMetadaten(r.seo.titel, r.seo.beschreibung, "/referenzen/");
}

/**
 * Referenzen als Baujournal: jedes Projekt mit Ort, Zeitraum, Stichworten und
 * seinem Fotostreifen. Reihenfolge wie auf der bisherigen Website (neueste zuerst).
 */
export default async function Referenzseite() {
  const r = await inhalt.referenzen();
  return (
    <>
      <Seitenkopf kopf={r.kopf} />
      <section className={stile.inhalt}>
        <div className="rahmen">
          <div className={stile.projekte}>
            {r.projekte.map((p, i) => (
              <Einblenden key={p.slug} als="article" className={stile.projekt}>
                <div className={stile.projektKopf}>
                  <div>
                    <p className={stile.projektMeta}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {p.zeitraum && <span>{p.zeitraum}</span>}
                      {p.ort && <span>{p.ort}</span>}
                    </p>
                    <h2 className={stile.projektTitel} id={p.slug}>
                      {p.titel}
                    </h2>
                  </div>
                  <div>
                    <ul role="list" className={stile.projektLeistungen}>
                      {p.leistungen.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                    {p.text && <Fliesstext text={p.text} className={stile.projektText} />}
                  </div>
                </div>
                <Referenzgalerie bilder={p.bilder} titel={p.titel} />
              </Einblenden>
            ))}
          </div>
          {r.hinweis && (
            <div className={bausteine.hinweisAbschnitt}>
              <div className={bausteine.hinweis}>
                <Info weight="fill" aria-hidden="true" className={bausteine.hinweisSymbol} />
                <div>
                  {r.hinweis.titel && <h2 className={bausteine.hinweisTitel}>{r.hinweis.titel}</h2>}
                  <Fliesstext text={r.hinweis.text} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Handlungsaufforderung
        baustein={{
          _type: "handlungsaufforderung",
          _key: "referenzen-kontakt",
          titel: "Ihr Bauvorhaben in guten Händen",
          text: "Von der Vorabklärung bis zur Abnahme: Unsere Bauabteilung begleitet Sie Schritt für Schritt.",
          aktionen: [
            { text: "Kontakt aufnehmen", ziel: "/kontakt/?anliegen=Baudienstleistungen" },
            { text: "Leistungen ansehen", ziel: "/renovationen/" },
          ],
        }}
      />
    </>
  );
}
