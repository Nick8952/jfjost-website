# jfjost-website – Anweisungen für Claude Code / Codex

Verkaufs-Demo für **J.F. Jost & Co** (J.F. Jost & Co KmG, Steinwiesenstrasse 3, 8952 Schlieren):
Immobilienbewirtschaftung, Miet-/Kaufobjekte und eigene Bauabteilung. Vorlage: www.jfjost.ch
(Stand 21.09.2026). Die Demo läuft **jetzt** als statischer Export auf GitHub Pages; **Sanity**
(CMS) und **Vercel** (Hosting) sind vorbereitet, aber bewusst nicht angelegt.

Die übergeordnete `../CLAUDE.md` (Websites Hustle, Obsidian-Brain-Handoff) gilt weiterhin.

## Architektur in einem Absatz

Next.js 16 (App Router, TypeScript, CSS Modules, keine UI-Bibliothek). Alle Seiten beziehen
Inhalte ausschliesslich über die Schnittstelle `lib/inhalt/index.ts` (`inhalt.*`). Aktiv ist die
lokale Quelle `lib/inhalt/lokal.ts`, die `data/*.ts` liest. Die Sanity-Quelle
`sanity/inhaltsquelle.ts` liefert dieselben Typen (`lib/inhalt/typen.ts`) und wird durch
Austausch von drei Zeilen in `lib/inhalt/index.ts` aktiv. Bilder entstehen zur Bauzeit aus
`assets/original/` (nicht im Repo, Herkunft in `assets/original/manifest.json`) als AVIF/WebP in
`public/bilder/` plus Manifest `lib/bilder/manifest.ts`.

```
app/            Routen: / , /[slug]/ (8 Baustein-Seiten), /team/, /referenzen/, /kontakt/,
                /impressum/, /datenschutz/, /datenschutz-einstellungen/, not-found, robots, sitemap
components/     Kopf, Navigation, Fuss, Seitenkopf, Bausteine (10 Bausteintypen), Bild, Fliesstext,
                Teamliste, Referenzgalerie, Downloadliste, Kontaktformular (mailto), EmailKnopf,
                Angebotseinbettung (Homegate, nach Einwilligung), Karte (Google Maps, nach
                Einwilligung), Einwilligung (Banner/Dialog/Einstellungen), Einblenden, Logo
data/           Inhalte der Demo (einstellungen, startseite, seiten, team, referenzen, downloads,
                kontakt, externe-angebote, rechtstexte)
lib/inhalt/     typen.ts (Modell), index.ts (aktive Quelle), lokal.ts, text.ts (Portable-Text-Helfer)
lib/            pfade.ts (Unterpfad), seite-url.ts (absolute Adressen, noindex-Schalter),
                einwilligung.ts (+ -hook.ts)
sanity/         schemas/, client.ts, abfragen.ts (GROQ), bild.ts, inhaltsquelle.ts – vorbereitet
scripts/        bilder-aufbereiten, original-laden, export-pruefen, vorschau-server, live-pruefen,
                sanity-seed (nie ausgeführt)
docs/           Inventur, Designkonzept, Skill-Matrix, Anleitungen, Prüfbericht, Übergabe
```

## Trennung: redaktionelle Inhalte vs. Immobilienangebote

- **Redaktionell** (Texte, Team, Referenzen, Downloads, Rechtstexte, Navigation): lokal in `data/`,
  später in Sanity. Genau eine Quelle, kein Doppelpflege.
- **Immobilienangebote (Mieten/Kaufen)**: führende Quelle ist und bleibt **homegate.ch**
  (Trefferlisten mit Anbieterkennung `a=jos`, wie auf der bisherigen Website). Die Demo bettet sie
  **nur nach Einwilligung** als iframe ein und zeigt immer einen Direktlink. Es gibt keine
  Objektdatenbank, keine Preise, keine Verfügbarkeiten im Code oder in Sanity. In Sanity gibt es
  nur das Dokument «Externe Angebote» (URLs, Texte, Datum der letzten Prüfung). Eine direkte
  Objektpflege in Sanity wäre eine separate Erweiterung (docs/immobilien-datenquelle.md).

## Befehle

```
npm install
npm run originale        # Originale von jfjost.ch nach assets/original/ laden (einmalig)
npm run bilder           # AVIF/WebP + Manifest + Icons erzeugen (nach jeder Bildänderung)
npm run dev              # Entwicklung (ohne Unterpfad)
npm run typecheck && npm run lint && npm test
NEXT_PUBLIC_BASE_PATH=/jfjost-website npm run build:pages && touch out/.nojekyll
NEXT_PUBLIC_BASE_PATH=/jfjost-website npm run export:pruefen
npm run vorschau -- --port 4327 --pfad /jfjost-website   # out/ wie GitHub Pages ausliefern
npm run live:pruefen -- https://nick8952.github.io/jfjost-website
npm run build:vercel     # Server-Build ohne Unterpfad (später)
npm run studio / npm run seed   # erst nach Sanity-Einrichtung
```

Node ≥ 20.9. Keine Umgebungsvariablen nötig für die Demo. `.env.example` dokumentiert alle.

## Designregeln («Bautafel», docs/designkonzept.md)

- Tokens nur in `app/globals.css` (`--gelb`, `--tinte`, `--beton`, `--nacht`, Raum-Raster,
  Schriften). Keine Roh-Hexwerte in Komponenten.
- Gelb `#FFDD00` ist Signal (Quadrat, Knöpfe, Kanten, Schatten) – **nie Textfarbe auf Weiss**.
- Scharfe Ecken (wie das Logo), 2-px-Schwarzrahmen, gelber Versatzschatten für Bilder.
- Display-Schrift Big Shoulders Display (lokal via fontsource), Text IBM Plex Sans (lokal).
- Kicker = Masslinie (`.kicker`: gelbes Quadrat + Label + Linie mit Endstrich).
- Bewegung: nur Einblenden beim Scrollen (`components/Einblenden.tsx`) und Hover; respektiert
  `prefers-reduced-motion`. Kein Scroll-Hijacking, kein Autoplay.
- Klickflächen ≥ 44 × 44 px (Textlinks bekommen vertikales Polster über `.textlink`/`.fliesstext a`).
- Bekannte Falle: globale `.knopf`-Regel kann Modul-Regeln je nach Chunk-Reihenfolge überstimmen →
  Modul-Overrides mit doppelter Klasse (`.kopf .telefon`).

## Inhaltsregeln

- Nur belegte Fakten (Quelle: docs/inhaltsinventur.md). Keine erfundenen Objekte, Zahlen, Personen,
  Bewertungen. Fehlende Angaben stehen in docs/uebergabe.md, nicht als Platzhalter auf der Seite.
- Texte in `data/` dürfen sprachlich geglättet werden, Aussagen nicht.
- E-Mail-Adressen des Teams stehen nie im Klartext im HTML (`components/EmailKnopf.tsx`).
- Rechtstexte beschreiben ausschliesslich die reale Technik der Demo (GitHub Pages, Einbettungen
  nach Einwilligung, mailto, localStorage). Sanity/Vercel nur als «vorgesehen».

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml`: bei Push auf `main` → typecheck, lint, test, statischer Export mit
`NEXT_PUBLIC_BASE_PATH=/<repo>`, `.nojekyll`, Export-Prüfung, Upload, Deploy. Die Demo trägt
`noindex` (Meta), `robots.txt` erlaubt Crawlen. Live-Prüfung: `npm run live:pruefen -- <URL>`.

## Später: Sanity + Vercel

Siehe docs/sanity-vercel-einrichtung.md (Schritt für Schritt) und docs/umstellungs-checkliste.md.
Kurz: Sanity-Projekt anlegen → `.env.local` → `npm run seed -- --trockenlauf` → `npm run seed` →
`lib/inhalt/index.ts` auf Sanity-Quelle umstellen → Vercel-Import mit `DEPLOY_TARGET=vercel`.
Bis dahin gilt: **nichts davon ist in Betrieb; nichts davon wurde live geprüft.**

## Handoff

Nach wesentlichen Änderungen: docs aktuell halten (Inventur, Prüfbericht, Übergabe) und den
Obsidian-Brain-Eintrag `Websites Hustle/01_Projects/JF-Jost.md` sowie `current-state.md`
nachführen (Regel aus `../CLAUDE.md`). Keine Zugangsdaten in Dateien.
