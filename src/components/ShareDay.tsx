'use client';

interface Props {
  dayNumber: number;
  date: string;
  title: string;
  stopsCount: number;
}

export default function ShareDay({ dayNumber, date, title, stopsCount }: Props) {
  const share = async () => {
    const text = `🇺🇸 День ${dayNumber} — ${title}\n📅 ${date}\n📍 ${stopsCount} точек\n\nUSA 2026 Road Trip`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `День ${dayNumber}: ${title}`, text });
      } catch {}
    } else {
      await navigator.clipboard?.writeText(text);
      alert('Скопировано!');
    }
  };

  return (
    <button
      onClick={share}
      className="text-xs text-muted-dark hover:text-gold transition-colors flex items-center gap-1"
    >
      <span>📤</span>
      <span>Поделиться</span>
    </button>
  );
}
