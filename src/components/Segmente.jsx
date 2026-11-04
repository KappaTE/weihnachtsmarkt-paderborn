// Pillen-Umschalter (Samstag/Sonntag, Markt-Abschnitte). `breit` verteilt die Pillen
// auf die ganze Zeile, sonst nehmen sie nur so viel Platz wie ihr Text.
export default function Segmente({ optionen, aktiv, onWahl, breit = false, label }) {
  return (
    <div role="tablist" aria-label={label} className={`flex p-1 rounded-full bg-nacht-900 ${breit ? 'w-full' : ''}`}>
      {optionen.map(o => {
        const an = o.id === aktiv;
        return (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={an}
            onClick={() => onWahl(o.id)}
            className={`rounded-full text-[13px] transition-colors ${breit ? 'flex-1 py-2' : 'px-3.5 py-[7px]'} ${
              an ? 'bg-nacht-700 font-semibold text-schnee' : 'text-nebel-400 hover:text-schnee'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
