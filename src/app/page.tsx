'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import DaySection from '@/components/DaySection';
import day0 from '@/data/days/day0';
import day1 from '@/data/days/day1';
import day2 from '@/data/days/day2';
import day3 from '@/data/days/day3';
import day4 from '@/data/days/day4';
import day5 from '@/data/days/day5';
import day6 from '@/data/days/day6';
import day7 from '@/data/days/day7';
import day8 from '@/data/days/day8';
import day9 from '@/data/days/day9';
import day10 from '@/data/days/day10';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function RegionHeader({ label, emoji, title, color, description, image }: {
  label: string; emoji: string; title: string; color: string; description: string; image: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div
      ref={ref}
      className="relative h-[300px] md:h-[380px] overflow-hidden -mx-4 md:-mx-8 mb-10 scroll-mt-4"
    >
      <motion.div
        className="absolute inset-[-15%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${basePath}/images/${image})`,
          y: bgY,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-2"
          style={{ color: `${color}cc` }}
        >
          {label}
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          {emoji} <span style={{ color }}>{title}</span>
        </h2>
        <p className="text-muted mt-3 leading-relaxed max-w-2xl text-sm md:text-base">
          {description}
        </p>
      </motion.div>
    </div>
  );
}

const Divider = () => <div className="border-t border-white/5 my-4" />;

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
        {/* Day 0 — Transit */}
        <RegionHeader
          label="День 0"
          emoji="✈️"
          title="Перелёт"
          color="#c8c0b4"
          description="Краснодар → Ереван → Стамбул → Нью-Йорк. Транзитная ночь в Ереване."
          image="region-transit.jpg"
        />
        <DaySection config={day0} />

        {/* Days 1-4 — New York */}
        <RegionHeader
          label="Дни 1–4"
          emoji="🗽"
          title="Нью-Йорк"
          color="#e8c87a"
          description="Четыре дня в городе, который никогда не спит. Пешком через мосты, музеи, лучшие рестораны мира и бродвейские мюзиклы."
          image="parallax-nyc-skyline.jpg"
        />
        <DaySection config={day1} />
        <Divider />
        <DaySection config={day2} />
        <Divider />
        <DaySection config={day3} />
        <Divider />
        <DaySection config={day4} />

        {/* Day 5 — Transit NY → Vegas */}
        <RegionHeader
          label="День 5"
          emoji="✈️"
          title="Нью-Йорк → Вегас"
          color="#c8c0b4"
          description="Последнее утро в Нью-Йорке, перелёт через всю страну, и вечер в Лас-Вегасе с Cirque du Soleil."
          image="parallax-desert-road.jpg"
        />
        <DaySection config={day5} />

        {/* Days 6-10 — Vegas + National Parks */}
        <RegionHeader
          label="Дни 6–10"
          emoji="🏜"
          title="Нацпарки"
          color="#e07040"
          description="Пять дней через юго-запад: Zion, Monument Valley, Grand Canyon и Route 66. На машине через пустыни, каньоны и старую Америку."
          image="parallax-canyon.jpg"
        />
        <DaySection config={day6} />
        <Divider />
        <DaySection config={day7} />
        <Divider />
        <DaySection config={day8} />
        <Divider />
        <DaySection config={day9} />
        <Divider />
        <DaySection config={day10} />

        {/* Separator */}
        <Divider />
        <p className="text-center text-muted-dark text-sm py-8">
          Дни 11–19 · скоро
        </p>
        <div className="h-32" />
      </div>
    </main>
  );
}
