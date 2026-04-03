'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'usa-plan-weather';
const CACHE_TTL = 6 * 3600000; // 6 hours

// Representative coordinates per day
const DAY_LOCATIONS: Record<number, { lat: number; lng: number; name: string }> = {
  0: { lat: 40.18, lng: 44.51, name: 'Ереван' },
  1: { lat: 40.71, lng: -74.01, name: 'NYC' },
  2: { lat: 40.71, lng: -74.01, name: 'NYC' },
  3: { lat: 40.71, lng: -74.01, name: 'NYC' },
  4: { lat: 40.71, lng: -74.01, name: 'NYC' },
  5: { lat: 36.11, lng: -115.17, name: 'Vegas' },
  6: { lat: 37.30, lng: -113.03, name: 'Zion' },
  7: { lat: 36.98, lng: -110.11, name: 'Monument V.' },
  8: { lat: 36.86, lng: -111.37, name: 'Page' },
  9: { lat: 36.05, lng: -112.14, name: 'Grand Canyon' },
  10: { lat: 35.33, lng: -112.88, name: 'Route 66' },
  11: { lat: 34.02, lng: -118.40, name: 'LA' },
  12: { lat: 34.02, lng: -118.40, name: 'LA' },
  13: { lat: 34.02, lng: -118.40, name: 'LA' },
  14: { lat: 20.80, lng: -156.33, name: 'Maui' },
  15: { lat: 20.80, lng: -156.33, name: 'Maui' },
  16: { lat: 20.80, lng: -156.33, name: 'Maui' },
  17: { lat: 20.80, lng: -156.33, name: 'Maui' },
  18: { lat: 34.02, lng: -118.40, name: 'LA' },
  19: { lat: 34.02, lng: -118.40, name: 'LA' },
};

interface DayWeather {
  tempMax: number;
  tempMin: number;
  icon: string;
  description: string;
}

const WMO_ICONS: Record<number, { icon: string; desc: string }> = {
  0: { icon: '☀️', desc: 'Ясно' },
  1: { icon: '🌤️', desc: 'Малооблачно' },
  2: { icon: '⛅', desc: 'Переменная облачность' },
  3: { icon: '☁️', desc: 'Облачно' },
  45: { icon: '🌫️', desc: 'Туман' },
  48: { icon: '🌫️', desc: 'Туман' },
  51: { icon: '🌦️', desc: 'Лёгкий дождь' },
  53: { icon: '🌧️', desc: 'Дождь' },
  55: { icon: '🌧️', desc: 'Сильный дождь' },
  61: { icon: '🌧️', desc: 'Дождь' },
  63: { icon: '🌧️', desc: 'Умеренный дождь' },
  65: { icon: '🌧️', desc: 'Сильный дождь' },
  80: { icon: '🌦️', desc: 'Ливень' },
  81: { icon: '🌧️', desc: 'Ливень' },
  82: { icon: '⛈️', desc: 'Сильный ливень' },
  95: { icon: '⛈️', desc: 'Гроза' },
  96: { icon: '⛈️', desc: 'Гроза с градом' },
  99: { icon: '⛈️', desc: 'Сильная гроза' },
};

function getWmo(code: number) {
  return WMO_ICONS[code] || { icon: '🌡️', desc: '' };
}

interface Props {
  dayNumber: number;
}

export default function WeatherWidget({ dayNumber }: Props) {
  const [weather, setWeather] = useState<DayWeather | null>(null);

  useEffect(() => {
    const loc = DAY_LOCATIONS[dayNumber];
    if (!loc) return;

    // Check cache
    try {
      const cached = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (cached[dayNumber] && Date.now() - cached._ts < CACHE_TTL) {
        setWeather(cached[dayNumber]);
        return;
      }
    } catch {}

    // Trip date for this day
    const date = new Date(2026, 6, 10 + dayNumber);
    const dateStr = date.toISOString().split('T')[0];

    // Fetch from Open-Meteo (free, no key)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lng}&daily=temperature_2m_max,temperature_2m_min,weather_code&start_date=${dateStr}&end_date=${dateStr}&timezone=auto`)
      .then(r => r.json())
      .then(data => {
        if (!data.daily) return;
        const wmo = getWmo(data.daily.weather_code[0]);
        const w: DayWeather = {
          tempMax: Math.round(data.daily.temperature_2m_max[0]),
          tempMin: Math.round(data.daily.temperature_2m_min[0]),
          icon: wmo.icon,
          description: wmo.desc,
        };
        setWeather(w);

        // Cache
        try {
          const cached = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
          cached[dayNumber] = w;
          cached._ts = Date.now();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
        } catch {}
      })
      .catch(() => {});
  }, [dayNumber]);

  if (!weather) return null;

  return (
    <span className="text-xs text-muted-dark" title={weather.description}>
      {weather.icon} {weather.tempMin}–{weather.tempMax}°C
    </span>
  );
}
