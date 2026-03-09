'use client';

import { motion } from 'framer-motion';
import DaySection from '@/components/DaySection';
import StickyNav from '@/components/StickyNav';
import OverviewMap from '@/components/OverviewMap';
import HotelTable from '@/components/HotelTable';
import BookingTable from '@/components/BookingTable';
import BudgetTable from '@/components/BudgetTable';
import { hotelsByRegion } from '@/data/hotels';
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
import day11 from '@/data/days/day11';
import day12 from '@/data/days/day12';
import day13 from '@/data/days/day13';
import day14 from '@/data/days/day14';
import day15 from '@/data/days/day15';
import day16 from '@/data/days/day16';
import day17 from '@/data/days/day17';
import day18 from '@/data/days/day18';
import day19 from '@/data/days/day19';


function RegionHeader({ label, emoji, title, color, description }: {
  label: string; emoji: string; title: string; color: string; description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pt-16 pb-8"
    >
      <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: `${color}99` }}>
        {label}
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-bold">
        {emoji} <span style={{ color }}>{title}</span>
      </h2>
      <p className="text-muted mt-4 leading-relaxed max-w-2xl">{description}</p>
    </motion.div>
  );
}

const Divider = () => <div className="border-t border-white/5 my-4" />;

const ALL_DAYS = [day0, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19];

export default function Home() {
  return (
    <main className="min-h-screen">
      <StickyNav
        days={ALL_DAYS.map(d => ({ dayNumber: d.dayNumber, title: d.title, region: d.region }))}
      />

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
          <OverviewMap />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-8"
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

        />
        <DaySection config={day0} />

        {/* Days 1-4 — New York */}
        <RegionHeader
          label="Дни 1–4"
          emoji="🗽"
          title="Нью-Йорк"
          color="#e8c87a"
          description="Четыре дня в городе, который никогда не спит. Пешком через мосты, музеи, лучшие рестораны мира и бродвейские мюзиклы."

        />
        {hotelsByRegion['new-york'] && (
          <HotelTable hotels={hotelsByRegion['new-york'].hotels} regionColor="#e8c87a" />
        )}
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

        />
        <HotelTable hotels={hotelsByRegion['vegas'].hotels} regionColor="#e07040" />
        <DaySection config={day5} />

        {/* Days 6-10 — Vegas + National Parks */}
        <RegionHeader
          label="Дни 6–10"
          emoji="🏜"
          title="Нацпарки"
          color="#e07040"
          description="Пять дней через юго-запад: Zion, Monument Valley, Grand Canyon и Route 66. На машине через пустыни, каньоны и старую Америку."

        />
        <HotelTable hotels={hotelsByRegion['zion'].hotels} regionColor="#e07040" />
        <DaySection config={day6} />
        <Divider />
        <HotelTable hotels={hotelsByRegion['monument-valley'].hotels} regionColor="#e07040" />
        <DaySection config={day7} />
        <Divider />
        <HotelTable hotels={hotelsByRegion['grand-canyon'].hotels} regionColor="#e07040" />
        <DaySection config={day8} />
        <Divider />
        <DaySection config={day9} />
        <Divider />
        <DaySection config={day10} />

        {/* Days 11-13 — Los Angeles */}
        <RegionHeader
          label="Дни 11–13"
          emoji="🌴"
          title="Лос-Анджелес"
          color="#64b4ff"
          description="Три дня на западном побережье: Hollywood, Griffith Observatory, пляжи Малибу, Getty Center с Ван Гогом, Venice Beach и корейский BBQ."
        />
        <HotelTable hotels={hotelsByRegion['los-angeles'].hotels} regionColor="#64b4ff" />
        <DaySection config={day11} />
        <Divider />
        <DaySection config={day12} />
        <Divider />
        <DaySection config={day13} />

        {/* Day 14-17 — Maui */}
        <RegionHeader
          label="Дни 14–17"
          emoji="🌺"
          title="Мауи"
          color="#40c8a0"
          description="Четыре дня на Гавайях: рассвет над облаками на вулкане Haleakala, Road to Hana с 620 поворотами, чёрный пляж, снорклинг в кратере Molokini и Mama's Fish House."
        />
        <HotelTable hotels={hotelsByRegion['maui'].hotels} regionColor="#40c8a0" />
        <DaySection config={day14} />
        <Divider />
        <DaySection config={day15} />
        <Divider />
        <DaySection config={day16} />
        <Divider />
        <DaySection config={day17} />

        {/* Days 18-19 — Return */}
        <RegionHeader
          label="Дни 18–19"
          emoji="✈️"
          title="Возвращение"
          color="#c8c0b4"
          description="Последнее утро на Мауи, перелёт в LA, Universal Studios и ночной рейс домой через Атлантику."
        />
        <DaySection config={day18} />
        <Divider />
        <DaySection config={day19} />

        {/* Booking & Budget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-16 pb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-2 text-gold/60">Подготовка</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            📋 <span className="text-gold">Что бронировать</span>
          </h2>
        </motion.div>
        <BookingTable />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-16 pb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-2 text-gold/60">Финансы</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            💰 <span className="text-gold">Бюджет</span>
          </h2>
        </motion.div>
        <BudgetTable />

        {/* Footer with version */}
        <div className="h-32 flex items-end justify-center pb-6">
          <p className="text-[10px] text-muted-dark/40 tracking-wider">v2.1</p>
        </div>
      </div>
    </main>
  );
}
