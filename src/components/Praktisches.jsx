import { Hotel, Car, Bus, Cloud, MessageCircle, ExternalLink, ParkingCircle, Clock, Phone, BedDouble } from 'lucide-react';
import { orteNachKategorie, getOrtById } from '../data/orte';
import Unbestaetigt from './Unbestaetigt';
import NaviButton from './NaviButton';
import { buchung, zimmer, hotelAussagen } from '../data/buchung';

const links = [
  {
    icon: <Bus size={15} />,
    label: 'PaderSprinter — Fahrpläne & Tickets',
    url: 'https://www.padersprinter.de',
  },
  {
    icon: <ParkingCircle size={15} />,
    label: 'Parken in Paderborn (Parkplan der Stadt)',
    url: 'https://www.paderborn.de/microsite/asp/parken_in_der_city/parkplan.php',
  },
  {
    icon: <Cloud size={15} />,
    label: 'Wetter Paderborn, 28.11.2026',
    url: 'https://www.google.com/search?q=wetter+paderborn+28.11.2026',
  },
  {
    icon: <ExternalLink size={15} />,
    label: 'Weihnachtsmarkt — offizielle Seite der Stadt',
    url: 'https://www.paderborn.de/microsite/weihnachtsmarkt/index.php',
  },
];

export default function Praktisches() {
  const hotel = getOrtById('hotel');
  const parken = orteNachKategorie('parken');

  return (
    <section className="px-4 py-8 max-w-lg mx-auto w-full">
      <h2 className="display text-3xl font-bold text-creme-100 mb-6 tracking-tight">Praktisches</h2>

      {/* Hotel */}
      <InfoKarte titel="Hotel" icon={<Hotel size={17} />}>
        <p className="text-creme-100 text-sm mb-1">{hotel.name} · {hotel.adresse}</p>
        <p className="text-holz-400 text-sm mb-3">{hotelAussagen.anreise}</p>

        <a
          href={buchung.telefonLink}
          className="inline-flex items-center gap-2 text-licht-400 hover:text-licht-300 text-sm mb-3 transition-colors"
        >
          <Phone size={14} />
          {buchung.telefon}
        </a>

        <div className="flex items-start gap-2 text-holz-400 text-sm mb-1">
          <BedDouble size={14} className="shrink-0 mt-0.5" />
          <span>
            <span className="text-creme-100">{buchung.zimmerGesamt} Doppelzimmer</span> für die
            Gruppe · Stornierung {buchung.stornierung}
          </span>
        </div>
        <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 list-none p-0">
          {zimmer.map(z => (
            <li key={z.nr} className="flex items-baseline gap-2 text-xs">
              <span className="zeit text-holz-400 shrink-0">{z.nr}</span>
              <span className="text-holz-300 min-w-0">{z.gaeste ?? z.typ}</span>
            </li>
          ))}
        </ul>
        <p className="text-holz-400 text-xs mt-2 leading-relaxed">
          Wer in welchem Zimmer schläft, steht noch nicht fest.
        </p>
        <div className="mt-3">
          <NaviButton ort={hotel} label="Route zum Hotel" voll />
        </div>
      </InfoKarte>

      {/* Anreise */}
      <InfoKarte titel="Anreise & Parken" icon={<Car size={17} />}>
        <p className="text-creme-100 text-sm mb-1">Mit mehreren Autos · Ankunft ca. 11:00</p>
        <p className="text-holz-400 text-sm mb-3">
          {hotelAussagen.parken} Es gibt also nichts vorab zu reservieren. Falls am
          1. Adventswochenende nicht alle Fahrzeuge unterkommen, hier die nächstgelegenen
          Parkhäuser:
        </p>
        <ul className="space-y-2">
          {parken.map(p => (
            <li key={p.id} className="bg-holz-950/60 rounded-kante px-3 py-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-creme-100 text-sm font-medium">{p.name}</p>
                  <p className="text-holz-400 text-xs">{p.adresse}</p>
                  {p.oeffnung && (
                    <p className="flex items-center gap-1 text-holz-400 text-xs mt-1">
                      <Clock size={11} /> {p.oeffnung}
                    </p>
                  )}
                </div>
                <a
                  href={p.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-licht-500 hover:text-licht-400 shrink-0 mt-0.5"
                  aria-label={`${p.name} auf Maps öffnen`}
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-holz-400 text-xs mt-3 leading-relaxed">
          Tipp: dem Parkleitsystem folgen — die Anzeigetafeln zeigen freie Plätze je Parkhaus.
        </p>
      </InfoKarte>

      {/* ÖPNV */}
      <InfoKarte titel="Vor Ort unterwegs" icon={<Bus size={17} />}>
        <p className="text-holz-400 text-sm mb-2">
          Alles Wichtige liegt fußläufig beieinander — Hotel, Brauhaus und Markt sind keine
          fünf Minuten auseinander. Bus braucht ihr eigentlich nicht.
        </p>
        <p className="text-holz-400 text-sm">
          Falls doch: Während des Weihnachtsmarkts halten die Busse an{' '}
          <span className="text-creme-100">Westerntor</span> und{' '}
          <span className="text-creme-100">Am Bogen</span> statt am Rathausplatz. Das
          AdventTicket kostet rund 2,00 € für 90 Minuten, am Wochenende fahren Nachtbusse.
        </p>
      </InfoKarte>

      {/* Koordination */}
      <InfoKarte titel="Koordination" icon={<MessageCircle size={17} />}>
        <p className="text-holz-400 text-sm">
          Abgesprochen wird über die WhatsApp-Gruppe. Zwei Dinge, die dabei erfahrungsgemäß
          schiefgehen: Im Gedränge bricht das Mobilnetz gern zusammen, und bei Kälte sind
          Handyakkus schneller leer als erwartet. Powerbank einpacken.
        </p>
      </InfoKarte>

      <Unbestaetigt className="mb-6">
        Alle Angaben zum Markt 2026 (Zeitraum, Öffnungszeiten, Preise) stammen von
        Portalseiten und sind nicht amtlich bestätigt — die Stadt hatte zum Zeitpunkt der
        Erstellung noch 2025 online. Vor der Fahrt einmal auf der offiziellen Seite prüfen.
      </Unbestaetigt>

      <h3 className="text-lg font-bold text-licht-400 mb-3">Nützliche Links</h3>
      <div className="space-y-2">
        {links.map(l => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-holz-900/60 hover:bg-holz-900 rounded-kante px-4 py-3 transition-colors"
          >
            <span className="text-licht-500 shrink-0">{l.icon}</span>
            <span className="text-creme-100 text-sm flex-1 min-w-0">{l.label}</span>
            <ExternalLink size={13} className="text-holz-400 shrink-0" />
          </a>
        ))}
      </div>
    </section>
  );
}

function InfoKarte({ titel, icon, children }) {
  return (
    <div className="bg-holz-900/60 rounded-kante p-4 mb-3">
      <div className="flex items-center gap-2 text-licht-500 mb-2">
        {icon}
        <span className="font-semibold text-creme-100">{titel}</span>
      </div>
      {children}
    </div>
  );
}
