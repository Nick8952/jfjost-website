# Später: Sanity als CMS und Vercel als Hosting einrichten

**Status: vorbereitet, nicht eingerichtet, nicht geprüft.** Nichts in diesem Dokument wurde gegen ein
echtes Sanity-Projekt oder Vercel-Projekt ausgeführt. Die Demo auf GitHub Pages braucht keinen
dieser Schritte.

| Stufe | Bedeutung |
|---|---|
| ✅ lokal geprüft | läuft in dieser Codebasis: Typecheck, Lint, Tests, statischer Build, Studio-Schemas kompilieren |
| 🛠 vorbereitet | Code vorhanden, erst mit Zugängen prüfbar |
| ⏳ erst nach Einrichtung | muss nach Anlegen der Konten verifiziert werden |

Vorbereitet (🛠): `sanity.config.ts`, `sanity.cli.ts`, `sanity/schemas/*` (12 Dokumenttypen,
10 Bausteine, deutsche Feldnamen/Hilfetexte/Validierungen), `sanity/client.ts`, `sanity/abfragen.ts`
(GROQ), `sanity/bild.ts`, `sanity/inhaltsquelle.ts` (gleiche Schnittstelle wie lokal),
`scripts/sanity-seed.mts` (Import), `.env.example`. Alles ist typgeprüft (✅), aber nie gegen ein
Dataset gelaufen (⏳).

## 1. Sanity-Projekt anlegen (Nick)

1. `npx sanity@latest login` (Browser).
2. `npx sanity@latest init --bare` im Projektordner **oder** im Sanity-Dashboard ein neues Projekt
   anlegen. **Nicht** ein Projekt einer anderen Demo wiederverwenden. Dataset `production`, public.
3. `cp .env.example .env.local`; `NEXT_PUBLIC_SANITY_PROJECT_ID` und `NEXT_PUBLIC_SANITY_DATASET`
   eintragen. Im Sanity-Dashboard unter API → Tokens einen Token mit **Editor**-Rechten erzeugen und
   als `SANITY_API_WRITE_TOKEN` eintragen (nur lokal, nie committen).
4. CORS-Origins im Dashboard: `http://localhost:3333`, `http://localhost:3000`, später die Vercel-
   und Kundendomain (mit Credentials).

## 2. Studio starten und Schemas prüfen (⏳)

`npm run studio` → http://localhost:3333. Erwartung: Struktur «Inhalte» mit 7 Einzeldokumenten
(Website-Einstellungen, Startseite, Team, Referenzen, Downloads, Kontakt, Externe Angebote) und
Listen (Seiten, Teammitglieder, Referenzprojekte, Downloads, Rechtstexte). Einzeldokumente lassen
sich nicht duplizieren/löschen.

## 3. Inhalte importieren (⏳)

```
npm run originale                 # Originalbilder/PDFs (Ordner ist nicht im Repo)
npm run seed -- --trockenlauf     # zeigt Dokumente und Medien, schreibt nichts
npm run seed                      # legt an, überschreibt nichts Vorhandenes
```

Das Skript lädt 118 Bilder (Originale, nicht die Web-Varianten) und 7 PDFs je einmal hoch, erzeugt
deterministische IDs und legt Dokumente per `createIfNotExists` an. `--aktualisieren` ersetzt
Vorhandenes und verlangt die Eingabe des Dataset-Namens. Es wird nie gelöscht.

Danach im Studio stichprobenartig prüfen: Startseite-Hero-Bild, Team-Referenzen, Referenzfotos mit
Legenden, Downloads mit Datei.

## 4. Website auf Sanity umstellen

`lib/inhalt/index.ts` ersetzen durch:

```ts
import "server-only";
export { sanityInhaltsquelle as inhalt } from "@/sanity/inhaltsquelle";
export type { Inhaltsquelle } from "./typen";
```

Sonst ändert sich nichts an Seiten/Komponenten. Lokal prüfen: `npm run dev` mit `.env.local`;
`npm run build:vercel`.

Bilder kommen dann vom Sanity-CDN (`absolut: true`, kein Unterpfad). `images: { unoptimized: true }`
in `next.config.ts` kann bleiben (das CDN liefert bereits Varianten) oder gegen `remotePatterns` für
`cdn.sanity.io` getauscht werden, falls `next/image` gewünscht ist.

## 5. Vercel (⏳)

1. Repo bei Vercel importieren (Framework Next.js). Build Command: `npm run build:vercel`.
2. Umgebungsvariablen: `DEPLOY_TARGET=vercel`, `NEXT_PUBLIC_SANITY_PROJECT_ID`,
   `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_REVALIDATE_SECRET` (zufällig), `NEXT_PUBLIC_SITE_URL`
   (Kundendomain, sonst leer lassen – **nicht** als Leerstring anlegen: der Code behandelt leer wie
   ungesetzt, aber Vercel-Preview-URLs sind sonst falsch), später `NEXT_PUBLIC_INDEXIEREN=ja`.
3. Der `pages`-Workflow (`.github/workflows/deploy.yml`) kann parallel weiterlaufen (Demo bleibt)
   oder entfernt werden.
4. **Inhaltsaktualisierung:** `sanity/inhaltsquelle.ts` nutzt `next: { revalidate: 60, tags: ["inhalt"] }`.
   Für sofortige Aktualisierung nach «Publish»: Route Handler `app/api/revalidate/route.ts` anlegen,
   der `revalidateTag("inhalt")` aufruft und den Sanity-Webhook (Secret = `SANITY_REVALIDATE_SECRET`)
   prüft – Vorlage: next-sanity-Dokumentation «Webhook revalidation». Dieser Handler darf **nicht**
   im Pages-Profil existieren (statischer Export unterstützt keine Route Handler mit Request), also
   erst nach der Umstellung anlegen oder per `DEPLOY_TARGET` ausschliessen.
5. Vorschau / Visual Editing: `next-sanity` ist installiert. Für Draft-Vorschau `defineLive`/
   `SanityLive` gemäss next-sanity-13-Dokumentation ergänzen und das Studio mit `presentationTool`
   erweitern. Nicht Teil der Demo.

## 6. Berechtigungen und Übergabe an den Kunden

- Sanity: Kunde als **Editor** einladen (Dashboard → Members). Nick bleibt Administrator oder
  überträgt das Projekt (Dashboard → Transfer).
- Studio bereitstellen: `npx sanity deploy` (kostenlose `*.sanity.studio`-Adresse) oder als Route
  `/studio` in die Next-App (erst nach Umstellung, nicht im statischen Export).
- Backup: `npx sanity dataset export production backup.tar.gz` (enthält Dokumente + Medien).
- Export der lokalen Demo-Inhalte ist immer möglich: `data/*.ts` + `assets/original/`.

## 7. Datenschutz/Impressum nach der Umstellung

Neu zu fassen (docs/umstellungs-checkliste.md): Betreiber = J.F. Jost & Co KmG, Hosting Vercel Inc.
(USA, Server-Logs), CMS Sanity (Sanity AS, Norwegen; Medien vom Sanity-CDN), Entfall des
Demo-Hinweises, ggf. Auftragsverarbeitungsverträge (Vercel DPA, Sanity DPA).
