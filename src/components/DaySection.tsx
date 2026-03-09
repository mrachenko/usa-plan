'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DayConfig, ROUTE_STYLES, RouteMode } from '@/lib/types';
import ScheduleTable from './ScheduleTable';
import DayMap from './DayMap';
import InfoBlock from './InfoBlock';
import StopPopup from './StopPopup';

interface Props {
  config: DayConfig;
}

const MODE_LABELS: Record<RouteMode, string> = {
  walking: '🚶 пешком',
  driving: '🚗 на машине',
  ferry: '⛴ паром',
  shuttle: '🚌 шаттл',
  flight: '✈️ перелёт',
  subway: '🚇 метро',
  taxi: '🚕 такси',
};

function RouteLegend({ routes }: { routes: DayConfig['routes'] }) {
  const modes = Array.from(new Set(routes.map(r => r.mode)));
  if (modes.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-4 mt-2 px-1">
      {modes.map(mode => (
        <div key={mode} className="flex items-center gap-2">
          <svg width="28" height="8" className="flex-shrink-0">
            {ROUTE_STYLES[mode].dashed ? (
              <line x1="0" y1="4" x2="28" y2="4"
                stroke={ROUTE_STYLES[mode].color} strokeWidth="3"
                strokeDasharray="5 3" strokeLinecap="round" />
            ) : (
              <line x1="0" y1="4" x2="28" y2="4"
                stroke={ROUTE_STYLES[mode].color} strokeWidth="3"
                strokeDasharray={mode === 'walking' ? '2 4' : 'none'}
                strokeLinecap="round" />
            )}
          </svg>
          <span className="text-xs text-muted-dark">{MODE_LABELS[mode]}</span>
        </div>
      ))}
    </div>
  );
}

const REGION_COLORS: Record<string, string> = {
  'new-york': '#e8c87a',
  'vegas-parks': '#e07040',
  'los-angeles': '#64b4ff',
  'maui': '#40c8a0',
  'transit': '#c8c0b4',
};

export default function DaySection({ config }: Props) {
  const [activeStop, setActiveStop] = useState<number | null>(null);
  const [popupStop, setPopupStop] = useState<number | null>(null);

  const handleStopClick = useCallback((index: number) => {
    setActiveStop(index);
    setPopupStop(index);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopupStop(null);
    setActiveStop(null);
  }, []);

  const regionColor = REGION_COLORS[config.region] || '#e8c87a';

  return (
    <motion.section
      id={`day-${config.dayNumber}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="py-12 md:py-16 scroll-mt-4"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Day header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-3"
        >
          <div
            className="w-1 h-12 rounded-full"
            style={{ backgroundColor: regionColor }}
          />
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-dark font-light">
              {config.date} · {config.weekday}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              День {config.dayNumber}{' '}
              <span style={{ color: regionColor }}>— {config.title}</span>
            </h2>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted leading-relaxed text-sm md:text-base max-w-3xl"
        >
          {config.description}
        </motion.p>
      </div>

      {/* Schedule table */}
      <div className="mb-8 bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
        <ScheduleTable
          stops={config.stops}
          routes={config.routes}
          onStopClick={handleStopClick}
          activeStop={activeStop}
        />
      </div>

      {/* Interactive map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-dark tracking-wider uppercase">🗺️ Карта маршрута</span>
          <span className="text-xs text-muted-dark">·</span>
          <span className="text-xs text-muted-dark">{config.transportSummary}</span>
        </div>
        <DayMap
          config={config}
          onStopClick={handleStopClick}
          activeStop={activeStop}
        />
        <RouteLegend routes={config.routes} />
      </motion.div>

      {/* Info blocks */}
      {config.infoBlocks.length > 0 && (
        <div className="space-y-3">
          {config.infoBlocks.map((block, i) => (
            <InfoBlock key={i} block={block} />
          ))}
        </div>
      )}

      {/* Stop popup */}
      <StopPopup
        stop={popupStop !== null ? config.stops[popupStop] : null}
        onClose={handleClosePopup}
      />
    </motion.section>
  );
}
