'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Hotel } from '@/data/hotels';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface Props {
  hotels: Hotel[];
  regionColor: string;
}

function HotelPopupContent({ hotel, regionColor, onClose }: { hotel: Hotel; regionColor: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  }, [onClose]);

  const card = (
    <>
      {hotel.image ? (
        <div className="h-44 md:h-56 bg-white/5 overflow-hidden relative flex-shrink-0">
          <img
            src={`${basePath}/images/${hotel.image}`}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          {hotel.recommended && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase"
              style={{ backgroundColor: regionColor, color: '#0d0d0d' }}>
              Наш выбор
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors text-sm"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="h-28 md:h-36 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden relative flex-shrink-0 flex items-center justify-center">
          <span className="text-5xl md:text-6xl opacity-60">🏨</span>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors text-sm"
          >
            ✕
          </button>
        </div>
      )}
      <div className="p-5 overflow-y-auto flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-display text-lg font-bold" style={{ color: regionColor }}>
            {hotel.name}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-dark mb-3">
          <span>{hotel.dates}</span>
          <span className="text-white/20">·</span>
          <span>{hotel.nights} {hotel.nights === 1 ? 'ночь' : hotel.nights < 5 ? 'ночи' : 'ночей'}</span>
          <span className="text-white/20">·</span>
          <span className="font-medium" style={{ color: regionColor }}>{hotel.pricePerNight}/ночь</span>
        </div>

        {hotel.rating && (
          <p className="text-xs text-muted-dark mb-3">{hotel.rating}</p>
        )}

        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wider mb-1 font-medium" style={{ color: regionColor }}>Почему этот отель?</p>
            <p className="text-sm text-muted leading-relaxed">{hotel.why}</p>
          </div>

          {hotel.tip && (
            <div>
              <p className="text-xs text-food uppercase tracking-wider mb-1 font-medium">Совет</p>
              <p className="text-sm text-muted leading-relaxed">{hotel.tip}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-xs text-muted-dark">Итого</span>
            <span className="text-sm font-display font-bold" style={{ color: regionColor }}>{hotel.total}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {hotel.phone && (
            <a
              href={`tel:${hotel.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-white/10 border border-white/10 rounded-lg hover:bg-white/15 transition-colors"
            >
              <span>📞</span>
              <span>Позвонить</span>
            </a>
          )}
          {hotel.url && (
            <a
              href={hotel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-white/10 border border-white/10 rounded-lg hover:bg-white/15 transition-colors"
            >
              <span>🔗</span>
              <span>Забронировать</span>
            </a>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />

      {/* Desktop: side panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 z-[9999] w-[420px] max-w-[85vw] hidden md:flex flex-col bg-surface border-l border-white/10 shadow-2xl"
      >
        {card}
      </motion.div>

      {/* Mobile: bottom sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="fixed left-0 right-0 bottom-0 z-[9999] md:hidden flex flex-col bg-surface border-t border-white/10 rounded-t-2xl shadow-2xl max-h-[85vh]"
      >
        <div className="flex justify-center py-2 flex-shrink-0 cursor-grab active:cursor-grabbing">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>
        {card}
      </motion.div>
    </>
  );
}

function HotelPopup({ hotel, regionColor, onClose }: { hotel: Hotel | null; regionColor: string; onClose: () => void }) {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {hotel && <HotelPopupContent hotel={hotel} regionColor={regionColor} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}

export default function HotelTable({ hotels, regionColor }: Props) {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  return (
    <>
      <div className="bg-white/[0.02] border border-white/5 rounded-none md:rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <div
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: regionColor }}
          />
          <h3 className="text-xs tracking-[0.2em] uppercase text-muted-dark font-light">
            Где жить
          </h3>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm md:table-fixed">
            <colgroup>
              <col className="md:w-[28%]" />
              <col className="md:w-[22%]" />
              <col className="md:w-[14%]" />
              <col className="md:w-[12%]" />
              <col />
            </colgroup>
            <thead>
              <tr className="border-b border-white/10 text-muted-dark text-xs uppercase tracking-wider">
                <th className="py-3 px-3 text-left">Отель</th>
                <th className="py-3 px-3 text-left">Рейтинг</th>
                <th className="py-3 px-3 text-right">За ночь</th>
                <th className="py-3 px-3 text-right">Итого</th>
                <th className="py-3 px-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel, i) => (
                <motion.tr
                  key={hotel.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedHotel(hotel)}
                  className="border-b border-white/5 transition-colors duration-200 hover:bg-white/[0.03] cursor-pointer"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: regionColor }}
                      />
                      <span className="font-medium" style={hotel.recommended ? { color: regionColor } : undefined}>
                        {hotel.name}
                      </span>
                      {hotel.recommended && (
                        <span
                          className="text-[9px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: `${regionColor}20`, color: regionColor }}
                        >
                          выбор
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-muted-dark text-xs">
                    {hotel.rating}
                  </td>
                  <td className="py-3 px-3 text-right text-muted-dark text-xs whitespace-nowrap">
                    {hotel.pricePerNight}
                  </td>
                  <td className="py-3 px-3 text-right text-xs font-medium whitespace-nowrap" style={{ color: regionColor }}>
                    {hotel.total}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-muted-dark text-xs">→</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card layout */}
        <div className="md:hidden divide-y divide-white/5">
          {hotels.map((hotel, i) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedHotel(hotel)}
              className="p-4 transition-colors duration-200 active:bg-white/[0.03] cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: regionColor }}
                />
                <span className="font-medium text-sm" style={hotel.recommended ? { color: regionColor } : undefined}>
                  {hotel.name}
                </span>
                {hotel.recommended && (
                  <span
                    className="text-[9px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${regionColor}20`, color: regionColor }}
                  >
                    выбор
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-dark mb-1.5 pl-4">
                <span>{hotel.rating}</span>
              </div>

              <div className="flex items-center gap-3 text-xs pl-4">
                <span className="text-muted-dark">{hotel.pricePerNight}/ночь</span>
                <span className="text-white/20">·</span>
                <span className="font-medium" style={{ color: regionColor }}>
                  {hotel.total}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-muted-dark">{hotel.nights} {hotel.nights === 1 ? 'ночь' : hotel.nights < 5 ? 'ночи' : 'ночей'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <HotelPopup
        hotel={selectedHotel}
        regionColor={regionColor}
        onClose={() => setSelectedHotel(null)}
      />
    </>
  );
}
