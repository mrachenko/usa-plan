export interface PlanBOption {
  name: string;
  why: string;
  pos?: { lat: number; lng: number };
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
      { name: 'The Met', why: 'Полдня в музее, не зависишь от погоды', pos: { lat: 40.779, lng: -73.963 } },
      { name: 'MoMA', why: 'Компактнее Met, отличный indoor-день', pos: { lat: 40.761, lng: -73.978 } },
      { name: 'Grand Central + SUMMIT', why: 'Город и виды без прогулки под дождём', pos: { lat: 40.753, lng: -73.977 } },
    ],
  },
  2: {
    problem: 'Дождь / гроза',
    options: [
      { name: 'The Met (целый день)', why: 'Египетский храм, импрессионисты — хватит на 5 часов', pos: { lat: 40.779, lng: -73.963 } },
      { name: 'Chelsea Market + High Line', why: 'Еда + крытая часть High Line', pos: { lat: 40.742, lng: -74.006 } },
      { name: 'Broadway matinee', why: 'Дневной спектакль — идеальный дождливый день', pos: { lat: 40.759, lng: -73.985 } },
    ],
  },
  3: {
    problem: 'Дождь / гроза',
    options: [
      { name: 'MoMA', why: 'Компактный, мощный, кондиционер', pos: { lat: 40.761, lng: -73.978 } },
      { name: '9/11 Memorial Museum', why: 'Мощный опыт, 2-3 часа, полностью indoor', pos: { lat: 40.711, lng: -74.013 } },
      { name: 'Speakeasy-бары (PDT, Attaboy)', why: 'Вечерняя альтернатива без улицы', pos: { lat: 40.726, lng: -73.990 } },
    ],
  },
  4: {
    problem: 'Дождь / гроза',
    options: [
      { name: 'Brooklyn Museum', why: 'Менее туристический, чем Met, отличная коллекция', pos: { lat: 40.671, lng: -73.964 } },
      { name: 'Smorgasburg (если сб-вс)', why: 'Крупнейший food market, крытые зоны', pos: { lat: 40.722, lng: -73.962 } },
      { name: 'Отдых + паковка перед Vegas', why: 'Расслабленный день перед перелётом' },
    ],
  },
  6: {
    problem: 'Flash flood закрыл The Narrows',
    options: [
      { name: 'Riverside Walk', why: 'Тот же каньон и река, но безопасная короткая прогулка', pos: { lat: 37.285, lng: -112.948 } },
      { name: 'Zion-Mt. Carmel Highway', why: 'Живописная дорога с короткими остановками', pos: { lat: 37.213, lng: -112.928 } },
      { name: 'Kolob Canyons', why: 'Спокойная часть Zion, красные каньоны из машины', pos: { lat: 37.449, lng: -113.190 } },
    ],
  },
  7: {
    problem: 'Слишком жарко для тура',
    options: [
      { name: 'Scenic Drive на рассвете', why: 'Те же виды, но в мягкое окно температуры', pos: { lat: 36.983, lng: -110.114 } },
      { name: 'Балкон отеля + музей Goulding\'s', why: 'Виды без нагрузки, переждать пик жары', pos: { lat: 37.007, lng: -110.178 } },
      { name: 'Guided jeep-тур', why: 'Меньше пешком, закрытые точки', pos: { lat: 36.983, lng: -110.114 } },
    ],
  },
  8: {
    problem: 'Antelope Canyon закрыт',
    options: [
      { name: 'Horseshoe Bend (рано утром)', why: 'Самый эффектный Plan B рядом с Page', pos: { lat: 36.879, lng: -111.510 } },
      { name: 'Glen Canyon Dam + Visitor Center', why: 'Прохладнее, познавательно', pos: { lat: 36.938, lng: -111.486 } },
      { name: 'Lake Powell — лодка/рафтинг', why: 'Wow-factor на воде вместо слот-каньона', pos: { lat: 36.998, lng: -111.488 } },
    ],
  },
  9: {
    problem: 'Устали от хайков',
    options: [
      { name: 'Desert View Drive', why: 'Едете по rim road, 2-3 viewpoints из машины', pos: { lat: 36.039, lng: -111.826 } },
      { name: 'Yavapai Geology Museum', why: 'Виды на каньон + кондиционер + без нагрузки', pos: { lat: 36.064, lng: -112.109 } },
      { name: 'Только закат на одном viewpoint', why: 'Один сильный выход вместо большого дня', pos: { lat: 36.059, lng: -112.152 } },
    ],
  },
  10: {
    problem: 'Выбились из графика',
    options: [
      { name: 'Одна остановка Route 66 + быстрый маршрут', why: 'Символический стоп, экономия 2 часов', pos: { lat: 35.328, lng: -112.876 } },
      { name: 'Ночёвка в Barstow', why: 'Лучше разбить день, чем ехать ночью по пустыне', pos: { lat: 34.895, lng: -117.023 } },
      { name: 'Mojave scenic stop', why: 'Короткая остановка сохраняет дух road trip', pos: { lat: 35.012, lng: -118.170 } },
    ],
  },
  11: {
    problem: 'Усталость',
    options: [
      { name: 'Getty Center', why: 'Мягкий день: красиво, спокойно, бесплатный вход', pos: { lat: 34.078, lng: -118.474 } },
      { name: 'Academy Museum', why: 'Кондиционер и кино вместо очередного переезда', pos: { lat: 34.063, lng: -118.359 } },
      { name: 'Santa Monica пляж + пирс', why: 'Расслабленное утро без плана', pos: { lat: 34.008, lng: -118.497 } },
    ],
  },
  12: {
    problem: 'Усталость',
    options: [
      { name: 'The Broad Museum', why: 'Бесплатный, Infinity Mirror Room Кусамы', pos: { lat: 34.054, lng: -118.250 } },
      { name: 'Grand Central Market', why: 'Фуд-холл с 1917 года, без длинных переездов', pos: { lat: 34.051, lng: -118.249 } },
      { name: 'Griffith Observatory на закат', why: 'Один эффектный выход вечером', pos: { lat: 34.119, lng: -118.300 } },
    ],
  },
  13: {
    problem: 'Усталость',
    options: [
      { name: 'Venice Beach + каналы', why: 'Лёгкая прогулка без графика', pos: { lat: 33.985, lng: -118.470 } },
      { name: 'Korean spa (Wi Spa)', why: 'Полное восстановление перед Мауи', pos: { lat: 34.063, lng: -118.302 } },
      { name: 'Шопинг: The Grove / Melrose', why: 'Расслабленный день перед перелётом', pos: { lat: 34.072, lng: -118.358 } },
    ],
  },
  14: {
    problem: 'Шторм / плохая погода',
    options: [
      { name: 'Maui Ocean Center', why: 'Надёжный indoor: аквариум, черепахи, акулы', pos: { lat: 20.793, lng: -156.510 } },
      { name: 'Iao Valley', why: '"Maui\'s Yosemite" — лёгкий хайк, зелёные горы', pos: { lat: 20.880, lng: -156.544 } },
      { name: 'Lahaina (если открыто)', why: 'Магазины, галереи, рестораны', pos: { lat: 20.873, lng: -156.678 } },
    ],
  },
  15: {
    problem: 'Road to Hana закрыта',
    options: [
      { name: 'Haleakala summit днём', why: 'Вулкан, виды, прохладнее побережья', pos: { lat: 20.710, lng: -156.253 } },
      { name: 'Snorkel в Kapalua Bay', why: 'Защищённая бухта, работает даже при волнах', pos: { lat: 20.999, lng: -156.668 } },
      { name: 'Maui Tropical Plantation', why: 'Тур + ланч, расслабленная альтернатива', pos: { lat: 20.860, lng: -156.498 } },
    ],
  },
  16: {
    problem: 'Шторм / волны',
    options: [
      { name: 'Iao Valley', why: 'Зелёные горы, водопады, лёгкий хайк', pos: { lat: 20.880, lng: -156.544 } },
      { name: 'Surfing Goat Dairy + Lavender Farm', why: 'Upcountry Maui — другая атмосфера', pos: { lat: 20.830, lng: -156.340 } },
      { name: 'Maui Brewing Company', why: 'Крафтовое пиво + ланч, переждать непогоду', pos: { lat: 20.890, lng: -156.470 } },
    ],
  },
  17: {
    problem: 'Волны отменили Molokini тур',
    options: [
      { name: 'Turtle Town (снорклинг с берега)', why: 'Черепахи без лодки, защищённое место', pos: { lat: 20.640, lng: -156.443 } },
      { name: 'Whale watching / дельфины', why: 'Июль — не сезон китов, но дельфины есть', pos: { lat: 20.793, lng: -156.510 } },
      { name: 'Spa day в отеле', why: 'Заслуженный отдых перед обратным перелётом' },
    ],
  },
};
