<?php

return [
    /*
    |--------------------------------------------------------------------------
    | SEO Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains SEO-related configuration settings for the application.
    |
    */

    'default_meta' => [
        'title' => 'Portfolio - Full Stack Developer',
        'description' => 'Professional portfolio showcasing web development projects, skills, and experience in modern technologies.',
        'keywords' => 'portfolio, web developer, full stack, laravel, react, typescript, php, javascript',
        'author' => 'Anggara Saputra',
        'robots' => 'index, follow',
    ],

    'social_links' => [
        'github' => 'https://github.com/anggarasa',
        'linkedin' => 'https://www.linkedin.com/in/anggara-saputra-7baa95318',
        'instagram' => 'https://www.instagram.com/angr_sa/#',
    ],

    'structured_data' => [
        'organization' => [
            '@type' => 'Organization',
            'name' => 'Anggara Saputra Portfolio',
            'url' => env('APP_URL'),
            'logo' => env('APP_URL') . '/assets/icons/ic_logo_favicon.png',
            'sameAs' => [
                'https://github.com/anggarasa',
                'https://www.linkedin.com/in/anggara-saputra-7baa95318',
                'https://www.instagram.com/angr_sa/#',
            ],
        ],
        'person' => [
            '@type' => 'Person',
            'name' => 'Anggara Saputra',
            'jobTitle' => 'Full Stack Developer',
            'url' => env('APP_URL'),
            'sameAs' => [
                'https://github.com/anggarasa',
                'https://www.linkedin.com/in/anggara-saputra-7baa95318',
                'https://www.instagram.com/angr_sa/#',
            ],
            'knowsAbout' => [
                'Web Development',
                'Laravel',
                'React',
                'TypeScript',
                'PHP',
                'JavaScript',
                'Full Stack Development',
            ],
        ],
    ],

    'performance' => [
        'enable_gzip' => true,
        'enable_browser_caching' => true,
        'minify_html' => env('APP_ENV') === 'production',
        'lazy_load_images' => true,
    ],

    'analytics' => [
        'google_analytics' => [
            'enabled' => env('GOOGLE_ANALYTICS_ENABLED', false),
            'ga4_id' => env('GOOGLE_ANALYTICS_GA4_ID'),
            'gtag_id' => env('GOOGLE_TAG_MANAGER_ID'),
        ],
        'google_search_console' => [
            'enabled' => env('GOOGLE_SEARCH_CONSOLE_ENABLED', false),
            'verification_code' => env('GOOGLE_SEARCH_CONSOLE_VERIFICATION'),
        ],
    ],
];
