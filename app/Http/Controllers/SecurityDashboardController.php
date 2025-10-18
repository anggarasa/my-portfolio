<?php

namespace App\Http\Controllers;

use App\Services\SecurityEventLogger;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SecurityDashboardController extends Controller
{
    use AuthorizesRequests;

    protected $securityLogger;

    public function __construct(SecurityEventLogger $securityLogger)
    {
        $this->securityLogger = $securityLogger;
    }

    /**
     * Display the security dashboard.
     */
    public function index()
    {
        $stats = $this->securityLogger->getSecurityStats();
        $recentEvents = $this->securityLogger->getRecentEvents(50);

        return Inertia::render('admin/security/dashboard', [
            'stats' => $stats,
            'recentEvents' => $recentEvents,
        ]);
    }

    /**
     * Get security events for API.
     */
    public function events(Request $request)
    {
        $limit = $request->get('limit', 50);
        $events = $this->securityLogger->getRecentEvents($limit);

        return response()->json([
            'events' => $events,
            'total' => count($events),
        ]);
    }

    /**
     * Get security statistics for API.
     */
    public function stats()
    {
        $stats = $this->securityLogger->getSecurityStats();

        return response()->json($stats);
    }
}
