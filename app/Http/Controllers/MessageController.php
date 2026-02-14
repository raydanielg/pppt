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

                $isOnline = (bool) ($other->last_seen_at && $other->last_seen_at->gte(now()->subMinutes(2)));

                return [
                    'id' => $c->id,
                    'other_user' => [
                        'id' => $other->id,
                        'name' => $other->name,
                        'avatar_url' => $avatarUrl,
                        'last_seen_at' => $other->last_seen_at?->toISOString(),
                        'is_online' => $isOnline,
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
                $selectedModel->users()->updateExistingPivot($user->id, ['last_read_at' => now()]);

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
            ->select(['id', 'name', 'avatar_path', 'membership_number'])
            ->orderBy('name')
            ->limit(25)
            ->get()
            ->map(function (User $u) {
                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'membership_number' => $u->membership_number,
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

    public function search(Request $request): JsonResponse
    {
        $me = $request->user();

        $data = $request->validate([
            'q' => ['nullable', 'string', 'max:200'],
        ]);

        $q = trim((string) ($data['q'] ?? ''));
        if ($q === '') {
            return response()->json(['results' => []]);
        }

        $conversationIds = Conversation::query()
            ->whereHas('users', fn ($qb) => $qb->where('users.id', $me->id))
            ->pluck('id');

        $matches = Message::query()
            ->whereIn('conversation_id', $conversationIds)
            ->where('body', 'like', '%'.$q.'%')
            ->with([
                'sender:id,name,avatar_path',
                'conversation.users:id,name,avatar_path,last_seen_at',
            ])
            ->latest('id')
            ->limit(20)
            ->get();

        $results = $matches->map(function (Message $m) use ($me) {
            $m->conversation->loadMissing('users');
            $other = $m->conversation->users->firstWhere('id', '!=', $me->id) ?? $me;

            $otherAvatar = $other->avatar_path
                ? Storage::url($other->avatar_path)
                : 'https://ui-avatars.com/api/?name='.urlencode(trim((string) $other->name) ?: 'User').'&background=065f46&color=ffffff&bold=true&size=128';

            $senderAvatar = $m->sender && $m->sender->avatar_path
                ? Storage::url($m->sender->avatar_path)
                : 'https://ui-avatars.com/api/?name='.urlencode(trim((string) ($m->sender?->name ?? 'User')) ?: 'User').'&background=065f46&color=ffffff&bold=true&size=128';

            return [
                'conversation_id' => $m->conversation_id,
                'message' => [
                    'id' => $m->id,
                    'body' => $m->body,
                    'created_at' => $m->created_at?->toISOString(),
                    'sender' => [
                        'id' => $m->sender?->id,
                        'name' => $m->sender?->name,
                        'avatar_url' => $senderAvatar,
                    ],
                ],
                'other_user' => [
                    'id' => $other->id,
                    'name' => $other->name,
                    'avatar_url' => $otherAvatar,
                ],
            ];
        })->values();

        return response()->json(['results' => $results]);
    }

    public function destroy(Request $request, Conversation $conversation): RedirectResponse
    {
        $me = $request->user();

        $conversation->loadMissing('users:id');
        abort_unless($conversation->users->contains('id', $me->id), 403);

        $conversation->users()->detach($me->id);

        if ($conversation->users()->count() === 0) {
            $conversation->delete();
        }

        return Redirect::route('messages');
    }

    public function export(Request $request, Conversation $conversation)
    {
        $me = $request->user();

        $conversation->loadMissing('users:id,name', 'messages.sender:id,name');
        abort_unless($conversation->users->contains('id', $me->id), 403);

        $lines = [];
        foreach ($conversation->messages()->orderBy('created_at')->get() as $msg) {
            $ts = $msg->created_at?->format('Y-m-d H:i:s');
            $sender = $msg->sender?->name ?? 'Unknown';
            $lines[] = "[$ts] $sender: {$msg->body}";
        }

        $content = implode("\n", $lines);
        $filename = 'conversation-'.$conversation->id.'-export.txt';

        return response($content, 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ]);
    }

    public function start(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'membership_number' => ['nullable', 'string', 'max:255'],
        ]);

        $me = $request->user();
        $otherId = (int) ($data['user_id'] ?? 0);
        if (! $otherId) {
            $member = trim((string) ($data['membership_number'] ?? ''));
            if ($member !== '') {
                $otherId = (int) (User::query()->where('membership_number', $member)->value('id') ?? 0);
            }
        }

        if (! $otherId) {
            return Redirect::back()->withErrors([
                'membership_number' => 'Member not found. Please select from suggestions or enter a valid member number.',
            ]);
        }

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
