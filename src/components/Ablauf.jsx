import { useState } from 'react';
import { ablauf } from '../data/ablauf';
import Zeitachse from './Zeitachse';
import NaechsterPunkt from './NaechsterPunkt';
import BarListe from './BarListe';

export default function Ablauf() {
  const [aktiv, setAktiv] = useState(0);
  const tag = ablauf[aktiv];

  return (
    <section className="px-4 py-8 max-w-lg mx-auto w-full">
      <h2 className="display text-3xl font-bold text-creme-100 mb-1 tracking-tight">Ablauf</h2>
      <p className="zeit text-licht-400 text-xs uppercase tracking-[0.15em] mb-4">
        {tag.kontext}
      </p>

      <div className="flex border border-holz-800 rounded-kante overflow-hidden mb-6">
        {ablauf.map((t, i) => (
          <button
            key={t.tag}
            onClick={() => setAktiv(i)}
            className={`flex-1 py-2.5 px-3 text-sm font-medium transition-colors ${
              i === aktiv
                ? 'bg-holz-900 text-creme-100'
                : 'bg-transparent text-holz-400 hover:text-creme-100'
            }`}
          >
            {t.tag === 'sa' ? 'Samstag' : 'Sonntag'}
          </button>
        ))}
      </div>

      <p className="text-holz-400 text-sm leading-relaxed mb-6 max-w-prose">{tag.hinweis}</p>

      <NaechsterPunkt className="mb-8" />

      <Zeitachse tag={tag} />

      {tag.tag === 'sa' && <BarListe className="mt-4" />}
    </section>
  );
}
