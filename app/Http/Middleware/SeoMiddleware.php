<?php

namespace App\Http\Middleware;

use App\Services\SeoService;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SeoMiddleware
{
    protected $seoService;

    public function __construct(SeoService $seoService)
    {
        $this->seoService = $seoService;
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only process HTML responses
        if ($response->headers->get('Content-Type') &&
            str_contains($response->headers->get('Content-Type'), 'text/html')) {

            $this->injectSeoData($request);
        }

        return $response;
    }

    protected function injectSeoData(Request $request): void
    {
        $routeName = $request->route()?->getName();
        $data = null;

        // Get route-specific data for SEO
        if ($routeName === 'project.detail') {
            $data = $request->route('project');
        }

        // Determine page type
        $pageType = $this->getPageType($routeName);

        // Get SEO meta data
        $meta = $this->seoService->getMetaForPage($pageType, $data);

        // Share SEO data with Inertia
        Inertia::share([
            'seo' => [
                'meta' => $meta,
                'structured_data' => $meta['structured_data'] ?? null,
                'website_structured_data' => $this->seoService->generateWebsiteStructuredData(),
            ]
        ]);
    }

    protected function getPageType(?string $routeName): string
    {
        return match ($routeName) {
            'home' => 'home',
            'project.detail' => 'project',
            'contact.store' => 'contact',
            'dashboard' => 'dashboard',
            default => 'home'
        };
    }
}
