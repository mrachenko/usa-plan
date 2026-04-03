'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmergencyPanel from './EmergencyPanel';

interface DayInfo {
  dayNumber: number;
  date: string;
  title: string;
  region: string;
}

interface Props {
  days: DayInfo[];
}

const REGION_COLORS: Record<string, string> = {
  'new-york': '#e8c87a',
  'vegas-parks': '#e07040',
  'los-angeles': '#64b4ff',
  'maui': '#40c8a0',
  'transit': '#c8c0b4',
};

const REGION_LABELS: Record<string, string> = {
  'new-york': 'Нью-Йорк',
  'vegas-parks': 'Нацпарки',
  'los-angeles': 'Лос-Анджелес',
  'maui': 'Мауи',
  'transit': 'Транзит',
};

// Trip starts July 10, 2026 — dayNumber 0
const TRIP_START = new Date(2026, 6, 10); // month is 0-indexed

function getTodayDayNumber(): number | null {
  const now = new Date();
  const diff = Math.floor((now.getTime() - TRIP_START.getTime()) / 86400000);
  if (diff < 0 || diff > 19) return null;
  return diff;
}

function useSettings() {
  const [light, setLight] = useState(false);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      setLight(true);
      document.documentElement.classList.add('light');
    }
    if (localStorage.getItem('lite') === 'on') {
      setLite(true);
      document.documentElement.classList.add('lite');
    }
  }, []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle('light', next);
    localStorage.setItem('theme', next ? 'light' : 'dark');
  };

  const toggleLite = () => {
    const next = !lite;
    setLite(next);
    document.documentElement.classList.toggle('lite', next);
    localStorage.setItem('lite', next ? 'on' : 'off');
  };

  return { light, lite, toggleTheme, toggleLite };
}

export default function StickyNav({ days }: Props) {
  const [visible, setVisible] = useState(false);
  const [activeDay, setActiveDay] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const todayDay = getTodayDayNumber();
  const settings = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (100vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);

      // Find which day section is currently in view
      let current = -1;
      for (const day of days) {
        const el = document.getElementById(`day-${day.dayNumber}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = day.dayNumber;
          }
        }
      }
      setActiveDay(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [days]);

  // Close expanded nav on outside click
  useEffect(() => {
    if (!expanded) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [expanded]);

  const scrollToDay = (dayNumber: number) => {
    const el = document.getElementById(`day-${dayNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setExpanded(false);
    }
  };

  const currentDay = days.find(d => d.dayNumber === activeDay);
  const progress = activeDay >= 0
    ? ((days.findIndex(d => d.dayNumber === activeDay) + 1) / days.length) * 100
    : 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={navRef}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-0 left-0 right-0 z-[100]"
        >
          {/* Progress bar */}
          <div className="h-[2px] bg-white/5">
            <motion.div
              className="h-full"
              style={{
                backgroundColor: currentDay ? REGION_COLORS[currentDay.region] : '#e8c87a',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Nav bar */}
          <div className="bg-bg/90 backdrop-blur-md border-b border-white/5">
            <div className="max-w-4xl mx-auto px-4 md:px-8 flex items-center h-11">
              {/* Current day label */}
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-sm hover:text-white transition-colors mr-4"
              >
                {currentDay && (
                  <>
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: REGION_COLORS[currentDay.region] }}
                    />
                    <span className="text-muted text-xs hidden sm:inline">
                      {REGION_LABELS[currentDay.region]}
                    </span>
                    <span className="text-text font-medium text-xs">
                      День {currentDay.dayNumber}
                    </span>
                    <span className="text-muted-dark text-xs">
                      {expanded ? '▲' : '▼'}
                    </span>
                  </>
                )}
              </button>

              {/* Day dots (desktop) */}
              <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
                {days.map((day, i) => (
                  <button
                    key={day.dayNumber}
                    onClick={() => scrollToDay(day.dayNumber)}
                    className="group relative p-0.5"
                    title={`День ${day.dayNumber} · ${day.date} — ${day.title}`}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: activeDay === day.dayNumber
                          ? REGION_COLORS[day.region]
                          : 'rgba(255,255,255,0.12)',
                        transform: activeDay === day.dayNumber ? 'scale(1.4)' : 'scale(1)',
                      }}
                    />
                    {/* Tooltip */}
                    <div
                      className={`absolute bottom-full mb-2 px-2 py-1 bg-surface border border-white/10 rounded text-[10px] text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                        i <= 2 ? 'left-0' : i >= days.length - 3 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                      }`}
                    >
                      День {day.dayNumber} · {day.date}
                    </div>
                  </button>
                ))}
              </div>

              {/* Today + Theme + Scroll to top */}
              <div className="flex items-center gap-3 ml-auto md:ml-4">
                {todayDay !== null && activeDay !== todayDay && (
                  <button
                    onClick={() => scrollToDay(todayDay)}
                    className="text-gold hover:text-white text-xs font-medium transition-colors"
                  >
                    → Сегодня
                  </button>
                )}
                <EmergencyPanel />
                <button
                  onClick={settings.toggleLite}
                  className={`text-xs transition-colors ${settings.lite ? 'text-gold' : 'text-muted-dark hover:text-white'}`}
                  title={settings.lite ? 'Полный режим' : 'Экономный режим'}
                >
                  {settings.lite ? '⚡' : '🪶'}
                </button>
                <button
                  onClick={settings.toggleTheme}
                  className="text-muted-dark hover:text-white text-sm transition-colors"
                  title={settings.light ? 'Тёмная тема' : 'Светлая тема'}
                >
                  {settings.light ? '🌙' : '☀️'}
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-muted-dark hover:text-white text-xs transition-colors"
                >
                  ↑ Наверх
                </button>
              </div>
            </div>
          </div>

          {/* Expanded day picker */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-bg/95 backdrop-blur-md border-b border-white/5 overflow-hidden"
              >
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-3">
                  <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-1.5">
                    {days.map(day => {
                      const isToday = day.dayNumber === todayDay;
                      return (
                      <button
                        key={day.dayNumber}
                        onClick={() => scrollToDay(day.dayNumber)}
                        className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg hover:bg-white/5 transition-colors ${isToday ? 'ring-1 ring-gold/50' : ''}`}
                        style={{
                          backgroundColor: activeDay === day.dayNumber ? 'rgba(255,255,255,0.08)' : undefined,
                        }}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: REGION_COLORS[day.region] }}
                        />
                        <span className={`text-[10px] font-medium ${isToday ? 'text-gold' : 'text-text'}`}>{day.dayNumber}</span>
                        {isToday && <span className="text-[8px] text-gold">сегодня</span>}
                      </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
