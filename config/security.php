<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Security Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains security-related configuration options for the
    | application. These settings help protect against various security
    | threats and vulnerabilities.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | File Upload Security
    |--------------------------------------------------------------------------
    |
    | Configuration for secure file uploads including allowed file types,
    | maximum file sizes, and virus scanning settings.
    |
    */

    'file_upload' => [
        'max_size' => env('MAX_FILE_SIZE', 2048), // KB
        'allowed_types' => explode(',', env('ALLOWED_FILE_TYPES', 'jpeg,png,jpg,gif,svg,webp')),
        'enable_scanning' => env('ENABLE_FILE_SCANNING', true),
        'quarantine_threats' => env('QUARANTINE_THREATS', true),
        'scan_timeout' => env('FILE_SCAN_TIMEOUT', 30), // seconds
    ],

    /*
    |--------------------------------------------------------------------------
    | Content Security Policy
    |--------------------------------------------------------------------------
    |
    | Configuration for Content Security Policy headers to prevent XSS
    | attacks and other code injection vulnerabilities.
    |
    */

    'csp' => [
        'enabled' => env('CSP_ENABLED', true),
        'report_uri' => env('CSP_REPORT_URI'),
        'enforce_mode' => env('CSP_ENFORCE_MODE', true),
        'directives' => [
            'default-src' => ["'self'"],
            'script-src' => ["'self'", "'unsafe-inline'", "'wasm-unsafe-eval'", 'https://www.googletagmanager.com', 'https://www.google-analytics.com'],
            'style-src' => ["'self'", "'unsafe-inline'", 'https://fonts.bunny.net'],
            'font-src' => ["'self'", 'https://fonts.bunny.net'],
            'img-src' => ["'self'", 'data:', 'https:', 'blob:'],
            'media-src' => ["'self'", 'blob:'],
            'connect-src' => ["'self'", 'https://www.google-analytics.com', 'https://www.googletagmanager.com', 'blob:'],
            'frame-src' => ["'none'"],
            'object-src' => ["'none'"],
            'base-uri' => ["'self'"],
            'form-action' => ["'self'"],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Rate Limiting
    |--------------------------------------------------------------------------
    |
    | Configuration for rate limiting to prevent brute force attacks and
    | abuse of the application.
    |
    */

    'rate_limiting' => [
        'login_attempts' => env('RATE_LIMIT_LOGIN', 5),
        'login_decay_minutes' => env('RATE_LIMIT_LOGIN_DECAY', 1),
        'two_factor_attempts' => env('RATE_LIMIT_TWO_FACTOR', 5),
        'two_factor_decay_minutes' => env('RATE_LIMIT_TWO_FACTOR_DECAY', 1),
        'api_requests' => env('RATE_LIMIT_API', 60),
        'api_decay_minutes' => env('RATE_LIMIT_API_DECAY', 1),
    ],

    /*
    |--------------------------------------------------------------------------
    | Security Headers
    |--------------------------------------------------------------------------
    |
    | Configuration for security headers that help protect against various
    | attacks and vulnerabilities.
    |
    */

    'headers' => [
        'x_frame_options' => env('X_FRAME_OPTIONS', 'SAMEORIGIN'),
        'x_content_type_options' => env('X_CONTENT_TYPE_OPTIONS', 'nosniff'),
        'x_xss_protection' => env('X_XSS_PROTECTION', '1; mode=block'),
        'referrer_policy' => env('REFERRER_POLICY', 'strict-origin-when-cross-origin'),
        'strict_transport_security' => env('STRICT_TRANSPORT_SECURITY', 'max-age=31536000; includeSubDomains; preload'),
        'permissions_policy' => env('PERMISSIONS_POLICY', 'accelerometer=(), camera=(), microphone=(), geolocation=(), gyroscope=(), payment=()'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Session Security
    |--------------------------------------------------------------------------
    |
    | Configuration for secure session handling.
    |
    */

    'session' => [
        'secure_cookies' => env('SESSION_SECURE_COOKIE', true),
        'http_only' => env('SESSION_HTTP_ONLY', true),
        'same_site' => env('SESSION_SAME_SITE', 'strict'),
        'regenerate_on_login' => env('SESSION_REGENERATE_LOGIN', true),
        'regenerate_on_logout' => env('SESSION_REGENERATE_LOGOUT', true),
        'timeout' => env('SESSION_TIMEOUT', 120), // minutes
    ],

    /*
    |--------------------------------------------------------------------------
    | Security Monitoring
    |--------------------------------------------------------------------------
    |
    | Configuration for security event monitoring and logging.
    |
    */

    'monitoring' => [
        'enabled' => env('SECURITY_MONITORING_ENABLED', true),
        'log_level' => env('SECURITY_LOG_LEVEL', 'warning'),
        'retention_days' => env('SECURITY_LOG_RETENTION', 30),
        'alert_threshold' => env('SECURITY_ALERT_THRESHOLD', 10), // events per hour
        'block_suspicious_ips' => env('BLOCK_SUSPICIOUS_IPS', false),
    ],

    /*
    |--------------------------------------------------------------------------
    | Input Validation
    |--------------------------------------------------------------------------
    |
    | Configuration for input validation and sanitization.
    |
    */

    'validation' => [
        'max_string_length' => env('MAX_STRING_LENGTH', 1000),
        'max_array_items' => env('MAX_ARRAY_ITEMS', 100),
        'sanitize_html' => env('SANITIZE_HTML', true),
        'strip_tags' => env('STRIP_TAGS', true),
        'allowed_html_tags' => explode(',', env('ALLOWED_HTML_TAGS', 'p,br,strong,em,b,i,u,ul,ol,li,h1,h2,h3,h4,h5,h6,a,img,blockquote,code,pre')),
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Security
    |--------------------------------------------------------------------------
    |
    | Configuration for password security requirements.
    |
    */

    'password' => [
        'min_length' => env('PASSWORD_MIN_LENGTH', 8),
        'require_uppercase' => env('PASSWORD_REQUIRE_UPPERCASE', true),
        'require_lowercase' => env('PASSWORD_REQUIRE_LOWERCASE', true),
        'require_numbers' => env('PASSWORD_REQUIRE_NUMBERS', true),
        'require_symbols' => env('PASSWORD_REQUIRE_SYMBOLS', false),
        'max_age_days' => env('PASSWORD_MAX_AGE_DAYS', 90),
    ],

    /*
    |--------------------------------------------------------------------------
    | Two-Factor Authentication
    |--------------------------------------------------------------------------
    |
    | Configuration for two-factor authentication security.
    |
    */

    'two_factor' => [
        'enabled' => env('TWO_FACTOR_ENABLED', true),
        'issuer' => env('TWO_FACTOR_ISSUER', env('APP_NAME', 'My Portfolio')),
        'window' => env('TWO_FACTOR_WINDOW', 0),
        'recovery_codes_count' => env('TWO_FACTOR_RECOVERY_CODES', 8),
    ],

];
