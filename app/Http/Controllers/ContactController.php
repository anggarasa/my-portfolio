<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactNotification;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Store a new contact message.
     */
    public function store(ContactRequest $request): RedirectResponse
    {
        try {
            // Create contact record
            $contact = Contact::create($request->validated());

            // Send notification email
            Mail::to(config('mail.from.address'))
                ->send(new ContactNotification($contact));

            return redirect()->back()->with('success', 'Your message has been sent successfully! I will respond as soon as possible.');

        } catch (\Exception $e) {
            // Log the error
            \Log::error('Contact form submission failed: ' . $e->getMessage());

            return redirect()->back()
                ->withErrors(['error' => 'An error occurred while sending your message. Please try again or contact me directly via email.'])
                ->withInput();
        }
    }

    /**
     * Get all contacts (for admin panel - future use)
     */
    public function index(): Response
    {
        $contacts = Contact::orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('admin/contacts/index', [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Show specific contact (for admin panel - future use)
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
     * Mark contact as replied (for admin panel - future use)
     */
    public function markAsReplied(Contact $contact): RedirectResponse
    {
        $contact->markAsReplied();

        return redirect()->back()->with('success', 'Contact status has been updated to "Replied".');
    }
}
