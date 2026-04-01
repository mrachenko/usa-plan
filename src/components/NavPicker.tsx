'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  lat: number;
  lng: number;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const NAVS = [
  {
    name: 'Google Maps',
    icon: '🗺️',
    url: (lat: number, lng: number, title?: string) => {
      const q = title ? encodeURIComponent(title) : `${lat},${lng}`;
      return `https://www.google.com/maps/search/?api=1&query=${q}&query_place_id=&center=${lat},${lng}`;
    },
  },
  {
    name: 'Маршрут (Google)',
    icon: '🧭',
    url: (lat: number, lng: number, title?: string) => {
      const dest = title ? encodeURIComponent(title) : `${lat},${lng}`;
      return `https://www.google.com/maps/dir/?api=1&destination=${dest}&destination_place_id=&waypoints=&origin=&center=${lat},${lng}`;
    },
  },
  {
    name: 'Apple Maps',
    icon: '🍎',
    url: (lat: number, lng: number, title?: string) => {
      const q = title ? `&q=${encodeURIComponent(title)}` : '';
      return `https://maps.apple.com/?daddr=${lat},${lng}${q}`;
    },
  },
  {
    name: 'Яндекс Навигатор',
    icon: '🟡',
    url: (lat: number, lng: number) =>
      `yandexnavi://build_route_on_map?lat_to=${lat}&lon_to=${lng}`,
  },
  {
    name: 'Waze',
    icon: '👻',
    url: (lat: number, lng: number) =>
      `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
  },
];

export default function NavPicker({ lat, lng, title, className, children }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }}
        className={className}
      >
        {children || '📍'}
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 right-0 bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[200px]">
          {NAVS.map((nav) => (
            <a
              key={nav.name}
              href={nav.url(lat, lng, title)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-white/5 transition-colors"
            >
              <span>{nav.icon}</span>
              <span>{nav.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
