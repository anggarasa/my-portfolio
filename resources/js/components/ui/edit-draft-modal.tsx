import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { Edit, Save } from 'lucide-react';
import { useEffect, useRef } from 'react';

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

interface EditDraftModalProps {
    isOpen: boolean;
    onClose: () => void;
    draft: Draft | null;
    contactId: number;
    onSuccess?: () => void;
}

export default function EditDraftModal({
    isOpen,
    onClose,
    draft,
    contactId,
    onSuccess,
}: EditDraftModalProps) {
    const { showSuccess, showError } = useToast();
    const hasShownSuccess = useRef(false);

    const {
        data,
        setData,
        patch,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        subject: '',
        message: '',
    });

    // Update form data when draft changes
    useEffect(() => {
        if (draft) {
            setData({
                subject: draft.subject,
                message: draft.message,
            });
            // Reset the success flag when modal opens
            hasShownSuccess.current = false;
        }
    }, [draft, setData]);

    // Show success toast when form is successfully submitted
    useEffect(() => {
        if (recentlySuccessful && !hasShownSuccess.current) {
            hasShownSuccess.current = true;
            showSuccess('Draft updated successfully!');
            onSuccess?.();
            onClose();
        }
    }, [recentlySuccessful]);

    // Show error toast if there are general errors
    useEffect(() => {
        const hasGeneralError =
            Object.keys(errors).length > 0 &&
            !errors.subject &&
            !errors.message;

        if (hasGeneralError) {
            const errorMessage =
                (errors as any).error ||
                'An error occurred while updating the draft. Please try again.';
            showError(errorMessage);
        }
    }, [errors, showError]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!draft) return;

        patch(`/admin/contacts/${contactId}/drafts/${draft.id}`, {
            onError: (errors) => {
                const errorMessage =
                    (errors as any).error ||
                    'Failed to update draft. Please try again.';
                showError(errorMessage);
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!draft) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                            <Edit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <DialogTitle>Edit Draft</DialogTitle>
                            <DialogDescription>
                                Update your draft reply content
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">
                            Subject
                        </label>
                        <input
                            type="text"
                            value={data.subject}
                            onChange={(e) => setData('subject', e.target.value)}
                            className="mt-1 w-full rounded-lg border p-3 text-sm focus:border-transparent focus:ring-2 focus:ring-primary"
                            placeholder="Enter subject..."
                            disabled={processing}
                        />
                        {errors.subject && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.subject}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-muted-foreground">
                            Message
                        </label>
                        <textarea
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            className="mt-2 w-full resize-none rounded-lg border p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
                            rows={8}
                            placeholder="Type your message here..."
                            disabled={processing}
                        />
                        {errors.message && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-2">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Update Draft
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
