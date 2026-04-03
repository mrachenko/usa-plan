'use client';

import { useState } from 'react';
import { planBData } from '@/data/planb';
import NavPicker from './NavPicker';

const PLAN_B_COLORS = ['#e8c87a', '#64b4ff', '#40c8a0'];

const TYPE_GRADIENTS = [
  'from-yellow-900/30 to-amber-900/15',
  'from-blue-900/30 to-cyan-900/15',
  'from-emerald-900/30 to-green-900/15',
];

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
        <div className="px-3 pb-3 space-y-3">
          {data.options.map((opt, i) => {
            const color = PLAN_B_COLORS[i % 3];
            const gradient = TYPE_GRADIENTS[i % 3];
            return (
              <div key={i} className="border border-white/5 rounded-xl overflow-hidden">
                {/* Header with gradient — like main stop cards */}
                <div className={`bg-gradient-to-br ${gradient} px-4 py-4`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ backgroundColor: color, color: '#0d0d0d' }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <h4 className="font-display text-base font-bold" style={{ color }}>
                      {opt.name}
                    </h4>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{opt.why}</p>
                  {opt.desc && (
                    <p className="text-xs text-muted-dark mt-2 leading-relaxed">{opt.desc}</p>
                  )}
                </div>

                {/* Actions — like main stop popup */}
                {opt.pos && (
                  <div className="flex border-t border-white/5 bg-white/[0.02]">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(opt.name)}&center=${opt.pos.lat},${opt.pos.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium text-muted-dark hover:text-gold transition-colors"
                    >
                      <span>🗺️</span>
                      <span>Открыть место</span>
                    </a>
                    <div className="w-px bg-white/5" />
                    <div className="flex-1 flex items-center justify-center">
                      <NavPicker
                        lat={opt.pos.lat}
                        lng={opt.pos.lng}
                        title={opt.name}
                        className="flex items-center justify-center gap-2 py-3 text-xs font-medium text-muted-dark hover:text-gold transition-colors w-full"
                      >
                        <span>🧭</span>
                        <span>Маршрут</span>
                      </NavPicker>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
