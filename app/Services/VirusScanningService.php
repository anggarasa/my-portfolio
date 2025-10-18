<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Exception;

class VirusScanningService
{
    /**
     * Scan file for potential threats
     *
     * @param UploadedFile $file
     * @return array
     */
    public function scanFile(UploadedFile $file): array
    {
        $result = [
            'safe' => true,
            'threats' => [],
            'scan_method' => 'basic',
            'scan_time' => now()->toISOString(),
        ];

        try {
            // Basic file signature analysis
            $this->checkFileSignature($file, $result);

            // Check for suspicious patterns
            $this->checkSuspiciousPatterns($file, $result);

            // Check file size anomalies
            $this->checkFileSizeAnomalies($file, $result);

            // Check for embedded scripts
            $this->checkEmbeddedScripts($file, $result);

            // If any threats found, mark as unsafe
            if (!empty($result['threats'])) {
                $result['safe'] = false;
            }

        } catch (Exception $e) {
            Log::error('Virus scanning error: ' . $e->getMessage());
            $result['safe'] = false;
            $result['threats'][] = 'scan_error';
        }

        return $result;
    }

    /**
     * Check file signature for known threats
     *
     * @param UploadedFile $file
     * @param array $result
     * @return void
     */
    private function checkFileSignature(UploadedFile $file, array &$result): void
    {
        $filePath = $file->getPathname();
        $fileSize = filesize($filePath);

        if ($fileSize === 0) {
            $result['threats'][] = 'empty_file';
            return;
        }

        // Read file header (first 512 bytes)
        $handle = fopen($filePath, 'rb');
        if (!$handle) {
            $result['threats'][] = 'file_read_error';
            return;
        }

        $header = fread($handle, 512);
        fclose($handle);

        // Check for executable signatures
        $executableSignatures = [
            'MZ' => 'PE_executable', // Windows executable
            'ELF' => 'ELF_executable', // Linux executable
            '#!/' => 'shell_script', // Shell script
            '<?php' => 'php_script', // PHP script
            '<script' => 'javascript_script', // JavaScript
        ];

        foreach ($executableSignatures as $signature => $threat) {
            if (strpos($header, $signature) === 0) {
                $result['threats'][] = $threat;
            }
        }

        // Check for suspicious byte patterns
        $this->checkSuspiciousBytes($header, $result);
    }

    /**
     * Check for suspicious byte patterns
     *
     * @param string $header
     * @param array $result
     * @return void
     */
    private function checkSuspiciousBytes(string $header, array &$result): void
    {
        // Check for high entropy (potential encryption/packing)
        $entropy = $this->calculateEntropy($header);
        if ($entropy > 7.5) {
            $result['threats'][] = 'high_entropy';
        }

        // Check for null bytes (potential buffer overflow)
        if (strpos($header, "\x00") !== false) {
            $result['threats'][] = 'null_bytes';
        }

        // Check for suspicious strings
        $suspiciousStrings = [
            'eval(',
            'exec(',
            'system(',
            'shell_exec(',
            'passthru(',
            'file_get_contents(',
            'fopen(',
            'fwrite(',
            'base64_decode(',
            'gzinflate(',
            'str_rot13(',
        ];

        foreach ($suspiciousStrings as $string) {
            if (stripos($header, $string) !== false) {
                $result['threats'][] = 'suspicious_function_call';
                break;
            }
        }
    }

    /**
     * Check for suspicious patterns in file content
     *
     * @param UploadedFile $file
     * @param array $result
     * @return void
     */
    private function checkSuspiciousPatterns(UploadedFile $file, array &$result): void
    {
        $filename = $file->getClientOriginalName();
        $extension = strtolower($file->getClientOriginalExtension());

        // Check for double extensions
        if (preg_match('/\.(php|phtml|php3|php4|php5|pl|py|jsp|asp|sh|cgi)\.(jpg|jpeg|png|gif)$/i', $filename)) {
            $result['threats'][] = 'double_extension';
        }

        // Check for suspicious filenames
        $suspiciousNames = [
            'cmd.php',
            'shell.php',
            'backdoor.php',
            'admin.php',
            'config.php',
            'wp-config.php',
            'index.php',
        ];

        if (in_array(strtolower($filename), $suspiciousNames)) {
            $result['threats'][] = 'suspicious_filename';
        }

        // Check for very long filenames (potential buffer overflow)
        if (strlen($filename) > 255) {
            $result['threats'][] = 'filename_too_long';
        }
    }

    /**
     * Check for file size anomalies
     *
     * @param UploadedFile $file
     * @param array $result
     * @return void
     */
    private function checkFileSizeAnomalies(UploadedFile $file, array &$result): void
    {
        $fileSize = $file->getSize();
        $extension = strtolower($file->getClientOriginalExtension());

        // Check for unusually large files for their type
        $maxSizes = [
            'jpg' => 10 * 1024 * 1024, // 10MB
            'jpeg' => 10 * 1024 * 1024,
            'png' => 10 * 1024 * 1024,
            'gif' => 5 * 1024 * 1024,  // 5MB
            'svg' => 1 * 1024 * 1024,  // 1MB
            'webp' => 10 * 1024 * 1024,
        ];

        if (isset($maxSizes[$extension]) && $fileSize > $maxSizes[$extension]) {
            $result['threats'][] = 'file_too_large';
        }

        // Check for suspiciously small files (potential steganography)
        if ($fileSize < 100 && in_array($extension, ['jpg', 'jpeg', 'png'])) {
            $result['threats'][] = 'file_too_small';
        }
    }

    /**
     * Check for embedded scripts in image files
     *
     * @param UploadedFile $file
     * @param array $result
     * @return void
     */
    private function checkEmbeddedScripts(UploadedFile $file, array &$result): void
    {
        $extension = strtolower($file->getClientOriginalExtension());

        // Only check image files for embedded scripts
        if (!in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'svg'])) {
            return;
        }

        $filePath = $file->getPathname();
        $content = file_get_contents($filePath);

        // Check for PHP tags in image files
        if (strpos($content, '<?php') !== false || strpos($content, '<?=') !== false) {
            $result['threats'][] = 'embedded_php';
        }

        // Check for JavaScript in SVG files
        if ($extension === 'svg' && (strpos($content, '<script') !== false || strpos($content, 'javascript:') !== false)) {
            $result['threats'][] = 'embedded_javascript';
        }

        // Check for executable code patterns
        $executablePatterns = [
            '/eval\s*\(/i',
            '/exec\s*\(/i',
            '/system\s*\(/i',
            '/shell_exec\s*\(/i',
            '/passthru\s*\(/i',
        ];

        foreach ($executablePatterns as $pattern) {
            if (preg_match($pattern, $content)) {
                $result['threats'][] = 'embedded_executable';
                break;
            }
        }
    }

    /**
     * Calculate entropy of a string
     *
     * @param string $data
     * @return float
     */
    private function calculateEntropy(string $data): float
    {
        $length = strlen($data);
        if ($length === 0) {
            return 0;
        }

        $frequencies = [];
        for ($i = 0; $i < $length; $i++) {
            $char = $data[$i];
            $frequencies[$char] = ($frequencies[$char] ?? 0) + 1;
        }

        $entropy = 0;
        foreach ($frequencies as $frequency) {
            $probability = $frequency / $length;
            $entropy -= $probability * log($probability, 2);
        }

        return $entropy;
    }

    /**
     * Get threat description
     *
     * @param string $threat
     * @return string
     */
    public function getThreatDescription(string $threat): string
    {
        $descriptions = [
            'empty_file' => 'File is empty or corrupted',
            'file_read_error' => 'Unable to read file for scanning',
            'PE_executable' => 'Windows executable file detected',
            'ELF_executable' => 'Linux executable file detected',
            'shell_script' => 'Shell script detected',
            'php_script' => 'PHP script detected',
            'javascript_script' => 'JavaScript code detected',
            'high_entropy' => 'File has high entropy (possibly encrypted or packed)',
            'null_bytes' => 'File contains null bytes (potential buffer overflow)',
            'suspicious_function_call' => 'Suspicious function calls detected',
            'double_extension' => 'File has suspicious double extension',
            'suspicious_filename' => 'File has suspicious filename',
            'filename_too_long' => 'Filename is too long',
            'file_too_large' => 'File size exceeds normal limits for this file type',
            'file_too_small' => 'File size is suspiciously small',
            'embedded_php' => 'PHP code embedded in image file',
            'embedded_javascript' => 'JavaScript code embedded in SVG file',
            'embedded_executable' => 'Executable code embedded in file',
            'scan_error' => 'Error occurred during file scanning',
        ];

        return $descriptions[$threat] ?? 'Unknown threat detected';
    }

    /**
     * Check if file should be quarantined
     *
     * @param array $scanResult
     * @return bool
     */
    public function shouldQuarantine(array $scanResult): bool
    {
        $criticalThreats = [
            'PE_executable',
            'ELF_executable',
            'shell_script',
            'php_script',
            'embedded_php',
            'embedded_javascript',
            'embedded_executable',
        ];

        foreach ($scanResult['threats'] as $threat) {
            if (in_array($threat, $criticalThreats)) {
                return true;
            }
        }

        return false;
    }
}
