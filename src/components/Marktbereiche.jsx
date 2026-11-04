import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { orteNachKategorie } from '../data/orte';
import { marktzeiten, marktfakten, offizielleSeite, programmSeite } from '../data/markt';
import { useApp } from '../state/AppZustand';
import MerkStern from './MerkStern';
import Unbestaetigt from './Unbestaetigt';
import EssenTrinken from './EssenTrinken';

const ABSCHNITTE = [
  { id: 'bereiche', label: 'Bereiche' },
  { id: 'essen', label: 'Essen' },
  { id: 'aufwaermen', label: 'Aufwärmen' },
  { id: 'programm', label: 'Programm' },
];

export default function Marktbereiche() {
  const [abschnitt, setAbschnitt] = useState('bereiche');

  return (
    <section className="px-[18px] pt-[22px] pb-10">
      <h2 className="display text-[32px] font-bold text-creme-100 mb-4 tracking-tight leading-tight">Markt</h2>

      <div className="flex border border-holz-800 rounded-kante overflow-hidden mb-5">
        {ABSCHNITTE.map(a => (
          <button
            key={a.id}
            onClick={() => setAbschnitt(a.id)}
            className={`flex-1 min-h-[42px] px-1 text-[13px] font-medium transition-colors ${
              abschnitt === a.id
                ? 'bg-holz-900 text-creme-100'
                : 'bg-transparent text-holz-400 hover:text-creme-100'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {abschnitt === 'bereiche' && <Bereiche />}
      {abschnitt === 'essen' && <EssenTrinken teil="essen" />}
      {abschnitt === 'aufwaermen' && <EssenTrinken teil="aufwaermen" />}
      {abschnitt === 'programm' && <Programm />}
    </section>
  );
}

function Bereiche() {
  const { openOrt } = useApp();
  const bereiche = orteNachKategorie('markt');

  return (
    <div className="flex flex-col gap-4">
      <p className="text-holz-400 text-sm leading-relaxed text-pretty">
        Der Markt ist kein einzelner Platz, sondern zieht sich vom Westerntor über die
        Westernstraße bis zum Dom. Rund 80 Stände verteilen sich über die ganze Innenstadt —
        man läuft also von selbst durch alles durch.
      </p>

      <Unbestaetigt>
        Zeitraum und Öffnungszeiten 2026 hat die Stadt bestätigt. Welche Plätze genau zum
        Markt gehören, stammt dagegen aus Portalangaben und dem Vorjahr.
      </Unbestaetigt>

      <div className="flex flex-col gap-2">
        {bereiche.map(b => (
          <div key={b.id} className="flex gap-1 pl-4 pr-1 py-3.5 bg-holz-900/70 hover:bg-holz-900 rounded-kante transition-colors">
            <button
              type="button"
              onClick={() => openOrt(b.id)}
              className="flex-1 min-w-0 flex flex-col gap-[5px] text-left"
            >
              <h3 className="display text-[17px] font-semibold leading-tight text-creme-100">{b.name}</h3>
              <p className="text-[13px] leading-normal text-holz-300 text-pretty">{b.beschreibung}</p>
              <p className="zeit mt-0.5 text-[11px] leading-snug text-holz-400">
                {b.oeffnung || 'überdacht · Toiletten'}
              </p>
            </button>
            <MerkStern ortId={b.id} name={b.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Programm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col border-t border-holz-800">
        {marktzeiten.map(m => (
          <div key={m.tag} className="flex items-baseline justify-between gap-3 py-3.5 border-b border-holz-800">
            <span className="text-sm text-creme-100">{m.tag}</span>
            <span className="zeit text-sm font-medium text-licht-400 shrink-0">{m.zeiten}</span>
          </div>
        ))}
      </div>

      <Unbestaetigt>
        Bühnenprogramm und Konzerte für 2026 hat die Stadt noch nicht veröffentlicht — laut
        ihrer Seite „folgt in Kürze“. Sobald es online ist, kommt es hierher. Bis dahin wird
        nichts geraten.
      </Unbestaetigt>

      <div className="flex flex-col gap-2">
        {marktfakten.map(f => (
          <div key={f.titel} className="flex flex-col gap-1 p-4 bg-holz-900/70 rounded-kante">
            <h3 className="display text-[17px] font-semibold leading-tight text-creme-100">{f.titel}</h3>
            <p className="text-[13px] leading-relaxed text-holz-300">{f.text}</p>
          </div>
        ))}
      </div>

      <a
        href={programmSeite}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3.5 bg-holz-900/60 hover:bg-holz-900 rounded-kante transition-colors"
      >
        <span className="flex-1 text-sm text-creme-100">Programmseite der Stadt</span>
        <ExternalLink size={13} className="text-holz-400 shrink-0" />
      </a>

      <a
        href={offizielleSeite}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3.5 bg-holz-900/60 hover:bg-holz-900 rounded-kante transition-colors"
      >
        <span className="flex-1 text-sm text-creme-100">Offizielle Seite der Stadt</span>
        <ExternalLink size={13} className="text-holz-400 shrink-0" />
      </a>
    </div>
  );
}
