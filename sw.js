// Fretlab offline support: prefer current pages online and retain the app shell for offline use.
const CACHE = 'fretlab-v32';
const SHELL = ['./', './index.html', './audio-check.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (req.mode === 'navigate') {
      e.respondWith(caches.open(CACHE).then(async c => {
        const key = new URL(url.pathname.endsWith('/') ? 'index.html' : url.pathname, url).href;
        try {
          const response = await fetch(req, { cache: 'no-cache' });
          if (response.ok) await c.put(key, response.clone());
          return response;
        } catch (err) { return await c.match(key) || await c.match(req, { ignoreSearch: true }) || Response.error(); }
      }));
      return;
    }
    // stale-while-revalidate for the app itself
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req, { ignoreSearch: true });
      const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    // fonts: cache first
    e.respondWith(caches.open(CACHE).then(async c => (await c.match(req)) || fetch(req).then(r => { c.put(req, r.clone()); return r; })));
  }
});

