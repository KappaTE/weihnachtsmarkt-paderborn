import { ArrowDown } from 'lucide-react';
import { getOrtById } from '../data/orte';
import NaechsterPunkt from './NaechsterPunkt';
import NaviButton from './NaviButton';

export default function Hero({ onNavigate }) {
  const hotel = getOrtById('hotel');
  const brauhaus = getOrtById('brauhaus');

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-5 py-16 overflow-hidden">
      <div className="budenschein" aria-hidden="true" />

      <div className="relative z-10 w-full">
        <p className="zeit text-licht-400 text-xs uppercase tracking-[0.2em] mb-3">
          Samstag · 28. November 2026
        </p>
        <h1 className="mb-5">
          <span className="display block text-creme-100/70 text-xl font-medium tracking-tight leading-none mb-1">
            Weihnachtsmarkt
          </span>
          <span className="display block text-creme-100 text-6xl font-extrabold tracking-tight leading-[0.9]">
            Paderborn
          </span>
        </h1>
        <p className="text-holz-300 text-base leading-relaxed max-w-prose mb-10">
          16 Personen, ein Tag. Die festen Zeiten stehen, alles dazwischen ist freier Bummel.
        </p>

        {/* Die These: zwei Zahlen, dazwischen sichtbar Luft. */}
        <div className="border-y border-holz-800 py-7 mb-8">
          <Marke zeit="10.00" was="Gemeinsames Frühstück" wo="unterwegs · Ort noch offen" />

          <div className="h-4" aria-hidden="true" />

          <Marke zeit="11.00" was="Ankunft" wo="Hotel zur Mühle" />

          <div className="flex items-center gap-4 py-5 pl-1">
            <span className="w-px self-stretch border-l border-dashed border-holz-700 ml-[3.5px]" />
            <p className="text-holz-400 text-sm leading-relaxed">
              <span className="text-creme-100 font-medium">6½ Stunden</span> ohne Programm.
              Markt von 11 bis 22 Uhr, rund 80 Stände.
            </p>
          </div>

          <Marke zeit="17.30" was="Tisch im Brauhaus" wo="Kisau 2 · 80 m vom Hotel" />
        </div>

        <NaechsterPunkt className="mb-8" />

        <div className="grid grid-cols-1 gap-2 mb-10">
          <NaviButton ort={hotel} label="Route zum Hotel" voll />
          <NaviButton ort={brauhaus} label="Route zum Brauhaus" voll />
        </div>

        <button
          onClick={() => onNavigate('ablauf')}
          className="inline-flex items-center gap-2 text-holz-300 hover:text-creme-100 text-sm transition-colors border-b border-holz-700 hover:border-licht-400 pb-1"
        >
          Ganzen Tag ansehen
          <ArrowDown size={14} />
        </button>
      </div>
    </section>
  );
}

function Marke({ zeit, was, wo }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="w-2 h-2 rounded-full bg-gluehwein-500 shrink-0 self-center" />
      <span className="zeit text-licht-400 text-2xl font-medium shrink-0">{zeit}</span>
      <span className="min-w-0">
        <span className="block text-creme-100 text-base font-medium leading-tight">{was}</span>
        <span className="block text-holz-400 text-xs mt-0.5">{wo}</span>
      </span>
    </div>
  );
}
