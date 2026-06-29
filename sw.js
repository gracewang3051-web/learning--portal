// 学习门户 Service Worker
// 缓存首页 + 静态资源，支持离线访问（音频不缓存，太大）

const CACHE_NAME = 'learning-portal-v2';  // v1→v2: 强制清理旧缓存，让用户拿到新版
const PRECACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
];

// 安装：预缓存关键资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// 激活：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// fetch: 缓存优先策略（不缓存 onrender.com 外部资源）
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 只缓存同源请求
  if (url.origin !== self.location.origin) return;

  // 不缓存大文件（音频/视频）
  if (event.request.destination === 'audio' || event.request.destination === 'video') {
    return;  // 走网络
  }

  // 网络优先：先尝试网络，失败才用缓存（确保 PWA 也能拿到新版本）
  event.respondWith(
    fetch(event.request).then((response) => {
      // 缓存成功的 GET 响应
      if (response.ok && event.request.method === 'GET') {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
      }
      return response;
    }).catch(() => {
      // 离线 fallback
      return caches.match(event.request).then((cached) => {
        if (cached) return cached;
        if (event.request.destination === 'document') return caches.match('/');
      });
    })
  );
});