'use client';

import { weatherData } from '@/data/weather';

interface Props {
  dayNumber: number;
}

export default function WeatherWidget({ dayNumber }: Props) {
  const w = weatherData[dayNumber];
  if (!w) return null;

  return (
    <span className="text-xs text-muted-dark" title={w.desc}>
      {w.icon} {w.min}–{w.max}°C
    </span>
  );
}
