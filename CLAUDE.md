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
- Hängt `vite build` ohne Dev-Server trotzdem: iCloud hat Dateien in `node_modules` ausgelagert
  (`ls -lO node_modules/vite/dist/node/chunks` zeigt `dataless`). Dann das Projekt ohne
  `node_modules` per `rsync` in den Scratchpad kopieren und dort `npm ci` + Build ausführen.
- `npm run lint` hängt in diesem Verzeichnis ohne Ausgabe (auch `npx eslint src`), Ursache
  ungeklärt — vermutlich iCloud. Als Ersatz taugt ein erfolgreicher Build plus ein Blick auf
  verwaiste Imports.
- Keine Tests im Projekt — nicht danach suchen, nicht ungefragt einführen.

## Architektur

- Vite + React (JSX, kein TypeScript), kein Router. Gemeinsamer Zustand (Tab, Merkliste,
  Treffpunkt, offenes Sheet) in `src/state/AppZustand.jsx`, abrufbar über `useApp()`.
- Jeder Ort öffnet dieselbe Detailansicht (`Sheet.jsx`, per `openOrt(id)`) — keine Leaflet-Popups,
  keine zweite Detaildarstellung bauen. Das Sheet enthält auch den Treffpunkt-Dialog.
- Merkliste (`wmpb-merkliste`) und Treffpunkt (`wmpb-treffpunkt`) liegen nur im localStorage des
  jeweiligen Handys. Geteilt wird der Treffpunkt per WhatsApp-Link, nicht über die Seite.
- Inhalte ausschließlich in `src/data/*.js` als exportierte Arrays, Komponenten rendern nur.
  „Neuer Inhalt" heißt Datensatz ergänzen, nicht Komponente anfassen.
- Jeder Ort braucht `id`, `lat`, `lng`, `mapsLink` — ohne Koordinaten fehlt er auf der Karte.
- Mobile-first: `max-w-lg mx-auto`, schwebende Bottom-Nav. Desktop ist zweitrangig.
- Deutsche Bezeichner in Daten und State (`adresse`, `oeffnung`, `aktiv`) — durchhalten.
- Der Ablauf ist eine **maßstäbliche Zeitachse** (`Zeitachse.jsx`): `von`/`bis` in `ablauf.js`
  sind Minuten seit Mitternacht, daraus entsteht die Höhe. Lange Lücken sollen groß aussehen —
  das ist die Aussage der Seite, keine Layout-Panne. Nicht „aufräumen".

## Design

- Design „Lichterkette" (Claude-Design-Handoff vom 04.11.2026) als Tokens in `src/index.css`:
  `nacht-*` (Nachtblau, Flächen und Ränder), `nebel-*`/`schnee` (Text), `birne-*` (Licht,
  Jetzt, Countdown), `gluehwein-300` (nur feste Termine), `tanne-300` (nur Bars).
  Keine Tailwind-Standardfarben verwenden. `nacht-500` nur für Icons, nicht für Text.
- Schriften: Schibsted Grotesk (alles), JetBrains Mono (`.zeit`, für alle Uhrzeiten —
  tabellarische Ziffern).
- Runde Formen: Karten 18–24px, Buttons und Filter als Pillen (`rounded-full`),
  schwebende Navigation unten.
- Start zeigt den Samstag als Lichterkette (`Lichterkette.jsx`, eine Birne pro Stunde 08–22).
- Farben für die Leaflet-Pins stehen als Hex in `src/data/kategorien.js` — die Pins sind
  HTML-Strings und können die Tokens nicht auflösen. Bei Palettenänderung dort mit anpassen.
- OSM-Quellenangabe ist selbst gesetzt (`attributionControl={false}` in `Karte.jsx`),
  weil die schwebende Navigation die Leaflet-Ecke verdecken würde. Nicht entfernen.

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
