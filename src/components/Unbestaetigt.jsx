import { TriangleAlert } from 'lucide-react';

// Kennzeichnet Angaben, die (noch) nicht amtlich bestätigt sind.
// Die Familie plant nach dieser Seite — geraten wird hier nichts.
export default function Unbestaetigt({ children, className = '' }) {
  return (
    <div className={`flex items-start gap-2.5 px-3.5 py-3 rounded-2xl bg-nacht-900 border border-nacht-800 ${className}`}>
      <TriangleAlert size={15} className="text-birne-400 shrink-0 mt-px" />
      <p className="text-nebel-200 text-[12.5px] leading-[1.45] text-pretty">{children}</p>
    </div>
  );
}
