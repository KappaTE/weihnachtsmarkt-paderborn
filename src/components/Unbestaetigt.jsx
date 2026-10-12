import { AlertTriangle } from 'lucide-react';

// Kennzeichnet Angaben, die (noch) nicht amtlich bestätigt sind.
// Die Familie plant nach dieser Seite — geraten wird hier nichts.
export default function Unbestaetigt({ children, className = '' }) {
  return (
    <div className={`flex items-start gap-2.5 bg-holz-900/80 shadow-[inset_0_0_0_1px_#2A2320] rounded-kante px-3.5 py-3 ${className}`}>
      <AlertTriangle size={15} className="text-licht-500 shrink-0 mt-px" />
      <p className="text-holz-300 text-xs leading-relaxed">{children}</p>
    </div>
  );
}
