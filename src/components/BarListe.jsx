import { Moon } from 'lucide-react';
import { orteNachKategorie } from '../data/orte';
import { useApp } from '../state/AppZustand';
import MerkStern from './MerkStern';
import Unbestaetigt from './Unbestaetigt';

// Der Markt schließt samstags um 22:00 — danach braucht es eine Anlaufstelle.
// Steht am Ende des Samstags, weil es dort chronologisch hingehört.
// Details und Route stecken im Sheet, die Liste bleibt dadurch kurz genug fürs Handy.
const GRUPPEN = [
  { id: 'sitzen', titel: 'Am einfachsten',    hinweis: 'Ihr sitzt schon dort — mit Tisch für alle.' },
  { id: 'nah',    titel: 'Um die Ecke',       hinweis: 'Unter 350 Meter — nach dem Markt keine Diskussion wert.' },
  { id: 'weiter', titel: 'Ein Stück weiter',  hinweis: 'Fünf bis zehn Minuten zu Fuß, dafür mehr Auswahl.' },
  { id: 'spaet',  titel: 'Wenn es spät wird', hinweis: 'Clubs — machen erst auf, wenn der Markt zumacht. Nicht für alle das Richtige.' },
];

export default function BarListe({ className = '' }) {
  const { openOrt } = useApp();
  const bars = orteNachKategorie('bar');

  return (
    <div className={`flex flex-col gap-3.5 ${className}`}>
      <h3 className="display flex items-center gap-2 text-2xl font-bold text-creme-100 tracking-tight leading-tight">
        <Moon size={19} className="text-licht-400" />
        Nach 22 Uhr
      </h3>
      <p className="text-holz-400 text-sm leading-relaxed">
        Wenn der Markt schließt, ist der Abend nicht zwingend vorbei. Alles hier liegt
        fußläufig, sortiert nach Entfernung vom Hotel.
      </p>

      <Unbestaetigt>
        Öffnungszeiten stammen aus OpenStreetMap und gelten für Samstag. Für 14 Erwachsene
        findet sich selten ein Laden mit Platz für alle — teilt euch besser auf zwei auf und
        ruft vorher an.
      </Unbestaetigt>

      {GRUPPEN.map(g => {
        const drin = bars.filter(b => b.gruppe === g.id);
        if (drin.length === 0) return null;
        return (
          <section key={g.id} className="flex flex-col gap-1.5 mt-2.5">
            <h4 className="zeit text-licht-400 text-[11px] uppercase tracking-[0.15em]">{g.titel}</h4>
            <p className="text-holz-400 text-xs leading-relaxed mb-1">{g.hinweis}</p>
            <div className="flex flex-col border-t border-holz-800">
              {drin.map(b => (
                <div
                  key={b.id}
                  className="flex items-center gap-2.5 min-h-14 py-2 border-b border-holz-800"
                >
                  <button
                    type="button"
                    onClick={() => openOrt(b.id)}
                    className="flex-1 min-w-0 flex flex-col gap-[3px] text-left"
                  >
                    <span className="text-sm font-medium text-creme-100">{b.name}</span>
                    <span className="zeit text-[11px] leading-snug text-holz-400">
                      {[b.oeffnung, b.entfernung].filter(Boolean).join(' · ')}
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
