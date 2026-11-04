import { ChevronRight, Phone } from 'lucide-react';
import { orteNachKategorie, getOrtById } from '../data/orte';
import { buchung, zimmer, hotelAussagen } from '../data/buchung';
import { useApp } from '../state/AppZustand';
import Unbestaetigt from './Unbestaetigt';
import NaviButton from './NaviButton';
import Verweis from './Verweis';

const links = [
  { label: 'PaderSprinter — Fahrpläne & Tickets', url: 'https://www.padersprinter.de' },
  { label: 'Parken in Paderborn (Parkplan der Stadt)', url: 'https://www.paderborn.de/microsite/asp/parken_in_der_city/parkplan.php' },
  { label: 'Wetter Paderborn, 28.11.2026', url: 'https://www.google.com/search?q=wetter+paderborn+28.11.2026' },
  { label: 'Weihnachtsmarkt — offizielle Seite der Stadt', url: 'https://www.paderborn.de/microsite/weihnachtsmarkt/index.php' },
];

// "Standard Doppelzimmer" → "Standard DZ" — sonst bricht das Raster auf dem Handy um.
const kurz = (typ) => typ.replace(/\s*Doppelzimmer$/, ' DZ').replace(/^Großes/, 'Groß');

export default function Praktisches() {
  const { openOrt } = useApp();
  const hotel = getOrtById('hotel');
  const parken = orteNachKategorie('parken');

  return (
    <section className="px-5 pt-[calc(14px+env(safe-area-inset-top))] flex flex-col gap-3">
      <h2 className="mb-1 text-[34px] font-bold leading-none tracking-[-0.02em]">Praktisches</h2>

      <InfoKarte titel="Hotel">
        <div className="flex flex-col gap-[3px]">
          <p className="text-xl font-semibold leading-[1.1]">{hotel.name}</p>
          <p className="text-[13px] text-nebel-400">{hotel.adresse}</p>
        </div>
        <p className="text-[13px] leading-[1.45] text-nebel-200 text-pretty">{hotelAussagen.anreise}</p>
        <a
          href={buchung.telefonLink}
          className="h-12 px-4 rounded-full bg-nacht-850 flex items-center gap-2.5 hover:bg-nacht-700 transition-colors"
        >
          <Phone size={16} className="text-birne-400 shrink-0" />
          <span className="zeit flex-1 text-sm font-medium text-birne-400">{buchung.telefon}</span>
          <span className="text-[12.5px] text-nebel-400">Anrufen</span>
        </a>
        <p className="text-[13px] text-nebel-400">
          <span className="text-schnee">{buchung.zimmerGesamt} Doppelzimmer</span> für die
          Gruppe · Stornierung {buchung.stornierung}
        </p>
        <ul className="grid grid-cols-2 gap-1.5 list-none p-0 m-0">
          {zimmer.map(z => (
            <li key={z.nr} className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-nacht-950">
              <span className="zeit text-[11px] font-medium text-birne-400">{z.nr}</span>
              <span className="min-w-0 text-[12.5px] text-nebel-200">{z.gaeste ?? kurz(z.typ)}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-[1.45] text-nebel-400">
          Wer in welchem Zimmer schläft, steht noch nicht fest. {hotelAussagen.namensliste}
        </p>
        <NaviButton ort={hotel} label="Route zum Hotel" voll />
      </InfoKarte>

      <InfoKarte titel="Anreise & Parken">
        <p className="text-[15px]">Mit mehreren Autos · Ankunft ca. 11:00</p>
        <p className="text-[13px] leading-[1.45] text-nebel-200 text-pretty">
          {hotelAussagen.parken} Es gibt also nichts vorab zu reservieren. Falls am
          1. Adventswochenende nicht alle Fahrzeuge unterkommen:
        </p>
        <div className="flex flex-col gap-1.5">
          {parken.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => openOrt(p.id)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl bg-nacht-950 text-left"
            >
              <span className="w-4 h-4 shrink-0 rounded-[5px] bg-nacht-700 flex items-center justify-center text-[9px] font-bold text-nebel-400">P</span>
              <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                <span className="text-sm font-semibold">{p.name}</span>
                <span className="text-xs leading-snug text-nebel-400">{p.beschreibung}</span>
              </span>
              <ChevronRight size={16} className="text-nacht-500 shrink-0" />
            </button>
          ))}
        </div>
        <p className="text-xs leading-[1.45] text-nebel-400">
          Tipp: dem Parkleitsystem folgen — die Anzeigetafeln zeigen freie Plätze je Parkhaus.
        </p>
      </InfoKarte>

      <InfoKarte titel="Vor Ort unterwegs">
        <p className="text-[13px] leading-[1.45] text-nebel-200 text-pretty">
          Alles Wichtige liegt fußläufig beieinander — Hotel, Brauhaus und Markt sind keine
          fünf Minuten auseinander. Bus braucht ihr eigentlich nicht.
        </p>
        <p className="text-[13px] leading-[1.45] text-nebel-400 text-pretty">
          Falls doch: Während des Weihnachtsmarkts halten die Busse an{' '}
          <span className="text-schnee">Westerntor</span> und{' '}
          <span className="text-schnee">Am Bogen</span> statt am Rathausplatz. Das
          AdventTicket kostet rund 2,00 € für 90 Minuten, am Wochenende fahren Nachtbusse.
        </p>
      </InfoKarte>

      <InfoKarte titel="Koordination">
        <p className="text-[13px] leading-[1.45] text-nebel-200 text-pretty">
          Abgesprochen wird über die WhatsApp-Gruppe. Zwei Dinge, die dabei erfahrungsgemäß
          schiefgehen: Im Gedränge bricht das Mobilnetz gern zusammen, und bei Kälte sind
          Handyakkus schneller leer als erwartet. Powerbank einpacken.
        </p>
      </InfoKarte>

      <Unbestaetigt>
        Zeitraum (20.11.–23.12.) und Öffnungszeiten 2026 sind von der Stadt bestätigt. Preise,
        Busumleitung und AdventTicket stammen noch aus dem Vorjahr — vor der Fahrt einmal auf
        der offiziellen Seite prüfen.
      </Unbestaetigt>

      <h3 className="zeit mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-birne-400">Nützliche Links</h3>
      <div className="flex flex-col gap-2">
        {links.map(l => (
          <Verweis key={l.url} href={l.url}>{l.label}</Verweis>
        ))}
      </div>
    </section>
  );
}

function InfoKarte({ titel, children }) {
  return (
    <div className="rounded-3xl bg-nacht-900 border border-nacht-800 p-[18px] flex flex-col gap-3">
      <span className="zeit text-[11px] font-medium uppercase tracking-[0.08em] text-birne-400">{titel}</span>
      {children}
    </div>
  );
}
