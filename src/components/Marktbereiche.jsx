import { useState } from 'react';
import { MapPin, ExternalLink, Clock, Lightbulb } from 'lucide-react';
import { orteNachKategorie } from '../data/orte';
import Unbestaetigt from './Unbestaetigt';
import EssenTrinken from './EssenTrinken';

const ABSCHNITTE = [
  { id: 'bereiche', label: 'Bereiche' },
  { id: 'essen', label: 'Essen' },
  { id: 'aufwaermen', label: 'Aufwärmen' },
];

export default function Marktbereiche() {
  const [abschnitt, setAbschnitt] = useState('bereiche');
  const bereiche = orteNachKategorie('markt');

  return (
    <section className="px-4 py-8 max-w-lg mx-auto w-full">
      <h2 className="display text-3xl font-bold text-creme-100 mb-4 tracking-tight">Markt</h2>

      <div className="flex border border-holz-800 rounded-kante overflow-hidden mb-6">
        {ABSCHNITTE.map(a => (
          <button
            key={a.id}
            onClick={() => setAbschnitt(a.id)}
            className={`flex-1 py-2.5 px-2 text-sm font-medium transition-colors ${
              abschnitt === a.id
                ? 'bg-holz-900 text-creme-100'
                : 'bg-transparent text-holz-400 hover:text-creme-100'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {abschnitt === 'bereiche' && (
        <>
          <p className="text-holz-400 text-sm leading-relaxed mb-4">
            Der Markt ist kein einzelner Platz, sondern zieht sich vom Westerntor über die
            Westernstraße bis zum Dom. Rund 80 Stände verteilen sich über die ganze Innenstadt —
            man läuft also von selbst durch alles durch.
          </p>

          <Unbestaetigt className="mb-6">
            Öffnungszeiten und Marktgebiet für 2026 stammen von Portalseiten. Die Stadt Paderborn
            hatte zum Zeitpunkt der Erstellung noch die Angaben für 2025 online — vor der Fahrt
            nochmal gegenprüfen.
          </Unbestaetigt>

          <div className="space-y-3">
            {bereiche.map(b => (
              <div key={b.id} className="bg-holz-900/70 rounded-kante p-4">
                <h3 className="font-semibold text-creme-100 mb-1">{b.name}</h3>
                <p className="flex items-center gap-1.5 text-holz-400 text-xs mb-2">
                  <MapPin size={12} className="shrink-0" />
                  {b.adresse}
                </p>
                <p className="text-holz-300 text-sm leading-relaxed">{b.beschreibung}</p>
                {b.tipp && (
                  <p className="flex items-start gap-1.5 text-holz-300 text-sm mt-2 leading-relaxed">
                    <Lightbulb size={13} className="shrink-0 mt-0.5 text-licht-400" />
                    <span>{b.tipp}</span>
                  </p>
                )}
                <div className="flex items-center gap-3 flex-wrap mt-3">
                  {b.oeffnung && (
                    <span className="inline-flex items-center gap-1.5 text-holz-400 text-xs">
                      <Clock size={12} />
                      {b.oeffnung}
                    </span>
                  )}
                  <a
                    href={b.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-licht-500 hover:text-licht-400 text-xs transition-colors"
                  >
                    Auf Maps öffnen
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {abschnitt === 'essen' && <EssenTrinken teil="essen" />}
      {abschnitt === 'aufwaermen' && <EssenTrinken teil="aufwaermen" />}
    </section>
  );
}
