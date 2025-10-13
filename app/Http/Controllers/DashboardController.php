<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Project;
use App\Services\PerformanceMonitoringService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $performanceService;

    public function __construct(PerformanceMonitoringService $performanceService)
    {
        $this->performanceService = $performanceService;
    }

    public function index()
    {
        // Get project statistics
        $projectStats = [
            'total' => Project::count(),
            'published' => Project::published()->count(),
            'draft' => Project::where('status', 'draft')->count(),
            'featured' => Project::featured()->count(),
            'categories' => Project::distinct()->pluck('category')->filter()->count(),
        ];

        // Get contact statistics
        $contactStats = [
            'total' => Contact::count(),
            'new' => Contact::new()->count(),
            'read' => Contact::read()->count(),
            'replied' => Contact::replied()->count(),
        ];

        // Get recent projects
        $recentProjects = Project::latest()
            ->take(5)
            ->get(['id', 'title', 'status', 'category', 'created_at']);

        // Get recent contacts
        $recentContacts = Contact::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'status', 'created_at']);

        // Get system health
        $systemHealth = $this->performanceService->checkHealthStatus();

        // Get performance metrics
        $systemMetrics = $this->performanceService->getSystemMetrics();

        // Calculate growth statistics
        $projectGrowth = $this->getProjectGrowth();
        $contactGrowth = $this->getContactGrowth();

        return Inertia::render('dashboard', [
            'projectStats' => $projectStats,
            'contactStats' => $contactStats,
            'recentProjects' => $recentProjects,
            'recentContacts' => $recentContacts,
            'systemHealth' => $systemHealth,
            'systemMetrics' => $systemMetrics,
            'projectGrowth' => $projectGrowth,
            'contactGrowth' => $contactGrowth,
        ]);
    }

    private function getProjectGrowth()
    {
        $currentMonth = Project::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        $lastMonth = Project::whereMonth('created_at', now()->subMonth()->month)
            ->whereYear('created_at', now()->subMonth()->year)
            ->count();

        $growth = $lastMonth > 0 ? (($currentMonth - $lastMonth) / $lastMonth) * 100 : 0;

        return [
            'current' => $currentMonth,
            'previous' => $lastMonth,
            'growth' => round($growth, 1),
        ];
    }

    private function getContactGrowth()
    {
        $currentMonth = Contact::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        $lastMonth = Contact::whereMonth('created_at', now()->subMonth()->month)
            ->whereYear('created_at', now()->subMonth()->year)
            ->count();

        $growth = $lastMonth > 0 ? (($currentMonth - $lastMonth) / $lastMonth) * 100 : 0;

        return [
            'current' => $currentMonth,
            'previous' => $lastMonth,
            'growth' => round($growth, 1),
        ];
    }
}
