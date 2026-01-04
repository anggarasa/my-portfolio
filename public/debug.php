<?php

/**
 * Debug Endpoint for troubleshooting deployment issues
 *
 * ⚠️ SECURITY WARNING: Delete this file after debugging is complete!
 *
 * Access: GET /debug.php?key=<your-debug-key>
 * Set DEBUG_KEY environment variable in Coolify to enable
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');

// Simple authentication - set DEBUG_KEY env variable in Coolify
$debugKey = getenv('DEBUG_KEY') ?: 'debug-12345';
$providedKey = $_GET['key'] ?? '';

if ($providedKey !== $debugKey) {
    http_response_code(403);
    echo json_encode([
        'error' => 'Access denied',
        'hint' => 'Provide ?key=<DEBUG_KEY> parameter. Set DEBUG_KEY env in Coolify.',
    ], JSON_PRETTY_PRINT);
    exit;
}

$debug = [
    'timestamp' => date('c'),
    'environment' => [],
    'database' => [],
    'files' => [],
    'errors' => [],
];

// Check critical environment variables
$envVars = [
    'APP_ENV',
    'APP_DEBUG',
    'APP_KEY',
    'APP_URL',
    'DB_CONNECTION',
    'DB_HOST',
    'DB_PORT',
    'DB_DATABASE',
    'DB_USERNAME',
    // Don't expose password for security
];

foreach ($envVars as $var) {
    $value = getenv($var);
    $debug['environment'][$var] = $value !== false ? $value : '(not set)';
}

// Check database connectivity
$dbConnection = getenv('DB_CONNECTION') ?: 'mysql';
$dbHost = getenv('DB_HOST') ?: '127.0.0.1';
$dbPort = getenv('DB_PORT') ?: '3306';
$dbName = getenv('DB_DATABASE') ?: '';
$dbUser = getenv('DB_USERNAME') ?: '';
$dbPass = getenv('DB_PASSWORD') ?: '';

$debug['database']['connection_type'] = $dbConnection;
$debug['database']['host'] = $dbHost;
$debug['database']['port'] = $dbPort;
$debug['database']['database'] = $dbName;
$debug['database']['username'] = $dbUser;
$debug['database']['password_set'] = !empty($dbPass);

try {
    if ($dbConnection === 'sqlite') {
        $sqliteDb = $dbName ?: __DIR__ . '/../database/database.sqlite';
        if (file_exists($sqliteDb)) {
            $pdo = new PDO("sqlite:{$sqliteDb}");
            $debug['database']['status'] = 'connected';
            $debug['database']['message'] = 'SQLite connection successful';
        } else {
            $debug['database']['status'] = 'error';
            $debug['database']['message'] = 'SQLite file does not exist: ' . $sqliteDb;
        }
    } else {
        // MySQL/MariaDB
        $dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName}";
        $pdo = new PDO($dsn, $dbUser, $dbPass, [
            PDO::ATTR_TIMEOUT => 5,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);
        $debug['database']['status'] = 'connected';
        $debug['database']['message'] = 'MySQL connection successful';

        // Check if tables exist
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        $debug['database']['tables_count'] = count($tables);
        $debug['database']['tables'] = $tables;
    }
} catch (PDOException $e) {
    $debug['database']['status'] = 'error';
    $debug['database']['message'] = $e->getMessage();
    $debug['database']['code'] = $e->getCode();
    $debug['errors'][] = [
        'type' => 'database',
        'message' => $e->getMessage(),
    ];
}

// Check critical files
$criticalFiles = [
    'vendor/autoload.php' => __DIR__ . '/../vendor/autoload.php',
    'bootstrap/app.php' => __DIR__ . '/../bootstrap/app.php',
    '.env' => __DIR__ . '/../.env',
    'storage/logs' => __DIR__ . '/../storage/logs',
    'bootstrap/cache' => __DIR__ . '/../bootstrap/cache',
    'database/database.sqlite' => __DIR__ . '/../database/database.sqlite',
];

foreach ($criticalFiles as $name => $path) {
    $debug['files'][$name] = [
        'exists' => file_exists($path),
        'writable' => is_writable($path),
        'type' => is_dir($path) ? 'directory' : (is_file($path) ? 'file' : 'missing'),
    ];
}

// Check Laravel error log
$logFile = __DIR__ . '/../storage/logs/laravel.log';
if (file_exists($logFile)) {
    $logContent = file_get_contents($logFile);
    $logLines = explode("\n", $logContent);
    $lastLines = array_slice($logLines, -30);
    $debug['laravel_log_tail'] = implode("\n", $lastLines);
}

// Recommendations
$debug['recommendations'] = [];

if ($debug['database']['status'] === 'error') {
    $debug['recommendations'][] = 'Database connection failed. Check DB_HOST, DB_DATABASE, DB_USERNAME, and DB_PASSWORD in Coolify environment variables.';

    if (strpos($debug['database']['message'] ?? '', 'Access denied') !== false) {
        $debug['recommendations'][] = 'Access denied error: Check username/password. If using MySQL, ensure the user has permissions to access the database from the container IP.';
    }

    if (strpos($debug['database']['message'] ?? '', 'Unknown database') !== false) {
        $debug['recommendations'][] = 'Database does not exist. Create the database first or check DB_DATABASE value.';
    }

    if (strpos($debug['database']['message'] ?? '', 'Connection refused') !== false) {
        $debug['recommendations'][] = 'Cannot connect to database host. Check if DB_HOST is correct (use internal Docker network name or IP, not localhost).';
    }
}

if (!$debug['files']['.env']['exists']) {
    $debug['recommendations'][] = 'No .env file found. In Coolify, set environment variables directly in the project settings.';
}

if (empty(getenv('APP_KEY'))) {
    $debug['recommendations'][] = 'APP_KEY is not set. Generate one with: php artisan key:generate --show';
}

echo json_encode($debug, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
exit;
