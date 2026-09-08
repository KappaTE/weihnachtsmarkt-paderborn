import { Moon, Clock, MapPin, Lightbulb } from 'lucide-react';
import { orteNachKategorie } from '../data/orte';
import NaviButton from './NaviButton';
import Unbestaetigt from './Unbestaetigt';

// Der Markt schließt samstags um 22:00 — danach braucht es eine Anlaufstelle.
// Steht am Ende des Samstags, weil es dort chronologisch hingehört.
const GRUPPEN = [
  { id: 'nah',    titel: 'Um die Ecke',      hinweis: 'Unter 350 Meter — nach dem Markt keine Diskussion wert.' },
  { id: 'weiter', titel: 'Ein Stück weiter', hinweis: 'Fünf bis zehn Minuten zu Fuß, dafür mehr Auswahl.' },
  { id: 'spaet',  titel: 'Wenn es spät wird', hinweis: 'Clubs — machen erst auf, wenn der Markt zumacht. Nicht für alle das Richtige.' },
];

export default function BarListe({ className = '' }) {
  const bars = orteNachKategorie('bar');
  const sitzen = bars.filter(b => b.gruppe === 'sitzen');

  return (
    <div className={className}>
      <h3 className="display flex items-center gap-2 text-2xl font-bold text-creme-100 mb-2 tracking-tight">
        <Moon size={19} className="text-licht-400" />
        Nach 22 Uhr
      </h3>
      <p className="text-holz-400 text-sm leading-relaxed mb-4 max-w-prose">
        Wenn der Markt schließt, ist der Abend nicht zwingend vorbei. Alles hier liegt
        fußläufig, sortiert nach Entfernung vom Hotel.
      </p>

      <Unbestaetigt className="mb-6">
        Öffnungszeiten stammen aus OpenStreetMap und gelten für Samstag. Für 14 Erwachsene
        findet sich selten ein Laden mit Platz für alle — teilt euch besser auf zwei auf und
        ruft vorher an.
      </Unbestaetigt>

      {sitzen.map(b => (
        <Eintrag key={b.id} ort={b} className="mb-8" />
      ))}

      {GRUPPEN.map(g => {
        const drin = bars.filter(b => b.gruppe === g.id);
        if (drin.length === 0) return null;
        const kompakt = g.id === 'spaet';
        return (
          <section key={g.id} className="mb-8">
            <h4 className="zeit text-licht-400 text-xs uppercase tracking-[0.15em] mb-1">
              {g.titel}
            </h4>
            <p className="text-holz-400 text-xs leading-relaxed mb-3">{g.hinweis}</p>
            <div className={kompakt ? 'divide-y divide-holz-800 border-y border-holz-800' : 'space-y-3'}>
              {drin.map(b =>
                kompakt
                  ? <Zeile key={b.id} ort={b} />
                  : <Eintrag key={b.id} ort={b} />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Eintrag({ ort, className = '' }) {
  return (
    <div className={`bg-holz-900 rounded-kante p-4 ${className}`}>
      <div className="flex items-start justify-between gap-3 mb-1">
        <h5 className="display font-semibold text-creme-100">{ort.name}</h5>
        {ort.entfernung && (
          <span className="zeit text-holz-400 text-xs shrink-0">{ort.entfernung}</span>
        )}
      </div>
      <p className="flex items-center gap-1.5 text-holz-400 text-xs mb-2">
        <MapPin size={12} className="shrink-0" />
        {ort.adresse}
      </p>
      {ort.beschreibung && (
        <p className="text-holz-300 text-sm leading-relaxed">{ort.beschreibung}</p>
      )}
      {ort.tipp && (
        <p className="flex items-start gap-1.5 text-holz-300 text-sm mt-2 leading-relaxed">
          <Lightbulb size={13} className="shrink-0 mt-0.5 text-licht-400" />
          <span>{ort.tipp}</span>
        </p>
      )}
      <div className="flex items-center gap-3 flex-wrap mt-3">
        {ort.oeffnung && (
          <span className="inline-flex items-center gap-1.5 text-holz-400 text-xs">
            <Clock size={12} />
            <span className="zeit">{ort.oeffnung}</span>
          </span>
        )}
        <NaviButton ort={ort} label="Route" />
      </div>
    </div>
  );
}

// Kompakte Zeile für die Clubs — sonst wird der Abschnitt auf dem Handy zu lang.
function Zeile({ ort }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="text-creme-100 text-sm font-medium">{ort.name}</p>
        <p className="zeit text-holz-400 text-xs mt-0.5">
          {ort.oeffnung} · {ort.entfernung}
        </p>
      </div>
      <NaviButton ort={ort} label="Route" />
    </div>
  );
}
