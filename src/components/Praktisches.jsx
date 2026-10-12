import { ChevronRight, ExternalLink } from 'lucide-react';
import { orteNachKategorie, getOrtById } from '../data/orte';
import { buchung, zimmer, hotelAussagen } from '../data/buchung';
import { useApp } from '../state/AppZustand';
import Unbestaetigt from './Unbestaetigt';
import NaviButton from './NaviButton';

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
    <section className="px-[18px] pt-[22px] pb-10 flex flex-col gap-2.5">
      <h2 className="display text-[32px] font-bold text-creme-100 mb-2.5 tracking-tight leading-tight">Praktisches</h2>

      <InfoKarte titel="Hotel">
        <p className="display text-lg font-semibold leading-tight text-creme-100">{hotel.name}</p>
        <p className="-mt-1.5 text-[13px] text-holz-400">{hotel.adresse}</p>
        <p className="text-[13px] leading-relaxed text-holz-400">{hotelAussagen.anreise}</p>
        <a
          href={buchung.telefonLink}
          className="flex items-center justify-between min-h-11 px-3.5 border border-holz-700 rounded-kante text-licht-400 hover:text-licht-300 transition-colors"
        >
          <span className="zeit text-sm font-medium">{buchung.telefon}</span>
          <span className="text-xs font-medium text-holz-400">Anrufen</span>
        </a>
        <p className="mt-1 text-[13px] text-holz-400">
          <span className="text-creme-100">{buchung.zimmerGesamt} Doppelzimmer</span> für die
          Gruppe · Stornierung {buchung.stornierung}
        </p>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 list-none p-0 m-0">
          {zimmer.map(z => (
            <li key={z.nr} className="flex items-baseline gap-2 text-xs">
              <span className="zeit text-holz-400 shrink-0">{z.nr}</span>
              <span className="text-holz-300 min-w-0">{z.gaeste ?? kurz(z.typ)}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-normal text-holz-400">
          Wer in welchem Zimmer schläft, steht noch nicht fest. {hotelAussagen.namensliste}
        </p>
        <NaviButton ort={hotel} label="Route zum Hotel" voll />
      </InfoKarte>

      <InfoKarte titel="Anreise & Parken">
        <p className="text-sm text-creme-100">Mit mehreren Autos · Ankunft ca. 11:00</p>
        <p className="text-[13px] leading-relaxed text-holz-400">
          {hotelAussagen.parken} Es gibt also nichts vorab zu reservieren. Falls am
          1. Adventswochenende nicht alle Fahrzeuge unterkommen:
        </p>
        {parken.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => openOrt(p.id)}
            className="flex items-center gap-2.5 px-3 py-2.5 bg-holz-950/60 rounded-kante text-left"
          >
            <span className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span className="text-sm font-medium text-creme-100">{p.name}</span>
              <span className="text-xs text-holz-400">{p.beschreibung}</span>
            </span>
            <ChevronRight size={16} className="text-holz-500 shrink-0" />
          </button>
        ))}
        <p className="text-xs leading-normal text-holz-400">
          Tipp: dem Parkleitsystem folgen — die Anzeigetafeln zeigen freie Plätze je Parkhaus.
        </p>
      </InfoKarte>

      <InfoKarte titel="Vor Ort unterwegs">
        <p className="text-[13px] leading-relaxed text-holz-400">
          Alles Wichtige liegt fußläufig beieinander — Hotel, Brauhaus und Markt sind keine
          fünf Minuten auseinander. Bus braucht ihr eigentlich nicht.
        </p>
        <p className="text-[13px] leading-relaxed text-holz-400">
          Falls doch: Während des Weihnachtsmarkts halten die Busse an{' '}
          <span className="text-creme-100">Westerntor</span> und{' '}
          <span className="text-creme-100">Am Bogen</span> statt am Rathausplatz. Das
          AdventTicket kostet rund 2,00 € für 90 Minuten, am Wochenende fahren Nachtbusse.
        </p>
      </InfoKarte>

      <InfoKarte titel="Koordination">
        <p className="text-[13px] leading-relaxed text-holz-400">
          Abgesprochen wird über die WhatsApp-Gruppe. Zwei Dinge, die dabei erfahrungsgemäß
          schiefgehen: Im Gedränge bricht das Mobilnetz gern zusammen, und bei Kälte sind
          Handyakkus schneller leer als erwartet. Powerbank einpacken.
        </p>
      </InfoKarte>

      <Unbestaetigt className="my-1.5">
        Alle Angaben zum Markt 2026 (Zeitraum, Öffnungszeiten, Preise) stammen von
        Portalseiten und sind nicht amtlich bestätigt — die Stadt hatte zum Zeitpunkt der
        Erstellung noch 2025 online. Vor der Fahrt einmal auf der offiziellen Seite prüfen.
      </Unbestaetigt>

      <h3 className="zeit mt-2 mb-0.5 text-[11px] uppercase tracking-[0.15em] text-licht-400">Nützliche Links</h3>
      {links.map(l => (
        <a
          key={l.url}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 min-h-12 px-4 bg-holz-900/60 hover:bg-holz-900 rounded-kante transition-colors"
        >
          <span className="flex-1 min-w-0 text-sm text-creme-100">{l.label}</span>
          <ExternalLink size={13} className="text-holz-400 shrink-0" />
        </a>
      ))}
    </section>
  );
}

function InfoKarte({ titel, children }) {
  return (
    <div className="bg-holz-900/60 rounded-kante p-4 flex flex-col gap-2.5">
      <span className="zeit text-[11px] uppercase tracking-[0.15em] text-licht-500">{titel}</span>
      {children}
    </div>
  );
}
