import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emailKodieren } from "../lib/email-kodierung";
import { zielErlaubt } from "../lib/verweise";

describe("Linkziele", () => {
  it("erlaubt interne Pfade, https, mailto, tel", () => {
    for (const z of ["/kontakt/", "https://www.homegate.ch/x", "http://www.gvschlieren.ch/", "mailto:info@jfjost.ch", "tel:+41447555353"]) assert.ok(zielErlaubt(z), z);
  });
  it("verwirft javascript:, data:, protokollrelative Adressen", () => {
    for (const z of ["javascript:alert(1)", "data:text/html,x", "//boese.example", " JAVASCRIPT:x", "ftp://x"]) assert.equal(zielErlaubt(z), false, z);
  });
});

describe("E-Mail-Kodierung", () => {
  it("enthält die Adresse nicht im Klartext und ist umkehrbar", () => {
    const k = emailKodieren("d.albertanti@jfjost.ch");
    assert.doesNotMatch(k, /albertanti|jfjost/);
    const zurueck = Array.from(Buffer.from(k, "base64").toString("utf8")).reverse().join("");
    assert.equal(zurueck, "d.albertanti@jfjost.ch");
  });
});
