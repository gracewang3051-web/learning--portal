// 学习门户 Service Worker v3 — 透明代理版
// 1. install: skipWaiting 立即激活
// 2. activate: 删除所有 cache（含 v1, v2 残留），接管所有页面
// 3. fetch: 始终走网络，不缓存任何内容 → 用户永远看到服务器最新版本

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // 清空所有 SW 创建过的 cache（包括老 v1, v2）
      caches.keys().then((keys) =>
        Promise.all(keys.map((k) => caches.delete(k)))
      ),
    ]).then(() => self.clients.claim())
  );
});

// fetch: 始终走网络，浏览器拿服务器最新版本
// （不再缓存任何资源 — 暂时牺牲 offline 支持，换取部署即时生效）
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request));
});
