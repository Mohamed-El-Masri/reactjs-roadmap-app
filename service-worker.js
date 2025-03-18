// React Learning Progress Tracker - Service Worker

const CACHE_NAME = 'react-learn-tracker-v1';

// هذه الموارد سيتم محاولة تخزينها مؤقتًا
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './css/dark-mode.css',
  './js/main.js',
  './js/progress.js',
  './js/settings.js',
  './js/certificates.js',
  './js/pomodoro.js',
  './js/goals.js',
  './js/sync.js',
  './js/data-integration.js',
  './js/welcome.js',
  './js/user-guide.js',
  './js/debug.js',
  './assets/images/react-logo.svg',
  './assets/images/react-bg-pattern.svg',
  './assets/sounds/alarm.mp3'
];

// موارد خارجية - سيتم التعامل معها بشكل منفصل
const externalResources = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap'
];

// تثبيت Service Worker وتخزين الموارد الثابتة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح التخزين المؤقت');
        
        // استراتيجية أكثر مرونة: نضيف الملفات واحدًا تلو الآخر بدلاً من استخدام addAll
        const cachePromises = urlsToCache.map(url => {
          // محاولة تخزين مؤقت لكل ملف فردي دون فشل العملية بالكامل إذا فشل واحد
          return cache.add(url).catch(error => {
            console.error(`فشل تخزين ${url}: ${error}`);
            // استمر في التنفيذ حتى لو فشل هذا الملف
            return Promise.resolve();
          });
        });
        
        return Promise.all(cachePromises);
      })
  );
  
  // التحكم فورًا في الصفحات بدلاً من الانتظار
  self.skipWaiting();
});

// تنشيط Service Worker عندما يتم تحميله
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // المطالبة بالتحكم في العملاء بمجرد التنشيط
      return self.clients.claim();
    })
  );
});

// استراتيجية الاستجابة للطلبات: محاولة الشبكة أولاً، ثم الرجوع إلى التخزين المؤقت
self.addEventListener('fetch', event => {
  // تجاهل طلبات chrome-extension وطلبات DevTools
  if (event.request.url.startsWith('chrome-extension://') || 
      event.request.url.includes('/devtools/')) {
    return;
  }
  
  // مع المصادر الخارجية، نكتفي بإعادة الطلب دون تخزين مؤقت إضافي
  if (externalResources.some(url => event.request.url.includes(url))) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(
    // محاولة إحضار الطلب من الشبكة
    fetch(event.request)
      .then(response => {
        // تخزين نسخة من الاستجابة في ذاكرة التخزين المؤقت إذا كانت الاستجابة صالحة
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // إذا فشل جلب المورد من الشبكة، حاول جلبه من التخزين المؤقت
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // إذا كان الطلب لصفحة HTML، نعرض صفحة بديلة للعمل دون اتصال
            if (event.request.headers.get('accept').includes('text/html')) {
              return new Response(
                `<!DOCTYPE html>
                <html dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>أنت غير متصل بالإنترنت - خارطة تعلم React</title>
                    <style>
                      body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                      h1 { color: #61dafb; }
                      p { margin: 20px 0; }
                      .btn { background-color: #61dafb; color: #282c34; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <h1>أنت غير متصل بالإنترنت</h1>
                    <p>تعذر الاتصال بالإنترنت. تحقق من اتصالك وحاول مجدداً.</p>
                    <p>البيانات المحلية لا تزال محفوظة وستتم مزامنتها عند عودة الاتصال.</p>
                    <a class="btn" href="/">إعادة المحاولة</a>
                </body>
                </html>`,
                {
                  headers: {
                    'Content-Type': 'text/html; charset=UTF-8'
                  }
                }
              );
            }
            
            // لأنواع أخرى من الطلبات، نعيد استجابة فارغة
            return new Response();
          });
      })
  );
});

// التعامل مع الرسائل من العملاء
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// إضافة خاصية التنشيط التلقائي للإصدارات الجديدة بعد تحديث Service Worker
self.addEventListener('message', event => {
  if (event.data.action === 'UPDATE_READY') {
    self.skipWaiting();
  }
});
