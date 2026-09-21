import { bild, fliesstext, navigationspunkt, seitenkopf, seo, verweis, zeitfenster } from "./objekte/gemeinsam";
import { angebotseinbettung, bildtext, downloadliste, handlungsaufforderung, hinweis, leistungsliste, linkliste, teaserraster, textblock, zeitstrahl } from "./objekte/bausteine";
import { download, downloadseite, externeAngebote, kontaktseite, rechtstext, referenzprojekt, referenzseite, seite, startseite, teammitglied, teamseite, websiteEinstellungen } from "./dokumente";

/** Alle Schemas des Studios. */
export const schemaTypes = [
  websiteEinstellungen,
  startseite,
  teamseite,
  referenzseite,
  downloadseite,
  kontaktseite,
  externeAngebote,
  seite,
  teammitglied,
  referenzprojekt,
  download,
  rechtstext,
  seo,
  bild,
  fliesstext,
  verweis,
  navigationspunkt,
  zeitfenster,
  seitenkopf,
  textblock,
  leistungsliste,
  teaserraster,
  bildtext,
  hinweis,
  zeitstrahl,
  linkliste,
  angebotseinbettung,
  downloadliste,
  handlungsaufforderung,
];

/** Dokumenttypen, von denen es genau eines gibt; ihre _id ist gleich dem Typnamen. */
export const einzeldokumente = ["websiteEinstellungen", "startseite", "teamseite", "referenzseite", "downloadseite", "kontaktseite", "externeAngebote"];
