var CACHE_NAME = "mob-anw-site-cashe-v6";
var urlsToCache = [
  "/",
  "/index.html",
  "/auvi.html",
  "/geo.html",
  "/natbe.html",
  "/opsys.html",
  "/table.html",
  "/css/style.css",
  "/css/style2.css",
  "/js/app.js",
  "/js/auvi.js",
  "/js/geo.js",
  "/js/natbe.js",
  "/js/opsys.js"
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {

  var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
