import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Search } from 'lucide-react';
import { useState } from 'react';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'draft' | 'published' | 'archived';
    featured: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    projects: {
        data: Project[];
        links: any[];
        meta: any;
    };
    filters: {
        category?: string;
        status?: string;
        search?: string;
    };
    categories: string[];
}

export default function ProjectsIndex({
    projects,
    filters,
    categories,
}: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = () => {
        router.get(
            '/admin/projects',
            {
                search,
                category: category || undefined,
                status: status || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            '/admin/projects',
            {
                search,
                category:
                    key === 'category'
                        ? value === 'all'
                            ? undefined
                            : value
                        : category,
                status:
                    key === 'status'
                        ? value === 'all'
                            ? undefined
                            : value
                        : status,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

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

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Projects Management',
            href: '/admin/projects',
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects Management" />

            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Projects Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your portfolio projects
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                            <Plus className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                Total:{' '}
                                {projects.meta?.total || projects.data.length}
                            </span>
                        </div>
                        <Button asChild>
                            <Link href={'/admin/projects/create'}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Project
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b bg-muted/30">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Search className="h-5 w-5" />
                            Search & Filters
                        </CardTitle>
                        <CardDescription>
                            Filter and search through your projects
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search projects..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        onKeyPress={(e) =>
                                            e.key === 'Enter' && handleSearch()
                                        }
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select
                                value={category || 'all'}
                                onValueChange={(value) =>
                                    handleFilterChange('category', value)
                                }
                            >
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Categories
                                    </SelectItem>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={status || 'all'}
                                onValueChange={(value) =>
                                    handleFilterChange('status', value)
                                }
                            >
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Status
                                    </SelectItem>
                                    <SelectItem value="published">
                                        Published
                                    </SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="archived">
                                        Archived
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleSearch} variant="outline">
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Projects Grid */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b bg-muted/30">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Plus className="h-5 w-5" />
                            Projects
                        </CardTitle>
                        <CardDescription>
                            All projects in your portfolio
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {projects.data.length > 0 ? (
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {projects.data.map((project) => (
                                        <Card
                                            key={project.id}
                                            className="overflow-hidden border shadow-sm transition-shadow hover:shadow-md"
                                        >
                                            <CardHeader>
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-1">
                                                        <CardTitle className="text-lg">
                                                            {project.title}
                                                        </CardTitle>
                                                        <CardDescription className="line-clamp-2">
                                                            {
                                                                project.description
                                                            }
                                                        </CardDescription>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {project.featured && (
                                                            <Badge variant="secondary">
                                                                Featured
                                                            </Badge>
                                                        )}
                                                        <Badge
                                                            className={getStatusColor(
                                                                project.status,
                                                            )}
                                                        >
                                                            {project.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">
                                                            {project.category}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            asChild
                                                            className="flex-1"
                                                        >
                                                            <Link
                                                                href={
                                                                    '/admin/projects/' +
                                                                    project.id
                                                                }
                                                            >
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            asChild
                                                            className="flex-1"
                                                        >
                                                            <Link
                                                                href={
                                                                    '/admin/projects/' +
                                                                    project.id +
                                                                    '/edit'
                                                                }
                                                            >
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                    <Search className="h-10 w-10 text-muted-foreground" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">
                                    No Projects Found
                                </h3>
                                <p className="mx-auto max-w-md text-muted-foreground">
                                    No projects match your current filters.
                                    <br />
                                    Try adjusting your search criteria or create
                                    a new project.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {projects.meta && projects.meta.last_page > 1 && (
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing{' '}
                                    {projects.meta ? (
                                        <>
                                            <span className="font-medium">
                                                {(projects.meta.current_page -
                                                    1) *
                                                    projects.meta.per_page +
                                                    1}
                                            </span>{' '}
                                            to{' '}
                                            <span className="font-medium">
                                                {Math.min(
                                                    projects.meta.current_page *
                                                        projects.meta.per_page,
                                                    projects.meta.total,
                                                )}
                                            </span>{' '}
                                            of{' '}
                                            <span className="font-medium">
                                                {projects.meta.total}
                                            </span>{' '}
                                            results
                                        </>
                                    ) : (
                                        <span className="font-medium">
                                            {projects.data.length} projects
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    {projects.meta &&
                                        projects.meta.current_page > 1 && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    router.get(
                                                        `/admin/projects?page=${(projects.meta?.current_page || 1) - 1}`,
                                                    )
                                                }
                                            >
                                                Previous
                                            </Button>
                                        )}
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-muted-foreground">
                                            Page
                                        </span>
                                        <span className="font-medium">
                                            {projects.meta?.current_page || 1}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            of {projects.meta?.last_page || 1}
                                        </span>
                                    </div>
                                    {projects.meta &&
                                        projects.meta.current_page <
                                            projects.meta.last_page && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    router.get(
                                                        `/admin/projects?page=${(projects.meta?.current_page || 1) + 1}`,
                                                    )
                                                }
                                            >
                                                Next
                                            </Button>
                                        )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppSidebarLayout>
    );
}
