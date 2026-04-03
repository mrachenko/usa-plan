'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

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
      return `https://www.google.com/maps/dir/?api=1&destination=${dest}&center=${lat},${lng}`;
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
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
          btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onScroll = () => setOpen(false);
    document.addEventListener('click', close);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('click', close);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.top - 8,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen(!open);
  };

  return (
    <>
      <button ref={btnRef} onClick={handleOpen} className={className}>
        {children || '📍'}
      </button>

      {open && createPortal(
        <div
          ref={menuRef}
          className="fixed bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[200px]"
          style={{
            top: pos.top,
            right: pos.right,
            transform: 'translateY(-100%)',
            zIndex: 10001,
          }}
        >
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
        </div>,
        document.body
      )}
    </>
  );
}
