import { House, CalendarDays, TreePine, Map, Info } from 'lucide-react';
import Hero from './components/Hero';
import Ablauf from './components/Ablauf';
import Marktbereiche from './components/Marktbereiche';
import Karte from './components/Karte';
import Praktisches from './components/Praktisches';
import Sheet from './components/Sheet';
import { AppZustand, useApp } from './state/AppZustand';

const TABS = [
  { id: 'hero', label: 'Start', icon: House },
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

// Abstand der schwebenden Leiste zum unteren Rand — respektiert die Home-Leiste am iPhone.
const NAV_UNTEN = 'max(16px, calc(env(safe-area-inset-bottom) - 6px))';

function Rahmen() {
  const { tab, setTab } = useApp();

  return (
    <div className="min-h-screen bg-nacht-950 text-schnee flex flex-col max-w-lg mx-auto relative">
      <main className="flex-1 pb-[calc(130px+env(safe-area-inset-bottom))]">
        {tab === 'hero' && <Hero />}
        {tab === 'ablauf' && <Ablauf />}
        {tab === 'markt' && <Marktbereiche />}
        {tab === 'karte' && <Karte />}
        {tab === 'info' && <Praktisches />}
      </main>

      {/* Inhalt läuft unter der Leiste ins Dunkel aus, statt hart abgeschnitten zu werden. */}
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[130px] pointer-events-none z-[990] bg-[linear-gradient(transparent,#0C0F14_55%)]"
      />

      <nav
        className="fixed left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[480px] h-16 z-[1000] flex items-center px-1.5 rounded-[32px] bg-nacht-850/92 backdrop-blur border border-nacht-700"
        style={{ bottom: NAV_UNTEN }}
      >
        {TABS.map(t => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 min-w-0 h-[52px] rounded-[26px] flex flex-col items-center justify-center gap-[3px] text-[10.5px] transition-colors ${
                isActive ? 'bg-birne-400/14 text-birne-400 font-semibold' : 'text-nebel-400 hover:text-schnee'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.75} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </nav>

      <Sheet />
    </div>
  );
}
