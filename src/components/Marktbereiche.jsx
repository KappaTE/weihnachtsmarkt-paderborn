import { useState } from 'react';
import { orteNachKategorie } from '../data/orte';
import { marktzeiten, marktfakten, offizielleSeite, pressemitteilung } from '../data/markt';
import { useApp } from '../state/AppZustand';
import MerkStern from './MerkStern';
import Segmente from './Segmente';
import Unbestaetigt from './Unbestaetigt';
import EssenTrinken from './EssenTrinken';
import Verweis from './Verweis';

const ABSCHNITTE = [
  { id: 'bereiche', label: 'Bereiche' },
  { id: 'essen', label: 'Essen' },
  { id: 'aufwaermen', label: 'Aufwärmen' },
  { id: 'programm', label: 'Programm' },
];

export default function Marktbereiche() {
  const [abschnitt, setAbschnitt] = useState('bereiche');

  return (
    <section className="px-5 pt-[calc(14px+env(safe-area-inset-top))] flex flex-col gap-3.5">
      <h2 className="text-[34px] font-bold leading-none tracking-[-0.02em]">Markt</h2>
      <Segmente label="Abschnitt" optionen={ABSCHNITTE} aktiv={abschnitt} onWahl={setAbschnitt} breit />

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
    <>
      <p className="text-[13.5px] leading-[1.45] text-nebel-400 text-pretty">
        Kein einzelner Platz: Der Markt zieht sich vom Westerntor über die Westernstraße bis
        zum Dom. Rund 80 Stände, man läuft von selbst durch alles durch.
      </p>

      <Unbestaetigt>
        Zeitraum, Öffnungszeiten und Marktgebiet 2026 hat die Stadt bestätigt. Rund 80 Stände
        von Westernstraße bis Domplatz, dazu neu die Winter-Plaza.
      </Unbestaetigt>

      <div className="flex flex-col gap-2">
        {bereiche.map(b => (
          <div key={b.id} className="flex gap-1.5 pl-4 pr-1.5 py-3.5 rounded-[18px] bg-nacht-900 hover:bg-nacht-850 transition-colors">
            <button
              type="button"
              onClick={() => openOrt(b.id)}
              className="flex-1 min-w-0 flex flex-col gap-[5px] text-left"
            >
              <h3 className="text-[17px] font-semibold leading-[1.15]">{b.name}</h3>
              <p className="text-[13px] leading-[1.45] text-nebel-200 text-pretty">{b.beschreibung}</p>
              <p className="zeit text-[11px] text-nebel-400">{b.oeffnung || 'überdacht · Toiletten'}</p>
            </button>
            <MerkStern ortId={b.id} name={b.name} />
          </div>
        ))}
      </div>
    </>
  );
}

function Programm() {
  return (
    <>
      <div className="flex flex-col">
        {marktzeiten.map(m => (
          <div key={m.tag} className="flex items-baseline justify-between gap-3 py-3.5 border-b border-nacht-850">
            <span className="text-[15px]">{m.tag}</span>
            <span className="zeit shrink-0 text-sm font-medium text-birne-400">{m.zeiten}</span>
          </div>
        ))}
      </div>

      <Unbestaetigt>
        Einen Konzertplan mit einzelnen Terminen hat die Stadt nicht veröffentlicht. Bestätigt
        ist nur, dass freitags und samstags kostenlos Live-Musik läuft — wer am 28.11. spielt,
        steht nirgends. Daher nichts geraten.
      </Unbestaetigt>

      <div className="flex flex-col gap-2">
        {marktfakten.map(f => (
          <div key={f.titel} className="flex flex-col gap-1 p-4 rounded-[18px] bg-nacht-900">
            <h3 className="text-[17px] font-semibold leading-[1.15]">{f.titel}</h3>
            <p className="text-[13px] leading-[1.45] text-nebel-200 text-pretty">{f.text}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Verweis href={pressemitteilung}>Pressemitteilung der Stadt zum Markt 2026</Verweis>
        <Verweis href={offizielleSeite}>Weihnachtsmarkt-Seite der Stadt</Verweis>
      </div>
    </>
  );
}

