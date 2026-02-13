<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(Request $request): Response
    {
        $reviews = Review::query()
            ->with(['user:id,name,avatar_path'])
            ->latest()
            ->take(50)
            ->get()
            ->map(function (Review $review) {
                $avatarUrl = null;
                if ($review->user) {
                    if ($review->user->avatar_path) {
                        $avatarUrl = Storage::url($review->user->avatar_path);
                    } else {
                        $name = trim((string) $review->user->name);
                        $avatarUrl = 'https://ui-avatars.com/api/?name='.urlencode($name !== '' ? $name : 'User').'&background=065f46&color=ffffff&bold=true&size=128';
                    }
                }

                return [
                    'id' => $review->id,
                    'category' => $review->category,
                    'title' => $review->title,
                    'rating' => $review->rating,
                    'body' => $review->body,
                    'created_at' => $review->created_at?->toISOString(),
                    'user' => [
                        'id' => $review->user?->id,
                        'name' => $review->user?->name,
                        'initials' => $review->user?->name ? strtoupper(mb_substr(trim($review->user->name), 0, 1)) : 'U',
                        'avatar_url' => $avatarUrl,
                    ],
                ];
            });

        $statsQuery = Review::query();
        $avg = (float) ($statsQuery->avg('rating') ?? 0);
        $count = (int) $statsQuery->count();

        $byCategory = Review::query()
            ->selectRaw('category, COUNT(*) as count, AVG(rating) as avg_rating')
            ->groupBy('category')
            ->orderByDesc('count')
            ->get()
            ->map(fn ($row) => [
                'category' => $row->category,
                'count' => (int) $row->count,
                'avg_rating' => round((float) $row->avg_rating, 2),
            ]);

        return Inertia::render('Reviews', [
            'reviews' => $reviews,
            'stats' => [
                'count' => $count,
                'avg_rating' => round($avg, 2),
                'by_category' => $byCategory,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'max:80'],
            'title' => ['nullable', 'string', 'max:120'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'body' => ['nullable', 'string', 'max:2000'],
        ]);

        $request->user()->reviews()->create($validated);

        return Redirect::route('reviews');
    }
}
