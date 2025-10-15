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

    public function getMetaForPage(string $page, $data = null): array
    {
        $meta = $this->defaultMeta;
        $baseUrl = config('app.url');

        switch ($page) {
            case 'home':
                $meta['title'] = 'Portfolio - Full Stack Developer | Modern Web Solutions';
                $meta['description'] = 'Explore my portfolio of innovative web applications built with Laravel, React, and modern technologies. Professional full-stack development services.';
                $meta['canonical'] = $baseUrl;
                $meta['og_image'] = $baseUrl . '/assets/icons/ic_logo_favicon.jpg';
                break;

            case 'project':
                if ($data instanceof Project) {
                    $meta['title'] = $data->title . ' - Portfolio Project';
                    $meta['description'] = $this->truncateDescription($data->description, 160);
                    $meta['keywords'] = implode(', ', $data->technologies ?? []) . ', portfolio, project';
                    $meta['canonical'] = $baseUrl . '/project/' . $data->id;
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
            'url' => config('app.url') . '/project/' . $project->id,
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => config('app.url') . '/project/' . $project->id
            ]
        ];
    }

    public function generateWebsiteStructuredData(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Person',
            'name' => $this->defaultMeta['author'],
            'jobTitle' => 'Full Stack Developer',
            'url' => config('app.url'),
            'sameAs' => [
                // Add your social media profiles here
                'https://github.com/anggarasa',
                'https://www.linkedin.com/in/anggara-saputra-7baa95318',
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

        // Twitter Card tags
        $html .= '<meta name="twitter:card" content="' . htmlspecialchars($meta['twitter_card']) . '">' . "\n";
        $html .= '<meta name="twitter:title" content="' . htmlspecialchars($meta['title']) . '">' . "\n";
        $html .= '<meta name="twitter:description" content="' . htmlspecialchars($meta['description']) . '">' . "\n";

        if ($meta['og_image']) {
            $html .= '<meta name="twitter:image" content="' . htmlspecialchars($meta['og_image']) . '">' . "\n";
        }

        return $html;
    }

    public function renderStructuredData(array $structuredData): string
    {
        return '<script type="application/ld+json">' . "\n" .
               json_encode($structuredData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n" .
               '</script>' . "\n";
    }
}
