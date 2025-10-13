<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class PerformanceMonitoringService
{
    protected $metrics = [];

    public function startTimer(string $name): void
    {
        $this->metrics[$name] = [
            'start' => microtime(true),
            'memory_start' => memory_get_usage(true),
        ];
    }

    public function endTimer(string $name): array
    {
        if (!isset($this->metrics[$name])) {
            return [];
        }

        $endTime = microtime(true);
        $endMemory = memory_get_usage(true);

        $metrics = [
            'duration' => ($endTime - $this->metrics[$name]['start']) * 1000, // Convert to milliseconds
            'memory_used' => $endMemory - $this->metrics[$name]['memory_start'],
            'memory_peak' => memory_get_peak_usage(true),
        ];

        // Log slow queries/operations
        if ($metrics['duration'] > 1000) { // Log if operation takes more than 1 second
            Log::warning("Slow operation detected: {$name}", $metrics);
        }

        // Store metrics for analysis
        $this->storeMetrics($name, $metrics);

        unset($this->metrics[$name]);
        return $metrics;
    }

    public function measureDatabaseQuery(callable $callback, string $queryName = 'database_query')
    {
        $this->startTimer($queryName);

        try {
            $result = $callback();
            $metrics = $this->endTimer($queryName);

            // Log slow database queries
            if ($metrics['duration'] > 500) { // Log if query takes more than 500ms
                Log::warning("Slow database query detected: {$queryName}", $metrics);
            }

            return $result;
        } catch (\Exception $e) {
            $this->endTimer($queryName);
            throw $e;
        }
    }

    public function getSystemMetrics(): array
    {
        return [
            'memory_usage' => memory_get_usage(true),
            'memory_peak' => memory_get_peak_usage(true),
            'memory_limit' => $this->parseMemoryLimit(ini_get('memory_limit')),
            'execution_time' => microtime(true) - (defined('LARAVEL_START') ? LARAVEL_START : $_SERVER['REQUEST_TIME_FLOAT'] ?? microtime(true)),
            'database_connections' => $this->getDatabaseConnectionsInfo(),
        ];
    }

    public function getPerformanceReport(): array
    {
        $cacheKey = 'performance_report_' . date('Y-m-d-H');
        return Cache::remember($cacheKey, 3600, function () {
            return [
                'timestamp' => now()->toISOString(),
                'system_metrics' => $this->getSystemMetrics(),
                'recent_slow_operations' => $this->getRecentSlowOperations(),
                'database_performance' => $this->getDatabasePerformanceMetrics(),
            ];
        });
    }

    protected function storeMetrics(string $operation, array $metrics): void
    {
        $key = "performance_metrics_{$operation}";
        $existing = Cache::get($key, []);

        $existing[] = array_merge($metrics, [
            'timestamp' => now()->toISOString(),
            'operation' => $operation,
        ]);

        // Keep only last 100 entries
        if (count($existing) > 100) {
            $existing = array_slice($existing, -100);
        }

        Cache::put($key, $existing, 86400); // Store for 24 hours

        // Add key to the list of performance metrics keys
        $keys = Cache::get('performance_metrics_keys', []);
        if (!in_array($key, $keys)) {
            $keys[] = $key;
            Cache::put('performance_metrics_keys', $keys, 86400);
        }
    }

    protected function getRecentSlowOperations(): array
    {
        $slowOperations = [];

        // Get all performance metrics keys from cache
        $keys = Cache::get('performance_metrics_keys', []);

        foreach ($keys as $key) {
            try {
                $metrics = Cache::get($key, []);
                if (is_array($metrics)) {
                    $slowOperations = array_merge($slowOperations,
                        array_filter($metrics, fn($m) => isset($m['duration']) && $m['duration'] > 1000)
                    );
                }
            } catch (\Exception $e) {
                // Skip invalid cache entries
                continue;
            }
        }

        // Sort by duration descending and return top 10
        usort($slowOperations, fn($a, $b) => $b['duration'] <=> $a['duration']);
        return array_slice($slowOperations, 0, 10);
    }

    protected function getDatabasePerformanceMetrics(): array
    {
        try {
            $queryLog = DB::getQueryLog();
            $totalQueries = count($queryLog);
            $totalTime = array_sum(array_column($queryLog, 'time'));

            return [
                'total_queries' => $totalQueries,
                'total_time' => $totalTime,
                'average_time' => $totalQueries > 0 ? $totalTime / $totalQueries : 0,
                'slow_queries' => array_filter($queryLog, fn($query) => $query['time'] > 100),
            ];
        } catch (\Exception $e) {
            return ['error' => 'Unable to retrieve database metrics'];
        }
    }

    protected function getDatabaseConnectionsInfo(): array
    {
        try {
            $connections = DB::getConnections();
            $connectionInfo = [];

            foreach ($connections as $name => $connection) {
                $connectionInfo[] = [
                    'name' => $name,
                    'driver' => $connection->getDriverName(),
                    'database' => $connection->getDatabaseName(),
                    'host' => $connection->getConfig('host'),
                    'port' => $connection->getConfig('port'),
                ];
            }

            return $connectionInfo;
        } catch (\Exception $e) {
            return [
                [
                    'name' => 'default',
                    'driver' => 'unknown',
                    'database' => 'unknown',
                    'host' => 'unknown',
                    'port' => 'unknown',
                    'error' => 'Unable to retrieve connection info'
                ]
            ];
        }
    }

    protected function parseMemoryLimit(string $limit): int
    {
        $limit = trim($limit);
        $last = strtolower($limit[strlen($limit) - 1]);
        $limit = (int) $limit;

        switch ($last) {
            case 'g':
                $limit *= 1024 * 1024 * 1024;
                break;
            case 'm':
                $limit *= 1024 * 1024;
                break;
            case 'k':
                $limit *= 1024;
                break;
        }

        return $limit;
    }

    public function logPerformanceMetrics(): void
    {
        $metrics = $this->getPerformanceReport();
        Log::info('Performance metrics', $metrics);
    }

    public function checkHealthStatus(): array
    {
        $systemMetrics = $this->getSystemMetrics();
        $memoryUsagePercent = ($systemMetrics['memory_usage'] / $systemMetrics['memory_limit']) * 100;

        $status = 'healthy';
        $issues = [];

        // Check memory usage
        if ($memoryUsagePercent > 80) {
            $status = 'warning';
            $issues[] = 'High memory usage: ' . round($memoryUsagePercent, 2) . '%';
        }

        if ($memoryUsagePercent > 90) {
            $status = 'critical';
        }

        // Check execution time
        if ($systemMetrics['execution_time'] > 30) {
            $status = $status === 'critical' ? 'critical' : 'warning';
            $issues[] = 'Long execution time: ' . round($systemMetrics['execution_time'], 2) . 's';
        }

        return [
            'status' => $status,
            'issues' => $issues,
            'metrics' => $systemMetrics,
            'timestamp' => now()->toISOString(),
        ];
    }
}
