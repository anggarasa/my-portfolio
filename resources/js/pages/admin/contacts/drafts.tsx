import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import DeleteConfirmationModal from '@/components/ui/delete-confirmation-modal';
import EditDraftModal from '@/components/ui/edit-draft-modal';
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
    ArrowLeft,
    Calendar,
    Edit,
    Mail,
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

interface Draft {
    id: number;
    contact_id: number;
    subject: string;
    message: string;
    status: 'draft' | 'sent';
    sent_at: string | null;
    created_at: string;
    updated_at: string;
}

interface DraftsProps {
    contact: Contact;
    drafts: Draft[];
}

export default function Drafts({ contact, drafts }: DraftsProps) {
    const [processing, setProcessing] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [draftToDelete, setDraftToDelete] = useState<Draft | null>(null);
    const [draftToEdit, setDraftToEdit] = useState<Draft | null>(null);
    const { showSuccess, showError } = useToast();

    const handleEditDraft = (draft: Draft) => {
        setDraftToEdit(draft);
        setShowEditModal(true);
    };

    const handleEditSuccess = () => {
        // Refresh the page to show updated data
        router.reload({ only: ['drafts'] });
    };

    const handleSendDraft = (draftId: number) => {
        setProcessing(draftId);
        router.post(
            `/admin/contacts/${contact.id}/drafts/${draftId}/send`,
            {},
            {
                onSuccess: () => {
                    showSuccess('Draft sent successfully!');
                },
                onError: (errors) => {
                    const errorMessage =
                        (errors as any).error ||
                        'Failed to send draft. Please try again.';
                    showError(errorMessage);
                },
                onFinish: () => {
                    setProcessing(null);
                },
            },
        );
    };

    const handleDelete = (draft: Draft) => {
        setDraftToDelete(draft);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (!draftToDelete) return;

        setProcessing(draftToDelete.id);
        router.delete(
            `/admin/contacts/${contact.id}/drafts/${draftToDelete.id}`,
            {
                onSuccess: () => {
                    showSuccess('Draft deleted successfully!');
                    setShowDeleteModal(false);
                    setDraftToDelete(null);
                },
                onError: (errors) => {
                    const errorMessage =
                        (errors as any).error ||
                        'Failed to delete draft. Please try again.';
                    showError(errorMessage);
                },
                onFinish: () => {
                    setProcessing(null);
                },
            },
        );
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
        {
            title: `Contact from ${contact.name}`,
            href: `/admin/contacts/${contact.id}`,
        },
        {
            title: 'Drafts',
            href: `/admin/contacts/${contact.id}/drafts`,
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Drafts for ${contact.name}`} />

            <div className="space-y-6 p-4">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/contacts/${contact.id}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Contact
                            </Link>
                        </Button>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight">
                                Draft Replies
                            </h1>
                            <p className="text-muted-foreground">
                                Manage draft replies for {contact.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                Drafts: {drafts.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b bg-muted/30">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <User className="h-5 w-5" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
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
                    </CardContent>
                </Card>

                {/* Drafts List */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b bg-muted/30">
                        <CardTitle className="text-xl">Draft Replies</CardTitle>
                        <CardDescription>
                            Manage your draft replies for this contact
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {drafts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Mail className="h-12 w-12 text-muted-foreground/50" />
                                <h3 className="mt-4 text-lg font-semibold">
                                    No Drafts Found
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    You haven't created any draft replies for
                                    this contact yet.
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    asChild
                                >
                                    <Link
                                        href={`/admin/contacts/${contact.id}`}
                                    >
                                        Create New Draft
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="font-semibold">
                                            Subject
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Message Preview
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Created
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Updated
                                        </TableHead>
                                        <TableHead className="text-right font-semibold">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {drafts.map((draft) => (
                                        <TableRow
                                            key={draft.id}
                                            className="hover:bg-muted/30"
                                        >
                                            <TableCell className="font-medium">
                                                {draft.subject}
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <div className="truncate text-sm text-muted-foreground">
                                                    {truncateMessage(
                                                        draft.message,
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(
                                                        draft.created_at,
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(
                                                        draft.updated_at,
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleEditDraft(
                                                                draft,
                                                            )
                                                        }
                                                        className="h-8 w-8 p-0"
                                                        title="Edit Draft"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleSendDraft(
                                                                draft.id,
                                                            )
                                                        }
                                                        disabled={
                                                            processing ===
                                                            draft.id
                                                        }
                                                        className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700"
                                                        title="Send Draft"
                                                    >
                                                        <Send className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(draft)
                                                        }
                                                        disabled={
                                                            processing ===
                                                            draft.id
                                                        }
                                                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                        title="Delete Draft"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                <EditDraftModal
                    isOpen={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setDraftToEdit(null);
                    }}
                    draft={draftToEdit}
                    contactId={contact.id}
                    onSuccess={handleEditSuccess}
                />

                <DeleteConfirmationModal
                    isOpen={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setDraftToDelete(null);
                    }}
                    onConfirm={handleConfirmDelete}
                    title="Delete Draft"
                    description="Are you sure you want to delete this draft?"
                    itemName={draftToDelete?.subject}
                    isLoading={processing === draftToDelete?.id}
                    confirmText="Delete Draft"
                    cancelText="Cancel"
                />
            </div>
        </AppSidebarLayout>
    );
}
