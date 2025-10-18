<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Reply;
use Illuminate\Auth\Access\HandlesAuthorization;

class ReplyPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any replies.
     */
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can view the reply.
     */
    public function view(User $user, Reply $reply): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can create replies.
     */
    public function create(User $user): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can update the reply.
     */
    public function update(User $user, Reply $reply): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can delete the reply.
     */
    public function delete(User $user, Reply $reply): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can send the reply.
     */
    public function send(User $user, Reply $reply): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can save draft.
     */
    public function saveDraft(User $user): bool
    {
        return $user !== null;
    }
}
