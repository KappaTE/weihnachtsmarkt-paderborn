import { ExternalLink } from 'lucide-react';
import { klassiker, aufwaermen } from '../data/essen';
import { getOrtById } from '../data/orte';
import Unbestaetigt from './Unbestaetigt';

// Wird von Marktbereiche.jsx in zwei Teilen gerendert, damit der
// zusammengelegte Markt-Tab nicht zur endlosen Rolle wird.
export default function EssenTrinken({ teil = 'essen' }) {
  if (teil === 'aufwaermen') {
    return (
      <>
        <p className="text-holz-400 text-sm leading-relaxed mb-4">
          Sechseinhalb Stunden draußen Ende November sind lang. Zwei verlässlich warme Orte:
        </p>
        <div className="space-y-3">
          {aufwaermen.map(a => {
            const ort = getOrtById(a.ortId);
            return (
              <div key={a.id} className="bg-holz-900/70 rounded-kante p-4">
                <h4 className="font-semibold text-creme-100 mb-1">{a.titel}</h4>
                <p className="text-holz-300 text-sm leading-relaxed">{a.text}</p>
                {ort?.mapsLink && (
                  <a
                    href={ort.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-licht-500 hover:text-licht-400 text-xs mt-2 transition-colors"
                  >
                    Auf Maps öffnen
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <p className="text-holz-400 text-sm leading-relaxed mb-4">
        Mittags bewusst nur kleine Portionen an den Ständen — sonst hat um 17:30 im Brauhaus
        niemand mehr Hunger. Im Stehen essen spart außerdem das Problem, für 16 Leute
        gleichzeitig Sitzplätze zu finden.
      </p>

      <Unbestaetigt className="mb-6">
        Bewusst keine namentlichen Stände: welcher Anbieter 2026 wo steht, ist nicht
        veröffentlicht. Die Liste sind die Klassiker, die es auf jedem westfälischen
        Weihnachtsmarkt gibt.
      </Unbestaetigt>

      <div className="grid grid-cols-1 gap-2">
        {klassiker.map(k => (
          <div key={k.id} className="flex items-start gap-3 bg-holz-900/70 rounded-kante px-4 py-3">
            <span className="text-2xl shrink-0 leading-none mt-0.5">{k.emoji}</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-creme-100 text-sm">{k.name}</h3>
              <p className="text-holz-400 text-sm mt-0.5 leading-relaxed">{k.notiz}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
