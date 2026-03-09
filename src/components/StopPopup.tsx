'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Stop, STOP_COLORS } from '@/lib/types';

interface Props {
  stop: Stop | null;
  onClose: () => void;
}

function PopupContent({ stop, onClose }: { stop: Stop; onClose: () => void }) {
  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto pointer-events-auto">
          {stop.image && (
            <div className="h-48 bg-white/5 overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/${stop.image}`}
                alt={stop.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-bg flex-shrink-0"
                style={{ backgroundColor: STOP_COLORS[stop.type] }}
              >
                {stop.num.length <= 2 ? stop.num : '★'}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold" style={{ color: STOP_COLORS[stop.type] }}>
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

            <button
              onClick={onClose}
              className="mt-4 w-full py-2 text-xs text-muted-dark border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
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
