import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
    isLoading: boolean;
    text?: string;
    className?: string;
}

export function LoadingOverlay({
    isLoading,
    text = 'Loading...',
    className = ''
}: LoadingOverlayProps) {
    if (!isLoading) return null;

    return (
        <div className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}>
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">{text}</p>
            </div>
        </div>
    );
}
