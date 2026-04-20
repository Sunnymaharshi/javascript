/* 
    Search Engine Optimization (SEO)
        it's about rendering architecture, performance
        how search engines discover and evaluate your content.
        How Search Engines Work
            Crawling → Indexing → Ranking → Serving
            Crawling
                Googlebot discovers URLs via sitemaps, links, and previously known URLs.
                crawl budget — a limit on how many pages it'll crawl per site per day. 
                Wasting it on duplicate/low-value pages hurts large sites.
            Indexing
                crawler renders the page (executes JS), extracts content, and stores it. 
                This is where frontend architecture matters enormously.
            Ranking
                Google's algorithm evaluates 200+ signals — relevance, authority, page experience, etc.
            Google renders pages in a two-wave system:
                Wave 1: HTML is parsed immediately
                Wave 2: JavaScript is executed — but this can be days to weeks later
            Content only in Wave 2 (client-rendered) may not be indexed quickly. 
            This is why rendering strategy is a core SEO concern.
        Rendering Strategies & SEO Impact
            SSR (Server-Side Rendering)
                HTML fully rendered on server per request
                Googlebot gets complete content immediately
                Wave 1 indexable
                Best SEO, higher server cost
            SSG (Static Site Generation)
                HTML pre-rendered at build time
                Served as static files — fastest possible TTFB
                Wave 1 indexable
                Best for content that doesn't change per-user
            ISR (Incremental Static Regeneration)
                SSG but pages revalidated on schedule
                Combines SSG speed with freshness
                Next.js specific — best of both worlds
            CSR (Client-Side Rendering)
                Server sends empty HTML shell
                JS fetches and renders content
                Wave 2 only — indexing delayed or missed
                Worst for SEO — avoid for public content
            Hydration (SSR + CSR)
                Server renders full HTML (Wave 1 indexable)
                JS hydrates for interactivity
                Best of both — standard Next.js/Nuxt approach
        Technical SEO Fundamentals
            Meta Tags
                <title>: page title, critical for SEO
                <meta name="description">: summary for search results
            Open Graph & Twitter Cards: improve social sharing
                Open Graph 
                    protocol created by Facebook that controls 
                    how your page appears when shared on social platforms like Whatspp
                    used to build link preview cards
                    ex: <meta property="og:title" content="My Awesome Page">
                        <meta property="og:description" content=""/>
                        <meta property="og:image" content="https://site.com/preview.jpg">
                        <meta property="og:url" content="https://site.com/page">
                Twitter Cards
                    Twitter never adopted Open Graph fully, it has its own twitter: meta tags
            Robots 
                tells crawlers which parts of your site they can and cannot fetch.
                robots.txt
                    plain text file at the root of your domain
                meta robots tag
                    <meta name="robots" content="noindex, nofollow">
                        tells search engines not to index or follow links on the page
                    nofollow
                        tells crawlers not to crawl links on a page
                robots.txt vs robots meta tag
                    robots.txt 
                        scope is entire site or specific paths
                        controls crawling
                        if blocked, Page not fetched at all
                    robots meta tag
                        scope is individual page
                        controls Indexing (should it appear in results?)
                        if blocked, Page is fetched and rendered, but not indexed.
                    robots.txt controls crawling. robots meta tag controls indexing.
                    you can block crawling but still have a page indexed if it's linked from elsewhere.
                X-Robots-Tag
                    like the meta robots tag but set as an HTTP response header
                    useful for files that don't have a <head> 
            Canonical URLs
                Prevents duplicate content penalty
                tells Google which URL is the authoritative version.
                ex: https://site.com/product?color=red should have this 
                    <link rel="canonical" href="https://site.com/product">
            Structured Data (Schema.org)
                JSON-LD format to provide rich metadata about your content
                helps search engines understand context
                Enables rich results — star ratings, FAQs, breadcrumbs in SERPs (SE result page)
            Sitemaps
                XML file listing all important URLs on your site
                helps search engines discover content faster
        Core Web Vitals (Page Experience Signals)
            LCP — Largest Contentful Paint (target: < 2.5s)
                Time until the largest visible element is rendered
            CLS — Cumulative Layout Shift (target: < 0.1)
                Measures unexpected layout shifts — elements jumping around as page loads.
            INP — Interaction to Next Paint (target: < 200ms)
                Replaced FID (First Input Delay) in 2024
                Measures responsiveness of all interactions 
                throughout the page lifetime, not just the first.
        URL Structure & Architecture
            Clean, descriptive URLs are better for SEO and user experience.
            Use hyphens to separate words (e.g., /best-laptops)
            Avoid query parameters for main content 
            ex: /product/123 instead of /product?id=123
            Ensure consistent URL structure across the site.
        Pagination
            Don't noindex paginated pages, let Googlebot crawl all
        Internationalization (i18n)
            <link rel="alternate" hreflang="en" href="https://site.com/en/guide">
            <link rel="alternate" hreflang="fr" href="https://site.com/fr/guide">
        Performance as SEO
            TTFB, resource loading order, and render-blocking resources 
            all directly affect Core Web Vitals and rankings.
            1. DNS prefetch for third-party origins
                <link rel="dns-prefetch" href="//fonts.googleapis.com">
            2. Preconnect for critical third parties (DNS + TCP + TLS)
                <link rel="preconnect" href="https://fonts.googleapis.com">
            3. Preload critical resources
                <link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
            4. Never block rendering with non-critical CSS
            5. Defer non-critical JS
*/
