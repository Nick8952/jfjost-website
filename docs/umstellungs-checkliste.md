# Umstellungs-Checkliste: Demo → Kundenwebsite

## Pfade und Hosting
- [ ] Vercel-Projekt mit `DEPLOY_TARGET=vercel` (kein `basePath`, kein `output: export`).
- [ ] `NEXT_PUBLIC_BASE_PATH` leer; alle Dateipfade laufen über `oeffentlicherPfad()` – nichts anzupassen.
- [ ] `NEXT_PUBLIC_SITE_URL=https://www.jfjost.ch` (oder gewünschte Domain).
- [ ] GitHub-Pages-Workflow abschalten, sobald die Demo nicht mehr gebraucht wird.

## Domain
- [ ] Domain bei Vercel hinzufügen, DNS (A/CNAME) beim Registrar von jfjost.ch umstellen.
- [ ] `www` → Apex oder umgekehrt festlegen (eine kanonische Form).

## SEO
- [ ] `NEXT_PUBLIC_INDEXIEREN=ja` → `noindex` fällt weg, `sitemap.xml` wird gefüllt, `robots.txt` nennt sie.
- [ ] Canonicals prüfen (`absolut()` verwendet `NEXT_PUBLIC_SITE_URL`).
- [ ] Google Search Console anmelden, Sitemap einreichen.
- [ ] Weiterleitungen alte → neue Adressen (301) in `next.config.ts` (`redirects()`), nur im Vercel-Profil:

| alt | neu |
|---|---|
| /de/home, /de | / |
| /de/mieten, /de/liegenschaftenverwaltung-und-immobilien | /mieten/ |
| /de/kaufen | /kaufen/ |
| /de/formulare-download | /formulare/ |
| /de/sanierung-und-renovationen, /de/dienstleistungsbeschreibung | /renovationen/ |
| /de/sanierung-renovation-referenzen | /referenzen/ |
| /de/team, /de/ueber-uns | /team/ |
| /de/unternehmen | /unternehmen/ |
| /de/jobs | /jobs/ |
| /de/engagement | /engagement/ |
| /de/kontakt | /kontakt/ |
| /de/links | /links/ |
| /de/impressum | /impressum/ |
| /uploads/files/dokumente/*.pdf | /downloads/*.pdf (Namen siehe docs/inhaltsinventur.md) |

## Datenschutz und Impressum
- [ ] Impressum: Betreiber = J.F. Jost & Co KmG (UID, Adresse, Kontakt); Demo-Betreiber entfernen; Postanschrift Nick nur, falls er als Dienstleister genannt wird.
- [ ] Datenschutzerklärung neu: Vercel (Hosting, Logs), Sanity (Medien-CDN), homegate.ch, Google Maps, Kontakt per E-Mail; Sanity/Vercel-Abschnitt «Mögliche spätere Änderungen» ersetzen.
- [ ] Demo-Hinweis in `websiteEinstellungen.demoHinweis` leeren.
- [ ] Prüfen, ob ein Kontaktformular mit Versand (statt mailto) gewünscht ist → dann Anbieter + Datenschutz ergänzen.

## Inhalte
- [ ] Offene Fragen aus docs/uebergabe.md beantworten und einpflegen.
- [ ] Höher aufgelöste Fotos einsetzen (Slider/Referenzen sind ≤ 976 px).
- [ ] PDF-Metadaten bereinigen.
- [ ] Homegate-Adressen bestätigen; Prüfdatum in «Externe Angebote» setzen.

## Technik
- [ ] `npm audit` und Abhängigkeiten aktualisieren.
- [ ] Sanity-Webhook + Revalidate-Route (docs/sanity-vercel-einrichtung.md §5).
- [ ] Monitoring: Vercel-Deploy-Benachrichtigungen; jährlich `npm run live:pruefen`.
