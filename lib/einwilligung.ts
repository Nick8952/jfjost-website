/**
 * Einwilligungsverwaltung (ohne Framework-Abhängigkeit, damit sie testbar ist).
 *
 * Es gibt genau zwei einwilligungspflichtige Dienste, beide werden nur nach
 * Zustimmung geladen: die Angebotslisten von homegate.ch (Mieten/Kaufen) und
 * die Karte von Google Maps (Kontakt). «Notwendig» ist nur die Speicherung der
 * Entscheidung selbst in localStorage. Es gibt keine weiteren Kategorien –
 * keine Analyse, keine Werbung, kein eigener Server.
 */
export const KATEGORIEN = ["homegate", "karte"] as const;
export type Kategorie = (typeof KATEGORIEN)[number];

export const KATEGORIE_INFO: Record<Kategorie, { titel: string; anbieter: string; text: string }> = {
  homegate: {
    titel: "Immobilienangebote (homegate.ch)",
    anbieter: "SMG Swiss Marketplace Group AG; lädt zudem Cloudflare, DataDome, Google Tag Manager, Google Fonts",
    text: "Zeigt die aktuellen Miet- und Kaufangebote als eingebettete Liste von homegate.ch. Beim Laden werden IP-Adresse und Browserangaben übermittelt und Cookies der Anbieter gesetzt.",
  },
  karte: {
    titel: "Karte (Google Maps)",
    anbieter: "Google Ireland Limited",
    text: "Zeigt den Standort Steinwiesenstrasse 3, Schlieren als eingebettete Karte. Beim Laden werden IP-Adresse und Browserangaben an Google übermittelt.",
  },
};

export const SPEICHER_SCHLUESSEL = "jfjost-einwilligung";
/** Bei Änderungen an Kategorien oder Texten erhöhen: alte Entscheidungen gelten dann nicht mehr. */
export const VERSION = 1;

export type Einwilligung = {
  version: number;
  zeitpunkt: string;
  kategorien: Record<Kategorie, boolean>;
};

export const KEINE: Einwilligung["kategorien"] = { homegate: false, karte: false };
export const ALLE: Einwilligung["kategorien"] = { homegate: true, karte: true };

/** Zeichenkette aus localStorage in eine gültige Einwilligung überführen; sonst null. */
export function lesen(roh: string | null | undefined): Einwilligung | null {
  if (!roh) return null;
  try {
    const wert = JSON.parse(roh) as Partial<Einwilligung>;
    if (wert.version !== VERSION || typeof wert.zeitpunkt !== "string" || typeof wert.kategorien !== "object" || !wert.kategorien) return null;
    const kategorien = { ...KEINE };
    for (const k of KATEGORIEN) kategorien[k] = wert.kategorien[k] === true;
    return { version: VERSION, zeitpunkt: wert.zeitpunkt, kategorien };
  } catch {
    return null;
  }
}

export function erzeugen(kategorien: Partial<Einwilligung["kategorien"]>, jetzt = new Date()): Einwilligung {
  return { version: VERSION, zeitpunkt: jetzt.toISOString(), kategorien: { ...KEINE, ...kategorien } };
}

/**
 * Zugriff auf localStorage mit Rückfall im Speicher: Im Privatmodus oder bei
 * gesperrtem Speicher darf die Einwilligung nicht abstürzen, sie gilt dann nur
 * für die aktuelle Seite.
 */
let imSpeicher: string | null = null;

export function gespeicherte(): Einwilligung | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) return lesen(window.localStorage.getItem(SPEICHER_SCHLUESSEL));
  } catch {
    // Speicher gesperrt
  }
  return lesen(imSpeicher);
}

export function speichern(einwilligung: Einwilligung | null): void {
  const roh = einwilligung ? JSON.stringify(einwilligung) : null;
  imSpeicher = roh;
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    if (roh === null) window.localStorage.removeItem(SPEICHER_SCHLUESSEL);
    else window.localStorage.setItem(SPEICHER_SCHLUESSEL, roh);
  } catch {
    // Speicher gesperrt: Entscheidung gilt nur für diese Seite
  }
}

/** Andere Komponenten (Platzhalter, Banner) hören auf dieses Ereignis. */
export const EREIGNIS = "jfjost-einwilligung-geaendert";

export function bekanntgeben(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EREIGNIS));
}
