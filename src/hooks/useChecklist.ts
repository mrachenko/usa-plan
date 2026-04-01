'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'usa-plan-checked';

function loadChecked(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveChecked(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
}

export function useChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    setChecked(loadChecked());
  }, []);

  const toggle = useCallback((id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveChecked(next);
      return next;
    });
  }, []);

  const isChecked = useCallback((id: string) => checked.has(id), [checked]);

  return { toggle, isChecked };
}
