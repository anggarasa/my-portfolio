<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Services\VirusScanningService;
use App\Services\SecurityEventLogger;
use Exception;

class FileUploadService
{
    /**
     * Allowed MIME types for images
     */
    private const ALLOWED_IMAGE_MIMES = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/svg+xml',
        'image/webp'
    ];

    /**
     * Maximum file size in bytes (2MB)
     */
    private const MAX_FILE_SIZE = 2048 * 1024;

    /**
     * Upload and validate an image file
     *
     * @param UploadedFile $file
     * @param string $directory
     * @param string|null $oldFileName
     * @return string|null
     * @throws Exception
     */
    public function uploadImage(UploadedFile $file, string $directory = 'uploads', ?string $oldFileName = null): ?string
    {
        // Validate file
        $this->validateImageFile($file);

        // Scan for viruses
        $virusScanner = app(VirusScanningService::class);
        $scanResult = $virusScanner->scanFile($file);

        if (!$scanResult['safe']) {
            // Log security event
            $securityLogger = app(SecurityEventLogger::class);
            $securityLogger->logFileUploadEvent('virus_detected', [
                'filename' => $file->getClientOriginalName(),
                'threats' => $scanResult['threats'],
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
            ]);

            throw new Exception('File rejected due to security threats: ' . implode(', ', $scanResult['threats']));
        }

        // Generate secure filename
        $fileName = $this->generateSecureFileName($file);

        // Store file
        $file->storeAs($directory, $fileName, 'public');

        // Delete old file if provided
        if ($oldFileName && Storage::disk('public')->exists($directory . '/' . $oldFileName)) {
            Storage::disk('public')->delete($directory . '/' . $oldFileName);
        }

        // Log successful upload
        $securityLogger = app(SecurityEventLogger::class);
        $securityLogger->logFileUploadEvent('file_uploaded', [
            'filename' => $fileName,
            'original_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ]);

        return $fileName;
    }

    /**
     * Upload multiple image files
     *
     * @param array $files
     * @param string $directory
     * @param array|null $oldFileNames
     * @return array
     * @throws Exception
     */
    public function uploadMultipleImages(array $files, string $directory = 'uploads', ?array $oldFileNames = null): array
    {
        $uploadedFiles = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $fileName = $this->uploadImage($file, $directory);
                if ($fileName) {
                    $uploadedFiles[] = $fileName;
                }
            }
        }

        // Delete old files if provided
        if ($oldFileNames) {
            foreach ($oldFileNames as $oldFileName) {
                if (Storage::disk('public')->exists($directory . '/' . $oldFileName)) {
                    Storage::disk('public')->delete($directory . '/' . $oldFileName);
                }
            }
        }

        return $uploadedFiles;
    }

    /**
     * Validate image file
     *
     * @param UploadedFile $file
     * @throws Exception
     */
    private function validateImageFile(UploadedFile $file): void
    {
        // Check file size
        if ($file->getSize() > self::MAX_FILE_SIZE) {
            throw new Exception('File size exceeds maximum allowed size of 2MB.');
        }

        // Check MIME type
        $mimeType = $file->getMimeType();
        if (!in_array($mimeType, self::ALLOWED_IMAGE_MIMES)) {
            throw new Exception('Invalid file type. Only JPEG, PNG, GIF, SVG, and WebP images are allowed.');
        }

        // Additional content validation
        $this->validateImageContent($file);

        // Check for suspicious file extensions
        $this->validateFileExtension($file);
    }

    /**
     * Validate image content using finfo
     *
     * @param UploadedFile $file
     * @throws Exception
     */
    private function validateImageContent(UploadedFile $file): void
    {
        if (!extension_loaded('fileinfo')) {
            return; // Skip if fileinfo extension is not available
        }

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $detectedMimeType = finfo_file($finfo, $file->getPathname());
        finfo_close($finfo);

        if (!in_array($detectedMimeType, self::ALLOWED_IMAGE_MIMES)) {
            throw new Exception('File content does not match the declared file type.');
        }
    }

    /**
     * Validate file extension
     *
     * @param UploadedFile $file
     * @throws Exception
     */
    private function validateFileExtension(UploadedFile $file): void
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];

        if (!in_array($extension, $allowedExtensions)) {
            throw new Exception('Invalid file extension.');
        }

        // Check for double extensions (e.g., image.jpg.php)
        $filename = strtolower($file->getClientOriginalName());
        $parts = explode('.', $filename);

        if (count($parts) > 2) {
            // Check if any part after the first dot is a dangerous extension
            $dangerousExtensions = ['php', 'phtml', 'php3', 'php4', 'php5', 'pl', 'py', 'jsp', 'asp', 'sh', 'cgi'];
            for ($i = 1; $i < count($parts); $i++) {
                if (in_array($parts[$i], $dangerousExtensions)) {
                    throw new Exception('File contains potentially dangerous extension.');
                }
            }
        }
    }

    /**
     * Generate secure filename
     *
     * @param UploadedFile $file
     * @return string
     */
    private function generateSecureFileName(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        $timestamp = time();
        $randomString = Str::random(16);

        return "{$timestamp}_{$randomString}.{$extension}";
    }

    /**
     * Delete file safely
     *
     * @param string $filePath
     * @param string $disk
     * @return bool
     */
    public function deleteFile(string $filePath, string $disk = 'public'): bool
    {
        if (Storage::disk($disk)->exists($filePath)) {
            return Storage::disk($disk)->delete($filePath);
        }

        return false;
    }

    /**
     * Get file info safely
     *
     * @param string $filePath
     * @param string $disk
     * @return array|null
     */
    public function getFileInfo(string $filePath, string $disk = 'public'): ?array
    {
        if (!Storage::disk($disk)->exists($filePath)) {
            return null;
        }

        return [
            'path' => $filePath,
            'size' => Storage::disk($disk)->size($filePath),
            'mime_type' => Storage::disk($disk)->getMimeType($filePath),
            'last_modified' => Storage::disk($disk)->lastModified($filePath),
        ];
    }
}
