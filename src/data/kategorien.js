// src/data/kategorien.js
// Werte gespiegelt aus den Tokens in index.css — Leaflet-Pins und Inline-Punkte
// können die Tailwind-Farben nicht selbst auflösen.

export const KATEGORIEN = ['hotel', 'restaurant', 'markt', 'bar', 'parken'];

export const KAT_FARBE = {
  hotel:      '#CA6161',  // Glühwein — Fixpunkt
  restaurant: '#CA6161',  // Glühwein — Fixpunkt
  markt:      '#E8A33D',  // Budenlicht — Marktbereiche
  bar:        '#6FA88A',  // Tanne — Bars für nach 22 Uhr
  parken:     '#8A7A6E',  // warmes Grau — Rückfallebene
};

export const KAT_LABEL = {
  hotel:      'Hotel',
  restaurant: 'Restaurant',
  markt:      'Markt',
  bar:        'Nach 22 Uhr',
  parken:     'Parken',
};
