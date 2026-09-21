import type { Metadata } from "next";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Teamliste } from "@/components/Teamliste";
import { Handlungsaufforderung } from "@/components/Bausteine";
import { inhalt } from "@/lib/inhalt";
import { absolut } from "@/lib/seite-url";
import stile from "../seite.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await inhalt.team();
  return { title: t.seo.titel, description: t.seo.beschreibung, alternates: { canonical: absolut("/team/") } };
}

export default async function Teamseite() {
  const t = await inhalt.team();
  return (
    <>
      <Seitenkopf kopf={t.kopf} />
      <section className={stile.inhalt}>
        <div className="rahmen">
          <Teamliste abteilungen={t.abteilungen} />
          {t.hinweis && <p className={stile.hinweis}>{t.hinweis}</p>}
        </div>
      </section>
      <Handlungsaufforderung
        baustein={{
          _type: "handlungsaufforderung",
          _key: "team-kontakt",
          titel: "Nicht sicher, wer zuständig ist?",
          text: "Die Zentrale verbindet Sie weiter: Montag bis Freitag zu den Bürozeiten.",
          aktionen: [
            { text: "044 755 53 53", ziel: "tel:+41447555353", extern: true },
            { text: "Kontaktformular", ziel: "/kontakt/" },
          ],
        }}
      />
    </>
  );
}
