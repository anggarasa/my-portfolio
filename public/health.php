<?php

/**
 * Health Check Endpoint for Coolify
 *
 * This file provides a simple health check that doesn't require Laravel bootstrap.
 * It checks that PHP-FPM is working and optionally checks database connectivity.
 *
 * Access: GET /health.php
 * Returns: JSON response with HTTP 200 (healthy) or HTTP 503 (unhealthy)
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

$health = [
    'status' => 'healthy',
    'timestamp' => date('c'),
    'checks' => [
        'php' => true,
    ],
];

$httpStatus = 200;

// Check if PHP is running correctly
if (!function_exists('phpversion')) {
    $health['status'] = 'unhealthy';
    $health['checks']['php'] = false;
    $httpStatus = 503;
}

// Optional: Check database connectivity (only if .env exists and DB configured)
// Uncomment the following block if you want database health checks
/*
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $env = parse_ini_file($envFile);

    $dbHost = $env['DB_HOST'] ?? null;
    $dbPort = $env['DB_PORT'] ?? '3306';
    $dbName = $env['DB_DATABASE'] ?? null;
    $dbUser = $env['DB_USERNAME'] ?? null;
    $dbPass = $env['DB_PASSWORD'] ?? null;

    if ($dbHost && $dbName && $dbUser) {
        try {
            $dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName}";
            $pdo = new PDO($dsn, $dbUser, $dbPass, [
                PDO::ATTR_TIMEOUT => 5,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            ]);
            $health['checks']['database'] = true;
        } catch (PDOException $e) {
            $health['checks']['database'] = false;
            $health['status'] = 'degraded';
        }
    }
}
*/

// Check storage writability
$storageDir = __DIR__ . '/../storage';
if (is_dir($storageDir) && is_writable($storageDir)) {
    $health['checks']['storage'] = true;
} else {
    $health['checks']['storage'] = false;
}

// Check if vendor directory exists (dependencies installed)
$vendorDir = __DIR__ . '/../vendor';
if (is_dir($vendorDir) && file_exists($vendorDir . '/autoload.php')) {
    $health['checks']['vendor'] = true;
} else {
    $health['checks']['vendor'] = false;
    $health['status'] = 'unhealthy';
    $httpStatus = 503;
}

http_response_code($httpStatus);
echo json_encode($health, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
exit;
