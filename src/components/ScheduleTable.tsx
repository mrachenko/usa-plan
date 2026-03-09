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

function TransportRow({ route }: { route: RouteSegment }) {
  const style = ROUTE_STYLES[route.mode];
  return (
    <tr className="border-b border-white/5">
      <td colSpan={4} className="py-1 px-3">
        <div className="flex items-center gap-2 pl-6">
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

export default function ScheduleTable({ stops, routes, onStopClick, activeStop }: Props) {
  // Build a map: stopIndex -> route leaving from that stop
  const routeFromStop = new Map<number, RouteSegment>();
  routes.forEach(r => routeFromStop.set(r.from, r));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-muted-dark text-xs uppercase tracking-wider">
            <th className="py-3 px-3 text-left w-16">Время</th>
            <th className="py-3 px-3 text-left">Что</th>
            <th className="py-3 px-3 text-left hidden md:table-cell">Детали</th>
            <th className="py-3 px-3 text-right w-24">Цена</th>
          </tr>
        </thead>
        <tbody>
          {stops.map((stop, i) => {
            const route = routeFromStop.get(i);
            return (
              <motion.tbody key={stop.id}>
                <motion.tr
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onStopClick?.(i)}
                  className={`
                    border-b border-white/5 cursor-pointer transition-colors duration-200
                    ${activeStop === i ? 'bg-white/5' : 'hover:bg-white/[0.03]'}
                  `}
                >
                  <td className="py-3 px-3 text-muted-dark font-light text-xs tracking-wide">
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
                  <td className="py-3 px-3 text-right text-muted-dark text-xs">
                    {stop.price}
                  </td>
                </motion.tr>
                {route && <TransportRow route={route} />}
              </motion.tbody>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
