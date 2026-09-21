import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ALLE, KEINE, VERSION, erzeugen, lesen } from "../lib/einwilligung";

describe("Einwilligung", () => {
  it("liest nur gültige, versionierte Einträge", () => {
    assert.equal(lesen(null), null);
    assert.equal(lesen(""), null);
    assert.equal(lesen("kaputt{"), null);
    assert.equal(lesen(JSON.stringify({ version: VERSION + 1, zeitpunkt: "x", kategorien: ALLE })), null);
    assert.equal(lesen(JSON.stringify({ version: VERSION, kategorien: ALLE })), null);
  });
  it("normalisiert Kategorien: unbekannte fallen weg, fehlende sind false", () => {
    const e = lesen(JSON.stringify({ version: VERSION, zeitpunkt: "2026-09-21T10:00:00.000Z", kategorien: { homegate: true, analyse: true } }));
    assert.deepEqual(e?.kategorien, { homegate: true, karte: false });
  });
  it("erzeugt Einträge ohne Vorauswahl", () => {
    const jetzt = new Date("2026-09-21T10:00:00.000Z");
    assert.deepEqual(erzeugen({}, jetzt), { version: VERSION, zeitpunkt: jetzt.toISOString(), kategorien: KEINE });
    assert.deepEqual(erzeugen({ karte: true }, jetzt).kategorien, { homegate: false, karte: true });
  });
});
