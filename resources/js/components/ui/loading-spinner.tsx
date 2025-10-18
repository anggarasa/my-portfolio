interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
            <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`}></div>
        </div>
    );
}

// Full page loading component
export function FullPageLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading...</p>
            </div>
        </div>
    );
}

// Section loading component
export function SectionLoading() {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );
}
