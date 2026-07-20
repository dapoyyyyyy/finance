// Service worker — caches app shell; never intercepts Google/API calls; fails silently offline.
const CACHE = 'financial-os-v6';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = req.url;
  // Only handle same-origin GET. Let Google / Anthropic / CDN calls pass straight through (never intercept).
  if (req.method !== 'GET' || url.includes('googleapis.com') || url.includes('google.com') ||
      url.includes('gstatic.com') || url.includes('anthropic.com') || url.includes('cdnjs') ||
      url.includes('fonts.g')) {
    return; // do not call respondWith -> browser handles normally, no SW error
  }
  e.respondWith(
    caches.match(req).then(r => r || fetch(req).catch(() => caches.match('./index.html')))
  );
});
