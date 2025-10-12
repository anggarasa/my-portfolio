import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Edit,
    ExternalLink,
    Github,
    User,
} from 'lucide-react';

interface Project {
    id: string;
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
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`${project.title} - Project Details`} />

            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {project.title}
                            </h1>
                            {project.featured && (
                                <Badge variant="secondary">Featured</Badge>
                            )}
                            <Badge className={getStatusColor(project.status)}>
                                {project.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={'/admin/projects'}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href={`/admin/projects/${project.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Project
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Project Image */}
                        {project.image && (
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-0">
                                    <div className="relative overflow-hidden rounded-lg">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="h-64 w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Project Details */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-muted/30">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <User className="h-5 w-5" />
                                    Project Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {/* Long Description */}
                                    {project.long_description && (
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold">
                                                Description
                                            </h3>
                                            <p className="whitespace-pre-wrap text-muted-foreground">
                                                {project.long_description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Technologies */}
                                    {project.technologies &&
                                        project.technologies.length > 0 && (
                                            <div className="space-y-3">
                                                <h3 className="text-lg font-semibold">
                                                    Technologies Used
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map(
                                                        (tech) => (
                                                            <Badge
                                                                key={tech}
                                                                variant="outline"
                                                                className="px-3 py-1"
                                                            >
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
                                            <div className="space-y-3">
                                                <h3 className="text-lg font-semibold">
                                                    Features
                                                </h3>
                                                <ul className="space-y-2">
                                                    {project.features.map(
                                                        (feature, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <span className="mt-1 text-primary">
                                                                    •
                                                                </span>
                                                                <span className="text-muted-foreground">
                                                                    {feature}
                                                                </span>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                    {/* Challenges & Solutions */}
                                    {project.challenges &&
                                        project.challenges.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold">
                                                    Challenges & Solutions
                                                </h3>
                                                <div className="space-y-4">
                                                    {project.challenges.map(
                                                        (challenge, index) => (
                                                            <div
                                                                key={index}
                                                                className="rounded-lg border p-4"
                                                            >
                                                                <div className="space-y-2">
                                                                    <h4 className="font-medium text-destructive">
                                                                        Challenge
                                                                    </h4>
                                                                    <p className="text-sm text-muted-foreground">
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
                                                                        <div className="space-y-2">
                                                                            <h4 className="font-medium text-green-600">
                                                                                Solution
                                                                            </h4>
                                                                            <p className="text-sm text-muted-foreground">
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
                                        project.demo_accounts.length > 0 && (
                                            <div className="space-y-3">
                                                <h3 className="text-lg font-semibold">
                                                    Demo Accounts
                                                </h3>
                                                <div className="space-y-3">
                                                    {project.demo_accounts.map(
                                                        (account, index) => (
                                                            <div
                                                                key={index}
                                                                className="rounded-lg border p-4"
                                                            >
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <Badge variant="secondary">
                                                                            {
                                                                                account.role
                                                                            }
                                                                        </Badge>
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
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {/* Testimonial */}
                                    {project.testimonial && (
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold">
                                                Testimonial
                                            </h3>
                                            <div className="rounded-lg border bg-muted/30 p-4">
                                                <blockquote className="text-muted-foreground italic">
                                                    "{project.testimonial.text}"
                                                </blockquote>
                                                <div className="mt-3 text-sm">
                                                    <div className="font-medium">
                                                        {
                                                            project.testimonial
                                                                .author
                                                        }
                                                    </div>
                                                    <div className="text-muted-foreground">
                                                        {
                                                            project.testimonial
                                                                .position
                                                        }
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
                        {/* Project Meta */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-muted/30">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Calendar className="h-5 w-5" />
                                    Project Meta
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                            <User className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Role
                                            </p>
                                            <p className="font-medium">
                                                {project.role}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                            <Clock className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Duration
                                            </p>
                                            <p className="font-medium">
                                                {project.duration}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                            <Calendar className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Year
                                            </p>
                                            <p className="font-medium">
                                                {project.year}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                            <span className="font-semibold text-primary-foreground">
                                                #
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Category
                                            </p>
                                            <p className="font-medium">
                                                {project.category}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                            <span className="font-semibold text-primary-foreground">
                                                #
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Sort Order
                                            </p>
                                            <p className="font-medium">
                                                {project.sort_order}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Links */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-muted/30">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <ExternalLink className="h-5 w-5" />
                                    Links
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-3">
                                    {project.github_url && (
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            asChild
                                        >
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github className="mr-2 h-4 w-4" />
                                                GitHub Repository
                                            </a>
                                        </Button>
                                    )}
                                    {project.live_url && (
                                        <Button
                                            className="w-full justify-start"
                                            asChild
                                        >
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Live Demo
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Project Info */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-muted/30">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Calendar className="h-5 w-5" />
                                    Project Info
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Created:
                                        </span>
                                        <span className="font-medium">
                                            {formatDate(project.created_at)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Updated:
                                        </span>
                                        <span className="font-medium">
                                            {formatDate(project.updated_at)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Status:
                                        </span>
                                        <Badge
                                            className={getStatusColor(
                                                project.status,
                                            )}
                                        >
                                            {project.status}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Featured:
                                        </span>
                                        <span className="font-medium">
                                            {project.featured ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
