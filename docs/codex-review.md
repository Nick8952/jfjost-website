# Codex-Prüfung (unabhängiger zweiter Prüfer)

Codex (`codex exec --sandbox read-only`) wurde zweimal eingesetzt. Beide Antworten liegen vor;
nichts davon ist erfunden.

## Runde 1 – Architektur (vor der Umsetzung, 21.09.2026)

Frage: statische GitHub-Pages-Demo, externe Homegate-Angebote, spätere Umstellung auf Sanity/Vercel.

| Empfehlung | Umsetzung |
|---|---|
| Homegate-iframe kann jederzeit brechen (DataDome/Cloudflare, Drittanbieter-Cookies, Frame-Busting); Fallback mit Direktlink, Hinweis nach 8–12 s, `referrerPolicy`/`allow`, keine Erfolgsbehauptung | ✅ Platzhalter + Direktlink + Hinweis nach 12 s + Attribute; Erfolg im Browser real geprüft (rendert) |
| Opt-in vor Laden ist die konservative, richtige Entscheidung (EDÖB-Leitfaden, ePrivacy für EU) | ✅ Zwei-Klick für Homegate und Google Maps, Kategorie/Zeit/Version gespeichert |
| Sanity-Objekt «Externe Angebote»: URL je Art, CTA/Platzhalter/Störungstext, Einbettung an/aus, Prüfdatum, Datenschutzlink; keine Inseratkopien | ✅ 1:1 so modelliert (`externeAngebote`) |
| Base-Path zentralisieren (Downloads, CSS-url, OG, JSON-LD); Vercel-Build mit leerem Base-Path testen; keine Sitemap für die noindex-Demo | ✅ `oeffentlicherPfad()`/`absolut()`; Sitemap nur bei `NEXT_PUBLIC_INDEXIEREN=ja`; Vercel-Build nicht ausgeführt (bewusst) |
| Next 16: async `params`, keine Server-Funktionen im Export, `generateStaticParams` vollständig, `metadataBase` ohne Unterpfad | ✅ |
| Mitarbeiter-E-Mails nur als `info@` zeigen (Harvesting) | ⚠️ teilweise: Adressen bleiben (Brief: Kontaktwege erhalten), aber nur kodiert im HTML; Entscheidung dem Kunden vorgelegt (docs/uebergabe.md) |
| Demo auf jeder Seite als inoffiziell kennzeichnen; mailto mit klarer Empfängeranzeige; Consent ohne localStorage robust; Karte wie Homegate blockieren; Meta-CSP nur beschränkt möglich; Contract-Tests beider Provider | ✅ Fusszeile + Impressum; Empfänger im Formularhinweis; In-Memory-Rückfall; Karte gesperrt; CSP nicht gesetzt (GitHub Pages ohne Header, dokumentiert); Contract-Test gegen Sanity erst nach Einrichtung möglich (docs/sanity-vercel-einrichtung.md) |

## Runde 2 – Abschlussprüfung der Implementierung (21.09.2026)

Geprüft und in Ordnung laut Codex: Inventur vs. Daten (7 Startmotive, 22 Team-Einträge, 13
Referenzblöcke/91 Fotos, 7 PDFs, 8 Bausteinseiten), keine erfundenen Bewertungen/Preise/Objekte,
mailto-Kodierung, Consent-Rückfall, Datenschutzerklärung technisch zutreffend, Originale/`.env`
ausgeschlossen, Workflow-Rechte minimal, Actions gepinnt, Export-Prüfung, Tests/Lint/TS.

| # | Befund (Schwere) | Umsetzung |
|---|---|---|
| 1 | Impressum: Postanschrift des Demo-Betreibers fehlt (hoch) | ⏳ offen – Angabe von Nick nötig; auf der Seite transparent als «wird ergänzt» ausgewiesen |
| 2 | E-Mails standen im RSC-Payload/`data-*` im Klartext, Behauptung «nie im Klartext» falsch (mittel) | ✅ Adressen nur noch kodiert (umgekehrt + Base64), Dekodierung beim Klick; Formulierung in Daten/Docs korrigiert; Test prüft, dass keine Adresse im HTML steht |
| 3 | Seed fasst Personen per Name zusammen → Diego Albertanti verliert Zweitfunktionen (hoch) | ✅ ein Dokument je Person **und** Funktion, Referenzen entsprechend |
| 4 | Sanity-Downloads sind absolute CDN-URLs; `Downloadliste` setzte den Unterpfad davor (hoch) | ✅ absolute Adressen werden erkannt |
| 5 | `_key` fehlte in verschachtelten Arrays/Portable-Text-Spans (mittel) | ✅ rekursive, deterministische Key-Vergabe vor dem Schreiben |
| 6 | Linkziele nicht auf sichere Schemas beschränkt (mittel) | ✅ Allowlist `/…`, `http(s)://`, `mailto:`, `tel:` im Schema (Regex) und beim Rendern (`lib/verweise.ts`, Test) |
| 7 | Mobiles Menü ohne Fokusfalle; `aria-controls` mit Leerzeichen (mittel) | ✅ Hintergrund (`main`, `footer`, Marke) wird `inert`; Gruppen-IDs aus Index |
| 8 | Feste Checkbox-IDs → doppelte IDs bei Banner + Einstellungsseite (mittel) | ✅ `useId()`-Präfix je Liste |
| 9 | iframes ohne `sandbox` (niedrig) | ✅ Sandbox für Karte und Homegate gesetzt (Homegate braucht scripts/same-origin/forms/popups – schwache Schranke, im Code begründet); Rendern danach erneut geprüft |
| 10 | `og:url` blieb auf allen Unterseiten die Startseite (niedrig) | ✅ `lib/metadaten.ts`: Canonical, `og:url`, `og:image` je Seite (dabei auch das fehlende og:image der Baustein-Seiten behoben, das die Live-Prüfung gemeldet hatte) |

Nach den Korrekturen: Typecheck, Lint, 23 Tests, Export-Prüfung, Consent-Audit und
Interaktionstests erneut bestanden (docs/pruefbericht.md).
