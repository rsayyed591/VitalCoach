self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
      caches.open('vitalcoach-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/vite.svg',
          '/logo_128.png.png',
          '/129.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  