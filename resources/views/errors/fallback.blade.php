<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Error' }} - Portfolio</title>
    <meta name="description" content="{{ $description ?? 'An error occurred on this page.' }}">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" href="/favicon.ico">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    <!-- Meta tags for SEO -->
    <meta name="robots" content="noindex, nofollow">

    <style>
        body {
            font-family: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
        }
    </style>
</head>
<body class="h-full bg-background text-foreground">
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-2xl mx-auto">
            <div class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm text-center">
                <div class="px-6 pb-6">
                    <div class="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-muted/20">
                        @if(isset($status))
                            @if($status == 404)
                                <svg class="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            @elseif($status == 500)
                                <svg class="w-12 h-12 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"></path>
                                </svg>
                            @else
                                <svg class="w-12 h-12 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                            @endif
                        @endif
                    </div>

                    <div class="space-y-2">
                        @if(isset($status))
                            <h1 class="text-4xl font-bold text-foreground">{{ $status }}</h1>
                        @endif
                        <h2 class="text-2xl font-semibold text-foreground">{{ $title ?? 'An Error Occurred' }}</h2>
                    </div>

                    <p class="text-lg text-muted-foreground max-w-md mx-auto mt-4">
                        {{ $description ?? 'Sorry, an unexpected error has occurred. Please try again or contact the administrator if the problem persists.' }}
                    </p>
                </div>

                <div class="px-6 space-y-6">
                    <!-- Suggestions -->
                    <div class="text-left">
                        <h3 class="text-sm font-medium text-foreground mb-3">Suggestions:</h3>
                        <ul class="space-y-2 text-sm text-muted-foreground">
                            @if(isset($status) && $status == 404)
                                <li class="flex items-start gap-2">
                                    <span class="text-primary mt-0.5">•</span>
                                    <span>Please check the URL you typed</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary mt-0.5">•</span>
                                    <span>Use the navigation menu to find the page you are looking for</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary mt-0.5">•</span>
                                    <span>Try using the search feature</span>
                                </li>
                            @else
                                <li class="flex items-start gap-2">
                                    <span class="text-primary mt-0.5">•</span>
                                    <span>Try refreshing this page</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary mt-0.5">•</span>
                                    <span>If the problem persists, please contact the administrator</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary mt-0.5">•</span>
                                    <span>Check your internet connection</span>
                                </li>
                            @endif
                        </ul>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="/" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            Back to Home
                        </a>

                        <button onclick="history.back()" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Go Back
                        </button>

                        @if(isset($status) && $status != 404)
                            <button onclick="window.location.reload()" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-4 py-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                                Try Again
                            </button>
                        @endif
                    </div>

                    <!-- Additional Help -->
                    <div class="pt-4 border-t border-border">
                        <p class="text-xs text-muted-foreground">
                            If the problem persists, please
                            <a href="/contact" class="text-primary hover:underline">contact us</a>
                            for assistance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
