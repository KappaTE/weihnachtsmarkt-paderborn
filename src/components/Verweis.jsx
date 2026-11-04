import { ExternalLink } from 'lucide-react';

// Zeile für externe Links (Stadtseiten, Fahrpläne).
export default function Verweis({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 min-h-12 px-4 rounded-2xl bg-nacht-900 hover:bg-nacht-850 transition-colors"
    >
      <span className="flex-1 min-w-0 text-sm">{children}</span>
      <ExternalLink size={13} className="text-nebel-400 shrink-0" />
    </a>
  );
}
