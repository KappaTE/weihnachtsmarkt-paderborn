// src/data/termine.js
// Die harten Uhrzeiten des Wochenendes. Basis für den Hinweis "was kommt als Nächstes".
// Monat ist 0-basiert: 10 = November. Lokale Gerätezeit — alle sind vor Ort.

export const termine = [
  { id: 'fruehstueck', zeit: new Date(2026, 10, 28, 10,  0), name: 'Gemeinsames Frühstück', ort: 'Ort steht noch nicht fest' },
  { id: 'ankunft',  zeit: new Date(2026, 10, 28, 11,  0), name: 'Ankunft in Paderborn', ort: 'Hotel zur Mühle' },
  { id: 'checkin',  zeit: new Date(2026, 10, 28, 15,  0), name: 'Check-in',             ort: 'Hotel zur Mühle' },
  { id: 'essen',    zeit: new Date(2026, 10, 28, 17, 30), name: 'Tisch im Brauhaus',    ort: 'Paderborner Brauhaus, Kisau 2' },
  { id: 'marktzu',  zeit: new Date(2026, 10, 28, 22,  0), name: 'Markt schließt',       ort: 'Innenstadt' },
];

export const reisetag = new Date(2026, 10, 28, 0, 0);

// Nächster noch nicht vergangener Termin — oder null, wenn alles durch ist.
export function naechsterTermin(jetzt = new Date()) {
  return termine.find(t => t.zeit > jetzt) ?? null;
}

// "3 Std 20 Min", "45 Min", "12 Tage"
export function restzeit(ziel, jetzt = new Date()) {
  const ms = ziel - jetzt;
  if (ms <= 0) return null;
  const min = Math.floor(ms / 60000);
  const std = Math.floor(min / 60);
  const tage = Math.floor(std / 24);
  if (tage >= 1) return `${tage} ${tage === 1 ? 'Tag' : 'Tage'}`;
  if (std >= 1) return `${std} Std ${min % 60} Min`;
  return `${min} Min`;
}

export const uhrzeit = (d) =>
  d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

// Minuten seit Mitternacht als "17.15" — gleiche Schreibweise wie auf der Zeitachse.
export const fmtMinuten = (m) =>
  `${String(Math.floor(m / 60) % 24).padStart(2, '0')}.${String(m % 60).padStart(2, '0')}`;

// Minuten seit Mitternacht — Bezugsgröße für die Zeitachse.
export const minutenImTag = (d) => d.getHours() * 60 + d.getMinutes();

// Läuft der übergebene Zeitpunkt am Reisetag? Nur dann wandert der Jetzt-Marker.
export function istReisetag(jetzt = new Date()) {
  return (
    jetzt.getFullYear() === reisetag.getFullYear() &&
    jetzt.getMonth() === reisetag.getMonth() &&
    jetzt.getDate() === reisetag.getDate()
  );
}
