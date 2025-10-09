<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReplyRequest;
use App\Mail\ReplyNotification;
use App\Models\Contact;
use App\Models\Reply;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ReplyController extends Controller
{
    /**
     * Store a draft reply.
     */
    public function storeDraft(ReplyRequest $request, Contact $contact): RedirectResponse
    {
        try {
            $reply = Reply::create([
                'contact_id' => $contact->id,
                'subject' => $request->subject,
                'message' => $request->message,
                'status' => 'draft',
            ]);

            return redirect()->back()->with('success', 'Reply saved as draft successfully.');
        } catch (\Exception $e) {
            \Log::error('Draft reply save failed: ' . $e->getMessage());

            return redirect()->back()
                ->withErrors(['error' => 'Failed to save draft. Please try again.'])
                ->withInput();
        }
    }

    /**
     * Send a reply.
     */
    public function sendReply(ReplyRequest $request, Contact $contact): RedirectResponse
    {
        try {
            // Create or update reply
            $reply = Reply::create([
                'contact_id' => $contact->id,
                'subject' => $request->subject,
                'message' => $request->message,
                'status' => 'sent',
                'sent_at' => now(),
            ]);

            // Send email notification
            Mail::to($contact->email)
                ->send(new ReplyNotification($contact, $reply));

            // Mark contact as replied
            $contact->markAsReplied();

            return redirect()->back()->with('success', 'Reply sent successfully!');
        } catch (\Exception $e) {
            \Log::error('Reply send failed: ' . $e->getMessage());

            return redirect()->back()
                ->withErrors(['error' => 'Failed to send reply. Please try again.'])
                ->withInput();
        }
    }

    /**
     * Get draft replies for a contact.
     */
    public function getDrafts(Contact $contact): Response
    {
        $drafts = $contact->draftReplies()->orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/contacts/drafts', [
            'contact' => $contact,
            'drafts' => $drafts,
        ]);
    }

    /**
     * Update a draft reply.
     */
    public function updateDraft(ReplyRequest $request, Contact $contact, Reply $reply): RedirectResponse
    {
        try {
            $reply->update([
                'subject' => $request->subject,
                'message' => $request->message,
            ]);

            return redirect()->back()->with('success', 'Draft updated successfully.');
        } catch (\Exception $e) {
            \Log::error('Draft update failed: ' . $e->getMessage());

            return redirect()->back()
                ->withErrors(['error' => 'Failed to update draft. Please try again.'])
                ->withInput();
        }
    }

    /**
     * Send a draft reply.
     */
    public function sendDraft(Contact $contact, Reply $reply): RedirectResponse
    {
        try {
            // Send email notification
            Mail::to($contact->email)
                ->send(new ReplyNotification($contact, $reply));

            // Mark reply as sent
            $reply->markAsSent();

            // Mark contact as replied
            $contact->markAsReplied();

            return redirect()->back()->with('success', 'Draft sent successfully!');
        } catch (\Exception $e) {
            \Log::error('Draft send failed: ' . $e->getMessage());

            return redirect()->back()
                ->withErrors(['error' => 'Failed to send draft. Please try again.']);
        }
    }

    /**
     * Delete a draft reply.
     */
    public function deleteDraft(Contact $contact, Reply $reply): RedirectResponse
    {
        try {
            $reply->delete();

            return redirect()->back()->with('success', 'Draft deleted successfully.');
        } catch (\Exception $e) {
            \Log::error('Draft delete failed: ' . $e->getMessage());

            return redirect()->back()
                ->withErrors(['error' => 'Failed to delete draft. Please try again.']);
        }
    }
}
