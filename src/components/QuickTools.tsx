'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import TipCalc from './TipCalc';
import UnitConverter from './UnitConverter';

export default function QuickTools() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-muted-dark hover:text-white text-sm transition-colors"
        title="Калькулятор и шпаргалка"
      >
        🧮
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-bg border border-white/10 rounded-t-2xl md:rounded-2xl w-full md:max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-bg border-b border-white/5 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="font-display font-bold text-gold">🧮 Инструменты</h2>
              <button onClick={() => setOpen(false)} className="text-muted-dark hover:text-text">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <TipCalc />
              <UnitConverter />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
