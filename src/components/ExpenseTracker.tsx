'use client';

import { useState, useEffect } from 'react';

interface Expense {
  id: number;
  category: string;
  amount: number;
  note: string;
  date: string;
}

const CATEGORIES = [
  { key: 'food', label: '🍽️ Еда', color: '#f0a050' },
  { key: 'hotel', label: '🏨 Отель', color: '#90e870' },
  { key: 'transport', label: '🚗 Транспорт', color: '#c8c0b4' },
  { key: 'tickets', label: '🎫 Билеты', color: '#64b4ff' },
  { key: 'shopping', label: '🛍️ Покупки', color: '#e8c87a' },
  { key: 'other', label: '📦 Другое', color: '#80706a' },
];

const STORAGE_KEY = 'usa-plan-expenses';
const BUDGET = 14500;

function load(): Expense[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

function save(expenses: Expense[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('food');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => { setExpenses(load()); }, []);

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const byCategory = CATEGORIES.map(c => ({
    ...c,
    total: expenses.filter(e => e.category === c.key).reduce((s, e) => s + e.amount, 0),
  }));

  const addExpense = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    const newExp: Expense = {
      id: Date.now(),
      category,
      amount: num,
      note,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
    };
    const updated = [newExp, ...expenses];
    setExpenses(updated);
    save(updated);
    setAmount('');
    setNote('');
  };

  const removeExpense = (id: number) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    save(updated);
  };

  const progress = Math.min((total / BUDGET) * 100, 100);

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
      <h3 className="text-sm font-display font-bold text-gold mb-4">💰 Расходы</h3>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-dark mb-1">
          <span>${total.toFixed(0)} потрачено</span>
          <span>${(BUDGET - total).toFixed(0)} осталось</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: progress > 90 ? '#ff6b6b' : progress > 70 ? '#f0a050' : '#90e870',
            }}
          />
        </div>
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {byCategory.filter(c => c.total > 0).map(c => (
          <div key={c.key} className="text-center">
            <div className="text-xs" style={{ color: c.color }}>${c.total.toFixed(0)}</div>
            <div className="text-[10px] text-muted-dark">{c.label.split(' ')[0]}</div>
          </div>
        ))}
      </div>

      {/* Add expense */}
      <div className="space-y-2 mb-4">
        <div className="flex gap-2">
          <span className="text-muted-dark text-lg self-center">$</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="Сумма"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-text outline-none focus:border-gold/50"
          />
          <input
            type="text"
            placeholder="Заметка"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-text text-sm outline-none focus:border-gold/50"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`px-2 py-1 rounded text-[10px] transition-colors ${
                category === c.key
                  ? 'bg-gold/20 text-gold border border-gold/40'
                  : 'bg-white/5 text-muted-dark border border-white/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <button
          onClick={addExpense}
          className="w-full py-2 bg-gold/20 border border-gold/40 rounded-lg text-gold text-sm font-medium hover:bg-gold/30 transition-colors"
        >
          Добавить
        </button>
      </div>

      {/* Recent expenses */}
      {expenses.length > 0 && (
        <div>
          <div className="text-xs text-muted-dark mb-2">
            Последние записи
            {expenses.length > 5 && (
              <button onClick={() => setShowAll(!showAll)} className="ml-2 text-gold">
                {showAll ? 'свернуть' : `показать все (${expenses.length})`}
              </button>
            )}
          </div>
          <div className="space-y-1">
            {(showAll ? expenses : expenses.slice(0, 5)).map(e => {
              const cat = CATEGORIES.find(c => c.key === e.category);
              return (
                <div key={e.id} className="flex items-center gap-2 text-xs py-1">
                  <span>{cat?.label.split(' ')[0]}</span>
                  <span className="text-text font-medium">${e.amount.toFixed(2)}</span>
                  <span className="text-muted-dark truncate flex-1">{e.note}</span>
                  <span className="text-muted-dark/50">{e.date}</span>
                  <button
                    onClick={() => removeExpense(e.id)}
                    className="text-muted-dark/30 hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
