<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
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
            'image' => 'nullable|string',
            'images' => 'nullable|array',
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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'image' => 'nullable|string',
            'images' => 'nullable|array',
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

        $project->update($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project deleted successfully.');
    }

    /**
     * Get projects for portfolio display
     */
    public function portfolio(Request $request)
    {
        $query = Project::published()->ordered();

        // Filter by category
        if ($request->has('category') && $request->category !== 'All') {
            $query->byCategory($request->category);
        }

        $projects = $query->get();

        return response()->json($projects);
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
