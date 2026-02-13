<?php

namespace App\Http\Controllers;

use App\Models\ForumPost;
use App\Models\ForumTopic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ForumController extends Controller
{
    public function index(Request $request): Response
    {
        $topics = ForumTopic::query()
            ->with(['user:id,name,avatar_path'])
            ->withCount(['posts', 'reactions as likes_count' => fn($q) => $q->where('type', 'like')])
            ->latest()
            ->get()
            ->map(function ($topic) {
                return [
                    'id' => $topic->id,
                    'title' => $topic->title,
                    'slug' => $topic->slug,
                    'content' => $topic->content,
                    'category' => $topic->category,
                    'created_at' => $topic->created_at->diffForHumans(),
                    'replies_count' => $topic->posts_count,
                    'likes_count' => $topic->likes_count,
                    'user' => [
                        'name' => $topic->user->name,
                        'avatar_url' => $topic->user->avatar_path ? \Storage::url($topic->user->avatar_path) : 'https://ui-avatars.com/api/?name='.urlencode($topic->user->name).'&background=065f46&color=ffffff',
                    ]
                ];
            });

        return Inertia::render('Forum', [
            'topics' => $topics
        ]);
    }

    public function show(ForumTopic $topic): Response
    {
        $topic->load(['user', 'posts.user', 'posts.reactions', 'reactions.user']);
        
        $user = auth()->user();

        return Inertia::render('Forum/Show', [
            'topic' => [
                'id' => $topic->id,
                'title' => $topic->title,
                'content' => $topic->content,
                'category' => $topic->category,
                'created_at' => $topic->created_at->diffForHumans(),
                'user' => [
                    'name' => $topic->user->name,
                    'avatar_url' => $topic->user->avatar_path ? \Storage::url($topic->user->avatar_path) : 'https://ui-avatars.com/api/?name='.urlencode($topic->user->name).'&background=065f46&color=ffffff',
                ],
                'likes_count' => $topic->reactions()->where('type', 'like')->count(),
                'dislikes_count' => $topic->reactions()->where('type', 'dislike')->count(),
                'user_reaction' => $user ? $topic->reactions()->where('user_id', $user->id)->first()?->type : null,
                'recent_likes' => $topic->reactions()->where('type', 'like')->with('user:id,name')->latest()->take(3)->get()->pluck('user.name'),
            ],
            'posts' => $topic->posts->map(fn($post) => [
                'id' => $post->id,
                'content' => $post->content,
                'created_at' => $post->created_at->diffForHumans(),
                'user' => [
                    'name' => $post->user->name,
                    'avatar_url' => $post->user->avatar_path ? \Storage::url($post->user->avatar_path) : 'https://ui-avatars.com/api/?name='.urlencode($post->user->name).'&background=065f46&color=ffffff',
                ],
                'likes_count' => $post->reactions->where('type', 'like')->count(),
                'dislikes_count' => $post->reactions->where('type', 'dislike')->count(),
                'user_reaction' => $user ? $post->reactions->where('user_id', $user->id)->first()?->type : null,
            ])
        ]);
    }

    public function storeTopic(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string'
        ]);

        $request->user()->forumTopics()->create($validated);

        return Redirect::route('forum');
    }

    public function storePost(Request $request, ForumTopic $topic): RedirectResponse
    {
        $validated = $request->validate([
            'content' => 'required|string'
        ]);

        $topic->posts()->create([
            'user_id' => $request->user()->id,
            'content' => $validated['content']
        ]);

        return Redirect::back();
    }

    public function react(Request $request, string $type, $id, string $reactionType): RedirectResponse
    {
        $model = $type === 'topic' ? ForumTopic::findOrFail($id) : ForumPost::findOrFail($id);
        
        $reaction = $model->reactions()->where('user_id', $request->user()->id)->first();

        if ($reaction) {
            if ($reaction->type === $reactionType) {
                $reaction->delete();
            } else {
                $reaction->update(['type' => $reactionType]);
            }
        } else {
            $model->reactions()->create([
                'user_id' => $request->user()->id,
                'type' => $reactionType
            ]);
        }

        return Redirect::back();
    }
}
