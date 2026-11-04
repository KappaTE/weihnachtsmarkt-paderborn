import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { ChevronRight } from 'lucide-react';
import { orte, getOrtById } from '../data/orte';
import { KATEGORIEN, KAT_FARBE, FILTER } from '../data/kategorien';
import { useApp } from '../state/AppZustand';
import Punkt from './Punkt';

// Fix Leaflet default icon — ohne diesen Block sind alle Pins unsichtbar.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Pins als Birnen: Fixpunkte groß und rot, Markt mittel, Bars klein, Parken als graues „P“.
// Die Tippfläche ist immer 32 px groß, auch wenn der Punkt selbst kleiner ist.
const GROESSE = { hotel: 18, restaurant: 18, markt: 12, bar: 8 };

function makePin(kategorie, gemerkt, gewaehlt) {
  const farbe = KAT_FARBE[kategorie];
  // Gemerkte Orte bekommen einen hellen Ring mit dunklem Spalt.
  const ring = gemerkt ? '0 0 0 2px #0C0F14,0 0 0 3.5px #FFE3B0' : null;
  let innen;
  if (kategorie === 'parken') {
    innen = `<span style="width:16px;height:16px;border-radius:5px;background:#283040;display:flex;align-items:center;justify-content:center;font:700 9px 'Schibsted Grotesk',sans-serif;color:#8C95A3;box-shadow:${ring ?? 'none'}">P</span>`;
  } else {
    const fest = kategorie === 'hotel' || kategorie === 'restaurant';
    const g = gewaehlt ? 22 : GROESSE[kategorie];
    const schein = gewaehlt
      ? `0 0 0 4px ${farbe}40,0 0 28px 8px ${farbe}8C`
      : `0 0 ${fest ? 16 : g + 4}px ${farbe}B3`;
    const rand = fest && !gewaehlt ? 'border:2px solid #0C0F14;' : '';
    innen = `<span style="width:${g}px;height:${g}px;border-radius:50%;background:${farbe};${rand}box-sizing:border-box;box-shadow:${[ring, schein].filter(Boolean).join(',')}"></span>`;
  }
  const html = `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center">${innen}</div>`;
  return L.divIcon({ html, className: '', iconSize: [32, 32], iconAnchor: [16, 16] });
}

// Unterkante des Merklisten-Panels: über der schwebenden Navigation.
const PANEL_UNTEN = 'calc(max(16px, calc(env(safe-area-inset-bottom) - 6px)) + 78px)';

export default function Karte() {
  const { merkliste, openOrt, sheet, sheetOffen } = useApp();
  const [filter, setFilter] = useState(FILTER.map(f => f.id));
  const [nurGemerkt, setNurGemerkt] = useState(false);
  const gewaehlt = sheetOffen && sheet?.typ === 'ort' ? sheet.ortId : null;

  const sichtbareKategorien = FILTER.filter(f => filter.includes(f.id)).flatMap(f => f.kategorien);

  // Orte an derselben Stelle (Brauhaus als Bar, Parkhaus unter der Libori-Galerie)
  // nur einmal zeichnen — sonst liegen zwei Pins übereinander und nur einer ist tippbar.
  const gesehen = new Set();
  const sichtbar = orte
    .filter(o => KATEGORIEN.includes(o.kategorie))
    .filter(o => (nurGemerkt ? merkliste.includes(o.id) : sichtbareKategorien.includes(o.kategorie)))
    .filter(o => {
      const k = `${o.lat},${o.lng}`;
      if (gesehen.has(k) && !o.fixpunkt) return false;
      gesehen.add(k);
      return true;
    });

  const toggle = (id) => {
    setNurGemerkt(false);
    setFilter(f => (nurGemerkt ? [id] : f.includes(id) ? f.filter(x => x !== id) : [...f, id]));
  };

  return (
    <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-nacht-950">
      <div className="absolute inset-0 z-0 isolate">
        <MapContainer
          center={[51.7188, 8.7530]}
          zoom={15}
          zoomControl={false}
          attributionControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
          {sichtbar.map(o => (
            <Marker
              key={o.id}
              position={[o.lat, o.lng]}
              icon={makePin(o.kategorie, merkliste.includes(o.id), o.id === gewaehlt)}
              zIndexOffset={o.id === gewaehlt ? 2000 : o.fixpunkt ? 1000 : 0}
              title={o.name}
              keyboard
              eventHandlers={{ click: () => openOrt(o.id) }}
            />
          ))}
        </MapContainer>
      </div>

      <div className="absolute top-0 inset-x-0 z-10 pb-[30px] bg-[linear-gradient(#0C0F14_60%,transparent)] pointer-events-none">
        <div className="px-5 pt-[calc(14px+env(safe-area-inset-top))] flex flex-col gap-3">
          <h2 className="text-[34px] font-bold leading-none tracking-[-0.02em]">Karte</h2>
          <div className="ohne-scrollbar flex gap-1.5 overflow-x-auto -mx-5 px-5 pointer-events-auto">
            {FILTER.map(f => {
              const an = !nurGemerkt && filter.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => toggle(f.id)}
                  aria-pressed={an}
                  className={`shrink-0 flex items-center gap-1.5 px-[11px] py-[7px] rounded-full border border-nacht-650 text-[12.5px] whitespace-nowrap ${
                    an ? 'bg-nacht-850 text-schnee' : 'text-nebel-400'
                  }`}
                >
                  {an && (
                    <span
                      className={`w-[7px] h-[7px] ${f.eckig ? 'rounded-[2px]' : 'rounded-full'}`}
                      style={{ backgroundColor: f.farbe }}
                    />
                  )}
                  {f.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setNurGemerkt(v => !v)}
              aria-pressed={nurGemerkt}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-[7px] rounded-full text-[12.5px] whitespace-nowrap ${
                nurGemerkt ? 'bg-birne-400 text-birne-ink font-semibold' : 'border border-nacht-650 text-nebel-400'
              }`}
            >
              ★ Gemerkt
            </button>
          </div>
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="zeit self-end text-[10px] text-nebel-400 pointer-events-auto"
          >
            © OpenStreetMap-Mitwirkende
          </a>
        </div>
      </div>

      {nurGemerkt && <GemerktPanel ids={merkliste} onOpen={openOrt} />}
    </div>
  );
}

function GemerktPanel({ ids, onOpen }) {
  const liste = ids.map(getOrtById).filter(o => o && KATEGORIEN.includes(o.kategorie));
  return (
    <div
      className="absolute left-3 right-3 z-10 max-h-[45vh] overflow-y-auto px-4 pt-3.5 pb-1 rounded-3xl bg-nacht-900/96 border border-nacht-650 flex flex-col gap-2.5"
      style={{ bottom: PANEL_UNTEN }}
    >
      <div className="flex items-baseline justify-between">
        <span className="flex items-center gap-2">
          <span className="text-[17px] font-semibold">Gemerkt</span>
          <span className="zeit px-[7px] py-0.5 rounded-full bg-nacht-850 text-[11px] font-medium text-birne-400">{liste.length}</span>
        </span>
        <span className="zeit text-[10.5px] text-nebel-400">nur auf diesem Handy</span>
      </div>
      {liste.length === 0 ? (
        <p className="pb-3 text-[13px] leading-relaxed text-nebel-400">
          Noch nichts gemerkt. Tippe in den Listen oder in der Detailansicht auf den Stern.
        </p>
      ) : (
        <div className="flex flex-col">
          {liste.map(o => (
            <button
              key={o.id}
              type="button"
              onClick={() => onOpen(o.id)}
              className="flex items-center gap-3 min-h-[50px] border-t border-nacht-800 text-left"
            >
              <Punkt farbe={KAT_FARBE[o.kategorie]} />
              <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold">{o.name}</span>
                <span className="zeit text-[11.5px] text-nebel-400">
                  {[o.oeffnung, o.entfernung].filter(Boolean).join(' · ') || o.adresse}
                </span>
              </span>
              <ChevronRight size={16} className="text-nacht-500 shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
