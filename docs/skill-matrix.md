# Skill-Matrix

Alle in dieser Umgebung installierten Skills wurden zu Beginn erfasst (`~/.claude/skills`,
`.claude/skills`, `.agents/skills`, Plugins `design:*`, `anthropic-skills:*`, `vercel:*`).
«Angewendet» heisst: SKILL.md gelesen und Vorgaben in der Umsetzung befolgt; die Prüfung steht in
docs/pruefbericht.md.

| Skill | Relevanz | Tatsächliche Anwendung | Prüfung |
|---|---|---|---|
| frontend-design | hoch | Design Read + These im Hero, Gestaltung aus der Welt des Unternehmens (Tafel, Masslinie), keine Template-Defaults | Screenshots 4 Breiten, Design-Kritik |
| ui-ux-pro-max | hoch | `search.py --design-system` ausgeführt (Vorschlag: Cinzel/Josefin, Teal – **bewusst verworfen**, passt nicht zur gelb-schwarzen Marke); Prioritätenliste (Kontrast, 44 px, Reduced Motion, Formulare) umgesetzt | Audit-Skript (Touch-Ziele, Überlauf, alt) |
| design-taste-frontend | hoch | Design Read + 3 Dials (6/3/4), Anti-Default-Disziplin, Icons nur Phosphor, RSC/Client-Trennung | Pre-Flight-Check auf Screenshots |
| high-end-visual-design | mittel | Typografie/Abstände/Schattenlogik; **nicht** übernommen: Glas, Pillen-Knöpfe, «Double-Bezel», Mesh-Gradients (widersprechen dem Brief: seriös, zurückhaltend) | Sichtprüfung |
| redesign-existing-projects | hoch | Bestandsaudit der alten Seite (Google Fonts, Slider, Duplikatseiten, leeres Impressum), Liste strategischer Auslassungen (404, Skip-Link, Legal-Links, Formularvalidierung) abgearbeitet | Prüfbericht |
| design:design-system | hoch | Tokens in `app/globals.css` (primitiv → semantisch), keine Roh-Hexwerte in Komponenten, Zustände definiert | Grep nach `#` in components/*.css |
| design:ux-copy | hoch | CTAs verbhaft und spezifisch («Mietangebote ansehen», «E-Mail vorbereiten»), Fehlermeldungen mit Lösung, Platzhaltertexte für gesperrte Einbettungen | Sichtprüfung Formular/Platzhalter |
| design:accessibility-review | hoch | WCAG-2.1-AA-Checkliste: Kontrast (Gelb nie als Textfarbe), Fokus sichtbar, Skip-Link, Landmarks, Labels, aria-expanded/-modal, 44-px-Ziele | Audit-Skript + Tastaturtest |
| design:design-critique | hoch | Kritik-Rahmen auf die realen Screenshots angewendet (Erstwirkung, Hierarchie, Konsistenz) | docs/pruefbericht.md |
| design:design-handoff | hoch | docs/design-handoff.md (Tokens, Komponenten, Zustände, Breakpoints) | – |
| full-output-enforcement | hoch | keine Platzhalter/`TODO`/`…` im Code; jede Seite vollständig | Grep `TODO|Lorem|\.\.\.` |
| anthropic-skills:pdf | hoch | 7 PDFs mit pypdf geprüft (Seiten, Text, Felder, Metadaten) | docs/inhaltsinventur.md |
| frontend-ui-engineering | hoch | Komponentenschnitt, Container/Presentation, Formular-Zustände | Lint/Typecheck |
| security-and-hardening | hoch | Threat Model (nur mailto, kein Server), keine Secrets, `rel=noopener`, iframe `referrerPolicy`, Export-Prüfung auf Token-Muster | export-pruefen |
| ci-cd-and-automation | hoch | Workflow mit Quality Gates (typecheck, lint, test, build, export-pruefen) vor Deploy; Actions per SHA gepinnt | Workflow-Lauf |
| source-driven-development | mittel | Next-16-Regeln (async params, `output: export`, `dynamicParams=false`, Metadata-API) gegen Doku-Wissen; Sanity-Pakete auf aktuellen Versionen | Build |
| code-review-and-quality | hoch | Codex-Review (Architektur + Abschluss) | docs/codex-review.md |
| test-driven-development | mittel | node:test für Inhalte, Einwilligung, Pfade (20 Tests) | `npm test` |
| documentation-and-adrs | hoch | CLAUDE.md, docs/* | – |
| shipping-and-launch | mittel | Umstellungs-Checkliste, Live-Prüfskript | – |
| performance-optimization | mittel | AVIF/WebP-Varianten, `sizes`, LQIP, Lazy Loading, lokale Schriften, keine Fremd-Requests ohne Einwilligung | Export-Grösse 15 MB Bilder |
| vercel:nextjs / vercel:deploy | niedrig | nur als Referenz für den späteren Vercel-Build; **nicht** deployt | – |
| imagegen-*, image-to-code, brandkit, banner-design, brand, design (Logo/CIP) | – | nicht verwendet: keine Bildgenerierung, keine Markenentwicklung gewünscht | – |
| gpt-taste, minimalist-ui, industrial-brutalist-ui, stitch-design-taste | – | stilgebunden, passen nicht zum Brief (GSAP-Pinning, Bento, Brutalismus) | – |
| design-taste-frontend-v1 | – | nur bei Kompatibilitätsbedarf; aktuelle Version verwendet | – |
| find-skills | – | keine Fähigkeitslücke | – |
| browser-testing-with-devtools | – | Chrome-DevTools-MCP nicht konfiguriert; stattdessen puppeteer-core im Scratchpad | – |
| slides, dataviz, artifact-* | – | keine Präsentation/Diagramme im Auftrag | – |
| übrige Engineering-Skills (idea-refine, interview-me, spec-driven, constraint-driven, doubt-driven, deprecation, observability, api-design, git-workflow, planning, incremental, debugging, code-simplification, context-engineering, using-agent-skills) | niedrig | nicht separat angewendet; ihre Grundregeln (Annahmen benennen, kleine Schritte, Root-Cause beim Debuggen) wurden befolgt | – |

Fehlende Skills: **keine** der ausdrücklich genannten fehlt. `ui-ux` existiert nur als
`ui-ux-pro-max`; `pdf` als `anthropic-skills:pdf`. Ein Chrome-DevTools-MCP-Server ist nicht
eingerichtet (browser-testing-with-devtools), ersetzt durch puppeteer-core.
