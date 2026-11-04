// src/data/markt.js
// Öffnungszeiten am Reisewochenende — amtlich, von der Weihnachtsmarkt-Seite der Stadt
// (Stand 04.11.2026). Das Bühnenprogramm 2026 war da noch nicht veröffentlicht.

export const marktzeiten = [
  { tag: 'Samstag, 28.11.', zeiten: '11.00 – 22.00' },
  { tag: 'Sonntag, 29.11. · 1. Advent', zeiten: '11.00 – 21.00' },
];

// Was die Stadt für 2026 bereits bestätigt hat.
export const marktfakten = [
  {
    titel: 'Kunsthandwerk schließt teils um 20 Uhr',
    text: 'Stände mit Kunsthandwerk und Deko sowie die Fahrgeschäfte dürfen schon um 20:00 zumachen. Geschenke also besser vor dem Abendessen kaufen.',
  },
  {
    titel: 'Weihnachtspyramide auf dem Marktplatz',
    text: 'Rund 20 Meter hoch, eine der größten begehbaren Pyramiden — die unteren beiden Ebenen kann man betreten.',
  },
  {
    titel: 'Verkaufsoffener Sonntag am 29.11.',
    text: 'Die Geschäfte in der Innenstadt haben von 13 bis 18 Uhr geöffnet — falls jemand die Rückfahrt noch aufschieben will.',
  },
];

export const offizielleSeite = 'https://www.paderborn.de/microsite/weihnachtsmarkt/index.php';
export const programmSeite = 'https://www.paderborn.de/microsite/weihnachtsmarkt/news/programm.php';
