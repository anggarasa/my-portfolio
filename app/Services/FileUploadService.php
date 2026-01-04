<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Cloudinary\Cloudinary;
use Cloudinary\Configuration\Configuration;
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
     * Cloudinary instance
     */
    private ?Cloudinary $cloudinary = null;

    /**
     * Get Cloudinary instance
     */
    private function getCloudinary(): Cloudinary
    {
        if ($this->cloudinary === null) {
            $cloudinaryUrl = env('CLOUDINARY_URL');

            if (!$cloudinaryUrl) {
                throw new Exception('CLOUDINARY_URL tidak dikonfigurasi di file .env');
            }

            $this->cloudinary = new Cloudinary($cloudinaryUrl);
        }

        return $this->cloudinary;
    }

    /**
     * Upload and validate an image file to Cloudinary
     *
     * @param UploadedFile $file
     * @param string $directory
     * @param string|null $oldFileUrl
     * @return string|null Returns the Cloudinary URL
     * @throws Exception
     */
    public function uploadImage(UploadedFile $file, string $directory = 'uploads', ?string $oldFileUrl = null): ?string
    {
        // Basic validation only
        $this->validateImageFile($file);

        // Generate public_id for Cloudinary
        $publicId = $this->generatePublicId($directory);

        try {
            // Upload to Cloudinary using SDK directly
            $result = $this->getCloudinary()->uploadApi()->upload($file->getRealPath(), [
                'folder' => $directory,
                'public_id' => $publicId,
                'resource_type' => 'image',
                'transformation' => [
                    'quality' => 'auto',
                    'fetch_format' => 'auto',
                ],
            ]);

            // Delete old file from Cloudinary if provided
            if ($oldFileUrl) {
                $this->deleteFromCloudinary($oldFileUrl);
            }

            return $result['secure_url'];
        } catch (Exception $e) {
            throw new Exception('Gagal mengupload gambar ke Cloudinary: ' . $e->getMessage());
        }
    }

    /**
     * Upload multiple image files to Cloudinary
     *
     * @param array $files
     * @param string $directory
     * @param array|null $oldFileUrls
     * @return array Returns array of Cloudinary URLs
     * @throws Exception
     */
    public function uploadMultipleImages(array $files, string $directory = 'uploads', ?array $oldFileUrls = null): array
    {
        $uploadedUrls = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $url = $this->uploadImage($file, $directory);
                if ($url) {
                    $uploadedUrls[] = $url;
                }
            }
        }

        // Delete old files from Cloudinary if provided
        if ($oldFileUrls) {
            foreach ($oldFileUrls as $oldFileUrl) {
                $this->deleteFromCloudinary($oldFileUrl);
            }
        }

        return $uploadedUrls;
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
     * Generate public_id for Cloudinary
     *
     * @param string $directory
     * @return string
     */
    private function generatePublicId(string $directory): string
    {
        $timestamp = time();
        $randomString = Str::random(16);

        return "{$timestamp}_{$randomString}";
    }

    /**
     * Extract public_id from Cloudinary URL
     *
     * @param string $url
     * @return string|null
     */
    private function extractPublicIdFromUrl(string $url): ?string
    {
        // Skip if not a Cloudinary URL
        if (!str_contains($url, 'cloudinary.com') && !str_contains($url, 'res.cloudinary.com')) {
            return null;
        }

        // Extract public_id from URL
        // Example: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/projects/1234567890_abcdef.jpg
        $pattern = '/\/v\d+\/(.+?)(?:\.[a-zA-Z]+)?$/';
        if (preg_match($pattern, $url, $matches)) {
            return $matches[1];
        }

        return null;
    }

    /**
     * Delete file from Cloudinary
     *
     * @param string $url
     * @return bool
     */
    private function deleteFromCloudinary(string $url): bool
    {
        $publicId = $this->extractPublicIdFromUrl($url);

        if (!$publicId) {
            return false;
        }

        try {
            $this->getCloudinary()->uploadApi()->destroy($publicId);
            return true;
        } catch (Exception $e) {
            // Log error but don't throw - deletion failure shouldn't break the upload
            return false;
        }
    }

    /**
     * Delete file safely (supports both Cloudinary URLs and legacy local paths)
     *
     * @param string $filePath
     * @param string $disk
     * @return bool
     */
    public function deleteFile(string $filePath, string $disk = 'public'): bool
    {
        // Check if it's a Cloudinary URL
        if (str_contains($filePath, 'cloudinary.com') || str_contains($filePath, 'res.cloudinary.com')) {
            return $this->deleteFromCloudinary($filePath);
        }

        // Legacy: Handle local storage deletion
        if (\Illuminate\Support\Facades\Storage::disk($disk)->exists($filePath)) {
            return \Illuminate\Support\Facades\Storage::disk($disk)->delete($filePath);
        }

        return false;
    }

    /**
     * Get file info (for Cloudinary URLs, returns basic info)
     *
     * @param string $filePath
     * @param string $disk
     * @return array|null
     */
    public function getFileInfo(string $filePath, string $disk = 'public'): ?array
    {
        // For Cloudinary URLs, return basic info
        if (str_contains($filePath, 'cloudinary.com') || str_contains($filePath, 'res.cloudinary.com')) {
            return [
                'path' => $filePath,
                'type' => 'cloudinary',
            ];
        }

        // Legacy: Handle local storage
        if (!\Illuminate\Support\Facades\Storage::disk($disk)->exists($filePath)) {
            return null;
        }

        return [
            'path' => $filePath,
            'size' => \Illuminate\Support\Facades\Storage::disk($disk)->size($filePath),
            'mime_type' => mime_content_type(\Illuminate\Support\Facades\Storage::disk($disk)->path($filePath)),
            'last_modified' => \Illuminate\Support\Facades\Storage::disk($disk)->lastModified($filePath),
            'type' => 'local',
        ];
    }
}
