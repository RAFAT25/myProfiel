const CACHE_NAME = 'portfolio-v1';
const ASSETS = [
    '/myProfiel/',
    '/myProfiel/index.html',
    '/myProfiel/styles.css',
    '/myProfiel/script.js',
    '/myProfiel/manifest.json',
    '/myProfiel/images/icons/icon-72x72.png',
    '/myProfiel/images/icons/icon-96x96.png',
    '/myProfiel/images/icons/icon-128x128.png',
    '/myProfiel/images/icons/icon-144x144.png',
    '/myProfiel/images/icons/icon-152x152.png',
    '/myProfiel/images/icons/icon-192x192.png',
    '/myProfiel/images/icons/icon-384x384.png',
    '/myProfiel/images/icons/icon-512x512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    (response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Background Sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        event.waitUntil(
            // Implement background sync logic here
            Promise.resolve()
        );
    }
});

// Push Notification
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/myProfiel/images/icons/icon-192x192.png',
        badge: '/myProfiel/images/icons/icon-96x96.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'عرض التفاصيل'
            },
            {
                action: 'close',
                title: 'إغلاق'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('رأفت محمد - مطور برمجيات', options)
    );
});
