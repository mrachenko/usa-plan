'use client';

import { useState, useEffect } from 'react';
import { desertChecklist } from '@/data/planb';

const STORAGE_KEY = 'usa-plan-desert-check';

// Only show for park/roadtrip days (6-10)
const DESERT_DAYS = new Set([6, 7, 8, 9, 10]);

interface Props {
  dayNumber: number;
}

export default function DesertChecklist({ dayNumber }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(new Set(JSON.parse(saved)));
    } catch {}
  }, []);

  if (!DESERT_DAYS.has(dayNumber)) return null;

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const doneCount = desertChecklist.filter(i => checked.has(i.id)).length;

  return (
    <div className="bg-red-950/20 border border-red-400/20 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <span className="text-xs text-red-400 flex items-center gap-2 font-medium">
          <span>🏜️</span>
          <span>Чек-лист перед перегоном</span>
        </span>
        <span className={`text-xs ${doneCount === desertChecklist.length ? 'text-gold' : 'text-red-400/60'}`}>
          {doneCount}/{desertChecklist.length} {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div className="px-2 pb-2">
          {desertChecklist.map(item => {
            const done = checked.has(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`flex items-center gap-2 px-2 py-2 rounded cursor-pointer hover:bg-white/[0.03] transition-colors ${done ? 'opacity-40' : ''}`}
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center text-[8px] shrink-0 ${
                  done ? 'border-gold bg-gold/20 text-gold' : 'border-red-400/40'
                }`}>
                  {done && '✓'}
                </span>
                <span className="text-sm shrink-0">{item.emoji}</span>
                <span className={`text-xs ${done ? 'line-through text-muted-dark' : 'text-text'}`}>{item.text}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
