# Inhaltsinventur www.jfjost.ch → Demo

Stand der Erhebung: **21. September 2026**, alle 16 Seiten der Sitemap plus `/de/datenschutz`
(existiert nicht, liefert die Startseite) abgerufen. Es gibt **nur Deutsch** (`/en`, `/fr`, `/it`
liefern 404), also keine Sprachverknüpfung nötig.

Status: ✅ vollständig übernommen · ✏️ sprachlich geglättet, Aussage gleich · ⚠️ Hinweis/Frage · ✖ nicht übernommen (Grund)

| Quelle (www.jfjost.ch) | Inhalt | Zielseite | Status |
|---|---|---|---|
| `/de/home` | Slider mit 7 Motiven + Titeln, jeweils «Kontaktieren Sie uns!» | `/` (Hero + Bilderwand «Aus unserem Umfeld») | ✏️ Titel übernommen, Tippfehler korrigiert («Idylisch», «renovierten»). ⚠️ Motive sind keine aktuellen Angebote; so gekennzeichnet |
| `/de/liegenschaftenverwaltung-und-immobilien` | identisch mit `/de/mieten` | `/mieten/` | ✅ (Duplikat zusammengeführt) |
| `/de/mieten` | Einleitungstext + Homegate-iframe `…/mieten/alle-mietinserate/trefferliste?a=jos&incsubs=1` | `/mieten/` | ✏️ Text; Einbettung nach Einwilligung + Direktlink |
| `/de/kaufen` | Text «90 Jahre Erfahrung…» + Homegate-iframe `…/kaufen/alle-kaufinserate/trefferliste?a=jos` | `/kaufen/` | ✏️ «über 90 Jahre» (Gründung 1929 = 97 Jahre); Einbettung nach Einwilligung |
| `/de/formulare-download` | 7 PDF-Dateien | `/formulare/` (+ Formulare auf `/mieten/`) | ✅ Dateien unverändert, umbenannt (siehe unten) |
| `/de/sanierung-und-renovationen` | Renovationen/Umbau, Fassaden, Bauleitungen, Instandsetzungen (Beton, Abdichtung) | `/renovationen/` | ✏️ als nummerierte Leistungen |
| `/de/dienstleistungsbeschreibung` | identisch mit `/de/sanierung-und-renovationen` | `/renovationen/` | ✅ (Duplikat) |
| `/de/sanierung-renovation-referenzen` | 12 Projekte 2017–2019 + Naturofloor-Block, 91 Fotos mit Legenden | `/referenzen/` | ✅ Reihenfolge, Orte, Zeiträume, Stichworte, Legenden wörtlich |
| `/de/ueber-uns` | identisch mit `/de/team` | `/team/` | ✅ (Duplikat; «Über uns» ist jetzt Menügruppe) |
| `/de/team` | 6 Abteilungen, 22 Einträge (Name, Funktion, Telefon, verschleierte E-Mail, 18 Fotos) | `/team/` | ✅ Anzeige «Vorname Nachname»; ⚠️ siehe Team-Hinweise |
| `/de/unternehmen` | Firmengeschichte 1929–2024, «Unsere Engagements», Mitgliedschaften | `/unternehmen/` (Zeitstrahl, Heute, Mitgliedschaften) und `/engagement/` (Engagements-Text) | ✏️ |
| `/de/jobs` | leer (nur Überschrift) | `/jobs/` | ⚠️ ehrlich: «zurzeit keine offenen Stellen ausgeschrieben (Stand 21.09.2026)» + Lehrstellen-Aussage von `/de/unternehmen` |
| `/de/engagement` | 1 Meldung: Lilie Shoppingpoint spendet Gutscheine über 10'000 Franken (Bild) | `/engagement/` | ✅ wörtlich; ⚠️ ohne Datum auf der Quelle |
| `/de/kontakt` | Text, Öffnungszeiten, Google-Maps-iframe, Kontaktformular (Anliegen Mieten/Kaufen/Jobs/Baudienstleistungen; Felder Firma, Name*, Vorname*, Strasse, PLZ/Ort, Telefon, Email*, Bemerkungen) | `/kontakt/` | ✏️ Formular als mailto («E-Mail vorbereiten»), nur nötige Felder (Anliegen, Vorname*, Name*, E-Mail*, Telefon, Nachricht*); Karte nach Einwilligung + Routenlink |
| `/de/links` | 8 externe Links | `/links/` | ✅ alle; ⚠️ 3 am 21.09.2026 nicht erreichbar (businesspark8810.ch, gvschlieren.ch, businesspark8952.ch) – auf der Seite so vermerkt |
| `/de/impressum` | **leer** (nur Fusszeile) | `/impressum/` | ✖ nichts zu übernehmen → neu verfasst (Demo-Betreiber + dargestelltes Unternehmen aus Handelsregister) |
| `/de/datenschutz` | **existiert nicht** | `/datenschutz/` | ✖ nichts zu übernehmen → neu verfasst für die Demo-Technik |
| Fusszeile (alle Seiten) | J.F. Jost & Co, Steinwiesenstrasse 3, 8952 Schlieren, 044 755 53 53, info@jfjost.ch (JS-verschleiert) | Fuss, Kontakt, Impressum, JSON-LD | ✅ |
| `/_img/logo.svg` | Logo (gelbes Quadrat, schwarze Lettern) | `public/logo.svg`, `components/Logo.tsx`, Icons | ✅ unverändert |
| `/images/favicon.ico` | 404 – kein Favicon vorhanden | `app/icon.png`, `apple-icon.png` | neu aus dem Logo erzeugt |
| Schriften | Google Fonts (Khand, Open Sans) per `<link>` | lokal (Big Shoulders Display, IBM Plex Sans) | ersetzt, kein Google-Fonts-Aufruf mehr |

## Verifizierte Unternehmensangaben

| Angabe | Wert | Quelle |
|---|---|---|
| Name (Website) | J.F. Jost & Co | Fusszeile jfjost.ch |
| Name (Handelsregister) | **J.F. Jost & Co KmG** (Kommanditgesellschaft) | Zefix, Abfrage 21.09.2026 |
| UID | CHE-105.786.236 | Zefix |
| Sitz / Adresse | Steinwiesenstrasse 3, 8952 Schlieren | Zefix + Website (stimmen überein) |
| Zweck | Führung eines Baugeschäftes, die Verwaltung, Kauf und Verkauf von Liegenschaften | Zefix |
| Telefon | 044 755 53 53 | Website |
| E-Mail | info@jfjost.ch | Website (per JS verschleiert, für jeden Besucher sichtbar; dekodiert, nicht geraten) |
| Öffnungszeiten | Mo–Do 07.30–12.00 / 13.15–17.00, Fr 07.30–12.00 / 13.15–16.00 | `/de/kontakt` |
| Gründung | 1929 durch Johann Friedrich «Fritz» Jost | `/de/unternehmen` |
| Geschäftsführung | Diego Albertanti (seit Juli 2020) | `/de/unternehmen`, `/de/team` |
| Eigentümerinnen | Liliane Hagen, Caroline Landolt, Susanne Porchet-Hagen | `/de/unternehmen` |
| Mitgliedschaften | Baumeister-Verband Zürich, Standortförderung Limmattal, Wirtschaftskammer Schlieren, Gewerbeverein Schlieren, IG Rietbach, IGBP | `/de/unternehmen` |

⚠️ Im Handelsregister existiert zusätzlich **«J.F. Jost Bau AG»** (CHE-107.983.121, Schlieren).
Welche Gesellschaft die Bauabteilung betreibt und ob sie auf der Website genannt werden soll, muss
der Kunde klären (docs/uebergabe.md). Die Website nennt nur «J.F. Jost & Co».

## Team-Hinweise

- E-Mails sind auf der Quelle per JavaScript-Substitution verschleiert (für Besucher sichtbar).
  Die Demo behandelt sie gleichwertig: `EmailKnopf` setzt die Adresse erst beim Klick zusammen, im
  HTML steht kein Klartext. Codex empfahl alternativ, nur `info@` zu zeigen – Entscheidung des Kunden.
- Ohne Foto auf der Quelle: Stefan Schmid, Sandro Prati, Claudia Züger, Alina Iseni → Initialen.
- «Baumanagement» erscheint auf der Quelle einmal als leere Kategorie (ohne Personen) → weggelassen;
  als Funktion bei Stefan Schmid übernommen.
- «Mühlemann Urs, ZL» – Abkürzung «ZL» unklar, unverändert übernommen.
- Diego Albertanti steht dreimal (Geschäftsleitung, Immobilien, Immobilienbewirtschaftung) – wie Quelle.
- Bildqualität: Teamfotos 47 KB bis 3,1 MB, teils stark komprimiert (Eric, Safet Gjura ~50 KB).
- Persönliche Mobilnummern (079…) stehen auf der Quelle öffentlich; übernommen, aber beim Kunden
  zu bestätigen.

## Referenzen (Reihenfolge wie Quelle)

1 Welbrigring 3, Geroldswil (Aug–Sep 2019, Naturofloor, 11 Fotos) · 2 Naglerwiesenstrasse 90,
Zürich (Aug–Sep 2019, 10) · 3 Naturofloor-Zertifizierung (4, kein Projekt) · 4 Bachstrasse, Urdorf
(Mai 2019, 4) · 5 Wiesenstrasse 33, Schlieren (Apr 2019, 5) · 6 Tiefgarage Berikon (Feb 2019, 9) ·
7 Widenbühlstrasse 26, Unterengstringen (Sep 2018, 5) · 8 Oberstufenschulhaus Weiningen (Apr 2018,
4) · 9 Farbhalde 4, Oetwil (Mär 2018, 5) · 10 Ottikerstrasse 23, Zürich (Aug–Dez 2017, 7) ·
11 Ringstrasse 10, Birmenstorf (Sep–Okt 2017, 5) · 12 Sichtbetonpool Welbrigstrasse 22 b,
Geroldswil (Jul–Aug 2017, 7) · 13 Alter Bauernhof (ohne Datum, 15). Summe 91 Fotos.

Bildqualität: Referenzfotos sind nur 516–800 px breit; Startseiten-Slider 976 px. Für eine
Kundenwebsite sollten höher aufgelöste Originale angefordert werden.

## Downloads (unverändert, nur umbenannt)

| Quelle | Demo-Datei | Seiten | KB | Bemerkung |
|---|---|---|---|---|
| Anmeldeformular Wohnung.pdf | anmeldeformular-wohnung.pdf | 1 | 22 | kein interaktives Formular (Blockschrift) |
| Anmeldeformular Gewerbe.pdf | anmeldeformular-gewerbe.pdf | 1 | 21 | PDF-Metadatentitel «Anmeldeformular Wohnung» (falsch) |
| Merkblatt Energiesparen.pdf | merkblatt-energiesparen.pdf | 1 | 35 | Metadatentitel «BR» |
| Steigende Energiepreise_Garaio.pdf | energie-sparmassnahmen-tipps.pdf | 1 | 109 | Herausgeber Garaio; ohne Metadatentitel |
| Merkblatt Grillieren.pdf | merkblatt-grillieren.pdf | 2 | 122 | Metadatentitel «J» |
| Merkblatt Tierhaltung.pdf | merkblatt-tierhaltung.pdf | 1 | 34 | Metadatentitel «Baueingabe CAFE Tschannen …» (fremd) |
| Merkblatt_Wohnungsrueckgabe.pdf | merkblatt-wohnungsrueckgabe.pdf | 2 | 54 | Metadatentitel «Baueingabe CAFE Tschannen …» (fremd) |

⚠️ Mehrere PDFs tragen fremde/falsche Metadaten-Titel (Reste alter Vorlagen). Empfehlung an den
Kunden: Metadaten bereinigen. Inhalte wurden nicht verändert.

## Homegate-Einbindung (geprüft)

- Beide Trefferlisten liefern HTTP 200 **ohne** `X-Frame-Options`/`frame-ancestors` und rendern in
  einem iframe (Test in headless Chrome 21.09.2026: Trefferliste sichtbar, Filter bedienbar).
- Beim Laden entstehen Anfragen an www.homegate.ch, media2.homegate.ch, static.cloudflareinsights.com,
  fonts.googleapis.com/gstatic.com, www.googletagmanager.com und Cookies `__cf_bm`, `_cfuvid`,
  `cf_clearance` (Cloudflare), `datadome` (DataDome) → einwilligungspflichtig → Zwei-Klick.
- Nutzungsbedingungen von Homegate zur Einbettung nicht geprüft; die bisherige Website bettet
  seit Jahren so ein (Anbieterkennung `a=jos`). Beim Kunden bestätigen lassen.

## Nicht übernommen / bewusst geändert

- Slider-Automatik (flexslider) → statische Bilderwand (keine Bewegung ohne Nutzeraktion).
- «Kontaktieren Sie uns!»-Formular am Fuss **jeder** Seite → eigene Kontaktseite + Aufforderungen.
- Google-Fonts-Einbindung → lokale Schriften.
- Kontaktformular-Felder Firma, Strasse/Nr., PLZ/Ort → weggelassen (für eine E-Mail nicht nötig).
