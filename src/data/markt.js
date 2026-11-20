// src/data/markt.js
// Alles amtlich, von der Weihnachtsmarkt-Seite und der Pressemitteilung der Stadt
// (Stand 20.11.2026). Ein Konzertplan mit einzelnen Terminen war da nicht veröffentlicht.

export const marktzeiten = [
  { tag: 'Samstag, 28.11.', zeiten: '11.00 – 22.00' },
  { tag: 'Sonntag, 29.11. · 1. Advent', zeiten: '11.00 – 21.00' },
];

// Was die Stadt für 2026 bestätigt hat.
export const marktfakten = [
  {
    titel: 'Live-Musik, kostenlos',
    text: 'Freitags und samstags spielen regionale Musikgruppen auf dem Marktplatz oder vor der Franziskanerkirche. Wer am 28.11. auftritt, hat die Stadt nicht einzeln veröffentlicht.',
  },
  {
    titel: 'Winter-Plaza vor der Marktkirche',
    text: 'Neu: Gastronomie rund um ein großes Zelt mit transparentem Dach, rund 600 trockene Sitz- und Stehplätze. Direkt daneben die Eisbahn auf dem Jühenplatz.',
  },
  {
    titel: 'Weihnachtspyramide auf dem Marktplatz',
    text: 'Rund 20 Meter hoch, eine der größten begehbaren Pyramiden — auf den unteren beiden Ebenen gibt es Getränke.',
  },
  {
    titel: 'Riesenrad und Pferdekarussell',
    text: 'Beide stehen auf dem Marienplatz. Vom Riesenrad sieht man auf das Rathaus, das wieder als Adventskalender geschmückt ist.',
  },
  {
    titel: 'Kunsthandwerk schließt teils um 20 Uhr',
    text: 'Stände mit Kunsthandwerk und Deko sowie die Fahrgeschäfte dürfen schon um 20:00 zumachen. Geschenke also besser vor dem Abendessen kaufen.',
  },
  {
    titel: 'Verkaufsoffener Sonntag am 29.11.',
    text: 'Die Geschäfte in der Innenstadt haben von 13 bis 18 Uhr geöffnet — falls jemand die Rückfahrt noch aufschieben will.',
  },
];

// Toiletten und Notfall — aus dem Infoblatt der Stadt zum barrierearmen Besuch 2026.
export const toiletten = [
  'Kostenlos: Dom / Kaiserpfalz (Ecke Am Ikenberg), Westernmauer (Ecke Brückengasse), Neuhäuser Tor',
  'Nur während des Markts: neben dem Diözesanmuseum und vor der Marktkirche am Kamp',
  'Libori-Galerie: größere Anlage, kostenpflichtig',
];

export const notfall =
  'Es gibt keinen eigenen Sanitätsdienst. Im Notfall 112 wählen und die Standnummer des ' +
  'nächsten Verkaufsstands nennen — jeder Stand hat ein Schild mit Nummer.';

export const offizielleSeite = 'https://www.paderborn.de/microsite/weihnachtsmarkt/news/index.php';
export const pressemitteilung =
  'https://www.paderborn.de/pressearbeit/pressemitteilungen/2026/november/paderborner-weihnachtsmarkt-taucht-innenstadt-in-lichterglanz.php';
