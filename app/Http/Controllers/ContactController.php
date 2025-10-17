<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactNotification;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Store a new contact message.
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            // Manual validation
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|min:3|max:255',
                'email' => 'required|email:dns,rfc,strict|max:255',
                'message' => 'required|string|min:10|max:2000',
            ], [
                'name.required' => 'Name is required.',
                'name.min' => 'Name must be at least 3 characters.',
                'name.max' => 'Name cannot exceed 255 characters.',
                'email.required' => 'Email is required.',
                'email.email' => 'Please enter a valid email address.',
                'email.max' => 'Email cannot exceed 255 characters.',
                'message.required' => 'Message is required.',
                'message.min' => 'Message must be at least 10 characters.',
                'message.max' => 'Message cannot exceed 2000 characters.',
            ]);

            // Check if validation fails
            if ($validator->fails()) {
                return redirect()->back()
                    ->withErrors($validator->errors())
                    ->withInput();
            }

            // Get validated data
            $validatedData = $validator->validated();

            // Create contact record
            $contact = Contact::create($validatedData);

            // Try to send notification email
            try {
                Mail::to(config('mail.from.address'))
                    ->send(new ContactNotification($contact));
            } catch (\Exception $mailException) {
                // Log mail error but don't fail the entire process
                \Log::warning('Contact notification email failed to send: ' . $mailException->getMessage());

                // Still return success since the contact was saved
                return redirect()->back()->with('success', 'Your message has been received! I will respond as soon as possible.');
            }

            return redirect()->back()->with('success', 'Your message has been sent successfully! I will respond as soon as possible.');

        } catch (\Exception $e) {
            // Log the error with more details
            \Log::error('Contact form submission failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->except(['_token']),
            ]);

            // Return validation-like error instead of throwing exception
            return redirect()->back()
                ->withErrors(['general' => 'An error occurred while sending your message. Please try again or contact me directly via email.'])
                ->withInput();
        }
    }

    /**
     * Get all contacts (admin panel)
     */
    public function index(): Response
    {
        $contacts = Contact::orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('admin/contacts/index', [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Show specific contact (admin panel)
     */
    public function show(Contact $contact): Response
    {
        // Mark as read when viewed
        if ($contact->status === 'new') {
            $contact->markAsRead();
        }

        return Inertia::render('admin/contacts/show', [
            'contact' => $contact,
        ]);
    }

    /**
     * Mark contact as read
     */
    public function markAsRead(Contact $contact): RedirectResponse
    {
        $contact->markAsRead();

        return redirect()->back()->with('success', 'Contact marked as read.');
    }

    /**
     * Mark contact as replied
     */
    public function markAsReplied(Contact $contact): RedirectResponse
    {
        $contact->markAsReplied();

        return redirect()->back()->with('success', 'Contact status has been updated to "Replied".');
    }

    /**
     * Delete contact
     */
    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Contact message has been deleted.');
    }
}
