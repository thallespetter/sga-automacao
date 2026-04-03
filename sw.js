// SGA Service Worker v3 – subpath + cache bust
const CACHE = 'sga-v3';
const BASE  = '/sga-automacao';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll([
      BASE + '/',
      BASE + '/index.html',
      BASE + '/manifest.json',
      BASE + '/icons/icon-192.png',
      BASE + '/icons/icon-512.png'
    ]))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (!url.pathname.startsWith(BASE) && url.hostname === self.location.hostname) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.ok) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      })
      .catch(() => caches.match(e.request)
        .then(cached => cached || caches.match(BASE + '/index.html'))
      )
  );
});
