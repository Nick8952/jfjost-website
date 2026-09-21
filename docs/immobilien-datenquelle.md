# Immobilienangebote: Datenquelle, Einbindung, Grenzen

## Führende Quelle

**homegate.ch.** J.F. Jost & Co pflegt Miet- und Kaufinserate dort (Anbieterkennung `a=jos`,
`incsubs=1` = inkl. Untervermietung/Untermandate laut URL). Die bisherige Website bettet genau diese
Trefferlisten als iframe ein:

- Mieten: `https://www.homegate.ch/mieten/alle-mietinserate/trefferliste?a=jos&incsubs=1`
- Kaufen: `https://www.homegate.ch/kaufen/alle-kaufinserate/trefferliste?a=jos`

Die Demo übernimmt beide Adressen unverändert (`data/externe-angebote.ts`). Es gibt **keine** Kopie
von Inseraten, keine Preise, Flächen, Zimmerzahlen oder Verfügbarkeiten im Code – und keine
Filter/Suche, weil keine strukturierten Daten vorliegen. Es wurde keine API «erfunden» und kein
Scraper gebaut.

## Einbindung auf der Demo

1. Ohne Einwilligung: Platzhalter (Erklärung, «Angebote hier anzeigen», «Direkt auf homegate.ch öffnen»).
2. Mit Einwilligung «Immobilienangebote (homegate.ch)»: iframe (Höhe 80 vh, `referrerPolicy`
   strict-origin-when-cross-origin, `allow=""`), darunter weiterhin der Direktlink und «Einbettung
   wieder ausblenden». Nach 12 s erscheint der Hinweis «Wird die Liste nicht angezeigt? …», weil
   sich der Erfolg wegen der Same-Origin-Regel nicht feststellen lässt.
3. Widerruf entfernt den iframe (`docs/pruefbericht.md`, Consent-Audit).

Geprüft am 21.09.2026 (headless Chrome): beide Listen rendern im iframe, keine `X-Frame-Options`.
Homegate setzt dabei Cookies (Cloudflare, DataDome) und lädt Google Tag Manager/Fonts.

## Grenzen und Risiken

- Homegate kann Einbettung, Layout oder Bot-Schutz jederzeit ändern; Safari/Chrome blockieren
  Drittanbieter-Cookies im iframe zunehmend (Liste bleibt meist trotzdem sichtbar, Filter-Zustand
  evtl. nicht). Der Direktlink ist deshalb der garantierte Weg.
- Die Nutzungsbedingungen von Homegate zur Einbettung wurden nicht geprüft → beim Kunden/Homegate
  bestätigen (docs/uebergabe.md).
- Auf dem Handy ist die eingebettete Liste (Homegate-Layout) schmal; der Direktlink ist dort der bessere Weg.

## Spätere Pflege

- **Sanity:** Dokument «Externe Angebote (homegate.ch)» mit URL je Art (validiert auf
  `https://www.homegate.ch/`), Einbettung an/aus, Titel, Texte, Prüfdatum. Keine Objektpflege.
- **Erweiterung (nicht gebaut):** Wenn der Kunde Objekte direkt auf der Website pflegen will, wäre
  das ein eigenes Sanity-Dokument «Objekt» (Adresse, Art, Zimmer, Fläche, Nettomiete, Nebenkosten,
  Bruttomiete/Preis oder «auf Anfrage», Verfügbarkeit, Bilder, Kontakt) mit eigener Listen- und
  Detailseite – und Doppelpflege gegenüber Homegate. Alternativ ein Export aus der
  Bewirtschaftungssoftware (die PDFs nennen Garaio) als Import-Skript. Beides erst nach bestätigtem
  Bedarf.
