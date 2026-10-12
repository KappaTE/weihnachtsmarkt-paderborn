import { ChevronRight, Cloud, ExternalLink, MapPin, Share } from 'lucide-react';
import { getOrtById } from '../data/orte';
import { KAT_FARBE } from '../data/kategorien';
import { getTreffpunkt } from '../data/treffpunkte';
import { naechsterTermin, restzeit, reisetag, fmtMinuten, minutenImTag } from '../data/termine';
import { useApp } from '../state/AppZustand';
import useJetzt from '../state/useJetzt';
import NaviButton from './NaviButton';

export default function Hero() {
  const { setTab } = useApp();
  const hotel = getOrtById('hotel');
  const brauhaus = getOrtById('brauhaus');

  return (
    <section className="relative px-[22px] pt-[26px] pb-9 flex flex-col gap-7 overflow-hidden">
      <div className="budenschein" aria-hidden="true" />

      <div className="relative">
        <p className="zeit text-licht-400 text-[11px] uppercase tracking-[0.2em] mb-3">
          Samstag · 28. November 2026
        </p>
        <h1 className="mb-4">
          <span className="display block text-creme-100/70 text-xl font-medium tracking-tight leading-none mb-1">
            Weihnachtsmarkt
          </span>
          <span className="display block text-creme-100 text-[58px] font-extrabold tracking-[-0.03em] leading-[0.9]">
            Paderborn
          </span>
        </h1>
        <p className="text-holz-300 text-[15px] leading-relaxed text-pretty">
          16 Personen, ein Tag. Die festen Zeiten stehen, alles dazwischen ist freier Bummel.
        </p>
      </div>

      <Jetztstand />

      {/* Die These: zwei Zahlen, dazwischen sichtbar Luft. */}
      <div className="relative border-y border-holz-800 py-6 flex flex-col">
        <Marke zeit="10.00" was="Gemeinsames Frühstück" wo="unterwegs · Ort noch offen" />
        <div className="h-4" aria-hidden="true" />
        <Marke zeit="11.00" was="Ankunft" wo="Hotel zur Mühle" />
        <div className="flex gap-[18px] py-[18px] pl-[3px]">
          <span className="border-l border-dashed border-holz-700" aria-hidden="true" />
          <p className="text-holz-400 text-sm leading-relaxed">
            <span className="text-creme-100 font-medium">6½ Stunden</span> ohne Programm.
            Markt von 11 bis 22 Uhr, rund 80 Stände.
          </p>
        </div>
        <Marke zeit="17.30" was="Tisch im Brauhaus" wo="Kisau 2 · 80 m vom Hotel" />
      </div>

      <Treffpunkt />
      <Merkliste />

      <a
        href="https://www.google.com/search?q=wetter+paderborn+28.11.2026"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-3.5 px-4 py-3.5 bg-holz-900/70 hover:bg-holz-900 rounded-kante transition-colors"
      >
        <Cloud size={20} strokeWidth={1.75} className="text-licht-500 shrink-0" />
        <span className="flex-1 min-w-0 flex flex-col gap-0.5">
          <span className="text-sm font-medium text-creme-100">Wetter am 28.11.</span>
          <span className="text-xs leading-snug text-holz-400">
            Verlässlich erst wenige Tage vorher — Ende November eher kalt, warm anziehen.
          </span>
        </span>
        <ExternalLink size={14} className="text-holz-400 shrink-0" />
      </a>

      <div className="relative grid grid-cols-2 gap-2">
        <NaviButton ort={hotel} label="Hotel" voll />
        <NaviButton ort={brauhaus} label="Brauhaus" voll />
      </div>

      <button
        onClick={() => setTab('ablauf')}
        className="relative self-start inline-flex items-center gap-2 pb-1 text-holz-300 hover:text-creme-100 text-sm transition-colors border-b border-holz-700 hover:border-licht-400"
      >
        Ganzen Tag ansehen
        <ChevronRight size={14} />
      </button>
    </section>
  );
}

// Vor der Fahrt die Tage bis Paderborn, am Tag selbst der nächste Fixpunkt,
// danach ein Abschied. Kalendertage zählen, nicht Millisekunden teilen —
// sonst springt die Zahl je nach Uhrzeit um einen Tag.
function Jetztstand() {
  const jetzt = useJetzt();

  if (jetzt < reisetag) {
    const heute = new Date(jetzt.getFullYear(), jetzt.getMonth(), jetzt.getDate());
    const tage = Math.round((reisetag - heute) / 86_400_000);
    return (
      <div className="relative flex items-end gap-3.5 py-1">
        <span className="zeit text-[84px] font-medium leading-[0.8] tracking-[-0.04em] text-licht-400">
          {tage}
        </span>
        <span className="flex flex-col gap-1 pb-0.5">
          <span className="display text-lg font-semibold leading-tight text-creme-100">
            {tage === 1 ? 'Tag' : 'Tage'} bis Paderborn
          </span>
          <span className="zeit text-xs leading-snug text-holz-400">Anreise Sa ~11.00 · mehrere Autos</span>
        </span>
      </div>
    );
  }

  const n = naechsterTermin(jetzt);
  if (!n) {
    return (
      <div className="relative border-l-2 border-holz-600 py-1 pl-3.5">
        <p className="display text-[19px] font-semibold leading-tight text-creme-100">
          Der Markt hat zu. Schönen Abend — und gute Heimfahrt morgen.
        </p>
      </div>
    );
  }

  return (
    <div className="relative border-l-2 border-gluehwein-500 py-1 pl-3.5 flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gluehwein-400">
        Als Nächstes · noch {restzeit(n.zeit, jetzt)}
      </span>
      <span className="flex items-baseline gap-3 mt-1">
        <span className="zeit text-[32px] font-medium leading-none text-licht-400">
          {fmtMinuten(minutenImTag(n.zeit))}
        </span>
        <span className="display text-[19px] font-semibold leading-tight text-creme-100">{n.name}</span>
      </span>
      <span className="text-xs text-holz-400">{n.ort}</span>
    </div>
  );
}

function Treffpunkt() {
  const { treff, openTreff } = useApp();
  const tp = treff ? getTreffpunkt(treff.ortId) : null;

  if (!tp) {
    return (
      <button
        onClick={openTreff}
        className="relative flex items-center gap-3.5 p-4 text-left border border-dashed border-holz-600 hover:border-licht-500 rounded-kante transition-colors"
      >
        <span className="w-9 h-9 shrink-0 rounded-full border border-licht-500 flex items-center justify-center text-licht-400">
          <MapPin size={16} />
        </span>
        <span className="flex-1 min-w-0 flex flex-col gap-[3px]">
          <span className="display text-base font-semibold leading-tight text-creme-100">Treffpunkt ausmachen</span>
          <span className="text-[13px] leading-snug text-holz-400">
            16 Leute im Gedränge — Ort und Uhrzeit festlegen, per WhatsApp teilen.
          </span>
        </span>
      </button>
    );
  }

  const zeit = fmtMinuten(treff.min);
  const ort = getOrtById(tp.ortId);
  const label = tp.label + (tp.id === 'rathausplatz' ? ', Rathausplatz' : '');
  const text = `Treffpunkt um ${zeit} Uhr: ${tp.label} (${tp.sub}) ${ort.mapsLink}`;

  return (
    <div className="relative bg-holz-900 rounded-kante p-4 flex flex-col gap-3 shadow-[inset_0_0_0_1px_#2A2320]">
      <span className="zeit text-[11px] uppercase tracking-[0.15em] text-licht-400">Treffpunkt</span>
      <div className="flex items-baseline gap-3">
        <span className="zeit text-[30px] font-medium leading-none text-creme-100">{zeit}</span>
        <span className="display text-base font-semibold leading-tight text-creme-100">{label}</span>
      </div>
      <div className="flex gap-2">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 min-h-11 bg-licht-400 hover:bg-licht-300 text-holz-950 font-semibold text-sm rounded-kante transition-colors"
        >
          <Share size={16} />
          In die Gruppe
        </a>
        <button
          onClick={openTreff}
          className="min-h-11 px-4 border border-holz-700 text-holz-300 text-sm rounded-kante"
        >
          Ändern
        </button>
      </div>
    </div>
  );
}

function Merkliste() {
  const { merkliste, openOrt } = useApp();
  const orte = merkliste.map(getOrtById).filter(Boolean);

  return (
    <div className="relative flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between">
        <span className="zeit text-[11px] uppercase tracking-[0.15em] text-licht-400">Gemerkt</span>
        {orte.length > 0 && (
          <span className="zeit text-[11px] text-holz-500">
            {orte.length} {orte.length === 1 ? 'Ort' : 'Orte'}
          </span>
        )}
      </div>
      {orte.length === 0 ? (
        <p className="text-[13px] leading-relaxed text-holz-400">
          Noch nichts gemerkt. Tippe auf den Stern bei Plätzen oder Bars — so entsteht eure
          eigene Runde, auch auf der Karte.
        </p>
      ) : (
        <div className="flex flex-col border-t border-holz-800">
          {orte.map(o => (
            <button
              key={o.id}
              onClick={() => openOrt(o.id)}
              className="flex items-center gap-3 min-h-[52px] py-2 border-b border-holz-800 text-left"
            >
              <span className="w-2 h-2 shrink-0 rounded-full" style={{ backgroundColor: KAT_FARBE[o.kategorie] }} />
              <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                <span className="text-sm font-medium text-creme-100">{o.name}</span>
                <span className="zeit text-[11px] leading-snug text-holz-400">{o.oeffnung || o.adresse}</span>
              </span>
              <ChevronRight size={16} className="text-holz-500 shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Marke({ zeit, was, wo }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="w-2 h-2 rounded-full bg-gluehwein-500 shrink-0" />
      <span className="zeit text-licht-400 text-[22px] font-medium leading-none shrink-0">{zeit}</span>
      <span className="min-w-0 flex flex-col gap-0.5">
        <span className="text-[15px] font-medium leading-tight text-creme-100">{was}</span>
        <span className="text-xs text-holz-400">{wo}</span>
      </span>
    </div>
  );
}
