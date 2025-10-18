<?php

namespace App\Providers;

use App\Models\Contact;
use App\Models\Project;
use App\Models\Reply;
use App\Models\User;
use App\Policies\ContactPolicy;
use App\Policies\ProjectPolicy;
use App\Policies\ReplyPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Project::class => ProjectPolicy::class,
        Contact::class => ContactPolicy::class,
        Reply::class => ReplyPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Define additional gates for more granular permissions
        Gate::define('manage-projects', function (User $user) {
            return $user !== null;
        });

        Gate::define('manage-contacts', function (User $user) {
            return $user !== null;
        });

        Gate::define('manage-replies', function (User $user) {
            return $user !== null;
        });

        Gate::define('view-admin', function (User $user) {
            return $user !== null;
        });

        Gate::define('upload-files', function (User $user) {
            return $user !== null;
        });

        Gate::define('delete-files', function (User $user) {
            return $user !== null;
        });
    }
}
