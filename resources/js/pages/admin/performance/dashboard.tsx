import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertTriangle,
    CheckCircle,
    Clock,
    Database,
    HardDrive,
    RefreshCw,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface SystemMetrics {
    memory_usage: number;
    memory_peak: number;
    memory_limit: number;
    execution_time: number;
    database_connections: any[];
}

interface HealthStatus {
    status: 'healthy' | 'warning' | 'critical';
    issues: string[];
    metrics: SystemMetrics;
    timestamp: string;
}

interface PerformanceReport {
    timestamp: string;
    system_metrics: SystemMetrics;
    recent_slow_operations: any[];
    database_performance: any;
}

interface Props {
    performanceReport: PerformanceReport;
    healthStatus: HealthStatus;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Performance Dashboard',
        href: '/admin/performance',
    },
];

export default function PerformanceDashboard({
    performanceReport,
    healthStatus,
}: Props) {
    const [metrics, setMetrics] = useState(performanceReport);
    const [health, setHealth] = useState(healthStatus);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshMetrics = async () => {
        setIsRefreshing(true);
        try {
            const response = await fetch('/admin/performance/metrics');
            const data = await response.json();
            setMetrics((prev) => ({ ...prev, ...data }));
            setHealth(data.health_status);
        } catch (error) {
            console.error('Failed to refresh metrics:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

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
                return 'bg-green-100 text-green-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            case 'critical':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
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
        (health.metrics.memory_usage / health.metrics.memory_limit) * 100;

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Performance Dashboard" />

            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Performance Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Monitor system performance and health metrics
                        </p>
                    </div>
                    <Button
                        onClick={refreshMetrics}
                        disabled={isRefreshing}
                        variant="outline"
                    >
                        <RefreshCw
                            className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                        />
                        Refresh
                    </Button>
                </div>

                {/* Health Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {getStatusIcon(health.status)}
                            System Health Status
                        </CardTitle>
                        <CardDescription>
                            Last updated:{' '}
                            {new Date(health.timestamp).toLocaleString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Badge className={getStatusColor(health.status)}>
                                {health.status.toUpperCase()}
                            </Badge>
                            {health.issues.length > 0 && (
                                <div className="text-sm text-muted-foreground">
                                    Issues: {health.issues.join(', ')}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* System Metrics */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Memory Usage
                            </CardTitle>
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatBytes(health.metrics.memory_usage)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {memoryUsagePercent.toFixed(1)}% of{' '}
                                {formatBytes(health.metrics.memory_limit)}
                            </div>
                            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                                <div
                                    className={`h-2 rounded-full ${
                                        memoryUsagePercent > 90
                                            ? 'bg-red-500'
                                            : memoryUsagePercent > 80
                                              ? 'bg-yellow-500'
                                              : 'bg-green-500'
                                    }`}
                                    style={{
                                        width: `${Math.min(memoryUsagePercent, 100)}%`,
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Peak Memory
                            </CardTitle>
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatBytes(health.metrics.memory_peak)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Highest memory usage
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Execution Time
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatDuration(health.metrics.execution_time)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Since application start
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                DB Connections
                            </CardTitle>
                            <Database className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {Array.isArray(
                                    health.metrics.database_connections,
                                )
                                    ? health.metrics.database_connections.length
                                    : 0}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Active connections
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Database Performance */}
                {metrics.database_performance && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Database Performance</CardTitle>
                            <CardDescription>
                                Query performance metrics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <div className="text-sm font-medium">
                                        Total Queries
                                    </div>
                                    <div className="text-2xl font-bold">
                                        {metrics.database_performance
                                            .total_queries || 0}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium">
                                        Total Time
                                    </div>
                                    <div className="text-2xl font-bold">
                                        {formatDuration(
                                            metrics.database_performance
                                                .total_time || 0,
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium">
                                        Average Time
                                    </div>
                                    <div className="text-2xl font-bold">
                                        {formatDuration(
                                            metrics.database_performance
                                                .average_time || 0,
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Recent Slow Operations */}
                {metrics.recent_slow_operations &&
                    metrics.recent_slow_operations.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Slow Operations</CardTitle>
                                <CardDescription>
                                    Operations that took longer than 1 second
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {metrics.recent_slow_operations
                                        .slice(0, 5)
                                        .map((operation, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded bg-gray-50 p-2"
                                            >
                                                <div>
                                                    <div className="font-medium">
                                                        {operation.operation}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {new Date(
                                                            operation.timestamp,
                                                        ).toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-red-600">
                                                        {operation.duration.toFixed(
                                                            0,
                                                        )}
                                                        ms
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {formatBytes(
                                                            operation.memory_used,
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
            </div>
        </AppSidebarLayout>
    );
}
