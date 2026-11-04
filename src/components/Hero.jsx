import { Cloud, MapPin, Share2 } from 'lucide-react';
import { getOrtById } from '../data/orte';
import { KAT_FARBE } from '../data/kategorien';
import { getTreffpunkt } from '../data/treffpunkte';
import { naechsterTermin, restzeit, reisetag, fmtMinuten, minutenImTag, istReisetag } from '../data/termine';
import { useApp } from '../state/AppZustand';
import useJetzt from '../state/useJetzt';
import Lichterkette from './Lichterkette';
import NaviButton from './NaviButton';
import Punkt from './Punkt';

const WETTER = 'https://www.google.com/search?q=wetter+paderborn+28.11.2026';
const BRAUHAUS = new Date(2026, 10, 28, 17, 30);
const ANKUNFT = new Date(2026, 10, 28, 11, 0);

export default function Hero() {
  const jetzt = useJetzt();

  return (
    <section className="relative px-5 pt-[calc(14px+env(safe-area-inset-top))] flex flex-col gap-[22px] overflow-hidden">
      <div className="birnenschein" aria-hidden="true" />

      <div className="relative flex items-center justify-between">
        <h1 className="zeit text-xs font-normal text-nebel-400">Sa 28.11. · Paderborn</h1>
        <a
          href={WETTER}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-nacht-700 text-xs text-nebel-400 hover:text-schnee transition-colors"
        >
          <Cloud size={14} />
          Wetter
        </a>
      </div>

      <Countdown jetzt={jetzt} />

      <div className="relative flex flex-col gap-1.5">
        <Lichterkette jetzt={jetzt} />
        <p className="text-[13.5px] leading-[1.45] text-nebel-400 text-pretty">
          Eine Birne pro Stunde, <span className="text-gluehwein-300">rot</span> sind die festen
          Termine. <Bummelsatz jetzt={jetzt} />
        </p>
      </div>

      <Treffpunkt />
      <Merkliste />

      <div className="relative grid grid-cols-2 gap-2">
        <NaviButton ort={getOrtById('hotel')} label="Hotel" voll />
        <NaviButton ort={getOrtById('brauhaus')} label="Brauhaus" voll />
      </div>
    </section>
  );
}

// Die große Zahl: vor der Reise die Tage, am Tag die Minuten oder Stunden bis zum
// nächsten festen Termin. Kalendertage zählen, nicht Millisekunden teilen —
// sonst springt die Zahl je nach Uhrzeit um einen Tag.
function Countdown({ jetzt }) {
  let zahl, oben, gross, unten;

  if (jetzt < reisetag) {
    const heute = new Date(jetzt.getFullYear(), jetzt.getMonth(), jetzt.getDate());
    const tage = Math.round((reisetag - heute) / 86_400_000);
    zahl = tage;
    oben = `${tage === 1 ? 'Tag' : 'Tage'} bis`;
    gross = 'Paderborn';
    unten = 'Sa 08.30 · Frühstück im Franzes';
  } else {
    const n = naechsterTermin(jetzt);
    if (!n) {
      return (
        <p className="relative text-[28px] font-bold leading-tight tracking-tight text-schnee text-balance">
          Der Markt hat zu. Schönen Abend — und gute Heimfahrt.
        </p>
      );
    }
    const min = Math.ceil((n.zeit - jetzt) / 60_000);
    zahl = min < 100 ? min : Math.floor(min / 60);
    oben = `${min < 100 ? 'Min' : 'Std'} bis ${n.bis}`;
    gross = n.kurz;
    unten = `${fmtMinuten(minutenImTag(n.zeit))} · ${n.ort}`;
  }

  return (
    <div className="relative flex items-end gap-3.5">
      <span className="zeit text-[132px] font-light leading-[0.74] tracking-[-0.08em] text-birne-400 [text-shadow:0_0_40px_rgba(240,184,96,0.45)]">
        {zahl}
      </span>
      <span className="flex flex-col gap-1 pb-0.5 min-w-0">
        <span className="text-[15px] text-nebel-400">{oben}</span>
        <span className="text-[28px] font-bold leading-none text-schnee">{gross}</span>
        <span className="zeit text-[12.5px] text-nebel-400">{unten}</span>
      </span>
    </div>
  );
}

function Bummelsatz({ jetzt }) {
  if (istReisetag(jetzt) && jetzt >= ANKUNFT && jetzt < BRAUHAUS) {
    return (
      <>
        Bis zum Brauhaus um 17.30 bleiben noch{' '}
        <span className="text-schnee">{restzeit(BRAUHAUS, jetzt)}</span> freier Bummel.
      </>
    );
  }
  if (jetzt < ANKUNFT) {
    return (
      <>
        Zwischen Ankunft und Brauhaus liegen{' '}
        <span className="text-schnee">6½ Stunden</span> ohne Programm.
      </>
    );
  }
  return null;
}

function Treffpunkt() {
  const { treff, openTreff } = useApp();
  const tp = treff ? getTreffpunkt(treff.ortId) : null;

  if (!tp) {
    return (
      <button
        onClick={openTreff}
        className="relative flex items-center gap-3.5 p-[18px] text-left rounded-3xl border border-dashed border-nacht-650 hover:border-birne-400/60 transition-colors"
      >
        <span className="w-9 h-9 shrink-0 rounded-full border border-birne-400/70 flex items-center justify-center text-birne-400">
          <MapPin size={16} />
        </span>
        <span className="flex-1 min-w-0 flex flex-col gap-[3px]">
          <span className="text-base font-semibold leading-tight text-schnee">Treffpunkt ausmachen</span>
          <span className="text-[13px] leading-snug text-nebel-400">
            16 Leute im Gedränge — Ort und Uhrzeit festlegen, per WhatsApp teilen.
          </span>
        </span>
      </button>
    );
  }

  const zeit = fmtMinuten(treff.min);
  const ort = getOrtById(tp.ortId);
  const text = `Treffpunkt um ${zeit} Uhr: ${tp.label} (${tp.sub}) ${ort.mapsLink}`;

  return (
    <div className="relative rounded-3xl bg-nacht-900 border border-nacht-800 p-[18px] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-[7px] text-[13px] text-nebel-400">
          <MapPin size={15} className="text-birne-400" />
          Treffpunkt
        </span>
        <button onClick={openTreff} className="text-[13px] font-medium text-nebel-400 hover:text-schnee">
          Ändern
        </button>
      </div>
      <div className="flex items-center gap-3.5">
        <span className="zeit text-[42px] leading-none tracking-[-0.05em] text-schnee">{zeit}</span>
        <span className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[19px] font-semibold leading-[1.1] text-schnee">{tp.label}</span>
          <span className="text-[12.5px] text-nebel-400">{tp.sub}</span>
        </span>
      </div>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-12 rounded-full bg-birne-400 hover:bg-birne-100 text-birne-ink flex items-center justify-center gap-2 text-[15px] font-semibold transition-colors"
      >
        <Share2 size={17} />
        In die WhatsApp-Gruppe
      </a>
    </div>
  );
}

function Merkliste() {
  const { merkliste, openOrt } = useApp();
  const orte = merkliste.map(getOrtById).filter(Boolean);

  return (
    <div className="relative flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Gemerkt</h2>
        {orte.length > 0 && (
          <span className="zeit px-[7px] py-0.5 rounded-full bg-nacht-850 text-[11px] font-medium text-birne-400">
            {orte.length}
          </span>
        )}
      </div>
      {orte.length === 0 ? (
        <p className="text-[13px] leading-relaxed text-nebel-400">
          Noch nichts gemerkt. Tippe auf den Stern bei Plätzen oder Bars — so entsteht eure
          eigene Runde, auch auf der Karte.
        </p>
      ) : (
        <div className="ohne-scrollbar flex gap-2 overflow-x-auto -mx-5 px-5">
          {orte.map(o => (
            <button
              key={o.id}
              onClick={() => openOrt(o.id)}
              className="shrink-0 w-[150px] p-3 rounded-2xl bg-nacht-900 hover:bg-nacht-850 flex flex-col gap-1.5 text-left transition-colors"
            >
              <Punkt farbe={KAT_FARBE[o.kategorie]} />
              <span className="text-sm font-semibold">{o.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

