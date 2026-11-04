import { useEffect, useState } from 'react';
import { Navigation, Star, X, Minus, Plus } from 'lucide-react';
import { useApp, treffVorschlag } from '../state/AppZustand';
import { getOrtById } from '../data/orte';
import { KAT_FARBE, KAT_LABEL } from '../data/kategorien';
import { treffpunkte } from '../data/treffpunkte';
import { fmtMinuten } from '../data/termine';

// Eine Detailansicht für alles: jeder Ort, jeder Pin, und der Treffpunkt-Dialog.
// Bleibt immer im DOM und gleitet nur aus dem Bild — sonst ruckelt die Animation.
export default function Sheet() {
  const { sheet, sheetOffen, closeSheet } = useApp();

  useEffect(() => {
    if (!sheetOffen) return;
    const taste = (e) => e.key === 'Escape' && closeSheet();
    window.addEventListener('keydown', taste);
    return () => window.removeEventListener('keydown', taste);
  }, [sheetOffen, closeSheet]);

  return (
    <>
      <div
        onClick={closeSheet}
        aria-hidden="true"
        className={`fixed inset-0 z-[1100] bg-[rgba(5,7,10,0.55)] transition-opacity duration-300 ${
          sheetOffen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={sheet?.typ === 'treff' ? 'Treffpunkt ausmachen' : 'Ortsdetails'}
        inert={!sheetOffen}
        className="fixed bottom-0 left-1/2 z-[1200] w-full max-w-lg max-h-[82vh] overflow-y-auto bg-nacht-900 border-t border-nacht-650 rounded-t-[28px] px-5 pt-2.5 pb-[calc(2rem+env(safe-area-inset-bottom))]"
        style={{
          transform: `translate(-50%, ${sheetOffen ? '0%' : '105%'})`,
          transition: 'transform .34s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <div className="w-9 h-1 rounded-sm bg-nacht-600 mx-auto mb-3" aria-hidden="true" />
        {sheet?.typ === 'ort' && <OrtInhalt ortId={sheet.ortId} />}
        {/* key: Entwurf bei jedem Öffnen frisch aus dem gespeicherten Treffpunkt aufbauen */}
        {sheet?.typ === 'treff' && <TreffInhalt key={sheetOffen ? 'offen' : 'zu'} />}
      </div>
    </>
  );
}

function Schliessen() {
  const { closeSheet } = useApp();
  return (
    <button
      type="button"
      onClick={closeSheet}
      aria-label="Schließen"
      className="w-[34px] h-[34px] shrink-0 flex items-center justify-center rounded-full bg-nacht-850 text-nebel-400 hover:text-schnee"
    >
      <X size={16} />
    </button>
  );
}

function OrtInhalt({ ortId }) {
  const { istGemerkt, toggleMerken } = useApp();
  const ort = getOrtById(ortId);
  if (!ort) return null;
  const gemerkt = istGemerkt(ort.id);
  const farbe = KAT_FARBE[ort.kategorie];

  return (
    <div className="flex flex-col gap-[11px]">
      <div className="flex items-center justify-between">
        <span
          className="flex items-center gap-[7px] px-2.5 py-[5px] rounded-full text-xs"
          style={{ color: farbe, backgroundColor: `${farbe}1F` }}
        >
          <span className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: farbe }} />
          {KAT_LABEL[ort.kategorie]}
        </span>
        <Schliessen />
      </div>

      <div className="flex flex-col gap-[3px]">
        <h3 className="text-[30px] font-bold leading-[1.05] tracking-[-0.02em]">{ort.name}</h3>
        <p className="text-[13px] text-nebel-400">{ort.adresse}</p>
      </div>

      {ort.beschreibung && <p className="text-sm leading-[1.45] text-nebel-200 text-pretty">{ort.beschreibung}</p>}
      {ort.tipp && (
        <div className="px-[13px] py-[11px] rounded-[14px] bg-nacht-850 flex flex-col gap-[3px]">
          <span className="zeit text-[10.5px] font-medium tracking-[0.06em] text-birne-400">TIPP</span>
          <span className="text-[13.5px] leading-[1.4]">{ort.tipp}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {ort.oeffnung && <Etikett>{ort.oeffnung}</Etikett>}
        {ort.entfernung && <Etikett>{ort.entfernung} vom Hotel</Etikett>}
        {ort.stand === 'unbestaetigt' && (
          <span className="px-2.5 py-[5px] rounded-full border border-nacht-600 text-[11.5px] text-birne-400">
            Angabe unbestätigt
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-0.5">
        <a
          href={ort.naviLink ?? ort.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-12 flex items-center justify-center gap-2 rounded-full bg-birne-400 hover:bg-birne-100 text-birne-ink text-[15px] font-semibold transition-colors"
        >
          <Navigation size={16} />
          {ort.naviLink ? 'Route starten' : 'Auf Maps öffnen'}
        </a>
        <button
          type="button"
          onClick={() => toggleMerken(ort.id)}
          aria-pressed={gemerkt}
          className={`h-12 px-[18px] flex items-center gap-[7px] rounded-full border text-sm transition-colors ${
            gemerkt ? 'border-birne-400 text-birne-100' : 'border-nacht-600 text-nebel-200'
          }`}
        >
          <Star size={16} strokeWidth={gemerkt ? 0 : 1.75} className={gemerkt ? 'fill-birne-400' : ''} />
          {gemerkt ? 'Gemerkt' : 'Merken'}
        </button>
      </div>
    </div>
  );
}

function Etikett({ children }) {
  return (
    <span className="zeit px-2.5 py-[5px] rounded-full bg-nacht-950 text-[11.5px] leading-snug text-nebel-200">
      {children}
    </span>
  );
}

const FRUEHESTENS = 8 * 60;
const SPAETESTENS = 23 * 60 + 45;

function TreffInhalt() {
  const { treff, treffSpeichern } = useApp();
  const [ortId, setOrtId] = useState(() => treff?.ortId ?? 'rathausplatz');
  const [min, setMin] = useState(() => treff?.min ?? treffVorschlag());

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[25px] font-bold leading-[1.1] tracking-[-0.02em]">Treffpunkt ausmachen</h3>
        <Schliessen />
      </div>

      <div className="flex flex-col gap-1.5" role="radiogroup" aria-label="Ort">
        {treffpunkte.map((t) => {
          const an = t.id === ortId;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={an}
              onClick={() => setOrtId(t.id)}
              className={`flex items-center gap-3 min-h-[54px] px-3.5 rounded-2xl border text-left ${
                an ? 'border-birne-400 bg-birne-400/8' : 'border-nacht-800 bg-transparent'
              }`}
            >
              <span
                className={`w-[18px] h-[18px] shrink-0 rounded-full box-border ${
                  an ? 'border-[5px] border-birne-400 shadow-[0_0_10px_rgba(240,184,96,0.5)]' : 'border-[1.5px] border-nacht-600'
                }`}
              />
              <span className="flex-1 flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold">{t.label}</span>
                <span className="text-xs text-nebel-400">{t.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between py-2.5 border-y border-nacht-800">
        <span className="flex flex-col gap-0.5">
          <span className="text-sm text-nebel-200">Uhrzeit</span>
          <span className="zeit text-[10.5px] text-nebel-400">in 15-Min-Schritten</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMin((m) => Math.max(FRUEHESTENS, m - 15))}
            aria-label="15 Minuten früher"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-nacht-850 text-schnee"
          >
            <Minus size={18} />
          </button>
          <span
            className="zeit w-24 text-center text-[34px] leading-none tracking-[-0.04em] text-birne-400 [text-shadow:0_0_18px_rgba(240,184,96,0.4)]"
            aria-live="polite"
          >
            {fmtMinuten(min)}
          </span>
          <button
            type="button"
            onClick={() => setMin((m) => Math.min(SPAETESTENS, m + 15))}
            aria-label="15 Minuten später"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-nacht-850 text-schnee"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => treffSpeichern({ ortId, min })}
        className="h-[52px] rounded-full bg-birne-400 hover:bg-birne-100 text-birne-ink text-[15px] font-semibold transition-colors"
      >
        Treffpunkt festlegen
      </button>
      {treff && (
        <button
          type="button"
          onClick={() => treffSpeichern(null)}
          className="min-h-10 text-[13px] text-nebel-400 hover:text-schnee"
        >
          Treffpunkt entfernen
        </button>
      )}
    </div>
  );
}
