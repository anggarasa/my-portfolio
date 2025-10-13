<?php

namespace App\Http\Middleware;

use App\Services\PerformanceMonitoringService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PerformanceMonitoringMiddleware
{
    protected $performanceService;

    public function __construct(PerformanceMonitoringService $performanceService)
    {
        $this->performanceService = $performanceService;
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Start monitoring the request
        $this->performanceService->startTimer('request_processing');

        // Enable query logging for database performance monitoring
        if (config('app.debug')) {
            \DB::enableQueryLog();
        }

        $response = $next($request);

        // End monitoring and log metrics
        $metrics = $this->performanceService->endTimer('request_processing');

        // Add performance headers to response (only in debug mode)
        if (config('app.debug')) {
            $response->headers->set('X-Response-Time', round($metrics['duration'], 2) . 'ms');
            $response->headers->set('X-Memory-Used', $this->formatBytes($metrics['memory_used']));
            $response->headers->set('X-Memory-Peak', $this->formatBytes($metrics['memory_peak']));
        }

        // Log slow requests
        if ($metrics['duration'] > 2000) { // Log requests taking more than 2 seconds
            \Log::warning('Slow request detected', [
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'duration' => $metrics['duration'],
                'memory_used' => $metrics['memory_used'],
                'user_agent' => $request->userAgent(),
                'ip' => $request->ip(),
            ]);
        }

        return $response;
    }

    protected function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= pow(1024, $pow);

        return round($bytes, 2) . ' ' . $units[$pow];
    }
}
