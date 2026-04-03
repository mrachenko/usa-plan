'use client';

import { useState } from 'react';

const TIPS = [
  { label: '15%', rate: 0.15, emoji: '😐' },
  { label: '18%', rate: 0.18, emoji: '🙂' },
  { label: '20%', rate: 0.20, emoji: '😊' },
  { label: '25%', rate: 0.25, emoji: '🤩' },
];

export default function TipCalc() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(0.20);
  const num = parseFloat(amount) || 0;
  const tip = Math.ceil(num * rate * 100) / 100;
  const total = Math.ceil((num + tip) * 100) / 100;

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
      <h3 className="text-sm font-display font-bold text-gold mb-4">💡 Калькулятор чаевых</h3>

      <div className="flex gap-2 mb-3">
        <span className="text-muted-dark text-lg self-center">$</span>
        <input
          type="number"
          inputMode="decimal"
          placeholder="Сумма счёта"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-text text-lg outline-none focus:border-gold/50"
        />
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {TIPS.map((t) => (
          <button
            key={t.label}
            onClick={() => setRate(t.rate)}
            className={`py-2 rounded-lg text-center text-xs transition-colors ${
              rate === t.rate
                ? 'bg-gold/20 border border-gold/40 text-gold'
                : 'bg-white/5 border border-white/10 text-muted-dark hover:bg-white/10'
            }`}
          >
            <div className="text-base">{t.emoji}</div>
            <div>{t.label}</div>
          </button>
        ))}
      </div>

      {num > 0 && (
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="text-xs text-muted-dark">
            Чаевые: ${tip.toFixed(2)}
          </div>
          <button
            onClick={() => navigator.clipboard?.writeText(total.toFixed(2))}
            className="text-lg font-bold text-gold hover:text-white transition-colors"
          >
            ${total.toFixed(2)} 📋
          </button>
        </div>
      )}
    </div>
  );
}
