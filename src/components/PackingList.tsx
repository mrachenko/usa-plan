'use client';

import { useState, useEffect } from 'react';
import { packItems, PACK_CATEGORIES, BUY_LABELS, PackCategory } from '@/data/packing';

const STORAGE_KEY = 'usa-plan-packed';

function loadPacked(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  } catch { return new Set(); }
}

export default function PackingList() {
  const [packed, setPacked] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<PackCategory | 'all' | 'buy'>('all');

  useEffect(() => { setPacked(loadPacked()); }, []);

  const toggle = (id: string) => {
    setPacked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const filtered = filter === 'all'
    ? packItems
    : filter === 'buy'
      ? packItems.filter(i => i.buy && i.buy !== 'have')
      : packItems.filter(i => i.categories.includes(filter));

  const totalPacked = packItems.filter(i => packed.has(i.id)).length;
  const progress = Math.round((totalPacked / packItems.length) * 100);

  return (
    <div>
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-dark mb-1">
          <span>{totalPacked} из {packItems.length} собрано</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1 flex-wrap mb-4">
        <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>Всё</FilterBtn>
        <FilterBtn active={filter === 'buy'} onClick={() => setFilter('buy')}>🛒 Купить</FilterBtn>
        {(Object.keys(PACK_CATEGORIES) as PackCategory[]).map(key => (
          <FilterBtn key={key} active={filter === key} onClick={() => setFilter(key)}>
            {PACK_CATEGORIES[key].emoji} {PACK_CATEGORIES[key].label}
          </FilterBtn>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-1">
        {filtered.map(item => {
          const done = packed.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors hover:bg-white/[0.03] ${done ? 'opacity-40' : ''}`}
            >
              <span className={`w-5 h-5 rounded border-2 flex items-center justify-center text-[10px] shrink-0 transition-colors ${
                done ? 'border-gold bg-gold/20 text-gold' : 'border-white/20'
              }`}>
                {done && '✓'}
              </span>
              <span className="text-sm shrink-0">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <span className={`text-sm ${done ? 'line-through' : ''}`}>{item.name}</span>
                {item.note && <span className="text-xs text-muted-dark ml-2 hidden md:inline">— {item.note}</span>}
              </div>
              {item.buy && item.buy !== 'have' && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded shrink-0"
                  style={{ color: BUY_LABELS[item.buy].color, backgroundColor: `${BUY_LABELS[item.buy].color}15` }}
                >
                  {BUY_LABELS[item.buy].label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
        active ? 'bg-gold/20 text-gold border border-gold/40' : 'bg-white/5 text-muted-dark border border-white/10 hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}
