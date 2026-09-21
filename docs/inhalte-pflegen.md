# Inhalte der Demo pflegen (lokal, ohne CMS)

Alle Inhalte liegen als TypeScript unter `data/`. Nach jeder Änderung: `npm run typecheck && npm test`
(prüft u. a. Pflichtangaben, Bilddateien, Downloadgrössen, Meta-Beschreibungen ≤ 170 Zeichen),
dann Push auf `main` → GitHub Actions veröffentlicht automatisch.

| Was | Datei | Hinweise |
|---|---|---|
| Adresse, Telefon, E-Mail, Öffnungszeiten, Navigation, Fusslinks, Demo-Hinweis, Mitgliedschaften | `data/einstellungen.ts` | `telefonLink` im Format `tel:+41…` |
| Startseite (Hero, Bilderwand, vier Wege, Jahreszahlen, Abschluss) | `data/startseite.ts` | Bilder per `bild("<id>", "<Alt-Text>")` |
| Mieten, Kaufen, Formulare, Renovationen, Unternehmen, Jobs, Engagement, Links | `data/seiten.ts` | Bausteine frei anordnen; `_key` je Baustein eindeutig |
| Team | `data/team.ts` | Abteilungen → Personen; `email` optional; ohne `bild` erscheinen Initialen |
| Referenzen | `data/referenzen.ts` | je Projekt `bilder` mit Legende («vor der Sanierung» …) |
| Downloads | `data/downloads.ts` | Datei nach `public/downloads/` legen, `bytes` = Dateigrösse (Test prüft) |
| Kontaktseite (Anliegen, Hinweise) | `data/kontakt.ts` | Empfänger ist `einstellungen.kontakt.email` |
| Homegate-Adressen, Platzhaltertexte, Prüfdatum | `data/externe-angebote.ts` | nur homegate.ch-URLs mit `a=jos` |
| Impressum, Datenschutz | `data/rechtstexte.ts` | Fliesstext mit `p()`, `h3()`, `liste()`, `link()` |

## Bilder

1. Original nach `assets/original/<ordner>/` legen (Ordner ist nicht im Repo; Herkunft in
   `assets/original/manifest.json` ergänzen).
2. In `scripts/bilder-aufbereiten.mjs` einen Eintrag `{ id, datei, seitenverhaeltnis?, position?, maxBreite? }`
   ergänzen (Referenzfotos werden automatisch aus `assets/original/referenzen/` erfasst).
3. `npm run bilder` → `public/bilder/` und `lib/bilder/manifest.ts` werden neu erzeugt (deterministisch).
4. Im Inhalt mit `bild("id", "Alt-Text", "Legende")` verwenden.

## Fliesstext

`data/*.ts` notiert Text als Portable Text (Sanity-Format) über Helfer aus `lib/inhalt/text.ts`:

```ts
text: [
  p("Absatz mit ", fett("fett"), " und ", link("Link", "/kontakt/"), "."),
  h3("Zwischentitel"),
  ...liste("Punkt 1", "Punkt 2"),
]
```

## Neue Seite

Eintrag in `data/seiten.ts` (slug, seo, kopf, bausteine) genügt – die Route `/[slug]/` erzeugt sie
beim Build. In `data/einstellungen.ts` in die Navigation aufnehmen; `scripts/live-pruefen.mjs`
kennt die Routenliste ebenfalls.

## Bausteine

`textblock`, `leistungsliste`, `teaserraster`, `bildtext`, `hinweis`, `zeitstrahl`, `linkliste`,
`angebotseinbettung` (nur Mieten/Kaufen), `downloadliste`, `handlungsaufforderung`. Typen in
`lib/inhalt/typen.ts`, Darstellung in `components/Bausteine.tsx`.
