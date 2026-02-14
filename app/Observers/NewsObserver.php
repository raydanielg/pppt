<?php

namespace App\Observers;

use App\Models\News;
use App\Models\NewsletterSubscription;
use App\Notifications\NewContentPublished;
use Illuminate\Support\Facades\Notification;

class NewsObserver
{
    public function created(News $news): void
    {
        $subscribers = NewsletterSubscription::where('is_active', true)->get();
        Notification::send($subscribers, new NewContentPublished($news, 'hot-news'));
    }
}
