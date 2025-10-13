import ActivityCard from '@/components/dashboard/ActivityCard';
import StatsCard from '@/components/dashboard/StatsCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    AlertTriangle,
    CheckCircle,
    Database,
    HardDrive,
    Mail,
    MessageSquare,
    Plus,
    XCircle,
} from 'lucide-react';

interface Project {
    id: string;
    title: string;
    status: string;
    category: string;
    created_at: string;
}

interface Contact {
    id: string;
    name: string;
    email: string;
    status: string;
    created_at: string;
}

interface ProjectStats {
    total: number;
    published: number;
    draft: number;
    featured: number;
    categories: number;
}

interface ContactStats {
    total: number;
    new: number;
    read: number;
    replied: number;
}

interface SystemHealth {
    status: 'healthy' | 'warning' | 'critical';
    issues: string[];
    metrics: {
        memory_usage: number;
        memory_limit: number;
        execution_time: number;
        database_connections: any[];
    };
}

interface SystemMetrics {
    memory_usage: number;
    memory_peak: number;
    memory_limit: number;
    execution_time: number;
    database_connections: any[];
}

interface GrowthStats {
    current: number;
    previous: number;
    growth: number;
}

interface Props {
    projectStats: ProjectStats;
    contactStats: ContactStats;
    recentProjects: Project[];
    recentContacts: Contact[];
    systemHealth: SystemHealth;
    systemMetrics: SystemMetrics;
    projectGrowth: GrowthStats;
    contactGrowth: GrowthStats;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({
    projectStats,
    contactStats,
    recentProjects,
    recentContacts,
    systemHealth,
    systemMetrics,
    projectGrowth,
    contactGrowth,
}: Props) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'healthy':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'warning':
                return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
            case 'critical':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Activity className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'healthy':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'critical':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const formatBytes = (bytes: number): string => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    };

    const formatDuration = (seconds: number): string => {
        if (seconds < 1) {
            return `${(seconds * 1000).toFixed(0)}ms`;
        }
        return `${seconds.toFixed(2)}s`;
    };

    const memoryUsagePercent =
        (systemMetrics.memory_usage / systemMetrics.memory_limit) * 100;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Welcome Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Welcome to Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Here's what's happening with your portfolio today.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/projects/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total Projects"
                        value={projectStats.total}
                        icon={Database}
                        trend={{
                            value: projectGrowth.growth,
                            label: 'from last month',
                        }}
                    />

                    <StatsCard
                        title="Contact Messages"
                        value={contactStats.total}
                        icon={Mail}
                        trend={{
                            value: contactGrowth.growth,
                            label: 'from last month',
                        }}
                    />

                    <StatsCard
                        title="System Health"
                        value={
                            <Badge
                                className={getStatusColor(systemHealth.status)}
                            >
                                {systemHealth.status.toUpperCase()}
                            </Badge>
                        }
                        icon={Activity}
                        description={
                            systemHealth.issues.length > 0
                                ? systemHealth.issues.join(', ')
                                : 'All systems operational'
                        }
                    />

                    <StatsCard
                        title="Memory Usage"
                        value={formatBytes(systemMetrics.memory_usage)}
                        icon={HardDrive}
                        description={`${memoryUsagePercent.toFixed(1)}% of ${formatBytes(systemMetrics.memory_limit)}`}
                    />
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ActivityCard
                        title="Recent Projects"
                        description="Latest projects in your portfolio"
                        items={recentProjects.map((project) => ({
                            id: project.id,
                            title: project.title,
                            subtitle: project.category,
                            status: project.status,
                            date: project.created_at,
                        }))}
                        emptyIcon={Database}
                        emptyMessage="No projects yet"
                        viewAllHref="/admin/projects"
                        getStatusVariant={(status) =>
                            status === 'published' ? 'default' : 'secondary'
                        }
                    />

                    <ActivityCard
                        title="Recent Messages"
                        description="Latest contact messages"
                        items={recentContacts.map((contact) => ({
                            id: contact.id,
                            title: contact.name,
                            subtitle: contact.email,
                            status: contact.status,
                            date: contact.created_at,
                        }))}
                        emptyIcon={MessageSquare}
                        emptyMessage="No messages yet"
                        viewAllHref="/admin/contacts"
                        getStatusVariant={(status) => {
                            switch (status) {
                                case 'new':
                                    return 'default';
                                case 'read':
                                    return 'secondary';
                                default:
                                    return 'outline';
                            }
                        }}
                    />
                </div>

                {/* Quick Actions */}
                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">
                            Quick Actions
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Common tasks and shortcuts
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Button
                                asChild
                                variant="outline"
                                className="h-auto p-4"
                            >
                                <Link
                                    href="/admin/projects/create"
                                    className="flex flex-col items-center space-y-2"
                                >
                                    <Plus className="h-6 w-6" />
                                    <span>New Project</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="h-auto p-4"
                            >
                                <Link
                                    href="/admin/contacts"
                                    className="flex flex-col items-center space-y-2"
                                >
                                    <Mail className="h-6 w-6" />
                                    <span>View Messages</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="h-auto p-4"
                            >
                                <Link
                                    href="/admin/performance"
                                    className="flex flex-col items-center space-y-2"
                                >
                                    <Activity className="h-6 w-6" />
                                    <span>Performance</span>
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
