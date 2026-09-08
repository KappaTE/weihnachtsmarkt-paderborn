import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { getOrtById } from '../data/orte';
import { minutenImTag, istReisetag } from '../data/termine';
import NaviButton from './NaviButton';

// Höhe pro Stunde. Bestimmt, wie stark sich lange Lücken im Layout durchsetzen —
// der Inhalt darf ein Segment größer machen, aber nie kleiner als seine Dauer.
const PX_PRO_STUNDE = 58;

const dauerHoehe = (s) =>
  s.von != null && s.bis != null ? ((s.bis - s.von) / 60) * PX_PRO_STUNDE : undefined;

// "4 Std", "2½ Std", "30 Min" — macht die Länge einer Lücke explizit lesbar.
function dauerText(s) {
  if (s.von == null || s.bis == null) return null;
  const min = s.bis - s.von;
  if (min < 60) return `${min} Min`;
  const std = Math.floor(min / 60);
  const rest = min % 60;
  if (rest === 0) return `${std} Std`;
  if (rest === 30) return `${std}½ Std`;
  return `${std} Std ${rest}`;
}

export default function Zeitachse({ tag }) {
  const [jetzt, setJetzt] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setJetzt(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const amTag = istReisetag(jetzt);
  const jetztMin = minutenImTag(jetzt);

  // Genau ein Abschnitt trägt den Jetzt-Marker: der letzte, der bereits begonnen hat.
  // Ohne diese Einschränkung wären alle vergangenen Punkte gleichzeitig markiert,
  // weil ein Punkt kein `bis` hat.
  let aktiverIndex = -1;
  if (amTag) {
    tag.stationen.forEach((s, i) => {
      if (s.von != null && s.von <= jetztMin) aktiverIndex = i;
    });
  }

  return (
    <ol className="relative list-none p-0 m-0">
      {tag.stationen.map((s, i) => {
        const ort = s.ortId ? getOrtById(s.ortId) : null;
        const frei = s.art === 'frei';
        const fix = s.art === 'fix';
        const jetztHier = i === aktiverIndex;

        return (
          <li
            key={s.id}
            className="relative grid grid-cols-[3.9rem_1.4rem_1fr] gap-x-1"
            style={{ minHeight: dauerHoehe(s) }}
          >
            {/* Uhrzeit */}
            <div className="pt-px text-right">
              <span
                className={`zeit block text-[13px] leading-5 ${
                  fix ? 'text-licht-400 font-medium' : 'text-holz-400'
                }`}
              >
                {s.zeit}
              </span>
              {dauerText(s) && (
                <span className="zeit block text-[11px] leading-4 text-holz-500 mt-0.5">
                  {dauerText(s)}
                </span>
              )}
            </div>

            {/* Spur mit Marke */}
            <div className="relative flex justify-center" aria-hidden="true">
              <span
                className={`absolute top-2 bottom-0 w-px ${
                  frei
                    ? 'border-l border-dashed border-holz-700'
                    : 'bg-holz-700'
                }`}
              />
              <span
                className={
                  fix
                    ? 'relative z-10 mt-1.5 w-2.5 h-2.5 rounded-full bg-gluehwein-500 ring-4 ring-holz-950'
                    : frei
                      ? 'relative z-10 mt-2 w-1.5 h-1.5 rounded-full bg-holz-700 ring-4 ring-holz-950'
                      : 'relative z-10 mt-2 w-1.5 h-1.5 rounded-full bg-holz-600 ring-4 ring-holz-950'
                }
              />
              {jetztHier && (
                <span className="absolute left-1/2 -translate-x-1/2 top-8 w-2 h-2 rounded-full bg-licht-400 ring-4 ring-holz-950 animate-pulse" />
              )}
            </div>

            {/* Inhalt */}
            <div className={`pb-8 ${frei ? 'pt-0.5' : ''}`}>
              <h3
                className={
                  fix
                    ? 'display text-creme-100 text-lg font-semibold leading-tight'
                    : frei
                      ? 'display text-holz-300 text-base font-medium leading-tight'
                      : 'display text-creme-100 text-base font-medium leading-tight'
                }
              >
                {s.name}
              </h3>

              {s.ort && (
                <p className="flex items-center gap-1.5 text-holz-400 text-xs mt-0.5">
                  <MapPin size={11} className="shrink-0" />
                  {s.ort}
                </p>
              )}

              {s.ortOffen && (
                <p className="flex items-center gap-1.5 text-licht-300 text-xs mt-1">
                  <MapPin size={11} className="shrink-0" />
                  {s.ortOffen}
                </p>
              )}

              {jetztHier && (
                <p className="zeit text-licht-400 text-[11px] mt-1 uppercase tracking-wider">
                  ihr seid hier
                </p>
              )}

              <p className="text-holz-300 text-sm mt-1.5 leading-relaxed max-w-prose">
                {s.notiz}
              </p>

              {s.vermerke && (
                <ul className="mt-2 space-y-1 list-none p-0">
                  {s.vermerke.map((v, i) => (
                    <li key={i} className="flex gap-2 text-holz-400 text-xs leading-relaxed">
                      <span className="text-holz-500 select-none">·</span>
                      {v}
                    </li>
                  ))}
                </ul>
              )}

              {ort?.naviLink && (
                <div className="mt-2.5">
                  <NaviButton ort={ort} label="Route starten" />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
