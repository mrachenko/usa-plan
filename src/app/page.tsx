'use client';

import { motion } from 'framer-motion';
import DaySection from '@/components/DaySection';
import day0 from '@/data/days/day0';
import day1 from '@/data/days/day1';
import day2 from '@/data/days/day2';
import day3 from '@/data/days/day3';
import day4 from '@/data/days/day4';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/usa-plan/images/hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg" />
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.3em] uppercase text-muted-dark mb-4"
          >
            10 – 31 июля 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6"
          >
            США <span className="text-gold">2026</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-muted text-lg md:text-xl tracking-wide"
          >
            21 день · 7 городов · 2 океана
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-muted-dark text-2xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Region header: Transit */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-16 pb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-dark/60 mb-2">
            День 0
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            ✈️ <span className="text-muted">Перелёт</span>
          </h2>
          <p className="text-muted mt-4 leading-relaxed max-w-2xl">
            Краснодар → Ереван → Стамбул → Нью-Йорк. Транзитная ночь в Ереване.
          </p>
        </motion.div>

        <DaySection config={day0} />

        <div className="border-t border-white/5 my-8" />

        {/* Region header: New York */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-8 pb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-2">
            Дни 1–4
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            🗽 <span className="text-gold">Нью-Йорк</span>
          </h2>
          <p className="text-muted mt-4 leading-relaxed max-w-2xl">
            Четыре дня в городе, который никогда не спит. Пешком через мосты, музеи,
            лучшие рестораны мира и бродвейские мюзиклы.
          </p>
        </motion.div>

        <DaySection config={day1} />
        <div className="border-t border-white/5 my-4" />
        <DaySection config={day2} />
        <div className="border-t border-white/5 my-4" />
        <DaySection config={day3} />
        <div className="border-t border-white/5 my-4" />
        <DaySection config={day4} />

        {/* Separator */}
        <div className="border-t border-white/5 my-8" />
        <p className="text-center text-muted-dark text-sm">
          Дни 5–19 · скоро
        </p>
        <div className="h-32" />
      </div>
    </main>
  );
}
