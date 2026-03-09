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
};

const MODE_LABELS: Record<RouteMode, string> = {
  walking: 'пешком',
  driving: 'на машине',
  ferry: 'паром',
  shuttle: 'шаттл',
  flight: 'перелёт',
  subway: 'метро',
};

interface Props {
  stops: Stop[];
  routes: RouteSegment[];
  onStopClick?: (index: number) => void;
  activeStop?: number | null;
}

export default function ScheduleTable({ stops, routes, onStopClick, activeStop }: Props) {
  // Build a map: stopIndex -> route leaving from that stop
  const routeFromStop = new Map<number, RouteSegment>();
  routes.forEach(r => routeFromStop.set(r.from, r));

  // Track previous mode to only show transport when it changes
  let prevMode: RouteMode | null = null;

  const rows: React.ReactNode[] = [];

  stops.forEach((stop, i) => {
    const route = routeFromStop.get(i);
    const showTransport = route && route.mode !== prevMode;

    if (showTransport) {
      const style = ROUTE_STYLES[route.mode];
      rows.push(
        <tr key={`transport-${i}`} className="border-b border-white/5">
          <td colSpan={4} className="py-1.5 px-3">
            <div className="flex items-center gap-2 pl-4">
              <svg width="20" height="6" className="flex-shrink-0">
                <line
                  x1="0" y1="3" x2="20" y2="3"
                  stroke={style.color}
                  strokeWidth="2"
                  strokeDasharray={style.dashed ? '4 3' : route.mode === 'walking' ? '2 3' : 'none'}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[10px] text-muted-dark tracking-wide">
                {MODE_ICONS[route.mode]} {MODE_LABELS[route.mode]}
              </span>
            </div>
          </td>
        </tr>
      );
    }

    if (route) {
      prevMode = route.mode;
    }

    rows.push(
      <motion.tr
        key={stop.id}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.04 }}
        onClick={() => onStopClick?.(i)}
        className={`
          border-b border-white/5 cursor-pointer transition-colors duration-200
          ${activeStop === i ? 'bg-white/5' : 'hover:bg-white/[0.03]'}
        `}
      >
        <td className="py-3 px-3 text-muted-dark font-light text-xs tracking-wide whitespace-nowrap">
          {stop.time}
        </td>
        <td className="py-3 px-3">
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-bg flex-shrink-0"
              style={{ backgroundColor: STOP_COLORS[stop.type] }}
            >
              {stop.num.length <= 2 ? stop.num : '★'}
            </span>
            <span className="font-medium">{stop.title}</span>
          </div>
        </td>
        <td className="py-3 px-3 text-muted text-xs hidden md:table-cell max-w-md">
          {stop.desc}
        </td>
        <td className="py-3 px-3 text-right text-muted-dark text-xs whitespace-nowrap">
          {stop.price}
        </td>
      </motion.tr>
    );
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm table-fixed">
        <colgroup>
          <col className="w-16" />
          <col />
          <col className="hidden md:table-column" />
          <col className="w-24" />
        </colgroup>
        <thead>
          <tr className="border-b border-white/10 text-muted-dark text-xs uppercase tracking-wider">
            <th className="py-3 px-3 text-left">Время</th>
            <th className="py-3 px-3 text-left">Что</th>
            <th className="py-3 px-3 text-left hidden md:table-cell">Детали</th>
            <th className="py-3 px-3 text-right">Цена</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}
