<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->can('manage-projects');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'long_description' => 'nullable|string|max:5000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'images' => 'nullable|array|max:10',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'technologies' => 'nullable|array|max:20',
            'technologies.*' => 'string|max:50',
            'category' => 'required|string|max:255',
            'github_url' => 'nullable|url|max:500',
            'live_url' => 'nullable|url|max:500',
            'duration' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:4',
            'role' => 'nullable|string|max:255',
            'challenges' => 'nullable|array|max:10',
            'challenges.*' => 'string|max:1000',
            'solutions' => 'nullable|array|max:10',
            'solutions.*' => 'string|max:1000',
            'features' => 'nullable|array|max:20',
            'features.*' => 'string|max:500',
            'demo_accounts' => 'nullable|array|max:5',
            'demo_accounts.*' => 'string|max:500',
            'testimonial' => 'nullable|array',
            'status' => 'required|in:draft,published,archived',
            'sort_order' => 'nullable|integer|min:0|max:9999',
            'featured' => 'boolean',
        ];
    }
}
