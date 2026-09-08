import { AlertTriangle } from 'lucide-react';

// Kennzeichnet Angaben, die (noch) nicht amtlich bestätigt sind.
// Die Familie plant nach dieser Seite — geraten wird hier nichts.
export default function Unbestaetigt({ children, className = '' }) {
  return (
    <div className={`flex items-start gap-2.5 bg-holz-900/80 border border-holz-800 rounded-kante px-4 py-3 ${className}`}>
      <AlertTriangle size={15} className="text-licht-500 shrink-0 mt-0.5" />
      <p className="text-holz-300 text-xs leading-relaxed">{children}</p>
    </div>
  );
}
