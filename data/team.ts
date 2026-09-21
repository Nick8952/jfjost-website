import { bild } from "@/lib/inhalt/bild";
import type { Teamseite } from "@/lib/inhalt/typen";

/**
 * Quelle: www.jfjost.ch/de/team (identisch mit /de/ueber-uns), Stand 21.09.2026.
 * Namen, Funktionen, Telefonnummern und Fotos wörtlich übernommen (Anzeige als
 * «Vorname Nachname»). E-Mail-Adressen sind auf der bisherigen Website per
 * JavaScript verschleiert und werden hier gleich behandelt: components/EmailKnopf.tsx
 * setzt sie erst beim Klick zusammen, im HTML stehen sie nie im Klartext.
 * Vier Personen haben auf der bisherigen Website kein Foto; hier gibt es dafür
 * keine Ersatzbilder, nur die Initialen.
 * Die leere Kategorie «Baumanagement» der bisherigen Seite (ohne Personen) ist
 * weggelassen; die Funktion «Baumanagement» steht bei Stefan Schmid.
 */
export const teamseite: Teamseite = {
  seo: {
    titel: "Team",
    beschreibung: "Die Ansprechpersonen von J.F. Jost & Co in Schlieren: Geschäftsleitung, Baubetrieb, Immobilien, Immobilienbewirtschaftung, Hauswartung und kaufmännische Verwaltung.",
  },
  kopf: {
    kicker: "Über uns",
    titel: "Unser Team",
    einleitung:
      "Direkte Ansprechpersonen für Bau, Immobilien, Bewirtschaftung, Hauswartung und Administration. Die Zentrale erreichen Sie unter 044 755 53 53.",
  },
  abteilungen: [
    {
      titel: "Geschäftsleitung",
      mitglieder: [
        { name: "Diego Albertanti", funktion: "Geschäftsführer", telefone: ["044 755 53 53"], email: "d.albertanti@jfjost.ch", bild: bild("team-albertanti-diego", "Diego Albertanti") },
      ],
    },
    {
      titel: "Baubetrieb",
      mitglieder: [
        { name: "Visar Rexhepi", funktion: "Abteilungsleiter", telefone: ["044 755 53 30", "079 599 91 98"], email: "v.rexhepi@jfjost.ch", bild: bild("team-rexhepi-visar", "Visar Rexhepi") },
        { name: "Stefan Schmid", funktion: "Baumanagement", telefone: ["044 755 53 42", "079 424 18 88"], email: "s.schmid@jfjost.ch" },
        { name: "Sandro Prati", funktion: "Bauführer", telefone: ["044 755 53 43", "079 376 25 16"], email: "s.prati@jfjost.ch" },
        { name: "Claudia Züger", funktion: "Assistentin Baubetrieb", telefone: ["044 755 53 61"], email: "c.zueger@jfjost.ch" },
        { name: "André Laib", funktion: "Werkhofchef", telefone: ["079 376 56 59"], email: "info@jfjost.ch", bild: bild("team-laib-andre", "André Laib") },
        { name: "Bauteam", telefone: ["044 755 53 53"], email: "info@jfjost.ch", bild: bild("team-bauteam", "Das Bauteam von J.F. Jost & Co vor dem Werkhof mit dem Firmenfahrzeug") },
      ],
    },
    {
      titel: "Immobilien",
      mitglieder: [
        { name: "Diego Albertanti", funktion: "Abteilungsleiter", telefone: ["044 755 53 53"], email: "d.albertanti@jfjost.ch", bild: bild("team-albertanti-diego", "Diego Albertanti") },
        { name: "Sandra Ribalta", funktion: "Assistentin Geschäftsführer", telefone: ["044 755 53 44"], email: "s.ribalta@jfjost.ch", bild: bild("team-ribalta-sandra", "Sandra Ribalta") },
      ],
    },
    {
      titel: "Immobilienbewirtschaftung",
      mitglieder: [
        { name: "Diego Albertanti", funktion: "Abteilungsleiter", telefone: ["044 755 53 53"], email: "d.albertanti@jfjost.ch", bild: bild("team-albertanti-diego", "Diego Albertanti") },
        { name: "Eric Müller", funktion: "Teamleiter", telefone: ["044 755 53 48"], email: "e.mueller@jfjost.ch", bild: bild("team-mueller-eric", "Eric Müller") },
        { name: "Amelia Paparo", funktion: "Immobilienbewirtschaftung", telefone: ["044 755 53 49"], email: "a.paparo@jfjost.ch", bild: bild("team-paparo-amelia", "Amelia Paparo") },
        { name: "Diana Menegazzo", funktion: "Immobilienbewirtschaftung", telefone: ["044 755 53 45"], email: "d.menegazzo@jfjost.ch", bild: bild("team-menegazzo-diana", "Diana Menegazzo") },
        { name: "Jsabella Kunz", funktion: "Assistenz Immobilienbewirtschaftung", telefone: ["044 755 53 47"], email: "j.kunz@jfjost.ch", bild: bild("team-kunz-jsabella", "Jsabella Kunz") },
        { name: "Enes Veliju", funktion: "Assistenz Immobilienbewirtschaftung", telefone: ["044 755 53 62"], email: "e.veliju@jfjost.ch", bild: bild("team-veliju-enes", "Enes Veliju") },
      ],
    },
    {
      titel: "Hauswartung",
      mitglieder: [
        { name: "Safet Gjura", telefone: ["079 238 60 92"], bild: bild("team-gjura-safet", "Safet Gjura") },
        { name: "José Bonifacio", telefone: ["079 504 67 53"], bild: bild("team-bonifacio-jose", "José Bonifacio") },
        { name: "Shimon Shanker", telefone: ["079 512 13 48"], bild: bild("team-shanker-shimon", "Shimon Shanker") },
        { name: "Urs Mühlemann", funktion: "ZL", telefone: ["044 755 44 11"], email: "u.muehlemann@jfjost.ch", bild: bild("team-muehlemann-urs", "Urs Mühlemann") },
      ],
    },
    {
      titel: "Kaufmännische Verwaltung",
      mitglieder: [
        { name: "Reto Mariani", funktion: "Abteilungsleiter", telefone: ["044 755 53 53"], email: "r.mariani@jfjost.ch", bild: bild("team-mariani-reto", "Reto Mariani") },
        { name: "Jacqueline Meyer", funktion: "Buchhaltung", telefone: ["044 755 53 56"], email: "j.meyer@jfjost.ch", bild: bild("team-meyer-jacqueline", "Jacqueline Meyer") },
        { name: "Susanne Weyermann", funktion: "Buchhaltung", telefone: ["044 755 53 52"], email: "s.weyermann@jfjost.ch", bild: bild("team-weyermann-susanne", "Susanne Weyermann") },
        { name: "Ingrid Krumdieck", funktion: "Sekretariat / Empfang", telefone: ["044 755 53 53"], email: "i.krumdieck@jfjost.ch", bild: bild("team-krumdieck-ingrid", "Ingrid Krumdieck") },
        { name: "Alina Iseni", funktion: "Lernende", telefone: ["044 755 53 53"], email: "a.iseni@jfjost.ch" },
      ],
    },
  ],
  hinweis: "E-Mail-Adressen werden erst beim Klick auf «E-Mail» in Ihrem E-Mail-Programm eingesetzt.",
};
