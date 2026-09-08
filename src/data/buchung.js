// src/data/buchung.js
// Aus der Booking.com-Bestätigung übernommen (Stand 08.09.2026), Buchung bestätigt.
// Bewusst NICHT hier: Bestätigungsnummer, PIN und Preis — mit dem PIN kann jeder
// Empfänger die Buchung einsehen und ändern, und diese Seite geht an 16 Leute.

export const buchung = {
  hotel: 'Hotel zur Mühle',
  telefon: '+49 5251 10750',
  telefonLink: 'tel:+49525110750',
  zimmerGesamt: 8,
  stornierung: 'kostenlos bis 2 Tage vor Anreise',
};

// 8 Doppelzimmer laut Buchung. Wer wo schläft, steht noch nicht fest —
// die Namen kommen später dazu.
export const zimmer = [
  { nr: 1, typ: 'Standard Doppelzimmer', gaeste: null },
  { nr: 2, typ: 'Budget Doppelzimmer',   gaeste: null },
  { nr: 3, typ: 'Großes Doppelzimmer',   gaeste: null },
  { nr: 4, typ: 'Standard Doppelzimmer', gaeste: null },
  { nr: 5, typ: 'Großes Doppelzimmer',   gaeste: null },
  { nr: 6, typ: 'Großes Doppelzimmer',   gaeste: null },
  { nr: 7, typ: 'Budget Doppelzimmer',   gaeste: null },
  { nr: 8, typ: 'Standard Doppelzimmer', gaeste: null },
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
