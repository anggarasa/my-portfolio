<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $sitemap = Cache::remember('sitemap', 3600, function () {
            return $this->generateSitemap();
        });

        return response($sitemap, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }

    protected function generateSitemap(): string
    {
        $baseUrl = config('app.url');
        $now = now()->toISOString();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        // Homepage
        $xml .= $this->addUrl($baseUrl, $now, '1.0', 'daily');

        // Projects
        $projects = Project::published()->ordered()->get();
        foreach ($projects as $project) {
            $xml .= $this->addUrl(
                $baseUrl . '/project/' . $project->id,
                $project->updated_at->toISOString(),
                '0.8',
                'monthly'
            );
        }

        $xml .= '</urlset>';

        return $xml;
    }

    protected function addUrl(string $url, string $lastmod, string $priority, string $changefreq): string
    {
        return "  <url>\n" .
               "    <loc>" . htmlspecialchars($url) . "</loc>\n" .
               "    <lastmod>" . $lastmod . "</lastmod>\n" .
               "    <changefreq>" . $changefreq . "</changefreq>\n" .
               "    <priority>" . $priority . "</priority>\n" .
               "  </url>\n";
    }

    public function robots(): Response
    {
        $robots = "User-agent: *\n";
        $robots .= "Allow: /\n";
        $robots .= "Disallow: /admin/\n";
        $robots .= "Disallow: /dashboard\n";
        $robots .= "Disallow: /settings\n";
        $robots .= "\n";
        $robots .= "Sitemap: " . config('app.url') . "/sitemap.xml\n";

        return response($robots, 200, [
            'Content-Type' => 'text/plain',
        ]);
    }
}
