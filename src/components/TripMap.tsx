'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./TripMapView'), { ssr: false });

export default function TripMap() {
  const [show, setShow] = useState(false);

  if (show) return <MapView />;

  return (
    <button
      onClick={() => setShow(true)}
      className="w-full h-[300px] md:h-[400px] rounded-xl border border-white/10 bg-surface flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-gold/30 transition-colors"
    >
      <span className="text-4xl">🗺️</span>
      <span className="text-sm text-muted">Показать карту всего маршрута</span>
      <span className="text-xs text-muted-dark">7 городов · 5 000+ км</span>
    </button>
  );
}
