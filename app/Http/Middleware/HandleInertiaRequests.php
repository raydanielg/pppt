<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
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

        $avatarUrl = null;
        if ($user) {
            if ($user->avatar_path) {
                $avatarUrl = Storage::url($user->avatar_path);
            } else {
                $name = trim((string) $user->name);
                $avatarUrl = 'https://ui-avatars.com/api/?name='.urlencode($name !== '' ? $name : 'User').'&background=065f46&color=ffffff&bold=true&size=128';
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'country' => $user->country,
                    'membership_number' => $user->membership_number,
                    'onboarding_completed' => $user->onboarding_completed,
                    'avatar_url' => $avatarUrl,
                ] : null,
            ],
        ];
    }
}
