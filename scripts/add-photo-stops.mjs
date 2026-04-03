#!/usr/bin/env node
/**
 * Adds 23 photo stops to day files.
 * Appends to stops array without breaking existing routes.
 */

import { readFileSync, writeFileSync } from 'fs';

const NEW_STOPS = {
  // NYC — distribute across days 1-4
  'day1.ts': [
    {
      id: 'staple-street-skybridge',
      type: 'gold',
      num: '📸',
      title: 'Staple Street Skybridge',
      time: '~10:00',
      desc: 'Крошечный пешеходный мост между зданиями в узком переулке Трайбеки.',
      why: 'Один из самых секретных и кинематографичных спотов Манхэттена — его снимали в десятках фильмов, но туристы не знают.',
      tip: 'В 5 минутах от метро Franklin St. Лучше утром, когда мягкий свет в узком переулке.',
      photoTip: 'Снимайте вертикально — мост как рамка, кирпичные стены уходят вверх.',
      price: 'бесплатно',
      pos: { lat: 40.7175, lng: -74.0075 },
    },
    {
      id: 'oculus-interior',
      type: 'gold',
      num: '📸',
      title: 'Oculus (WTC)',
      time: '~11:00',
      desc: 'Футуристический транспортный хаб Калатравы — белые рёбра взлетают к небу.',
      why: 'Симметрия, масштаб и свет — лучший архитектурный кадр Нью-Йорка. Плюс кондиционер в +35°C.',
      tip: 'В полдень луч света бьёт через центральную щель в потолке.',
      photoTip: 'Ложитесь на спину в центре и снимайте вертикально вверх — идеальная симметрия.',
      price: 'бесплатно',
      pos: { lat: 40.7112, lng: -74.0134 },
    },
    {
      id: 'cortlandt-alley',
      type: 'gold',
      num: '📸',
      title: 'Cortlandt Alley',
      time: '~11:30',
      desc: 'Самый снимаемый Голливудом переулок Нью-Йорка — граффити, пожарные лестницы, атмосфера.',
      why: 'Переулок из «Человека-паука», «Gotham», десятков сериалов — 5 минут от Bowery.',
      tip: 'Всегда в тени, работает в любую погоду. Отличное место для портретов.',
      photoTip: 'Пожарные лестницы как ведущие линии, граффити слегка вне фокуса.',
      price: 'бесплатно',
      pos: { lat: 40.7181, lng: -74.0008 },
    },
  ],

  'day2.ts': [
    {
      id: 'bethesda-terrace',
      type: 'gold',
      num: '📸',
      title: 'Bethesda Terrace Arcade',
      time: '~07:30',
      desc: 'Подземный проход с потолком из изразцов Минтона — самая красивая плитка Нью-Йорка.',
      why: 'Снимай потолок широкоугольником — рано утром ты будешь один.',
      tip: 'Приходи к 7:00 — к 9:00 уже свадебные фотосессии и толпы.',
      photoTip: 'Снизу вверх на потолок — изразцы создают калейдоскопический узор.',
      price: 'бесплатно',
      pos: { lat: 40.7736, lng: -73.9712 },
    },
    {
      id: 'gapstow-bridge',
      type: 'gold',
      num: '📸',
      title: 'Gapstow Bridge',
      time: '~07:00',
      desc: 'Каменный мост над прудом с отражением небоскрёбов Plaza в воде.',
      why: 'Классический кадр Central Park — но секрет в том, чтобы снимать с уровня воды справа от моста.',
      tip: 'Раннее утро, пока нет ветра — вода как зеркало.',
      photoTip: 'С правой стороны моста на уровне воды — отражение небоскрёбов в пруду.',
      price: 'бесплатно',
      pos: { lat: 40.7677, lng: -73.9718 },
    },
  ],

  'day6.ts': [
    {
      id: 'canyon-junction-bridge',
      type: 'nature',
      num: '📸',
      title: 'Canyon Junction Bridge',
      time: '~18:30',
      desc: 'Мост с видом на Watchman Peak и Virgin River — один из самых сильных кадров Zion.',
      why: 'Классическая открытка Zion. Река как ведущая линия к скалам.',
      tip: 'Остановка шаттла #3. Штатив + длинная выдержка для отражения.',
      photoTip: 'Закат — река отражает красные скалы, используйте штатив.',
      price: 'бесплатно',
      pos: { lat: 37.2139, lng: -112.9751 },
    },
    {
      id: 'court-patriarchs',
      type: 'nature',
      num: '📸',
      title: 'Court of the Patriarchs',
      time: '~17:00',
      desc: 'Три массивных монолита — Abraham, Isaac и Jacob — 2 мин от остановки шаттла.',
      why: 'Фронтальный свет на скалы во второй половине дня. Минимум усилий — максимум вау.',
      tip: 'Остановка шаттла #4. Короткая тропа-оверлук, 5 минут.',
      photoTip: 'Средний телеобъектив, Virgin River в нижнем крае кадра для масштаба.',
      price: 'бесплатно',
      pos: { lat: 37.2556, lng: -112.9508 },
    },
    {
      id: 'parus-trail',
      type: 'nature',
      num: '📸',
      title: "Pa'rus Trail",
      time: '~19:00',
      desc: 'Лёгкая тропа вдоль Virgin River от Visitor Center — красные скалы в золотом свете.',
      why: 'Единственная тропа в Zion без шаттла. На закате ни одного туриста.',
      tip: 'После Narrows ноги гудят — это идеально мягкая прогулка на golden hour.',
      photoTip: 'Река на переднем плане, красные скалы на рассвете/закате.',
      price: 'бесплатно',
      pos: { lat: 37.1989, lng: -112.9843 },
    },
  ],

  'day7.ts': [
    {
      id: 'agathla-peak',
      type: 'nature',
      num: '📸',
      title: 'Agathla Peak',
      time: '~16:30',
      desc: 'Вулканический шпиль 450 м прямо у шоссе US-163 — силуэт из вестерна.',
      why: 'Все проезжают мимо, но силуэт на предзакатном небе выглядит невероятно.',
      tip: 'По левую сторону шоссе при подъезде к Monument Valley. Остановиться на обочине.',
      photoTip: 'Контровой свет на закате — чёрный силуэт шпиля на фоне оранжевого неба.',
      price: 'бесплатно',
      pos: { lat: 36.8710, lng: -110.1005 },
    },
    {
      id: 'artists-point',
      type: 'nature',
      num: '📸',
      title: "Artist's Point",
      time: '~18:00',
      desc: 'Конечная точка 17-мильной петли — самая широкая панорама Monument Valley.',
      why: 'Все три знаковых бьютта в одном кадре, и людей в разы меньше, чем на главной смотровой.',
      tip: 'Приезжайте к закату — свет окрашивает бьютты в красный.',
      photoTip: 'Широкоугольник, все три бьютта + пустынная растительность на переднем плане.',
      price: 'вход $10/чел + $15/авто',
      pos: { lat: 36.9877, lng: -110.0627 },
    },
    {
      id: 'john-fords-point',
      type: 'nature',
      num: '📸',
      title: "John Ford's Point",
      time: '~17:30',
      desc: 'Легендарная точка Джона Форда — именно здесь снимали культовые вестерны.',
      why: 'За $5 навахо посадят вас на лошадь на краю обрыва — культовый ковбойский кадр.',
      tip: 'На scenic drive loop. Есть сувениры от навахо.',
      photoTip: 'Человек-силуэт на краю точки показывает масштаб долины.',
      price: '$5 за фото на лошади',
      pos: { lat: 36.9822, lng: -110.1110 },
    },
  ],

  'day8.ts': [
    {
      id: 'wahweap-overlook',
      type: 'nature',
      num: '📸',
      title: 'Wahweap Overlook',
      time: '~18:30',
      desc: 'Бесплатный вид на Lake Powell — красный песчаник контрастирует с бирюзовой водой.',
      why: 'Лучший вид на озеро без лодки. 5 минут от шоссе, идеально на закат.',
      tip: 'После Антилопы и Подковы — расслабленное завершение дня с видом.',
      photoTip: 'Длинный объектив сжимает слои пустыни и Lake Powell.',
      price: 'бесплатно',
      pos: { lat: 36.9986, lng: -111.4888 },
    },
  ],

  'day9.ts': [
    {
      id: 'desert-view-tower',
      type: 'gold',
      num: '📸',
      title: 'Desert View Watchtower',
      time: '~12:00',
      desc: '70-футовая каменная башня в стиле пуэбло на краю каньона — 1932 год.',
      why: 'Первая точка при въезде из Page. Расписные стены внутри + вид через окна = машина времени.',
      tip: 'Поднимитесь внутрь башни — маленькие окна кадрируют каньон как картину.',
      photoTip: 'Башня как графичный foreground, каньон на фоне — не только сам каньон.',
      price: 'бесплатно (вход в парк $35)',
      pos: { lat: 36.0440, lng: -111.8265 },
    },
    {
      id: 'yaki-point',
      type: 'nature',
      num: '📸',
      title: 'Yaki Point',
      time: '~17:30',
      desc: 'Одна из лучших смотровых — доступна только на шаттле, поэтому мало людей.',
      why: 'Шаттл отсекает 80% туристов. Лучшие тени в каньоне на закате.',
      tip: 'Orange Route шаттл. Рядом — начало South Kaibab Trail.',
      photoTip: '35-70mm, глубина каньона без сверхширокоугольника.',
      price: 'бесплатно',
      pos: { lat: 36.0583, lng: -112.0839 },
    },
  ],

  'day10.ts': [
    {
      id: 'hackberry-general',
      type: 'gold',
      num: '📸',
      title: 'Hackberry General Store',
      time: '~10:00',
      desc: 'Легендарный магазин Route 66 — красный Corvette 1957, старые бензоколонки, ретро-вывески.',
      why: 'Лучшая Route 66 фотозона после Seligman. Аутентичная атмосфера 50-х.',
      tip: 'Стоит прямо на дороге, 20-30 мин на фото и сувениры.',
      photoTip: 'Шире — чтобы ретро-вывески и машины перед фасадом попали в кадр.',
      price: 'бесплатно',
      pos: { lat: 35.3710, lng: -113.7265 },
    },
  ],

  'day11.ts': [
    {
      id: 'point-dume',
      type: 'nature',
      num: '📸',
      title: 'Point Dume',
      time: '~17:00',
      desc: 'Утёс над океаном — панорамный вид на весь залив Санта-Моника.',
      why: 'С вершины — идеальная линия побережья от Малибу до Палос-Вердес.',
      tip: 'Поднимайтесь на overlook, не только на пляж снизу.',
      photoTip: 'Закат — обрывы и океан, wide angle для масштаба.',
      price: 'парковка $8',
      pos: { lat: 34.0014, lng: -118.8065 },
    },
    {
      id: 'el-matador-caves',
      type: 'nature',
      num: '📸',
      title: 'El Matador Beach',
      time: '~18:30',
      desc: 'Скальные арки и гроты на закате — самый красивый секретный пляж Малибу.',
      why: 'Морские стеки в воде создают драматичные силуэты на закате.',
      tip: 'Парковка — ад, приезжайте за 1.5ч до заката. Спуск по крутой лестнице.',
      photoTip: 'Длинная выдержка на воде + скальные арки при низком солнце.',
      price: 'парковка $8',
      pos: { lat: 34.0381, lng: -118.8746 },
    },
  ],

  'day12.ts': [
    {
      id: 'disney-concert-hall',
      type: 'gold',
      num: '📸',
      title: 'Walt Disney Concert Hall',
      time: '~10:00',
      desc: 'Стальные волны Фрэнка Гери — здание отражает город как кривое зеркало.',
      why: 'Обойдите по садовой дорожке на крыше — каждый шаг новый кадр.',
      tip: 'Утром металл меньше бликует. Рядом — Last Bookstore и Angels Flight.',
      photoTip: 'Утренний жёсткий свет создаёт графичные тени на изогнутых стенах.',
      price: 'бесплатно',
      pos: { lat: 34.0553, lng: -118.2498 },
    },
    {
      id: 'last-bookstore',
      type: 'gold',
      num: '📸',
      title: 'The Last Bookstore',
      time: '~10:30',
      desc: 'Тоннель из книг на втором этаже — культовый инстаграм-спот Лос-Анджелеса.',
      why: 'К открытию (10:00) у вас будет 5 минут без людей в тоннеле.',
      tip: 'Spring St, DTLA. В одном квадрате с Disney Hall и Angels Flight.',
      photoTip: 'Приходите к открытию — тоннель из книг без людей.',
      price: 'бесплатно',
      pos: { lat: 34.0477, lng: -118.2495 },
    },
    {
      id: 'angels-flight',
      type: 'gold',
      num: '📸',
      title: 'Angels Flight Railway',
      time: '~11:00',
      desc: 'Самая короткая железная дорога в мире — оранжевый вагончик на крутом подъёме.',
      why: 'Ностальгический кадр старого Лос-Анджелеса за $1.',
      tip: 'Bunker Hill, рядом с Grand Central Market (ланч).',
      photoTip: 'Снизу вверх — оранжевый вагон на фоне небоскрёбов DTLA.',
      price: '$1',
      pos: { lat: 34.0513, lng: -118.2505 },
    },
  ],

  'day15.ts': [
    {
      id: 'kalahaku-overlook',
      type: 'nature',
      num: '📸',
      title: 'Kalahaku Overlook',
      time: '~07:00',
      desc: 'Смотровая на спуске с Haleakala — вид на кратер лучше, чем с вершины.',
      why: 'После основной sunrise-съёмки, по пути вниз. Здесь видны серебристые мечи (silversword).',
      tip: 'Не проезжайте мимо! Все стоят на вершине, а лучший вид здесь.',
      photoTip: 'Кратер + серебристые мечи на переднем плане, облака внизу.',
      price: 'вход в парк $30',
      pos: { lat: 20.7458, lng: -156.2230 },
    },
    {
      id: 'keanae-peninsula',
      type: 'nature',
      num: '📸',
      title: "Ke'anae Peninsula",
      time: '~12:00',
      desc: 'Лавовый полуостров — чёрная лава, белые волны, зелёные поля таро и церковь.',
      why: 'Самый драматичный берег на Road to Hana. Многослойная композиция в одном месте.',
      tip: 'Съезд с Hana Highway на миле 16.5. Деревенский магазин внизу с банановым хлебом.',
      photoTip: 'С верхней смотровой — геометрия полуострова и лоскутные поля таро.',
      price: 'бесплатно',
      pos: { lat: 20.8613, lng: -156.1467 },
    },
  ],

  'day16.ts': [
    {
      id: 'dragons-teeth',
      type: 'nature',
      num: '📸',
      title: "Dragon's Teeth",
      time: '~08:00',
      desc: 'Лавовые зубцы, выточенные океаном — выглядят как зубы дракона.',
      why: '10 минут от Kaanapali. Фантастический фэнтезийный пейзаж, мало туристов.',
      tip: 'Makaluapuna Point рядом с Ritz-Carlton. Лёгкий хайк 15 мин.',
      photoTip: 'Закатное небо за зубцами — фэнтезийный кадр.',
      price: 'бесплатно',
      pos: { lat: 20.9981, lng: -156.6252 },
    },
  ],

  'day18.ts': [
    {
      id: 'mulholland-overlook',
      type: 'gold',
      num: '📸',
      title: 'Mulholland Drive Overlook',
      time: '~20:30',
      desc: 'Панорама ночного Лос-Анджелеса с холмов — огни города до горизонта.',
      why: '5 минут от Universal Studios. Идеальное завершение дня — весь LA у ног.',
      tip: 'Штатив для ночной панорамы. По пути от Universal к отелю/аэропорту.',
      photoTip: 'Штатив, панорама огней LA в синий час.',
      price: 'бесплатно',
      pos: { lat: 34.1283, lng: -118.3268 },
    },
  ],

  'day19.ts': [
    {
      id: 'innout-lax-spotting',
      type: 'food',
      num: '📸',
      title: 'In-N-Out Burger (LAX Spotting)',
      time: '~21:00',
      desc: 'Легендарная точка — бургер под самолётами, садящимися в 30 метрах над головой.',
      why: 'Лучший финальный кадр поездки. Самолёты каждые 90 секунд.',
      tip: 'Sepulveda Blvd у LAX. Патио с видом на полосу. Берите Double-Double.',
      photoTip: 'Серийная съёмка — поймайте самолёт прямо над бургером в руке.',
      price: '$10-15',
      pos: { lat: 33.9729, lng: -118.3928 },
    },
  ],
};

// Process each day file
for (const [filename, stops] of Object.entries(NEW_STOPS)) {
  const filepath = `src/data/days/${filename}`;
  let content = readFileSync(filepath, 'utf8');

  for (const stop of stops) {
    // Build stop string
    const stopStr = `    {
      id: '${stop.id}',
      type: '${stop.type}',
      num: '${stop.num}',
      title: '${stop.title}',
      time: '${stop.time}',
      desc: '${stop.desc}',
      why: '${stop.why}',
      tip: '${stop.tip}',
      photoTip: '${stop.photoTip}',
      image: '${findNearestImage(stop, filename)}',
      price: '${stop.price}',
      pos: { lat: ${stop.pos.lat}, lng: ${stop.pos.lng} },
    }`;

    // Find the last stop in the stops array (before the closing ])
    const stopsEndPattern = /(\s*\],\s*routes:)/;
    const match = content.match(stopsEndPattern);
    if (match) {
      const insertPos = content.indexOf(match[0]);
      content = content.slice(0, insertPos) + ',\n' + stopStr + '\n  ' + content.slice(insertPos);
      console.log(`${filename}: added ${stop.id}`);
    } else {
      console.error(`${filename}: could not find insertion point for ${stop.id}`);
    }
  }

  writeFileSync(filepath, content);
}

// Helper: find a relevant existing image or use a placeholder
function findNearestImage(stop, filename) {
  // Map stop ids to existing images where possible
  const imageMap = {
    'staple-street-skybridge': 'soho-nyc.webp',
    'oculus-interior': 'wall-street.webp',
    'cortlandt-alley': 'lower-east-side.webp',
    'bethesda-terrace': 'central-park.webp',
    'gapstow-bridge': 'central-park.webp',
    'canyon-junction-bridge': 'zion-entrance.webp',
    'court-patriarchs': 'zion-overlook.webp',
    'parus-trail': 'zion-entrance.webp',
    'agathla-peak': 'navajo-highway.webp',
    'artists-point': 'monument-valley.webp',
    'john-fords-point': 'monument-valley-tour.webp',
    'wahweap-overlook': 'horseshoe-bend.webp',
    'desert-view-tower': 'desert-view.webp',
    'yaki-point': 'grand-canyon-sunrise.webp',
    'hackberry-general': 'seligman-route66.webp',
    'point-dume': 'el-matador-beach.webp',
    'el-matador-caves': 'el-matador-beach.webp',
    'disney-concert-hall': 'la-skyline.webp',
    'last-bookstore': 'silver-lake.webp',
    'angels-flight': 'la-skyline.webp',
    'kalahaku-overlook': 'haleakala-clouds.webp',
    'keanae-peninsula': 'hana-highway-start.webp',
    'dragons-teeth': 'kaanapali-beach.webp',
    'mulholland-overlook': 'la-hotel-night.webp',
    'innout-lax-spotting': 'in-n-out.webp',
  };
  return imageMap[stop.id] || 'test-debug.webp';
}

console.log('Done!');
