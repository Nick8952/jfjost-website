import { h3, liste, link, p, fett } from "@/lib/inhalt/text";
import type { Rechtstext } from "@/lib/inhalt/typen";

/**
 * Impressum und Datenschutzerklärung DIESER DEMO.
 *
 * Die bisherige Website www.jfjost.ch hat ein leeres Impressum (nur die
 * Fusszeile) und keine Datenschutzerklärung; es gibt also nichts zu übernehmen.
 * Beide Texte beschreiben ausschliesslich die tatsächliche Technik dieser Demo
 * (GitHub Pages, Einbettungen nach Einwilligung, mailto, localStorage). Sanity
 * und Vercel sind nicht in Betrieb und werden nur als mögliche spätere Änderung
 * erwähnt. Die Texte sind Entwürfe ohne anwaltliche Prüfung; offene Punkte
 * stehen in docs/uebergabe.md.
 *
 * Betreiber der Demo ist Nick Holzbecher (Websites-Anbieter), nicht J.F. Jost & Co.
 */
const STAND = "21. September 2026";

export const rechtstexte: Rechtstext[] = [
  {
    art: "impressum",
    seo: { titel: "Impressum", beschreibung: "Impressum der Design-Demo für J.F. Jost & Co: Betreiber der Demo und Angaben zum dargestellten Unternehmen." },
    titel: "Impressum",
    stand: STAND,
    text: [
      h3("Betreiber dieser Demo-Website"),
      p("Diese Website ist eine unverbindliche Design-Demo und nicht die offizielle Website von J.F. Jost & Co. Sie wurde erstellt, um dem Unternehmen einen möglichen neuen Internetauftritt vorzuführen."),
      p(fett("Nick Holzbecher"), " – Gestaltung und Entwicklung von Websites"),
      p("E-Mail: ", link("holzbechernick@gmail.com", "mailto:holzbechernick@gmail.com")),
      p("Postanschrift: wird vor der Übergabe an den Kunden ergänzt."),
      h3("Dargestelltes Unternehmen"),
      p(fett("J.F. Jost & Co KmG"), " (Kurzform: J.F. Jost & Co)"),
      p("Steinwiesenstrasse 3, 8952 Schlieren, Schweiz"),
      p("Telefon ", link("044 755 53 53", "tel:+41447555353"), " · E-Mail ", link("info@jfjost.ch", "mailto:info@jfjost.ch")),
      p("UID: CHE-105.786.236 (Handelsregister des Kantons Zürich, Sitz Schlieren; Abfrage über Zefix am ", STAND, ")."),
      p("Zweck laut Handelsregister: Führung eines Baugeschäftes, die Verwaltung, Kauf und Verkauf von Liegenschaften."),
      p("Die Inhalte dieser Demo (Texte, Fotos, Logo, Dokumente) stammen von der öffentlichen Website www.jfjost.ch, Stand ", STAND, ". Die Rechte daran liegen bei J.F. Jost & Co bzw. den jeweiligen Urheberinnen und Urhebern. Sie werden hier ausschliesslich zur Vorführung gegenüber dem Unternehmen verwendet."),
      h3("Haftung"),
      p("Die Angaben auf dieser Demo wurden mit Sorgfalt von der bisherigen Website übernommen, können aber veraltet oder unvollständig sein. Massgebend sind die Angaben von J.F. Jost & Co selbst. Für Inhalte externer Websites, auf die verlinkt wird, sind deren Betreiber verantwortlich."),
      p("Miet- und Kaufangebote werden von homegate.ch geladen bzw. verlinkt; Angebote, Preise und Verfügbarkeiten stammen ausschliesslich von dort."),
    ],
  },
  {
    art: "datenschutz",
    seo: { titel: "Datenschutzerklärung", beschreibung: "Datenschutzerklärung der Design-Demo für J.F. Jost & Co: Hosting auf GitHub Pages, Einbettungen von homegate.ch und Google Maps nach Einwilligung, Kontakt per E-Mail." },
    titel: "Datenschutzerklärung",
    stand: STAND,
    text: [
      p("Diese Erklärung beschreibt, welche Personendaten beim Besuch dieser Demo-Website bearbeitet werden. Sie gilt für die Demo unter nick8952.github.io/jfjost-website und nicht für die bisherige Website www.jfjost.ch. Grundlage sind das Schweizer Datenschutzgesetz (DSG) und, soweit anwendbar, die Datenschutz-Grundverordnung der EU (DSGVO)."),
      h3("1. Verantwortliche Stelle"),
      p("Verantwortlich für diese Demo ist Nick Holzbecher, ", link("holzbechernick@gmail.com", "mailto:holzbechernick@gmail.com"), ". Anfragen zu Ihren Daten richten Sie bitte an diese Adresse. J.F. Jost & Co betreibt diese Demo nicht und erhält von ihr keine Besucherdaten."),
      h3("2. Hosting auf GitHub Pages"),
      p("Die Website wird als statische Seiten über GitHub Pages ausgeliefert, einen Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Abruf übermittelt Ihr Browser technisch bedingt Ihre IP-Adresse, die aufgerufene Adresse, Datum und Uhrzeit sowie Browser- und Betriebssysteminformationen an GitHub. GitHub kann diese Angaben in Server-Logs speichern, um den Dienst sicher zu betreiben. Details, Aufbewahrung und Rechtsgrundlagen beschreibt GitHub in seiner ", link("Datenschutzerklärung", "https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement"), "; Hinweise zu GitHub Pages stehen in der ", link("GitHub-Dokumentation", "https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection"), ". Der Betreiber dieser Demo hat auf diese Logs keinen Zugriff und wertet sie nicht aus."),
      h3("3. Keine eigenen Cookies, keine Analyse"),
      p("Diese Website setzt selbst keine Cookies und verwendet keine Analyse- oder Werbedienste. Es gibt keinen Server dieser Demo, der Eingaben entgegennimmt oder speichert."),
      h3("4. Speicherung im Browser (Einwilligungen)"),
      p("Ihre Entscheidung zu den externen Inhalten (Abschnitt 5) wird im lokalen Speicher Ihres Browsers (localStorage) unter dem Schlüssel «jfjost-einwilligung» abgelegt: die gewählten Kategorien, der Zeitpunkt und die Version dieser Einwilligung. Diese Angaben bleiben in Ihrem Browser und werden nirgendwohin übermittelt. Sie können sie jederzeit unter ", link("Cookie-Einstellungen", "/datenschutz-einstellungen/"), " ändern oder über die Browser-Einstellungen löschen."),
      h3("5. Externe Inhalte nach Einwilligung"),
      p("Zwei Funktionen laden Inhalte von Drittanbietern. Sie werden erst aktiviert, wenn Sie zustimmen – entweder über den Hinweis beim ersten Besuch, über den Platzhalter an der jeweiligen Stelle oder unter Cookie-Einstellungen. Ohne Zustimmung werden keine Daten an diese Anbieter übermittelt; stattdessen sehen Sie einen normalen Link zum Anbieter."),
      h3("5a. Immobilienangebote von homegate.ch"),
      p("Auf den Seiten «Mieten» und «Kaufen» kann die Liste der aktuellen Angebote von J.F. Jost & Co als eingebettete Ansicht (iframe) von homegate.ch geladen werden. homegate.ch ist ein Angebot der SMG Swiss Marketplace Group AG, Zürich. Beim Laden übermittelt Ihr Browser Ihre IP-Adresse und Browserangaben an homegate.ch sowie an die von homegate.ch eingesetzten Dienste; bei einer Prüfung am ", STAND, " waren das unter anderem Cloudflare (Auslieferung, Bot-Schutz), DataDome (Bot-Schutz), Google Tag Manager und Google Fonts. Dabei werden Cookies dieser Anbieter gesetzt (bei der Prüfung: __cf_bm, _cfuvid, cf_clearance, datadome). Welche Daten homegate.ch zu welchem Zweck bearbeitet, beschreibt die ", link("Datenschutzerklärung der SMG Swiss Marketplace Group", "https://privacy.swissmarketplace.group/de/"), ". Wenn Sie die Einbettung nicht wünschen, nutzen Sie den Link «Direkt auf homegate.ch öffnen»: Dann verlassen Sie diese Website, und es gelten allein die Bedingungen von homegate.ch."),
      h3("5b. Karte von Google Maps"),
      p("Auf der Kontaktseite kann eine Karte mit dem Standort Steinwiesenstrasse 3, Schlieren von Google Maps geladen werden (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Beim Laden werden Ihre IP-Adresse und Browserangaben an Google übermittelt; Google kann Cookies setzen und Daten in die USA übertragen. Informationen dazu finden Sie in der ", link("Datenschutzerklärung von Google", "https://policies.google.com/privacy?hl=de"), ". Ohne Zustimmung steht Ihnen ein Link zur Route in Google Maps zur Verfügung, der Sie auf die Website von Google führt."),
      h3("6. Widerruf"),
      p("Eine erteilte Zustimmung können Sie jederzeit unter ", link("Cookie-Einstellungen", "/datenschutz-einstellungen/"), " widerrufen. Danach werden die eingebetteten Inhalte nicht mehr geladen und aus der Seite entfernt. Cookies, die homegate.ch oder Google bereits in Ihrem Browser gesetzt haben, kann diese Website technisch nicht löschen; das ist über die Cookie-Einstellungen Ihres Browsers möglich."),
      h3("7. Kontakt per E-Mail"),
      p("Das Kontaktformular sendet nichts an diese Website. Der Knopf «E-Mail vorbereiten» öffnet Ihr eigenes E-Mail-Programm mit einer vorbereiteten Nachricht an info@jfjost.ch; Sie entscheiden, ob und mit welchem Inhalt Sie sie senden. Ebenso öffnen die Telefon- und E-Mail-Verweise nur die entsprechenden Programme auf Ihrem Gerät. Für die Bearbeitung von Anfragen, die bei J.F. Jost & Co eingehen, ist J.F. Jost & Co verantwortlich."),
      h3("8. Links zu anderen Websites"),
      p("Diese Website enthält Links zu externen Websites (etwa auf der Seite «Links» und zu den Datenschutzerklärungen der genannten Anbieter). Beim Anklicken verlassen Sie diese Website; für die Datenbearbeitung dort sind die jeweiligen Betreiber verantwortlich."),
      h3("9. Ihre Rechte"),
      p("Sie haben im Rahmen des DSG – und, soweit die DSGVO anwendbar ist, nach deren Art. 15 bis 21 – das Recht auf Auskunft über Ihre Personendaten, auf Berichtigung, Löschung, Herausgabe bzw. Übertragung sowie auf Widerspruch gegen die Bearbeitung. Da diese Demo ausser der in Abschnitt 4 beschriebenen Speicherung in Ihrem eigenen Browser keine Personendaten erhebt, betreffen solche Anfragen praktisch nur E-Mails, die Sie dem Betreiber schreiben. Richten Sie sie an ", link("holzbechernick@gmail.com", "mailto:holzbechernick@gmail.com"), ". Sie können sich zudem an den ", link("Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)", "https://www.edoeb.admin.ch/"), " oder, im Anwendungsbereich der DSGVO, an die für Sie zuständige Aufsichtsbehörde wenden."),
      h3("10. Mögliche spätere Änderungen"),
      p("Wenn diese Website als offizieller Auftritt von J.F. Jost & Co weitergeführt wird, ändern sich Betreiber und Technik: Vorgesehen sind dann das Hosting bei Vercel Inc. und die Pflege der Inhalte über das Content-Management-System Sanity. Beide Dienste sind in dieser Demo nicht im Einsatz. Diese Erklärung wird vor einer solchen Umstellung neu gefasst."),
      h3("11. Änderungen dieser Erklärung"),
      p("Diese Erklärung kann angepasst werden, wenn sich die Technik der Website ändert. Es gilt die jeweils hier veröffentlichte Fassung."),
      ...liste([fett("Stand: "), STAND]),
    ],
  },
];
