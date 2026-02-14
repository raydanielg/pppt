<?php

namespace App\Providers;

use App\Models\HealthTip;
use App\Models\ResearchTip;
use App\Models\News;
use App\Observers\HealthTipObserver;
use App\Observers\ResearchTipObserver;
use App\Observers\NewsObserver;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        HealthTip::observe(HealthTipObserver::class);
        ResearchTip::observe(ResearchTipObserver::class);
        News::observe(NewsObserver::class);
    }
}
