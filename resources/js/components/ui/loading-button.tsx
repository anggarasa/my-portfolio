import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface LoadingButtonProps {
    children: ReactNode;
    loading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    asChild?: boolean;
}

export function LoadingButton({
    children,
    loading = false,
    loadingText,
    disabled = false,
    variant = 'default',
    size = 'default',
    className = '',
    onClick,
    type = 'button',
    asChild = false,
    ...props
}: LoadingButtonProps) {
    return (
        <Button
            variant={variant}
            size={size}
            disabled={disabled || loading}
            className={className}
            onClick={onClick}
            type={type}
            asChild={asChild}
            {...props}
        >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading && loadingText ? loadingText : children}
        </Button>
    );
}
