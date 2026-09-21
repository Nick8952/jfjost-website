/**
 * Inhaltsprüfungen der lokalen Quelle: Vollständigkeit gegenüber der
 * Inhaltsinventur, keine erfundenen Objektdaten, alle Bilder und Downloads
 * vorhanden, Kontaktdaten wie belegt.
 *
 *   npm test
 */
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { lokaleInhaltsquelle as inhalt } from "../lib/inhalt/lokal";
import { nurText } from "../lib/inhalt/text";
import type { Baustein, Bild, Fliesstext } from "../lib/inhalt/typen";

const wurzel = join(import.meta.dirname, "..");

function alleBilder(wert: unknown, gefunden: Bild[] = []): Bild[] {
  if (Array.isArray(wert)) wert.forEach((w) => alleBilder(w, gefunden));
  else if (wert && typeof wert === "object") {
    const o = wert as Record<string, unknown>;
    if (typeof o.src === "string" && typeof o.alt === "string" && o.varianten) gefunden.push(o as unknown as Bild);
    else Object.values(o).forEach((w) => alleBilder(w, gefunden));
  }
  return gefunden;
}

describe("Einstellungen", () => {
  it("enthält die belegten Kontaktdaten", async () => {
    const e = await inhalt.einstellungen();
    assert.equal(e.kontakt.firma, "J.F. Jost & Co");
    assert.equal(e.kontakt.firmaRegister, "J.F. Jost & Co KmG");
    assert.equal(e.kontakt.uid, "CHE-105.786.236");
    assert.equal(e.kontakt.strasse, "Steinwiesenstrasse 3");
    assert.equal(e.kontakt.plz, "8952");
    assert.equal(e.kontakt.ort, "Schlieren");
    assert.equal(e.kontakt.telefon, "044 755 53 53");
    assert.equal(e.kontakt.telefonLink, "tel:+41447555353");
    assert.equal(e.kontakt.email, "info@jfjost.ch");
    assert.equal(e.oeffnungszeiten.length, 2);
  });
  it("verlinkt Impressum, Datenschutz und Cookie-Einstellungen im Fuss", async () => {
    const e = await inhalt.einstellungen();
    assert.deepEqual(
      e.fussnavigation.map((v) => v.ziel),
      ["/impressum/", "/datenschutz/", "/datenschutz-einstellungen/"]
    );
  });
  it("hat nur interne Navigationsziele mit Schrägstrich", async () => {
    const e = await inhalt.einstellungen();
    for (const p of e.navigation) {
      assert.match(p.ziel, /^\/[a-z-]*\/$/);
      for (const u of p.unterpunkte ?? []) assert.match(u.ziel, /^\/[a-z-]+\/$/);
    }
  });
});

describe("Seiten", () => {
  const erwartet = ["mieten", "kaufen", "formulare", "renovationen", "unternehmen", "jobs", "engagement", "links"];
  it("liefert alle Seiten der Inventur", async () => {
    assert.deepEqual((await inhalt.seitenSlugs()).sort(), [...erwartet].sort());
  });
  it("hat je Seite Titel, Beschreibung und mindestens einen Baustein", async () => {
    for (const slug of erwartet) {
      const s = await inhalt.seite(slug);
      assert.ok(s, slug);
      assert.ok(s.seo.titel.length > 3 && s.seo.beschreibung.length > 40, `${slug}: SEO`);
      assert.ok(s.seo.beschreibung.length <= 170, `${slug}: Beschreibung zu lang (${s.seo.beschreibung.length})`);
      assert.ok(s.bausteine.length > 0, `${slug}: Bausteine`);
      const keys = s.bausteine.map((b: Baustein) => b._key);
      assert.equal(new Set(keys).size, keys.length, `${slug}: doppelte _key`);
    }
  });
  it("bindet Homegate auf Mieten und Kaufen ein, sonst nirgends", async () => {
    for (const slug of erwartet) {
      const s = await inhalt.seite(slug);
      const einbettungen = s!.bausteine.filter((b) => b._type === "angebotseinbettung");
      if (slug === "mieten" || slug === "kaufen") {
        assert.equal(einbettungen.length, 1);
        assert.equal((einbettungen[0] as { art: string }).art, slug);
      } else assert.equal(einbettungen.length, 0, slug);
    }
  });
  it("liefert null für unbekannte Slugs", async () => {
    assert.equal(await inhalt.seite("gibt-es-nicht"), null);
  });
  it("erfindet keine offenen Stellen", async () => {
    const jobs = await inhalt.seite("jobs");
    assert.match(jobs!.kopf.einleitung ?? "", /keine offenen Stellen/);
  });
});

describe("Externe Angebote", () => {
  it("zeigt auf die Homegate-Trefferlisten der bisherigen Website", async () => {
    const a = await inhalt.externeAngebote();
    assert.equal(a.mieten.url, "https://www.homegate.ch/mieten/alle-mietinserate/trefferliste?a=jos&incsubs=1");
    assert.equal(a.kaufen.url, "https://www.homegate.ch/kaufen/alle-kaufinserate/trefferliste?a=jos");
    assert.match(a.zuletztGeprueft, /^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("Bilder", () => {
  it("existieren als Dateien und tragen Alt-Texte", async () => {
    const quellen = [await inhalt.startseite(), await inhalt.team(), await inhalt.referenzen(), ...(await Promise.all((await inhalt.seitenSlugs()).map((s) => inhalt.seite(s))))];
    const bilder = alleBilder(quellen);
    assert.ok(bilder.length > 100, `nur ${bilder.length} Bilder gefunden`);
    for (const b of bilder) {
      assert.ok(b.alt.length >= 5, `Alt fehlt: ${b.src}`);
      assert.ok(existsSync(join(wurzel, "public", b.src)), `Datei fehlt: ${b.src}`);
      for (const v of [...b.varianten.avif, ...b.varianten.webp]) assert.ok(existsSync(join(wurzel, "public", v.pfad)), `Variante fehlt: ${v.pfad}`);
    }
  });
});

describe("Referenzen", () => {
  it("umfasst die 12 Projekte der bisherigen Website mit allen 91 Fotos", async () => {
    const r = await inhalt.referenzen();
    assert.equal(r.projekte.length, 13); // 12 Projekte + Naturofloor-Block
    const fotos = r.projekte.reduce((n, p) => n + p.bilder.length, 0);
    assert.equal(fotos, 91);
    assert.equal(new Set(r.projekte.map((p) => p.slug)).size, r.projekte.length);
  });
  it("enthält keine erfundenen Zahlen (Kosten, Flächen)", async () => {
    const r = await inhalt.referenzen();
    for (const p of r.projekte) {
      const text = [p.titel, p.ort ?? "", ...p.leistungen, p.text ? nurText(p.text as Fliesstext) : ""].join(" ");
      assert.doesNotMatch(text, /CHF|m²|m2|Fr\./, p.slug);
    }
  });
});

describe("Team", () => {
  it("hat 6 Abteilungen und nur Telefonnummern im Schweizer Format", async () => {
    const t = await inhalt.team();
    assert.equal(t.abteilungen.length, 6);
    for (const a of t.abteilungen) {
      for (const m of a.mitglieder) {
        assert.ok(m.telefone.length > 0, m.name);
        for (const tel of m.telefone) assert.match(tel, /^0\d{2} \d{3} \d{2} \d{2}$/, `${m.name}: ${tel}`);
        if (m.email) assert.match(m.email, /^[a-z.]+@jfjost\.ch$/, m.name);
      }
    }
  });
});

describe("Downloads", () => {
  it("existieren mit korrekter Grösse", async () => {
    const d = await inhalt.downloads();
    assert.equal(d.downloads.length, 7);
    for (const datei of d.downloads) {
      const pfad = join(wurzel, "public", datei.datei);
      assert.ok(existsSync(pfad), datei.datei);
      assert.equal(statSync(pfad).size, datei.bytes, `${datei.datei}: Grösse`);
    }
  });
});

describe("Rechtstexte", () => {
  it("trennen Demo-Betreiber und dargestelltes Unternehmen", async () => {
    const i = await inhalt.rechtstext("impressum");
    const text = nurText(i.text);
    assert.match(text, /Nick Holzbecher/);
    assert.match(text, /J\.F\. Jost & Co KmG/);
    assert.match(text, /CHE-105\.786\.236/);
    assert.doesNotMatch(text, /Lorem|Platzhalter/i);
  });
  it("beschreiben die tatsächliche Technik und keine aktiven Sanity-/Vercel-Dienste", async () => {
    const d = await inhalt.rechtstext("datenschutz");
    const text = nurText(d.text);
    assert.match(text, /GitHub Pages/);
    assert.match(text, /homegate\.ch/);
    assert.match(text, /Google Maps/);
    assert.match(text, /jfjost-einwilligung/);
    assert.match(text, /nicht im Einsatz/);
  });
});
