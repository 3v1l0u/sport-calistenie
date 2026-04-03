var CACHE_NAME = 'cali-v2';
var ASSETS = [
  './programme_calistenie.html',
  './manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      var toDelete = [];
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== CACHE_NAME) toDelete.push(caches.delete(keys[i]));
      }
      return Promise.all(toDelete);
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request);
    })
  );
});
