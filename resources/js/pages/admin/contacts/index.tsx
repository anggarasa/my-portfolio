import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import DeleteConfirmationModal from '@/components/ui/delete-confirmation-modal';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    CheckCircle,
    Eye,
    FileText,
    Mail,
    MessageCircle,
    Trash2,
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

interface ContactsIndexProps {
    contacts: {
        data: Contact[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function ContactsIndex({ contacts }: ContactsIndexProps) {
    const [processing, setProcessing] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState<Contact | null>(
        null,
    );
    const { showSuccess, showError } = useToast();

    const handleMarkAsRead = (contactId: number) => {
        setProcessing(contactId);
        router.patch(
            `/admin/contacts/${contactId}/mark-read`,
            {},
            {
                onFinish: () => setProcessing(null),
            },
        );
    };

    const handleMarkAsReplied = (contactId: number) => {
        setProcessing(contactId);
        router.patch(
            `/admin/contacts/${contactId}/mark-replied`,
            {},
            {
                onFinish: () => setProcessing(null),
            },
        );
    };

    const handleDelete = (contact: Contact) => {
        setContactToDelete(contact);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (!contactToDelete) return;

        setProcessing(contactToDelete.id);
        router.delete(`/admin/contacts/${contactToDelete.id}`, {
            onSuccess: () => {
                showSuccess('Contact message deleted successfully!');
                setShowDeleteModal(false);
                setContactToDelete(null);
            },
            onError: (errors) => {
                const errorMessage =
                    (errors as any).error ||
                    'Failed to delete contact message. Please try again.';
                showError(errorMessage);
            },
            onFinish: () => {
                setProcessing(null);
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
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const truncateMessage = (message: string, maxLength: number = 100) => {
        return message.length > maxLength
            ? message.substring(0, maxLength) + '...'
            : message;
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
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Management" />

            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Contact Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage contact messages from your portfolio
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                Total: {contacts.total}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2">
                            <div className="h-2 w-2 rounded-full bg-destructive"></div>
                            <span className="text-sm font-medium text-destructive">
                                New:{' '}
                                {
                                    contacts.data.filter(
                                        (c) => c.status === 'new',
                                    ).length
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Messages Card */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b bg-muted/30">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Mail className="h-5 w-5" />
                            Contact Messages
                        </CardTitle>
                        <CardDescription>
                            All contact messages received through your portfolio
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {contacts.data.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                    <Mail className="h-10 w-10 text-muted-foreground" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">
                                    No contact messages
                                </h3>
                                <p className="mx-auto max-w-md text-muted-foreground">
                                    You haven't received any contact messages
                                    yet. Messages from your portfolio contact
                                    form will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="font-semibold">
                                                Name
                                            </TableHead>
                                            <TableHead className="font-semibold">
                                                Email
                                            </TableHead>
                                            <TableHead className="font-semibold">
                                                Message
                                            </TableHead>
                                            <TableHead className="font-semibold">
                                                Status
                                            </TableHead>
                                            <TableHead className="font-semibold">
                                                Date
                                            </TableHead>
                                            <TableHead className="text-right font-semibold">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {contacts.data.map((contact, index) => (
                                            <TableRow
                                                key={contact.id}
                                                className={`transition-colors hover:bg-muted/30 ${
                                                    contact.status === 'new'
                                                        ? 'bg-blue-50/50 dark:bg-blue-950/20'
                                                        : ''
                                                }`}
                                            >
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                                            {contact.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                        <span>
                                                            {contact.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <a
                                                        href={`mailto:${contact.email}`}
                                                        className="font-medium text-primary hover:underline"
                                                    >
                                                        {contact.email}
                                                    </a>
                                                </TableCell>
                                                <TableCell className="max-w-xs">
                                                    <div className="truncate text-sm text-muted-foreground">
                                                        {truncateMessage(
                                                            contact.message,
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        contact.status,
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {formatDate(
                                                        contact.created_at,
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Link
                                                                href={`/admin/contacts/${contact.id}`}
                                                                title="View Details"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>

                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Link
                                                                href={`/admin/contacts/${contact.id}/drafts`}
                                                                title="View Drafts"
                                                            >
                                                                <FileText className="h-4 w-4" />
                                                            </Link>
                                                        </Button>

                                                        {contact.status ===
                                                            'new' && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleMarkAsRead(
                                                                        contact.id,
                                                                    )
                                                                }
                                                                disabled={
                                                                    processing ===
                                                                    contact.id
                                                                }
                                                                className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700"
                                                                title="Mark as Read"
                                                            >
                                                                <CheckCircle className="h-4 w-4" />
                                                            </Button>
                                                        )}

                                                        {contact.status !==
                                                            'replied' && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleMarkAsReplied(
                                                                        contact.id,
                                                                    )
                                                                }
                                                                disabled={
                                                                    processing ===
                                                                    contact.id
                                                                }
                                                                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                                                title="Mark as Replied"
                                                            >
                                                                <MessageCircle className="h-4 w-4" />
                                                            </Button>
                                                        )}

                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    contact,
                                                                )
                                                            }
                                                            disabled={
                                                                processing ===
                                                                contact.id
                                                            }
                                                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                            title="Delete Message"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {contacts.last_page > 1 && (
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing{' '}
                                    <span className="font-medium">
                                        {(contacts.current_page - 1) *
                                            contacts.per_page +
                                            1}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {Math.min(
                                            contacts.current_page *
                                                contacts.per_page,
                                            contacts.total,
                                        )}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium">
                                        {contacts.total}
                                    </span>{' '}
                                    results
                                </div>
                                <div className="flex items-center gap-2">
                                    {contacts.current_page > 1 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    `/admin/contacts?page=${contacts.current_page - 1}`,
                                                )
                                            }
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-muted-foreground">
                                            Page
                                        </span>
                                        <span className="font-medium">
                                            {contacts.current_page}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            of {contacts.last_page}
                                        </span>
                                    </div>
                                    {contacts.current_page <
                                        contacts.last_page && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    `/admin/contacts?page=${contacts.current_page + 1}`,
                                                )
                                            }
                                        >
                                            Next
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setContactToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Delete Contact Message"
                description="Are you sure you want to delete this contact message from"
                itemName={contactToDelete?.name}
                isLoading={processing === contactToDelete?.id}
                confirmText="Delete Message"
                cancelText="Cancel"
            />
        </AppSidebarLayout>
    );
}
