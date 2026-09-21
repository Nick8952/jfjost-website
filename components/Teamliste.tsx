import { Phone } from "@phosphor-icons/react/dist/ssr";
import type { Teamabteilung } from "@/lib/inhalt/typen";
import { Bild } from "./Bild";
import { EmailKnopf } from "./EmailKnopf";
import { Einblenden } from "./Einblenden";
import stile from "./Teamliste.module.css";

const telefonLink = (nummer: string) => `tel:+41${nummer.replace(/\s+/g, "").replace(/^0/, "")}`;

function Initialen({ name }: { name: string }) {
  const teile = name.split(/\s+/);
  const buchstaben = (teile.length > 1 ? teile[0][0] + teile[teile.length - 1][0] : name.slice(0, 2)).toUpperCase();
  return (
    <span className={stile.initialen} aria-hidden="true">
      {buchstaben}
    </span>
  );
}

/**
 * Team nach Abteilung wie auf der bisherigen Website. Personen ohne Foto
 * erhalten Initialen auf Beton – keine Ersatzbilder.
 */
export function Teamliste({ abteilungen }: { abteilungen: Teamabteilung[] }) {
  return (
    <div className={stile.liste}>
      {abteilungen.map((abteilung) => (
        <Einblenden key={abteilung.titel} als="section" className={stile.abteilung}>
          <h2 className={stile.abteilungTitel}>
            <span className={stile.marke} aria-hidden="true" />
            {abteilung.titel}
          </h2>
          <ul role="list" className={stile.personen}>
            {abteilung.mitglieder.map((m, i) => (
              <li key={`${abteilung.titel}-${m.name}-${i}`} className={[stile.person, m.bild && m.bild.breite > m.bild.hoehe ? stile.personBreit : ""].join(" ")}>
                <div className={stile.foto}>
                  {m.bild ? (
                    <Bild bild={m.bild} sizes={m.bild.breite > m.bild.hoehe ? "(min-width: 64rem) 40rem, 100vw" : "(min-width: 64rem) 20vw, (min-width: 40rem) 33vw, 50vw"} seitenverhaeltnis={m.bild.breite > m.bild.hoehe ? undefined : "4 / 5"} />
                  ) : (
                    <Initialen name={m.name} />
                  )}
                </div>
                <div className={stile.angaben}>
                  <h3 className={stile.name}>{m.name}</h3>
                  {m.funktion && <p className={stile.funktion}>{m.funktion}</p>}
                  <ul role="list" className={stile.kontakt}>
                    {m.telefone.map((t) => (
                      <li key={t}>
                        <a href={telefonLink(t)} className={stile.telefon}>
                          <Phone weight="bold" aria-hidden="true" />
                          <span>{t}</span>
                        </a>
                      </li>
                    ))}
                    {m.email && (
                      <li>
                        <EmailKnopf email={m.email} name={m.name} className={stile.email} />
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Einblenden>
      ))}
    </div>
  );
}
