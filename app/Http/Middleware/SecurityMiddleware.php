<?php

namespace App\Http\Middleware;

use App\Services\SecurityEventLogger;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityMiddleware
{
    protected $securityLogger;

    public function __construct(SecurityEventLogger $securityLogger)
    {
        $this->securityLogger = $securityLogger;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check for suspicious patterns in request
        $this->checkSuspiciousPatterns($request);

        // Check for potential SQL injection attempts
        $this->checkSqlInjectionAttempts($request);

        // Check for potential XSS attempts
        $this->checkXssAttempts($request);

        // Check for suspicious user agents
        $this->checkSuspiciousUserAgent($request);

        // Check for potential CSRF bypass attempts
        $this->checkCsrfBypassAttempts($request);

        $response = $next($request);

        // Add security headers
        $this->addSecurityHeaders($response);

        return $response;
    }

    /**
     * Check for suspicious patterns in request
     */
    private function checkSuspiciousPatterns(Request $request): void
    {
        $suspiciousPatterns = [
            '/\.\.\//', // Directory traversal
            '/<script/i', // Script tags
            '/javascript:/i', // JavaScript URLs
            '/vbscript:/i', // VBScript URLs
            '/data:/i', // Data URLs
            '/eval\s*\(/i', // Eval function
            '/exec\s*\(/i', // Exec function
            '/system\s*\(/i', // System function
            '/shell_exec\s*\(/i', // Shell exec function
            '/passthru\s*\(/i', // Passthru function
            '/file_get_contents\s*\(/i', // File get contents
            '/fopen\s*\(/i', // Fopen function
            '/fwrite\s*\(/i', // Fwrite function
            '/base64_decode\s*\(/i', // Base64 decode
            '/gzinflate\s*\(/i', // Gzinflate function
            '/str_rot13\s*\(/i', // Str rot13 function
        ];

        $allInput = array_merge(
            $request->all(),
            $request->query(),
            $request->headers->all()
        );

        foreach ($suspiciousPatterns as $pattern) {
            foreach ($allInput as $key => $value) {
                if (is_string($value) && preg_match($pattern, $value)) {
                    $this->securityLogger->logSuspiciousActivity('suspicious_pattern_detected', [
                        'pattern' => $pattern,
                        'input_key' => $key,
                        'input_value' => substr($value, 0, 100), // Limit logged value
                        'url' => $request->fullUrl(),
                        'method' => $request->method(),
                    ]);
                    break 2; // Break both loops
                }
            }
        }
    }

    /**
     * Check for SQL injection attempts
     */
    private function checkSqlInjectionAttempts(Request $request): void
    {
        $sqlPatterns = [
            '/union\s+select/i',
            '/select\s+.*\s+from/i',
            '/insert\s+into/i',
            '/update\s+.*\s+set/i',
            '/delete\s+from/i',
            '/drop\s+table/i',
            '/truncate\s+table/i',
            '/alter\s+table/i',
            '/create\s+table/i',
            '/exec\s*\(/i',
            '/sp_executesql/i',
            '/xp_cmdshell/i',
            '/load_file\s*\(/i',
            '/into\s+outfile/i',
            '/into\s+dumpfile/i',
        ];

        $allInput = array_merge(
            $request->all(),
            $request->query()
        );

        foreach ($sqlPatterns as $pattern) {
            foreach ($allInput as $key => $value) {
                if (is_string($value) && preg_match($pattern, $value)) {
                    $this->securityLogger->logSuspiciousActivity('sql_injection_attempt', [
                        'pattern' => $pattern,
                        'input_key' => $key,
                        'input_value' => substr($value, 0, 100),
                        'url' => $request->fullUrl(),
                        'method' => $request->method(),
                    ]);
                    break 2;
                }
            }
        }
    }

    /**
     * Check for XSS attempts
     */
    private function checkXssAttempts(Request $request): void
    {
        $xssPatterns = [
            '/<script[^>]*>.*?<\/script>/is',
            '/<iframe[^>]*>.*?<\/iframe>/is',
            '/<object[^>]*>.*?<\/object>/is',
            '/<embed[^>]*>.*?<\/embed>/is',
            '/<applet[^>]*>.*?<\/applet>/is',
            '/<form[^>]*>.*?<\/form>/is',
            '/<input[^>]*>/i',
            '/<textarea[^>]*>.*?<\/textarea>/is',
            '/<select[^>]*>.*?<\/select>/is',
            '/<option[^>]*>.*?<\/option>/is',
            '/<link[^>]*>/i',
            '/<meta[^>]*>/i',
            '/<style[^>]*>.*?<\/style>/is',
            '/<link[^>]*>/i',
            '/javascript:/i',
            '/vbscript:/i',
            '/onload\s*=/i',
            '/onerror\s*=/i',
            '/onclick\s*=/i',
            '/onmouseover\s*=/i',
            '/onfocus\s*=/i',
            '/onblur\s*=/i',
            '/onchange\s*=/i',
            '/onsubmit\s*=/i',
            '/onreset\s*=/i',
            '/onselect\s*=/i',
            '/onunload\s*=/i',
        ];

        $allInput = array_merge(
            $request->all(),
            $request->query()
        );

        foreach ($xssPatterns as $pattern) {
            foreach ($allInput as $key => $value) {
                if (is_string($value) && preg_match($pattern, $value)) {
                    $this->securityLogger->logSuspiciousActivity('xss_attempt', [
                        'pattern' => $pattern,
                        'input_key' => $key,
                        'input_value' => substr($value, 0, 100),
                        'url' => $request->fullUrl(),
                        'method' => $request->method(),
                    ]);
                    break 2;
                }
            }
        }
    }

    /**
     * Check for suspicious user agents
     */
    private function checkSuspiciousUserAgent(Request $request): void
    {
        $userAgent = $request->userAgent();

        if (empty($userAgent)) {
            $this->securityLogger->logSuspiciousActivity('empty_user_agent', [
                'url' => $request->fullUrl(),
                'method' => $request->method(),
            ]);
            return;
        }

        $suspiciousUserAgents = [
            '/sqlmap/i',
            '/nikto/i',
            '/nmap/i',
            '/masscan/i',
            '/zap/i',
            '/burp/i',
            '/wget/i',
            '/curl/i',
            '/python/i',
            '/perl/i',
            '/php/i',
            '/java/i',
            '/scanner/i',
            '/bot/i',
            '/crawler/i',
            '/spider/i',
        ];

        foreach ($suspiciousUserAgents as $pattern) {
            if (preg_match($pattern, $userAgent)) {
                $this->securityLogger->logSuspiciousActivity('suspicious_user_agent', [
                    'user_agent' => $userAgent,
                    'pattern' => $pattern,
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                ]);
                break;
            }
        }
    }

    /**
     * Check for CSRF bypass attempts
     */
    private function checkCsrfBypassAttempts(Request $request): void
    {
        if ($request->isMethod('POST') || $request->isMethod('PUT') || $request->isMethod('PATCH') || $request->isMethod('DELETE')) {
            $token = $request->input('_token');

            if (empty($token)) {
                $this->securityLogger->logSuspiciousActivity('csrf_token_missing', [
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                ]);
            }
        }
    }

    /**
     * Add security headers to response
     */
    private function addSecurityHeaders(Response $response): void
    {
        $headers = config('security.headers', []);

        foreach ($headers as $header => $value) {
            if (!empty($value)) {
                $response->headers->set($header, $value);
            }
        }

        // Add Content Security Policy if enabled
        if (config('security.csp.enabled', true)) {
            $cspDirectives = config('security.csp.directives', []);
            $cspString = $this->buildCspString($cspDirectives);

            if (!empty($cspString)) {
                $response->headers->set('Content-Security-Policy', $cspString);
            }
        }
    }

    /**
     * Build Content Security Policy string
     */
    private function buildCspString(array $directives): string
    {
        $cspParts = [];

        foreach ($directives as $directive => $sources) {
            if (is_array($sources)) {
                $cspParts[] = $directive . ' ' . implode(' ', $sources);
            } else {
                $cspParts[] = $directive . ' ' . $sources;
            }
        }

        return implode('; ', $cspParts);
    }
}
