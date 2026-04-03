'use client';

import { useState, useEffect } from 'react';
import { packItems, REGION_PACK, PackCategory } from '@/data/packing';

const STORAGE_KEY = 'usa-plan-packed';

interface Props {
  region: string;
}

function loadPacked(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  } catch { return new Set(); }
}

export default function DayPacking({ region }: Props) {
  const [packed, setPacked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { setPacked(loadPacked()); }, []);

  const categories = REGION_PACK[region] || ['always'];
  const items = packItems.filter(i =>
    i.categories.some(c => categories.includes(c))
  );

  const toggle = (id: string) => {
    setPacked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const packedCount = items.filter(i => packed.has(i.id)).length;
  const allPacked = packedCount === items.length;

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-gold/20 transition-colors"
      >
        <span className="text-xs text-muted-dark flex items-center gap-2">
          <span>🎒</span>
          <span>Что взять сегодня</span>
        </span>
        <span className={`text-xs ${allPacked ? 'text-gold' : 'text-muted-dark'}`}>
          {packedCount}/{items.length} ✓
        </span>
      </button>
    );
  }

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(false)}
        className="w-full flex items-center justify-between px-4 py-3 border-b border-white/5"
      >
        <span className="text-xs font-medium flex items-center gap-2">
          <span>🎒</span>
          <span>Что взять сегодня</span>
        </span>
        <span className="text-xs text-muted-dark">▲ свернуть</span>
      </button>
      <div className="px-2 py-1">
        {items.map(item => {
          const done = packed.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-white/[0.03] transition-colors ${done ? 'opacity-40' : ''}`}
            >
              <span className={`w-4 h-4 rounded border flex items-center justify-center text-[8px] shrink-0 ${
                done ? 'border-gold bg-gold/20 text-gold' : 'border-white/20'
              }`}>
                {done && '✓'}
              </span>
              <span className="text-xs shrink-0">{item.emoji}</span>
              <span className={`text-xs ${done ? 'line-through text-muted-dark' : 'text-text'}`}>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
