<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
        // Basic validation only
        $this->validateImageFile($file);

        // Generate secure filename
        $fileName = $this->generateSecureFileName($file);

        // Store file
        $file->storeAs($directory, $fileName, 'public');

        // Delete old file if provided
        if ($oldFileName && Storage::disk('public')->exists($directory . '/' . $oldFileName)) {
            Storage::disk('public')->delete($directory . '/' . $oldFileName);
        }

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
     * Validate image file - Basic validation only
     *
     * @param UploadedFile $file
     * @throws Exception
     */
    private function validateImageFile(UploadedFile $file): void
    {
        // Check file size
        if ($file->getSize() > self::MAX_FILE_SIZE) {
            throw new Exception('Ukuran file terlalu besar. Maksimal 2MB.');
        }

        // Check MIME type
        $mimeType = $file->getMimeType();
        if (!in_array($mimeType, self::ALLOWED_IMAGE_MIMES)) {
            throw new Exception('Format file tidak didukung. Hanya JPEG, PNG, GIF, SVG, dan WebP yang diperbolehkan.');
        }

        // Check file extension
        $extension = strtolower($file->getClientOriginalExtension());
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];

        if (!in_array($extension, $allowedExtensions)) {
            throw new Exception('Ekstensi file tidak diperbolehkan.');
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
            'mime_type' => mime_content_type(Storage::disk($disk)->path($filePath)),
            'last_modified' => Storage::disk($disk)->lastModified($filePath),
        ];
    }

}
