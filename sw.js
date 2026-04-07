// SGA Service Worker v4 – relative paths, cache-first
const V = 'sga-v4';
const CORE = ['./index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE).catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Network first, fall back to cache, fall back to index.html
  e.respondWith(
    fetch(e.request)
      .then(r => { if (r.ok) caches.open(V).then(c => c.put(e.request, r.clone())); return r; })
      .catch(() => caches.match(e.request).then(c => c || caches.match('./index.html')))
  );
});
