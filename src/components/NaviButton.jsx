import { Navigation } from 'lucide-react';

// Startet direkt die Google-Maps-Navigation zum Ziel, statt nur die Suche zu öffnen.
// `voll` macht daraus einen breiten Button für die beiden Fixpunkte.
export default function NaviButton({ ort, label, voll = false }) {
  if (!ort?.naviLink) return null;
  const text = label ?? `Route zu ${ort.name}`;

  if (voll) {
    return (
      <a
        href={ort.naviLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full min-h-12 border border-licht-500/60 hover:border-licht-400 hover:bg-licht-500/10 text-licht-300 text-sm font-medium px-4 rounded-kante transition-colors"
      >
        <Navigation size={15} />
        {text}
      </a>
    );
  }

  return (
    <a
      href={ort.naviLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 border border-licht-500/50 text-licht-400 hover:bg-licht-500/10 text-xs px-3 py-1.5 rounded-kante transition-colors"
    >
      <Navigation size={12} />
      {text}
    </a>
  );
}
