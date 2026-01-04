<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;

class AnalyticsService
{
    protected $ga4Id;
    protected $gtagId;
    protected $gscVerification;

    public function __construct()
    {
        $this->ga4Id = config('services.google_analytics.ga4_id');
        $this->gtagId = config('services.google_analytics.gtag_id');
        $this->gscVerification = config('seo.analytics.google_search_console.verification_code');
    }

    public function isEnabled(): bool
    {
        return !empty($this->ga4Id) || !empty($this->gtagId);
    }

    public function getGa4Id(): ?string
    {
        return $this->ga4Id;
    }

    public function getGtagId(): ?string
    {
        return $this->gtagId;
    }

    public function renderGoogleAnalytics(): string
    {
        if (!$this->isEnabled()) {
            return '';
        }

        $html = '';

        // Google Analytics 4 (GA4)
        if ($this->ga4Id) {
            $html .= $this->renderGA4();
        }

        // Google Tag Manager (GTM)
        if ($this->gtagId) {
            $html .= $this->renderGTM();
        }

        return $html;
    }

    public function renderGoogleSiteVerification(): string
    {
        if (empty($this->gscVerification)) {
            return '';
        }

        return "<meta name=\"google-site-verification\" content=\"{$this->gscVerification}\" />\n";
    }

    protected function renderGA4(): string
    {
        return "
        <!-- Google tag (gtag.js) -->
        <script async src=\"https://www.googletagmanager.com/gtag/js?id={$this->ga4Id}\"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '{$this->ga4Id}', {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure'
          });
        </script>
        ";
    }

    protected function renderGTM(): string
    {
        return "
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','{$this->gtagId}');</script>
        <!-- End Google Tag Manager -->
        ";
    }

    public function renderGTMBody(): string
    {
        if (!$this->gtagId) {
            return '';
        }

        return "
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id={$this->gtagId}\"
        height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
        ";
    }

    public function trackEvent(string $eventName, array $parameters = []): string
    {
        if (!$this->isEnabled()) {
            return '';
        }

        $parametersJson = json_encode($parameters);

        return "
        <script>
          gtag('event', '{$eventName}', {$parametersJson});
        </script>
        ";
    }

    public function trackPageView(string $pagePath, ?string $pageTitle = null): string
    {
        if (!$this->isEnabled()) {
            return '';
        }

        $titleParam = $pageTitle ? ", 'page_title': '{$pageTitle}'" : '';

        return "
        <script>
          gtag('config', '{$this->ga4Id}', {
            'page_path': '{$pagePath}'{$titleParam}
          });
        </script>
        ";
    }

    public function trackCustomEvent(string $eventName, array $customParameters = []): string
    {
        if (!$this->isEnabled()) {
            return '';
        }

        $parameters = array_merge([
            'event_category' => 'custom',
            'event_label' => $eventName,
        ], $customParameters);

        return $this->trackEvent($eventName, $parameters);
    }

    public function trackProjectView(string $projectTitle, string $projectId): string
    {
        return $this->trackCustomEvent('project_view', [
            'project_title' => $projectTitle,
            'project_id' => $projectId,
            'event_category' => 'engagement',
        ]);
    }

    public function trackContactFormSubmission(): string
    {
        return $this->trackCustomEvent('contact_form_submit', [
            'event_category' => 'conversion',
        ]);
    }

    public function trackDownload(string $fileName, string $fileType): string
    {
        return $this->trackCustomEvent('file_download', [
            'file_name' => $fileName,
            'file_type' => $fileType,
            'event_category' => 'engagement',
        ]);
    }
}
