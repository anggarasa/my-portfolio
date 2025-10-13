<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

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
        {{-- Google Tag Manager (noscript) --}}
        @if(app(\App\Services\AnalyticsService::class)->isEnabled())
            {!! app(\App\Services\AnalyticsService::class)->renderGTMBody() !!}
        @endif

        @inertia

        <!-- Toast Container -->
        <div id="toast-container"></div>
    </body>
</html>
