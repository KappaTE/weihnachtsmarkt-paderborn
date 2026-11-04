import { Star } from 'lucide-react';
import { useApp } from '../state/AppZustand';

// Stern in Listenzeilen. Stoppt den Klick, damit die Zeile nicht zusätzlich das Sheet öffnet.
export default function MerkStern({ ortId, name }) {
  const { istGemerkt, toggleMerken } = useApp();
  const an = istGemerkt(ortId);

  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); toggleMerken(ortId); }}
      aria-label={an ? `${name} nicht mehr merken` : `${name} merken`}
      aria-pressed={an}
      className="w-11 h-11 shrink-0 flex items-center justify-center"
    >
      <Star
        size={18}
        strokeWidth={an ? 0 : 1.75}
        className={an ? 'fill-birne-400 drop-shadow-[0_0_6px_rgba(240,184,96,0.6)]' : 'text-nacht-500'}
      />
    </button>
  );
}
