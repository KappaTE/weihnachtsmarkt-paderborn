import { istReisetag, minutenImTag, fmtMinuten, restzeit } from '../data/termine';
import { getOrtById } from '../data/orte';
import useJetzt from '../state/useJetzt';
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

const zwischen = (x) => Math.min(1, Math.max(0, x));

export default function Zeitachse({ tag }) {
  const jetzt = useJetzt();
  const amTag = istReisetag(jetzt) && tag.tag === 'sa';
  const jm = minutenImTag(jetzt);
  const st = tag.stationen;

  // Ein Abschnitt reicht bis zu seinem `bis`, sonst bis zum nächsten Abschnitt.
  const ende = (i) => st[i].bis ?? st[i + 1]?.von ?? st[i].von;
  // Anteil des Abschnitts, der schon vorbei ist — färbt die Linie und setzt die Jetzt-Marke.
  const anteil = (i) => {
    const s = st[i];
    if (!amTag || s.von == null) return 0;
    const e = ende(i);
    if (e <= s.von) return jm >= s.von ? 1 : 0;
    return zwischen((jm - s.von) / (e - s.von));
  };
  // Genau eine Jetzt-Marke: in dem Abschnitt, der gerade läuft.
  const jetztIndex = amTag ? st.findIndex((s, i) => s.von != null && s.von <= jm && jm < ende(i)) : -1;
  // Nächster fester Termin bekommt die Restzeit.
  const naechsterFix = amTag ? st.findIndex(s => s.art === 'fix' && s.von != null && s.von > jm) : -1;
  const n = st.length;

  return (
    <ol className="relative list-none p-0 m-0">
      {st.map((s, i) => {
        const a = anteil(i);
        const letzte = i === n - 1;
        // Begonnen und nicht mehr der laufende Abschnitt — also vorbei.
        const vorbei = amTag && s.von != null && s.von <= jm && i !== jetztIndex;
        return (
          <li
            key={s.id}
            className="relative grid grid-cols-[40px_minmax(0,1fr)] pb-3.5"
            style={{ minHeight: dauerHoehe(s) }}
          >
            {!letzte && <Linie art={s.art} anteil={a} />}
            <Marke art={s.art} vorbei={vorbei} />

            <div className="col-start-2 min-w-0">
              {s.art === 'fix' && (
                <FixKarte
                  s={s}
                  vorbei={vorbei}
                  rest={i === naechsterFix ? restzeit(new Date(jetzt.getFullYear(), jetzt.getMonth(), jetzt.getDate(), 0, s.von), jetzt) : null}
                />
              )}
              {s.art === 'frei' && <Frei s={s} />}
              {s.art === 'punkt' && <PunktZeile s={s} />}
            </div>

            {i === jetztIndex && <JetztMarke anteil={a} zeit={fmtMinuten(jm)} />}
          </li>
        );
      })}
    </ol>
  );
}

function Linie({ art, anteil }) {
  const gestrichelt = art === 'frei';
  const teil = (farbe) =>
    gestrichelt ? { borderLeft: `2px dashed ${farbe}` } : { background: farbe, width: 2 };
  return (
    <span aria-hidden="true">
      {anteil > 0 && (
        <span
          className="absolute left-[13px]"
          style={{ top: 8, height: `calc((100% - 8px) * ${anteil})`, ...teil('rgba(240,184,96,0.45)') }}
        />
      )}
      {anteil < 1 && (
        <span
          className="absolute left-[13px] bottom-0"
          style={{ top: `calc(8px + (100% - 8px) * ${anteil})`, ...teil('#283040') }}
        />
      )}
    </span>
  );
}

function Marke({ art, vorbei }) {
  if (art === 'frei') return null;
  if (art === 'fix') {
    return (
      <span
        aria-hidden="true"
        className={`absolute left-[7px] top-[15px] w-3.5 h-3.5 rounded-full bg-gluehwein-300 ${
          vorbei ? 'opacity-60' : 'shadow-[0_0_14px_rgba(240,143,134,0.6)]'
        }`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="absolute left-2 top-[15px] w-3 h-3 rounded-full border-[1.5px] border-nacht-600 bg-nacht-950"
    />
  );
}

function FixKarte({ s, vorbei, rest }) {
  const ort = s.ortId ? getOrtById(s.ortId) : null;
  return (
    <div
      className={`px-3.5 py-[11px] rounded-[18px] flex flex-col gap-[3px] ${
        vorbei ? 'bg-nacht-900 opacity-60' : 'bg-nacht-850 border border-nacht-650'
      }`}
    >
      <span className="flex items-baseline gap-2.5">
        <span className="zeit text-[13px] font-medium text-gluehwein-300">{s.zeit}</span>
        <h3 className="text-base font-semibold leading-tight">{s.name}</h3>
        {rest && <span className="zeit ml-auto shrink-0 text-[11px] text-birne-400">in {rest}</span>}
      </span>
      {s.ort && <span className="text-xs text-nebel-400">{s.ort}</span>}
      {s.ortOffen && <span className="text-xs text-birne-100">{s.ortOffen}</span>}
      {/* Erledigte Termine schrumpfen auf Uhrzeit, Titel und Ort. */}
      {!vorbei && <Notizen s={s} />}
      {!vorbei && ort?.naviLink && (
        <span className="mt-2">
          <NaviButton ort={ort} label="Route starten" />
        </span>
      )}
    </div>
  );
}

function Frei({ s }) {
  return (
    <div className="flex flex-col gap-1 pt-0.5">
      <span className="flex items-baseline gap-2.5">
        <span className="zeit text-[28px] font-light leading-none tracking-[-0.04em] text-nebel-400">{dauerText(s)}</span>
        <h3 className="text-[15px] font-medium text-nebel-200">{s.name}</h3>
      </span>
      <span className="zeit text-[11px] text-nebel-400">ab {s.zeit}</span>
      <Notizen s={s} />
    </div>
  );
}

function PunktZeile({ s }) {
  const ort = s.ortId ? getOrtById(s.ortId) : null;
  const inhalt = (
    <>
      <span className="flex items-baseline gap-2.5">
        <span className="zeit text-[13px] text-nebel-400">{s.zeit}</span>
        <h3 className="text-base font-medium leading-tight">{s.name}</h3>
        {dauerText(s) && <span className="zeit ml-auto shrink-0 text-[11px] text-nebel-400">{dauerText(s)}</span>}
      </span>
      {s.ort && <span className="text-xs text-nebel-400">{s.ort}</span>}
      <Notizen s={s} />
      {ort?.naviLink && (
        <span className="mt-2">
          <NaviButton ort={ort} label="Route starten" />
        </span>
      )}
    </>
  );
  // Punkte mit Ort sind Ziele — die bekommen eine ruhige Karte, reine Uhrzeiten nicht.
  return s.ort ? (
    <div className="px-3.5 py-[11px] rounded-[18px] bg-nacht-900 flex flex-col gap-[3px]">{inhalt}</div>
  ) : (
    <div className="pt-[11px] flex flex-col gap-[3px]">{inhalt}</div>
  );
}

function Notizen({ s }) {
  return (
    <>
      {s.notiz && <p className="mt-1 text-[12.5px] leading-[1.45] text-nebel-400 text-pretty">{s.notiz}</p>}
      {s.vermerke?.map((v, i) => (
        <p key={i} className="flex gap-2 text-xs leading-normal text-nebel-400">
          <span className="text-nacht-500 select-none">·</span>
          {v}
        </p>
      ))}
    </>
  );
}

function JetztMarke({ anteil, zeit }) {
  return (
    <div
      className="absolute inset-x-0 z-10 pointer-events-none"
      style={{ top: `calc(8px + (100% - 8px) * ${anteil})` }}
    >
      <span className="absolute inset-x-0 -top-px h-0.5 bg-birne-400 shadow-[0_0_12px_rgba(240,184,96,0.7)]" />
      <span className="glimmen absolute left-[6px] -top-2 w-4 h-4 rounded-full bg-birne-400 shadow-[0_0_0_4px_rgba(240,184,96,0.2),0_0_20px_4px_rgba(240,184,96,0.6)]" />
      <span className="zeit absolute right-0 -top-3 px-2.5 py-[5px] rounded-full bg-birne-400 text-birne-ink text-[11px] font-medium leading-none">
        Jetzt · {zeit}
      </span>
    </div>
  );
}
