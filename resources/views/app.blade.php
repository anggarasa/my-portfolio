<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google-site-verification" content="3FcMQUs5E7ZJfJ1bPthnMgXHx1xB8FZFYD8_orcWpro" />

        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-38JVC9NS3D"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-38JVC9NS3D');
        </script>

        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TD8H3JCK');
        </script>
        <!-- End Google Tag Manager -->

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        {{-- SEO Meta Tags --}}
        @if(isset($seo))
            {!! app(\App\Services\SeoService::class)->renderMetaTags($seo['meta']) !!}

            {{-- Structured Data --}}
            @if(isset($seo['structured_data']))
                {!! app(\App\Services\SeoService::class)->renderStructuredData($seo['structured_data']) !!}
            @endif

            {{-- Website Structured Data --}}
            @if(isset($seo['website_structured_data']))
                {!! app(\App\Services\SeoService::class)->renderStructuredData($seo['website_structured_data']) !!}
            @endif
        @endif

        {{-- Google Analytics --}}
        @if(app(\App\Services\AnalyticsService::class)->isEnabled())
            {!! app(\App\Services\AnalyticsService::class)->renderGoogleAnalytics() !!}
        @endif

        <link rel="icon" href="/assets/icons/ic_logo_favicon.png" sizes="any">
        <link rel="icon" href="/assets/icons/ic_logo_favicon.png" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/assets/icons/ic_logo_favicon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TD8H3JCK"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->

        {{-- Google Tag Manager (noscript) --}}
        @if(app(\App\Services\AnalyticsService::class)->isEnabled())
            {!! app(\App\Services\AnalyticsService::class)->renderGTMBody() !!}
        @endif

        @inertia

        <!-- Toast Container -->
        <div id="toast-container"></div>
    </body>
</html>
