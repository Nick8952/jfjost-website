import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { oeffentlicherPfad } from "../lib/pfade";

describe("Pfade", () => {
  it("setzt den Unterpfad vor Dateipfade", () => {
    // In Tests ist NEXT_PUBLIC_BASE_PATH nicht gesetzt: kein Präfix.
    assert.equal(oeffentlicherPfad("/downloads/a.pdf"), "/downloads/a.pdf");
    assert.equal(oeffentlicherPfad("downloads/a.pdf"), "/downloads/a.pdf");
  });
});
