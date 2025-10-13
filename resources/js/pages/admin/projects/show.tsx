import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    Award,
    Calendar,
    CheckCircle,
    Clock,
    Code,
    Copy,
    Edit,
    ExternalLink,
    Eye,
    Github,
    Globe,
    Image as ImageIcon,
    Layers,
    Lightbulb,
    Loader2,
    MessageSquare,
    Shield,
    Star,
    Tag,
    Target,
    TrendingUp,
    User,
    Users,
    Zap,
} from 'lucide-react';
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
    demo_accounts: {
        role: string;
        email: string;
        password: string;
        description?: string;
    }[];
    testimonial: {
        text: string;
        author: string;
        position: string;
    };
    status: 'draft' | 'published' | 'archived';
    sort_order: number;
    featured: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    project: Project;
}

export default function ProjectsShow({ project }: Props) {
    const [copyLoading, setCopyLoading] = useState<string | null>(null);

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
            title: project.title,
            href: `/admin/projects/${project.id}`,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'archived':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleCopy = async (text: string, type: string) => {
        setCopyLoading(type);
        try {
            await navigator.clipboard.writeText(text);
            setTimeout(() => setCopyLoading(null), 1000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopyLoading(null);
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`${project.title} - Project Details`} />

            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
                <div className="space-y-8 p-6">
                    {/* Modern Header Section */}
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 p-8">
                        <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
                        <div className="relative">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-lg">
                                            <Layers className="h-8 w-8" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                                                    {project.title}
                                                </h1>
                                                {project.featured && (
                                                    <Badge className="border-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                                                        <Star className="mr-1 h-3 w-3" />
                                                        Featured
                                                    </Badge>
                                                )}
                                                <Badge
                                                    className={`${getStatusColor(project.status)} border-0 shadow-sm`}
                                                >
                                                    {project.status}
                                                </Badge>
                                            </div>
                                            <p className="max-w-2xl text-lg text-muted-foreground">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 px-4 py-3 shadow-sm backdrop-blur-sm">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                <Tag className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Category
                                                </p>
                                                <p className="font-semibold">
                                                    {project.category}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 px-4 py-3 shadow-sm backdrop-blur-sm">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                <User className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Role
                                                </p>
                                                <p className="font-semibold">
                                                    {project.role}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 px-4 py-3 shadow-sm backdrop-blur-sm">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                <Calendar className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Year
                                                </p>
                                                <p className="font-semibold">
                                                    {project.year}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 px-4 py-3 shadow-sm backdrop-blur-sm">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                <Clock className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Duration
                                                </p>
                                                <p className="font-semibold">
                                                    {project.duration}
                                                </p>
                                            </div>
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
                                    <Button
                                        size="lg"
                                        asChild
                                        className="shadow-lg transition-all duration-200 hover:shadow-xl"
                                    >
                                        <Link
                                            href={`/admin/projects/${project.id}/edit`}
                                        >
                                            <Edit className="mr-2 h-5 w-5" />
                                            Edit Project
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-8 xl:col-span-2">
                            {/* Project Images Gallery */}
                            <div className="space-y-6">
                                {/* Main Project Image */}
                                {project.image && (
                                    <Card className="overflow-hidden border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                        <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                            <CardTitle className="flex items-center gap-2 text-xl">
                                                <ImageIcon className="h-5 w-5 text-primary" />
                                                Project Preview
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={
                                                        project.image_url ||
                                                        `/storage/projects/${project.image}`
                                                    }
                                                    alt={project.title}
                                                    className="h-80 w-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                                <div className="absolute right-4 bottom-4 left-4">
                                                    <div className="flex items-center gap-2">
                                                        <Eye className="h-4 w-4 text-white" />
                                                        <span className="text-sm font-medium text-white">
                                                            Main Project Image
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Additional Images */}
                                {project.images &&
                                    project.images.length > 0 && (
                                        <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                            <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                                <CardTitle className="flex items-center gap-2 text-xl">
                                                    <ImageIcon className="h-5 w-5 text-primary" />
                                                    Additional Images (
                                                    {project.images.length})
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-6">
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    {project.images.map(
                                                        (image, index) => (
                                                            <div
                                                                key={index}
                                                                className="relative overflow-hidden rounded-lg border border-border/50"
                                                            >
                                                                <img
                                                                    src={
                                                                        project
                                                                            .images_urls?.[
                                                                            index
                                                                        ] ||
                                                                        `/storage/projects/${image}`
                                                                    }
                                                                    alt={`${project.title} - Image ${index + 1}`}
                                                                    className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                                                <div className="absolute bottom-2 left-2">
                                                                    <Badge
                                                                        variant="secondary"
                                                                        className="border-0 bg-black/50 text-white"
                                                                    >
                                                                        Image{' '}
                                                                        {index +
                                                                            1}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                            </div>

                            {/* Project Details */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Layers className="h-5 w-5 text-primary" />
                                        Project Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-8">
                                        {/* Long Description */}
                                        {project.long_description && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                        <MessageSquare className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <h3 className="text-xl font-semibold">
                                                        Description
                                                    </h3>
                                                </div>
                                                <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                                                    <p className="leading-relaxed whitespace-pre-wrap text-muted-foreground">
                                                        {
                                                            project.long_description
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Technologies */}
                                        {project.technologies &&
                                            project.technologies.length > 0 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                            <Code className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <h3 className="text-xl font-semibold">
                                                            Technologies Used
                                                        </h3>
                                                    </div>
                                                    <div className="flex flex-wrap gap-3">
                                                        {project.technologies.map(
                                                            (tech) => (
                                                                <Badge
                                                                    key={tech}
                                                                    variant="outline"
                                                                    className="border-primary/20 bg-muted/50 px-4 py-2 text-foreground transition-colors hover:bg-primary/5"
                                                                >
                                                                    <Code className="mr-2 h-3 w-3" />
                                                                    {tech}
                                                                </Badge>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Features */}
                                        {project.features &&
                                            project.features.length > 0 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                            <CheckCircle className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <h3 className="text-xl font-semibold">
                                                            Key Features
                                                        </h3>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                        {project.features.map(
                                                            (
                                                                feature,
                                                                index,
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/30 p-3"
                                                                >
                                                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                                                    <span className="text-muted-foreground">
                                                                        {
                                                                            feature
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Challenges & Solutions */}
                                        {project.challenges &&
                                            project.challenges.length > 0 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                            <Target className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <h3 className="text-xl font-semibold">
                                                            Challenges &
                                                            Solutions
                                                        </h3>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {project.challenges.map(
                                                            (
                                                                challenge,
                                                                index,
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    className="overflow-hidden rounded-lg border border-border/50"
                                                                >
                                                                    <div className="border-b border-border/50 bg-destructive/5 p-4">
                                                                        <div className="mb-2 flex items-center gap-2">
                                                                            <AlertTriangle className="h-4 w-4 text-destructive" />
                                                                            <h4 className="font-semibold text-destructive">
                                                                                Challenge{' '}
                                                                                {index +
                                                                                    1}
                                                                            </h4>
                                                                        </div>
                                                                        <p className="text-muted-foreground">
                                                                            {
                                                                                challenge
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    {project.solutions &&
                                                                        project
                                                                            .solutions[
                                                                            index
                                                                        ] && (
                                                                            <div className="bg-green-50 p-4 dark:bg-green-950/20">
                                                                                <div className="mb-2 flex items-center gap-2">
                                                                                    <Lightbulb className="h-4 w-4 text-green-600" />
                                                                                    <h4 className="font-semibold text-green-600">
                                                                                        Solution
                                                                                    </h4>
                                                                                </div>
                                                                                <p className="text-muted-foreground">
                                                                                    {
                                                                                        project
                                                                                            .solutions[
                                                                                            index
                                                                                        ]
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Demo Accounts */}
                                        {project.demo_accounts &&
                                            project.demo_accounts.length >
                                                0 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                            <Users className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <h3 className="text-xl font-semibold">
                                                            Demo Accounts
                                                        </h3>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        {project.demo_accounts.map(
                                                            (
                                                                account,
                                                                index,
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    className="rounded-lg border border-border/50 bg-muted/30 p-4"
                                                                >
                                                                    <div className="mb-3 flex items-center gap-2">
                                                                        <Badge className="border-primary/20 bg-primary/10 text-primary">
                                                                            <Users className="mr-1 h-3 w-3" />
                                                                            {
                                                                                account.role
                                                                            }
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="space-y-3">
                                                                        <div className="flex items-center justify-between rounded bg-background/50 p-2">
                                                                            <span className="text-sm font-medium text-muted-foreground">
                                                                                Email:
                                                                            </span>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-mono text-sm">
                                                                                    {
                                                                                        account.email
                                                                                    }
                                                                                </span>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    className="h-6 w-6 p-0"
                                                                                    onClick={() =>
                                                                                        handleCopy(
                                                                                            account.email,
                                                                                            `email-${index}`,
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {copyLoading ===
                                                                                    `email-${index}` ? (
                                                                                        <Loader2 className="h-3 w-3 animate-spin" />
                                                                                    ) : (
                                                                                        <Copy className="h-3 w-3" />
                                                                                    )}
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center justify-between rounded bg-background/50 p-2">
                                                                            <span className="text-sm font-medium text-muted-foreground">
                                                                                Password:
                                                                            </span>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-mono text-sm">
                                                                                    {
                                                                                        account.password
                                                                                    }
                                                                                </span>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    className="h-6 w-6 p-0"
                                                                                    onClick={() =>
                                                                                        handleCopy(
                                                                                            account.password,
                                                                                            `password-${index}`,
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {copyLoading ===
                                                                                    `password-${index}` ? (
                                                                                        <Loader2 className="h-3 w-3 animate-spin" />
                                                                                    ) : (
                                                                                        <Copy className="h-3 w-3" />
                                                                                    )}
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                        {account.description && (
                                                                            <div className="rounded bg-background/50 p-2">
                                                                                <span className="text-sm font-medium text-muted-foreground">
                                                                                    Description:
                                                                                </span>
                                                                                <p className="mt-1 text-sm text-muted-foreground">
                                                                                    {
                                                                                        account.description
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Testimonial */}
                                        {project.testimonial && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                        <MessageSquare className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <h3 className="text-xl font-semibold">
                                                        Client Testimonial
                                                    </h3>
                                                </div>
                                                <div className="rounded-lg border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                            <MessageSquare className="h-6 w-6" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <blockquote className="mb-4 text-lg leading-relaxed text-muted-foreground italic">
                                                                "
                                                                {
                                                                    project
                                                                        .testimonial
                                                                        .text
                                                                }
                                                                "
                                                            </blockquote>
                                                            <div className="border-t border-border/50 pt-4">
                                                                <div className="font-semibold text-foreground">
                                                                    {
                                                                        project
                                                                            .testimonial
                                                                            .author
                                                                    }
                                                                </div>
                                                                <div className="text-muted-foreground">
                                                                    {
                                                                        project
                                                                            .testimonial
                                                                            .position
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Project Links */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Globe className="h-5 w-5 text-primary" />
                                        Project Links
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-3">
                                        {project.github_url && (
                                            <Button
                                                variant="outline"
                                                className="h-12 w-full justify-start transition-all hover:border-primary/20 hover:bg-primary/5"
                                                asChild
                                            >
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Github className="mr-3 h-5 w-5" />
                                                    <div className="text-left">
                                                        <div className="font-medium">
                                                            GitHub Repository
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            View source code
                                                        </div>
                                                    </div>
                                                </a>
                                            </Button>
                                        )}
                                        {project.live_url && (
                                            <Button
                                                className="h-12 w-full justify-start shadow-sm transition-all hover:shadow-md"
                                                asChild
                                            >
                                                <a
                                                    href={project.live_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <ExternalLink className="mr-3 h-5 w-5" />
                                                    <div className="text-left">
                                                        <div className="font-medium">
                                                            Live Demo
                                                        </div>
                                                        <div className="text-xs text-primary-foreground/70">
                                                            Visit live site
                                                        </div>
                                                    </div>
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Project Statistics */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <TrendingUp className="h-5 w-5 text-primary" />
                                        Project Statistics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                    <Tag className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Category
                                                </span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="bg-muted/50"
                                            >
                                                {project.category}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                    <User className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Role
                                                </span>
                                            </div>
                                            <span className="font-semibold">
                                                {project.role}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                    <Calendar className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Year
                                                </span>
                                            </div>
                                            <span className="font-semibold">
                                                {project.year}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                    <Clock className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Duration
                                                </span>
                                            </div>
                                            <span className="font-semibold">
                                                {project.duration}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                    <Layers className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Sort Order
                                                </span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="bg-muted/50"
                                            >
                                                #{project.sort_order}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Project Status & Info */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Shield className="h-5 w-5 text-primary" />
                                        Project Status & Info
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                    <Award className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Status
                                                </span>
                                            </div>
                                            <Badge
                                                className={`${getStatusColor(project.status)} border-0 shadow-sm`}
                                            >
                                                {project.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                    <Star className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Featured
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {project.featured ? (
                                                    <Badge className="border-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-sm">
                                                        <Star className="mr-1 h-3 w-3" />
                                                        Yes
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-muted/50"
                                                    >
                                                        No
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                    <Calendar className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Created
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold">
                                                {formatDate(project.created_at)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                    <Zap className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Updated
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold">
                                                {formatDate(project.updated_at)}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Technology Stack Summary */}
                            {project.technologies &&
                                project.technologies.length > 0 && (
                                    <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                        <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                            <CardTitle className="flex items-center gap-2 text-xl">
                                                <Code className="h-5 w-5 text-primary" />
                                                Tech Stack
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="space-y-3">
                                                <div className="mb-3 text-sm text-muted-foreground">
                                                    {
                                                        project.technologies
                                                            .length
                                                    }{' '}
                                                    technology
                                                    {project.technologies
                                                        .length !== 1
                                                        ? 'ies'
                                                        : ''}{' '}
                                                    used
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies
                                                        .slice(0, 6)
                                                        .map((tech) => (
                                                            <Badge
                                                                key={tech}
                                                                variant="outline"
                                                                className="border-primary/20 bg-muted/50 px-3 py-1 text-foreground"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                    {project.technologies
                                                        .length > 6 && (
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-muted/50 px-3 py-1"
                                                        >
                                                            +
                                                            {project
                                                                .technologies
                                                                .length -
                                                                6}{' '}
                                                            more
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                            {/* Quick Actions */}
                            <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Zap className="h-5 w-5 text-primary" />
                                        Quick Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-3">
                                        <Button
                                            variant="outline"
                                            className="h-12 w-full justify-start transition-all hover:border-primary/20 hover:bg-primary/5"
                                            asChild
                                        >
                                            <Link
                                                href={`/admin/projects/${project.id}/edit`}
                                            >
                                                <Edit className="mr-3 h-5 w-5" />
                                                <div className="text-left">
                                                    <div className="font-medium">
                                                        Edit Project
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Modify project details
                                                    </div>
                                                </div>
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-12 w-full justify-start transition-all hover:border-primary/20 hover:bg-primary/5"
                                            asChild
                                        >
                                            <Link href={'/admin/projects'}>
                                                <ArrowLeft className="mr-3 h-5 w-5" />
                                                <div className="text-left">
                                                    <div className="font-medium">
                                                        Back to Projects
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Return to project list
                                                    </div>
                                                </div>
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
