import Link from "next/link";
import { ArrowRight, ArrowSquareOut, Info, Warning } from "@phosphor-icons/react/dist/ssr";
import type { Baustein, Download, ExterneAngebote, Handlungsaufforderung as Handlungsaufforderungtyp, Verweis } from "@/lib/inhalt/typen";
import { Angebotseinbettung } from "./Angebotseinbettung";
import { Bild } from "./Bild";
import { Downloadliste } from "./Downloadliste";
import { Einblenden } from "./Einblenden";
import { Fliesstext } from "./Fliesstext";
import stile from "./Bausteine.module.css";

/** Interne Ziele über <Link>, tel:/mailto:/https: als <a>. */
export function Aktion({ verweis, klasse }: { verweis: Verweis; klasse: string }) {
  const extern = verweis.extern || /^(https?:|mailto:|tel:)/.test(verweis.ziel);
  const inhalt = (
    <>
      <span>{verweis.text}</span>
      {/^https?:/.test(verweis.ziel) ? <ArrowSquareOut weight="bold" aria-hidden="true" /> : <ArrowRight weight="bold" aria-hidden="true" />}
    </>
  );
  return extern ? (
    <a className={klasse} href={verweis.ziel} {...(/^https?:/.test(verweis.ziel) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inhalt}
    </a>
  ) : (
    <Link className={klasse} href={verweis.ziel}>
      {inhalt}
    </Link>
  );
}

export function Handlungsaufforderung({ baustein }: { baustein: Handlungsaufforderungtyp }) {
  return (
    <section className={`abschnitt abschnitt--nacht ${stile.cta}`}>
      <div className={`rahmen ${stile.ctaInnen}`}>
        <div>
          <h2 className={stile.ctaTitel}>{baustein.titel}</h2>
          {baustein.text && <p className={stile.ctaText}>{baustein.text}</p>}
        </div>
        <div className={stile.ctaAktionen}>
          {baustein.aktionen.map((a, i) => (
            <Aktion key={a.ziel} verweis={a} klasse={i === 0 ? "knopf" : "knopf knopf--zweit"} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Kontext = { downloads: Download[]; angebote: ExterneAngebote };

/**
 * Baustein-Renderer für alle Seiten aus data/seiten.ts (und später aus Sanity).
 * Jeder Baustein hat seine eigene Form; die Reihenfolge bestimmt der Inhalt.
 */
export function Bausteine({ bausteine, kontext }: { bausteine: Baustein[]; kontext: Kontext }) {
  return (
    <>
      {bausteine.map((b, index) => {
        const wechsel = index % 2 === 1 ? "abschnitt--beton" : "";
        switch (b._type) {
          case "textblock":
            return (
              <section key={b._key} className={`abschnitt ${wechsel}`}>
                <Einblenden className={`rahmen ${stile.textblock} ${b.breite === "breit" ? stile.textblockBreit : ""}`}>
                  <div className={stile.textblockKopf}>
                    {b.kicker && <p className="kicker">{b.kicker}</p>}
                    {b.titel && <h2>{b.titel}</h2>}
                  </div>
                  <Fliesstext text={b.text} className={stile.textblockText} />
                </Einblenden>
              </section>
            );
          case "leistungsliste":
            return (
              <section key={b._key} className={`abschnitt ${wechsel}`}>
                <div className="rahmen">
                  {b.kicker && <p className="kicker">{b.kicker}</p>}
                  {b.titel && <h2 className={stile.abschnittTitel}>{b.titel}</h2>}
                  <ol className={stile.leistungen} role="list">
                    {b.leistungen.map((l, i) => (
                      <Einblenden key={l.titel} als="li" className={stile.leistung} verzoegerung={Math.min(i, 4) * 60}>
                        <span className={stile.leistungNummer} aria-hidden="true">
                          {l.nummer ?? String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className={stile.leistungTitel}>{l.titel}</h3>
                          <Fliesstext text={l.text} className={stile.leistungText} />
                        </div>
                      </Einblenden>
                    ))}
                  </ol>
                </div>
              </section>
            );
          case "teaserraster":
            return (
              <section key={b._key} className={`abschnitt ${wechsel}`}>
                <div className="rahmen">
                  {b.kicker && <p className="kicker">{b.kicker}</p>}
                  {b.titel && <h2 className={stile.abschnittTitel}>{b.titel}</h2>}
                  <ul className={stile.teaser} role="list">
                    {b.teaser.map((t, i) => (
                      <Einblenden key={t.ziel} als="li" className={stile.teaserKarte} verzoegerung={Math.min(i, 4) * 60}>
                        {t.bild && <Bild bild={t.bild} sizes="(min-width: 64rem) 30vw, 100vw" seitenverhaeltnis="3 / 2" />}
                        <h3 className={stile.teaserTitel}>{t.titel}</h3>
                        <p className={stile.teaserText}>{t.text}</p>
                        <Link href={t.ziel} className={`pfeillink ${stile.teaserLink}`}>
                          <span>{t.aktion}</span>
                          <ArrowRight weight="bold" aria-hidden="true" />
                        </Link>
                      </Einblenden>
                    ))}
                  </ul>
                </div>
              </section>
            );
          case "bildtext":
            return (
              <section key={b._key} className={`abschnitt ${wechsel}`}>
                <Einblenden className={`rahmen ${stile.bildtext} ${b.bildSeite === "rechts" ? stile.bildRechts : ""}`}>
                  <div className={stile.bildtextBild}>
                    <Bild bild={b.bild} sizes="(min-width: 64rem) 45vw, 100vw" />
                  </div>
                  <div className={stile.bildtextText}>
                    {b.kicker && <p className="kicker">{b.kicker}</p>}
                    {b.titel && <h2>{b.titel}</h2>}
                    <Fliesstext text={b.text} className={stile.bildtextFliess} />
                  </div>
                </Einblenden>
              </section>
            );
          case "hinweis":
            return (
              <section key={b._key} className={stile.hinweisAbschnitt}>
                <div className="rahmen">
                  <div className={[stile.hinweis, b.art === "wichtig" ? stile.hinweisWichtig : ""].join(" ")}>
                    {b.art === "wichtig" ? <Warning weight="fill" aria-hidden="true" className={stile.hinweisSymbol} /> : <Info weight="fill" aria-hidden="true" className={stile.hinweisSymbol} />}
                    <div>
                      {b.titel && <h2 className={stile.hinweisTitel}>{b.titel}</h2>}
                      <Fliesstext text={b.text} />
                    </div>
                  </div>
                </div>
              </section>
            );
          case "zeitstrahl":
            return (
              <section key={b._key} className={`abschnitt ${wechsel}`}>
                <div className="rahmen">
                  {b.kicker && <p className="kicker">{b.kicker}</p>}
                  {b.titel && <h2 className={stile.abschnittTitel}>{b.titel}</h2>}
                  <ol className={stile.zeitstrahl} role="list">
                    {b.punkte.map((pkt) => (
                      <Einblenden key={pkt.jahr + pkt.titel} als="li" className={stile.zeitpunkt}>
                        <span className={stile.jahr}>{pkt.jahr}</span>
                        <div className={stile.zeitpunktText}>
                          <h3 className={stile.zeitpunktTitel}>{pkt.titel}</h3>
                          {pkt.text && <p>{pkt.text}</p>}
                        </div>
                      </Einblenden>
                    ))}
                  </ol>
                </div>
              </section>
            );
          case "linkliste":
            return (
              <section key={b._key} className={`abschnitt ${wechsel}`}>
                <div className="rahmen">
                  {b.kicker && <p className="kicker">{b.kicker}</p>}
                  {b.titel && <h2 className={stile.abschnittTitel}>{b.titel}</h2>}
                  <ul className={stile.linkliste} role="list">
                    {b.links.map((l) => (
                      <li key={l.url} className={stile.link}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className={stile.linkText}>
                          <span>{l.text}</span>
                          <ArrowSquareOut weight="bold" aria-hidden="true" />
                        </a>
                        <span className={stile.linkUrl}>{l.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
                        {l.hinweis && <span className={stile.linkHinweis}>{l.hinweis}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          case "angebotseinbettung":
            return <Angebotseinbettung key={b._key} angebote={kontext.angebote} art={b.art} />;
          case "downloadliste": {
            const liste = b.kategorie ? kontext.downloads.filter((d) => d.kategorie === b.kategorie) : kontext.downloads;
            return (
              <section key={b._key} className={`abschnitt ${wechsel}`}>
                <div className="rahmen">
                  {b.kicker && <p className="kicker">{b.kicker}</p>}
                  {b.titel && <h2 className={stile.abschnittTitel}>{b.titel}</h2>}
                  <Downloadliste downloads={liste} />
                </div>
              </section>
            );
          }
          case "handlungsaufforderung":
            return <Handlungsaufforderung key={b._key} baustein={b} />;
          default:
            return null;
        }
      })}
    </>
  );
}
