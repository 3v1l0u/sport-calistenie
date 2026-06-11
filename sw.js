/* Service worker — Sport PWA
   Stratégie : réseau d'abord (pour avoir les mises à jour quand tu es en ligne),
   repli sur le cache quand hors-ligne. */
var CACHE = 'sport-v11';
var ASSETS = [
  './',
  'accueil.html',
  'index.html',
  'barre.html',
  'manifest.json',
  'icon-180.png',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); })
      .then(function() { return self.skipWaiting(); })
      .catch(function() {})
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(res) {
      var copy = res.clone();
      caches.open(CACHE).then(function(c) { c.put(e.request, copy); }).catch(function(){});
      return res;
    }).catch(function() {
      return caches.match(e.request).then(function(r) {
        return r || caches.match('accueil.html');
      });
    })
  );
});
