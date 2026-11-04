// src/data/kategorien.js
// Werte gespiegelt aus den Tokens in index.css — Leaflet-Pins und Inline-Punkte
// können die Tailwind-Farben nicht selbst auflösen.

export const KATEGORIEN = ['hotel', 'restaurant', 'markt', 'bar', 'parken'];

export const KAT_FARBE = {
  hotel:      '#F08F86',  // Glühweinrot — Fixpunkt
  restaurant: '#F08F86',  // Glühweinrot — Fixpunkt
  markt:      '#F0B860',  // Birnenlicht — Marktbereiche
  bar:        '#7FD1AE',  // Tanne — Bars für nach 22 Uhr
  parken:     '#8C95A3',  // Nebel — Rückfallebene
  unterwegs:  '#C3C9D2',  // nur im Sheet, nicht auf der Karte
};

export const KAT_LABEL = {
  hotel:      'Hotel',
  restaurant: 'Restaurant',
  markt:      'Markt',
  bar:        'Nach 22 Uhr',
  parken:     'Parken',
  unterwegs:  'Unterwegs',
};

// Kartenfilter: Hotel und Brauhaus sind zusammen „Fest“ — die beiden Fixpunkte.
export const FILTER = [
  { id: 'fest',   label: 'Fest',   kategorien: ['hotel', 'restaurant'], farbe: '#F08F86' },
  { id: 'markt',  label: 'Markt',  kategorien: ['markt'],               farbe: '#F0B860' },
  { id: 'bar',    label: 'Bars',   kategorien: ['bar'],                 farbe: '#7FD1AE' },
  { id: 'parken', label: 'Parken', kategorien: ['parken'],              farbe: '#8C95A3', eckig: true },
];
