import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import DeleteConfirmationModal from '@/components/ui/delete-confirmation-modal';
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
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Edit,
    Eye,
    Filter,
    Grid3X3,
    List,
    Plus,
    Search,
    Star,
    Tag,
    Trash2,
} from 'lucide-react';
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
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        project: Project | null;
    }>({
        isOpen: false,
        project: null,
    });

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

    const handleDeleteProject = (projectId: string) => {
        router.delete(`/admin/projects/${projectId}`, {
            onSuccess: () => {
                setDeleteModal({ isOpen: false, project: null });
                // The page will automatically refresh due to Inertia
            },
            onError: (errors) => {
                console.error('Error deleting project:', errors);
            },
        });
    };

    const openDeleteModal = (project: Project) => {
        setDeleteModal({ isOpen: true, project });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, project: null });
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

            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
                <div className="space-y-8 p-6">
                    {/* Modern Header Section */}
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 p-8">
                        <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
                        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Grid3X3 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                                            Projects Management
                                        </h1>
                                        <p className="text-lg text-muted-foreground">
                                            Manage and showcase your portfolio
                                            projects
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 px-4 py-3 shadow-sm backdrop-blur-sm">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                        <Star className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Total Projects
                                        </p>
                                        <p className="text-xl font-bold">
                                            {projects.meta?.total ||
                                                projects.data.length}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    asChild
                                    size="lg"
                                    className="shadow-lg transition-all duration-200 hover:shadow-xl"
                                >
                                    <Link href={'/admin/projects/create'}>
                                        <Plus className="mr-2 h-5 w-5" />
                                        Create New Project
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Filters Section */}
                    <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                        <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <Filter className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">
                                            Search & Filters
                                        </CardTitle>
                                        <CardDescription>
                                            Find and filter your projects with
                                            ease
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={
                                            viewMode === 'grid'
                                                ? 'default'
                                                : 'outline'
                                        }
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                        className="h-9 w-9 p-0"
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={
                                            viewMode === 'list'
                                                ? 'default'
                                                : 'outline'
                                        }
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                        className="h-9 w-9 p-0"
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
                                <div className="lg:col-span-4">
                                    <label className="mb-2 block text-sm font-medium text-foreground">
                                        Search Projects
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            placeholder="Search by title, description..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            onKeyPress={(e) =>
                                                e.key === 'Enter' &&
                                                handleSearch()
                                            }
                                            className="h-11 border-border/50 pl-10 focus:border-primary/50 focus:ring-primary/20"
                                        />
                                    </div>
                                </div>
                                <div className="lg:col-span-3">
                                    <label className="mb-2 block text-sm font-medium text-foreground">
                                        Category
                                    </label>
                                    <Select
                                        value={category || 'all'}
                                        onValueChange={(value) =>
                                            handleFilterChange(
                                                'category',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger className="h-11 border-border/50 focus:border-primary/50 focus:ring-primary/20">
                                            <Tag className="mr-2 h-4 w-4" />
                                            <SelectValue placeholder="All Categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Categories
                                            </SelectItem>
                                            {categories.map((cat) => (
                                                <SelectItem
                                                    key={cat}
                                                    value={cat}
                                                >
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="lg:col-span-3">
                                    <label className="mb-2 block text-sm font-medium text-foreground">
                                        Status
                                    </label>
                                    <Select
                                        value={status || 'all'}
                                        onValueChange={(value) =>
                                            handleFilterChange('status', value)
                                        }
                                    >
                                        <SelectTrigger className="h-11 border-border/50 focus:border-primary/50 focus:ring-primary/20">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <SelectValue placeholder="All Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Status
                                            </SelectItem>
                                            <SelectItem value="published">
                                                Published
                                            </SelectItem>
                                            <SelectItem value="draft">
                                                Draft
                                            </SelectItem>
                                            <SelectItem value="archived">
                                                Archived
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="lg:col-span-2">
                                    <Button
                                        onClick={handleSearch}
                                        className="h-11 w-full shadow-sm transition-all duration-200 hover:shadow-md"
                                    >
                                        <Search className="mr-2 h-4 w-4" />
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Modern Projects Section */}
                    <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                        <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <Grid3X3 className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">
                                            Your Projects
                                        </CardTitle>
                                        <CardDescription>
                                            {projects.data.length} project
                                            {projects.data.length !== 1
                                                ? 's'
                                                : ''}{' '}
                                            in your portfolio
                                        </CardDescription>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {projects.data.length > 0 ? (
                                <div className="p-6">
                                    {viewMode === 'grid' ? (
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                            {projects.data.map((project) => (
                                                <Card
                                                    key={project.id}
                                                    className="group overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
                                                >
                                                    <CardHeader className="pb-3">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1 space-y-2">
                                                                <div className="flex items-center gap-2">
                                                                    {project.featured && (
                                                                        <Badge className="border-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-sm">
                                                                            <Star className="mr-1 h-3 w-3" />
                                                                            Featured
                                                                        </Badge>
                                                                    )}
                                                                    <Badge
                                                                        className={`${getStatusColor(project.status)} border-0 shadow-sm`}
                                                                    >
                                                                        {
                                                                            project.status
                                                                        }
                                                                    </Badge>
                                                                </div>
                                                                <CardTitle className="line-clamp-2 text-lg transition-colors group-hover:text-primary">
                                                                    {
                                                                        project.title
                                                                    }
                                                                </CardTitle>
                                                                <CardDescription className="line-clamp-3 text-sm">
                                                                    {
                                                                        project.description
                                                                    }
                                                                </CardDescription>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="pt-0">
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-2">
                                                                <Tag className="h-4 w-4 text-muted-foreground" />
                                                                <Badge
                                                                    variant="outline"
                                                                    className="bg-muted/50"
                                                                >
                                                                    {
                                                                        project.category
                                                                    }
                                                                </Badge>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    asChild
                                                                    className="flex-1 transition-all hover:border-primary/20 hover:bg-primary/5"
                                                                >
                                                                    <Link
                                                                        href={`/admin/projects/${project.id}`}
                                                                    >
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        View
                                                                    </Link>
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    asChild
                                                                    className="flex-1 transition-all hover:border-primary/20 hover:bg-primary/5"
                                                                >
                                                                    <Link
                                                                        href={`/admin/projects/${project.id}/edit`}
                                                                    >
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </Link>
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        openDeleteModal(
                                                                            project,
                                                                        )
                                                                    }
                                                                    className="flex-1 border-destructive/20 text-destructive transition-all hover:border-destructive/30 hover:bg-destructive/5"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {projects.data.map((project) => (
                                                <Card
                                                    key={project.id}
                                                    className="group overflow-hidden border-0 bg-gradient-to-r from-card to-card/50 shadow-sm transition-all duration-300 hover:bg-card/80 hover:shadow-lg"
                                                >
                                                    <CardContent className="p-6">
                                                        <div className="flex items-center gap-6">
                                                            <div className="flex-1">
                                                                <div className="mb-3 flex items-center gap-3">
                                                                    {project.featured && (
                                                                        <Badge className="border-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-sm">
                                                                            <Star className="mr-1 h-3 w-3" />
                                                                            Featured
                                                                        </Badge>
                                                                    )}
                                                                    <Badge
                                                                        className={`${getStatusColor(project.status)} border-0 shadow-sm`}
                                                                    >
                                                                        {
                                                                            project.status
                                                                        }
                                                                    </Badge>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="bg-muted/50"
                                                                    >
                                                                        <Tag className="mr-1 h-3 w-3" />
                                                                        {
                                                                            project.category
                                                                        }
                                                                    </Badge>
                                                                </div>
                                                                <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                                                                    {
                                                                        project.title
                                                                    }
                                                                </h3>
                                                                <p className="line-clamp-2 text-muted-foreground">
                                                                    {
                                                                        project.description
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    asChild
                                                                    className="transition-all hover:border-primary/20 hover:bg-primary/5"
                                                                >
                                                                    <Link
                                                                        href={`/admin/projects/${project.id}`}
                                                                    >
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        View
                                                                    </Link>
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    asChild
                                                                    className="transition-all hover:border-primary/20 hover:bg-primary/5"
                                                                >
                                                                    <Link
                                                                        href={`/admin/projects/${project.id}/edit`}
                                                                    >
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </Link>
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        openDeleteModal(
                                                                            project,
                                                                        )
                                                                    }
                                                                    className="border-destructive/20 text-destructive transition-all hover:border-destructive/30 hover:bg-destructive/5"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-16 text-center">
                                    <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/50 shadow-lg">
                                        <Search className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-semibold">
                                        No Projects Found
                                    </h3>
                                    <p className="mx-auto mb-6 max-w-md text-lg text-muted-foreground">
                                        No projects match your current filters.
                                        Try adjusting your search criteria or
                                        create a new project to get started.
                                    </p>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="shadow-lg transition-all duration-200 hover:shadow-xl"
                                    >
                                        <Link href={'/admin/projects/create'}>
                                            <Plus className="mr-2 h-5 w-5" />
                                            Create Your First Project
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Enhanced Pagination */}
                    {projects.meta && projects.meta.last_page > 1 && (
                        <Card className="border-0 bg-background/80 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                                            <span className="text-sm font-medium text-foreground">
                                                Showing{' '}
                                                <span className="text-primary">
                                                    {(projects.meta
                                                        .current_page -
                                                        1) *
                                                        projects.meta.per_page +
                                                        1}
                                                </span>{' '}
                                                to{' '}
                                                <span className="text-primary">
                                                    {Math.min(
                                                        projects.meta
                                                            .current_page *
                                                            projects.meta
                                                                .per_page,
                                                        projects.meta.total,
                                                    )}
                                                </span>{' '}
                                                of{' '}
                                                <span className="text-primary">
                                                    {projects.meta.total}
                                                </span>{' '}
                                                results
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    `/admin/projects?page=${(projects.meta?.current_page || 1) - 1}`,
                                                )
                                            }
                                            disabled={
                                                projects.meta.current_page <= 1
                                            }
                                            className="transition-all hover:border-primary/20 hover:bg-primary/5 disabled:opacity-50"
                                        >
                                            <ChevronLeft className="mr-2 h-4 w-4" />
                                            Previous
                                        </Button>
                                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-2">
                                            <span className="text-sm text-muted-foreground">
                                                Page
                                            </span>
                                            <span className="font-semibold text-foreground">
                                                {projects.meta.current_page}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                of
                                            </span>
                                            <span className="font-semibold text-foreground">
                                                {projects.meta.last_page}
                                            </span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    `/admin/projects?page=${(projects.meta?.current_page || 1) + 1}`,
                                                )
                                            }
                                            disabled={
                                                projects.meta.current_page >=
                                                projects.meta.last_page
                                            }
                                            className="transition-all hover:border-primary/20 hover:bg-primary/5 disabled:opacity-50"
                                        >
                                            Next
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={closeDeleteModal}
                onConfirm={() =>
                    deleteModal.project &&
                    handleDeleteProject(deleteModal.project.id)
                }
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone and will permanently remove the project and all associated images."
                itemName={deleteModal.project?.title}
                confirmText="Delete Project"
                cancelText="Cancel"
            />
        </AppSidebarLayout>
    );
}
