<?php

namespace App\Console\Commands;

use App\Models\Project;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class SeoOptimizeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seo:optimize';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run SEO optimization tasks';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting SEO optimization...');

        // Generate sitemap
        $this->call('seo:generate-sitemap');

        // Clear cache
        $this->call('cache:clear');
        $this->call('config:clear');
        $this->call('route:clear');
        $this->call('view:clear');

        // Optimize autoloader
        $this->call('optimize');

        // Check for missing meta descriptions
        $this->checkMetaDescriptions();

        $this->info('SEO optimization completed!');
    }

    protected function checkMetaDescriptions()
    {
        $this->info('Checking meta descriptions...');

        $projects = Project::published()->get();
        $missingDescriptions = 0;

        foreach ($projects as $project) {
            if (empty($project->description) || strlen($project->description) < 50) {
                $missingDescriptions++;
                $this->warn("Project '{$project->title}' has short or missing description");
            }
        }

        if ($missingDescriptions === 0) {
            $this->info('All projects have proper meta descriptions');
        } else {
            $this->warn("Found {$missingDescriptions} projects with missing or short descriptions");
        }
    }
}
