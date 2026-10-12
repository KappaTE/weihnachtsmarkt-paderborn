// src/data/orte.js
// Einzige Quelle für alles mit Koordinaten. Andere Datendateien referenzieren per ortId.
// kategorie: "hotel" | "restaurant" | "markt" | "bar" | "parken" | "unterwegs" (nicht auf der Karte)
// stand: "bestaetigt" = gebucht bzw. amtlich | "unbestaetigt" = Portalangabe / Vorjahr
//
// Alle lat/lng sind über OpenStreetMap/Nominatim aufgelöst, nicht geschätzt.

const maps = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// Startet direkt die Navigation statt nur die Suche zu öffnen.
const navi = (q) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

export const orte = [

  // ── FIXPUNKTE ────────────────────────────────────────────────────────────

  {
    id: "hotel",
    name: "Hotel zur Mühle",
    adresse: "Mühlenstraße 2, 33098 Paderborn",
    kategorie: "hotel",
    fixpunkt: true,
    beschreibung: "Unser Quartier. Liegt mitten in der Altstadt — vom Markt sind es keine 5 Minuten.",
    tipp: "8 Doppelzimmer für die Gruppe. Telefon +49 5251 10750.",
    oeffnung: "Zimmer je nach Verfügbarkeit · Gepäck ab Ankunft",
    lat: 51.72033,
    lng: 8.75247,
    mapsLink: maps("Hotel zur Mühle Mühlenstraße 2 Paderborn"),
    naviLink: navi("Hotel zur Mühle Mühlenstraße 2 Paderborn"),
    stand: "bestaetigt",
  },

  {
    id: "brauhaus",
    name: "Paderborner Brauhaus",
    adresse: "Kisau 2, 33098 Paderborn",
    kategorie: "restaurant",
    fixpunkt: true,
    beschreibung: "Abendessen für alle 16. Tisch steht um 17:30.",
    tipp: "Vom Hotel sind es nur rund 80 Meter — gut eine Minute zu Fuß. Niemand muss hetzen.",
    oeffnung: "Reservierung 17:30 · samstags ab 11:30, offenes Ende",
    lat: 51.72053,
    lng: 8.75150,
    mapsLink: maps("Paderborner Brauhaus Kisau 2 Paderborn"),
    naviLink: navi("Paderborner Brauhaus Kisau 2 Paderborn"),
    stand: "bestaetigt",
  },

  // ── UNTERWEGS (nicht auf der Karte — liegt rund 90 km vor Paderborn) ────

  {
    id: "franzes",
    name: "Franzes",
    adresse: "Rönkhauser Straße 70, 59757 Arnsberg-Müschede",
    kategorie: "unterwegs",
    beschreibung: "Bäckerei mit Café — hier frühstücken alle gemeinsam, bevor es nach Paderborn geht.",
    tipp: "Für 16 Personen am besten vorher Bescheid geben: +49 2932 9411728.",
    oeffnung: "Sa 06:00–14:00",
    lat: 51.40142,
    lng: 7.99816,
    mapsLink: maps("Franzes Rönkhauser Straße 70 Arnsberg"),
    naviLink: navi("Franzes Rönkhauser Straße 70 Arnsberg"),
    stand: "unbestaetigt",
  },

  // ── MARKTBEREICHE ────────────────────────────────────────────────────────

  {
    id: "domplatz",
    name: "Domplatz",
    adresse: "Domplatz, 33098 Paderborn",
    kategorie: "markt",
    beschreibung: "Zusammen mit dem Marktplatz das Herzstück des Weihnachtsmarkts, direkt am Hohen Dom.",
    tipp: "Die stimmungsvollste Ecke, sobald es dunkel wird — also genau richtig für nach dem Abendessen.",
    oeffnung: "Sa 11:00–22:00",
    lat: 51.71869,
    lng: 8.75694,
    mapsLink: maps("Domplatz Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "rathausplatz",
    name: "Rathausplatz",
    adresse: "Rathausplatz, 33098 Paderborn",
    kategorie: "markt",
    beschreibung: "Vor dem Rathaus steht traditionell der große Weihnachtsbaum.",
    tipp: "Der Baum ist der auffälligste Punkt der ganzen Innenstadt — praktisch, um sich zu orientieren.",
    oeffnung: "Sa 11:00–22:00",
    lat: 51.71721,
    lng: 8.75348,
    mapsLink: maps("Rathausplatz Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "marienplatz",
    name: "Marienplatz",
    adresse: "Marienplatz, 33098 Paderborn",
    kategorie: "markt",
    beschreibung: "Teil der Fußgängerzone, gehört zum Marktgebiet.",
    tipp: "Liegt auf dem Weg zwischen Hotel und Rathausplatz.",
    oeffnung: "Sa 11:00–22:00",
    lat: 51.71727,
    lng: 8.75240,
    mapsLink: maps("Marienplatz Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "westernstrasse",
    name: "Westernstraße",
    adresse: "Westernstraße, 33098 Paderborn",
    kategorie: "markt",
    beschreibung: "Die lange Einkaufsstraße vom Westerntor Richtung Dom — auf ganzer Länge Marktstände.",
    tipp: "Hier ist es am vollsten. Wer Gedränge meiden will, weicht auf Neuer Platz oder Marienplatz aus.",
    oeffnung: "Sa 11:00–22:00",
    lat: 51.71604,
    lng: 8.74816,
    mapsLink: maps("Westernstraße Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "neuerplatz",
    name: "Neuer Platz",
    adresse: "Neuer Platz, 33098 Paderborn",
    kategorie: "markt",
    beschreibung: "Gehört mit zum Marktgebiet, am Theater Paderborn.",
    tipp: "Meist etwas ruhiger als Dom- und Rathausplatz.",
    oeffnung: "Sa 11:00–22:00",
    lat: 51.71709,
    lng: 8.75462,
    mapsLink: maps("Neuer Platz Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "kamp",
    name: "Kamp / Marktkirche",
    adresse: "Kamp, 33098 Paderborn",
    kategorie: "markt",
    beschreibung: "In Teilbereichen ebenfalls Markt, an der Marktkirche.",
    tipp: "Hier liegt auch die Libori-Galerie — überdacht und warm, wenn es zu ungemütlich wird.",
    oeffnung: "Sa 11:00–22:00",
    lat: 51.71610,
    lng: 8.75380,
    mapsLink: maps("Marktkirche Kamp Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "liborigalerie",
    name: "Libori-Galerie",
    adresse: "Kamp 30–32, 33098 Paderborn",
    kategorie: "markt",
    beschreibung: "Überdachtes Einkaufszentrum mitten im Marktgebiet.",
    tipp: "Der beste Aufwärm-Stopp, wenn das Hotel gerade zu weit weg ist — und es gibt Toiletten.",
    lat: 51.71647,
    lng: 8.75790,
    mapsLink: maps("Libori Galerie Paderborn"),
    stand: "unbestaetigt",
  },

  // ── BARS FÜR NACH 22 UHR ─────────────────────────────────────────────
  // Der Markt schließt samstags um 22:00. Alle Zeiten gelten für Samstag und
  // stammen aus OpenStreetMap, ebenso die Koordinaten — nichts davon geschätzt.
  // gruppe: "sitzen" | "nah" | "weiter" | "spaet"

  {
    id: "bar-brauhaus",
    name: "Einfach sitzen bleiben",
    adresse: "Paderborner Brauhaus, Kisau 2",
    kategorie: "bar",
    gruppe: "sitzen",
    beschreibung: "Das Brauhaus hat samstags offenes Ende — ihr sitzt schon dort, mit Tisch für alle.",
    tipp: "Für 16 Leute die mit Abstand einfachste Lösung: kein Ortswechsel, keine Platzsuche.",
    oeffnung: "offenes Ende",
    lat: 51.72053,
    lng: 8.75150,
    mapsLink: maps("Paderborner Brauhaus Kisau 2 Paderborn"),
    naviLink: navi("Paderborner Brauhaus Kisau 2 Paderborn"),
    stand: "unbestaetigt",
  },

  // ── Um die Ecke ──────────────────────────────────────────────────────

  {
    id: "bar-deutscheshaus",
    name: "Deutsches Haus",
    adresse: "Kisau 9",
    kategorie: "bar",
    gruppe: "nah",
    beschreibung: "Gaststätte mit Biergarten, keine 100 Meter vom Hotel und direkt neben dem Brauhaus.",
    tipp: "Der kürzeste Weg überhaupt — und der naheliegendste zweite Anlauf, wenn im Brauhaus Schluss ist.",
    oeffnung: "bis 24:00",
    entfernung: "98 m",
    lat: 51.72038,
    lng: 8.75105,
    mapsLink: maps("Deutsches Haus Kisau 9 Paderborn"),
    naviLink: navi("Deutsches Haus Kisau 9 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-erzengel",
    name: "Erzengel",
    adresse: "Hathumarstraße 9",
    kategorie: "bar",
    gruppe: "nah",
    beschreibung: "Kneipe in der Hathumarstraße, gut zu Fuß vom Hotel.",
    oeffnung: "18:00 – 01:00",
    entfernung: "197 m",
    lat: 51.72103,
    lng: 8.75510,
    mapsLink: maps("Erzengel Hathumarstraße 9 Paderborn"),
    naviLink: navi("Erzengel Hathumarstraße 9 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-vinoteca",
    name: "Vinoteca Sevilla",
    adresse: "Hathumarstraße 24",
    kategorie: "bar",
    gruppe: "nah",
    beschreibung: "Weinbar mit Tapas — für alle, die nach dem Glühwein kein Bier mehr wollen.",
    oeffnung: "17:00 – 01:00",
    entfernung: "239 m",
    lat: 51.72202,
    lng: 8.75461,
    mapsLink: maps("Vinoteca Sevilla Hathumarstraße 24 Paderborn"),
    naviLink: navi("Vinoteca Sevilla Hathumarstraße 24 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-limericks",
    name: "Limericks",
    adresse: "Marienstraße 2",
    kategorie: "bar",
    gruppe: "nah",
    beschreibung: "Irish Pub am Marienplatz, mitten im Marktgebiet.",
    oeffnung: "18:00 – 24:00",
    entfernung: "304 m",
    lat: 51.71766,
    lng: 8.75154,
    mapsLink: maps("Limericks Marienstraße 2 Paderborn"),
    naviLink: navi("Limericks Marienstraße 2 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-hops",
    name: "Hops Bierbar",
    adresse: "Heiersstraße 23",
    kategorie: "bar",
    gruppe: "nah",
    beschreibung: "Bierbar in der Heiersstraße, wo mehrere Kneipen dicht beieinander liegen.",
    tipp: "Falls voll: Josefs und das Lenz sind praktisch nebenan.",
    oeffnung: "ab 17:00, offenes Ende",
    entfernung: "315 m",
    lat: 51.72124,
    lng: 8.75680,
    mapsLink: maps("Hops Bierbar Heiersstraße 23 Paderborn"),
    naviLink: navi("Hops Bierbar Heiersstraße 23 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-marys",
    name: "Mary's",
    adresse: "Marienplatz 16",
    kategorie: "bar",
    gruppe: "nah",
    beschreibung: "Bar am Marienplatz, kurze Wege zu mehreren Alternativen ringsum.",
    oeffnung: "18:00 – 24:00",
    entfernung: "321 m",
    lat: 51.71752,
    lng: 8.75144,
    mapsLink: maps("Marys Marienplatz 16 Paderborn"),
    naviLink: navi("Marys Marienplatz 16 Paderborn"),
    stand: "unbestaetigt",
  },

  // ── Ein Stück weiter ─────────────────────────────────────────────────

  {
    id: "bar-lenz",
    name: "Kultur-Bar Lenz",
    adresse: "Heiersstraße 35",
    kategorie: "bar",
    gruppe: "weiter",
    beschreibung: "Täglich geöffnet, regelmäßig Livemusik.",
    oeffnung: "18:00 – 24:00",
    entfernung: "348 m",
    lat: 51.72174,
    lng: 8.75698,
    mapsLink: maps("Kultur-Bar Lenz Heiersstraße 35 Paderborn"),
    naviLink: navi("Kultur-Bar Lenz Heiersstraße 35 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-blacksheep",
    name: "Black Sheep",
    adresse: "Ükern 28",
    kategorie: "bar",
    gruppe: "weiter",
    beschreibung: "Kneipe nördlich der Altstadt, etwas abseits vom Marktgedränge.",
    oeffnung: "19:00 – 24:00",
    entfernung: "371 m",
    lat: 51.72212,
    lng: 8.75701,
    mapsLink: maps("Black Sheep Ükern 28 Paderborn"),
    naviLink: navi("Black Sheep Ükern 28 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-lastdrop",
    name: "Last Drop",
    adresse: "Marienplatz 7a",
    kategorie: "bar",
    gruppe: "weiter",
    beschreibung: "Cocktailbar am Marienplatz.",
    oeffnung: "19:00 – 02:00",
    entfernung: "406 m",
    lat: 51.71668,
    lng: 8.75234,
    mapsLink: maps("Last Drop Marienplatz Paderborn"),
    naviLink: navi("Last Drop Marienplatz 7a Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-havana",
    name: "Havana",
    adresse: "An der Alten Synagoge 1",
    kategorie: "bar",
    gruppe: "weiter",
    beschreibung: "Cocktailbar östlich des Doms, durchgehend ab mittags geöffnet.",
    oeffnung: "bis 01:00",
    entfernung: "445 m",
    lat: 51.71929,
    lng: 8.75871,
    mapsLink: maps("Havana An der Alten Synagoge Paderborn"),
    naviLink: navi("Havana An der Alten Synagoge 1 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-kampbar",
    name: "KampBar",
    adresse: "Kamp 25",
    kategorie: "bar",
    gruppe: "weiter",
    beschreibung: "Am Kamp, in der Nähe der Libori-Galerie.",
    oeffnung: "bis 02:00",
    entfernung: "469 m",
    lat: 51.71681,
    lng: 8.75622,
    mapsLink: maps("KampBar Kamp 25 Paderborn"),
    naviLink: navi("KampBar Kamp 25 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-hemingways",
    name: "Hemingways",
    adresse: "Kamp 8",
    kategorie: "bar",
    gruppe: "weiter",
    beschreibung: "Hat von den Bars am längsten offen — bis 4 Uhr früh.",
    tipp: "Am Sonntag steht allerdings die Heimfahrt an.",
    oeffnung: "18:00 – 04:00",
    entfernung: "480 m",
    lat: 51.71640,
    lng: 8.75536,
    mapsLink: maps("Hemingways Kamp 8 Paderborn"),
    naviLink: navi("Hemingways Kamp 8 Paderborn"),
    stand: "unbestaetigt",
  },

  // ── Wenn es spät wird ────────────────────────────────────────────────

  {
    id: "bar-vybe",
    name: "vybe",
    adresse: "Marienstraße 20",
    kategorie: "bar",
    gruppe: "spaet",
    oeffnung: "ab 19:00, bis 05:00",
    entfernung: "320 m",
    lat: 51.71804,
    lng: 8.74965,
    mapsLink: maps("vybe Marienstraße 20 Paderborn"),
    naviLink: navi("vybe Marienstraße 20 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-residenz",
    name: "Residenz Club & Lounge",
    adresse: "Marienstraße 1–3",
    kategorie: "bar",
    gruppe: "spaet",
    oeffnung: "ab 23:00, bis 05:00",
    entfernung: "325 m",
    lat: 51.71748,
    lng: 8.75141,
    mapsLink: maps("Residenz Club Marienstraße Paderborn"),
    naviLink: navi("Residenz Club Marienstraße 1 Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "bar-nachtschwaermer",
    name: "Nachtschwärmer",
    adresse: "Franziskanergasse 4",
    kategorie: "bar",
    gruppe: "spaet",
    oeffnung: "ab 20:00, bis 05:00",
    entfernung: "513 m",
    lat: 51.71605,
    lng: 8.74971,
    mapsLink: maps("Nachtschwärmer Franziskanergasse 4 Paderborn"),
    naviLink: navi("Nachtschwärmer Franziskanergasse 4 Paderborn"),
    stand: "unbestaetigt",
  },

  // ── PARKEN (Rückfallebene, falls die Hotelparkplätze nicht reichen) ───────

  {
    id: "ph-neuhaeusertor",
    name: "Parkhaus Neuhäuser Tor",
    adresse: "Neuhäuser Straße 5, 33098 Paderborn",
    kategorie: "parken",
    beschreibung: "Das dem Hotel nächstgelegene Parkhaus — rund 350 m entfernt.",
    tipp: "Erste Wahl, falls im Hotel nicht alle Autos unterkommen.",
    lat: 51.72074,
    lng: 8.74738,
    mapsLink: maps("Parkhaus Neuhäuser Tor Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "tg-koenigsplatz",
    name: "Tiefgarage Königsplatz",
    adresse: "Königsplatz, 33098 Paderborn",
    kategorie: "parken",
    beschreibung: "Große Tiefgarage mit rund 640 Plätzen — die beste Chance, mehrere Autos gemeinsam unterzubringen.",
    tipp: "Auf das Parkleitsystem achten, das zeigt freie Plätze je Parkhaus an.",
    oeffnung: "ca. 1,50 €/Std · 8 €/24 Std (Angabe ohne Gewähr)",
    lat: 51.71760,
    lng: 8.74960,
    mapsLink: maps("Tiefgarage Königsplatz Paderborn"),
    stand: "unbestaetigt",
  },

  {
    id: "ph-liborigalerie",
    name: "Parkhaus Libori-Galerie",
    adresse: "Kamp, 33098 Paderborn",
    kategorie: "parken",
    beschreibung: "Zentral im Marktgebiet, direkt an der Libori-Galerie.",
    tipp: "Am Adventssamstag früh voll — eher als zweite Option einplanen.",
    lat: 51.71647,
    lng: 8.75790,
    mapsLink: maps("Parkhaus Libori Galerie Paderborn"),
    stand: "unbestaetigt",
  },
];

export const getOrtById = (id) => orte.find((o) => o.id === id);

export const orteNachKategorie = (kategorie) =>
  orte.filter((o) => o.kategorie === kategorie);
