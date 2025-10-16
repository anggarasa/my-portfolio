<?php

namespace App\Console\Commands;

use App\Models\Project;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class GenerateSitemapCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seo:generate-sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Warm sitemap cache by generating dynamic XML via controller logic';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Warming sitemap cache...');

        // Regenerate the same XML as the controller uses, but keep it in cache
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

        // Warm the cache used by the controller
        \Illuminate\Support\Facades\Cache::put('sitemap', $xml, 3600);

        $this->info('Sitemap cache warmed successfully.');
        $this->info('Total URLs: ' . ($projects->count() + 1));
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
}
