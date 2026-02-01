const CACHE_NAME = "simpledevtools-v5";
const urlsToCache = [
  "/",
  "/index.html",
  "/tools.html",
  "/json-formatter.html",
  "/base64-encoder.html",
  "/image-background-remover.html",
  "/image-converter.html",
  "/json-csv-converter.html",
  "/markdown-html-converter.html",
  "/images-to-pdf.html",
  "/json-xml-converter.html",
  "/yaml-json-converter.html",
  "/text-case-converter.html",
  "/unit-converter.html",
  "/guides.html",
  "/guides/json-formatter-guide.html",
  "/dist/output.css",
  "/dist/js/lucide.min.js",
  "/layout.js",
  "/logo.png",
  "/favicon.ico",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    }),
  );
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  // Skip caching external requests (analytics, GTM, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Silently fail for external resources if offline
        return new Response("", {
          status: 503,
          statusText: "Service Unavailable",
        });
      }),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache new resources
          if (event.request.url.includes(self.location.origin)) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        })
        .catch((error) => {
          console.log("Fetch failed for:", event.request.url, error);
          // Return a fallback or just reject
          return new Response("Network error", {
            status: 408,
            statusText: "Request Timeout",
          });
        });
    }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  // Take control of all pages immediately
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        return self.clients.claim();
      }),
  );
});

self.options = {
  domain: "5gvci.com",
  zoneId: 10483307,
};
self.lary = "";
importScripts("https://5gvci.com/act/files/service-worker.min.js?r=sw");
