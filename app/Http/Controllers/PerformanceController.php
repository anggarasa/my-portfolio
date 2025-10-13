<?php

namespace App\Http\Controllers;

use App\Services\PerformanceMonitoringService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerformanceController extends Controller
{
    protected $performanceService;

    public function __construct(PerformanceMonitoringService $performanceService)
    {
        $this->performanceService = $performanceService;
    }

    public function dashboard()
    {
        // For now, allow any authenticated user to access performance dashboard
        // You can add more specific authorization later
        if (!auth()->check()) {
            abort(403, 'Unauthorized access');
        }

        $performanceReport = $this->performanceService->getPerformanceReport();
        $healthStatus = $this->performanceService->checkHealthStatus();

        return Inertia::render('admin/performance/dashboard', [
            'performanceReport' => $performanceReport,
            'healthStatus' => $healthStatus,
        ]);
    }

    public function metrics()
    {
        // Allow any authenticated user to access metrics
        if (!auth()->check()) {
            abort(403, 'Unauthorized access');
        }

        return response()->json([
            'system_metrics' => $this->performanceService->getSystemMetrics(),
            'health_status' => $this->performanceService->checkHealthStatus(),
            'timestamp' => now()->toISOString(),
        ]);
    }

    public function health()
    {
        $healthStatus = $this->performanceService->checkHealthStatus();

        $statusCode = match ($healthStatus['status']) {
            'healthy' => 200,
            'warning' => 200, // Still OK but with warnings
            'critical' => 503, // Service unavailable
            default => 200,
        };

        return response()->json($healthStatus, $statusCode);
    }

    public function logMetrics()
    {
        // Allow any authenticated user to log metrics
        if (!auth()->check()) {
            abort(403, 'Unauthorized access');
        }

        $this->performanceService->logPerformanceMetrics();

        return response()->json([
            'message' => 'Performance metrics logged successfully',
            'timestamp' => now()->toISOString(),
        ]);
    }
}
