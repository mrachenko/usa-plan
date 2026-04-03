'use client';

import { Stop } from '@/lib/types';
import { sunData } from '@/data/sun';
import { weatherData } from '@/data/weather';

interface Props {
  dayNumber: number;
  date: string;
  weekday: string;
  title: string;
  subtitle: string;
  description: string;
  transportSummary: string;
  stops: Stop[];
}

export default function ShareDay({ dayNumber, date, weekday, title, subtitle, description, transportSummary, stops }: Props) {
  const share = async () => {
    const sun = sunData[dayNumber];
    const weather = weatherData[dayNumber];

    const stopsList = stops
      .map(s => `  ${s.num === '📸' ? '📸' : s.num + '.'} ${s.title} (${s.time})`)
      .join('\n');

    // Clean description: first paragraph only, no newlines
    const shortDesc = description.split('\n\n')[0];

    const lines = [
      `🇺🇸 День ${dayNumber} — ${title}`,
      `📅 ${date}, ${weekday}`,
      `📍 ${stops.length} точек · ${transportSummary}`,
    ];

    if (weather) lines.push(`${weather.icon} ${weather.min}–${weather.max}°C`);
    if (sun) lines.push(`☀️ ${sun.sunrise} → 🌅 ${sun.sunset}`);

    lines.push('', shortDesc, '', '📋 Маршрут:', stopsList, '', 'USA 2026 Road Trip 🚗');

    const text = lines.join('\n');

    if (navigator.share) {
      try {
        await navigator.share({ title: `День ${dayNumber}: ${title}`, text });
      } catch {}
    } else {
      await navigator.clipboard?.writeText(text);
      alert('Скопировано!');
    }
  };

  return (
    <button
      onClick={share}
      className="text-xs text-muted-dark hover:text-gold transition-colors flex items-center gap-1"
    >
      <span>📤</span>
      <span>Поделиться</span>
    </button>
  );
}
