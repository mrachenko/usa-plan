'use client';

import { useState, useEffect } from 'react';

const TRIP_START = new Date(2026, 6, 10); // July 10
const TRIP_END = new Date(2026, 6, 31);   // July 31
const TOTAL_DAYS = 21;

function getStatus() {
  const now = new Date();
  const msPerDay = 86400000;

  if (now < TRIP_START) {
    const daysLeft = Math.ceil((TRIP_START.getTime() - now.getTime()) / msPerDay);
    return { phase: 'before' as const, daysLeft, dayNumber: 0, progress: 0 };
  }

  if (now > TRIP_END) {
    return { phase: 'after' as const, daysLeft: 0, dayNumber: TOTAL_DAYS, progress: 100 };
  }

  const dayNumber = Math.floor((now.getTime() - TRIP_START.getTime()) / msPerDay);
  const progress = Math.round(((dayNumber + 1) / TOTAL_DAYS) * 100);
  return { phase: 'during' as const, daysLeft: 0, dayNumber, progress };
}

export default function TripCountdown() {
  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const timer = setInterval(() => setStatus(getStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (status.phase === 'before') {
    return (
      <div className="text-white/60 text-sm tracking-wide">
        До вылета <span className="text-white font-semibold">{status.daysLeft}</span> {status.daysLeft === 1 ? 'день' : status.daysLeft < 5 ? 'дня' : 'дней'}
      </div>
    );
  }

  if (status.phase === 'after') {
    return (
      <div className="text-white/60 text-sm tracking-wide">
        21 день Америки — в памяти навсегда
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-white/60 text-sm tracking-wide">
        День <span className="text-white font-semibold">{status.dayNumber}</span> из {TOTAL_DAYS}
      </div>
      <div className="w-32 h-1 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gold transition-all duration-500"
          style={{ width: `${status.progress}%` }}
        />
      </div>
    </div>
  );
}
