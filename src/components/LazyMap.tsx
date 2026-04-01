'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { DayConfig, STOP_COLORS } from '@/lib/types';
import NavPicker from './NavPicker';
import { useChecklist } from '@/hooks/useChecklist';

const DayMap = dynamic(() => import('./DayMap'), { ssr: false });

interface Props {
  config: DayConfig;
  onStopClick?: (index: number) => void;
  activeStop?: number | null;
}

const STOP_EMOJI: Record<string, string> = {
  gold: '⭐',
  food: '🍽️',
  hotel: '🏨',
  ferry: '⛴️',
  flight: '✈️',
  nature: '🌿',
  drive: '🚗',
};

export default function LazyMap({ config, onStopClick, activeStop }: Props) {
  const [showMap, setShowMap] = useState(false);
  const { toggle, isChecked } = useChecklist();

  if (showMap) {
    return <DayMap config={config} onStopClick={onStopClick} activeStop={activeStop} />;
  }

  return (
    <div className="w-full rounded-none md:rounded-xl overflow-hidden border-y md:border border-white/10 bg-surface">
      {/* Stop list — works offline */}
      <div className="divide-y divide-white/5">
        {config.stops.map((stop, i) => {
          const done = isChecked(stop.id);
          return (
          <div
            key={stop.id}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${done ? 'opacity-50' : ''}`}
          >
            <button
              onClick={() => toggle(stop.id)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all"
              style={{
                backgroundColor: done ? 'transparent' : STOP_COLORS[stop.type],
                color: done ? STOP_COLORS[stop.type] : '#0d0d0d',
                border: done ? `2px solid ${STOP_COLORS[stop.type]}` : 'none',
              }}
              title={done ? 'Отметить как не посещённое' : 'Отметить как посещённое'}
            >
              {done ? '✓' : (stop.num.length <= 2 ? stop.num : '★')}
            </button>

            <button
              onClick={() => onStopClick?.(i)}
              className="flex-1 text-left min-w-0"
            >
              <div className="text-sm text-text truncate">{stop.title}</div>
              <div className="text-xs text-muted-dark">{stop.time}</div>
            </button>

            <NavPicker
              lat={stop.pos.lat}
              lng={stop.pos.lng}
              title={stop.title}
              className="shrink-0 w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-base hover:bg-gold/20 transition-colors"
            />
          </div>
          );
        })}
      </div>

      {/* Load interactive map — needs internet */}
      <button
        onClick={() => setShowMap(true)}
        className="w-full px-4 py-3 flex items-center justify-center gap-2 text-xs text-muted-dark hover:text-gold transition-colors border-t border-white/5"
      >
        <span>🗺️</span>
        <span>Открыть интерактивную карту</span>
      </button>
    </div>
  );
}
