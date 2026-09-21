# Design-Handoff

## Tokens (`app/globals.css`)

| Token | Wert | Verwendung |
|---|---|---|
| `--gelb` / `--gelb-tief` | #FFDD00 / #F0C800 | Signal, Primärknopf, Hover |
| `--tinte` / `--tinte-2` / `--tinte-3` | #151515 / #4D4C48 / #67655F | Text, Sekundärtext (8.4:1), Meta (5.3:1) |
| `--papier` / `--beton` / `--beton-2` | #FFFFFF / #F4F2EC / #E9E6DE | Flächen |
| `--linie` / `--linie-stark` | #D6D2C8 / #B9B4A7 | Trennlinien, Masslinie |
| `--nacht` / `--nacht-text` / `--nacht-text-2` | #171717 / #F4F2EC / #B8B5AD | dunkle Abschnitte (Aufforderung, Fuss, mobiles Menü) |
| `--fehler` / `--fokus` | #B3261E / #1A4FD6 | Formularfehler, Fokusring (3 px, Offset 3 px) |
| `--schrift-display` / `--schrift-text` | Big Shoulders Display / IBM Plex Sans | lokal (fontsource) |
| `--groesse-h1…h4`, `--groesse-text/klein/mini` | fluid / 17 / 15 / 13 px | Skala |
| `--raum-1…9` | 4 – 96 px | Abstände; `--abschnitt` 56 – 112 px; `--rand` 16 – 48 px |
| `--dauer-kurz/--dauer/--dauer-lang`, `--kurve` | 160/320/560 ms, cubic-bezier(.2,.7,.2,1) | Bewegung |
| `--ebene-kopf/-menue/-dialog` | 40 / 50 / 60 | Stapel |

## Breakpoints

- < 40 rem (640 px): einspaltig, Tafeln 1 Spalte, Formularfelder untereinander.
- ≥ 40 rem: Tafeln 2 Spalten, Bilderwand 2 Spalten, Formular 2 Spalten, Fuss 2 Spalten.
- ≥ 48 rem (768 px): Leistungen mit 6-rem-Nummernspalte, Zeitstrahl 2-spaltig, Jahre 4 Spalten.
- ≥ 64 rem (1024 px): Desktop-Navigation mit Ausklappmenüs, Telefon-Knopf im Kopf, Hero 2-spaltig,
  Tafeln 4 Spalten, Bilderwand 3 Spalten (erstes Bild 2×2), Fuss 5 Spalten.

## Komponenten und Zustände

| Komponente | Zustände |
|---|---|
| `.knopf` (Primär gelb, `--zweit` Umriss, `--schwarz`) | Ruhe, Hover (Farbe + Pfeil 3 px), Aktiv (1 px nach unten), Fokus (Ring), Disabled (nur Einwilligung vor Hydration) |
| Navigation Desktop | Gruppe geschlossen/offen (`aria-expanded`), aktiv (gelbe Unterkante), Hover (Beton), Escape/Klick ausserhalb schliesst |
| Navigation Mobil | Panel geschlossen/offen (Scroll gesperrt), Gruppe auf/zu, aktiver Eintrag mit gelber Kante |
| Tafel (Startseite) | Ruhe, Hover (Versatzschatten, −2 px), erste Tafel gelb |
| Angebotseinbettung | gesperrt (Platzhalter), lädt (iframe), Hinweis nach 12 s, ausgeblendet per Knopf |
| Karte | gesperrt (Adresse + Route), geladen |
| Einwilligung | Banner (3 gleichwertige Knöpfe), Dialog (Fokusfalle, Escape), Einstellungsseite (Status, Widerruf), Meldung (`role=status`) |
| Kontaktformular | leer, ungültig (Feldfehler unter dem Feld, `aria-invalid`, Fokus auf erstes Fehlerfeld), vorbereitet (Statusmeldung mit erneutem Link) |
| Referenzgalerie | Scroll-Snap, Knöpfe vor/zurück, Tastatur (Liste fokussierbar), Legende mit Zähler |
| Downloadliste | Titel-Link (öffnen), «Herunterladen» (download-Attribut), Meta (PDF · KB · Seiten) |
| Team | mit Foto (4:5), ohne Foto (Initialen), Gruppenfoto (volle Zeile), E-Mail-Knopf |
| Einblenden | verborgen → sichtbar; reduziert/ohne JS immer sichtbar |

## Inhalte: Grenzen

- Meta-Beschreibungen ≤ 170 Zeichen (Test), Titel ≤ 60.
- Tafel-Titel max. ~3 Wörter je Zeile bei 360 px (Versalien).
- Referenzlegenden ≤ 40 Zeichen, sonst Umbruch unter dem Zähler.
- Leere Zustände: Jobs (keine Stellen), Homegate ohne Einwilligung, Team ohne Foto – alle gestaltet.

## Barrierefreiheit

Landmarks (`header`, `nav`, `main#inhalt`, `footer`), Skip-Link, eine H1 je Seite, Fokus sichtbar,
Dialog `aria-modal`, Schalter als echte Checkboxen mit Label, Icons `aria-hidden`, Bild-Alt-Texte
beschreibend (kein «Bild»), Kontrast ≥ 4.5:1 für Text (Gelb nie Textfarbe), reduzierte Bewegung.
