import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, ExternalLink, Key, User } from 'lucide-react';
import { useState } from 'react';

interface DemoAccount {
    role: string;
    email: string;
    password: string;
    description?: string;
}

interface ProjectDemoProps {
    demoAccounts: DemoAccount[];
    liveUrl: string;
}

export default function ProjectDemo({
    demoAccounts,
    liveUrl,
}: ProjectDemoProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    if (!demoAccounts || demoAccounts.length === 0) {
        return null;
    }

    return (
        <section className="animate-on-scroll bg-muted/30 py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold">Demo Account</h2>
                    <p className="mt-2 text-muted-foreground">
                        Use these credentials to explore the application
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {demoAccounts.map((account, index) => (
                        <Card
                            key={index}
                            className="w-full max-w-sm border-border bg-card shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <CardHeader className="text-center">
                                <CardTitle className="flex items-center justify-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    <Badge
                                        variant="secondary"
                                        className="text-sm"
                                    >
                                        {account.role}
                                    </Badge>
                                </CardTitle>
                                {account.description && (
                                    <p className="text-sm text-muted-foreground">
                                        {account.description}
                                    </p>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Email
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={account.email}
                                            readOnly
                                            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                        />
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="shrink-0"
                                            onClick={() =>
                                                copyToClipboard(
                                                    account.email,
                                                    `email-${index}`,
                                                )
                                            }
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {copiedField === `email-${index}` && (
                                        <p className="text-xs text-green-600">
                                            ✓ Copied to clipboard!
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Password
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="password"
                                            value={account.password}
                                            readOnly
                                            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                        />
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="shrink-0"
                                            onClick={() =>
                                                copyToClipboard(
                                                    account.password,
                                                    `password-${index}`,
                                                )
                                            }
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {copiedField === `password-${index}` && (
                                        <p className="text-xs text-green-600">
                                            ✓ Copied to clipboard!
                                        </p>
                                    )}
                                </div>

                                {/* Login Button */}
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90"
                                    onClick={() =>
                                        window.open(liveUrl, '_blank')
                                    }
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Login to Demo
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        <Key className="mr-1 inline h-4 w-4" />
                        Demo accounts are reset periodically. Changes may not be
                        permanent.
                    </p>
                </div>
            </div>
        </section>
    );
}
