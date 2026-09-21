import { absolut } from "@/lib/seite-url";
import type { WebsiteEinstellungen } from "@/lib/inhalt/typen";

/**
 * JSON-LD nur mit belegten Angaben (Fusszeile, Kontaktseite, Handelsregister).
 * Keine Bewertungen, keine Immobilienobjekte, keine erfundenen Öffnungszeiten.
 */
export function StrukturierteDaten({ einstellungen }: { einstellungen: WebsiteEinstellungen }) {
  const { kontakt, oeffnungszeiten } = einstellungen;
  const tage: Record<string, string[]> = {
    "Montag bis Donnerstag": ["Monday", "Tuesday", "Wednesday", "Thursday"],
    Freitag: ["Friday"],
  };
  const spezifikation = oeffnungszeiten.flatMap((z) =>
    z.zeiten.map((t) => {
      const [von, bis] = t.replace(" Uhr", "").split(" – ").map((s) => s.replace(".", ":"));
      return { "@type": "OpeningHoursSpecification", dayOfWeek: tage[z.tage] ?? [], opens: von, closes: bis };
    })
  );
  const daten = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: kontakt.firma,
    legalName: kontakt.firmaRegister,
    url: absolut("/"),
    logo: absolut("/logo.svg"),
    telephone: "+41 44 755 53 53",
    email: kontakt.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: kontakt.strasse,
      postalCode: kontakt.plz,
      addressLocality: kontakt.ort,
      addressCountry: "CH",
    },
    foundingDate: "1929",
    openingHoursSpecification: spezifikation,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(daten) }} />;
}
