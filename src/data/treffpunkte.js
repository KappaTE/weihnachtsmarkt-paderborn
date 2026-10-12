// src/data/treffpunkte.js
// Orte, die sich als spontaner Treffpunkt eignen. Kein fester Notfall-Treffpunkt —
// wer einen ausmacht, schickt ihn selbst in die WhatsApp-Gruppe.

export const treffpunkte = [
  { id: 'rathausplatz',  ortId: 'rathausplatz',  label: 'Am Weihnachtsbaum', sub: 'Rathausplatz — von überall zu sehen' },
  { id: 'hotel',         ortId: 'hotel',         label: 'Vor dem Hotel',     sub: 'Hotel zur Mühle, Mühlenstraße 2' },
  { id: 'brauhaus',      ortId: 'brauhaus',      label: 'Vor dem Brauhaus',  sub: 'Kisau 2 · 80 m vom Hotel' },
  { id: 'domplatz',      ortId: 'domplatz',      label: 'Domplatz',          sub: 'Am Hohen Dom' },
  { id: 'liborigalerie', ortId: 'liborigalerie', label: 'Libori-Galerie',    sub: 'Drinnen, warm, mit Toiletten' },
];

export const getTreffpunkt = (id) => treffpunkte.find((t) => t.id === id);
