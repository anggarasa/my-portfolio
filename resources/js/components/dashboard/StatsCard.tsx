import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number | React.ReactNode;
    icon: LucideIcon;
    trend?: {
        value: number;
        label: string;
    };
    description?: string;
    className?: string;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    description,
    className = '',
}: StatsCardProps) {
    return (
        <Card className={`border-border bg-card ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-card-foreground">
                    {value}
                </div>
                {trend && (
                    <div className="flex items-center text-xs text-muted-foreground">
                        {trend.value >= 0 ? (
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                        ) : (
                            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                        )}
                        {Math.abs(trend.value)}% {trend.label}
                    </div>
                )}
                {description && (
                    <div className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
