// src/data/ablauf.js
// Ablauf Sa 28.11. / So 29.11.2026.
//
// `von`/`bis` sind Minuten seit Mitternacht — daraus rechnet die Zeitachse ihre
// Abstände. Ohne `von` bekommt ein Eintrag keine Marke, sondern normalen Abstand.
// art: "fix"   — feste Zeit, schwere Marke
//      "frei"  — offene Spanne, bewusst leer
//      "punkt" — Station ohne Terminzwang

const uhr = (h, m = 0) => h * 60 + m;

export const ablauf = [
  {
    tag: "sa",
    tagLabel: "Samstag, 28. November",
    kontext: "Markt geöffnet 11:00 – 22:00",
    hinweis:
      "Die festen Zeiten stehen, alles dazwischen gehört euch — die Lücken unten sind " +
      "so groß, wie sie sich anfühlen werden.",
    stationen: [
      {
        id: "sa-fruehstueck",
        von: uhr(8, 30),
        zeit: "08.30",
        art: "fix",
        name: "Gemeinsames Frühstück",
        ort: "Franzes, Arnsberg-Müschede",
        ortId: "franzes",
        notiz:
          "Unterwegs nach Paderborn, alle zusammen. Vom Franzes bis zum Hotel sind es " +
          "rund 90 km, gut eine Stunde Fahrt — für 11:00 also gegen 9:45 aufbrechen.",
      },
      {
        id: "sa-ankunft",
        von: uhr(11),
        zeit: "11.00",
        art: "fix",
        name: "Ankunft in Paderborn",
        ort: "Hotel zur Mühle",
        ortId: "hotel",
        notiz:
          "Gepäck kann ab Ankunft abgegeben werden. Wegen der Parkplätze meldet man sich " +
          "an der Rezeption — das Hotel weist die Plätze vor Ort zu.",
      },
      {
        id: "sa-frei-1",
        von: uhr(11),
        bis: uhr(15),
        zeit: "11.00",
        art: "frei",
        name: "Freier Bummel",
        notiz:
          "Kein gemeinsames Programm. Rund 80 Stände zwischen Westerntor und Dom — " +
          "man läuft von selbst durch alles durch.",
        vermerke: [
          "Mittags nur kleine Portionen an den Ständen, sonst fehlt um 17:30 der Hunger.",
          "Absprachen laufen über die WhatsApp-Gruppe.",
        ],
      },
      {
        id: "sa-checkin",
        von: uhr(15),
        zeit: "15.00",
        art: "fix",
        name: "Check-in",
        ort: "Hotel zur Mühle",
        ortId: "hotel",
        notiz:
          "Spätestens jetzt sind die Zimmer bezugsfertig. Früher klappt es nur, wenn sie am " +
          "Vortag nicht belegt waren — garantiert wären sie nur gegen 50 % Aufpreis gewesen.",
      },
      {
        id: "sa-frei-2",
        von: uhr(15),
        bis: uhr(17, 30),
        zeit: "15.00",
        art: "frei",
        name: "Weiter über den Markt",
        notiz: "Zweite Runde, wenn es dunkel wird. Ab hier lohnt der Domplatz am meisten.",
      },
      {
        id: "sa-essen",
        von: uhr(17, 30),
        zeit: "17.30",
        art: "fix",
        name: "Tisch im Brauhaus",
        ort: "Paderborner Brauhaus, Kisau 2",
        ortId: "brauhaus",
        notiz:
          "Tisch für 16 Personen. Vom Hotel rund 80 Meter — trotzdem rechtzeitig sammeln, " +
          "16 Leute brauchen immer länger als gedacht.",
      },
      {
        id: "sa-abend",
        von: uhr(19, 30),
        bis: uhr(22),
        zeit: "19.30",
        art: "punkt",
        name: "Nochmal auf den Markt",
        ort: "Domplatz",
        ortId: "domplatz",
        notiz: "Im Dunkeln ist der Markt am schönsten. Letzter Ausschank gegen 22:00.",
      },
      {
        id: "sa-schluss",
        von: uhr(22),
        zeit: "22.00",
        art: "punkt",
        name: "Markt schließt",
        notiz: "Danach ist der Abend nicht zwingend vorbei — siehe unten.",
      },
    ],
  },
  {
    tag: "so",
    tagLabel: "Sonntag, 29. November",
    kontext: "1. Advent",
    hinweis: "Kurzer Tag — Frühstück, dann Heimfahrt.",
    stationen: [
      {
        id: "so-fruehstueck",
        von: null,
        zeit: "morgens",
        art: "punkt",
        name: "Frühstück im Hotel",
        ort: "Hotel zur Mühle",
        ortId: "hotel",
        notiz:
          "Nicht im Zimmerpreis enthalten — das Frühstück wird bei der Anreise dazugebucht. " +
          "Zeiten am Vorabend an der Rezeption erfragen.",
      },
      {
        id: "so-rueckreise",
        von: null,
        zeit: "danach",
        art: "fix",
        name: "Rückreise",
        ort: "Hotel zur Mühle",
        ortId: "hotel",
        notiz:
          "Auschecken und heimfahren. Wer mag, läuft vorher noch einmal über den Markt — " +
          "der öffnet sonntags ebenfalls um 11:00.",
      },
    ],
  },
];
