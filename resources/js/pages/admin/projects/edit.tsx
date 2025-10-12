import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

interface Project {
    id: string;
    title: string;
    description: string;
    long_description: string;
    image: string;
    image_url?: string;
    images: string[];
    images_urls?: string[];
    technologies: string[];
    category: string;
    github_url: string;
    live_url: string;
    duration: string;
    year: string;
    role: string;
    challenges: string[];
    solutions: string[];
    features: string[];
    demo_accounts: any[];
    testimonial: any;
    status: 'draft' | 'published' | 'archived';
    sort_order: number;
    featured: boolean;
}

interface Props {
    project: Project;
}

export default function ProjectsEdit({ project }: Props) {
    const { data, setData, put, processing, errors } = (useForm as any)({
        title: project.title || '',
        description: project.description || '',
        long_description: project.long_description || '',
        image: null, // File upload field
        images: [] as File[], // File upload field for additional images
        technologies: project.technologies || [],
        category: project.category || '',
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        duration: project.duration || '',
        year: project.year || '',
        role: project.role || '',
        challenges: project.challenges || [],
        solutions: project.solutions || [],
        features: project.features || [],
        demo_accounts: project.demo_accounts || [],
        testimonial: project.testimonial || {},
        status: project.status || 'draft',
        sort_order: project.sort_order || 0,
        featured: project.featured || false,
    });

    const [newImage, setNewImage] = useState('');
    const [newTechnology, setNewTechnology] = useState('');
    const [newChallenge, setNewChallenge] = useState('');
    const [newSolution, setNewSolution] = useState('');
    const [newFeature, setNewFeature] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [additionalImagePreviews, setAdditionalImagePreviews] = useState<
        string[]
    >([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/projects/${project.id}`);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleAdditionalImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = Array.from(e.target.files || []);
        setData('images', files);

        const newPreviews: string[] = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                newPreviews.push(e.target?.result as string);
                if (newPreviews.length === files.length) {
                    setAdditionalImagePreviews(newPreviews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const addToArray = (field: string, value: string) => {
        if (value.trim()) {
            setData(field as any, [
                ...(data[field as keyof typeof data] as any[]),
                value.trim(),
            ]);
        }
    };

    const removeFromArray = (field: string, index: number) => {
        const currentArray = data[field as keyof typeof data] as any[];
        setData(
            field as any,
            currentArray.filter((_, i) => i !== index),
        );
    };

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Projects Management',
            href: '/admin/projects',
        },
        {
            title: 'Edit Project',
            href: `/admin/projects/${project.id}/edit`,
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${project.title}`} />

            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Edit Project
                        </h1>
                        <p className="text-muted-foreground">
                            Update project information
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/projects/${project.id}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Project
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={'/admin/projects'}>
                                Back to Projects
                            </Link>
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="border-b bg-muted/30">
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Essential information about your project
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="Project title"
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-600">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Input
                                        id="category"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData('category', e.target.value)
                                        }
                                        placeholder="e.g., Web App, Mobile App, Back End"
                                    />
                                    {errors.category && (
                                        <p className="text-sm text-red-600">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Description *
                                </Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Brief description of the project"
                                    rows={3}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="long_description">
                                    Long Description
                                </Label>
                                <Textarea
                                    id="long_description"
                                    value={data.long_description}
                                    onChange={(e) =>
                                        setData(
                                            'long_description',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Detailed description of the project"
                                    rows={5}
                                />
                                {errors.long_description && (
                                    <p className="text-sm text-red-600">
                                        {errors.long_description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration</Label>
                                    <Input
                                        id="duration"
                                        value={data.duration}
                                        onChange={(e) =>
                                            setData('duration', e.target.value)
                                        }
                                        placeholder="e.g., 2 months"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input
                                        id="year"
                                        value={data.year}
                                        onChange={(e) =>
                                            setData('year', e.target.value)
                                        }
                                        placeholder="e.g., 2025"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input
                                        id="role"
                                        value={data.role}
                                        onChange={(e) =>
                                            setData('role', e.target.value)
                                        }
                                        placeholder="e.g., Full Stack Developer"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Media */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="border-b bg-muted/30">
                            <CardTitle>Media</CardTitle>
                            <CardDescription>
                                Images and visual assets for your project
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            <div className="space-y-2">
                                <Label htmlFor="image">Main Image</Label>
                                {project.image && (
                                    <div className="mb-2">
                                        <p className="mb-2 text-sm text-gray-600">
                                            Current image:
                                        </p>
                                        <img
                                            src={
                                                project.image_url ||
                                                `/storage/projects/${project.image}`
                                            }
                                            alt="Current project image"
                                            className="h-32 w-32 rounded-lg border object-cover"
                                        />
                                    </div>
                                )}
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <div className="mt-2">
                                        <p className="mb-2 text-sm text-gray-600">
                                            New image preview:
                                        </p>
                                        <img
                                            src={imagePreview}
                                            alt="New image preview"
                                            className="h-32 w-32 rounded-lg border object-cover"
                                        />
                                    </div>
                                )}
                                {errors.image && (
                                    <p className="text-sm text-red-600">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Additional Images</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleAdditionalImageChange}
                                />
                                {additionalImagePreviews.length > 0 && (
                                    <div className="mt-2">
                                        <p className="mb-2 text-sm text-gray-600">
                                            New images preview:
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {additionalImagePreviews.map(
                                                (preview, index) => (
                                                    <img
                                                        key={index}
                                                        src={preview}
                                                        alt={`Additional image ${index + 1}`}
                                                        className="h-24 w-24 rounded-lg border object-cover"
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Technologies */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="border-b bg-muted/30">
                            <CardTitle>Technologies</CardTitle>
                            <CardDescription>
                                Technologies and tools used in this project
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            <div className="flex gap-2">
                                <Input
                                    value={newTechnology}
                                    onChange={(e) =>
                                        setNewTechnology(e.target.value)
                                    }
                                    placeholder="Technology name"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        addToArray(
                                            'technologies',
                                            newTechnology,
                                        );
                                        setNewTechnology('');
                                    }}
                                >
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.technologies.map(
                                    (tech: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 rounded-md bg-muted px-3 py-1"
                                        >
                                            <span className="text-sm">
                                                {tech}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    removeFromArray(
                                                        'technologies',
                                                        index,
                                                    )
                                                }
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    ),
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Links */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="border-b bg-muted/30">
                            <CardTitle>Links</CardTitle>
                            <CardDescription>
                                GitHub repository and live demo URLs
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            <div className="space-y-2">
                                <Label htmlFor="github_url">GitHub URL</Label>
                                <Input
                                    id="github_url"
                                    value={data.github_url}
                                    onChange={(e) =>
                                        setData('github_url', e.target.value)
                                    }
                                    placeholder="https://github.com/username/repository"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="live_url">Live Demo URL</Label>
                                <Input
                                    id="live_url"
                                    value={data.live_url}
                                    onChange={(e) =>
                                        setData('live_url', e.target.value)
                                    }
                                    placeholder="https://example.com"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Project Details */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="border-b bg-muted/30">
                            <CardTitle>Project Details</CardTitle>
                            <CardDescription>
                                Challenges, solutions, and features
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6">
                            {/* Challenges */}
                            <div className="space-y-2">
                                <Label>Challenges</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={newChallenge}
                                        onChange={(e) =>
                                            setNewChallenge(e.target.value)
                                        }
                                        placeholder="Challenge description"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            addToArray(
                                                'challenges',
                                                newChallenge,
                                            );
                                            setNewChallenge('');
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {data.challenges.map(
                                        (challenge: string, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 rounded-md bg-muted px-3 py-2"
                                            >
                                                <span className="text-sm">
                                                    {challenge}
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeFromArray(
                                                            'challenges',
                                                            index,
                                                        )
                                                    }
                                                >
                                                    ×
                                                </Button>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Solutions */}
                            <div className="space-y-2">
                                <Label>Solutions</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={newSolution}
                                        onChange={(e) =>
                                            setNewSolution(e.target.value)
                                        }
                                        placeholder="Solution description"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            addToArray(
                                                'solutions',
                                                newSolution,
                                            );
                                            setNewSolution('');
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {data.solutions.map(
                                        (solution: string, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 rounded-md bg-muted px-3 py-2"
                                            >
                                                <span className="text-sm">
                                                    {solution}
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeFromArray(
                                                            'solutions',
                                                            index,
                                                        )
                                                    }
                                                >
                                                    ×
                                                </Button>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-2">
                                <Label>Features</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={newFeature}
                                        onChange={(e) =>
                                            setNewFeature(e.target.value)
                                        }
                                        placeholder="Feature description"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            addToArray('features', newFeature);
                                            setNewFeature('');
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {data.features.map(
                                        (feature: string, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 rounded-md bg-muted px-3 py-2"
                                            >
                                                <span className="text-sm">
                                                    {feature}
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeFromArray(
                                                            'features',
                                                            index,
                                                        )
                                                    }
                                                >
                                                    ×
                                                </Button>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Settings */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="border-b bg-muted/30">
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>
                                Project visibility and ordering
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(
                                            value:
                                                | 'draft'
                                                | 'published'
                                                | 'archived',
                                        ) => setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">
                                                Draft
                                            </SelectItem>
                                            <SelectItem value="published">
                                                Published
                                            </SelectItem>
                                            <SelectItem value="archived">
                                                Archived
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sort_order">
                                        Sort Order
                                    </Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) =>
                                            setData(
                                                'sort_order',
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="featured"
                                    checked={data.featured}
                                    onCheckedChange={(checked) =>
                                        setData('featured', !!checked)
                                    }
                                />
                                <Label htmlFor="featured">
                                    Featured Project
                                </Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href={`/admin/projects/${project.id}`}>
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Updating...' : 'Update Project'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}
