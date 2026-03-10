export interface BudgetItem {
  category: string;
  amount: number;
  note: string;
  isTotal?: boolean;
}

export const budgetItems: BudgetItem[] = [
  {
    category: 'Авиабилеты',
    amount: 3200,
    note: 'EVN→JFK + LAX→EVN (141 т₽) + KRR↔EVN (~61 т₽) + JFK→LAS + LAX↔OGG (~$700) — на двоих',
  },
  {
    category: 'Отели (20 ночей)',
    amount: 5000,
    note: 'средняя ~$250/ночь (рекомендуемые варианты)',
  },
  {
    category: 'Аренда авто + бензин',
    amount: 1200,
    note: 'Вегас→LA 5 дней + Мауи 4 дня + бензин ~$150',
  },
  {
    category: 'Еда и рестораны',
    amount: 5000,
    note: '~$250/день на двоих с напитками, tax и tip',
  },
  {
    category: 'Развлечения и билеты',
    amount: 2400,
    note: 'Universal, Cirque, Lion King, Molokini, Antelope Canyon, парки + Non-Resident Annual Pass $250',
  },
  {
    category: 'Транспорт в городах',
    amount: 500,
    note: 'метро NYC, Uber, такси, паромы',
  },
];

export const budgetTotal: BudgetItem = {
  category: 'Итого',
  amount: 17300,
  note: '',
  isTotal: true,
};
