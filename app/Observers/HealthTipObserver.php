<?php

namespace App\Observers;

use App\Models\HealthTip;
use App\Models\NewsletterSubscription;
use App\Notifications\NewContentPublished;
use Illuminate\Support\Facades\Notification;

class HealthTipObserver
{
    public function created(HealthTip $healthTip): void
    {
        $subscribers = NewsletterSubscription::where('is_active', true)->get();
        Notification::send($subscribers, new NewContentPublished($healthTip, 'health-tips'));
    }
}
