# Weihnachtsmarkt Paderborn

Mobile Web-Seite für den Familienbesuch auf dem Paderborner Weihnachtsmarkt — ein Link,
den 16 Leute auf dem Handy öffnen. Aufbau wie `../bruessel-trip`: die eigentliche Arbeit
ist Datenpflege in `src/data/`, nicht Komponentenbau.

## Eckdaten (Grundlage aller Inhalte)

- Sa, 28.11.2026 — Anreise ~11:00 mit mehreren Autos, Rückreise So nach dem Frühstück
- 16 Personen: 14 Erwachsene (24–63) + Kinder mit 2 und 6 Jahren
- Hotel zur Mühle, Mühlenstraße 2 · Paderborner Brauhaus, Kisau 2 — Tisch 17:30
- 11:00–17:30 freier Bummel, mittags nur Marktstände, nach dem Essen nochmal auf den Markt

## Befehle

- Dev: `npm run dev -- --port 5175`
- Build: `npm run build` — **vorher den Dev-Server stoppen**. Parallel dazu blockiert er sich
  und braucht Minuten statt der üblichen ~300 ms.
- `npm run lint` hängt in diesem Verzeichnis ohne Ausgabe (auch `npx eslint src`), Ursache
  ungeklärt — vermutlich iCloud. Als Ersatz taugt ein erfolgreicher Build plus ein Blick auf
  verwaiste Imports.
- Keine Tests im Projekt — nicht danach suchen, nicht ungefragt einführen.

## Architektur

- Vite + React (JSX, kein TypeScript), Tab-State in `App.jsx`, kein Router.
- Inhalte ausschließlich in `src/data/*.js` als exportierte Arrays, Komponenten rendern nur.
  „Neuer Inhalt" heißt Datensatz ergänzen, nicht Komponente anfassen.
- Jeder Ort braucht `id`, `lat`, `lng`, `mapsLink` — ohne Koordinaten fehlt er auf der Karte.
- Mobile-first: `max-w-lg mx-auto`, feste Bottom-Nav. Desktop ist zweitrangig.
- Deutsche Bezeichner in Daten und State (`adresse`, `oeffnung`, `aktiv`) — durchhalten.
- Der Ablauf ist eine **maßstäbliche Zeitachse** (`Zeitachse.jsx`): `von`/`bis` in `ablauf.js`
  sind Minuten seit Mitternacht, daraus entsteht die Höhe. Lange Lücken sollen groß aussehen —
  das ist die Aussage der Seite, keine Layout-Panne. Nicht „aufräumen".

## Design

- Palette „Budenlicht" als Tokens in `src/index.css`: `holz-*` (warmes Schwarz),
  `gluehwein-*` (nur feste Termine), `licht-*` (Akzent), `tanne-*` (nur Bars).
  Keine Tailwind-Standardfarben verwenden.
- Schriften: Bricolage Grotesque (`.display`), IBM Plex Sans (Fließtext),
  IBM Plex Mono (`.zeit`, für alle Uhrzeiten — tabellarische Ziffern).
- Radius ist `rounded-kante` (2px). Runde Ecken nur bei Punkten und Markern.
- Farben für die Leaflet-Pins stehen als Hex in `Karte.jsx` — SVG kann die Tokens nicht
  auflösen. Bei Palettenänderung dort mit anpassen.

## Vorsicht

- Tailwind v4 **ohne** Config-Datei: Theme und Farben stehen in `src/index.css` unter
  `@theme`, eingebunden über `@tailwindcss/vite`. Ein `tailwind.config.js` wird nicht
  gelesen — nicht anlegen.
- Leaflet-Marker brauchen den Icon-Fix (`L.Icon.Default.mergeOptions` auf die unpkg-URLs)
  und `@import "leaflet/dist/leaflet.css"` in `index.css`, sonst sind die Pins unsichtbar.
- GitHub Pages: `base: '/weihnachtsmarkt-paderborn/'` in `vite.config.js` setzen, sonst
  lädt kein Asset und die Seite bleibt weiß.
- Ordnername enthält ein Leerzeichen — Pfade in Shell-Befehlen quoten. `name` in
  package.json trotzdem `weihnachtsmarkt-paderborn` (npm erlaubt keine Leerzeichen).
- `index.html`: `lang="de"` und echten `<title>` setzen — in bruessel-trip beides vergessen.
- Öffnungszeiten und Termine nie schätzen. Unbestätigtes im Datensatz markieren statt zu
  erfinden — die Familie plant danach.
