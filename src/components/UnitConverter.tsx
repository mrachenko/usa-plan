'use client';

const CHEATSHEET = [
  { us: '70°F', metric: '21°C', context: 'Приятно' },
  { us: '85°F', metric: '29°C', context: 'Жарко' },
  { us: '100°F', metric: '38°C', context: 'Пекло (каньоны)' },
  { us: '110°F', metric: '43°C', context: 'Опасная жара' },
  { us: '60 mph', metric: '97 км/ч', context: 'Город' },
  { us: '75 mph', metric: '121 км/ч', context: 'Хайвей' },
  { us: '1 mile', metric: '1.6 км', context: '' },
  { us: '1 gallon', metric: '3.8 л', context: '' },
  { us: '$1', metric: '~90 ₽', context: 'июль 2026' },
];

export default function UnitConverter() {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
      <h3 className="text-sm font-display font-bold text-gold mb-4">📐 Шпаргалка</h3>
      <div className="space-y-2">
        {CHEATSHEET.map((row, i) => (
          <div key={i} className="flex items-center gap-3 text-xs">
            <span className="text-muted-dark w-16 text-right shrink-0">{row.us}</span>
            <span className="text-white/20">=</span>
            <span className="text-text font-medium">{row.metric}</span>
            {row.context && <span className="text-muted-dark ml-auto">{row.context}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
