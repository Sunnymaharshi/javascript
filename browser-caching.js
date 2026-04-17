/*
    Caching at different places for user request 
        Browser memory cache 
            fastest
        Service Worker cache 
            programmable, offline-capable
        HTTP Disk Cache 
            controlled by headers 
        CDN/Edge Cache 
            close to user geographically 
        Server 
            cache inside the website server 

    1. HTTP Caching
        Cache-Control Headers
        ex: Cache-Control: max-age=31536000, immutable
        max-age=N
            Cache for N seconds
        immutable
            Content will never change 
            skip revalidation
            ex: /app.a3f9c2.js - file content never changes at this URL 
        no-cache
            Cache it, but always revalidate before using
            ex: /index.html - html file is never cached, so new hashes are always discovered
        no-store
            Never cache (sensitive data)
        stale-while-revalidate=N
            Serve stale immediately, revalidate in background
        private
            Only browser cache, not CDN
        public
            CDN can cache this
    
    2. Service Worker Caching Strategies
        Service Workers sit between the browser and network
        Cache First
            Return cache if not found, fallback to network
            ex: self.addEventListener('fetch', event => {
                    event.respondWith(
                        caches.match(event.request).then(cached => 
                            cached ?? fetch(event.request)
                        )
                    );
                });
            Use for 
                Static assets, fonts etc 
            Avoid for
                API data, anything that must be fresh
        Network First 
            fetch network if offline fallback to cache 
            ex: self.addEventListener('fetch', event => {
                    event.respondWith(
                        fetch(event.request)
                        .then(response => {
                            const clone = response.clone();
                            caches.open('v1').then(cache => cache.put(event.request, clone));
                            return response;
                        })
                        .catch(() => caches.match(event.request))
                    );
                });
            Use for
                API calls where freshness matters but offline fallback is needed
            Avoid for
                Performance-critical assets
        Stale While Revalidate
            serve stale instantly, update in background
            ex: cache.match(event.request).then(cached => {
                    const networkFetch = fetch(event.request).then(response => {
                    cache.put(event.request, response.clone());
                    return response;
                    });
                    return cached ?? networkFetch; // serve stale instantly, update in background
                })
            Use for
                Avatars, non-critical API data, content feeds — fast + eventually fresh
        Cache Only / Network Only
            Cache only
                for fully offline apps
                event.respondWith(caches.match(event.request));
            Network only
                bypass cache entirely (analytics, payments)
                event.respondWith(fetch(event.request));
    3. In-Memory / Application-Level Caching
        What your app holds in JS memory during its lifetime.
        Memoization
            useMemo, useCallback in react 
            programmable cache in js 
        Client-Side Data Caching
            React Query / SWR Pattern
    4. CDN Caching
        Assets cached at edge nodes geographically close to users
        Cache-Control: public, max-age=86400, s-maxage=31536000
        s-maxage 
            overrides max-age for shared caches (CDNs)
        Vary header 
            tells CDN to cache separate versions per header value
            Vary: Accept-Encoding
                separate cache for gzip vs br
            Vary: Accept-Language
                separate cache per language
    Strategies for invalidation
        TTL expiry
            Just let it expire (max-age)
        Content hashing
            New content = new URL
        Versioned URLs
            /api/v2/users
        Cache tags / surrogate keys
            Tag assets, purge by tag on deploy
            ETag (Entity Tag)
                hash of a response's content, set by the server. 
                browser ask "has this changed?" instead of "give me this again."
                ex: ETag: "a3f9c2b1d4e8"
                    Cache-Control: no-cache - always revalidate, but cache locally
                if valid, 304 Not Modified - no body sent, use your cached version
                
        Event-driven invalidation
            Server pushes invalidation signal (websocket, SSE - server side events)

*/
