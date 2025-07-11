// Service Worker for Cube Syndicate PWA
const CACHE_NAME = 'cube-syndicate-v1.0.3';
const urlsToCache = [
  '/',
  '/game',
  '/manifest.json',
  '/favicon.ico',
  '/assets/icons/icon-128.png',
  '/assets/icons/icon-144.png',
  '/assets/icons/icon-152.png',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-384.png',
  '/assets/icons/icon-512.png',
  '/assets/icons/icon-72.png',
  '/assets/icons/icon-96.png',
  '/assets/audio/music.mp3',
  '/assets/audio/laserbraam.mp3',
  '/assets/audio/itemcollect.mp3'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Only cache files that exist, ignore 404s gracefully
        return Promise.allSettled(
          urlsToCache.map(url => 
            fetch(url)
              .then(response => {
                if (response.ok) {
                  return cache.add(url);
                } else {
                  console.log('Skipping cache for non-existent resource:', url);
                  return null;
                }
              })
              .catch(err => {
                console.log('Failed to cache:', url, err.message);
                return null;
              })
          )
        );
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip Next.js internal requests and API routes
  if (event.request.url.includes('_next/') || 
      event.request.url.includes('localhost:3000/_next/') ||
      event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // If both cache and network fail, return a fallback
        return new Response('Offline content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain',
          }),
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('Checking cache:', cacheName);
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 