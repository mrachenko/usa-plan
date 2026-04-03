'use client';

import { useState, useEffect } from 'react';
import { weatherData, DayWeather } from '@/data/weather';

const CACHE_KEY = 'usa-plan-weather-live';
const CACHE_TTL = 6 * 3600000; // 6 hours

const DAY_COORDS: Record<number, { lat: number; lng: number }> = {
  0: { lat: 40.18, lng: 44.51 },
  1: { lat: 40.71, lng: -74.01 },
  2: { lat: 40.71, lng: -74.01 },
  3: { lat: 40.71, lng: -74.01 },
  4: { lat: 40.71, lng: -74.01 },
  5: { lat: 36.11, lng: -115.17 },
  6: { lat: 37.30, lng: -113.03 },
  7: { lat: 36.98, lng: -110.11 },
  8: { lat: 36.86, lng: -111.37 },
  9: { lat: 36.05, lng: -112.14 },
  10: { lat: 35.33, lng: -112.88 },
  11: { lat: 34.02, lng: -118.40 },
  12: { lat: 34.02, lng: -118.40 },
  13: { lat: 34.02, lng: -118.40 },
  14: { lat: 20.80, lng: -156.33 },
  15: { lat: 20.80, lng: -156.33 },
  16: { lat: 20.80, lng: -156.33 },
  17: { lat: 20.80, lng: -156.33 },
  18: { lat: 34.02, lng: -118.40 },
  19: { lat: 34.02, lng: -118.40 },
};

const WMO: Record<number, { icon: string; desc: string }> = {
  0: { icon: '☀️', desc: 'Ясно' },
  1: { icon: '🌤️', desc: 'Малооблачно' },
  2: { icon: '⛅', desc: 'Облачно' },
  3: { icon: '☁️', desc: 'Пасмурно' },
  45: { icon: '🌫️', desc: 'Туман' },
  48: { icon: '🌫️', desc: 'Туман' },
  51: { icon: '🌦️', desc: 'Морось' },
  53: { icon: '🌧️', desc: 'Дождь' },
  55: { icon: '🌧️', desc: 'Сильный дождь' },
  61: { icon: '🌧️', desc: 'Дождь' },
  63: { icon: '🌧️', desc: 'Умеренный дождь' },
  65: { icon: '🌧️', desc: 'Сильный дождь' },
  80: { icon: '🌦️', desc: 'Ливень' },
  95: { icon: '⛈️', desc: 'Гроза' },
};

function getWmo(code: number) {
  return WMO[code] || WMO[Math.floor(code / 10) * 10] || { icon: '🌡️', desc: '' };
}

interface Props {
  dayNumber: number;
}

export default function WeatherWidget({ dayNumber }: Props) {
  const fallback = weatherData[dayNumber];
  const [live, setLive] = useState<DayWeather | null>(null);

  useEffect(() => {
    const coords = DAY_COORDS[dayNumber];
    if (!coords) return;

    // Check cache
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
      if (cached[dayNumber] && Date.now() - (cached._ts || 0) < CACHE_TTL) {
        setLive(cached[dayNumber]);
        return;
      }
    } catch {}

    const dateStr = `2026-07-${String(10 + dayNumber).padStart(2, '0')}`;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=temperature_2m_max,temperature_2m_min,weather_code&start_date=${dateStr}&end_date=${dateStr}&timezone=auto`)
      .then(r => r.json())
      .then(data => {
        if (!data.daily || data.error) return;
        const wmo = getWmo(data.daily.weather_code[0]);
        const w: DayWeather = {
          max: Math.round(data.daily.temperature_2m_max[0]),
          min: Math.round(data.daily.temperature_2m_min[0]),
          icon: wmo.icon,
          desc: wmo.desc,
        };
        setLive(w);

        try {
          const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
          cached[dayNumber] = w;
          cached._ts = Date.now();
          localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
        } catch {}
      })
      .catch(() => {});
  }, [dayNumber]);

  const w = live || fallback;
  if (!w) return null;

  const isLive = !!live;

  return (
    <span className="text-xs text-muted-dark" title={`${w.desc}${isLive ? '' : ' (среднее за 2023-2025)'}`}>
      {w.icon} {w.min}–{w.max}°C
    </span>
  );
}
