'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'usa-plan-notes';

interface Props {
  dayNumber: number;
}

function loadNotes(): Record<number, string> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

export default function DayNotes({ dayNumber }: Props) {
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const loaded = loadNotes();
    setNotes(loaded);
    setText(loaded[dayNumber] || '');
  }, [dayNumber]);

  const save = () => {
    const updated = { ...notes, [dayNumber]: text };
    if (!text.trim()) delete updated[dayNumber];
    setNotes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEditing(false);
  };

  const current = notes[dayNumber];

  if (!editing && !current) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="w-full py-3 text-xs text-muted-dark hover:text-gold transition-colors flex items-center justify-center gap-2"
      >
        <span>📝</span>
        <span>Добавить заметку к этому дню</span>
      </button>
    );
  }

  if (!editing) {
    return (
      <div
        onClick={() => { setEditing(true); setText(current || ''); }}
        className="bg-white/[0.02] border border-white/5 rounded-xl p-4 cursor-pointer hover:border-gold/20 transition-colors"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs">📝</span>
          <span className="text-[10px] text-muted-dark uppercase tracking-wider">Заметка</span>
        </div>
        <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap">{current}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.02] border border-gold/20 rounded-xl p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Впечатления, что запомнилось, заметки на будущее..."
        className="w-full bg-transparent text-sm text-text outline-none resize-none min-h-[80px] placeholder-muted-dark/50"
        autoFocus
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={save}
          className="px-4 py-1.5 bg-gold/20 border border-gold/40 rounded-lg text-gold text-xs font-medium hover:bg-gold/30 transition-colors"
        >
          Сохранить
        </button>
        <button
          onClick={() => setEditing(false)}
          className="px-4 py-1.5 text-xs text-muted-dark hover:text-text transition-colors"
        >
          Отмена
        </button>
      </div>
    </div>
  );
}
