'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '21', label: 'день', icon: '📅' },
  { value: '7', label: 'городов', icon: '🏙️' },
  { value: '5', label: 'штатов + Гавайи', icon: '🗺️' },
  { value: '~5 000', label: 'км за рулём', icon: '🚗' },
  { value: '~25 000', label: 'км перелётов', icon: '✈️' },
  { value: '4', label: 'нацпарка', icon: '🏜️' },
  { value: '26', label: 'отелей изучено', icon: '🏨' },
  { value: '40+', label: 'ресторанов', icon: '🍽️' },
  { value: '2', label: 'океана', icon: '🌊' },
  { value: '1', label: 'закат с Haleakala', icon: '🌅' },
];

export default function TripStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center"
        >
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="text-xl font-display font-bold text-gold">{stat.value}</div>
          <div className="text-[10px] text-muted-dark uppercase tracking-wider">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
