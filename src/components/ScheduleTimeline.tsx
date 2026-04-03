'use client';

import { motion } from 'framer-motion';
import { Stop, RouteSegment, RouteMode, STOP_COLORS, ROUTE_STYLES } from '@/lib/types';

const MODE_ICONS: Record<RouteMode, string> = {
  walking: '🚶',
  driving: '🚗',
  ferry: '⛴',
  shuttle: '🚌',
  flight: '✈️',
  subway: '🚇',
  taxi: '🚕',
};

const MODE_LABELS: Record<RouteMode, string> = {
  walking: 'пешком',
  driving: 'на машине',
  ferry: 'паром',
  shuttle: 'шаттл',
  flight: 'перелёт',
  subway: 'метро',
  taxi: 'такси',
};

interface Props {
  stops: Stop[];
  routes: RouteSegment[];
  onStopClick?: (index: number) => void;
  activeStop?: number | null;
}

export default function ScheduleTimeline({ stops, routes, onStopClick, activeStop }: Props) {
  const routeFromStop = new Map<number, RouteSegment>();
  routes.forEach(r => routeFromStop.set(r.from, r));

  let prevMode: RouteMode | null = null;

  return (
    <div className="relative">
      {stops.map((stop, i) => {
        const route = routeFromStop.get(i);
        const showTransport = route && route.mode !== prevMode;
        if (route) prevMode = route.mode;
        const color = STOP_COLORS[stop.type];
        const isActive = activeStop === i;

        return (
          <div key={stop.id}>
            {/* Stop card */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              onClick={() => onStopClick?.(i)}
              className={`
                flex gap-3 py-3 px-3 cursor-pointer rounded-lg transition-colors
                ${isActive ? 'bg-white/5' : 'hover:bg-white/[0.03]'}
              `}
            >
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center pt-1 shrink-0 w-7">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: color, color: '#0d0d0d' }}
                >
                  {stop.num.length <= 2 ? stop.num : '★'}
                </span>
                {i < stops.length - 1 && (
                  <div className="w-px flex-1 mt-1 min-h-[16px] bg-white/10" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-muted-dark font-light tracking-wide shrink-0">
                    {stop.time}
                  </span>
                  <span className="font-medium text-sm truncate">{stop.title}</span>
                  {stop.photoTip && <span className="text-[10px] shrink-0" title={stop.photoTip}>📸</span>}
                </div>
                <p className="text-xs text-muted mt-0.5 line-clamp-2">{stop.desc}</p>
                {stop.photoTip && <p className="text-[10px] text-gold/70 mt-0.5">📸 {stop.photoTip}</p>}
              </div>

              {/* Price */}
              {stop.price && (
                <span className="text-xs text-muted-dark whitespace-nowrap shrink-0 pt-0.5">
                  {stop.price}
                </span>
              )}
            </motion.div>

            {/* Transport segment */}
            {showTransport && route && (
              <div className="flex items-center gap-2 pl-6 py-1">
                <svg width="20" height="6" className="shrink-0">
                  <line
                    x1="0" y1="3" x2="20" y2="3"
                    stroke={ROUTE_STYLES[route.mode].color}
                    strokeWidth="2"
                    strokeDasharray={
                      ROUTE_STYLES[route.mode].dashed ? '4 3' :
                      route.mode === 'walking' ? '2 3' : 'none'
                    }
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[10px] text-muted-dark tracking-wide">
                  {MODE_ICONS[route.mode]} {MODE_LABELS[route.mode]}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
