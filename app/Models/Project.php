<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'description',
        'long_description',
        'image',
        'images',
        'technologies',
        'category',
        'github_url',
        'live_url',
        'duration',
        'year',
        'role',
        'challenges',
        'solutions',
        'features',
        'demo_accounts',
        'testimonial',
        'status',
        'sort_order',
        'featured',
    ];

    protected $casts = [
        'images' => 'array',
        'technologies' => 'array',
        'challenges' => 'array',
        'solutions' => 'array',
        'features' => 'array',
        'demo_accounts' => 'array',
        'testimonial' => 'array',
        'featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }

    /**
     * Get the image URL attribute
     */
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset('storage/projects/' . $this->image);
        }
        return null;
    }

    /**
     * Get the images URLs attribute
     */
    public function getImagesUrlsAttribute()
    {
        if ($this->images) {
            return array_map(function ($image) {
                return asset('storage/projects/' . $image);
            }, $this->images);
        }
        return [];
    }
}
