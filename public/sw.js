const CACHE = 'felix-v2';
const SHELL = [
  '/',
  '/manifest.webmanifest',
  '/felix-192.png',
  '/felix-512.png',
  '/felix-maskable.png',
  '/felix-touch.png',
  '/offline.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/offline.html')),
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copy));
        return res;
      })
      .catch(() => caches.match(request)),
  );
});

self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {
    title: 'Felix AI',
    body: 'Response ready!',
  };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/felix-192.png',
      badge: '/felix-192.png',
    }),
  );
});
