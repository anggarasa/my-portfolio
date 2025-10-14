import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { AlertTriangle, Home, RefreshCw, Server, XCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ErrorPageProps {
    status: number;
    title: string;
    description: string;
    showRetry?: boolean;
    className?: string;
}

const errorConfig = {
    404: {
        icon: XCircle,
        color: 'text-muted-foreground',
        bgColor: 'bg-muted/20',
        suggestions: [
            'Please check the URL you typed',
            'Use the navigation menu to find the page you are looking for',
        ],
    },
    500: {
        icon: Server,
        color: 'text-destructive',
        bgColor: 'bg-destructive/10',
        suggestions: [
            'Try refreshing this page',
            'If the problem persists, please contact the administrator',
        ],
    },
    403: {
        icon: XCircle,
        color: 'text-destructive',
        bgColor: 'bg-destructive/10',
        suggestions: [
            'You do not have access to this page',
            'Please log in with an account that has the appropriate access',
        ],
    },
    503: {
        icon: AlertTriangle,
        color: 'text-destructive',
        bgColor: 'bg-destructive/10',
        suggestions: [
            'The server is currently under maintenance',
            'Please try again in a few moments',
        ],
    },
};

export default function ErrorPage({
    status,
    title,
    description,
    showRetry = false,
    className,
}: ErrorPageProps) {
    const config =
        errorConfig[status as keyof typeof errorConfig] || errorConfig[404];
    const IconComponent = config.icon;

    // Refs for GSAP animations
    const containerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline();

        // Initial state
        gsap.set(
            [
                iconRef.current,
                statusRef.current,
                titleRef.current,
                descriptionRef.current,
                suggestionsRef.current,
                buttonRef.current,
            ],
            {
                opacity: 0,
                y: 30,
            },
        );

        // Animate elements in sequence
        tl.to(iconRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
        })
            .to(
                statusRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.3',
            )
            .to(
                titleRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.2',
            )
            .to(
                descriptionRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.2',
            )
            .to(
                suggestionsRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.2',
            )
            .to(
                buttonRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.2',
            );

        // Icon animation based on error type
        if (status === 404) {
            gsap.to(iconRef.current, {
                rotation: 360,
                duration: 2,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
            });
        } else if (status === 500) {
            gsap.to(iconRef.current, {
                y: -10,
                duration: 1,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
            });
        } else if (status === 403) {
            gsap.to(iconRef.current, {
                x: -5,
                duration: 0.1,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: 3,
                onComplete: () => {
                    gsap.to(iconRef.current, {
                        x: 0,
                        duration: 0.1,
                    });
                },
            });
        } else if (status === 503) {
            gsap.to(iconRef.current, {
                scale: 1.1,
                duration: 0.75,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: -1,
            });
        }

        return () => {
            tl.kill();
        };
    }, [status]);

    return (
        <div
            ref={containerRef}
            className={cn(
                'flex min-h-screen items-center justify-center p-4',
                className,
            )}
        >
            <div className="mx-auto w-full max-w-lg">
                <Card className="text-center">
                    <CardHeader className="pb-4">
                        <div
                            ref={iconRef}
                            className={cn(
                                'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full',
                                config.bgColor,
                            )}
                        >
                            <IconComponent
                                className={cn('h-8 w-8', config.color)}
                            />
                        </div>

                        <div ref={statusRef} className="space-y-1">
                            <CardTitle className="text-3xl font-bold text-foreground">
                                {status}
                            </CardTitle>
                            <CardTitle className="text-xl font-semibold text-foreground">
                                {title}
                            </CardTitle>
                        </div>

                        <CardDescription
                            ref={descriptionRef}
                            className="mx-auto max-w-sm text-sm text-muted-foreground"
                        >
                            {description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {/* Suggestions */}
                        <div ref={suggestionsRef} className="text-left">
                            <h3 className="mb-2 text-xs font-medium text-foreground">
                                Suggestions:
                            </h3>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                {config.suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="mt-0.5 text-xs text-primary">
                                            •
                                        </span>
                                        <span>{suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Button */}
                        <div
                            ref={buttonRef}
                            className="flex flex-col gap-2 sm:flex-row sm:justify-center"
                        >
                            <Button
                                asChild
                                size="default"
                                className="w-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg sm:w-auto"
                            >
                                <Link href="/">
                                    <Home className="mr-2 h-4 w-4" />
                                    Back to Home
                                </Link>
                            </Button>

                            {showRetry && (
                                <Button
                                    variant="outline"
                                    size="default"
                                    className="w-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg sm:ml-3 sm:w-auto"
                                    onClick={() => window.location.reload()}
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Try Again
                                </Button>
                            )}
                        </div>

                        {/* Additional Help */}
                        <div className="border-t border-border pt-3">
                            <p className="text-xs text-muted-foreground">
                                If the problem persists, please{' '}
                                <Link
                                    href="/contact"
                                    className="text-primary transition-all duration-200 hover:text-primary/80 hover:underline"
                                >
                                    contact us
                                </Link>{' '}
                                for assistance.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
