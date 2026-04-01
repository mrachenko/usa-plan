'use client';

import { motion } from 'framer-motion';
import DaySection from '@/components/DaySection';
import StickyNav from '@/components/StickyNav';
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
      <div className="text-muted mt-4 leading-relaxed max-w-2xl space-y-2">
        {description.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </motion.div>
  );
}

const Divider = () => <div className="border-t border-white/5 my-4" />;

const ALL_DAYS = [day0, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19];

export default function Home() {
  return (
    <main className="min-h-screen">
      <StickyNav
        days={ALL_DAYS.map(d => ({ dayNumber: d.dayNumber, date: d.date, title: d.title, region: d.region }))}
      />

      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/usa-plan/images/hero.webp)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-bg" />
        <div className="relative z-10 text-center px-6" data-hero style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.3em] uppercase text-white/80 mb-4"
          >
            10 – 31 июля 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            США <span className="text-gold">2026</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 text-lg md:text-xl tracking-wide"
          >
            21 день · 7 городов · 2 океана
          </motion.p>

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
          description={"Два перелёта, три страны, тридцать часов — и мы в Америке.\n\nНо сначала — вечер в Ереване: поющие фонтаны на площади Республики, хоровац с углей и бокал Арени. Последний ужин на территории СНГ, а в 03:00 — Turkish Airlines через Стамбул прямо в JFK."}

        />
        <DaySection config={day0} />

        {/* Days 1-4 — New York */}
        <RegionHeader
          label="Дни 1–4"
          emoji="🗽"
          title="Нью-Йорк"
          color="#e8c87a"
          description={"Город, который никогда не спит — и нам тоже не даст.\n\nЧетыре дня пешком через Brooklyn Bridge и High Line, мимо готических небоскрёбов и паровых люков. Утренний Central Park без души, Met с египетским храмом внутри, Guggenheim — спираль Райта. Лучший бейгл с лососём с 1914 года, пицца из угольной печи, паста cacio e pepe из топ-20 мира, The Dead Rabbit — бывший бар номер один на планете.\n\nBroadway, джаз в подвале Village Vanguard, неон Times Square — и бесплатный паром мимо Статуи Свободы в 300 метрах."}

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
          description={"Утром — устрицы в Grand Central Terminal под звёздным потолком. Днём — пять часов над Америкой. Вечером — совершенно другая вселенная.\n\nВегас обрушивается неоном и безумием: фонтаны Bellagio на 140 метров, Cirque du Soleil «O» — сцена превращается в бассейн, акробаты прыгают с 20-метровой высоты. И Secret Pizza — лучший slice за неприметной дверью."}

        />
        <HotelTable hotels={hotelsByRegion['vegas'].hotels} regionColor="#e07040" />
        <DaySection config={day5} />

        {/* Days 6-10 — Vegas + National Parks */}
        <RegionHeader
          label="Дни 6–10"
          emoji="🏜"
          title="Нацпарки"
          color="#e07040"
          description={"Пять дней за рулём через Дикий Запад — тот самый, из кино.\n\nZion: идём по реке между стен высотой 300 метров, вода по пояс, небо — узкая полоска. Monument Valley: прямая дорога между скалами-бьюттами, закат из «Форреста Гампа», Млечный Путь без единого фонаря. Horseshoe Bend — земля обрывается, внизу бирюзовая подкова Колорадо. Antelope Canyon — свет превращает камень в текущее пламя.\n\nГранд-Каньон: 1600 метров глубины и 2 миллиарда лет геологии. Рассвет, закат, и ресторан 1905 года на самом краю. Route 66, городок из мультфильма Cars, и первый In-N-Out в Калифорнии."}

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
          description={"После пустынь и каньонов — океан, пальмы и совершенно другая энергия.\n\nMalibu: базальтовые скалы El Matador Beach в утреннем тумане, завтрак над волнами. Pacific Coast Highway — 45 км обрыва в океан. Getty Center — Ван Гог, Рембрандт и панорама LA до горизонта, бесплатно. Griffith Observatory — HOLLYWOOD под ногами, телескоп Цейсса 1935 года.\n\nVenice Beach, скейтеры, каналы маленькой Венеции 1905 года. Корейский BBQ в Koreatown — угольный гриль, калби, кимчи, неоновые вывески на хангыле. И спикизи за неприметной дверью на десерт."}
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
          description={"Пять часов над Тихим океаном — и стена тёплого воздуха с ароматом плюмерии.\n\nHaleakala: подъём в 2:30 ночи, серпантин на 3056 метров, рассвет над облаками — «самое величественное зрелище на земле» (Марк Твен). Road to Hana: 620 поворотов, 59 мостов, водопады, чёрный вулканический пляж, бамбуковый лес со звуком тысячи скрипок.\n\nMolokini — снорклинг в кратере вулкана, видимость 60 метров, черепахи на расстоянии вытянутой руки. Kaanapali Beach — три километра белого песка и бирюзовой воды +26°C. Mama's Fish House — в меню имя рыбака, поймавшего вашу рыбу сегодня утром."}
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
          description={"Два последних дня — и мы уходим красиво.\n\nУтро на Мауи: тёплый песок, баньяновое дерево на весь квартал, гавайский shave ice. Перелёт в LA — и Хогвартс в натуральную величину: сливочное пиво, Forbidden Journey, Studio Tour по настоящим площадкам Спилберга.\n\nНочной Turkish Airlines через Атлантику — 19 дней Америки превращаются в самое яркое воспоминание."}
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
