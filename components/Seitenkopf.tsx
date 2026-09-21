import type { Seitenkopf as Seitenkopftyp } from "@/lib/inhalt/typen";
import { Bild } from "./Bild";
import stile from "./Seitenkopf.module.css";

/**
 * Seitenkopf jeder Unterseite: Kicker als Masslinie, grosse Überschrift,
 * Einleitung in der Lesespalte; optional ein Bild rechts (Renovationen).
 */
export function Seitenkopf({ kopf }: { kopf: Seitenkopftyp }) {
  return (
    <section className={[stile.kopf, kopf.bild ? stile.mitBild : ""].join(" ")}>
      <div className={`rahmen ${stile.innen}`}>
        <div className={stile.text}>
          {kopf.kicker && <p className="kicker">{kopf.kicker}</p>}
          <h1 className={stile.titel}>{kopf.titel}</h1>
          {kopf.einleitung && <p className={stile.einleitung}>{kopf.einleitung}</p>}
        </div>
        {kopf.bild && (
          <div className={stile.bild}>
            <Bild bild={kopf.bild} sizes="(min-width: 64rem) 40vw, 100vw" prioritaet seitenverhaeltnis="4 / 3" />
          </div>
        )}
      </div>
    </section>
  );
}
