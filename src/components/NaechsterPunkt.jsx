import { naechsterTermin, restzeit, reisetag, fmtMinuten, minutenImTag } from '../data/termine';
import useJetzt from '../state/useJetzt';

// Zeigt, was als Nächstes ansteht. Vor der Fahrt die verbleibenden Tage,
// am Tag selbst den nächsten Fixpunkt mit Restzeit.
export default function NaechsterPunkt({ className = '' }) {
  const jetzt = useJetzt();
  const naechster = naechsterTermin(jetzt);
  if (!naechster) return null;

  if (jetzt < reisetag) {
    // Kalendertage zählen, nicht Millisekunden teilen — sonst springt die Zahl
    // je nach Uhrzeit um einen Tag.
    const heute = new Date(jetzt.getFullYear(), jetzt.getMonth(), jetzt.getDate());
    const tage = Math.round((reisetag - heute) / 86_400_000);
    return (
      <div className={`border-l-2 border-licht-500/50 pl-3 py-0.5 text-sm text-holz-300 ${className}`}>
        Noch <span className="text-licht-400 font-semibold">{tage} {tage === 1 ? 'Tag' : 'Tage'}</span> bis Paderborn
      </div>
    );
  }

  return (
    <div className={`border-l-2 border-gluehwein-500 pl-3 py-0.5 flex flex-col gap-0.5 ${className}`}>
      <span className="text-gluehwein-400 text-[11px] font-semibold uppercase tracking-[0.08em]">
        Als Nächstes · noch {restzeit(naechster.zeit, jetzt)}
      </span>
      <span className="text-creme-100 text-sm font-medium">
        {fmtMinuten(minutenImTag(naechster.zeit))} — {naechster.name}
      </span>
    </div>
  );
}
