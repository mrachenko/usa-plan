export type StopType = 'gold' | 'food' | 'hotel' | 'ferry' | 'flight' | 'nature' | 'drive';
export type RouteMode = 'walking' | 'driving' | 'ferry' | 'shuttle' | 'flight' | 'subway' | 'taxi';
export type Region = 'new-york' | 'vegas-parks' | 'los-angeles' | 'maui' | 'transit';

/**
 * RULES for stop data:
 * 1. Every stop MUST have an `image` field pointing to a photo in /public/images/.
 * 2. Popups are shown identically from both the schedule table and the map —
 *    all stops must have consistent data including photos.
 * 3. Every pair of consecutive stops MUST have a corresponding route in
 *    DayConfig.routes specifying the transport mode (walking/driving/ferry/
 *    shuttle/flight/subway). The schedule table shows transport between stops,
 *    so missing routes = missing transport info.
 */
export interface Stop {
  id: string;
  type: StopType;
  num: string;
  title: string;
  time: string;
  desc: string;
  why: string;
  tip?: string;
  rating?: string;
  image: string;
  price: string;
  pos: { lat: number; lng: number };
}

export interface RouteSegment {
  from: number;
  to: number;
  mode: RouteMode;
  waypoints?: { lat: number; lng: number }[];
}

export interface InfoBlock {
  type: 'warning' | 'tip' | 'time';
  text: string;
}

export interface DayConfig {
  dayNumber: number;
  date: string;
  weekday: string;
  title: string;
  subtitle: string;
  region: Region;
  description: string;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  transportSummary: string;
  gallery?: string[];
  stops: Stop[];
  routes: RouteSegment[];
  infoBlocks: InfoBlock[];
}

export const STOP_COLORS: Record<StopType, string> = {
  gold: '#e8c87a',
  food: '#f0a050',
  hotel: '#90e870',
  ferry: '#64b4ff',
  flight: '#ff6b6b',
  nature: '#50c878',
  drive: '#c8c0b4',
};

export const ROUTE_STYLES: Record<RouteMode, { color: string; dashed: boolean }> = {
  walking: { color: '#e8c87a', dashed: false },
  driving: { color: '#c8c0b4', dashed: false },
  ferry: { color: '#64b4ff', dashed: true },
  shuttle: { color: '#90e870', dashed: true },
  flight: { color: '#ff6b6b', dashed: true },
  subway: { color: '#808080', dashed: true },
  taxi: { color: '#f5e642', dashed: true },
};
