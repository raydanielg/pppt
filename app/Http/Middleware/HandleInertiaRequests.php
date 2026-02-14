<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        $unreadMessagesCount = 0;

        if ($user) {
            $lastSeenAt = $user->last_seen_at;
            if (is_string($lastSeenAt)) {
                $lastSeenAt = Carbon::parse($lastSeenAt);
            }

            if (! $lastSeenAt || $lastSeenAt->lt(now()->subMinute())) {
                $user->forceFill(['last_seen_at' => now()])->save();
                $user->refresh();
            }

            $unreadMessagesCount = (int) DB::table('conversation_user')
                ->join('messages', 'messages.conversation_id', '=', 'conversation_user.conversation_id')
                ->where('conversation_user.user_id', $user->id)
                ->whereColumn('messages.created_at', '>', DB::raw('COALESCE(conversation_user.last_read_at, "1970-01-01 00:00:00")'))
                ->where('messages.sender_id', '!=', $user->id)
                ->count();
        }

        $avatarUrl = null;
        if ($user) {
            if ($user->avatar_path) {
                $avatarPath = (string) $user->avatar_path;
                if (str_starts_with($avatarPath, 'http://') || str_starts_with($avatarPath, 'https://')) {
                    $avatarUrl = $avatarPath;
                } else {
                    $avatarUrl = url('storage/'.ltrim($avatarPath, '/'));
                }
            } else {
                $name = trim((string) $user->name);
                $avatarUrl = 'https://ui-avatars.com/api/?name='.urlencode($name !== '' ? $name : 'User').'&background=065f46&color=ffffff&bold=true&size=128';
            }
        }

        return [
            ...parent::share($request),
            'counts' => [
                'messages_unread' => $unreadMessagesCount,
            ],
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_admin' => method_exists($user, 'hasRole') ? $user->hasRole('admin') : false,
                    'country' => $user->country,
                    'membership_number' => $user->membership_number,
                    'onboarding_completed' => $user->onboarding_completed,
                    'avatar_url' => $avatarUrl,
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
