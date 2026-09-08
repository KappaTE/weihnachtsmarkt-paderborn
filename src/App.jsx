import { useState } from 'react';
import { Home, CalendarDays, TreePine, Map, Info } from 'lucide-react';
import Hero from './components/Hero';
import Ablauf from './components/Ablauf';
import Marktbereiche from './components/Marktbereiche';
import Karte from './components/Karte';
import Praktisches from './components/Praktisches';

const TABS = [
  { id: 'hero', label: 'Start', icon: Home },
  { id: 'ablauf', label: 'Ablauf', icon: CalendarDays },
  { id: 'markt', label: 'Markt', icon: TreePine },
  { id: 'karte', label: 'Karte', icon: Map },
  { id: 'info', label: 'Info', icon: Info },
];

export default function App() {
  const [aktiv, setAktiv] = useState('hero');

  return (
    <div className="min-h-screen bg-holz-950 text-creme-100 flex flex-col max-w-lg mx-auto relative">
      <main className="flex-1 pb-20">
        {aktiv === 'hero' && <Hero onNavigate={setAktiv} />}
        {aktiv === 'ablauf' && <Ablauf />}
        {aktiv === 'markt' && <Marktbereiche />}
        {aktiv === 'karte' && <Karte />}
        {aktiv === 'info' && <Praktisches />}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-holz-950/95 backdrop-blur border-t border-holz-800 z-[1000]">
        <div className="flex">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = aktiv === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAktiv(tab.id)}
                className={`flex-1 min-w-0 flex flex-col items-center gap-1.5 py-3 text-[11px] tracking-wide transition-colors ${
                  isActive ? 'text-licht-400' : 'text-holz-400 hover:text-creme-100'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
