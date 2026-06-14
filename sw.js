const CACHE_NAME = 'bailexpert-free-v1';
const ASSETS = [
  '/BailExpert-Free/',
  '/BailExpert-Free/index.html',
  '/BailExpert-Free/manifest.json',
  '/BailExpert-Free/icon-192.png',
  '/BailExpert-Free/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/BailExpert-Free/')))
  );
});
