'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { Stop, STOP_COLORS } from '@/lib/types';
import NavPicker from './NavPicker';

interface Props {
  stop: Stop | null;
  onClose: () => void;
}

const TYPE_ICONS: Record<string, string> = {
  flight: '✈️',
  drive: '🚗',
  ferry: '⛴️',
  shuttle: '🚌',
  hotel: '🏨',
  nature: '🌿',
  gold: '⭐',
  food: '🍽️',
};

const TYPE_GRADIENTS: Record<string, string> = {
  flight: 'from-red-900/40 to-orange-900/20',
  drive: 'from-slate-800/60 to-slate-700/30',
  ferry: 'from-blue-900/40 to-cyan-900/20',
  shuttle: 'from-slate-800/40 to-slate-700/20',
  hotel: 'from-green-900/30 to-emerald-900/15',
  nature: 'from-emerald-900/40 to-green-900/20',
  gold: 'from-yellow-900/30 to-amber-900/15',
  food: 'from-orange-900/30 to-amber-900/15',
};

function StopCard({ stop, onClose }: { stop: Stop; onClose: () => void }) {
  return (
    <>
      {stop.image ? (
        <div className="h-44 md:h-56 bg-white/5 overflow-hidden relative flex-shrink-0">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/${stop.image}`}
            alt={stop.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors text-sm"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className={`h-28 md:h-36 bg-gradient-to-br ${TYPE_GRADIENTS[stop.type] || 'from-white/5 to-white/[0.02]'} overflow-hidden relative flex-shrink-0 flex items-center justify-center`}>
          <span className="text-5xl md:text-6xl opacity-60">{TYPE_ICONS[stop.type] || '📍'}</span>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors text-sm"
          >
            ✕
          </button>
        </div>
      )}
      <div className="p-5 overflow-y-auto flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-bg flex-shrink-0"
            style={{ backgroundColor: STOP_COLORS[stop.type] }}
          >
            {stop.num.length <= 2 ? stop.num : '★'}
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold truncate" style={{ color: STOP_COLORS[stop.type] }}>
              {stop.title}
            </h3>
            <p className="text-muted-dark text-xs tracking-wide uppercase">{stop.time}</p>
          </div>
        </div>

        {stop.rating && (
          <p className="text-xs text-muted-dark mb-3">{stop.rating}</p>
        )}

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gold uppercase tracking-wider mb-1 font-medium">Почему это место?</p>
            <p className="text-sm text-muted leading-relaxed">{stop.why}</p>
          </div>

          {stop.tip && (
            <div>
              <p className="text-xs text-food uppercase tracking-wider mb-1 font-medium">Совет</p>
              <p className="text-sm text-muted leading-relaxed">{stop.tip}</p>
            </div>
          )}

          {stop.price && (
            <p className="text-xs text-muted-dark">💰 {stop.price}</p>
          )}
        </div>

        {/* Quick actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <NavPicker
            lat={stop.pos.lat}
            lng={stop.pos.lng}
            className="flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-white/10 border border-white/10 rounded-lg hover:bg-white/15 transition-colors w-full"
          >
            <span>🧭</span>
            <span>Маршрут</span>
          </NavPicker>
          <button
            onClick={() => navigator.clipboard?.writeText(`${stop.title}: ${stop.pos.lat},${stop.pos.lng}`)}
            className="flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-white/10 border border-white/10 rounded-lg hover:bg-white/15 transition-colors"
          >
            <span>📋</span>
            <span>Скопировать</span>
          </button>
        </div>
      </div>
    </>
  );
}

function PopupContent({ stop, onClose }: { stop: Stop; onClose: () => void }) {
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

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />

      {/* Desktop: side panel (right) */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 z-[9999] w-[420px] max-w-[85vw] hidden md:flex flex-col bg-surface border-l border-white/10 shadow-2xl"
      >
        <StopCard stop={stop} onClose={onClose} />
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
        {/* Drag handle */}
        <div className="flex justify-center py-2 flex-shrink-0 cursor-grab active:cursor-grabbing">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>
        <StopCard stop={stop} onClose={onClose} />
      </motion.div>
    </>
  );
}

export default function StopPopup({ stop, onClose }: Props) {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {stop && <PopupContent stop={stop} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}
