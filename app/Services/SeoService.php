<?php

namespace App\Services;

use App\Models\Project;

class SeoService
{
    protected $defaultMeta = [
        'title' => 'Portfolio - Full Stack Developer',
        'description' => 'Professional portfolio showcasing web development projects, skills, and experience in modern technologies.',
        'keywords' => 'portfolio, web developer, full stack, laravel, react, typescript, php, javascript',
        'author' => 'Anggara Saputra',
        'robots' => 'index, follow',
        'canonical' => null,
        'og_type' => 'website',
        'og_image' => null,
    ];

    public function __construct()
    {
        // Merge defaults with config/seo.php if available to centralize SEO settings
        $configured = config('seo.default_meta', []);
        if (is_array($configured)) {
            $this->defaultMeta = array_merge($this->defaultMeta, $configured);
        }
    }

    public function getMetaForPage(string $page, $data = null): array
    {
        $meta = $this->defaultMeta;
        $baseUrl = config('app.url');

        switch ($page) {
            case 'home':
                $meta['title'] = 'Portfolio - Full Stack Developer | Modern Web Solutions';
                $meta['description'] = 'Explore my portfolio of innovative web applications built with Laravel, React, and modern technologies. Professional full-stack development services.';
                $meta['keywords'] = 'portfolio, web developer, full stack developer, laravel, react, typescript, php, javascript, web development, software engineer, frontend, backend';
                $meta['canonical'] = $baseUrl;
                $meta['og_image'] = $baseUrl . '/assets/icons/ic_logo_favicon.png';
                break;

            case 'project':
                if ($data instanceof Project) {
                    $meta['title'] = $data->title . ' - Portfolio Project | Full Stack Developer';
                    $meta['description'] = $this->truncateDescription($data->description, 160);
                    $meta['keywords'] = implode(', ', $data->technologies ?? []) . ', portfolio, project, web development, ' . strtolower($data->category);
                    $meta['canonical'] = route('project.detail', $data);
                    $meta['og_type'] = 'article';
                    $meta['og_image'] = $data->image_url ?: $baseUrl . '/assets/images/img_threadloop_1.png';

                    // Add project-specific structured data
                    $meta['structured_data'] = $this->generateProjectStructuredData($data);
                }
                break;

            case 'dashboard':
                $meta['title'] = 'Dashboard - Admin Panel';
                $meta['description'] = 'Admin dashboard for portfolio management.';
                $meta['robots'] = 'noindex, nofollow';
                break;
        }

        return $meta;
    }

    public function generateProjectStructuredData(Project $project): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'CreativeWork',
            'name' => $project->title,
            'description' => $project->description,
            'image' => $project->image_url,
            'author' => [
                '@type' => 'Person',
                'name' => $this->defaultMeta['author']
            ],
            'dateCreated' => $project->created_at->toISOString(),
            'dateModified' => $project->updated_at->toISOString(),
            'keywords' => implode(', ', $project->technologies ?? []),
            'url' => route('project.detail', $project),
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => route('project.detail', $project)
            ]
        ];
    }

    public function generateWebsiteStructuredData(): array
    {
        // Prefer configured structured data if provided; otherwise, fall back to sensible defaults
        $configuredPerson = config('seo.structured_data.person');
        if (is_array($configuredPerson) && !empty($configuredPerson)) {
            return array_merge([
                '@context' => 'https://schema.org',
            ], $configuredPerson);
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'Person',
            'name' => $this->defaultMeta['author'],
            'jobTitle' => 'Full Stack Developer',
            'url' => config('app.url'),
            'sameAs' => [
                'https://github.com/anggarasa',
                'https://www.linkedin.com/in/anggara-saputra-7baa95318',
                'https://www.instagram.com/angr_sa/#',
            ],
            'knowsAbout' => [
                'Web Development',
                'Laravel',
                'React',
                'TypeScript',
                'PHP',
                'JavaScript',
                'Full Stack Development'
            ]
        ];
    }

    protected function truncateDescription(string $description, int $length = 160): string
    {
        if (strlen($description) <= $length) {
            return $description;
        }

        return substr($description, 0, $length - 3) . '...';
    }

    public function renderMetaTags(array $meta): string
    {
        $html = '';

        // Basic meta tags
        $html .= '<title>' . htmlspecialchars($meta['title']) . '</title>' . "\n";
        $html .= '<meta name="description" content="' . htmlspecialchars($meta['description']) . '">' . "\n";
        $html .= '<meta name="keywords" content="' . htmlspecialchars($meta['keywords']) . '">' . "\n";
        $html .= '<meta name="author" content="' . htmlspecialchars($meta['author']) . '">' . "\n";
        $html .= '<meta name="robots" content="' . htmlspecialchars($meta['robots']) . '">' . "\n";
        $html .= '<meta name="viewport" content="width=device-width, initial-scale=1.0">' . "\n";
        $html .= '<meta name="theme-color" content="#000000">' . "\n";
        $html .= '<meta name="msapplication-TileColor" content="#000000">' . "\n";
        $html .= '<meta name="apple-mobile-web-app-capable" content="yes">' . "\n";
        $html .= '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">' . "\n";

        // Canonical URL
        if ($meta['canonical']) {
            $html .= '<link rel="canonical" href="' . htmlspecialchars($meta['canonical']) . '">' . "\n";
        }

        // Open Graph tags
        $html .= '<meta property="og:title" content="' . htmlspecialchars($meta['title']) . '">' . "\n";
        $html .= '<meta property="og:description" content="' . htmlspecialchars($meta['description']) . '">' . "\n";
        $html .= '<meta property="og:type" content="' . htmlspecialchars($meta['og_type']) . '">' . "\n";
        $html .= '<meta property="og:url" content="' . htmlspecialchars($meta['canonical'] ?: config('app.url')) . '">' . "\n";

        if ($meta['og_image']) {
            $html .= '<meta property="og:image" content="' . htmlspecialchars($meta['og_image']) . '">' . "\n";
            $html .= '<meta property="og:image:alt" content="' . htmlspecialchars($meta['title']) . '">' . "\n";
        }

        // Instagram uses Open Graph; no Twitter meta tags needed

        return $html;
    }

    public function renderStructuredData(array $structuredData): string
    {
        return '<script type="application/ld+json">' . "\n" .
               json_encode($structuredData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n" .
               '</script>' . "\n";
    }
}
