<?php

namespace App\Observers;

use App\Models\ResearchTip;
use App\Models\NewsletterSubscription;
use App\Notifications\NewContentPublished;
use Illuminate\Support\Facades\Notification;

class ResearchTipObserver
{
    public function created(ResearchTip $researchTip): void
    {
        $subscribers = NewsletterSubscription::where('is_active', true)->get();
        Notification::send($subscribers, new NewContentPublished($researchTip, 'research-tips'));
    }
}
