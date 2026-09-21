# Designkonzept «Bautafel»

**Design Read:** Neugestaltung (Overhaul) einer Vertrauens-Website für ein regionales Familien­unternehmen
mit zwei Geschäften (Immobilien + Bau); Zielgruppe Mietinteressierte, Eigentümer, Bauherrschaften im
Limmattal; Sprache sachlich, schweizerisch, solide – nicht «Luxusimmobilien».
Dials: Varianz 6 · Bewegung 3 · Dichte 4.

## Woher das Design kommt

Die Marke existiert physisch: das **gelbe Quadrat mit schwarzen Lettern** (Logo, SVG unverändert) und
der schwarze Schriftzug **«Jost» auf der gelben Tafel** des Firmenfahrzeugs (Bauteam-Foto). Dazu die
Welt der Bauabteilung: Bauplan, Masslinie, Leistungsverzeichnis, Baujournal. Daraus:

| Element | Umsetzung |
|---|---|
| Gelb `#FFDD00` | Signal, nie Textfarbe auf Weiss: Quadrat im Kicker, Primärknopf, Versatzschatten unter Bildern, Fusskante, erste «Tafel» |
| Schwarz `#151515` | Text, Rahmen (2 px), Aufforderungs-Balken, Fuss («Nacht» `#171717`) |
| Beton `#F4F2EC` | Seitenköpfe und Wechselabschnitte – warmes Grau statt Weiss-auf-Weiss |
| Ecken | 0 px, wie das Logo |
| Masslinie | `.kicker`: gelbes Quadrat + Versal-Label + Linie mit Endstrich (Bauplan) |
| Versatzschatten | Bilder: 2-px-Schwarzrahmen + 12–16 px gelber Schatten = Tafel auf Zaun |
| Leistungen | nummerierte Positionen «01 … 05» mit gelber Nummernkachel (Leistungsverzeichnis) |
| Referenzen | Baujournal: Nummer · Zeitraum · Ort in Versalien, Fotostreifen mit «vor / während / nach» |
| Team | Abteilungen als Register (schwarze Linie, gelbe Marke), Porträts 4:5, Initialen statt Ersatzbilder |

## Typografie (lokal, kein Google Fonts)

- Display: **Big Shoulders Display** (variabel, 600/700), Versalien für Nav, Kicker, Knöpfe, Hero;
  gemischt für Überschriften. Schmal und kräftig wie die Fahrzeugtafel; Verwandtschaft zur bisherigen
  Khand, ohne sie zu kopieren.
- Text: **IBM Plex Sans** (variabel), 17 px / 1.6, Tabellenziffern.
- Skala (fluid): H1 44–92 px, H2 32–60 px, H3 24–34 px, Text 17, klein 15, mini 13.

## Raum

4-px-Raster (`--raum-1 … --raum-9`), Abschnitte `clamp(3.5rem, 3rem + 4vw, 7rem)`, Seitenrand
`clamp(1rem, .5rem + 2.5vw, 3rem)`, Inhaltsbreite max. 82 rem, Lesespalte 42 rem.

## Bildsprache

Nur Originalfotos der Kundenwebsite (Liegenschaften, Referenzen, Team). Keine Stockfotos, keine
generierten Bilder. Weil die Originale klein sind (Slider 976 px, Referenzen ≤ 800 px), gibt es
keinen vollflächigen Hero: das Foto steht als Tafel neben der Typografie (max. ~700 px breit).

## Komponenten

Kopf (sticky, Logo + Wortmarke, 3 Gruppen + Kontakt, Telefon-Knopf ab 1024 px), mobiles Panel auf
Schwarz (eine Ebene, Gruppen aufklappbar), Seitenkopf, 10 Bausteine, Bilderwand (asymmetrisch 2+1),
Tafeln (2×2 / 4 Spalten), Zeitstrahl, Referenzgalerie (Scroll-Snap + Knöpfe), Downloadliste,
Kontaktformular (mailto), Angebots-Platzhalter (schraffiert, gestrichelt) → iframe, Karte,
Einwilligungsbanner/-dialog, Fuss (Adresse, Zeiten, 3 Gruppen, Mitgliedschaften, Rechtslinks, Demo-Hinweis).

## Bewegung

Einblenden beim Scrollen (Deckkraft + 12 px, 560 ms), Knöpfe (Farbwechsel, Pfeil 3 px), Tafeln
(Versatzschatten beim Hover). `prefers-reduced-motion` schaltet alles ab; ohne JavaScript ist alles sichtbar.

## Ein bewusstes Risiko

Die gelben Versatzschatten und die schraffierten Platzhalter sind laut und «gebaut» – gewollt: die
Seite soll nach Baufirma aussehen, nicht nach Immobilienportal.
