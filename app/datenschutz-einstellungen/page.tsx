import type { Metadata } from "next";
import { Einwilligungseinstellungen } from "@/components/Einwilligung";
import { Seitenkopf } from "@/components/Seitenkopf";
import { absolut } from "@/lib/seite-url";
import stile from "../seite.module.css";

export const metadata: Metadata = {
  title: "Cookie- und Datenschutz-Einstellungen",
  description: "Einwilligungen für externe Inhalte (homegate.ch, Google Maps) ansehen, ändern oder widerrufen.",
  alternates: { canonical: absolut("/datenschutz-einstellungen/") },
};

export default function Einstellungsseite() {
  return (
    <>
      <Seitenkopf
        kopf={{
          kicker: "Rechtliches",
          titel: "Cookie- und Datenschutz-Einstellungen",
          einleitung: "Diese Website setzt keine eigenen Cookies. Hier bestimmen Sie, ob die Angebotslisten von homegate.ch und die Karte von Google Maps geladen werden dürfen – und können eine Zustimmung jederzeit widerrufen.",
        }}
      />
      <section className={stile.inhalt}>
        <div className="rahmen">
          <Einwilligungseinstellungen eingebettet />
        </div>
      </section>
    </>
  );
}
