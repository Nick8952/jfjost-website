/**
 * Inhaltsmodell der Website: die einzige Wahrheit über Datenstruktur und
 * Benennung. Beide Inhaltsquellen (lokal: data/*.ts, später: Sanity) liefern
 * exakt diese Typen; Seiten und Komponenten kennen nur diese Datei.
 *
 * Immobilienangebote sind KEIN Teil dieses Modells. Sie bleiben auf Homegate
 * (führende Quelle) und werden nur als externe Verweise/Einbettungen geführt,
 * siehe ExterneAngebote.
 */

/* ------------------------------------------------------------------ Bilder */

export type Bild = {
  /** Fallback-Datei (WebP, grösste Breite) bzw. CMS-Adresse. */
  src: string;
  breite: number;
  hoehe: number;
  alt: string;
  varianten: { avif: { breite: number; pfad: string }[]; webp: { breite: number; pfad: string }[] };
  /** Kleine Unschärfe-Vorschau als data-URL; leer, wenn keine vorhanden. */
  unschaerfe: string;
  /** true: src/varianten sind absolute Adressen (CMS-CDN), kein Unterpfad davor. */
  absolut: boolean;
  /** Bildlegende, wenn sie unter dem Bild stehen soll (Referenzen). */
  legende?: string;
};

/* --------------------------------------------------------------- Fliesstext */

/**
 * Fliesstext ist Portable Text (das Format des Sanity-Editors), damit lokale
 * Inhalte und CMS-Inhalte denselben Renderer nutzen. Unterstützt werden
 * Absätze, Zwischentitel (h3), Aufzählungen, fett/kursiv und Links.
 */
export type Textspanne = { _type: "span"; text: string; marks?: string[] };
export type Textabsatz = {
  _type: "block";
  _key?: string;
  style?: "normal" | "h3" | "h4" | "blockquote";
  listItem?: "bullet" | "number";
  level?: number;
  children: Textspanne[];
  markDefs?: { _key: string; _type: "link"; href: string; blank?: boolean }[];
};
export type Fliesstext = Textabsatz[];

/* --------------------------------------------------------------- Allgemein */

export type Verweis = { text: string; ziel: string; extern?: boolean };

export type Seo = {
  titel: string;
  beschreibung: string;
};

export type Navigationspunkt = {
  text: string;
  ziel: string;
  unterpunkte?: { text: string; ziel: string; hinweis?: string }[];
};

export type Zeitfenster = { tage: string; zeiten: string[] };

export type Kontaktdaten = {
  firma: string;
  /** Eingetragener Name laut Handelsregister (Zefix), inkl. Rechtsform. */
  firmaRegister: string;
  uid: string;
  strasse: string;
  plz: string;
  ort: string;
  telefon: string;
  telefonLink: string;
  email: string;
  /** Adresse für Karten- und Routenlinks (Google Maps ohne Einbettung). */
  routenLink: string;
};

export type WebsiteEinstellungen = {
  kontakt: Kontaktdaten;
  oeffnungszeiten: Zeitfenster[];
  navigation: Navigationspunkt[];
  fussnavigation: Verweis[];
  /** Kurzzeile, die im Fuss und im Impressum die Demo vom Original abgrenzt. */
  demoHinweis: string;
  /** Verbands- und Mitgliedschaftsangaben (Unternehmen-Seite, Fuss). */
  mitgliedschaften: string[];
};

/* --------------------------------------------------------------- Bausteine */

export type Textblock = {
  _type: "textblock";
  _key: string;
  kicker?: string;
  titel?: string;
  text: Fliesstext;
  /** schmal = Lesespalte (Standard), breit = zweispaltig ab Tablet. */
  breite?: "schmal" | "breit";
};

export type Leistung = { titel: string; text: Fliesstext; nummer?: string };
export type Leistungsliste = {
  _type: "leistungsliste";
  _key: string;
  kicker?: string;
  titel?: string;
  leistungen: Leistung[];
};

export type Teaser = { titel: string; text: string; ziel: string; aktion: string; bild?: Bild };
export type Teaserraster = {
  _type: "teaserraster";
  _key: string;
  kicker?: string;
  titel?: string;
  teaser: Teaser[];
};

export type Bildtext = {
  _type: "bildtext";
  _key: string;
  kicker?: string;
  titel?: string;
  text: Fliesstext;
  bild: Bild;
  bildSeite?: "links" | "rechts";
};

export type Hinweisblock = {
  _type: "hinweis";
  _key: string;
  titel?: string;
  text: Fliesstext;
  /** info = neutral, wichtig = gelb hervorgehoben. */
  art?: "info" | "wichtig";
};

export type Zeitpunkt = { jahr: string; titel: string; text?: string };
export type Zeitstrahl = {
  _type: "zeitstrahl";
  _key: string;
  kicker?: string;
  titel?: string;
  punkte: Zeitpunkt[];
};

export type Linkliste = {
  _type: "linkliste";
  _key: string;
  kicker?: string;
  titel?: string;
  links: { text: string; url: string; hinweis?: string }[];
};

/** Einbettung der externen Homegate-Trefferliste (Mieten oder Kaufen). */
export type Angebotseinbettung = {
  _type: "angebotseinbettung";
  _key: string;
  art: "mieten" | "kaufen";
};

export type Downloadliste = {
  _type: "downloadliste";
  _key: string;
  kicker?: string;
  titel?: string;
  /** Leer = alle Downloads. Sonst Filter nach Kategorie. */
  kategorie?: Download["kategorie"];
};

export type Handlungsaufforderung = {
  _type: "handlungsaufforderung";
  _key: string;
  titel: string;
  text?: string;
  aktionen: Verweis[];
};

export type Baustein =
  | Textblock
  | Leistungsliste
  | Teaserraster
  | Bildtext
  | Hinweisblock
  | Zeitstrahl
  | Linkliste
  | Angebotseinbettung
  | Downloadliste
  | Handlungsaufforderung;

/* ------------------------------------------------------------------ Seiten */

export type Seitenkopf = {
  kicker?: string;
  titel: string;
  einleitung?: string;
  bild?: Bild;
};

/** Baustein-Seite (Mieten, Kaufen, Renovationen, Unternehmen, Jobs, Engagement, Links, Formulare). */
export type Seite = {
  slug: string;
  seo: Seo;
  kopf: Seitenkopf;
  bausteine: Baustein[];
};

export type Liegenschaftsbild = { bild: Bild; titel: string; ort?: string };

export type Startseite = {
  seo: Seo;
  hero: {
    titel: string;
    untertitel: string;
    bild: Bild;
    aktionen: Verweis[];
  };
  /** Die Motive des bisherigen Startseiten-Sliders mit ihren Originaltiteln. */
  liegenschaften: { kicker: string; titel: string; bilder: Liegenschaftsbild[] };
  bereiche: { kicker: string; titel: string; teaser: Teaser[] };
  geschichte: { kicker: string; titel: string; text: string; punkte: Zeitpunkt[]; ziel: Verweis };
  abschluss: Handlungsaufforderung;
};

export type Teammitglied = {
  name: string;
  funktion?: string;
  telefone: string[];
  /** E-Mail-Adresse; wird im HTML nie im Klartext ausgegeben (components/EmailKnopf.tsx). */
  email?: string;
  bild?: Bild;
};

export type Teamabteilung = {
  titel: string;
  mitglieder: Teammitglied[];
};

export type Teamseite = {
  seo: Seo;
  kopf: Seitenkopf;
  abteilungen: Teamabteilung[];
  hinweis?: string;
};

export type Referenzprojekt = {
  slug: string;
  titel: string;
  ort?: string;
  zeitraum?: string;
  /** Leistungen/Stichworte zum Projekt, wörtlich von der bisherigen Website. */
  leistungen: string[];
  text?: Fliesstext;
  bilder: Bild[];
};

export type Referenzseite = {
  seo: Seo;
  kopf: Seitenkopf;
  projekte: Referenzprojekt[];
  /** Zusatzblock, z. B. Naturofloor-Zertifizierung. */
  hinweis?: Hinweisblock;
};

export type Download = {
  titel: string;
  beschreibung?: string;
  datei: string;
  format: "PDF";
  bytes: number;
  seiten?: number;
  kategorie: "formular" | "merkblatt";
};

export type Downloadseite = {
  seo: Seo;
  kopf: Seitenkopf;
  downloads: Download[];
};

export type Kontaktseite = {
  seo: Seo;
  kopf: Seitenkopf;
  anliegen: string[];
  formularHinweis: string;
  karteHinweis: string;
};

export type ExterneAngebote = {
  anbieter: string;
  anbieterDatenschutz: string;
  mieten: { url: string; einbettungAktiv: boolean; titel: string; text: string };
  kaufen: { url: string; einbettungAktiv: boolean; titel: string; text: string };
  /** Datum der letzten manuellen Funktionsprüfung der Einbettung (ISO). */
  zuletztGeprueft: string;
  platzhalterTitel: string;
  platzhalterText: string;
  stoerungHinweis: string;
};

export type Rechtstext = {
  art: "impressum" | "datenschutz";
  seo: Seo;
  titel: string;
  stand: string;
  text: Fliesstext;
};

/* ------------------------------------------------------------ Schnittstelle */

/** Jede Inhaltsquelle liefert dieselben Methoden; Seiten importieren nur `inhalt` aus ./index. */
export interface Inhaltsquelle {
  einstellungen(): Promise<WebsiteEinstellungen>;
  startseite(): Promise<Startseite>;
  seite(slug: string): Promise<Seite | null>;
  seitenSlugs(): Promise<string[]>;
  team(): Promise<Teamseite>;
  referenzen(): Promise<Referenzseite>;
  downloads(): Promise<Downloadseite>;
  kontakt(): Promise<Kontaktseite>;
  externeAngebote(): Promise<ExterneAngebote>;
  rechtstext(art: Rechtstext["art"]): Promise<Rechtstext>;
}
