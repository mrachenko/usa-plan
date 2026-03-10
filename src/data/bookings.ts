export type BookingStatus = 'Обязательно' | 'Рекомендуется';

export interface Booking {
  item: string;
  when: string;
  status: BookingStatus;
  note?: string;
}

export const bookings: Booking[] = [
  {
    item: 'Авиабилеты EVN→JFK',
    when: 'Куплено ✓',
    status: 'Обязательно',
    note: 'Куплено',
  },
  {
    item: 'Авиабилеты JFK→LAS',
    when: 'За 1-2 месяца',
    status: 'Обязательно',
  },
  {
    item: 'Авиабилеты LAX→OGG→LAX',
    when: 'За 2-3 месяца',
    status: 'Обязательно',
  },
  {
    item: 'Авиабилеты LAX→EVN',
    when: 'Куплено ✓',
    status: 'Обязательно',
    note: 'Куплено',
  },
  {
    item: 'Отели (все)',
    when: 'За 1-2 месяца',
    status: 'Обязательно',
    note: 'Бесплатная отмена на Booking.com',
  },
  {
    item: 'Аренда авто (Вегас→LA, one-way)',
    when: 'За 1 месяц',
    status: 'Обязательно',
    note: 'Enterprise/Hertz, one-way fee ~$200',
  },
  {
    item: 'Аренда авто (Мауи)',
    when: 'За 1 месяц',
    status: 'Обязательно',
  },
  {
    item: 'Cirque du Soleil O (Bellagio)',
    when: 'За 1-2 месяца',
    status: 'Рекомендуется',
    note: 'Места быстро раскупают',
  },
  {
    item: 'Antelope Canyon тур',
    when: 'За 2-3 недели',
    status: 'Обязательно',
    note: 'Только с гидом навахо',
  },
  {
    item: 'Haleakala sunrise (reservation)',
    when: 'За 60 дней',
    status: 'Обязательно',
    note: 'recreation.gov, $1/чел, слоты улетают мгновенно',
  },
  {
    item: 'Molokini snorkel тур',
    when: 'За 1-2 недели',
    status: 'Рекомендуется',
  },
  {
    item: 'Universal Studios Express Pass',
    when: 'За 1 неделю',
    status: 'Рекомендуется',
    note: 'Цена растёт ближе к дате',
  },
  {
    item: 'The Lion King (Broadway)',
    when: 'За 1-2 месяца',
    status: 'Обязательно',
    note: 'Telecharge или TodayTix, mezzanine дешевле',
  },
  {
    item: 'Village Vanguard (джаз-клуб)',
    when: 'За 1-2 недели',
    status: 'Рекомендуется',
    note: 'villagevanguard.com, сеты в 20:00 и 22:00',
  },
  {
    item: 'Non-Resident Annual Pass (нацпарки)',
    when: 'За 1 месяц',
    status: 'Обязательно',
    note: '$250, store.usgs.gov — покрывает Zion + Grand Canyon',
  },
  {
    item: 'Wai\'anapanapa Black Sand Beach',
    when: 'За 30 дней',
    status: 'Обязательно',
    note: 'gostateparks.hawaii.gov, слоты разбирают быстро',
  },
  {
    item: 'Sunset Snorkel Tour (Kaanapali)',
    when: 'За 1-2 недели',
    status: 'Рекомендуется',
    note: 'Trilogy или Teralani',
  },
  {
    item: 'The Lambs Club (ужин)',
    when: 'За 1-2 недели',
    status: 'Рекомендуется',
    note: 'Pre-theater на 18:30, перед Lion King',
  },
  {
    item: 'Via Carota (ужин)',
    when: 'Без брони',
    status: 'Рекомендуется',
    note: 'Только walk-in, приходить к 17:30 — очередь 30-60 мин',
  },
  {
    item: 'Bestia (ужин)',
    when: 'За 1 месяц',
    status: 'Обязательно',
    note: 'bestiaLA.com — одна из самых сложных броней в LA',
  },
  {
    item: 'Mama\'s Fish House (ужин)',
    when: 'За 2-3 месяца',
    status: 'Обязательно',
    note: 'mamasfishhouse.com — столик ocean view',
  },
  {
    item: 'Mala Ocean Tavern (ужин)',
    when: 'За 1-2 недели',
    status: 'Рекомендуется',
    note: 'Столик у воды — заранее',
  },
  {
    item: 'Old Lahaina Luau',
    when: 'За 1-2 месяца',
    status: 'Обязательно',
    note: 'oldlahainaluau.com — разбирают быстро',
  },
  {
    item: 'Four Winds Molokini тур',
    when: 'За 2-4 недели',
    status: 'Обязательно',
    note: 'fourwindsmaui.com, утренний тур обязателен',
  },
];
