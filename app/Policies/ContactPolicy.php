<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Contact;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any contacts.
     */
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can view the contact.
     */
    public function view(User $user, Contact $contact): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can create contacts.
     */
    public function create(User $user): bool
    {
        // Anyone can create contacts (contact form)
        return true;
    }

    /**
     * Determine whether the user can update the contact.
     */
    public function update(User $user, Contact $contact): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can delete the contact.
     */
    public function delete(User $user, Contact $contact): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can mark contact as read.
     */
    public function markAsRead(User $user, Contact $contact): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can mark contact as replied.
     */
    public function markAsReplied(User $user, Contact $contact): bool
    {
        return $user !== null;
    }
}
