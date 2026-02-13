<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\OnboardingCountriesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('register');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'onboarding'])->name('dashboard');

Route::get('/docs/icons', function () {
    return Inertia::render('Docs/Icons');
})->name('docs.icons');

Route::middleware('auth')->group(function () {
    Route::prefix('onboarding')->name('onboarding.')->group(function () {
        Route::get('/country', [OnboardingController::class, 'country'])->name('country');
        Route::post('/country', [OnboardingController::class, 'storeCountry'])->name('country.store');

        Route::get('/confirm', [OnboardingController::class, 'confirm'])->name('confirm');
        Route::post('/confirm', [OnboardingController::class, 'storeConfirm'])->name('confirm.store');

        Route::get('/membership', [OnboardingController::class, 'membership'])->name('membership');
        Route::post('/complete', [OnboardingController::class, 'complete'])->name('complete');

        Route::get('/countries', [OnboardingCountriesController::class, 'index'])->name('countries');
    });
});

Route::middleware(['auth', 'onboarding'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/membership-card', function () {
        return Inertia::render('MembershipCard');
    })->name('membership.card');

    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews');
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');

    Route::get('/forum', [ForumController::class, 'index'])->name('forum');
    Route::get('/forum/{topic:slug}', [ForumController::class, 'show'])->name('forum.show');
    Route::post('/forum/topics', [ForumController::class, 'storeTopic'])->name('forum.topic.store');
    Route::post('/forum/topics/{topic}/posts', [ForumController::class, 'storePost'])->name('forum.post.store');
    Route::post('/forum/reactions/{type}/{id}/{reactionType}', [ForumController::class, 'react'])->name('forum.react');

    Route::get('/messages', [MessageController::class, 'index'])->name('messages');
    Route::post('/messages/start', [MessageController::class, 'start'])->name('messages.start');
    Route::post('/messages/{conversation}', [MessageController::class, 'store'])->name('messages.store');
    Route::get('/messages/{conversation}/poll', [MessageController::class, 'poll'])->name('messages.poll');

    Route::get('/blogs', function () {
        return Inertia::render('Blogs');
    })->name('blogs');

    Route::get('/components', function () {
        return Inertia::render('Components');
    })->name('components');
});

require __DIR__.'/auth.php';
