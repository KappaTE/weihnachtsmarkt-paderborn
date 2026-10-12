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
        className={`fixed inset-0 z-[1100] bg-[rgba(5,4,4,0.6)] transition-opacity duration-300 ${
          sheetOffen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={sheet?.typ === 'treff' ? 'Treffpunkt ausmachen' : 'Ortsdetails'}
        inert={!sheetOffen}
        className="fixed bottom-0 left-1/2 z-[1200] w-full max-w-lg max-h-[82vh] overflow-y-auto bg-holz-900 border-t border-holz-700 rounded-t-[14px] px-5 pt-2.5 pb-[calc(2rem+env(safe-area-inset-bottom))]"
        style={{
          transform: `translate(-50%, ${sheetOffen ? '0%' : '105%'})`,
          transition: 'transform .34s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <div className="w-9 h-1 rounded-sm bg-holz-600 mx-auto mb-4" aria-hidden="true" />
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
      className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-holz-800 text-holz-300"
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

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="zeit flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-holz-400">
          <span className="w-[9px] h-[9px] rounded-full" style={{ backgroundColor: KAT_FARBE[ort.kategorie] }} />
          {KAT_LABEL[ort.kategorie]}
        </span>
        <Schliessen />
      </div>

      <h3 className="display text-[26px] font-bold leading-[1.1] tracking-tight text-creme-100">{ort.name}</h3>
      <p className="-mt-1.5 text-[13px] text-holz-400">{ort.adresse}</p>

      {ort.beschreibung && <p className="text-sm leading-relaxed text-holz-300">{ort.beschreibung}</p>}
      {ort.tipp && (
        <p className="pl-3 border-l-2 border-licht-500 text-sm leading-relaxed text-creme-100">{ort.tipp}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {ort.oeffnung && <Etikett>{ort.oeffnung}</Etikett>}
        {ort.entfernung && <Etikett>{ort.entfernung} vom Hotel</Etikett>}
        {ort.stand === 'unbestaetigt' && (
          <span className="px-2.5 py-1.5 border border-holz-700 rounded-kante text-xs text-licht-500">
            Angabe unbestätigt
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-1.5">
        <a
          href={ort.naviLink ?? ort.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 min-h-12 bg-licht-400 hover:bg-licht-300 text-holz-950 font-semibold text-sm rounded-kante transition-colors"
        >
          <Navigation size={15} />
          {ort.naviLink ? 'Route starten' : 'Auf Maps öffnen'}
        </a>
        <button
          type="button"
          onClick={() => toggleMerken(ort.id)}
          aria-pressed={gemerkt}
          className={`flex items-center gap-2 min-h-12 px-4 border rounded-kante text-sm transition-colors ${
            gemerkt ? 'border-licht-500 text-licht-300' : 'border-holz-700 text-holz-300'
          }`}
        >
          <Star size={16} strokeWidth={1.75} className={gemerkt ? 'fill-current' : ''} />
          {gemerkt ? 'Gemerkt' : 'Merken'}
        </button>
      </div>
    </div>
  );
}

function Etikett({ children }) {
  return (
    <span className="zeit px-2.5 py-1.5 bg-holz-950 rounded-kante text-xs leading-snug text-holz-300">
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="display text-2xl font-bold leading-[1.1] text-creme-100">Treffpunkt ausmachen</h3>
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
              className={`flex items-center gap-3 min-h-[50px] px-3.5 border rounded-kante text-left text-creme-100 ${
                an ? 'bg-holz-800 border-licht-500' : 'bg-transparent border-holz-800'
              }`}
            >
              <span
                className={`w-4 h-4 shrink-0 rounded-full box-border ${
                  an ? 'border-[5px] border-licht-400' : 'border-[1.5px] border-holz-600'
                }`}
              />
              <span className="flex-1 flex flex-col gap-px">
                <span className="text-sm font-medium">{t.label}</span>
                <span className="text-xs text-holz-400">{t.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between py-2.5 border-y border-holz-800">
        <span className="text-sm text-holz-300">Uhrzeit</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMin((m) => Math.max(FRUEHESTENS, m - 15))}
            aria-label="15 Minuten früher"
            className="w-11 h-11 flex items-center justify-center bg-holz-800 rounded-kante text-creme-100"
          >
            <Minus size={18} />
          </button>
          <span className="zeit w-[84px] text-center text-[26px] font-medium leading-none text-licht-400" aria-live="polite">
            {fmtMinuten(min)}
          </span>
          <button
            type="button"
            onClick={() => setMin((m) => Math.min(SPAETESTENS, m + 15))}
            aria-label="15 Minuten später"
            className="w-11 h-11 flex items-center justify-center bg-holz-800 rounded-kante text-creme-100"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => treffSpeichern({ ortId, min })}
        className="min-h-[50px] bg-licht-400 hover:bg-licht-300 rounded-kante text-holz-950 text-[15px] font-semibold transition-colors"
      >
        Treffpunkt festlegen
      </button>
      {treff && (
        <button
          type="button"
          onClick={() => treffSpeichern(null)}
          className="min-h-10 text-[13px] text-holz-400 hover:text-creme-100"
        >
          Treffpunkt entfernen
        </button>
      )}
    </div>
  );
}
