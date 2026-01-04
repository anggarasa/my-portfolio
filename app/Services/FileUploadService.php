<?php

namespace App\Services;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Check if Cloudinary is configured and available
     */
    protected function isCloudinaryEnabled(): bool
    {
        return !empty(config('cloudinary.cloud_url')) || !empty(env('CLOUDINARY_URL'));
    }

    /**
     * Upload a single image
     *
     * @param UploadedFile $file
     * @param string $folder
     * @param string|null $oldImage Path to delete after successful upload
     * @return string The URL or path of the uploaded image
     */
    public function uploadImage(UploadedFile $file, string $folder = 'uploads', ?string $oldImage = null): string
    {
        // Validate file is actually an image
        $this->validateImage($file);

        try {
            if ($this->isCloudinaryEnabled()) {
                $result = $this->uploadToCloudinary($file, $folder);

                // Delete old image from Cloudinary if exists
                if ($oldImage && $this->isCloudinaryUrl($oldImage)) {
                    $this->deleteFromCloudinary($oldImage);
                }

                return $result;
            } else {
                $result = $this->uploadToLocal($file, $folder);

                // Delete old local image if exists
                if ($oldImage && !$this->isCloudinaryUrl($oldImage)) {
                    $this->deleteLocalFile($folder . '/' . $oldImage);
                }

                return $result;
            }
        } catch (\Exception $e) {
            Log::error('Image upload failed: ' . $e->getMessage());
            throw new \Exception('Failed to upload image: ' . $e->getMessage());
        }
    }

    /**
     * Upload multiple images
     *
     * @param array $files
     * @param string $folder
     * @param array|null $oldImages
     * @return array
     */
    public function uploadMultipleImages(array $files, string $folder = 'uploads', ?array $oldImages = null): array
    {
        $uploadedImages = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $uploadedImages[] = $this->uploadImage($file, $folder);
            }
        }

        // Delete old images if provided and new ones were uploaded successfully
        if ($oldImages && count($uploadedImages) > 0) {
            foreach ($oldImages as $oldImage) {
                $this->deleteFile($folder . '/' . $oldImage);
            }
        }

        return $uploadedImages;
    }

    /**
     * Delete a file (supports both Cloudinary and local storage)
     *
     * @param string $path
     * @return bool
     */
    public function deleteFile(string $path): bool
    {
        try {
            if ($this->isCloudinaryUrl($path)) {
                return $this->deleteFromCloudinary($path);
            } else {
                return $this->deleteLocalFile($path);
            }
        } catch (\Exception $e) {
            Log::warning('Failed to delete file: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Upload file to Cloudinary
     */
    protected function uploadToCloudinary(UploadedFile $file, string $folder): string
    {
        $result = Cloudinary::upload($file->getRealPath(), [
            'folder' => 'portfolio/' . $folder,
            'resource_type' => 'image',
            'transformation' => [
                'quality' => 'auto',
                'fetch_format' => 'auto',
            ],
        ]);

        return $result->getSecurePath();
    }

    /**
     * Upload file to local storage
     */
    protected function uploadToLocal(UploadedFile $file, string $folder): string
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs($folder, $filename, 'public');

        return $filename;
    }

    /**
     * Delete file from Cloudinary
     */
    protected function deleteFromCloudinary(string $url): bool
    {
        try {
            // Extract public_id from Cloudinary URL
            $publicId = $this->extractCloudinaryPublicId($url);
            if ($publicId) {
                Cloudinary::destroy($publicId);
                return true;
            }
        } catch (\Exception $e) {
            Log::warning('Failed to delete from Cloudinary: ' . $e->getMessage());
        }

        return false;
    }

    /**
     * Delete file from local storage
     */
    protected function deleteLocalFile(string $path): bool
    {
        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }

        return false;
    }

    /**
     * Check if a URL is a Cloudinary URL
     */
    protected function isCloudinaryUrl(string $url): bool
    {
        return Str::contains($url, ['cloudinary.com', 'res.cloudinary']);
    }

    /**
     * Extract Cloudinary public ID from URL
     */
    protected function extractCloudinaryPublicId(string $url): ?string
    {
        // Parse the Cloudinary URL to extract public_id
        // Example: https://res.cloudinary.com/xxx/image/upload/v123/portfolio/projects/abc.jpg
        if (preg_match('/\/v\d+\/(.+)\.\w+$/', $url, $matches)) {
            return $matches[1];
        }

        return null;
    }

    /**
     * Validate that the file is a valid image
     */
    protected function validateImage(UploadedFile $file): void
    {
        $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        $maxSize = 2048 * 1024; // 2MB

        if (!in_array($file->getMimeType(), $allowedMimes)) {
            throw new \Exception('Invalid image type. Allowed: jpeg, png, gif, webp, svg');
        }

        if ($file->getSize() > $maxSize) {
            throw new \Exception('Image size exceeds maximum allowed size of 2MB');
        }

        // Additional security check - verify file is actually an image
        if (!@getimagesize($file->getRealPath()) && $file->getMimeType() !== 'image/svg+xml') {
            throw new \Exception('File does not appear to be a valid image');
        }
    }
}
