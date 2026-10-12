// src/data/essen.js
// Klassiker, die es auf praktisch jedem westfälischen Weihnachtsmarkt gibt.
// Bewusst KEINE namentlichen Stände: welcher Stand 2026 wo steht, ist nicht belegt.

export const klassiker = [
  {
    id: "gluehwein",
    name: "Glühwein",
    emoji: "🍷",
    notiz: "Pfand auf die Tasse — meist 2–4 €, gibt es beim Rückgeben zurück.",
  },
  {
    id: "punsch-alkoholfrei",
    name: "Alkoholfreier Punsch",
    emoji: "🍵",
    notiz: "Gibt es an fast jedem Glühweinstand — wichtig für alle, die noch fahren.",
  },
  {
    id: "feuerzangenbowle",
    name: "Feuerzangenbowle",
    emoji: "🔥",
    notiz: "Deutlich stärker als Glühwein. Nicht als Aufwärmgetränk unterschätzen.",
  },
  {
    id: "reibekuchen",
    name: "Reibekuchen",
    emoji: "🥔",
    notiz: "Mit Apfelmus — der westfälische Klassiker schlechthin. Sättigt gut.",
  },
  {
    id: "bratwurst",
    name: "Bratwurst",
    emoji: "🌭",
    notiz: "Schnell, warm, im Stehen zu essen. Die sicherste Bank fürs Mittagessen.",
  },
  {
    id: "champignons",
    name: "Champignons in Rahmsoße",
    emoji: "🍄",
    notiz: "Warm und vegetarisch, aber eine ordentliche Portion.",
  },
  {
    id: "mandeln",
    name: "Gebrannte Mandeln",
    emoji: "🥜",
    notiz: "Zum Mitlaufen. Kleine Tüte reicht — die große schafft niemand.",
  },
  {
    id: "crepes",
    name: "Crêpes & Schmalzkuchen",
    emoji: "🥞",
    notiz: "Süß und warm, gibt es an mehreren Ständen.",
  },
];

// Warme Rückzugsorte — nur Dinge, deren Existenz belegt ist.
export const aufwaermen = [
  {
    id: "aw-hotel",
    ortId: "hotel",
    titel: "Das Hotel selbst",
    text:
      "Mit rund 350 m zum Rathausplatz euer bester Rückzugsort: kurz hoch, aufwärmen, " +
      "weiter. Bei sechseinhalb Stunden Aufenthalt der wichtigste Vorteil " +
      "der zentralen Lage.",
  },
  {
    id: "aw-libori",
    ortId: "liborigalerie",
    titel: "Libori-Galerie",
    text:
      "Überdachtes Einkaufszentrum mitten im Marktgebiet — beheizt, mit Toiletten, " +
      "und näher dran, wenn der Weg zum Hotel gerade zu weit ist.",
  },
];
