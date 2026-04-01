const CACHE_NAME = 'usa-plan-v5';

// Pre-cache critical shell on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        '/usa-plan/',
        '/usa-plan/fonts/dmsans-latin.woff2',
        '/usa-plan/fonts/dmsans-latin-ext.woff2',
        '/usa-plan/fonts/playfair-cyrillic.woff2',
        '/usa-plan/fonts/playfair-latin.woff2',
        '/usa-plan/images/hero.webp',
      ])
    )
  );
  self.skipWaiting();
});

// Clean old caches on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Cache-first for static assets, network-first for HTML
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and external requests
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  // Images, fonts, JS, CSS — cache-first (immutable after deploy)
  if (
    url.pathname.match(/\.(webp|jpg|png|woff2|js|css|json)$/) ||
    url.pathname.includes('/fonts/') ||
    url.pathname.includes('/images/') ||
    url.pathname.includes('/icons/')
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
      )
    );
    return;
  }

  // HTML pages — network-first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
