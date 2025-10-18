<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class SecurityEventLogger
{
    /**
     * Log authentication events
     *
     * @param string $event
     * @param array $data
     * @return void
     */
    public function logAuthEvent(string $event, array $data = []): void
    {
        $this->logSecurityEvent('auth', $event, $data);
    }

    /**
     * Log file upload events
     *
     * @param string $event
     * @param array $data
     * @return void
     */
    public function logFileUploadEvent(string $event, array $data = []): void
    {
        $this->logSecurityEvent('file_upload', $event, $data);
    }

    /**
     * Log suspicious activity
     *
     * @param string $event
     * @param array $data
     * @return void
     */
    public function logSuspiciousActivity(string $event, array $data = []): void
    {
        $this->logSecurityEvent('suspicious', $event, $data);

        // Check for potential attacks
        $this->checkForAttackPatterns($event, $data);
    }

    /**
     * Log access control events
     *
     * @param string $event
     * @param array $data
     * @return void
     */
    public function logAccessControlEvent(string $event, array $data = []): void
    {
        $this->logSecurityEvent('access_control', $event, $data);
    }

    /**
     * Log data validation events
     *
     * @param string $event
     * @param array $data
     * @return void
     */
    public function logValidationEvent(string $event, array $data = []): void
    {
        $this->logSecurityEvent('validation', $event, $data);
    }

    /**
     * Log general security events
     *
     * @param string $category
     * @param string $event
     * @param array $data
     * @return void
     */
    public function logSecurityEvent(string $category, string $event, array $data = []): void
    {
        $logData = [
            'category' => $category,
            'event' => $event,
            'timestamp' => now()->toISOString(),
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'user_id' => auth()->id(),
            'session_id' => session()->getId(),
            'url' => request()->fullUrl(),
            'method' => request()->method(),
            'data' => $data,
        ];

        // Log to different channels based on severity
        $severity = $this->determineSeverity($category, $event, $data);

        switch ($severity) {
            case 'critical':
                Log::critical("Security Event [{$category}]: {$event}", $logData);
                break;
            case 'error':
                Log::error("Security Event [{$category}]: {$event}", $logData);
                break;
            case 'warning':
                Log::warning("Security Event [{$category}]: {$event}", $logData);
                break;
            default:
                Log::info("Security Event [{$category}]: {$event}", $logData);
        }

        // Store in cache for monitoring
        $this->storeEventInCache($logData);
    }

    /**
     * Check for potential attack patterns
     *
     * @param string $event
     * @param array $data
     * @return void
     */
    private function checkForAttackPatterns(string $event, array $data): void
    {
        $ip = request()->ip();
        $cacheKey = "security_events:{$ip}";

        // Get recent events for this IP
        $recentEvents = Cache::get($cacheKey, []);
        $recentEvents[] = [
            'event' => $event,
            'timestamp' => now()->timestamp,
            'data' => $data,
        ];

        // Keep only last 10 events
        $recentEvents = array_slice($recentEvents, -10);
        Cache::put($cacheKey, $recentEvents, 3600); // 1 hour

        // Check for patterns
        $this->checkBruteForcePattern($recentEvents);
        $this->checkSuspiciousPattern($recentEvents);
    }

    /**
     * Check for brute force patterns
     *
     * @param array $events
     * @return void
     */
    private function checkBruteForcePattern(array $events): void
    {
        $failedAttempts = array_filter($events, function ($event) {
            return in_array($event['event'], ['login_failed', 'invalid_credentials']);
        });

        if (count($failedAttempts) >= 5) {
            $this->logSecurityEvent('attack_detection', 'potential_brute_force', [
                'failed_attempts' => count($failedAttempts),
                'time_window' => '1 hour',
            ]);
        }
    }

    /**
     * Check for suspicious patterns
     *
     * @param array $events
     * @return void
     */
    private function checkSuspiciousPattern(array $events): void
    {
        $suspiciousEvents = array_filter($events, function ($event) {
            return in_array($event['event'], [
                'file_upload_blocked',
                'validation_failed',
                'access_denied',
                'suspicious_input'
            ]);
        });

        if (count($suspiciousEvents) >= 3) {
            $this->logSecurityEvent('attack_detection', 'suspicious_activity_pattern', [
                'suspicious_events' => count($suspiciousEvents),
                'time_window' => '1 hour',
            ]);
        }
    }

    /**
     * Determine event severity
     *
     * @param string $category
     * @param string $event
     * @param array $data
     * @return string
     */
    private function determineSeverity(string $category, string $event, array $data): string
    {
        $criticalEvents = [
            'auth' => ['account_locked', 'password_reset_abuse'],
            'file_upload' => ['malicious_file_detected', 'virus_detected'],
            'suspicious' => ['sql_injection_attempt', 'xss_attempt'],
            'access_control' => ['privilege_escalation_attempt'],
        ];

        $errorEvents = [
            'auth' => ['login_failed', 'invalid_credentials'],
            'file_upload' => ['file_upload_blocked', 'invalid_file_type'],
            'validation' => ['validation_bypassed'],
            'access_control' => ['unauthorized_access'],
        ];

        if (isset($criticalEvents[$category]) && in_array($event, $criticalEvents[$category])) {
            return 'critical';
        }

        if (isset($errorEvents[$category]) && in_array($event, $errorEvents[$category])) {
            return 'error';
        }

        return 'warning';
    }

    /**
     * Store event in cache for monitoring
     *
     * @param array $logData
     * @return void
     */
    private function storeEventInCache(array $logData): void
    {
        $cacheKey = 'security_events:recent';
        $recentEvents = Cache::get($cacheKey, []);

        $recentEvents[] = $logData;

        // Keep only last 100 events
        $recentEvents = array_slice($recentEvents, -100);

        Cache::put($cacheKey, $recentEvents, 3600); // 1 hour
    }

    /**
     * Get recent security events
     *
     * @param int $limit
     * @return array
     */
    public function getRecentEvents(int $limit = 50): array
    {
        $cacheKey = 'security_events:recent';
        $recentEvents = Cache::get($cacheKey, []);

        return array_slice($recentEvents, -$limit);
    }

    /**
     * Get security statistics
     *
     * @return array
     */
    public function getSecurityStats(): array
    {
        $recentEvents = $this->getRecentEvents(100);

        $stats = [
            'total_events' => count($recentEvents),
            'critical_events' => 0,
            'error_events' => 0,
            'warning_events' => 0,
            'categories' => [],
            'top_ips' => [],
        ];

        $ipCounts = [];

        foreach ($recentEvents as $event) {
            // Count by severity
            if (str_contains($event['event'], 'critical')) {
                $stats['critical_events']++;
            } elseif (str_contains($event['event'], 'error')) {
                $stats['error_events']++;
            } else {
                $stats['warning_events']++;
            }

            // Count by category
            $category = $event['category'];
            $stats['categories'][$category] = ($stats['categories'][$category] ?? 0) + 1;

            // Count by IP
            $ip = $event['ip_address'];
            $ipCounts[$ip] = ($ipCounts[$ip] ?? 0) + 1;
        }

        // Get top IPs
        arsort($ipCounts);
        $stats['top_ips'] = array_slice($ipCounts, 0, 10, true);

        return $stats;
    }
}
