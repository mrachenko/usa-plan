'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { DayConfig } from '@/lib/types';

const DayMap = dynamic(() => import('./DayMap'), { ssr: false });

interface Props {
  config: DayConfig;
  onStopClick?: (index: number) => void;
  activeStop?: number | null;
}

export default function LazyMap({ config, onStopClick, activeStop }: Props) {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return <DayMap config={config} onStopClick={onStopClick} activeStop={activeStop} />;
  }

  return (
    <button
      onClick={() => setShowMap(true)}
      className="w-full h-[400px] md:h-[500px] rounded-none md:rounded-xl overflow-hidden border-y md:border border-white/10 bg-surface flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-gold/30 transition-colors"
    >
      <span className="text-3xl">🗺️</span>
      <span className="text-sm text-muted">Загрузить карту</span>
      <span className="text-xs text-muted-dark">{config.stops.length} точек · {config.transportSummary}</span>
    </button>
  );
}
