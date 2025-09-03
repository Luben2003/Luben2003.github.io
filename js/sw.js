// ================== SERVICE WORKER PARA PWA ==================
const CACHE_NAME = 'document-organizer-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/components/header.css',
    '/css/components/card.css',
    '/css/components/chat.css',
    '/css/components/upload.css',
    '/css/components/schedule.css',
    '/css/components/modal.css',
    '/js/main.js',
    '/js/utils.js',
    '/js/storage.js',
    '/js/chat.js',
    '/js/ocr.js',
    '/js/schedule.js',
    '/js/stateManager.js',
    '/js/pluginSystem.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalación
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devuelve la respuesta en cache o haz la petición
                return response || fetch(event.request);
            })
    );
});