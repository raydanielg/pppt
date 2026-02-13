<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $conversations = Conversation::query()
            ->whereHas('users', fn ($q) => $q->where('users.id', $user->id))
            ->with([
                'users:id,name,avatar_path',
                'messages' => fn ($q) => $q->latest()->limit(1),
            ])
            ->latest('updated_at')
            ->get()
            ->map(function (Conversation $c) use ($user) {
                $other = $c->users->firstWhere('id', '!=', $user->id) ?? $user;

                $avatarUrl = $other->avatar_path
                    ? Storage::url($other->avatar_path)
                    : 'https://ui-avatars.com/api/?name='.urlencode(trim((string) $other->name) ?: 'User').'&background=065f46&color=ffffff&bold=true&size=128';

                $last = $c->messages->first();

                return [
                    'id' => $c->id,
                    'other_user' => [
                        'id' => $other->id,
                        'name' => $other->name,
                        'avatar_url' => $avatarUrl,
                    ],
                    'last_message' => $last ? [
                        'body' => $last->body,
                        'created_at' => $last->created_at?->toISOString(),
                        'sender_id' => $last->sender_id,
                    ] : null,
                ];
            });

        $selectedConversationId = $request->query('conversation');
        if (!$selectedConversationId && $conversations->count() > 0) {
            $selectedConversationId = $conversations->first()['id'];
        }

        $selected = null;
        $messages = [];

        if ($selectedConversationId) {
            $selectedModel = Conversation::query()
                ->whereKey($selectedConversationId)
                ->whereHas('users', fn ($q) => $q->where('users.id', $user->id))
                ->with(['users:id,name,avatar_path'])
                ->first();

            if ($selectedModel) {
                $selected = [
                    'id' => $selectedModel->id,
                ];

                $messages = Message::query()
                    ->where('conversation_id', $selectedModel->id)
                    ->with('sender:id,name,avatar_path')
                    ->orderBy('created_at')
                    ->limit(200)
                    ->get()
                    ->map(function (Message $m) {
                        $senderAvatar = $m->sender && $m->sender->avatar_path
                            ? Storage::url($m->sender->avatar_path)
                            : 'https://ui-avatars.com/api/?name='.urlencode(trim((string) ($m->sender?->name ?? 'User')) ?: 'User').'&background=065f46&color=ffffff&bold=true&size=128';

                        return [
                            'id' => $m->id,
                            'body' => $m->body,
                            'created_at' => $m->created_at?->toISOString(),
                            'sender' => [
                                'id' => $m->sender?->id,
                                'name' => $m->sender?->name,
                                'avatar_url' => $senderAvatar,
                            ],
                        ];
                    });
            }
        }

        $people = User::query()
            ->whereKeyNot($user->id)
            ->select(['id', 'name', 'avatar_path'])
            ->orderBy('name')
            ->limit(25)
            ->get()
            ->map(function (User $u) {
                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'avatar_url' => $u->avatar_path
                        ? Storage::url($u->avatar_path)
                        : 'https://ui-avatars.com/api/?name='.urlencode(trim((string) $u->name) ?: 'User').'&background=065f46&color=ffffff&bold=true&size=128',
                ];
            });

        return Inertia::render('Messages', [
            'conversations' => $conversations,
            'selectedConversation' => $selected,
            'messages' => $messages,
            'people' => $people,
        ]);
    }

    public function start(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
        ]);

        $me = $request->user();
        $otherId = (int) $data['user_id'];

        if ($otherId === $me->id) {
            return Redirect::route('messages');
        }

        $existing = Conversation::query()
            ->whereHas('users', fn ($q) => $q->where('users.id', $me->id))
            ->whereHas('users', fn ($q) => $q->where('users.id', $otherId))
            ->whereDoesntHave('users', fn ($q) => $q->whereNotIn('users.id', [$me->id, $otherId]))
            ->first();

        if (!$existing) {
            $existing = Conversation::create();
            $existing->users()->sync([$me->id, $otherId]);
        }

        return Redirect::route('messages', ['conversation' => $existing->id]);
    }

    public function store(Request $request, Conversation $conversation): RedirectResponse
    {
        $me = $request->user();

        $conversation->loadMissing('users:id');
        abort_unless($conversation->users->contains('id', $me->id), 403);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:4000'],
        ]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $me->id,
            'body' => $data['body'],
        ]);

        return Redirect::route('messages', ['conversation' => $conversation->id]);
    }

    public function poll(Request $request, Conversation $conversation): JsonResponse
    {
        $me = $request->user();

        $conversation->loadMissing('users:id');
        abort_unless($conversation->users->contains('id', $me->id), 403);

        $afterId = (int) $request->query('after_id', 0);

        $msgs = Message::query()
            ->where('conversation_id', $conversation->id)
            ->where('id', '>', $afterId)
            ->with('sender:id,name,avatar_path')
            ->orderBy('created_at')
            ->get()
            ->map(function (Message $m) {
                $senderAvatar = $m->sender && $m->sender->avatar_path
                    ? Storage::url($m->sender->avatar_path)
                    : 'https://ui-avatars.com/api/?name='.urlencode(trim((string) ($m->sender?->name ?? 'User')) ?: 'User').'&background=065f46&color=ffffff&bold=true&size=128';

                return [
                    'id' => $m->id,
                    'body' => $m->body,
                    'created_at' => $m->created_at?->toISOString(),
                    'sender' => [
                        'id' => $m->sender?->id,
                        'name' => $m->sender?->name,
                        'avatar_url' => $senderAvatar,
                    ],
                ];
            });

        return response()->json([
            'messages' => $msgs,
        ]);
    }
}
