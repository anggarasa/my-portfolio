<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReplyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


// Portfolio routes
Route::get('/api/projects', [App\Http\Controllers\ProjectController::class, 'portfolio'])->name('api.projects');
Route::get('/project/{project}', [App\Http\Controllers\ProjectController::class, 'portfolioDetail'])->name('project.detail');

// Contact form route
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        // Contact Management Routes
        Route::get('contacts', [ContactController::class, 'index'])->name('contacts.index');
        Route::get('contacts/{contact}', [ContactController::class, 'show'])->name('contacts.show');
        Route::patch('contacts/{contact}/mark-read', [ContactController::class, 'markAsRead'])->name('contacts.mark-read');
        Route::patch('contacts/{contact}/mark-replied', [ContactController::class, 'markAsReplied'])->name('contacts.mark-replied');
        Route::delete('contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');

        // Reply Routes
        Route::post('contacts/{contact}/reply/send', [ReplyController::class, 'sendReply'])->name('contacts.reply.send');
        Route::post('contacts/{contact}/reply/draft', [ReplyController::class, 'storeDraft'])->name('contacts.reply.draft');
        Route::get('contacts/{contact}/drafts', [ReplyController::class, 'getDrafts'])->name('contacts.drafts');
        Route::patch('contacts/{contact}/drafts/{reply}', [ReplyController::class, 'updateDraft'])->name('contacts.drafts.update');
        Route::post('contacts/{contact}/drafts/{reply}/send', [ReplyController::class, 'sendDraft'])->name('contacts.drafts.send');
        Route::delete('contacts/{contact}/drafts/{reply}', [ReplyController::class, 'deleteDraft'])->name('contacts.drafts.delete');

        // Project Management Routes
        Route::resource('projects', ProjectController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
