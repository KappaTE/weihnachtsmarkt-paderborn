import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { istReisetag, minutenImTag } from '../data/termine';

// Merkliste und Treffpunkt leben nur im Browser des jeweiligen Handys.
// Bei gesperrtem Speicher (privater Modus) läuft die Seite trotzdem — nur ohne Merken.
const SCHLUESSEL_MERKLISTE = 'wmpb-merkliste';
const SCHLUESSEL_TREFF = 'wmpb-treffpunkt';

function laden(schluessel, standard) {
  try {
    const wert = localStorage.getItem(schluessel);
    return wert ? JSON.parse(wert) : standard;
  } catch {
    return standard;
  }
}

function speichern(schluessel, wert) {
  try {
    localStorage.setItem(schluessel, JSON.stringify(wert));
  } catch {
    // Speicher nicht verfügbar — der Zustand gilt dann nur bis zum Neuladen.
  }
}

const AppKontext = createContext(null);

export function AppZustand({ children }) {
  const [tab, setTabRoh] = useState('hero');
  const [merkliste, setMerkliste] = useState(() => laden(SCHLUESSEL_MERKLISTE, []));
  const [treff, setTreff] = useState(() => laden(SCHLUESSEL_TREFF, null));
  // sheet: null | { typ: 'ort', ortId } | { typ: 'treff' } — bleibt nach dem Schließen
  // stehen, damit der Inhalt beim Herausgleiten nicht verschwindet.
  const [sheet, setSheet] = useState(null);
  const [sheetOffen, setSheetOffen] = useState(false);

  const setTab = useCallback((id) => {
    setTabRoh(id);
    setSheetOffen(false);
    window.scrollTo(0, 0);
  }, []);

  const toggleMerken = useCallback((id) => {
    setMerkliste((alt) => {
      const neu = alt.includes(id) ? alt.filter((x) => x !== id) : [...alt, id];
      speichern(SCHLUESSEL_MERKLISTE, neu);
      return neu;
    });
  }, []);

  const treffSpeichern = useCallback((neu) => {
    speichern(SCHLUESSEL_TREFF, neu);
    setTreff(neu);
    setSheetOffen(false);
  }, []);

  const openOrt = useCallback((ortId) => {
    setSheet({ typ: 'ort', ortId });
    setSheetOffen(true);
  }, []);

  const openTreff = useCallback(() => {
    setSheet({ typ: 'treff' });
    setSheetOffen(true);
  }, []);

  const closeSheet = useCallback(() => setSheetOffen(false), []);

  const wert = useMemo(() => ({
    tab, setTab,
    merkliste, toggleMerken, istGemerkt: (id) => merkliste.includes(id),
    treff, treffSpeichern,
    sheet, sheetOffen, openOrt, openTreff, closeSheet,
  }), [tab, setTab, merkliste, toggleMerken, treff, treffSpeichern, sheet, sheetOffen, openOrt, openTreff, closeSheet]);

  return <AppKontext.Provider value={wert}>{children}</AppKontext.Provider>;
}

export const useApp = () => useContext(AppKontext);

// Vorschlag für einen neuen Treffpunkt: am Reisetag frühestens in 20 Minuten,
// auf die Viertelstunde gerundet — sonst kurz vor dem Abendessen.
export function treffVorschlag(jetzt = new Date()) {
  if (!istReisetag(jetzt)) return 17 * 60 + 15;
  return Math.min(23 * 60 + 45, Math.ceil((minutenImTag(jetzt) + 20) / 15) * 15);
}
