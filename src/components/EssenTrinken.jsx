import { klassiker, aufwaermen } from '../data/essen';
import { useApp } from '../state/AppZustand';
import Unbestaetigt from './Unbestaetigt';

// Wird von Marktbereiche.jsx in zwei Teilen gerendert, damit der
// zusammengelegte Markt-Tab nicht zur endlosen Rolle wird.
export default function EssenTrinken({ teil = 'essen' }) {
  const { openOrt } = useApp();

  if (teil === 'aufwaermen') {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-holz-400 text-sm leading-relaxed mb-1">
          Sechseinhalb Stunden draußen Ende November sind lang. Zwei verlässlich warme Orte:
        </p>
        {aufwaermen.map(a => (
          <button
            key={a.id}
            type="button"
            onClick={() => openOrt(a.ortId)}
            className="flex flex-col gap-1.5 p-4 bg-holz-900/70 hover:bg-holz-900 rounded-kante text-left transition-colors"
          >
            <h4 className="display text-[17px] font-semibold leading-tight text-creme-100">{a.titel}</h4>
            <p className="text-[13px] leading-relaxed text-holz-300">{a.text}</p>
            <span className="mt-0.5 text-xs text-licht-500">Ort ansehen →</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-holz-400 text-sm leading-relaxed text-pretty">
        Mittags bewusst nur kleine Portionen an den Ständen — sonst hat um 17:30 im Brauhaus
        niemand mehr Hunger. Im Stehen essen spart außerdem das Problem, für 16 Leute
        gleichzeitig Sitzplätze zu finden.
      </p>

      <Unbestaetigt>
        Bewusst keine namentlichen Stände: welcher Anbieter 2026 wo steht, ist nicht
        veröffentlicht. Die Liste sind die Klassiker, die es auf jedem westfälischen
        Weihnachtsmarkt gibt.
      </Unbestaetigt>

      <div className="flex flex-col border-t border-holz-800">
        {klassiker.map(k => (
          <div key={k.id} className="flex items-start gap-3.5 py-3.5 border-b border-holz-800">
            <span className="w-7 shrink-0 text-center text-2xl leading-none" aria-hidden="true">{k.emoji}</span>
            <div className="min-w-0 flex flex-col gap-[3px]">
              <h3 className="text-sm font-semibold text-creme-100">{k.name}</h3>
              <p className="text-[13px] leading-normal text-holz-400">{k.notiz}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
