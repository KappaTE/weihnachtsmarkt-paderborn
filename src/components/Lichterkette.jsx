import { ablauf } from '../data/ablauf';
import { istReisetag } from '../data/termine';

// Der Samstag als Lichterkette: eine Birne pro Stunde von 08 bis 22 Uhr, durchhängend wie
// eine echte Kette. Rot sind Stunden mit festem Termin, die aktuelle Stunde glüht,
// vergangene sind gedimmt, kommende nur als Umriss.
const ERSTE = 8;
const LETZTE = 22;
const STUNDEN = Array.from({ length: LETZTE - ERSTE + 1 }, (_, i) => ERSTE + i);
const FESTE = new Set(
  ablauf[0].stationen.filter(s => s.art === 'fix' && s.von != null).map(s => Math.floor(s.von / 60)),
);
const BESCHRIFTET = [8, 11, 14, 17, 22];

// Kette im 350×62-Raster des Entwurfs: quadratische Kurve von (8,6) über (173,50) nach (338,6).
const B = 350;
const punkt = (t) => ({
  x: (1 - t) ** 2 * 8 + 2 * (1 - t) * t * 173 + t ** 2 * 338,
  y: 6 + 88 * t * (1 - t),
});

export default function Lichterkette({ jetzt }) {
  const amTag = istReisetag(jetzt);
  const h = jetzt.getHours();
  // Vor dem Tag ist noch nichts vergangen, danach alles.
  const aktuell = amTag && h >= ERSTE && h <= LETZTE ? h : null;
  const vorbei = (stunde) => amTag && (h > LETZTE || stunde < h);
  const labels = [...new Set([...BESCHRIFTET, ...(aktuell != null ? [aktuell] : [])])];

  return (
    <div className="relative w-full h-[62px]" role="img" aria-label="Der Samstag von 8 bis 22 Uhr, eine Birne pro Stunde">
      <svg viewBox={`0 0 ${B} 40`} preserveAspectRatio="none" className="absolute inset-x-0 top-0 w-full h-10 overflow-visible" aria-hidden="true">
        <path d="M8 6 Q173 50 338 6" fill="none" stroke="#3A4250" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      {STUNDEN.map((stunde, i) => {
        const { x, y } = punkt(i / (STUNDEN.length - 1));
        const fest = FESTE.has(stunde);
        const links = `${(x / B) * 100}%`;
        const oben = y + 10;

        if (stunde === aktuell) {
          return (
            <span
              key={stunde}
              className="glimmen absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-birne-400 shadow-[0_0_0_4px_rgba(240,184,96,0.18),0_0_24px_6px_rgba(240,184,96,0.55)]"
              style={{ left: links, top: oben }}
            />
          );
        }
        if (vorbei(stunde)) {
          return (
            <span
              key={stunde}
              className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full ${fest ? 'bg-gluehwein-300 opacity-45' : 'bg-birne-400 opacity-35'}`}
              style={{ left: links, top: oben }}
            />
          );
        }
        return (
          <span
            key={stunde}
            className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full border-[1.5px] bg-nacht-950 ${fest ? 'border-gluehwein-300' : 'border-nacht-600'}`}
            style={{ left: links, top: oben }}
          />
        );
      })}

      {labels.map(stunde => {
        const { x } = punkt((stunde - ERSTE) / (STUNDEN.length - 1));
        const an = stunde === aktuell;
        return (
          <span
            key={`l${stunde}`}
            className={`zeit absolute -translate-x-1/2 text-[10px] ${an ? 'top-[50px] font-medium text-birne-400' : 'top-12 text-nebel-400'}`}
            style={{ left: `${(x / B) * 100}%` }}
          >
            {String(stunde).padStart(2, '0')}
          </span>
        );
      })}
    </div>
  );
}
