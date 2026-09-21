import "server-only";

import type { Baustein, Download, ExterneAngebote, Inhaltsquelle, Kontaktseite, Rechtstext, Referenzseite, Seite, Startseite, Teamseite, WebsiteEinstellungen } from "@/lib/inhalt/typen";
import { DOWNLOADS, EINSTELLUNGEN, EXTERNE_ANGEBOTE, KONTAKT, RECHTSTEXT, REFERENZEN, SEITE, SEITEN_SLUGS, STARTSEITE, TEAM } from "./abfragen";
import { sanityBild, type SanityBild } from "./bild";
import { sanityClient } from "./client";

/**
 * Sanity-Inhaltsquelle, VORBEREITET, NOCH NICHT IN BETRIEB.
 *
 * Liefert exakt dieselben Typen wie die lokale Quelle. Aktiviert wird sie
 * durch den Tausch in lib/inhalt/index.ts (siehe dort). Fehlende Dokumente
 * führen zu klaren Fehlern statt zu leeren Seiten – nach dem Seed-Lauf sind
 * alle Einzeldokumente vorhanden.
 */
async function laden<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return sanityClient.fetch<T>(query, params, { next: { revalidate: 60, tags: ["inhalt"] } });
}

function pflicht<T>(wert: T | null | undefined, name: string): T {
  if (wert === null || wert === undefined) throw new Error(`Sanity: Dokument «${name}» fehlt. Zuerst «npm run seed» ausführen (docs/sanity-vercel-einrichtung.md).`);
  return wert;
}

type Roh<T> = Omit<T, "bild"> & { bild?: SanityBild };

function kopf<T extends { bild?: SanityBild }>(k: T) {
  return { ...k, bild: sanityBild(k.bild) };
}

function bausteine(liste: (Baustein & { bild?: SanityBild; teaser?: { bild?: SanityBild }[] })[] | null | undefined): Baustein[] {
  return (liste ?? []).map((b) => {
    if (b._type === "bildtext") return { ...b, bild: pflicht(sanityBild(b.bild as unknown as SanityBild), `Bild in Baustein ${b._key}`) };
    if (b._type === "teaserraster") return { ...b, teaser: b.teaser.map((t) => ({ ...t, bild: sanityBild(t.bild as unknown as SanityBild) })) };
    return b;
  }) as Baustein[];
}

export const sanityInhaltsquelle: Inhaltsquelle = {
  async einstellungen() {
    return pflicht(await laden<WebsiteEinstellungen | null>(EINSTELLUNGEN), "websiteEinstellungen");
  },
  async startseite() {
    const s = pflicht(await laden<Roh<Startseite> & { hero: Roh<Startseite["hero"]>; liegenschaften: { kicker: string; titel: string; bilder: { titel: string; ort?: string; bild: SanityBild }[] } } | null>(STARTSEITE), "startseite");
    return {
      ...s,
      hero: { ...s.hero, bild: pflicht(sanityBild(s.hero.bild), "Startseite: Hero-Bild") },
      liegenschaften: { ...s.liegenschaften, bilder: s.liegenschaften.bilder.map((l) => ({ ...l, bild: pflicht(sanityBild(l.bild, l.titel), `Liegenschaft ${l.titel}`) })) },
    } as Startseite;
  },
  async seite(slug) {
    const s = await laden<(Omit<Seite, "kopf" | "bausteine"> & { kopf: Roh<Seite["kopf"]>; bausteine: Baustein[] }) | null>(SEITE, { slug });
    if (!s) return null;
    return { ...s, kopf: kopf(s.kopf), bausteine: bausteine(s.bausteine) };
  },
  async seitenSlugs() {
    return (await laden<string[]>(SEITEN_SLUGS)) ?? [];
  },
  async team() {
    const t = pflicht(await laden<(Omit<Teamseite, "kopf" | "abteilungen"> & { kopf: Roh<Teamseite["kopf"]>; abteilungen: { titel: string; mitglieder: (Omit<Teamseite["abteilungen"][number]["mitglieder"][number], "bild"> & { bild?: SanityBild })[] }[] }) | null>(TEAM), "teamseite");
    return {
      ...t,
      kopf: kopf(t.kopf),
      abteilungen: (t.abteilungen ?? []).map((a) => ({ ...a, mitglieder: (a.mitglieder ?? []).map((m) => ({ ...m, telefone: m.telefone ?? [], bild: sanityBild(m.bild, m.name) })) })),
    };
  },
  async referenzen() {
    const r = await laden<{ seite: (Omit<Referenzseite, "kopf" | "projekte"> & { kopf: Roh<Referenzseite["kopf"]> }) | null; projekte: (Omit<Referenzseite["projekte"][number], "bilder"> & { bilder: SanityBild[] })[] }>(REFERENZEN);
    const seite = pflicht(r.seite, "referenzseite");
    return {
      ...seite,
      kopf: kopf(seite.kopf),
      projekte: r.projekte.map((p) => ({ ...p, leistungen: p.leistungen ?? [], bilder: (p.bilder ?? []).map((b, i) => pflicht(sanityBild(b, `${p.titel}, Foto ${i + 1}`), `Referenz ${p.slug}: Foto ${i + 1}`)) })),
    };
  },
  async downloads() {
    const d = await laden<{ seite: { seo: Download extends never ? never : Kontaktseite["seo"]; kopf: Roh<Kontaktseite["kopf"]> } | null; downloads: (Omit<Download, "format"> & { datei: string; bytes: number })[] }>(DOWNLOADS);
    const seite = pflicht(d.seite, "downloadseite");
    return { seo: seite.seo, kopf: kopf(seite.kopf), downloads: d.downloads.map((x) => ({ ...x, format: "PDF" as const })) };
  },
  async kontakt() {
    const k = pflicht(await laden<(Omit<Kontaktseite, "kopf"> & { kopf: Roh<Kontaktseite["kopf"]> }) | null>(KONTAKT), "kontaktseite");
    return { ...k, kopf: kopf(k.kopf) };
  },
  async externeAngebote() {
    return pflicht(await laden<ExterneAngebote | null>(EXTERNE_ANGEBOTE), "externeAngebote");
  },
  async rechtstext(art) {
    return pflicht(await laden<Rechtstext | null>(RECHTSTEXT, { art }), `rechtstext ${art}`);
  },
};
