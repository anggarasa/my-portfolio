<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
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
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'technologies' => 'nullable|array',
            'category' => 'required|string|max:255',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'duration' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'challenges' => 'nullable|array',
            'solutions' => 'nullable|array',
            'features' => 'nullable|array',
            'demo_accounts' => 'nullable|array',
            'testimonial' => 'nullable|array',
            'status' => 'required|in:draft,published,archived',
            'sort_order' => 'nullable|integer',
            'featured' => 'boolean',
        ]);

        // Handle main image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('projects', $imageName, 'public');
            $validated['image'] = $imageName;
        }

        // Handle additional images upload
        if ($request->hasFile('images')) {
            $additionalImages = [];
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('projects', $imageName, 'public');
                $additionalImages[] = $imageName;
            }
            $validated['images'] = $additionalImages;
        }

        Project::create($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project created successfully.');
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
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'technologies' => 'nullable|array',
            'category' => 'required|string|max:255',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'duration' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'challenges' => 'nullable|array',
            'solutions' => 'nullable|array',
            'features' => 'nullable|array',
            'demo_accounts' => 'nullable|array',
            'testimonial' => 'nullable|array',
            'status' => 'required|in:draft,published,archived',
            'sort_order' => 'nullable|integer',
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

        // Handle main image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($project->image) {
                Storage::delete('projects/' . $project->image);
            }

            // Store new image
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('projects', $imageName, 'public');
            $validated['image'] = $imageName;
        }

        // Handle additional images upload
        if ($request->hasFile('images')) {
            // Delete old additional images if exist
            if ($project->images) {
                foreach ($project->images as $oldImage) {
                    Storage::delete('projects/' . $oldImage);
                }
            }

            // Store new additional images
            $additionalImages = [];
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('projects', $imageName, 'public');
                $additionalImages[] = $imageName;
            }
            $validated['images'] = $additionalImages;
        }

        $project->update($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // Delete associated main image if exists
        if ($project->image) {
            Storage::delete('projects/' . $project->image);
        }

        // Delete associated additional images if exist
        if ($project->images) {
            foreach ($project->images as $image) {
                Storage::delete('projects/' . $image);
            }
        }

        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project deleted successfully.');
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

        return Inertia::render('welcome', [
            'projects' => $projects,
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

        return Inertia::render('project-detail', [
            'project' => $project,
        ]);
    }
}
