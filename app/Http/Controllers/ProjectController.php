<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Services\SeoService;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    protected $seoService;
    protected $fileUploadService;

    public function __construct(SeoService $seoService, FileUploadService $fileUploadService)
    {
        $this->seoService = $seoService;
        $this->fileUploadService = $fileUploadService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Project::query();

        // Filter by category
        if ($request->has('category') && $request->category && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        // Filter by status
        if ($request->has('status') && $request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        } else {
            $query->published();
        }

        // Search
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('category', 'like', '%' . $request->search . '%');
            });
        }

        $projects = $query->ordered()->paginate(12);

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
            'filters' => $request->only(['category', 'status', 'search']),
            'categories' => Project::distinct()->pluck('category')->filter()->values(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/projects/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'long_description' => 'nullable|string|max:5000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'images' => 'nullable|array|max:10',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
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
        ]);

        try {
            // Handle main image upload with security validation
            if ($request->hasFile('image')) {
                $validated['image'] = $this->fileUploadService->uploadImage($request->file('image'), 'projects');
            }

            // Handle additional images upload with security validation
            if ($request->hasFile('images')) {
                $validated['images'] = $this->fileUploadService->uploadMultipleImages($request->file('images'), 'projects');
            }

            Project::create($validated);

            return redirect()->route('admin.projects.index')
                ->with('success', 'Project created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['file_upload' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return Inertia::render('admin/projects/show', [
            'project' => $project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        // Define validation rules
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'long_description' => 'nullable|string|max:5000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'images' => 'nullable|array|max:10',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
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

        // Only validate fields that are present in the request
        $fieldsToValidate = [];
        foreach ($rules as $field => $rule) {
            if ($request->has($field) || $request->hasFile($field)) {
                $fieldsToValidate[$field] = $rule;
            }
        }

        // If no fields to validate, return success (nothing to update)
        if (empty($fieldsToValidate)) {
            return redirect()->route('admin.projects.index')
                ->with('success', 'Project updated successfully.');
        }

        $validated = $request->validate($fieldsToValidate);

        try {
            // Handle main image upload with security validation
            if ($request->hasFile('image')) {
                $validated['image'] = $this->fileUploadService->uploadImage(
                    $request->file('image'),
                    'projects',
                    $project->image
                );
            }

            // Handle additional images upload with security validation
            if ($request->hasFile('images')) {
                $validated['images'] = $this->fileUploadService->uploadMultipleImages(
                    $request->file('images'),
                    'projects',
                    $project->images
                );
            }

            $project->update($validated);

            return redirect()->route('admin.projects.index')
                ->with('success', 'Project updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['file_upload' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        try {
            // Delete associated main image if exists
            if ($project->image) {
                $this->fileUploadService->deleteFile('projects/' . $project->image);
            }

            // Delete associated additional images if exist
            if ($project->images) {
                foreach ($project->images as $image) {
                    $this->fileUploadService->deleteFile('projects/' . $image);
                }
            }

            $project->delete();

            return redirect()->route('admin.projects.index')
                ->with('success', 'Project deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['delete_error' => 'Failed to delete project: ' . $e->getMessage()]);
        }
    }

    /**
     * Display welcome page with projects
     */
    public function welcome()
    {
        $projects = Project::published()->ordered()->get();

        // Transform projects to include proper image URLs
        $projects->transform(function ($project) {
            $project->image_url = $project->getImageUrlAttribute();
            $project->images_urls = $project->getImagesUrlsAttribute();
            return $project;
        });

        // Generate SEO data
        $seoData = $this->seoService->getMetaForPage('home');
        $websiteStructuredData = $this->seoService->generateWebsiteStructuredData();

        return Inertia::render('welcome', [
            'projects' => $projects,
            'seo' => [
                'meta' => $seoData,
                'website_structured_data' => $websiteStructuredData,
            ],
        ]);
    }

    /**
     * Get project detail for portfolio
     */
    public function portfolioDetail(Project $project)
    {
        if ($project->status !== 'published') {
            abort(404);
        }

        // Generate SEO data for project
        $seoData = $this->seoService->getMetaForPage('project', $project);
        $structuredData = $this->seoService->generateProjectStructuredData($project);

        return Inertia::render('project-detail', [
            'project' => $project,
            'seo' => [
                'meta' => $seoData,
                'structured_data' => $structuredData,
            ],
        ]);
    }
}
