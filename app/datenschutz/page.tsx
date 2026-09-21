import type { Metadata } from "next";
import { Fliesstext } from "@/components/Fliesstext";
import { Seitenkopf } from "@/components/Seitenkopf";
import { inhalt } from "@/lib/inhalt";
import { seitenMetadaten } from "@/lib/metadaten";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await inhalt.rechtstext("datenschutz");
  return seitenMetadaten(t.seo.titel, t.seo.beschreibung, "/datenschutz/");
}

export default async function Rechtsseite() {
  const t = await inhalt.rechtstext("datenschutz");
  return (
    <>
      <Seitenkopf kopf={{ kicker: "Rechtliches", titel: t.titel }} />
      <section className={stile.inhalt}>
        <div className="rahmen">
          <Fliesstext text={t.text} className={stile.rechtstext} />
          <p className={stile.stand}>Stand: {t.stand}</p>
        </div>
      </section>
    </>
  );
}
