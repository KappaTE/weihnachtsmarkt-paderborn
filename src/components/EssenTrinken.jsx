import { ChevronRight } from 'lucide-react';
import { klassiker, aufwaermen } from '../data/essen';
import { useApp } from '../state/AppZustand';
import Unbestaetigt from './Unbestaetigt';

// Wird von Marktbereiche.jsx in zwei Teilen gerendert, damit der
// zusammengelegte Markt-Tab nicht zur endlosen Rolle wird.
export default function EssenTrinken({ teil = 'essen' }) {
  const { openOrt } = useApp();

  if (teil === 'aufwaermen') {
    return (
      <>
        <p className="text-[13.5px] leading-[1.45] text-nebel-400">
          Sechseinhalb Stunden draußen Ende November sind lang. Drei verlässlich warme Orte:
        </p>
        <div className="flex flex-col gap-2">
          {aufwaermen.map(a => (
            <button
              key={a.id}
              type="button"
              onClick={() => openOrt(a.ortId)}
              className="flex items-center gap-2 p-4 rounded-[18px] bg-nacht-900 hover:bg-nacht-850 text-left transition-colors"
            >
              <span className="flex-1 min-w-0 flex flex-col gap-[5px]">
                <h3 className="text-[17px] font-semibold leading-[1.15]">{a.titel}</h3>
                <p className="text-[13px] leading-[1.45] text-nebel-200 text-pretty">{a.text}</p>
              </span>
              <ChevronRight size={16} className="text-nacht-500 shrink-0" />
            </button>
          ))}
        </div>
      </>
    );
  }

  // Nummern statt Emojis — die Liste soll ruhig bleiben.
  return (
    <>
      <p className="text-[13.5px] leading-[1.45] text-nebel-400 text-pretty">
        Mittags bewusst nur kleine Portionen, sonst hat um 17:30 im Brauhaus niemand mehr
        Hunger. Im Stehen essen erspart die Platzsuche für 16.
      </p>

      <Unbestaetigt>
        Bewusst keine namentlichen Stände: Welcher Anbieter 2026 wo steht, ist nicht
        veröffentlicht. Die Liste sind die Klassiker westfälischer Weihnachtsmärkte.
      </Unbestaetigt>

      <ol className="flex flex-col list-none p-0 m-0">
        {klassiker.map((k, i) => (
          <li key={k.id} className="grid grid-cols-[34px_1fr] gap-x-1.5 gap-y-[3px] py-3 border-b border-nacht-850">
            <span className="zeit row-span-2 pt-0.5 text-xs text-birne-400">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-[15px] font-semibold">{k.name}</h3>
            <p className="text-[13px] leading-[1.4] text-nebel-400 text-pretty">{k.notiz}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
