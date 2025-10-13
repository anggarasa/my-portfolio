<?php

namespace App\Console\Commands;

use App\Services\AnalyticsService;
use App\Services\PerformanceMonitoringService;
use App\Services\SeoService;
use Illuminate\Console\Command;

class TestSeoPerformance extends Command
{
    protected $signature = 'seo:test';
    protected $description = 'Test SEO and Performance monitoring features';

    public function handle()
    {
        $this->info('Testing SEO and Performance Features...');
        $this->newLine();

        // Test SEO Service
        $this->info('🔍 Testing SEO Service...');
        $seoService = app(SeoService::class);

        $homeMeta = $seoService->getMetaForPage('home');
        $this->line("✓ Homepage meta tags generated");
        $this->line("  Title: {$homeMeta['title']}");
        $this->line("  Description: " . substr($homeMeta['description'], 0, 50) . "...");

        $websiteStructuredData = $seoService->generateWebsiteStructuredData();
        $this->line("✓ Website structured data generated");
        $this->newLine();

        // Test Performance Service
        $this->info('📊 Testing Performance Monitoring...');
        $performanceService = app(PerformanceMonitoringService::class);

        $performanceService->startTimer('test_operation');
        usleep(100000); // Simulate 100ms operation
        $metrics = $performanceService->endTimer('test_operation');

        $this->line("✓ Performance timing test completed");
        $this->line("  Duration: {$metrics['duration']}ms");
        $this->line("  Memory used: " . $this->formatBytes($metrics['memory_used']));

        $healthStatus = $performanceService->checkHealthStatus();
        $this->line("✓ Health check completed");
        $this->line("  Status: {$healthStatus['status']}");
        $this->newLine();

        // Test Analytics Service
        $this->info('📈 Testing Analytics Service...');
        $analyticsService = app(AnalyticsService::class);

        if ($analyticsService->isEnabled()) {
            $this->line("✓ Analytics is enabled");
            if ($analyticsService->getGa4Id()) {
                $this->line("  GA4 ID: " . $analyticsService->getGa4Id());
            }
            if ($analyticsService->getGtagId()) {
                $this->line("  GTM ID: " . $analyticsService->getGtagId());
            }
        } else {
            $this->warn("⚠ Analytics is not configured");
            $this->line("  Add GOOGLE_ANALYTICS_GA4_ID to your .env file");
        }
        $this->newLine();

        // Test Sitemap
        $this->info('🗺️ Testing Sitemap Generation...');
        $sitemapController = app(\App\Http\Controllers\SitemapController::class);
        $sitemap = $sitemapController->index();

        if ($sitemap->getStatusCode() === 200) {
            $this->line("✓ Sitemap generated successfully");
            $this->line("  Content-Type: " . $sitemap->headers->get('Content-Type'));
        } else {
            $this->error("✗ Sitemap generation failed");
        }
        $this->newLine();

        $this->info('✅ All tests completed!');
        $this->newLine();

        $this->info('Next steps:');
        $this->line('1. Visit /sitemap.xml to view your sitemap');
        $this->line('2. Visit /robots.txt to view your robots file');
        $this->line('3. Visit /health to check system health');
        $this->line('4. Visit /admin/performance (as admin) to view performance dashboard');
        $this->line('5. Add Google Analytics IDs to your .env file for tracking');
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
