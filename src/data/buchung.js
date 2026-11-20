// src/data/buchung.js
// Aus der Booking.com-Bestätigung übernommen (Stand 08.09.2026), Buchung bestätigt.
// Bewusst NICHT hier: Bestätigungsnummer, PIN und Preis — mit dem PIN kann jeder
// Empfänger die Buchung einsehen und ändern, und diese Seite geht an 16 Leute.

export const buchung = {
  hotel: 'Hotel zur Mühle',
  telefon: '+49 5251 10750',
  telefonLink: 'tel:+49525110750',
  zimmerGesamt: 7,
  stornierung: 'kostenlos bis 2 Tage vor Anreise',
};

// Zimmerbelegung laut Liste fürs Hotel (Stand 20.11.2026). Die Buchung ist von 8 auf 7 Zimmer
// geschrumpft. Bewusst nur Vornamen: Seite und Repository sind öffentlich — Nachnamen,
// Adressen und Mail-Adressen aus der Hotelliste gehören nicht hierher.
export const zimmer = [
  { typ: 'Budget Doppelzimmer',   gaeste: ['Philip', 'Nadine'] },
  { typ: 'Budget Doppelzimmer',   gaeste: ['Anni', 'Karl'] },
  { typ: 'Standard Doppelzimmer', gaeste: ['Fabian', 'Lea'] },
  { typ: 'Standard Doppelzimmer', gaeste: ['Karl', 'Sabine'] },
  { typ: 'Standard Doppelzimmer', gaeste: ['Susanne', 'Frank'] },
  { typ: 'Großes Zimmer',         gaeste: ['Tobias', 'Nele'] },
  // Siebtes Zimmer stand nicht auf der Liste.
  { typ: null,                    gaeste: null },
];

// Wörtlich aus der Antwort des Hotels — nicht paraphrasieren, daran hängt der Ablauf.
export const hotelAussagen = {
  anreise:
    'Eine Anreise ab 10 Uhr ist nur möglich, wenn die Zimmer am Vortag nicht belegt wurden. ' +
    'Das Gepäck kann bereits abgestellt werden. Für garantiert früh verfügbare Zimmer ' +
    'berechnet das Hotel 50 % Aufpreis, vorab zu überweisen.',
  parken:
    'Es gibt unterschiedliche Parkmöglichkeiten. An der Rezeption wird bei Anreise gezeigt, ' +
    'wo die Autos untergebracht werden können.',
  fruehstueck:
    'Das Frühstück kann am Anreisetag hinzugebucht werden — es ist nicht im Preis enthalten.',
  namensliste:
    'Das Hotel bittet darum, vor der Anreise die Namen und Adressen der Gäste zu übermitteln, ' +
    'damit der Check-in zügig läuft.',
};
