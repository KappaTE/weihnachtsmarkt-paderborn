import { Home, CalendarDays, TreePine, Map, Info } from 'lucide-react';
import Hero from './components/Hero';
import Ablauf from './components/Ablauf';
import Marktbereiche from './components/Marktbereiche';
import Karte from './components/Karte';
import Praktisches from './components/Praktisches';
import Sheet from './components/Sheet';
import { AppZustand, useApp } from './state/AppZustand';

const TABS = [
  { id: 'hero', label: 'Start', icon: Home },
  { id: 'ablauf', label: 'Ablauf', icon: CalendarDays },
  { id: 'markt', label: 'Markt', icon: TreePine },
  { id: 'karte', label: 'Karte', icon: Map },
  { id: 'info', label: 'Info', icon: Info },
];

export default function App() {
  return (
    <AppZustand>
      <Rahmen />
    </AppZustand>
  );
}

function Rahmen() {
  const { tab, setTab } = useApp();

  return (
    <div className="min-h-screen bg-holz-950 text-creme-100 flex flex-col max-w-lg mx-auto relative">
      <main className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))]">
        {tab === 'hero' && <Hero />}
        {tab === 'ablauf' && <Ablauf />}
        {tab === 'markt' && <Marktbereiche />}
        {tab === 'karte' && <Karte />}
        {tab === 'info' && <Praktisches />}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-holz-950/95 backdrop-blur border-t border-holz-800 z-[1000] pb-[env(safe-area-inset-bottom)]">
        <div className="flex h-16">
          {TABS.map(t => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex-1 min-w-0 flex flex-col items-center justify-center gap-1.5 text-[11px] tracking-wide transition-colors ${
                  isActive ? 'text-licht-400' : 'text-holz-400 hover:text-creme-100'
                }`}
              >
                <Icon size={21} strokeWidth={isActive ? 2.4 : 1.5} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <Sheet />
    </div>
  );
}
