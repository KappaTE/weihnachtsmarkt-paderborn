import { Moon } from 'lucide-react';
import { orteNachKategorie } from '../data/orte';
import { KAT_FARBE } from '../data/kategorien';
import { useApp } from '../state/AppZustand';
import MerkStern from './MerkStern';
import Punkt from './Punkt';
import Unbestaetigt from './Unbestaetigt';

// Der Markt schließt samstags um 22:00 — danach braucht es eine Anlaufstelle.
// Steht am Ende des Samstags, weil es dort chronologisch hingehört.
// Details und Route stecken im Sheet, die Liste bleibt dadurch kurz genug fürs Handy.
const GRUPPEN = [
  { id: 'sitzen', titel: 'Am einfachsten',    hinweis: 'Ihr sitzt schon dort, mit Tisch für alle.' },
  { id: 'nah',    titel: 'Um die Ecke',       hinweis: 'Unter 350 Meter. Nach dem Markt keine Diskussion wert.' },
  { id: 'weiter', titel: 'Ein Stück weiter',  hinweis: 'Fünf bis zehn Minuten zu Fuß, dafür mehr Auswahl.' },
  { id: 'spaet',  titel: 'Wenn es spät wird', hinweis: 'Clubs. Machen erst auf, wenn der Markt zumacht — nicht für alle das Richtige.' },
];

export default function BarListe({ className = '' }) {
  const { openOrt } = useApp();
  const bars = orteNachKategorie('bar');

  return (
    <div className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex flex-col gap-2.5">
        <h3 className="flex items-center gap-[9px] text-[26px] font-bold leading-none tracking-[-0.02em]">
          <Moon size={20} className="text-birne-400" />
          Nach 22 Uhr
        </h3>
        <p className="text-[13.5px] leading-[1.45] text-nebel-400 text-pretty">
          Wenn der Markt schließt, ist der Abend nicht zwingend vorbei. Alles fußläufig,
          sortiert nach Entfernung vom Hotel.
        </p>
      </div>

      <Unbestaetigt>
        Zeiten aus OpenStreetMap, gelten für Samstag. Für 14 Erwachsene findet sich selten
        Platz für alle. Besser auf zwei Läden aufteilen und vorher anrufen.
      </Unbestaetigt>

      {GRUPPEN.map(g => {
        const drin = bars.filter(b => b.gruppe === g.id);
        if (drin.length === 0) return null;
        return (
          <section key={g.id} className="flex flex-col gap-1">
            <h4 className="zeit text-[11px] font-medium uppercase tracking-[0.08em] text-birne-400">{g.titel}</h4>
            <p className="text-[12.5px] text-nebel-400">{g.hinweis}</p>
            <div className="flex flex-col">
              {drin.map(b => (
                <div key={b.id} className="flex items-center gap-3 min-h-14 border-b border-nacht-850">
                  <button
                    type="button"
                    onClick={() => openOrt(b.id)}
                    className="flex-1 min-w-0 flex items-center gap-3 py-2 text-left"
                  >
                    <Punkt farbe={KAT_FARBE.bar} />
                    <span className="flex-1 min-w-0 flex flex-col gap-[3px]">
                      <span className="text-[15px] font-semibold">{b.name}</span>
                      <span className="zeit text-[11.5px] text-nebel-400">
                        {[b.oeffnung, b.entfernung].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                  </button>
                  <MerkStern ortId={b.id} name={b.name} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
