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
    Eye,
    RefreshCw,
    Shield,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface SecurityEvent {
    category: string;
    event: string;
    timestamp: string;
    ip_address: string;
    user_agent: string;
    user_id: number | null;
    session_id: string;
    url: string;
    method: string;
    data: any;
}

interface SecurityStats {
    total_events: number;
    critical_events: number;
    error_events: number;
    warning_events: number;
    categories: Record<string, number>;
    top_ips: Record<string, number>;
}

interface Props {
    stats: SecurityStats;
    recentEvents: SecurityEvent[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Security Dashboard',
        href: '/admin/security',
    },
];

export default function SecurityDashboard({ stats, recentEvents }: Props) {
    const [events, setEvents] = useState(recentEvents);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshEvents = async () => {
        setIsRefreshing(true);
        try {
            const response = await fetch('/admin/security/events');
            const data = await response.json();
            setEvents(data.events);
        } catch (error) {
            console.error('Failed to refresh events:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const getSeverityIcon = (event: SecurityEvent) => {
        const eventName = event.event.toLowerCase();
        if (eventName.includes('critical') || eventName.includes('attack')) {
            return <XCircle className="h-4 w-4 text-red-500" />;
        } else if (
            eventName.includes('error') ||
            eventName.includes('failed')
        ) {
            return <AlertTriangle className="h-4 w-4 text-orange-500" />;
        } else {
            return <CheckCircle className="h-4 w-4 text-yellow-500" />;
        }
    };

    const getSeverityColor = (event: SecurityEvent) => {
        const eventName = event.event.toLowerCase();
        if (eventName.includes('critical') || eventName.includes('attack')) {
            return 'bg-red-100 text-red-800';
        } else if (
            eventName.includes('error') ||
            eventName.includes('failed')
        ) {
            return 'bg-orange-100 text-orange-800';
        } else {
            return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'auth':
                return <Shield className="h-4 w-4" />;
            case 'file_upload':
                return <Database className="h-4 w-4" />;
            case 'suspicious':
                return <AlertTriangle className="h-4 w-4" />;
            case 'access_control':
                return <Eye className="h-4 w-4" />;
            case 'validation':
                return <CheckCircle className="h-4 w-4" />;
            default:
                return <Activity className="h-4 w-4" />;
        }
    };

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleString();
    };

    const getSecurityStatus = () => {
        if (stats.critical_events > 0) {
            return { status: 'critical', color: 'bg-red-100 text-red-800' };
        } else if (stats.error_events > 5) {
            return {
                status: 'warning',
                color: 'bg-yellow-100 text-yellow-800',
            };
        } else {
            return { status: 'healthy', color: 'bg-green-100 text-green-800' };
        }
    };

    const securityStatus = getSecurityStatus();

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Security Dashboard" />

            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Security Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Monitor security events and system protection
                        </p>
                    </div>
                    <Button
                        onClick={refreshEvents}
                        disabled={isRefreshing}
                        variant="outline"
                    >
                        <RefreshCw
                            className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                        />
                        Refresh
                    </Button>
                </div>

                {/* Security Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Security Status
                        </CardTitle>
                        <CardDescription>
                            Overall security posture of the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Badge className={securityStatus.color}>
                                {securityStatus.status.toUpperCase()}
                            </Badge>
                            <div className="text-sm text-muted-foreground">
                                {stats.critical_events > 0
                                    ? `${stats.critical_events} critical events detected`
                                    : stats.error_events > 5
                                      ? `${stats.error_events} error events require attention`
                                      : 'All systems secure'}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Statistics */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Events
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_events}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Security events logged
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Critical Events
                            </CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {stats.critical_events}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Requires immediate attention
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Error Events
                            </CardTitle>
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                {stats.error_events}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Failed security checks
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Warning Events
                            </CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">
                                {stats.warning_events}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Suspicious activities
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Event Categories */}
                <Card>
                    <CardHeader>
                        <CardTitle>Event Categories</CardTitle>
                        <CardDescription>
                            Security events by category
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(stats.categories).map(
                                ([category, count]) => (
                                    <div
                                        key={category}
                                        className="flex items-center justify-between rounded border p-3"
                                    >
                                        <div className="flex items-center gap-2">
                                            {getCategoryIcon(category)}
                                            <span className="font-medium capitalize">
                                                {category.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <Badge variant="secondary">
                                            {count}
                                        </Badge>
                                    </div>
                                ),
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Top IPs */}
                {Object.keys(stats.top_ips).length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Top IP Addresses</CardTitle>
                            <CardDescription>
                                IP addresses with most security events
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {Object.entries(stats.top_ips)
                                    .slice(0, 10)
                                    .map(([ip, count]) => (
                                        <div
                                            key={ip}
                                            className="flex items-center justify-between rounded border p-2"
                                        >
                                            <span className="font-mono text-sm">
                                                {ip}
                                            </span>
                                            <Badge variant="outline">
                                                {count} events
                                            </Badge>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Recent Security Events */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Security Events</CardTitle>
                        <CardDescription>
                            Latest security events and activities
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {events.length === 0 ? (
                                <div className="py-8 text-center text-muted-foreground">
                                    No security events found
                                </div>
                            ) : (
                                events.slice(0, 20).map((event, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 rounded border p-3"
                                    >
                                        <div className="mt-0.5">
                                            {getSeverityIcon(event)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-1 flex items-center gap-2">
                                                <Badge
                                                    className={getSeverityColor(
                                                        event,
                                                    )}
                                                    variant="outline"
                                                >
                                                    {event.category}
                                                </Badge>
                                                <span className="text-sm font-medium">
                                                    {event.event}
                                                </span>
                                            </div>
                                            <div className="space-y-1 text-sm text-muted-foreground">
                                                <div>
                                                    <strong>IP:</strong>{' '}
                                                    {event.ip_address}
                                                </div>
                                                <div>
                                                    <strong>Method:</strong>{' '}
                                                    {event.method} {event.url}
                                                </div>
                                                <div>
                                                    <strong>Time:</strong>{' '}
                                                    {formatTimestamp(
                                                        event.timestamp,
                                                    )}
                                                </div>
                                                {event.user_id && (
                                                    <div>
                                                        <strong>
                                                            User ID:
                                                        </strong>{' '}
                                                        {event.user_id}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
