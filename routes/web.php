<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\OnboardingCountriesController;
use App\Http\Controllers\HealthTipController;
use App\Http\Controllers\ResearchTipController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\NewsCommentController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\OpportunityController;
use App\Http\Controllers\OpportunityApplicationController;
use App\Http\Controllers\Admin\AdminHealthTipController;
use App\Http\Controllers\Admin\AdminHealthTipCategoryController;
use App\Http\Controllers\Admin\AdminResearchTipController;
use App\Http\Controllers\Admin\AdminResearchTipCategoryController;
use App\Http\Controllers\Admin\AdminNewsController;
use App\Http\Controllers\Admin\AdminNewsCategoryController;
use App\Http\Controllers\Admin\AdminGalleryCategoryController;
use App\Http\Controllers\Admin\AdminGalleryImageController;
use App\Http\Controllers\Admin\AdminOpportunityController;
use App\Http\Controllers\Admin\AdminUserController;
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
    Route::get('/messages/search', [MessageController::class, 'search'])->name('messages.search');
    Route::delete('/messages/{conversation}', [MessageController::class, 'destroy'])->name('messages.destroy');
    Route::get('/messages/{conversation}/export', [MessageController::class, 'export'])->name('messages.export');

    Route::get('/blogs', function () {
        return Inertia::render('Blogs');
    })->name('blogs');

    Route::get('/components', function () {
        return Inertia::render('Components');
    })->name('components');

    Route::get('/health-tips', [HealthTipController::class, 'index'])->name('health-tips');
    Route::get('/health-tips/{id}', [HealthTipController::class, 'show'])->name('health-tips.show');

    Route::get('/research-tips', [ResearchTipController::class, 'index'])->name('research-tips');
    Route::get('/research-tips/{slug}', [ResearchTipController::class, 'show'])->name('research-tips.show');

    Route::get('/pt-library', [BookController::class, 'index'])->name('pt-library');

    Route::get('/hot-news', [NewsController::class, 'index'])->name('hot-news');
    Route::get('/hot-news/{slug}', [NewsController::class, 'show'])->name('hot-news.show');
    Route::post('/hot-news/{news}/comments', [NewsCommentController::class, 'store'])->name('news.comments.store');
    Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');

    Route::get('/my-students', function () {
        return Inertia::render('MyStudents/Index');
    })->name('my-students');

    Route::get('/gallery', [\App\Http\Controllers\GalleryController::class, 'index'])->name('gallery');

    Route::get('/opportunities', [OpportunityController::class, 'index'])->name('opportunities');
    Route::get('/opportunities/{id}', [OpportunityController::class, 'show'])->name('opportunities.show');
    Route::get('/opportunities/{id}/apply', [OpportunityApplicationController::class, 'create'])->name('opportunities.apply');
    Route::post('/opportunities/{id}/apply', [OpportunityApplicationController::class, 'store'])->name('opportunities.apply.store');
    Route::get('/opportunities/{id}/thank-you', [OpportunityApplicationController::class, 'thankYou'])->name('opportunities.thank-you');

    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        Route::prefix('health-tips')->name('health-tips.')->group(function () {
            Route::get('/', [AdminHealthTipController::class, 'index'])->name('index');
            Route::get('/create', [AdminHealthTipController::class, 'create'])->name('create');
            Route::post('/', [AdminHealthTipController::class, 'store'])->name('store');
            Route::delete('/{healthTip}', [AdminHealthTipController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('health-tip-categories')->name('health-tip-categories.')->group(function () {
            Route::get('/', [AdminHealthTipCategoryController::class, 'index'])->name('index');
            Route::post('/', [AdminHealthTipCategoryController::class, 'store'])->name('store');
            Route::delete('/{healthTipCategory}', [AdminHealthTipCategoryController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('research-tips')->name('research-tips.')->group(function () {
            Route::get('/', [AdminResearchTipController::class, 'index'])->name('index');
            Route::get('/create', [AdminResearchTipController::class, 'create'])->name('create');
            Route::post('/', [AdminResearchTipController::class, 'store'])->name('store');
            Route::delete('/{researchTip}', [AdminResearchTipController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('research-tip-categories')->name('research-tip-categories.')->group(function () {
            Route::get('/', [AdminResearchTipCategoryController::class, 'index'])->name('index');
            Route::post('/', [AdminResearchTipCategoryController::class, 'store'])->name('store');
            Route::delete('/{researchTipCategory}', [AdminResearchTipCategoryController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('hot-news')->name('hot-news.')->group(function () {
            Route::get('/', [AdminNewsController::class, 'index'])->name('index');
            Route::get('/create', [AdminNewsController::class, 'create'])->name('create');
            Route::post('/', [AdminNewsController::class, 'store'])->name('store');
            Route::delete('/{news}', [AdminNewsController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('hot-news-categories')->name('hot-news-categories.')->group(function () {
            Route::get('/', [AdminNewsCategoryController::class, 'index'])->name('index');
            Route::post('/', [AdminNewsCategoryController::class, 'store'])->name('store');
            Route::delete('/{newsCategory}', [AdminNewsCategoryController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('gallery-categories')->name('gallery-categories.')->group(function () {
            Route::get('/', [AdminGalleryCategoryController::class, 'index'])->name('index');
            Route::post('/', [AdminGalleryCategoryController::class, 'store'])->name('store');
            Route::delete('/{galleryCategory}', [AdminGalleryCategoryController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('gallery-images')->name('gallery-images.')->group(function () {
            Route::get('/', [AdminGalleryImageController::class, 'index'])->name('index');
            Route::post('/', [AdminGalleryImageController::class, 'store'])->name('store');
            Route::delete('/{galleryImage}', [AdminGalleryImageController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('opportunities')->name('opportunities.')->group(function () {
            Route::get('/', [AdminOpportunityController::class, 'index'])->name('index');
            Route::get('/create', [AdminOpportunityController::class, 'create'])->name('create');
            Route::post('/', [AdminOpportunityController::class, 'store'])->name('store');
            Route::get('/{opportunity}/edit', [AdminOpportunityController::class, 'edit'])->name('edit');
            Route::put('/{opportunity}', [AdminOpportunityController::class, 'update'])->name('update');
            Route::delete('/{opportunity}', [AdminOpportunityController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', [AdminUserController::class, 'index'])->name('index');
            Route::get('/{user}/edit', [AdminUserController::class, 'edit'])->name('edit');
            Route::put('/{user}', [AdminUserController::class, 'update'])->name('update');
        });
    });
});

require __DIR__.'/auth.php';
