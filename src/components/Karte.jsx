import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ExternalLink } from 'lucide-react';
import { orte } from '../data/orte';

// Fix Leaflet default icon — ohne diesen Block sind alle Pins unsichtbar.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Werte gespiegelt aus den Tokens in index.css — Leaflet-Pins werden als SVG
// gezeichnet und können die Tailwind-Farben nicht selbst auflösen.
const KAT_FARBE = {
  hotel:      '#CA6161',  // Glühwein — Fixpunkt
  restaurant: '#CA6161',  // Glühwein — Fixpunkt
  markt:      '#E8A33D',  // Budenlicht — Marktbereiche
  bar:        '#6FA88A',  // Tanne — Bars für nach 22 Uhr
  parken:     '#8A7A6E',  // warmes Grau — Rückfallebene
};

const KAT_LABEL = {
  hotel:      'Hotel',
  restaurant: 'Restaurant',
  markt:      'Markt',
  bar:        'Nach 22 Uhr',
  parken:     'Parken',
};

function makePin(color, isFix) {
  const inner = isFix
    ? `<text x="14" y="16" text-anchor="middle" font-size="11" fill="white" font-weight="bold">★</text>`
    : `<circle cx="14" cy="12" r="3.5" fill="rgba(255,255,255,0.7)"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
    <ellipse cx="14" cy="34" rx="5" ry="2" fill="rgba(0,0,0,0.25)"/>
    <path d="M14 2C8.48 2 4 6.48 4 12c0 7.5 10 22 10 22S24 19.5 24 12c0-5.52-4.48-10-10-10z"
      fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
    ${inner}
  </svg>`;

  return L.divIcon({ html: svg, className: '', iconSize: [28, 36], iconAnchor: [14, 36], popupAnchor: [0, -38] });
}

const KATEGORIEN = ['hotel', 'restaurant', 'markt', 'bar', 'parken'];

export default function Karte() {
  const [filter, setFilter] = useState(KATEGORIEN);

  const sichtbar = orte.filter(o => filter.includes(o.kategorie));

  const toggle = (kat) =>
    setFilter(f => (f.includes(kat) ? f.filter(k => k !== kat) : [...f, kat]));

  return (
    <section className="px-4 py-8 max-w-lg mx-auto w-full">
      <h2 className="display text-3xl font-bold text-creme-100 mb-2 tracking-tight">Karte</h2>
      <p className="text-holz-400 text-sm leading-relaxed mb-4">
        Alles liegt in der Altstadt und ist zu Fuß erreichbar. Vom Hotel sind es rund
        <span className="text-creme-100 font-medium"> 80 m zum Brauhaus</span> und etwa
        <span className="text-creme-100 font-medium"> 350 m zum Rathausplatz</span>.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {KATEGORIEN.map(kat => {
          const an = filter.includes(kat);
          return (
            <button
              key={kat}
              onClick={() => toggle(kat)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-kante text-xs transition-colors border ${
                an
                  ? 'bg-holz-900 text-creme-100 border-holz-700'
                  : 'bg-transparent text-holz-400 border-holz-900'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: an ? KAT_FARBE[kat] : '#3A312C' }}
              />
              {KAT_LABEL[kat]}
            </button>
          );
        })}
      </div>

      <div className="rounded-kante overflow-hidden border border-holz-900 mb-4">
        <MapContainer
          center={[51.7188, 8.7530]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: '65vh', minHeight: 380, width: '100%', background: '#12100E' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
          {sichtbar.map(o => (
            <Marker
              key={o.id}
              position={[o.lat, o.lng]}
              icon={makePin(KAT_FARBE[o.kategorie] ?? '#8A7A6E', !!o.fixpunkt)}
            >
              <Popup>
                <div className="text-sm">
                  <strong className="block text-creme-100">{o.name}</strong>
                  <span className="text-holz-400 text-xs">{o.adresse}</span>
                  {o.oeffnung && (
                    <span className="block text-holz-400 text-xs mt-1">{o.oeffnung}</span>
                  )}
                  <a
                    href={o.naviLink ?? o.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-licht-500 text-xs mt-2"
                  >
                    {o.naviLink ? 'Route starten' : 'Auf Maps öffnen'}
                    <ExternalLink size={10} />
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <p className="text-holz-400 text-xs leading-relaxed">
        ★ markiert die beiden Fixpunkte: Hotel und Brauhaus. Alle Koordinaten stammen aus
        OpenStreetMap.
      </p>
    </section>
  );
}
