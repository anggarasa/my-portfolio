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

interface Props {
    //
}

export default function ProjectsCreate({}: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        description: string;
        long_description: string;
        image: string;
        images: string[];
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
        demo_accounts: Record<string, any>[];
        testimonial: Record<string, any>;
        status: 'draft' | 'published' | 'archived';
        sort_order: number;
        featured: boolean;
    }>({
        title: '',
        description: '',
        long_description: '',
        image: '',
        images: [] as string[],
        technologies: [] as string[],
        category: '',
        github_url: '',
        live_url: '',
        duration: '',
        year: '',
        role: '',
        challenges: [] as string[],
        solutions: [] as string[],
        features: [] as string[],
        demo_accounts: [] as Record<string, any>[],
        testimonial: {} as Record<string, any>,
        status: 'draft' as 'draft' | 'published' | 'archived',
        sort_order: 0,
        featured: false,
    });

    const [newImage, setNewImage] = useState('');
    const [newTechnology, setNewTechnology] = useState('');
    const [newChallenge, setNewChallenge] = useState('');
    const [newSolution, setNewSolution] = useState('');
    const [newFeature, setNewFeature] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/projects');
    };

    const addToArray = (field: string, value: string) => {
        if (value.trim()) {
            const currentArray = (data as any)[field] as string[];
            (setData as any)(field, [...currentArray, value.trim()]);
        }
    };

    const removeFromArray = (field: string, index: number) => {
        const currentArray = (data as any)[field] as string[];
        (setData as any)(
            field,
            currentArray.filter((_: any, i: number) => i !== index),
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
            title: 'Create Project',
            href: '/admin/projects/create',
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />

            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Create New Project
                        </h1>
                        <p className="text-muted-foreground">
                            Add a new project to your portfolio
                        </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={'/admin/projects'}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Essential information about your project
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Media</CardTitle>
                            <CardDescription>
                                Images and visual assets for your project
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="image">Main Image URL</Label>
                                <Input
                                    id="image"
                                    value={data.image}
                                    onChange={(e) =>
                                        setData('image', e.target.value)
                                    }
                                    placeholder="https://example.com/image.png"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Additional Images</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={newImage}
                                        onChange={(e) =>
                                            setNewImage(e.target.value)
                                        }
                                        placeholder="Image URL"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            addToArray('images', newImage);
                                            setNewImage('');
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 rounded-md bg-muted px-3 py-1"
                                        >
                                            <span className="text-sm">
                                                {image}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    removeFromArray(
                                                        'images',
                                                        index,
                                                    )
                                                }
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Technologies */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Technologies</CardTitle>
                            <CardDescription>
                                Technologies and tools used in this project
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                                {data.technologies.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 rounded-md bg-muted px-3 py-1"
                                    >
                                        <span className="text-sm">{tech}</span>
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
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Links</CardTitle>
                            <CardDescription>
                                GitHub repository and live demo URLs
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Details</CardTitle>
                            <CardDescription>
                                Challenges, solutions, and features
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
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
                                    {data.challenges.map((challenge, index) => (
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
                                    ))}
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
                                    {data.solutions.map((solution, index) => (
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
                                    ))}
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
                                    {data.features.map((feature, index) => (
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
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>
                                Project visibility and ordering
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => {
                                            (setData as any)('status', value);
                                        }}
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
                                    onCheckedChange={(checked) => {
                                        (setData as any)(
                                            'featured',
                                            checked === true,
                                        );
                                    }}
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
                            <Link href={'/admin/projects'}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Creating...' : 'Create Project'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}
