import { bild } from "@/lib/inhalt/bild";
import { h3, liste, link, p, fett } from "@/lib/inhalt/text";
import type { Seite } from "@/lib/inhalt/typen";

/**
 * Baustein-Seiten. Quelle je Seite ist die gleichnamige Unterseite von
 * www.jfjost.ch (Stand 21.09.2026), siehe docs/inhaltsinventur.md. Texte sind
 * sprachlich geglättet, Aussagen unverändert. Angaben, die auf der bisherigen
 * Website fehlen (z. B. offene Stellen), werden hier nicht ergänzt.
 */
export const seiten: Seite[] = [
  /* ------------------------------------------------------------------ Mieten */
  {
    slug: "mieten",
    seo: {
      titel: "Mieten – Wohnungen und Geschäftsflächen",
      beschreibung: "Wohn- und Geschäftsflächen zur Miete von J.F. Jost & Co, Schlieren. Aktuelle Mietangebote auf homegate.ch, Beratung durch unsere Immobilienbewirtschaftung.",
    },
    kopf: {
      kicker: "Immobilien",
      titel: "Mieten",
      einleitung:
        "J.F. Jost & Co bietet Wohn- und Geschäftsflächen zur Miete – für jeden Bedarf. Wir beraten Sie gerne bei der Suche nach Ihrem Objekt und stehen Ihnen mit Rat und Tat zur Seite.",
    },
    bausteine: [
      { _type: "angebotseinbettung", _key: "mieten-angebote", art: "mieten" },
      {
        _type: "textblock",
        _key: "mieten-beratung",
        kicker: "Beratung",
        titel: "Damit Sie sich rundum wohlfühlen",
        text: [
          p("Der grosse Erfahrungsschatz und das Know-how unserer Mitarbeitenden bilden die Basis für eine kompetente Beratung – damit Sie sich in den neuen vier Wänden oder Büroräumlichkeiten rundum zufrieden fühlen."),
          p("Kontaktieren Sie uns unverbindlich, wenn Sie ein ganz bestimmtes Objekt suchen. Ihre Ansprechpersonen finden Sie in der ", link("Immobilienbewirtschaftung", "/team/"), "."),
        ],
      },
      {
        _type: "hinweis",
        _key: "mieten-anmeldung",
        titel: "So melden Sie sich für ein Objekt an",
        text: [
          p("Für eine Bewerbung verwenden Sie das ", fett("Anmeldeformular Wohnung"), " oder das ", fett("Anmeldeformular Gewerbe"), " (PDF). Welche Beilagen nötig sind – zum Beispiel eine aktuelle Betreibungsauskunft – steht auf dem Formular. Persönliche Unterlagen werden nicht über diese Website übermittelt."),
        ],
        art: "wichtig",
      },
      { _type: "downloadliste", _key: "mieten-formulare", kicker: "Formulare", titel: "Anmeldeformulare", kategorie: "formular" },
      {
        _type: "handlungsaufforderung",
        _key: "mieten-kontakt",
        titel: "Sie suchen etwas Bestimmtes?",
        text: "Beschreiben Sie uns, was Sie suchen. Wir melden uns bei Ihnen.",
        aktionen: [
          { text: "Kontakt aufnehmen", ziel: "/kontakt/?anliegen=Mieten" },
          { text: "Merkblätter für Mieter", ziel: "/formulare/" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ Kaufen */
  {
    slug: "kaufen",
    seo: {
      titel: "Kaufen / Verkaufen – Liegenschaften",
      beschreibung: "Erwerb und Verkauf von Liegenschaften mit J.F. Jost & Co, Schlieren: Beratung, Realisierung und Bewirtschaftung aus einer Hand. Kaufangebote auf homegate.ch.",
    },
    kopf: {
      kicker: "Immobilien",
      titel: "Kaufen / Verkaufen",
      einleitung:
        "J.F. Jost & Co blickt auf über 90 Jahre Erfahrung in der Immobilienbranche zurück und bietet Ihnen beim Erwerb oder Verkauf von Liegenschaften jeder Art eine umfassende Beratung und einen überzeugenden Service.",
    },
    bausteine: [
      { _type: "angebotseinbettung", _key: "kaufen-angebote", art: "kaufen" },
      {
        _type: "textblock",
        _key: "kaufen-service",
        kicker: "Full-Service",
        titel: "Alle Kompetenzen unter einem Dach",
        breite: "breit",
        text: [
          p("Als Full-Service-Anbieter vereinen wir alle Kompetenzen, um in einem immer komplexer werdenden Markt erfolgreich zu bestehen und Ihren Wünschen rundum gerecht zu werden. Zusammen mit unserer Bauabteilung und einem langjährigen Partnernetzwerk garantieren wir erstklassigen Service in allen Fragen rund um Ihre Immobilie oder den Erwerb eines neuen Objekts."),
          p("Wir entwickeln Projekte für Sie, realisieren sie und bewirtschaften die Objekte erfolgreich, um eine optimale Rendite zu erwirtschaften. Unser Beratungs- und Dienstleistungsangebot deckt den gesamten Lebenszyklus von Immobilien ab."),
        ],
      },
      {
        _type: "leistungsliste",
        _key: "kaufen-lebenszyklus",
        kicker: "Lebenszyklus",
        titel: "Von der Idee bis zur Bewirtschaftung",
        leistungen: [
          { nummer: "01", titel: "Entwickeln", text: [p("Projektentwicklung für Wohn- und Geschäftsliegenschaften im Grossraum Zürich.")] },
          { nummer: "02", titel: "Realisieren", text: [p("Umsetzung mit der eigenen Bauabteilung und langjährigen Partnern.")] },
          { nummer: "03", titel: "Bewirtschaften", text: [p("Verwaltung und Bewirtschaftung der Objekte durch unser Team in Schlieren.")] },
        ],
      },
      {
        _type: "handlungsaufforderung",
        _key: "kaufen-kontakt",
        titel: "Kaufen oder verkaufen?",
        text: "Sprechen Sie mit uns über Ihr Objekt oder Ihre Suche – unverbindlich.",
        aktionen: [{ text: "Kontakt aufnehmen", ziel: "/kontakt/?anliegen=Kaufen" }],
      },
    ],
  },

  /* --------------------------------------------------------------- Formulare */
  {
    slug: "formulare",
    seo: {
      titel: "Formulare & Downloads",
      beschreibung: "Anmeldeformulare für Wohnungen und Geschäftsräume sowie Merkblätter für Mieterinnen und Mieter von J.F. Jost & Co als PDF.",
    },
    kopf: {
      kicker: "Immobilien",
      titel: "Formulare & Downloads",
      einleitung:
        "Anmeldeformulare für Wohn- und Geschäftsräume sowie Merkblätter für Mieterinnen und Mieter. Alle Dokumente sind PDF-Dateien zum Ausdrucken und handschriftlichen Ausfüllen.",
    },
    bausteine: [
      { _type: "downloadliste", _key: "formulare-anmeldung", kicker: "Anmeldung", titel: "Anmeldeformulare", kategorie: "formular" },
      { _type: "downloadliste", _key: "formulare-merkblaetter", kicker: "Für Mieterinnen und Mieter", titel: "Merkblätter", kategorie: "merkblatt" },
      {
        _type: "hinweis",
        _key: "formulare-hinweis",
        titel: "Hinweis zu den Dateien",
        text: [p("Die PDF-Dateien öffnen sich im Browser oder in einem PDF-Programm. Ausgefüllte Anmeldeformulare senden Sie uns bitte per Post oder bringen sie persönlich vorbei; Adresse und Öffnungszeiten finden Sie unter ", link("Kontakt", "/kontakt/"), ".")],
        art: "info",
      },
    ],
  },

  /* ------------------------------------------------------------ Renovationen */
  {
    slug: "renovationen",
    seo: {
      titel: "Renovationen und Umbauarbeiten",
      beschreibung: "Die Bauabteilung von J.F. Jost & Co plant und führt Renovationen, Umbauten, Fassaden- und Betonsanierungen, Bauleitungen sowie Abdichtungen aus.",
    },
    kopf: {
      kicker: "Bau",
      titel: "Renovationen und Umbauarbeiten",
      einleitung:
        "Unsere Bauabteilung ist auf die Planung und Durchführung von grossen und kleinen Renovationen und Umbauten spezialisiert und garantiert eine erstklassige Abwicklung Ihres Projekts.",
      bild: bild("team-bauteam", "Das Bauteam von J.F. Jost & Co vor dem Werkhof mit dem Firmenfahrzeug"),
    },
    bausteine: [
      {
        _type: "textblock",
        _key: "renovationen-einleitung",
        breite: "breit",
        text: [
          p("Unser initiatives und flexibles Team sorgt mit Erfahrung und Kompetenz dafür, dass Sie sich auf eine termingerechte und hochstehende Umsetzung Ihres Projekts verlassen können."),
          p("Wir verfügen über ausgewiesene, langjährige Erfahrung im Um- und Ausbau von Wohn- und Geschäftsliegenschaften aller Art und Grösse. Vor Projektbeginn setzen wir auf eine gründliche Vorabklärung, um alle Eventualitäten zu berücksichtigen. So stellen wir sicher, dass wir Ihr Projekt im vorgegebenen Budget- und Zeitrahmen zu Ihrer vollen Zufriedenheit umsetzen."),
        ],
      },
      {
        _type: "leistungsliste",
        _key: "renovationen-leistungen",
        kicker: "Leistungen",
        titel: "Was unsere Bauabteilung ausführt",
        leistungen: [
          {
            nummer: "01",
            titel: "Renovationen und Umbauten",
            text: [p("Von der Badezimmer-Renovation bis zur Gesamtsanierung einer Liegenschaft: Planung und Ausführung aus einer Hand.")],
          },
          {
            nummer: "02",
            titel: "Fassadensanierungen",
            text: [
              p("Fassaden sind täglich Witterung und Verschmutzung ausgesetzt, etwa durch Abgase von Fahrzeugen. Darunter leidet die Fassadenoberfläche optisch wie physisch."),
              p("Unsere Bauabteilung bringt Ihre Liegenschaften und Gebäude wieder auf Vordermann und garantiert als erfahrener Spezialist hochstehende Fassadensanierungen, die Ihr Objekt in einen echten Hingucker verwandeln. Ihr Objekt gewinnt nicht nur optisch, sondern erfährt auch eine echte, nachhaltige Wertsteigerung."),
            ],
          },
          {
            nummer: "03",
            titel: "Bauleitungen",
            text: [
              p("Unsere Bauleiter übernehmen die gesamte Abwicklung Ihres Bauprojekts und sorgen für eine reibungslose, sorgfältige Umsetzung. Qualität, Termintreue und Kostenbewusstsein prägen unser Handeln. Für Sie heisst das: erstklassige Arbeiten und ein professionelles Team, das Sie Schritt für Schritt begleitet."),
              p("Wir beraten und entlasten die Bauherrschaft nachhaltig und kümmern uns um alles Nötige bei der Realisation Ihres Bauvorhabens."),
            ],
          },
          {
            nummer: "04",
            titel: "Instandsetzungen: Betonsanierungen",
            text: [
              p("Im Rahmen von Spezialarbeiten führen wir zuverlässig und kompetent Betonsanierungen durch. Wir stellen Schäden wieder her, die durch Umwelteinflüsse und den natürlichen Alterungsprozess entstanden sind, und geben Ihrem Objekt sein ursprüngliches Aussehen zurück."),
              p("In mehreren Schritten ermitteln unsere Profis schadhafte Stellen und korrodierte Armierungseisen, legen sie frei, reinigen und reprofilieren sie. Die professionelle Sanierung trägt wesentlich zur Werterhaltung und Sicherheit Ihres Objekts bei."),
            ],
          },
          {
            nummer: "05",
            titel: "Instandsetzungen: Abdichtungen und Beschichtungen",
            text: [
              p("Undichte Flächen im Aussenbereich kennt jeder. Die sichere Abdichtung von Bauwerken gegen Feuchtigkeit und Wasser ist eine der elementaren Herausforderungen der Architektur – Flüssigkunststoffe lösen diese Aufgabe zuverlässig."),
              p("Balkone, Dachterrassen und Laubengänge sind ständig witterungsbedingten Belastungen ausgesetzt und müssen besonders verschleissfest und widerstandsfähig sein. Flüssigkunststoff-Systeme kommen im Neubau und in der Sanierung zum Einsatz und erfüllen diese Anforderungen. Unsere fachgerechte Ausführung garantiert Wasserdichtigkeit über Jahre hinaus."),
            ],
          },
        ],
      },
      {
        _type: "bildtext",
        _key: "renovationen-naturofloor",
        kicker: "Material",
        titel: "Zertifizierte Fachhandwerker für Naturofloor",
        text: [
          p("Naturofloor besteht zu 90 % aus natürlichen Produkten und wird für fugenlose Wand- und Bodenbeläge verwendet – auch im Nassbereich. Verschiedene Musterplatten sind bei uns ausgestellt."),
          p(link("Referenzprojekte mit Naturofloor ansehen", "/referenzen/")),
        ],
        bild: bild("ref-32-052", "Wohnzimmer Welbrigring 3, Geroldswil, nach der Sanierung mit Naturofloor-Belag"),
        bildSeite: "links",
      },
      {
        _type: "handlungsaufforderung",
        _key: "renovationen-kontakt",
        titel: "Ein Bauvorhaben?",
        text: "Schildern Sie uns Ihr Projekt. Wir klären die Details gründlich ab und unterbreiten Ihnen ein Angebot.",
        aktionen: [
          { text: "Referenzen ansehen", ziel: "/referenzen/" },
          { text: "Kontakt aufnehmen", ziel: "/kontakt/?anliegen=Baudienstleistungen" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------- Unternehmen */
  {
    slug: "unternehmen",
    seo: {
      titel: "Unternehmen – Familienunternehmen seit 1929",
      beschreibung: "Die Geschichte von J.F. Jost & Co: 1929 in Schlieren als Baugeschäft gegründet, heute in dritter Generation für Immobilien und Bau im Grossraum Zürich tätig.",
    },
    kopf: {
      kicker: "Über uns",
      titel: "Unternehmen",
      einleitung:
        "J.F. Jost & Co ist ein Familienunternehmen in Schlieren bei Zürich, das in der dritten Generation geführt wird und auf eine traditionsreiche Geschichte zurückblicken darf.",
    },
    bausteine: [
      {
        _type: "zeitstrahl",
        _key: "unternehmen-zeitstrahl",
        kicker: "Geschichte",
        titel: "Von 1929 bis heute",
        punkte: [
          {
            jahr: "1929",
            titel: "Gründung",
            text: "Johann Friedrich «Fritz» Jost gründet sein eigenes Baugeschäft, damals die «J.F. Jost Hoch- und Tiefbau». Schlieren und das Zürcher Limmattal sind für die Entwicklung des Unternehmens von Anfang an von zentraler Bedeutung: Fritz Jost erkennt früh das Potenzial der Region als eine der – noch heute – wirtschaftlichen Schlagadern der Schweiz.",
          },
          {
            jahr: "Nach 1945",
            titel: "Aufbau",
            text: "Nach schwierigen Anfangsjahren ermöglicht der wirtschaftliche Aufschwung nach dem Zweiten Weltkrieg einen kontinuierlichen, nachhaltigen Aufbau. In der Firma und auf dem Bau wird Fritz Jost tatkräftig von seiner Gattin Klara unterstützt. Als diese unerwartet früh stirbt, übernimmt die einzige Tochter Margrith mit knapp 20 Jahren den Platz ihrer Mutter als wichtigste Stütze im Familienunternehmen.",
          },
          {
            jahr: "1970er",
            titel: "Zweite Generation",
            text: "Margrith lernt ihren zukünftigen Ehemann Edwin «Edi» Hagen kennen, der das Unternehmen an der Seite seiner Frau und seines Schwiegervaters grundlegend prägt und es nach dem Ableben von Fritz Jost in den Siebzigern erfolgreich und vorausschauend weiterführt.",
          },
          {
            jahr: "2000",
            titel: "Dritte Generation",
            text: "Die drei Töchter Liliane Hagen, Caroline Landolt und Susanne Porchet-Hagen übernehmen zusammen mit Edi und Margrith Hagen die strategische Leitung. Alexandre Porchet wird Geschäftsführer und Delegierter des Verwaltungsrates. 2004 stirbt Edi Hagen unerwartet.",
          },
          {
            jahr: "2020",
            titel: "Neue Geschäftsführung",
            text: "Alexandre Porchet verlässt das Unternehmen nach 20 Jahren; Diego Albertanti übernimmt per Juli 2020 die Geschäftsführung.",
          },
          {
            jahr: "2024",
            titel: "95 Jahre",
            text: "Am 20. Juni 2024 feiert die Firma Jost ihr 95-jähriges Jubiläum mit vielen geladenen Gästen. Geehrt wird insbesondere Patronne Margrith Hagen-Jost für ihr beeindruckendes Lebenswerk; ihre Ansprache berührt durch die Verbindung von Menschlichkeit und weiblichem Unternehmertum viele Herzen. Kurz danach, am 2. Juli 2024, stirbt Margrith Hagen-Jost im Alter von 93 Jahren.",
          },
          {
            jahr: "Heute",
            titel: "Eigentümerinnen",
            text: "Ihre drei Töchter Liliane Hagen, Caroline Landolt und Susanne Porchet-Hagen sind heute die Eigentümerinnen der Firma Jost.",
          },
        ],
      },
      {
        _type: "textblock",
        _key: "unternehmen-heute",
        kicker: "Heute",
        titel: "Der ganze Lebenszyklus einer Liegenschaft",
        breite: "breit",
        text: [
          p("Heute begleitet das Unternehmen im Grossraum Zürich erfolgreich den gesamten Lebenszyklus von Geschäfts- und Wohnliegenschaften: von der Entwicklung über die Realisierung bis zur Bewirtschaftung, von der Badezimmer-Renovation bis zur Gesamtsanierung einer Liegenschaft."),
          p("Durch flache Hierarchie, eine moderne Unternehmensstruktur und kurze Entscheidungswege kann das Unternehmen sehr flexibel und kurzfristig auf veränderte Umstände reagieren und Chancen am Markt wahrnehmen."),
        ],
      },
      {
        _type: "textblock",
        _key: "unternehmen-mitgliedschaften",
        kicker: "Verbände",
        titel: "Mitgliedschaften",
        text: [
          p("J.F. Jost & Co ist Mitglied des Baumeister-Verbandes Zürich, der Standortförderung Limmattal und diverser Verbände wie der Wirtschaftskammer Schlieren, dem Gewerbeverein Schlieren, der Interessengemeinschaft Rietbach sowie der Interessengemeinschaft für Bauschäden Prävention IGBP."),
        ],
      },
      {
        _type: "teaserraster",
        _key: "unternehmen-weiter",
        kicker: "Weiter",
        titel: "Mehr über uns",
        teaser: [
          { titel: "Team", text: "Ansprechpersonen nach Abteilung, mit Direktwahl.", ziel: "/team/", aktion: "Team kennenlernen" },
          { titel: "Engagement", text: "Lehrstellen, Vereine und regionale Verbundenheit.", ziel: "/engagement/", aktion: "Engagement ansehen" },
          { titel: "Jobs", text: "Stellen und Lehrstellen bei J.F. Jost & Co.", ziel: "/jobs/", aktion: "Zu den Jobs" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------- Jobs */
  {
    slug: "jobs",
    seo: {
      titel: "Jobs und Lehrstellen",
      beschreibung: "Arbeiten bei J.F. Jost & Co in Schlieren: Stellen und Lehrstellen in Bau, Immobilien und Verwaltung.",
    },
    kopf: {
      kicker: "Über uns",
      titel: "Jobs",
      einleitung: "Zurzeit sind keine offenen Stellen ausgeschrieben (Stand 21. September 2026).",
    },
    bausteine: [
      {
        _type: "textblock",
        _key: "jobs-lehrstellen",
        kicker: "Ausbildung",
        titel: "Lehrstellen",
        text: [
          p("Wir unterstützen den Wirtschaftsstandort Schlieren/Limmattal und nehmen unsere soziale Verantwortung auch durch die Schaffung von Lehrstellen wahr. Wir bieten jährlich mehrere Lehrstellen in diversen Berufskategorien an."),
        ],
      },
      {
        _type: "hinweis",
        _key: "jobs-kontakt",
        titel: "Interesse an einer Stelle oder Lehrstelle?",
        text: [p("Melden Sie sich über das Kontaktformular mit dem Anliegen «Jobs» oder telefonisch unter 044 755 53 53. Bewerbungsunterlagen werden nicht über diese Website übermittelt.")],
        art: "wichtig",
      },
      {
        _type: "handlungsaufforderung",
        _key: "jobs-cta",
        titel: "Kontakt zum Thema Jobs",
        aktionen: [{ text: "Kontakt aufnehmen", ziel: "/kontakt/?anliegen=Jobs" }],
      },
    ],
  },

  /* -------------------------------------------------------------- Engagement */
  {
    slug: "engagement",
    seo: {
      titel: "Engagement",
      beschreibung: "Engagement von J.F. Jost & Co: Lehrstellen, FC Schlieren und regionale Vereine, humanitäre Projekte, Gutschein-Spende des Lilie Shoppingpoint für Flüchtlinge.",
    },
    kopf: {
      kicker: "Über uns",
      titel: "Engagement",
      einleitung:
        "Als verantwortungsvolles und zukunftsorientiertes Unternehmen mit hoher Sozialkompetenz setzen wir auf ein langfristiges, vertrauensvolles Verhältnis zu Mitarbeitenden, Partnern, Mietern und Kunden.",
    },
    bausteine: [
      {
        _type: "bildtext",
        _key: "engagement-lilie",
        kicker: "Aktuell",
        titel: "Lilie Shoppingpoint spendet Gutscheine über 10'000 Franken für ukrainische Flüchtlinge",
        text: [
          p("Die Firma J.F. Jost & Co, Inhaberin des Lilie Shoppingpoint in Schlieren, spendet Gutscheine im Wert von 10'000 Franken für Familien und Kinder, die wegen des Krieges in der Ukraine in die Schweiz geflüchtet sind und jetzt in der Stadt Schlieren vorübergehend Schutz und Unterbringung erhalten haben."),
        ],
        bild: bild("engagement-ukrainespende", "Gruppenfoto bei der Gutscheinübergabe im Lilie Shoppingpoint Schlieren"),
        bildSeite: "rechts",
      },
      {
        _type: "textblock",
        _key: "engagement-region",
        kicker: "Region",
        titel: "Verbunden mit Schlieren und dem Limmattal",
        breite: "breit",
        text: [
          p("Wir unterstützen den Wirtschaftsstandort Schlieren/Limmattal und nehmen unsere soziale Verantwortung auch durch die Schaffung von Lehrstellen wahr. Wir bieten jährlich mehrere Lehrstellen in diversen Berufskategorien an."),
          p("Auch unsere gesellschaftliche Verantwortung nehmen wir als Unternehmen wahr und leben sie in unserer Tätigkeit. J.F. Jost & Co unterstützt deshalb verschiedene Vereine im Limmattal. Unter dem Motto «Mit Schweiss, Fleiss und Fairness zum Erfolg» unterstützen wir den Fussballverein FC Schlieren, weil …"),
          ...liste(
            "… uns die Verbundenheit zu regionalen Einrichtungen wichtig ist,",
            "… uns die gemeinsame Philosophie verbindet, mit einfachen Mitteln beste Qualität zu liefern,",
            "… uns das Bestreben verbindet, alles dafür zu tun, um «in der ersten Liga zu spielen»,",
            "… uns die Jugendförderung am Herzen liegt, damit eine erfolgreiche Zukunft gesichert ist und wir die Integration junger Menschen fördern."
          ),
          p("Das Unternehmen unterstützt aber auch humanitäre sowie Tierschutzprojekte."),
          h3("Mitgliedschaften"),
          p("J.F. Jost & Co ist Mitglied des Baumeister-Verbandes Zürich, der Standortförderung Limmattal und diverser Verbände wie der Wirtschaftskammer Schlieren, dem Gewerbeverein Schlieren, der Interessengemeinschaft Rietbach sowie der Interessengemeinschaft für Bauschäden Prävention IGBP."),
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------- Links */
  {
    slug: "links",
    seo: {
      titel: "Links",
      beschreibung: "Links aus dem Umfeld von J.F. Jost & Co: Lilie Schlieren, Businesspark 8810 und 8952, Gewerbeverein, Wirtschaftskammer und Stadt Schlieren.",
    },
    kopf: {
      kicker: "Über uns",
      titel: "Links",
      einleitung: "Liegenschaften, Partner und Institutionen aus unserem Umfeld. Die Links führen auf externe Websites, für deren Inhalte die jeweiligen Betreiber verantwortlich sind.",
    },
    bausteine: [
      {
        _type: "linkliste",
        _key: "links-liste",
        links: [
          { text: "Einkaufszentrum Lilie, Schlieren", url: "https://lilie-schlieren.ch/" },
          { text: "Einsiedlerstrasse 533+535, Horgen (Businesspark 8810)", url: "https://businesspark8810.ch/", hinweis: "Am 21. September 2026 nicht erreichbar" },
          { text: "Gewerbeverein Schlieren", url: "http://www.gvschlieren.ch/", hinweis: "Am 21. September 2026 nicht erreichbar" },
          { text: "Interessengemeinschaft Rietbach", url: "https://www.igrietbach.ch/" },
          { text: "Parkside Schlieren", url: "https://www.parkside-schlieren.ch/" },
          { text: "Stadt Schlieren", url: "https://www.schlieren.ch/" },
          { text: "Wiesenstrasse 33, Schlieren (Businesspark 8952)", url: "https://businesspark8952.ch/", hinweis: "Am 21. September 2026 nicht erreichbar" },
          { text: "Wirtschaftskammer Schlieren", url: "https://wkschlieren.ch/" },
        ],
      },
    ],
  },
];
