import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { orte } from '../data/orte';
import { KATEGORIEN, KAT_FARBE, KAT_LABEL } from '../data/kategorien';
import { useApp } from '../state/AppZustand';

// Fix Leaflet default icon — ohne diesen Block sind alle Pins unsichtbar.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Runde Leuchtpunkte statt Tropfen-Pins: Fixpunkte größer und mit Stern,
// gemerkte Orte mit hellem Ring.
function makePin(color, isFix, gemerkt) {
  const size = isFix ? 24 : 16;
  const ring = gemerkt ? '0 0 0 2px #F2C078' : `0 0 0 1px ${color}99`;
  const html = `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid #12100E;box-shadow:${ring},0 0 14px ${color}88;display:flex;align-items:center;justify-content:center;color:#12100E;font:700 11px/1 sans-serif;box-sizing:content-box">${isFix ? '★' : ''}</div>`;
  const aussen = size + 4;
  return L.divIcon({ html, className: '', iconSize: [aussen, aussen], iconAnchor: [aussen / 2, aussen / 2] });
}

export default function Karte() {
  const { merkliste, openOrt } = useApp();
  const [filter, setFilter] = useState(KATEGORIEN);
  const [nurGemerkt, setNurGemerkt] = useState(false);

  // Orte an derselben Stelle (Brauhaus als Bar, Parkhaus unter der Libori-Galerie)
  // nur einmal zeichnen — sonst liegen zwei Pins übereinander und nur einer ist tippbar.
  const gesehen = new Set();
  const sichtbar = orte
    .filter(o => (nurGemerkt ? merkliste.includes(o.id) : filter.includes(o.kategorie)))
    .filter(o => {
      const k = `${o.lat},${o.lng}`;
      if (gesehen.has(k) && !o.fixpunkt) return false;
      gesehen.add(k);
      return true;
    });

  const toggle = (kat) => {
    setNurGemerkt(false);
    setFilter(f => (nurGemerkt ? [kat] : f.includes(kat) ? f.filter(k => k !== kat) : [...f, kat]));
  };

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg bottom-[calc(4rem+env(safe-area-inset-bottom))] bg-holz-950">
      <div className="absolute inset-0 z-0 isolate">
        <MapContainer
          center={[51.7188, 8.7530]}
          zoom={15}
          zoomControl={false}
          style={{ height: '100%', width: '100%', background: '#12100E' }}
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
              icon={makePin(KAT_FARBE[o.kategorie] ?? '#8A7A6E', !!o.fixpunkt, merkliste.includes(o.id))}
              zIndexOffset={o.fixpunkt ? 1000 : 0}
              title={o.name}
              keyboard
              eventHandlers={{ click: () => openOrt(o.id) }}
            />
          ))}
        </MapContainer>
      </div>

      <div className="absolute top-0 inset-x-0 z-10 pt-3.5 pb-[26px] bg-gradient-to-b from-holz-950 from-55% to-transparent pointer-events-none">
        <h2 className="display mx-[18px] mb-2.5 text-[28px] font-bold leading-none tracking-tight text-creme-100">Karte</h2>
        <div className="flex gap-1.5 overflow-x-auto px-[18px] pointer-events-auto [scrollbar-width:none]">
          {KATEGORIEN.map(kat => {
            const an = !nurGemerkt && filter.includes(kat);
            return (
              <Chip
                key={kat}
                an={an}
                punkt={an ? KAT_FARBE[kat] : '#3A312C'}
                onClick={() => toggle(kat)}
              >
                {KAT_LABEL[kat]}
              </Chip>
            );
          })}
          <Chip
            an={nurGemerkt}
            gold
            punkt={nurGemerkt ? '#F2C078' : '#3A312C'}
            onClick={() => setNurGemerkt(v => !v)}
          >
            Gemerkt · {merkliste.length}
          </Chip>
        </div>
      </div>

      <div className="absolute left-3 right-3 bottom-[22px] z-10 px-3.5 py-3 bg-holz-900/95 shadow-[inset_0_0_0_1px_#2A2320] rounded-kante text-xs leading-normal text-holz-400">
        Alles in der Altstadt, zu Fuß. Vom Hotel{' '}
        <span className="text-creme-100 font-medium">80 m zum Brauhaus</span>,{' '}
        <span className="text-creme-100 font-medium">350 m zum Rathausplatz</span>. ★ = Fixpunkte.
      </div>
    </div>
  );
}

function Chip({ an, gold = false, punkt, onClick, children }) {
  const farben = an
    ? gold
      ? 'bg-holz-800 text-licht-300 border-licht-500'
      : 'bg-holz-900 text-creme-100 border-holz-700'
    : 'bg-holz-950/80 text-holz-400 border-holz-800';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={an}
      className={`shrink-0 inline-flex items-center gap-1.5 min-h-[34px] px-3 border rounded-kante text-xs whitespace-nowrap ${farben}`}
    >
      <span className="w-[9px] h-[9px] rounded-full" style={{ backgroundColor: punkt }} />
      {children}
    </button>
  );
}
