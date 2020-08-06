importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '3' },
        { url: '/manifest.json', revision: '3' },
        { url: '/index.html', revision: '3' },
        { url: '/nav.html', revision: '3' },
        { url: '/assets/images/icons192.png', revision: '3' },
        { url: '/assets/images/icons512.png', revision: '3' },
        { url: '/assets/src/pages/home.html', revision: '3' },
        { url: '/assets/src/pages/club.html', revision: '3' },
        { url: '/assets/src/pages/bookmark.html', revision: '3' },
        { url: '/assets/css/main.css', revision: '3' },
        { url: '/assets/css/materialize.min.css', revision: '3' },
        { url: '/assets/fonts/FrancoisOne-Regular.ttf', revision: '3' },
        { url: '/assets/fonts/GildaDisplay-Regular.ttf', revision: '3' },
        { url: '/assets/js/idb.js', revision: '3'},
        { url: '/assets/js/main.js', revision: '3' },
        { url: '/assets/js/materialize.min.js', revision: '3' },
        { url: '/assets/js/modules/api.js', revision: '3' },
        { url: '/assets/js/modules/nav.js', revision: '3' },
        { url: '/assets/js/modules/page.js', revision: '3' },
        { url: '/assets/js/modules/database.js', revision: '3' },
        { url: '/assets/js/modules/listener.js', revision: '3' },
        { url: '/assets/js/modules/register.js', revision: '3' }
        ]);

        workbox.routing.registerRoute(
            /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
            workbox.strategies.cacheFirst({
                cacheName: 'images-cache',
                plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                ]
            })
        );

        workbox.routing.registerRoute(
            new RegExp('https://api.football-data.org/v2/'),
            workbox.strategies.cacheFirst({
                cacheName: 'api-cache',
                cacheableResponse: {
                  statuses: [0, 200]
                }
              })
        );

        workbox.routing.registerRoute(
            new RegExp('/pages/'),
              workbox.strategies.staleWhileRevalidate({
                  cacheName: 'pages-cache'
              })
        );

        workbox.routing.registerRoute(
            new RegExp('/fonts/'),
              workbox.strategies.staleWhileRevalidate({
                  cacheName: 'fonts-cache'
              })
        );
        
        workbox.routing.registerRoute(
            /\.(?:js|css)$/,
            workbox.strategies.staleWhileRevalidate({
              cacheName: 'static-src-cache',
            })
        );

        workbox.routing.registerRoute(
            /.*(?:googleapis|gstatic)\.com/,
            workbox.strategies.staleWhileRevalidate({
              cacheName: 'googleapis-cache',
          })
        );

    
    }else{
        console.log(`Workbox gagal dimuat`);
    }


self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: './assets/images/icon192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Notification', options)
    );
});
