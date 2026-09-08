import { useEffect, useState } from 'react';
import { Clock, CalendarCheck } from 'lucide-react';
import { naechsterTermin, restzeit, uhrzeit, reisetag } from '../data/termine';

// Zeigt, was als Nächstes ansteht. Vor der Fahrt die verbleibenden Tage,
// am Tag selbst den nächsten Fixpunkt mit Restzeit.
export default function NaechsterPunkt({ className = '' }) {
  const [jetzt, setJetzt] = useState(() => new Date());

  useEffect(() => {
    // Minütlich reicht — die Anzeige ist auf Minuten genau.
    const id = setInterval(() => setJetzt(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const naechster = naechsterTermin(jetzt);
  if (!naechster) return null;

  const rest = restzeit(naechster.zeit, jetzt);
  const istReisetag = jetzt >= reisetag;

  if (!istReisetag) {
    // Kalendertage zählen, nicht Millisekunden teilen — sonst springt die Zahl
    // je nach Uhrzeit um einen Tag.
    const heute = new Date(jetzt.getFullYear(), jetzt.getMonth(), jetzt.getDate());
    const tage = Math.round((reisetag - heute) / 86_400_000);
    return (
      <div className={`flex items-center gap-3 border-l-2 border-licht-500/50 pl-3 py-1 ${className}`}>
        <CalendarCheck size={18} className="text-licht-400 shrink-0" />
        <p className="text-sm text-holz-300">
          Noch <span className="text-licht-400 font-semibold">{tage} {tage === 1 ? 'Tag' : 'Tage'}</span> bis Paderborn
        </p>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 border-l-2 border-gluehwein-500 pl-3 py-1 ${className}`}>
      <Clock size={18} className="text-gluehwein-400 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-gluehwein-400 text-[11px] font-semibold uppercase tracking-wider mb-0.5">
          Als Nächstes · noch {rest}
        </p>
        <p className="text-creme-100 text-sm font-medium">
          {uhrzeit(naechster.zeit)} — {naechster.name}
        </p>
        <p className="text-holz-400 text-xs">{naechster.ort}</p>
      </div>
    </div>
  );
}
