'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DayConfig, ROUTE_STYLES, RouteMode } from '@/lib/types';
import ScheduleTable from './ScheduleTable';
import ScheduleTimeline from './ScheduleTimeline';
import LazyMap from './LazyMap';
import InfoBlock from './InfoBlock';
import StopPopup from './StopPopup';
import PhotoGallery from './PhotoGallery';
import DayNotes from './DayNotes';
import DayPacking from './DayPacking';
import PlanB from './PlanB';
import DesertChecklist from './DesertChecklist';
import WeatherWidget from './WeatherWidget';
import ShareDay from './ShareDay';
import { sunData } from '@/data/sun';

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

const TIMEZONE_INFO: Record<string, { zone: string; utc: string; msk: string }> = {
  'new-york':   { zone: 'EST (UTC−4)', utc: '-4', msk: 'МСК −7ч' },
  'vegas-parks': { zone: 'PST (UTC−7)', utc: '-7', msk: 'МСК −10ч' },
  'los-angeles': { zone: 'PST (UTC−7)', utc: '-7', msk: 'МСК −10ч' },
  'maui':        { zone: 'HST (UTC−10)', utc: '-10', msk: 'МСК −13ч' },
  'transit':     { zone: '', utc: '', msk: '' },
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

        {/* Quick glance — operational summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-dark mb-4"
        >
          <span>{config.stops[0]?.time} — {config.stops[config.stops.length - 1]?.time}</span>
          <span>{config.stops.length} точек</span>
          <span>{config.transportSummary}</span>
          {TIMEZONE_INFO[config.region]?.zone && (
            <span>🕐 {TIMEZONE_INFO[config.region].msk}</span>
          )}
          {sunData[config.dayNumber] && (
            <span>☀️ {sunData[config.dayNumber].sunrise} → 🌅 {sunData[config.dayNumber].sunset}</span>
          )}
          <WeatherWidget dayNumber={config.dayNumber} />
          <ShareDay dayNumber={config.dayNumber} date={config.date} title={config.title} stopsCount={config.stops.length} />
          {config.stops.find(s => s.type === 'hotel') && (
            <span>🏨 {config.stops.find(s => s.type === 'hotel')?.title}</span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted leading-relaxed text-sm md:text-base max-w-3xl space-y-3"
        >
          {config.description.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </motion.div>
      </div>

      {/* Photo gallery */}
      {config.gallery && config.gallery.length > 0 && (
        <div data-gallery>
          <PhotoGallery images={config.gallery} />
        </div>
      )}

      {/* Schedule: timeline on mobile, table on desktop */}
      <div className="mb-8 bg-white/[0.02] border border-white/5 rounded-none md:rounded-xl overflow-hidden">
        <div className="md:hidden">
          <ScheduleTimeline
            stops={config.stops}
            routes={config.routes}
            onStopClick={handleStopClick}
            activeStop={activeStop}
          />
        </div>
        <div className="hidden md:block">
          <ScheduleTable
            stops={config.stops}
            routes={config.routes}
            onStopClick={handleStopClick}
            activeStop={activeStop}
          />
        </div>
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
        <LazyMap
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

      {/* Day tools */}
      <div className="mt-6 space-y-3">
        <DesertChecklist dayNumber={config.dayNumber} />
        <DayPacking region={config.region} />
        <PlanB dayNumber={config.dayNumber} />
        <DayNotes dayNumber={config.dayNumber} />
      </div>

      {/* Stop popup */}
      <StopPopup
        stop={popupStop !== null ? config.stops[popupStop] : null}
        onClose={handleClosePopup}
      />
    </motion.section>
  );
}
