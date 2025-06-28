// Service Worker for Cube Syndicate PWA
const CACHE_NAME = 'cube-syndicate-v1.0.0';
const urlsToCache = [
  '/',
  '/src/pages/index.html',
  '/src/pages/game.html',
  '/assets/css/styles.css',
  '/assets/css/game.css',
  '/assets/js/script.js',
  '/assets/js/game.js',
  '/assets/js/firebase-config.js',
  '/assets/audio/music.mp3',
  '/assets/audio/laserbraam.mp3',
  '/assets/audio/itemcollect.mp3',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  '/src/config/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 