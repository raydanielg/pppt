<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        return Inertia::render('HotNews/Index', [
            'news' => News::latest()->paginate(10),
            'hot_news' => News::where('is_hot', true)->latest()->limit(3)->get(),
        ]);
    }

    public function show($slug)
    {
        $news = News::where('slug', $slug)->with(['comments.user', 'comments.replies.user'])->firstOrFail();
        
        $related_news = News::where('category', $news->category)
            ->where('id', '!=', $news->id)
            ->limit(3)
            ->get();

        $trending_news = News::where('is_hot', true)
            ->where('id', '!=', $news->id)
            ->limit(5)
            ->get();

        return Inertia::render('HotNews/Show', [
            'news' => $news,
            'related_news' => $related_news,
            'trending_news' => $trending_news,
        ]);
    }
}
