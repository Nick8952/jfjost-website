# Prüfbericht

Stand 21. September 2026. Geräteemulation mit headless Chrome (puppeteer-core) gegen den lokalen
Vorschauserver, der GitHub Pages inklusive Unterpfad nachbildet; anschliessend die veröffentlichte
Demo per HTTP (`scripts/live-pruefen.mjs`). **Keine Tests auf echten Geräten, kein Screenreader,
keine Lighthouse-Messung** – das ist nicht erfolgt und wird nicht behauptet.

## Build und Code

| Prüfung | Ergebnis |
|---|---|
| `npm run typecheck` (inkl. Sanity-Dateien, Seed-Skript) | ✅ keine Fehler |
| `npm run lint` (eslint-config-next core-web-vitals + typescript) | ✅ 0 Fehler, 0 Warnungen (5 `react-hooks/set-state-in-effect`-Verstösse behoben: useSyncExternalStore, Zustand-an-Pfad, Ableitung beim Rendern) |
| `npm test` (node:test) | ✅ 23/23 (inkl. Linkziel-Allowlist, E-Mail-Kodierung): Kontaktdaten, Seitenliste, Homegate nur auf Mieten/Kaufen, keine erfundenen Stellen, 118 Bilder + Varianten vorhanden mit Alt-Text, 13 Referenzblöcke/91 Fotos, keine CHF/m² in Referenzen, Team-Telefonformat, 7 Downloads mit exakter Grösse, Rechtstexte trennen Betreiber, Einwilligungslogik, Pfade |
| `npm run build:pages` mit `NEXT_PUBLIC_BASE_PATH=/jfjost-website` | ✅ 18 Seiten statisch, 1013 Dateien |
| `npm run export:pruefen` | ✅ alle Verweise mit Unterpfad, alle Dateien vorhanden, jede Seite noindex, 404.html vorhanden, keine localhost/Sanity/Token-Spuren |
| Funktion ohne Sanity-/Vercel-Variablen | ✅ Build und Vorschau ohne `.env` |

## Browser-Prüfung (360 / 390 / 768 / 1440 px, 16 Routen inkl. 404)

| Prüfung | Ergebnis |
|---|---|
| Horizontaler Überlauf (`scrollWidth > clientWidth`) | ✅ keiner. Behoben im Lauf: Referenzgalerie sprengte das Grid (min-width 0), Team-Gruppenfoto (Querformat eigene Zeile) |
| Klickflächen ≥ 44 × 44 px | ✅ alle Knöpfe/Links; Textlinks im Fliesstext erhalten 0,65 em vertikales Polster; Fusslinks min-width 44; Consent-Schalter 68 × 44; Anliegen-Chips 44 hoch |
| Genau eine H1, Titel, noindex je Seite | ✅ |
| Bilder ohne alt | ✅ 0 |
| Konsolenfehler | ✅ keine Skriptfehler (nur abgebrochene Next-Prefetches beim Seitenwechsel im Testlauf) |
| Mobile Navigation | ✅ Panel öffnet, Gruppen klappen, Escape schliesst und setzt Fokus auf «Menü», Scroll gesperrt |
| Desktop-Navigation per Tastatur | ✅ Tab → «Immobilien», Enter öffnet (`aria-expanded=true`), Escape schliesst, Fokusring 3 px blau sichtbar |
| Skip-Link | ✅ erster Tab-Stopp |
| Consent-Dialog | ✅ Fokus auf ersten Schalter, Tab bleibt im Dialog (9× Tab geprüft), Escape schliesst, nichts vorausgewählt |
| Kontaktformular | ✅ leeres Absenden: 4 Feldfehler (`aria-invalid`, Text unter dem Feld), Fokus auf Vorname; `?anliegen=Jobs` vorbelegt; gültig → mailto an info@jfjost.ch mit Betreff/Body und Statusmeldung (Öffnen des Mailprogramms ist OS-abhängig, headless nicht prüfbar) |
| Reduced Motion | ✅ 0 unsichtbare Elemente ohne Scroll |
| Homegate-Einbettung nach Zustimmung | ✅ Trefferliste (12 Inserate am 21.09.) im iframe sichtbar, Direktlink + «Einbettung wieder ausblenden» darunter |
| Karte nach Zustimmung | ✅ Google-Maps-iframe lädt; ohne Zustimmung Routenlink |
| Telefon-/E-Mail-/Routen-Links | ✅ `tel:+41447555353`, `mailto:info@jfjost.ch`, Google-Maps-Routenlink (normaler Link) |
| Downloads | ✅ 7 PDFs unter dem Unterpfad, Öffnen + `download`-Attribut |
| Sichtprüfung Screenshots | ✅ Start, Mieten, Kontakt, Team, Unternehmen, Referenzen in allen Breiten geprüft; behoben: Telefon-Knopf erschien mobil (CSS-Spezifität), Wortmarke brach um |

## Datenschutztechnik (Consent-Audit, 10 Schritte)

| Schritt | Fremde Hosts | Speicher | iframes |
|---|---|---|---|
| Mieten, vor Auswahl | keine | leer | keine |
| «Nur notwendige» | keine | `jfjost-einwilligung` {homegate:false, karte:false} | keine |
| Kontakt danach | keine (kein Banner mehr) | unverändert | keine |
| Widerruf (Einstellungsseite) | keine | leer | keine |
| «Alle akzeptieren» auf Mieten | www.homegate.ch, static.cloudflareinsights.com, fonts.g*, www.googletagmanager.com | {homegate:true, karte:true} | Homegate |
| Neuladen | dieselben | bleibt | Homegate |
| Nur Karte erlaubt | keine | {homegate:false, karte:true} | keine |
| Mieten mit Homegate aus | keine | – | keine |
| Kontakt mit Karte an | www.google.com, maps.gstatic.com, maps.googleapis.com, fonts.googleapis.com | – | Google Maps |
| Widerruf + Neuladen | keine | leer | keine |

Eigene Cookies: keine. Direkter Test der Homegate-Seite im Frame zeigte Cookies `__cf_bm`,
`_cfuvid`, `cf_clearance`, `datadome` (in der Datenschutzerklärung benannt). Cookies Dritter können
nicht von der Website gelöscht werden – in Erklärung und Einstellungsseite transparent beschrieben.

## Design-Kritik (design:design-critique, auf den realen Screenshots)

- **Erstwirkung:** Gelb-Schwarz-Tafel mit Versal-Headline und Foto liest sich sofort als Baufirma;
  Zweck («Bauen, vermieten, verwalten. Seit 1929 in Schlieren») ist in 2 s klar.
- **Hierarchie:** Kicker → H1 → Einleitung → Knöpfe; vier Wege als Tafeln; Bilderwand mit
  Legenden; Geschichte mit vier Jahreszahlen. Reihenfolge entspricht der Nutzerfrage «Was gibt es
  zu mieten/kaufen, wer seid ihr?».
- **Konsistenz:** eine Akzentfarbe, eine Rahmenstärke, ein Schattenprinzip, zwei Schriften;
  Abschnitte wechseln Weiss/Beton; Aufforderungen immer auf Schwarz.
- **Schwächen (dokumentiert, nicht behoben, weil Quelle):** Bildqualität der Originale (976 px
  Slider, ≤ 800 px Referenzen) wird auf 1440 px sichtbar weich; einige Teamfotos stark komprimiert.
  Die Homegate-Liste im iframe hat ihr eigenes Design (Magenta-Knöpfe) – unvermeidbar bei Einbettung.

## Barrierefreiheit (design:accessibility-review, WCAG 2.1 AA)

Kontrast: Text #151515 auf Weiss 17.7:1, #4D4C48 8.4:1, #67655F 5.3:1, auf Beton #F4F2EC ≥ 4.7:1;
Nacht-Text #F4F2EC auf #171717 15.6:1, #B8B5AD auf #171717 8.9:1; Schwarz auf Gelb 15.5:1. Gelb wird
nie als Textfarbe verwendet. Fokus: 3 px #1A4FD6 mit 3 px Offset auf Weiss/Beton/Gelb (≥ 3:1).
Landmarks, Skip-Link, Labels, `aria-expanded`, `aria-modal`, `role=status`, Icons `aria-hidden`.
Nicht geprüft: Screenreader-Ausgabe (VoiceOver/NVDA), 200-%-Zoom auf echten Geräten.

## Deployment und Live-Prüfung

- Repository: https://github.com/Nick8952/jfjost-website (public), GitHub Pages per Workflow
  (`build_type=workflow`), zwei Läufe grün (typecheck → lint → test → build → export-pruefen → deploy).
- `npm run live:pruefen -- https://nick8952.github.io/jfjost-website`: ✅ 15 Routen 200 mit noindex
  und Titel, 897 referenzierte Dateien (CSS, JS, AVIF/WebP, PDFs, Icons) abrufbar, `og:image`/`og:url`
  je Seite, 404 mit eigener Seite, robots.txt erlaubt Crawlen.
- Live-Browsertest (390 px, headless Chrome): jede Route direkt aufgerufen **und neu geladen**,
  Schriften geladen (IBM Plex Sans Variable), kein Überlauf, eigene 404. Ohne GitHub-Login erreichbar.
- Nach der Codex-Runde erneut geprüft: Homegate-Liste rendert im sandboxed iframe («12 Treffer»),
  Google-Maps-iframe lädt, mobiles Menü setzt `main`/`footer`/Marke/Skip-Link `inert` (Tab bleibt im
  Panel), `aria-controls` ohne Leerzeichen, keine doppelten IDs auf der Einstellungsseite,
  Consent-Audit identisch zum ersten Lauf.

## Mobile-Nacharbeit (21.09.2026, zweite Runde)

Sichtprüfung in Bildschirmgrösse (390 × 844) ergab: Banner nahm ~45 % der Höhe ein, Team eine
Person je Zeile (14'500 px), Hero-Titel 5 Zeilen, Tafeln mit Leerraum, Bilderwand einspaltig.
Behoben: kompakter Banner, Team/Bilderwand/Fakten zweispaltig, Tafeln ohne Mindesthöhe, kleinere
Einleitungen, Fuss zweispaltig, Silbentrennung für lange Funktionsbezeichnungen (Überlauf bei 360 px).
Seitenhöhen bei 390 px danach: Start 6'443 px (vorher 8'612), Team 8'430 (vorher 14'494). Audit
360/390/768: kein Überlauf, keine Klickfläche < 44 px.

## Nicht geprüft / Grenzen

Echte Geräte (iOS Safari, Android), Screenreader, Lighthouse-Werte, Vercel-Build, Sanity-Studio
gegen ein Dataset, Seed-Skript, Öffnen des E-Mail-Programms (mailto) auf Endgeräten,
Nutzungsbedingungen von Homegate.
