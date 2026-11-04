import { Navigation } from 'lucide-react';

// Startet direkt die Google-Maps-Navigation zum Ziel, statt nur die Suche zu öffnen.
// `voll` macht daraus eine breite Pille, sonst eine kleine für Listen und Karten.
export default function NaviButton({ ort, label, voll = false }) {
  if (!ort?.naviLink) return null;
  const text = label ?? `Route zu ${ort.name}`;

  if (voll) {
    return (
      <a
        href={ort.naviLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full min-h-[46px] px-4 rounded-full border border-birne-400 text-birne-100 text-sm font-medium hover:bg-birne-400/10 transition-colors"
      >
        <Navigation size={15} className="text-birne-400" />
        {text}
      </a>
    );
  }

  return (
    <a
      href={ort.naviLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 min-h-8 px-3 rounded-full border border-birne-400/50 text-birne-400 text-xs hover:bg-birne-400/10 transition-colors"
    >
      <Navigation size={12} />
      {text}
    </a>
  );
}
