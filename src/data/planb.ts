export interface PlanBOption {
  name: string;
  why: string;
}

export const desertChecklist = [
  { id: 'desert-fuel', emoji: '⛽', text: 'Бак минимум 2/3 — заправки редкие' },
  { id: 'desert-water', emoji: '💧', text: '4-5 л воды на человека в машине' },
  { id: 'desert-tires', emoji: '🛞', text: 'Давление шин + запаска на месте' },
  { id: 'desert-ac', emoji: '❄️', text: 'Кондиционер работает, антифриз ок' },
  { id: 'desert-maps', emoji: '🗺️', text: 'Офлайн-карты скачаны' },
  { id: 'desert-weather', emoji: '⚠️', text: 'Weather alerts: flash flood, dust storm' },
  { id: 'desert-snacks', emoji: '🧂', text: 'Снеки + электролиты' },
  { id: 'desert-timing', emoji: '🌅', text: 'Длинные перегоны утром, не в полдень' },
];

export const planBData: Record<number, { problem: string; options: PlanBOption[] }> = {
  1: {
    problem: 'Дождь / гроза',
    options: [
      { name: 'The Met', why: 'Полдня в музее, не зависишь от погоды' },
      { name: 'MoMA', why: 'Компактнее Met, отличный indoor-день' },
      { name: 'Grand Central + SUMMIT', why: 'Город и виды без прогулки под дождём' },
    ],
  },
  2: {
    problem: 'Дождь / гроза',
    options: [
      { name: 'The Met (целый день)', why: 'Египетский храм, импрессионисты — хватит на 5 часов' },
      { name: 'Chelsea Market + High Line под навесом', why: 'Еда + крытая часть High Line' },
      { name: 'Broadway matinee', why: 'Дневной спектакль — идеальный дождливый день' },
    ],
  },
  3: {
    problem: 'Дождь / гроза',
    options: [
      { name: 'MoMA', why: 'Компактный, мощный, кондиционер' },
      { name: '9/11 Memorial Museum', why: 'Мощный опыт, 2-3 часа, полностью indoor' },
      { name: 'Speakeasy-бары (PDT, Attaboy)', why: 'Вечерняя альтернатива без улицы' },
    ],
  },
  4: {
    problem: 'Дождь / гроза',
    options: [
      { name: 'Brooklyn Museum', why: 'Менее туристический, чем Met, отличная коллекция' },
      { name: 'Smorgasburg (если сб-вс)', why: 'Крупнейший food market, крытые зоны' },
      { name: 'Отдых + паковка перед Vegas', why: 'Расслабленный день перед перелётом' },
    ],
  },
  6: {
    problem: 'Flash flood закрыл The Narrows',
    options: [
      { name: 'Riverside Walk', why: 'Тот же каньон и река, но безопасная короткая прогулка' },
      { name: 'Zion-Mt. Carmel Highway', why: 'Живописная дорога с короткими остановками' },
      { name: 'Kolob Canyons', why: 'Спокойная часть Zion, красные каньоны из машины' },
    ],
  },
  7: {
    problem: 'Слишком жарко для тура',
    options: [
      { name: 'Scenic Drive на рассвете', why: 'Те же виды, но в мягкое окно температуры' },
      { name: 'Балкон отеля + музей Goulding\'s', why: 'Виды без нагрузки, переждать пик жары' },
      { name: 'Guided jeep-тур', why: 'Меньше пешком, закрытые для самостоятельного доступа точки' },
    ],
  },
  8: {
    problem: 'Antelope Canyon закрыт',
    options: [
      { name: 'Horseshoe Bend (рано утром)', why: 'Самый эффектный Plan B рядом с Page' },
      { name: 'Glen Canyon Dam + Visitor Center', why: 'Прохладнее, познавательно' },
      { name: 'Lake Powell — лодка/рафтинг', why: 'Wow-factor на воде вместо слот-каньона' },
    ],
  },
  9: {
    problem: 'Устали от хайков',
    options: [
      { name: 'Desert View Drive', why: 'Едете по rim road, 2-3 viewpoints из машины' },
      { name: 'Yavapai Geology Museum', why: 'Виды на каньон + кондиционер + без нагрузки' },
      { name: 'Только закат на одном viewpoint', why: 'Один сильный выход вместо большого дня' },
    ],
  },
  10: {
    problem: 'Выбились из графика',
    options: [
      { name: 'Одна остановка Route 66 + быстрый маршрут', why: 'Символический стоп, экономия 2 часов' },
      { name: 'Ночёвка в Barstow', why: 'Лучше разбить день, чем ехать ночью по пустыне' },
      { name: 'Mojave scenic stop', why: 'Короткая остановка сохраняет дух road trip' },
    ],
  },
  11: {
    problem: 'Усталость / jet lag с Мауи',
    options: [
      { name: 'Getty Center', why: 'Мягкий день: красиво, спокойно, бесплатный вход' },
      { name: 'Academy Museum', why: 'Кондиционер и кино вместо очередного переезда' },
      { name: 'Santa Monica пляж + пирс', why: 'Расслабленное утро без плана' },
    ],
  },
  12: {
    problem: 'Усталость',
    options: [
      { name: 'The Broad Museum', why: 'Бесплатный, Infinity Mirror Room Кусамы' },
      { name: 'Grand Central Market + отдых', why: 'Фуд-холл с 1917 года, без длинных переездов' },
      { name: 'Griffith Observatory на закат', why: 'Один эффектный выход вечером' },
    ],
  },
  13: {
    problem: 'Усталость',
    options: [
      { name: 'Venice Beach + каналы', why: 'Лёгкая прогулка без графика' },
      { name: 'Korean spa (Wi Spa)', why: 'Полное восстановление перед Мауи' },
      { name: 'Шопинг: The Grove / Melrose', why: 'Расслабленный день перед перелётом' },
    ],
  },
  14: {
    problem: 'Шторм / плохая погода',
    options: [
      { name: 'Maui Ocean Center', why: 'Надёжный indoor: аквариум, черепахи, акулы' },
      { name: 'Iao Valley', why: '"Maui\'s Yosemite" — лёгкий хайк, зелёные горы, 30 мин от Kahului' },
      { name: 'Lahaina (если открыто)', why: 'Магазины, галереи, рестораны' },
    ],
  },
  15: {
    problem: 'Road to Hana закрыта',
    options: [
      { name: 'Haleakala summit днём', why: 'Вулкан, виды, прохладнее побережья' },
      { name: 'Snorkel в Kapalua Bay', why: 'Защищённая бухта, работает даже при волнах' },
      { name: 'Maui Tropical Plantation', why: 'Тур + ланч, расслабленная альтернатива' },
    ],
  },
  16: {
    problem: 'Шторм / волны',
    options: [
      { name: 'Iao Valley', why: 'Зелёные горы, водопады, лёгкий хайк' },
      { name: 'Surfing Goat Dairy + Lavender Farm', why: 'Upcountry Maui — другая атмосфера' },
      { name: 'Maui Brewing Company', why: 'Крафтовое пиво + ланч, переждать непогоду' },
    ],
  },
  17: {
    problem: 'Волны отменили Molokini тур',
    options: [
      { name: 'Turtle Town (снорклинг с берега)', why: 'Черепахи без лодки, защищённое место' },
      { name: 'Whale watching (если сезон)', why: 'Июль — не сезон китов, но дельфины есть' },
      { name: 'Spa day в отеле', why: 'Заслуженный отдых перед обратным перелётом' },
    ],
  },
};
