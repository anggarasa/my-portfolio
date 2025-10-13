import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

interface ActivityItem {
    id: string;
    title: string;
    subtitle: string;
    status: string;
    date: string;
}

interface ActivityCardProps {
    title: string;
    description: string;
    items: ActivityItem[];
    emptyIcon: LucideIcon;
    emptyMessage: string;
    emptyAction?: {
        label: string;
        href: string;
    };
    viewAllHref: string;
    getStatusVariant?: (
        status: string,
    ) => 'default' | 'secondary' | 'outline' | 'destructive';
}

export default function ActivityCard({
    title,
    description,
    items,
    emptyIcon: EmptyIcon,
    emptyMessage,
    emptyAction,
    viewAllHref,
    getStatusVariant = () => 'default',
}: ActivityCardProps) {
    return (
        <Card className="border-border bg-card">
            <CardHeader>
                <CardTitle className="text-card-foreground">{title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                            >
                                <div className="flex-1">
                                    <div className="font-medium text-foreground">
                                        {item.title}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {item.subtitle} •{' '}
                                        {new Date(
                                            item.date,
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                                <Badge variant={getStatusVariant(item.status)}>
                                    {item.status}
                                </Badge>
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center text-muted-foreground">
                            <EmptyIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
                            <p>{emptyMessage}</p>
                            {emptyAction && (
                                <Button asChild className="mt-2" size="sm">
                                    <Link href={emptyAction.href}>
                                        {emptyAction.label}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <Button asChild variant="outline" className="w-full">
                        <Link href={viewAllHref}>View All</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
