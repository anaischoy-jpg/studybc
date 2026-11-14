const CACHE_NAME = 'studybc-shell-v7';
const APP_SHELL = [
  './',
  './index.html',
  './in.html',
  './style.css',
  './studybc-data.js',
  './studybc-extra-data.js',
  './studybc-curriculum-map.js',
  './studybc-source/data-g10.js',
  './studybc-source/data-g11.js',
  './studybc-source/data-g12.js',
  './studybc-source/data-ap.js',
  './studybc-source/adapter.js',
  './studybc-fm10-lessons.js',
  './studybc-accounting-lessons.js',
  './studybc-business-lessons.js',
  './studybc-chemistry-lessons.js',
  './studybc-generated-lessons.js',
  './studybc-app.js',
  './studybc-manifest.json',
  './studybc-icon-192.png',
  './studybc-icon-512.png',
  './studybc-apple-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(name => name.startsWith('studybc-shell-') && name !== CACHE_NAME).map(name => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then(response => response || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(caches.match(request).then(response => response || fetch(request)));
});
