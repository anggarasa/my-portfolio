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
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    ExternalLink,
    Mail,
    MessageCircle,
    Save,
    Send,
    Trash2,
    User,
} from 'lucide-react';
import { useState } from 'react';

interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    created_at: string;
    updated_at: string;
}

interface ContactShowProps {
    contact: Contact;
}

export default function ContactShow({ contact }: ContactShowProps) {
    const [processing, setProcessing] = useState(false);

    const {
        data,
        setData,
        post,
        processing: formProcessing,
        errors,
        reset,
    } = useForm({
        subject: `Re: Contact from Portfolio`,
        message: '',
    });

    const handleMarkAsRead = () => {
        setProcessing(true);
        router.patch(
            `/admin/contacts/${contact.id}/mark-read`,
            {},
            {
                onFinish: () => setProcessing(false),
            },
        );
    };

    const handleMarkAsReplied = () => {
        setProcessing(true);
        router.patch(
            `/admin/contacts/${contact.id}/mark-replied`,
            {},
            {
                onFinish: () => setProcessing(false),
            },
        );
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this contact message?')) {
            setProcessing(true);
            router.delete(`/admin/contacts/${contact.id}`, {
                onFinish: () => setProcessing(false),
            });
        }
    };

    const handleSendReply = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/contacts/${contact.id}/reply/send`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleSaveDraft = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/contacts/${contact.id}/reply/draft`, {
            onSuccess: () => {
                // Don't reset form for draft
            },
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new':
                return <Badge variant="destructive">New</Badge>;
            case 'read':
                return <Badge variant="secondary">Read</Badge>;
            case 'replied':
                return <Badge variant="default">Replied</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Contact Management',
            href: '/admin/contacts',
        },
        {
            title: `Contact from ${contact.name}`,
            href: `/admin/contacts/${contact.id}`,
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Contact from ${contact.name}`} />

            <div className="space-y-6 p-4">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/contacts">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Contacts
                            </Link>
                        </Button>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight">
                                Contact Details
                            </h1>
                            <p className="text-muted-foreground">
                                Message from {contact.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {getStatusBadge(contact.status)}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Contact Information */}
                    <div className="space-y-6 lg:col-span-1">
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-muted/30">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <User className="h-5 w-5" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                                        {contact.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold">
                                            {contact.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {contact.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Email Address
                                        </label>
                                        <div className="mt-1">
                                            <a
                                                href={`mailto:${contact.email}`}
                                                className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                            >
                                                {contact.email}
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Status
                                        </label>
                                        <div className="mt-1">
                                            {getStatusBadge(contact.status)}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Received
                                        </label>
                                        <p className="mt-1 flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(contact.created_at)}
                                        </p>
                                    </div>

                                    {contact.updated_at !==
                                        contact.created_at && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Last Updated
                                            </label>
                                            <p className="mt-1 flex items-center gap-2 text-sm">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(contact.updated_at)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-muted/30">
                                <CardTitle className="text-xl">
                                    Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 p-6">
                                {contact.status === 'new' && (
                                    <Button
                                        variant="outline"
                                        className="h-12 w-full justify-start"
                                        onClick={handleMarkAsRead}
                                        disabled={processing}
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Mark as Read
                                    </Button>
                                )}

                                {contact.status !== 'replied' && (
                                    <Button
                                        variant="outline"
                                        className="h-12 w-full justify-start"
                                        onClick={handleMarkAsReplied}
                                        disabled={processing}
                                    >
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Mark as Replied
                                    </Button>
                                )}

                                <Button
                                    variant="outline"
                                    className="h-12 w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    onClick={handleDelete}
                                    disabled={processing}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Message
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Message Content */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-muted/30">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Mail className="h-5 w-5" />
                                    Message
                                </CardTitle>
                                <CardDescription>
                                    Full message content from {contact.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="prose prose-sm max-w-none">
                                    <div className="rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                                        {contact.message}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Reply */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-muted/30">
                                <CardTitle className="text-xl">
                                    Quick Reply
                                </CardTitle>
                                <CardDescription>
                                    Reply directly to this contact
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <form
                                        onSubmit={handleSendReply}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground">
                                                    To
                                                </label>
                                                <p className="text-sm font-medium">
                                                    {contact.email}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground">
                                                    Subject
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.subject}
                                                    onChange={(e) =>
                                                        setData(
                                                            'subject',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mt-1 w-full rounded-lg border p-2 text-sm focus:border-transparent focus:ring-2 focus:ring-primary"
                                                    placeholder="Enter subject..."
                                                />
                                                {errors.subject && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors.subject}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Message
                                            </label>
                                            <textarea
                                                value={data.message}
                                                onChange={(e) =>
                                                    setData(
                                                        'message',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-2 w-full resize-none rounded-lg border p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                                                rows={6}
                                                placeholder="Type your reply here..."
                                            />
                                            {errors.message && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-3">
                                            <Button
                                                type="submit"
                                                disabled={formProcessing}
                                                className="flex items-center gap-2"
                                            >
                                                <Send className="h-4 w-4" />
                                                {formProcessing
                                                    ? 'Sending...'
                                                    : 'Send Reply'}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleSaveDraft}
                                                disabled={formProcessing}
                                                className="flex items-center gap-2"
                                            >
                                                <Save className="h-4 w-4" />
                                                Save Draft
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
