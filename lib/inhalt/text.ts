import type { Fliesstext, Textabsatz, Textspanne } from "./typen";

/**
 * Kleine Helfer, um Fliesstext in data/*.ts lesbar zu notieren. Ergebnis ist
 * Portable Text, wie es auch der Sanity-Editor speichert.
 */

let zaehler = 0;
const key = (praefix: string) => `${praefix}-${(zaehler += 1)}`;

type Teil = string | { fett: string } | { kursiv: string } | { link: string; url: string; blank?: boolean };

function spannen(teile: Teil[], markDefs: NonNullable<Textabsatz["markDefs"]>): Textspanne[] {
  return teile.map((teil) => {
    if (typeof teil === "string") return { _type: "span", text: teil };
    if ("fett" in teil) return { _type: "span", text: teil.fett, marks: ["strong"] };
    if ("kursiv" in teil) return { _type: "span", text: teil.kursiv, marks: ["em"] };
    const k = key("link");
    markDefs.push({ _key: k, _type: "link", href: teil.url, blank: teil.blank ?? /^https?:/.test(teil.url) });
    return { _type: "span", text: teil.link, marks: [k] };
  });
}

/** Absatz aus Text und Auszeichnungen. */
export function p(...teile: Teil[]): Textabsatz {
  const markDefs: NonNullable<Textabsatz["markDefs"]> = [];
  return { _type: "block", _key: key("p"), style: "normal", children: spannen(teile, markDefs), markDefs };
}

/** Zwischentitel innerhalb eines Textblocks. */
export function h3(text: string): Textabsatz {
  return { _type: "block", _key: key("h"), style: "h3", children: [{ _type: "span", text }], markDefs: [] };
}

/** Aufzählung: jeder Eintrag wird ein Listenpunkt. */
export function liste(...eintraege: (string | Teil[])[]): Textabsatz[] {
  return eintraege.map((eintrag) => {
    const markDefs: NonNullable<Textabsatz["markDefs"]> = [];
    const teile = typeof eintrag === "string" ? [eintrag] : eintrag;
    return { _type: "block", _key: key("li"), style: "normal", listItem: "bullet", level: 1, children: spannen(teile, markDefs), markDefs };
  });
}

/** Nur Text (ohne Auszeichnung) aus einem Fliesstext, z. B. für Meta-Beschreibungen. */
export function nurText(text: Fliesstext): string {
  return text.map((absatz) => absatz.children.map((s) => s.text).join("")).join(" ");
}

export const fett = (fett: string) => ({ fett });
export const kursiv = (kursiv: string) => ({ kursiv });
export const link = (link: string, url: string) => ({ link, url });
