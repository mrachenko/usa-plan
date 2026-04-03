export type PackCategory = 'city' | 'parks' | 'beach' | 'roadtrip' | 'always';
export type BuyStatus = 'have' | 'buy-ru' | 'buy-us' | 'rent';

export interface PackItem {
  id: string;
  emoji: string;
  name: string;
  note?: string;
  buy?: BuyStatus;
  categories: PackCategory[];
}

export const PACK_CATEGORIES: Record<PackCategory, { label: string; emoji: string }> = {
  city: { label: 'Город', emoji: '🏙️' },
  parks: { label: 'Нацпарки', emoji: '🥾' },
  beach: { label: 'Мауи', emoji: '🏖️' },
  roadtrip: { label: 'Road trip', emoji: '🚗' },
  always: { label: 'Всегда', emoji: '🏥' },
};

// Map day region to pack categories (for full packing list filter)
export const REGION_PACK: Record<string, PackCategory[]> = {
  'new-york': ['city'],
  'vegas-parks': ['parks', 'roadtrip'],
  'los-angeles': ['city'],
  'maui': ['beach'],
  'transit': [],
};

// Per-day specific items (only what's unique for THIS day)
export const DAY_PACK: Record<number, string[]> = {
  1: ['city-shoes', 'city-hoodie', 'always-powerbank'],
  2: ['city-shoes', 'city-smartcasual', 'always-powerbank'],
  3: ['city-shoes', 'city-bag', 'always-powerbank'],
  4: ['city-shoes', 'city-bag', 'always-powerbank'],
  5: ['city-smartcasual', 'always-powerbank'], // Vegas dress code
  6: ['park-boots', 'park-neosocks', 'park-pole', 'park-drybag', 'park-water', 'park-hat', 'always-spf'], // Narrows!
  7: ['park-hat', 'park-water', 'road-polarized', 'always-spf', 'park-electrolytes'], // Monument Valley heat
  8: ['park-hat', 'park-water', 'always-spf', 'park-electrolytes'], // Horseshoe Bend early morning
  9: ['park-boots', 'park-hat', 'park-water', 'always-spf', 'road-flashlight'], // Grand Canyon sunrise = early
  10: ['road-polarized', 'road-charger', 'road-cooler', 'park-electrolytes', 'road-buff'], // Long desert drive
  11: ['city-shoes', 'always-spf', 'always-sunglasses'], // LA Malibu
  12: ['city-shoes', 'always-spf', 'city-bag'], // LA Getty/Griffith
  13: ['city-shoes', 'city-bag', 'always-powerbank'], // Venice/Korean BBQ
  14: ['beach-warm', 'beach-pants', 'beach-swim', 'beach-sunscreen'], // Haleakala sunrise + beach
  15: ['beach-sunscreen', 'beach-rashguard', 'beach-snorkel', 'beach-rain'], // Road to Hana
  16: ['beach-sunscreen', 'beach-rashguard', 'beach-swim'], // Snorkeling/beach
  17: ['beach-sunscreen', 'beach-snorkel', 'beach-rashguard'], // Molokini
  18: ['city-shoes', 'always-powerbank', 'city-hoodie'], // Universal Studios
};

export const packItems: PackItem[] = [
  // Город
  { id: 'city-shoes', emoji: '👟', name: 'Удобные кроссовки', note: '20+ км/день', categories: ['city'] },
  { id: 'city-tees', emoji: '👕', name: '4-5 лёгких футболок', note: 'быстросохнущие', categories: ['city'] },
  { id: 'city-hoodie', emoji: '🧥', name: 'Лёгкая кофта/худи', note: 'кондиционеры в США на +18°C', categories: ['city'] },
  { id: 'city-bag', emoji: '🎒', name: 'Компактный рюкзак / crossbody', categories: ['city'] },
  { id: 'city-cash', emoji: '💳', name: 'Наличные $1-5', note: 'чаевые носильщикам, valet', categories: ['city'] },
  { id: 'city-smartcasual', emoji: '🌃', name: 'Smart-casual образ', note: 'дресс-код в ресторанах Vegas и NYC', categories: ['city'] },

  // Нацпарки
  { id: 'park-boots', emoji: '👟', name: 'Трекинговые ботинки', note: 'цепкая подошва', categories: ['parks'] },
  { id: 'park-neosocks', emoji: '🧦', name: 'Неопреновые носки', note: 'The Narrows — хайк по реке', buy: 'rent', categories: ['parks'] },
  { id: 'park-pole', emoji: '🦯', name: 'Трекинговая палка', note: 'Zion Outfitter, $25 комплект', buy: 'rent', categories: ['parks'] },
  { id: 'park-drybag', emoji: '👜', name: 'Dry bag / гермомешок', note: 'телефон и камера в воде', buy: 'buy-us', categories: ['parks'] },
  { id: 'park-water', emoji: '💧', name: 'Гидратор 3л или термобутылки', note: 'вода нагревается за 20 мин при +43°C', categories: ['parks'] },
  { id: 'park-hat', emoji: '👒', name: 'Широкополая шляпа', note: 'бейсболка не защитит уши/шею', categories: ['parks'] },
  { id: 'park-cooltowel', emoji: '💦', name: 'Охлаждающее полотенце', note: 'cooling towel', buy: 'buy-us', categories: ['parks'] },
  { id: 'park-electrolytes', emoji: '🧂', name: 'Электролиты в порошке', note: 'Liquid IV / Pedialyte', buy: 'buy-us', categories: ['parks'] },

  // Мауи
  { id: 'beach-sunscreen', emoji: '☀️', name: 'Reef-safe минеральный крем', note: 'zinc oxide — закон Гавайев!', buy: 'buy-us', categories: ['beach'] },
  { id: 'beach-swim', emoji: '🩱', name: 'Купальник × 2', note: 'один сохнет', categories: ['beach'] },
  { id: 'beach-rashguard', emoji: '👕', name: 'Рашгард', note: 'от солнца при снорклинге', categories: ['beach'] },
  { id: 'beach-snorkel', emoji: '🤿', name: 'Маска + трубка', note: 'своя гигиеничнее', categories: ['beach'] },
  { id: 'beach-warm', emoji: '🥶', name: 'Пуховик-пачка или флиска', note: 'Haleakala summit +5°C + ветер', categories: ['beach'] },
  { id: 'beach-pants', emoji: '👖', name: 'Длинные штаны/леггинсы', note: 'утренний холод на вершине', categories: ['beach'] },
  { id: 'beach-rain', emoji: '🧥', name: 'Лёгкий дождевик', note: 'тропические ливни', categories: ['beach'] },

  // Road trip
  { id: 'road-polarized', emoji: '🕶️', name: 'Поляризационные очки', note: 'блики от асфальта', categories: ['roadtrip'] },
  { id: 'road-charger', emoji: '🔌', name: 'Разветвитель в прикуриватель', note: '2 телефона + навигатор', categories: ['roadtrip'] },
  { id: 'road-cooler', emoji: '❄️', name: 'Сумка-холодильник', note: 'купить в Walmart + лёд из отеля', buy: 'buy-us', categories: ['roadtrip'] },
  { id: 'road-maps', emoji: '🗺️', name: 'Офлайн-карты скачаны', note: 'Monument Valley — часами без связи', categories: ['roadtrip'] },
  { id: 'road-flashlight', emoji: '🔦', name: 'Компактный фонарь', note: 'заправки, парковки, ранний выезд', categories: ['roadtrip'] },
  { id: 'road-buff', emoji: '🧣', name: 'Бафф/платок', note: 'пыль, солнце', categories: ['roadtrip'] },

  // Всегда
  { id: 'always-shants', emoji: '🦴', name: 'Воротник Шанца', note: 'в самолёт и на перегоны', categories: ['always'] },
  { id: 'always-stim', emoji: '⚡', name: 'Миостимулятор + электроды', note: 'запасные электроды!', categories: ['always'] },
  { id: 'always-docs', emoji: '📄', name: 'Паспорта + страховка', note: 'в водозащитном чехле', categories: ['always'] },
  { id: 'always-cards', emoji: '💳', name: '2 банковские карты', note: 'держать раздельно', categories: ['always'] },
  { id: 'always-meds', emoji: '💊', name: 'Лекарства + ибупрофен', note: '+ пластыри от мозолей (Moleskin)', buy: 'buy-us', categories: ['always'] },
  { id: 'always-moisturizer', emoji: '🧴', name: 'Увлажняющий крем / капли для носа', note: 'сухой воздух Аризоны', categories: ['always'] },
  { id: 'always-powerbank', emoji: '📱', name: 'Power bank', categories: ['always'] },
  { id: 'always-sanitizer', emoji: '🧼', name: 'Антисептик + влажные салфетки', categories: ['always'] },
  { id: 'always-sunglasses', emoji: '🕶️', name: 'Солнцезащитные очки', categories: ['always'] },
  { id: 'always-cap', emoji: '🎩', name: 'Кепка/панама', categories: ['always'] },
  { id: 'always-spf', emoji: '🧴', name: 'SPF 50 + бальзам для губ с SPF', categories: ['always'] },
  { id: 'always-adapter', emoji: '🔌', name: 'Адаптер розетки US Type A/B', categories: ['always'] },
];

export const BUY_LABELS: Record<BuyStatus, { label: string; color: string }> = {
  'have': { label: 'есть', color: '#90e870' },
  'buy-ru': { label: '🛒 купить в РФ', color: '#f0a050' },
  'buy-us': { label: '🛒 купить в США', color: '#64b4ff' },
  'rent': { label: '🔄 арендовать', color: '#e8c87a' },
};
