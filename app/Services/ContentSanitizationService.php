<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class ContentSanitizationService
{
    /**
     * Sanitize text content for safe display
     *
     * @param string $content
     * @param int $maxLength
     * @param bool $stripTags
     * @return string
     */
    public function sanitizeText(string $content, int $maxLength = 1000, bool $stripTags = true): string
    {
        // Remove or escape potentially dangerous content
        $sanitized = $content;

        if ($stripTags) {
            // Remove HTML tags but preserve basic formatting
            $sanitized = strip_tags($sanitized, '<p><br><strong><em><ul><ol><li>');
        }

        // Remove potentially dangerous characters
        $sanitized = $this->removeDangerousCharacters($sanitized);

        // Limit length
        if (strlen($sanitized) > $maxLength) {
            $sanitized = Str::limit($sanitized, $maxLength);
        }

        return trim($sanitized);
    }

    /**
     * Sanitize HTML content for safe display
     *
     * @param string $html
     * @param array $allowedTags
     * @return string
     */
    public function sanitizeHtml(string $html, array $allowedTags = null): string
    {
        if ($allowedTags === null) {
            $allowedTags = [
                'p', 'br', 'strong', 'em', 'b', 'i', 'u',
                'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'a', 'img', 'blockquote', 'code', 'pre'
            ];
        }

        // Convert allowed tags to string format for strip_tags
        $allowedTagsString = '<' . implode('><', $allowedTags) . '>';

        // Strip dangerous tags
        $sanitized = strip_tags($html, $allowedTagsString);

        // Remove dangerous attributes
        $sanitized = $this->removeDangerousAttributes($sanitized);

        return $sanitized;
    }

    /**
     * Sanitize URL for safe use
     *
     * @param string $url
     * @return string|null
     */
    public function sanitizeUrl(string $url): ?string
    {
        // Remove whitespace
        $url = trim($url);

        // Validate URL format
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return null;
        }

        // Check for dangerous protocols
        $parsedUrl = parse_url($url);
        if (!$parsedUrl || !isset($parsedUrl['scheme'])) {
            return null;
        }

        $allowedSchemes = ['http', 'https', 'mailto'];
        if (!in_array(strtolower($parsedUrl['scheme']), $allowedSchemes)) {
            return null;
        }

        // Additional security checks
        if ($this->isDangerousUrl($url)) {
            return null;
        }

        return $url;
    }

    /**
     * Sanitize email address
     *
     * @param string $email
     * @return string|null
     */
    public function sanitizeEmail(string $email): ?string
    {
        $email = trim(strtolower($email));

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return null;
        }

        // Additional checks for suspicious patterns
        if ($this->isSuspiciousEmail($email)) {
            return null;
        }

        return $email;
    }

    /**
     * Sanitize file name for safe storage
     *
     * @param string $filename
     * @return string
     */
    public function sanitizeFilename(string $filename): string
    {
        // Remove path traversal attempts
        $filename = basename($filename);

        // Remove dangerous characters
        $filename = preg_replace('/[^a-zA-Z0-9._-]/', '_', $filename);

        // Remove multiple dots
        $filename = preg_replace('/\.{2,}/', '.', $filename);

        // Ensure it doesn't start with a dot
        $filename = ltrim($filename, '.');

        // Limit length
        if (strlen($filename) > 255) {
            $extension = pathinfo($filename, PATHINFO_EXTENSION);
            $nameWithoutExt = pathinfo($filename, PATHINFO_FILENAME);
            $filename = Str::limit($nameWithoutExt, 255 - strlen($extension) - 1) . '.' . $extension;
        }

        return $filename ?: 'unnamed_file';
    }

    /**
     * Sanitize array of strings
     *
     * @param array $data
     * @param int $maxLength
     * @return array
     */
    public function sanitizeArray(array $data, int $maxLength = 1000): array
    {
        $sanitized = [];

        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $sanitized[$key] = $this->sanitizeText($value, $maxLength);
            } elseif (is_array($value)) {
                $sanitized[$key] = $this->sanitizeArray($value, $maxLength);
            } else {
                $sanitized[$key] = $value;
            }
        }

        return $sanitized;
    }

    /**
     * Remove dangerous characters from content
     *
     * @param string $content
     * @return string
     */
    private function removeDangerousCharacters(string $content): string
    {
        // Remove null bytes
        $content = str_replace("\0", '', $content);

        // Remove control characters except newlines and tabs
        $content = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $content);

        // Remove potentially dangerous script patterns
        $dangerousPatterns = [
            '/javascript:/i',
            '/vbscript:/i',
            '/data:/i',
            '/on\w+\s*=/i', // Remove event handlers like onclick=
        ];

        foreach ($dangerousPatterns as $pattern) {
            $content = preg_replace($pattern, '', $content);
        }

        return $content;
    }

    /**
     * Remove dangerous attributes from HTML
     *
     * @param string $html
     * @return string
     */
    private function removeDangerousAttributes(string $html): string
    {
        $dangerousAttributes = [
            'onload', 'onerror', 'onclick', 'onmouseover', 'onfocus', 'onblur',
            'onchange', 'onsubmit', 'onreset', 'onselect', 'onunload'
        ];

        foreach ($dangerousAttributes as $attr) {
            $html = preg_replace('/\s+' . $attr . '\s*=\s*["\'][^"\']*["\']/', '', $html);
        }

        return $html;
    }

    /**
     * Check if URL is potentially dangerous
     *
     * @param string $url
     * @return bool
     */
    private function isDangerousUrl(string $url): bool
    {
        $dangerousPatterns = [
            '/javascript:/i',
            '/vbscript:/i',
            '/data:/i',
            '/file:/i',
            '/ftp:/i',
        ];

        foreach ($dangerousPatterns as $pattern) {
            if (preg_match($pattern, $url)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if email is suspicious
     *
     * @param string $email
     * @return bool
     */
    private function isSuspiciousEmail(string $email): bool
    {
        $suspiciousPatterns = [
            '/\.(exe|bat|cmd|scr|pif)$/i',
            '/[<>"\']/',
            '/\.{2,}/',
        ];

        foreach ($suspiciousPatterns as $pattern) {
            if (preg_match($pattern, $email)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Log security events
     *
     * @param string $event
     * @param array $data
     * @return void
     */
    public function logSecurityEvent(string $event, array $data = []): void
    {
        Log::warning('Security Event: ' . $event, array_merge([
            'timestamp' => now()->toISOString(),
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'user_id' => auth()->id(),
        ], $data));
    }
}
