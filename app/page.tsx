import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Aktion, Handlungsaufforderung } from "@/components/Bausteine";
import { Bild } from "@/components/Bild";
import { Einblenden } from "@/components/Einblenden";
import { inhalt } from "@/lib/inhalt";
import stile from "./page.module.css";

/**
 * Startseite. Der Hero ist die These des Unternehmens: seit 1929 in Schlieren,
 * bauen und verwalten aus einer Hand – gesetzt als Bautafel neben einem
 * Originalfoto. Danach die vier Wege (Mieten, Kaufen, Bau, Formulare), die
 * Liegenschaften des bisherigen Sliders mit ihren Originaltiteln, die
 * Geschichte in vier Jahren und der Kontakt.
 */
export default async function Startseite() {
  const [s, e] = await Promise.all([inhalt.startseite(), inhalt.einstellungen()]);
  const [erstes, ...weitere] = s.liegenschaften.bilder;
  return (
    <>
      <section className={stile.hero} aria-labelledby="hero-titel">
        <div className={`rahmen ${stile.heroInnen}`}>
          <div className={stile.heroText}>
            <p className="kicker">Immobilien · Bau · Schlieren</p>
            <h1 id="hero-titel" className={stile.heroTitel}>
              {s.hero.titel}
            </h1>
            <p className={stile.heroUntertitel}>{s.hero.untertitel}</p>
            <div className={stile.heroAktionen}>
              {s.hero.aktionen.map((a, i) => (
                <Aktion key={a.ziel} verweis={a} klasse={i === 0 ? "knopf" : "knopf knopf--zweit"} />
              ))}
            </div>
          </div>
          <figure className={stile.heroBild}>
            <Bild bild={s.hero.bild} sizes="(min-width: 64rem) 50vw, 100vw" prioritaet seitenverhaeltnis="4 / 3" />
            <figcaption className={stile.heroLegende}>Wohnungen in Dietikon</figcaption>
          </figure>
        </div>
        <div className={`rahmen ${stile.fakten}`}>
          <span>Gegründet 1929</span>
          <span>Familienunternehmen in dritter Generation</span>
          <span>
            {e.kontakt.strasse}, {e.kontakt.plz} {e.kontakt.ort}
          </span>
          <span>Bauabteilung und Immobilienbewirtschaftung im eigenen Haus</span>
        </div>
      </section>

      <section className="abschnitt" aria-labelledby="bereiche-titel">
        <div className="rahmen">
          <p className="kicker">{s.bereiche.kicker}</p>
          <h2 id="bereiche-titel" className={stile.abschnittTitel}>
            {s.bereiche.titel}
          </h2>
          <ul role="list" className={stile.tafeln}>
            {s.bereiche.teaser.map((t, i) => (
              <Einblenden key={t.ziel} als="li" className={[stile.tafel, i === 0 ? stile.tafelGelb : ""].join(" ")} verzoegerung={i * 70}>
                <span className={stile.tafelNummer} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={stile.tafelTitel}>{t.titel}</h3>
                <p className={stile.tafelText}>{t.text}</p>
                <Link href={t.ziel} className={`pfeillink ${stile.tafelLink}`}>
                  <span>{t.aktion}</span>
                  <ArrowRight weight="bold" aria-hidden="true" />
                </Link>
              </Einblenden>
            ))}
          </ul>
        </div>
      </section>

      <section className="abschnitt abschnitt--beton" aria-labelledby="liegenschaften-titel">
        <div className="rahmen">
          <div className={stile.liegenschaftenKopf}>
            <div>
              <p className="kicker">{s.liegenschaften.kicker}</p>
              <h2 id="liegenschaften-titel" className={stile.abschnittTitel}>
                {s.liegenschaften.titel}
              </h2>
            </div>
            <p className={stile.liegenschaftenHinweis}>
              Einblicke in Liegenschaften und Ausbauten aus unserem Umfeld – keine aktuellen Angebote. Was gerade frei ist, sehen Sie unter <Link href="/mieten/" className="textlink">Mietangebote</Link> und <Link href="/kaufen/" className="textlink">Kaufangebote</Link>.
            </p>
          </div>
          <div className={stile.galerie}>
            <Einblenden als="div" className={stile.galerieGross}>
              <figure>
                <Bild bild={erstes.bild} sizes="(min-width: 64rem) 60vw, 100vw" seitenverhaeltnis="16 / 10" />
                <figcaption className={stile.legende}>
                  <span className={stile.legendeTitel}>{erstes.titel}</span>
                  {erstes.ort && <span className={stile.legendeOrt}>{erstes.ort}</span>}
                </figcaption>
              </figure>
            </Einblenden>
            {weitere.map((l, i) => (
              <Einblenden key={l.bild.src + i} als="div" className={stile.galerieKlein} verzoegerung={Math.min(i, 5) * 50}>
                <figure>
                  <Bild bild={l.bild} sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 50vw, 100vw" seitenverhaeltnis="4 / 3" />
                  <figcaption className={stile.legende}>
                    <span className={stile.legendeTitel}>{l.titel}</span>
                    {l.ort && <span className={stile.legendeOrt}>{l.ort}</span>}
                  </figcaption>
                </figure>
              </Einblenden>
            ))}
          </div>
        </div>
      </section>

      <section className="abschnitt" aria-labelledby="geschichte-titel">
        <div className={`rahmen ${stile.geschichte}`}>
          <div>
            <p className="kicker">{s.geschichte.kicker}</p>
            <h2 id="geschichte-titel" className={stile.abschnittTitel}>
              {s.geschichte.titel}
            </h2>
            <p className={stile.geschichteText}>{s.geschichte.text}</p>
            <Link href={s.geschichte.ziel.ziel} className="pfeillink">
              <span>{s.geschichte.ziel.text}</span>
              <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
          </div>
          <ol role="list" className={stile.jahre}>
            {s.geschichte.punkte.map((pkt, i) => (
              <Einblenden key={pkt.jahr} als="li" className={stile.jahr} verzoegerung={i * 70}>
                <span className={stile.jahrZahl}>{pkt.jahr}</span>
                <span className={stile.jahrText}>{pkt.titel}</span>
              </Einblenden>
            ))}
          </ol>
        </div>
      </section>

      <Handlungsaufforderung baustein={s.abschluss} />
    </>
  );
}
