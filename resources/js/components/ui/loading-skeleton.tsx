import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
}

export function LoadingSkeleton({
    className = '',
    variant = 'rectangular'
}: LoadingSkeletonProps) {
    const baseClasses = 'animate-pulse bg-muted';

    const variantClasses = {
        text: 'h-4 rounded',
        circular: 'h-12 w-12 rounded-full',
        rectangular: 'h-4 w-full rounded'
    };

    return (
        <div
            className={cn(
                baseClasses,
                variantClasses[variant],
                className
            )}
        />
    );
}

export function LoadingSkeletonCard() {
    return (
        <div className="space-y-4 p-6">
            <div className="space-y-2">
                <LoadingSkeleton className="h-6 w-3/4" />
                <LoadingSkeleton className="h-4 w-1/2" />
            </div>
            <div className="space-y-2">
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-5/6" />
                <LoadingSkeleton className="h-4 w-4/6" />
            </div>
            <div className="flex gap-2">
                <LoadingSkeleton className="h-8 w-20" />
                <LoadingSkeleton className="h-8 w-20" />
            </div>
        </div>
    );
}
