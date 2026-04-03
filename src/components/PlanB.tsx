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
        <div className="px-3 pb-3 space-y-3">
          {data.options.map((opt, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
              {/* Card header with image placeholder */}
              <div className="flex items-stretch">
                <div className="w-20 shrink-0 bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center text-2xl">
                  {i === 0 ? '🏛️' : i === 1 ? '🌊' : '🎯'}
                </div>
                <div className="flex-1 p-3 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-sm text-text font-medium truncate">{opt.name}</h4>
                      <p className="text-xs text-muted-dark mt-1 leading-relaxed">{opt.why}</p>
                      {opt.desc && (
                        <p className="text-xs text-muted mt-1 leading-relaxed">{opt.desc}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {opt.pos && (
                <div className="flex border-t border-white/5">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(opt.name)}&center=${opt.pos.lat},${opt.pos.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] text-muted-dark hover:text-gold transition-colors"
                  >
                    <span>🗺️</span>
                    <span>Место</span>
                  </a>
                  <div className="w-px bg-white/5" />
                  <div className="flex-1 flex items-center justify-center">
                    <NavPicker
                      lat={opt.pos.lat}
                      lng={opt.pos.lng}
                      title={opt.name}
                      className="flex items-center justify-center gap-1.5 py-2.5 text-[11px] text-muted-dark hover:text-gold transition-colors w-full"
                    >
                      <span>🧭</span>
                      <span>Маршрут</span>
                    </NavPicker>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
