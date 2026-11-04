import { useState } from 'react';
import { ablauf } from '../data/ablauf';
import Zeitachse from './Zeitachse';
import BarListe from './BarListe';
import Segmente from './Segmente';

export default function Ablauf() {
  const [aktiv, setAktiv] = useState('sa');
  const tag = ablauf.find(t => t.tag === aktiv);

  return (
    <section className="px-5 pt-[calc(14px+env(safe-area-inset-top))] flex flex-col gap-3.5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[34px] font-bold leading-none tracking-[-0.02em]">Ablauf</h2>
        <Segmente
          label="Tag"
          optionen={ablauf.map(t => ({ id: t.tag, label: t.tag === 'sa' ? 'Samstag' : 'Sonntag' }))}
          aktiv={aktiv}
          onWahl={setAktiv}
        />
      </div>
      <p className="zeit text-xs text-birne-400">{tag.kontext}</p>

      <div className="mt-3">
        <Zeitachse tag={tag} />
      </div>

      {tag.tag === 'sa' && <BarListe className="mt-2" />}
    </section>
  );
}
