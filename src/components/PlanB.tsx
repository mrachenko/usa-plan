'use client';

import { useState } from 'react';
import { planBData } from '@/data/planb';
import NavPicker from './NavPicker';

interface Props {
  dayNumber: number;
}

export default function PlanB({ dayNumber }: Props) {
  const [open, setOpen] = useState(false);
  const data = planBData[dayNumber];

  if (!data) return null;

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.03] transition-colors"
      >
        <span className="text-xs text-muted-dark flex items-center gap-2">
          <span>🔄</span>
          <span>План Б</span>
          <span className="text-muted-dark/50">— {data.problem}</span>
        </span>
        <span className="text-xs text-muted-dark">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-2">
          {data.options.map((opt, i) => (
            <div key={i} className="flex gap-3 p-3 bg-white/[0.02] rounded-lg">
              <span className="text-gold text-sm font-bold shrink-0 pt-0.5">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-text font-medium">{opt.name}</div>
                <div className="text-xs text-muted-dark mt-0.5">{opt.why}</div>
              </div>
              {opt.pos && (
                <NavPicker
                  lat={opt.pos.lat}
                  lng={opt.pos.lng}
                  title={opt.name}
                  className="shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm hover:bg-gold/20 transition-colors"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
