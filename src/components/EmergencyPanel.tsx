'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

const CONTACTS = [
  { label: 'Экстренные службы', phone: '911', icon: '🚨' },
  { label: 'Консульство РФ в Нью-Йорке', phone: '+1-212-348-0926', icon: '🇷🇺' },
  { label: 'Консульство РФ в Хьюстоне', phone: '+1-713-337-3300', icon: '🇷🇺' },
  { label: 'Roadside Assistance (AAA)', phone: '+1-800-222-4357', icon: '🚗' },
  { label: 'Poison Control', phone: '+1-800-222-1222', icon: '☠️' },
];

const TIPS = [
  'При ДТП: 911 → не двигать машину → фото повреждений → обмен страховками',
  'Потеря паспорта: консульство + заявление в полицию (police report)',
  'Госпитали: Urgent Care ($150-300) дешевле ER ($1000+) для нетяжёлых случаев',
  'В нацпарках: если потерялись — оставайтесь на месте, звоните 911',
];

export default function EmergencyPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-400/60 hover:text-red-400 text-sm transition-colors"
        title="Экстренные контакты"
      >
        🆘
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-bg border border-white/10 rounded-t-2xl md:rounded-2xl w-full md:max-w-md max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-bg border-b border-white/5 px-5 py-4 flex items-center justify-between">
              <h2 className="font-display font-bold text-red-400">🆘 Экстренные контакты</h2>
              <button onClick={() => setOpen(false)} className="text-muted-dark hover:text-text">✕</button>
            </div>

            <div className="p-5 space-y-2">
              {CONTACTS.map((c) => (
                <a
                  key={c.phone}
                  href={`tel:${c.phone}`}
                  className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl hover:border-red-400/30 transition-colors"
                >
                  <span className="text-xl">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-text">{c.label}</div>
                    <div className="text-xs text-muted-dark">{c.phone}</div>
                  </div>
                  <span className="text-red-400 text-lg">📞</span>
                </a>
              ))}
            </div>

            <div className="px-5 pb-5">
              <h3 className="text-xs text-muted-dark uppercase tracking-wider mb-2">Памятка</h3>
              <div className="space-y-2">
                {TIPS.map((tip, i) => (
                  <p key={i} className="text-xs text-muted leading-relaxed">• {tip}</p>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
