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
import { FullPageLoading } from '@/components/ui/loading-spinner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Code,
    ExternalLink,
    FileText,
    Github,
    Image as ImageIcon,
    Layers,
    Lightbulb,
    Link as LinkIcon,
    Loader2,
    MessageSquare,
    Plus,
    Save,
    Settings,
    Star,
    Tag,
    Target,
    Upload,
    User,
    Users,
    X,
    Zap,
} from 'lucide-react';
import { lazy, Suspense, useState } from 'react';

// Lazy load the layout
const AppSidebarLayout = lazy(() => import('@/layouts/app/app-sidebar-layout'));

interface Props {
    //
}

export default function ProjectsCreate({}: Props) {
    const { showSuccess, showError } = useToast();
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        description: string;
        long_description: string;
        image: File | null;
        images: File[];
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
        image: null,
        images: [],
        technologies: [],
        category: '',
        github_url: '',
        live_url: '',
        duration: '',
        year: '',
        role: '',
        challenges: [],
        solutions: [],
        features: [],
        demo_accounts: [],
        testimonial: {},
        status: 'draft',
        sort_order: 0,
        featured: false,
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

    // Demo account states
    const [newDemoAccount, setNewDemoAccount] = useState({
        role: '',
        email: '',
        password: '',
        description: '',
    });

    // Testimonial states
    const [testimonial, setTestimonial] = useState({
        text: '',
        author: '',
        position: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Use router.post for file uploads
        router.post('/admin/projects', data, {
            forceFormData: true,
            onSuccess: () => {
                showSuccess('Project berhasil dibuat!');
                // Redirect after a short delay to allow toast to be visible
                setTimeout(() => {
                    router.visit('/admin/projects');
                }, 1500);
            },
            onError: (errors) => {
                // Show error message from server or generic error
                const errorMessage =
                    Object.values(errors)[0] ||
                    'Terjadi kesalahan saat membuat project';
                showError(errorMessage);
            },
        });
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
            const currentArray = data[field as keyof typeof data] as string[];
            setData(
                field as keyof typeof data,
                [...currentArray, value.trim()] as any,
            );
        }
    };

    const removeFromArray = (field: string, index: number) => {
        const currentArray = data[field as keyof typeof data] as string[];
        setData(
            field as keyof typeof data,
            currentArray.filter((_: any, i: number) => i !== index) as any,
        );
    };

    const addDemoAccount = () => {
        if (
            newDemoAccount.role &&
            newDemoAccount.email &&
            newDemoAccount.password
        ) {
            const currentAccounts = data.demo_accounts;
            setData('demo_accounts', [
                ...currentAccounts,
                { ...newDemoAccount },
            ] as any);
            setNewDemoAccount({
                role: '',
                email: '',
                password: '',
                description: '',
            });
        }
    };

    const removeDemoAccount = (index: number) => {
        const currentAccounts = data.demo_accounts;
        setData(
            'demo_accounts',
            currentAccounts.filter((_: any, i: number) => i !== index) as any,
        );
    };

    const updateTestimonial = () => {
        if (testimonial.text && testimonial.author && testimonial.position) {
            setData('testimonial', { ...testimonial } as any);
        }
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
        <Suspense fallback={<FullPageLoading />}>
            <AppSidebarLayout breadcrumbs={breadcrumbs}>
                <Head title="Create Project" />

                <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
                    <div className="space-y-8 p-6">
                        {/* Modern Header Section */}
                        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 p-8">
                            <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
                            <div className="relative">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-lg">
                                                <Plus className="h-8 w-8" />
                                            </div>
                                            <div className="space-y-2">
                                                <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                                                    Create New Project
                                                </h1>
                                                <p className="text-lg text-muted-foreground">
                                                    Add a new project to
                                                    showcase in your portfolio
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress Indicator */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/80 px-3 py-2 backdrop-blur-sm">
                                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                                <span className="text-sm font-medium text-foreground">
                                                    Step 1 of 6
                                                </span>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Fill out the form below to
                                                create your project
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            asChild
                                            className="shadow-lg transition-all duration-200 hover:shadow-xl"
                                        >
                                            <Link href={'/admin/projects'}>
                                                <ArrowLeft className="mr-2 h-5 w-5" />
                                                Back to Projects
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-8"
                            encType="multipart/form-data"
                        >
                            {/* Basic Information */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <FileText className="h-5 w-5 text-primary" />
                                        Basic Information
                                    </CardTitle>
                                    <CardDescription>
                                        Essential information about your project
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-6">
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        <div className="space-y-3">
                                            <Label
                                                htmlFor="title"
                                                className="flex items-center gap-2 text-sm font-semibold"
                                            >
                                                <Star className="h-4 w-4 text-primary" />
                                                Project Title *
                                            </Label>
                                            <Input
                                                id="title"
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        'title',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Enter your project title"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                            {errors.title && (
                                                <p className="flex items-center gap-1 text-sm text-destructive">
                                                    <X className="h-3 w-3" />
                                                    {errors.title}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-3">
                                            <Label
                                                htmlFor="category"
                                                className="flex items-center gap-2 text-sm font-semibold"
                                            >
                                                <Tag className="h-4 w-4 text-primary" />
                                                Category *
                                            </Label>
                                            <Input
                                                id="category"
                                                value={data.category}
                                                onChange={(e) =>
                                                    setData(
                                                        'category',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="e.g., Web App, Mobile App, Back End"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                            {errors.category && (
                                                <p className="flex items-center gap-1 text-sm text-destructive">
                                                    <X className="h-3 w-3" />
                                                    {errors.category}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label
                                            htmlFor="description"
                                            className="flex items-center gap-2 text-sm font-semibold"
                                        >
                                            <MessageSquare className="h-4 w-4 text-primary" />
                                            Brief Description *
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Provide a brief overview of your project"
                                            rows={3}
                                            className="border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                        />
                                        {errors.description && (
                                            <p className="flex items-center gap-1 text-sm text-destructive">
                                                <X className="h-3 w-3" />
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <Label
                                            htmlFor="long_description"
                                            className="flex items-center gap-2 text-sm font-semibold"
                                        >
                                            <FileText className="h-4 w-4 text-primary" />
                                            Detailed Description
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
                                            placeholder="Provide a comprehensive description of your project, including goals, approach, and outcomes"
                                            rows={5}
                                            className="border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                        />
                                        {errors.long_description && (
                                            <p className="flex items-center gap-1 text-sm text-destructive">
                                                <X className="h-3 w-3" />
                                                {errors.long_description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div className="space-y-3">
                                            <Label
                                                htmlFor="duration"
                                                className="flex items-center gap-2 text-sm font-semibold"
                                            >
                                                <Clock className="h-4 w-4 text-primary" />
                                                Duration
                                            </Label>
                                            <Input
                                                id="duration"
                                                value={data.duration}
                                                onChange={(e) =>
                                                    setData(
                                                        'duration',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="e.g., 2 months"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label
                                                htmlFor="year"
                                                className="flex items-center gap-2 text-sm font-semibold"
                                            >
                                                <Calendar className="h-4 w-4 text-primary" />
                                                Year
                                            </Label>
                                            <Input
                                                id="year"
                                                value={data.year}
                                                onChange={(e) =>
                                                    setData(
                                                        'year',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="e.g., 2025"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label
                                                htmlFor="role"
                                                className="flex items-center gap-2 text-sm font-semibold"
                                            >
                                                <User className="h-4 w-4 text-primary" />
                                                Your Role
                                            </Label>
                                            <Input
                                                id="role"
                                                value={data.role}
                                                onChange={(e) =>
                                                    setData(
                                                        'role',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="e.g., Full Stack Developer"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Media Section */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <ImageIcon className="h-5 w-5 text-primary" />
                                        Project Media
                                    </CardTitle>
                                    <CardDescription>
                                        Upload images and visual assets for your
                                        project
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-6">
                                    {/* Main Image Upload */}
                                    <div className="space-y-4">
                                        <Label className="flex items-center gap-2 text-sm font-semibold">
                                            <Upload className="h-4 w-4 text-primary" />
                                            Main Project Image
                                        </Label>
                                        <div className="rounded-lg border-2 border-dashed border-border/50 p-6 transition-colors hover:border-primary/50">
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="image"
                                                className="cursor-pointer"
                                            >
                                                <div className="text-center">
                                                    <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                                    <p className="mb-2 text-sm font-medium text-foreground">
                                                        Click to upload main
                                                        image
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        PNG, JPG, GIF up to 10MB
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-4">
                                                <div className="relative inline-block">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Image preview"
                                                        className="h-48 w-48 rounded-lg border border-border/50 object-cover shadow-sm"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                                        onClick={() => {
                                                            setData(
                                                                'image',
                                                                null,
                                                            );
                                                            setImagePreview(
                                                                null,
                                                            );
                                                        }}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                        {errors.image && (
                                            <p className="flex items-center gap-1 text-sm text-destructive">
                                                <X className="h-3 w-3" />
                                                {errors.image}
                                            </p>
                                        )}
                                    </div>

                                    {/* Additional Images Upload */}
                                    <div className="space-y-4">
                                        <Label className="flex items-center gap-2 text-sm font-semibold">
                                            <ImageIcon className="h-4 w-4 text-primary" />
                                            Additional Images
                                        </Label>
                                        <div className="rounded-lg border-2 border-dashed border-border/50 p-6 transition-colors hover:border-primary/50">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={
                                                    handleAdditionalImageChange
                                                }
                                                className="hidden"
                                                id="additional-images"
                                            />
                                            <label
                                                htmlFor="additional-images"
                                                className="cursor-pointer"
                                            >
                                                <div className="text-center">
                                                    <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                                    <p className="mb-2 text-sm font-medium text-foreground">
                                                        Click to upload
                                                        additional images
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Select multiple images
                                                        to showcase your project
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                        {additionalImagePreviews.length > 0 && (
                                            <div className="mt-4">
                                                <p className="mb-3 text-sm font-medium text-foreground">
                                                    Preview (
                                                    {
                                                        additionalImagePreviews.length
                                                    }{' '}
                                                    images):
                                                </p>
                                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    {additionalImagePreviews.map(
                                                        (preview, index) => (
                                                            <div
                                                                key={index}
                                                                className="relative"
                                                            >
                                                                <img
                                                                    src={
                                                                        preview
                                                                    }
                                                                    alt={`Additional image ${index + 1}`}
                                                                    className="h-24 w-full rounded-lg border border-border/50 object-cover shadow-sm"
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                                                    onClick={() => {
                                                                        const newPreviews =
                                                                            additionalImagePreviews.filter(
                                                                                (
                                                                                    _,
                                                                                    i,
                                                                                ) =>
                                                                                    i !==
                                                                                    index,
                                                                            );
                                                                        const newFiles =
                                                                            Array.from(
                                                                                data.images,
                                                                            ).filter(
                                                                                (
                                                                                    _,
                                                                                    i,
                                                                                ) =>
                                                                                    i !==
                                                                                    index,
                                                                            );
                                                                        setAdditionalImagePreviews(
                                                                            newPreviews,
                                                                        );
                                                                        setData(
                                                                            'images',
                                                                            newFiles,
                                                                        );
                                                                    }}
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Technologies Section */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Code className="h-5 w-5 text-primary" />
                                        Technologies & Tools
                                    </CardTitle>
                                    <CardDescription>
                                        List all technologies and tools used in
                                        this project
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-6">
                                    <div className="flex gap-3">
                                        <Input
                                            value={newTechnology}
                                            onChange={(e) =>
                                                setNewTechnology(e.target.value)
                                            }
                                            placeholder="Enter technology name (e.g., React, Node.js, Python)"
                                            className="h-12 flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addToArray(
                                                        'technologies',
                                                        newTechnology,
                                                    );
                                                    setNewTechnology('');
                                                }
                                            }}
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
                                            className="h-12 px-6 transition-all hover:border-primary/20 hover:bg-primary/5"
                                            disabled={!newTechnology.trim()}
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add
                                        </Button>
                                    </div>
                                    {data.technologies.length > 0 && (
                                        <div className="space-y-3">
                                            <p className="text-sm font-medium text-foreground">
                                                Technologies (
                                                {data.technologies.length}):
                                            </p>
                                            <div className="flex flex-wrap gap-3">
                                                {data.technologies.map(
                                                    (tech, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/50 px-4 py-2 transition-colors hover:bg-muted/70"
                                                        >
                                                            <Code className="h-4 w-4 text-primary" />
                                                            <span className="text-sm font-medium">
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
                                                                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Links Section */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <LinkIcon className="h-5 w-5 text-primary" />
                                        Project Links
                                    </CardTitle>
                                    <CardDescription>
                                        Add links to your GitHub repository and
                                        live demo
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-6">
                                    <div className="space-y-3">
                                        <Label
                                            htmlFor="github_url"
                                            className="flex items-center gap-2 text-sm font-semibold"
                                        >
                                            <Github className="h-4 w-4 text-primary" />
                                            GitHub Repository URL
                                        </Label>
                                        <Input
                                            id="github_url"
                                            value={data.github_url}
                                            onChange={(e) =>
                                                setData(
                                                    'github_url',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://github.com/username/repository"
                                            className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label
                                            htmlFor="live_url"
                                            className="flex items-center gap-2 text-sm font-semibold"
                                        >
                                            <ExternalLink className="h-4 w-4 text-primary" />
                                            Live Demo URL
                                        </Label>
                                        <Input
                                            id="live_url"
                                            value={data.live_url}
                                            onChange={(e) =>
                                                setData(
                                                    'live_url',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://your-project-demo.com"
                                            className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Project Details Section */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Target className="h-5 w-5 text-primary" />
                                        Project Details
                                    </CardTitle>
                                    <CardDescription>
                                        Describe challenges, solutions, and key
                                        features
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8 p-6">
                                    {/* Features */}
                                    <div className="space-y-4">
                                        <Label className="flex items-center gap-2 text-sm font-semibold">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            Key Features
                                        </Label>
                                        <div className="flex gap-3">
                                            <Input
                                                value={newFeature}
                                                onChange={(e) =>
                                                    setNewFeature(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Describe a key feature of your project"
                                                className="h-12 flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        addToArray(
                                                            'features',
                                                            newFeature,
                                                        );
                                                        setNewFeature('');
                                                    }
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    addToArray(
                                                        'features',
                                                        newFeature,
                                                    );
                                                    setNewFeature('');
                                                }}
                                                className="h-12 px-6 transition-all hover:border-primary/20 hover:bg-primary/5"
                                                disabled={!newFeature.trim()}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add
                                            </Button>
                                        </div>
                                        {data.features.length > 0 && (
                                            <div className="space-y-3">
                                                <p className="text-sm font-medium text-foreground">
                                                    Features (
                                                    {data.features.length}
                                                    ):
                                                </p>
                                                <div className="space-y-2">
                                                    {data.features.map(
                                                        (feature, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/30 p-3"
                                                            >
                                                                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                                                <span className="flex-1 text-sm text-muted-foreground">
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
                                                                    className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Challenges */}
                                    <div className="space-y-4">
                                        <Label className="flex items-center gap-2 text-sm font-semibold">
                                            <Target className="h-4 w-4 text-primary" />
                                            Challenges Faced
                                        </Label>
                                        <div className="flex gap-3">
                                            <Input
                                                value={newChallenge}
                                                onChange={(e) =>
                                                    setNewChallenge(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Describe a challenge you encountered"
                                                className="h-12 flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        addToArray(
                                                            'challenges',
                                                            newChallenge,
                                                        );
                                                        setNewChallenge('');
                                                    }
                                                }}
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
                                                className="h-12 px-6 transition-all hover:border-primary/20 hover:bg-primary/5"
                                                disabled={!newChallenge.trim()}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add
                                            </Button>
                                        </div>
                                        {data.challenges.length > 0 && (
                                            <div className="space-y-3">
                                                <p className="text-sm font-medium text-foreground">
                                                    Challenges (
                                                    {data.challenges.length}):
                                                </p>
                                                <div className="space-y-2">
                                                    {data.challenges.map(
                                                        (challenge, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3"
                                                            >
                                                                <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                                                                <span className="flex-1 text-sm text-muted-foreground">
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
                                                                    className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Solutions */}
                                    <div className="space-y-4">
                                        <Label className="flex items-center gap-2 text-sm font-semibold">
                                            <Lightbulb className="h-4 w-4 text-primary" />
                                            Solutions Implemented
                                        </Label>
                                        <div className="flex gap-3">
                                            <Input
                                                value={newSolution}
                                                onChange={(e) =>
                                                    setNewSolution(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Describe how you solved the challenge"
                                                className="h-12 flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        addToArray(
                                                            'solutions',
                                                            newSolution,
                                                        );
                                                        setNewSolution('');
                                                    }
                                                }}
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
                                                className="h-12 px-6 transition-all hover:border-primary/20 hover:bg-primary/5"
                                                disabled={!newSolution.trim()}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add
                                            </Button>
                                        </div>
                                        {data.solutions.length > 0 && (
                                            <div className="space-y-3">
                                                <p className="text-sm font-medium text-foreground">
                                                    Solutions (
                                                    {data.solutions.length}):
                                                </p>
                                                <div className="space-y-2">
                                                    {data.solutions.map(
                                                        (solution, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/20"
                                                            >
                                                                <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                                                                <span className="flex-1 text-sm text-muted-foreground">
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
                                                                    className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Demo Accounts Section */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Users className="h-5 w-5 text-primary" />
                                        Demo Accounts
                                    </CardTitle>
                                    <CardDescription>
                                        Add demo accounts for testing your
                                        project
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-6">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <Label className="text-sm font-semibold">
                                                Role
                                            </Label>
                                            <Input
                                                value={newDemoAccount.role}
                                                onChange={(e) =>
                                                    setNewDemoAccount({
                                                        ...newDemoAccount,
                                                        role: e.target.value,
                                                    })
                                                }
                                                placeholder="e.g., Admin, User, Guest"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-sm font-semibold">
                                                Email
                                            </Label>
                                            <Input
                                                value={newDemoAccount.email}
                                                onChange={(e) =>
                                                    setNewDemoAccount({
                                                        ...newDemoAccount,
                                                        email: e.target.value,
                                                    })
                                                }
                                                placeholder="demo@example.com"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <Label className="text-sm font-semibold">
                                                Password
                                            </Label>
                                            <Input
                                                value={newDemoAccount.password}
                                                onChange={(e) =>
                                                    setNewDemoAccount({
                                                        ...newDemoAccount,
                                                        password:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="password123"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-sm font-semibold">
                                                Description (Optional)
                                            </Label>
                                            <Input
                                                value={
                                                    newDemoAccount.description
                                                }
                                                onChange={(e) =>
                                                    setNewDemoAccount({
                                                        ...newDemoAccount,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="Brief description of this account"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addDemoAccount}
                                        className="h-12 w-full transition-all hover:border-primary/20 hover:bg-primary/5"
                                        disabled={
                                            !newDemoAccount.role ||
                                            !newDemoAccount.email ||
                                            !newDemoAccount.password
                                        }
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Demo Account
                                    </Button>
                                    {data.demo_accounts.length > 0 && (
                                        <div className="space-y-3">
                                            <p className="text-sm font-medium text-foreground">
                                                Demo Accounts (
                                                {data.demo_accounts.length}):
                                            </p>
                                            <div className="space-y-3">
                                                {data.demo_accounts.map(
                                                    (account, index) => (
                                                        <div
                                                            key={index}
                                                            className="rounded-lg border border-border/50 bg-muted/30 p-4"
                                                        >
                                                            <div className="mb-3 flex items-center justify-between">
                                                                <span className="font-semibold text-foreground">
                                                                    {
                                                                        account.role
                                                                    }
                                                                </span>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        removeDemoAccount(
                                                                            index,
                                                                        )
                                                                    }
                                                                    className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-2 text-sm">
                                                                <div>
                                                                    <span className="font-medium">
                                                                        Email:
                                                                    </span>{' '}
                                                                    {
                                                                        account.email
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium">
                                                                        Password:
                                                                    </span>{' '}
                                                                    {
                                                                        account.password
                                                                    }
                                                                </div>
                                                                {account.description && (
                                                                    <div>
                                                                        <span className="font-medium">
                                                                            Description:
                                                                        </span>{' '}
                                                                        {
                                                                            account.description
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Testimonial Section */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <MessageSquare className="h-5 w-5 text-primary" />
                                        Client Testimonial
                                    </CardTitle>
                                    <CardDescription>
                                        Add a testimonial from your client or
                                        team member
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-6">
                                    <div className="space-y-3">
                                        <Label className="text-sm font-semibold">
                                            Testimonial Text
                                        </Label>
                                        <Textarea
                                            value={testimonial.text}
                                            onChange={(e) =>
                                                setTestimonial({
                                                    ...testimonial,
                                                    text: e.target.value,
                                                })
                                            }
                                            placeholder="Enter the testimonial text here..."
                                            rows={4}
                                            className="border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <Label className="text-sm font-semibold">
                                                Author Name
                                            </Label>
                                            <Input
                                                value={testimonial.author}
                                                onChange={(e) =>
                                                    setTestimonial({
                                                        ...testimonial,
                                                        author: e.target.value,
                                                    })
                                                }
                                                placeholder="Client or team member name"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-sm font-semibold">
                                                Position/Title
                                            </Label>
                                            <Input
                                                value={testimonial.position}
                                                onChange={(e) =>
                                                    setTestimonial({
                                                        ...testimonial,
                                                        position:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="e.g., CEO, Project Manager"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={updateTestimonial}
                                        className="h-12 w-full transition-all hover:border-primary/20 hover:bg-primary/5"
                                        disabled={
                                            !testimonial.text ||
                                            !testimonial.author ||
                                            !testimonial.position
                                        }
                                    >
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Save Testimonial
                                    </Button>
                                    {data.testimonial &&
                                        Object.keys(data.testimonial).length >
                                            0 && (
                                            <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                                                <blockquote className="mb-3 text-muted-foreground italic">
                                                    "{data.testimonial.text}"
                                                </blockquote>
                                                <div className="text-sm">
                                                    <div className="font-semibold text-foreground">
                                                        {
                                                            data.testimonial
                                                                .author
                                                        }
                                                    </div>
                                                    <div className="text-muted-foreground">
                                                        {
                                                            data.testimonial
                                                                .position
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </CardContent>
                            </Card>

                            {/* Settings Section */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Settings className="h-5 w-5 text-primary" />
                                        Project Settings
                                    </CardTitle>
                                    <CardDescription>
                                        Configure project visibility and
                                        ordering
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-6">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <Label
                                                htmlFor="status"
                                                className="flex items-center gap-2 text-sm font-semibold"
                                            >
                                                <Zap className="h-4 w-4 text-primary" />
                                                Project Status
                                            </Label>
                                            <Select
                                                value={data.status}
                                                onValueChange={(value) => {
                                                    (setData as any)(
                                                        'status',
                                                        value,
                                                    );
                                                }}
                                            >
                                                <SelectTrigger className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20">
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
                                        <div className="space-y-3">
                                            <Label
                                                htmlFor="sort_order"
                                                className="flex items-center gap-2 text-sm font-semibold"
                                            >
                                                <Layers className="h-4 w-4 text-primary" />
                                                Sort Order
                                            </Label>
                                            <Input
                                                id="sort_order"
                                                type="number"
                                                value={data.sort_order}
                                                onChange={(e) =>
                                                    setData(
                                                        'sort_order',
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 0,
                                                    )
                                                }
                                                placeholder="0"
                                                className="h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 rounded-lg border border-border/50 bg-muted/30 p-4">
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
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4 text-primary" />
                                            <Label
                                                htmlFor="featured"
                                                className="cursor-pointer text-sm font-semibold"
                                            >
                                                Mark as Featured Project
                                            </Label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    asChild
                                    className="shadow-lg transition-all duration-200 hover:shadow-xl"
                                >
                                    <Link href={'/admin/projects'}>
                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                        Cancel
                                    </Link>
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={processing}
                                    className="shadow-lg transition-all duration-200 hover:shadow-xl"
                                >
                                    {processing ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Save className="mr-2 h-5 w-5" />
                                    )}
                                    {processing
                                        ? 'Creating Project...'
                                        : 'Create Project'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </AppSidebarLayout>
        </Suspense>
    );
}
