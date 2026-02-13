<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingController
{
    public function country(Request $request): Response
    {
        return Inertia::render('Onboarding/Country', [
            'country' => $request->user()->country,
        ]);
    }

    public function storeCountry(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'country' => ['required', 'string', 'max:255'],
        ]);

        $request->user()->update([
            'country' => $validated['country'],
        ]);

        return redirect()->route('onboarding.confirm');
    }

    public function confirm(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Onboarding/Confirm', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'country' => $user->country,
                'avatar_url' => $user->avatar_path ? Storage::url($user->avatar_path) : null,
            ],
        ]);
    }

    public function storeConfirm(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'avatar' => ['nullable', 'image', 'max:2048'],
        ]);

        $user = $request->user();

        $update = [
            'name' => $validated['name'],
            'country' => $validated['country'],
        ];

        if ($request->hasFile('avatar')) {
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }

            $path = $request->file('avatar')->store('avatars', 'public');
            $update['avatar_path'] = $path;
        }

        $user->update($update);

        return redirect()->route('onboarding.membership');
    }

    public function membership(Request $request): Response
    {
        $user = $request->user();

        if (! $user->membership_number) {
            $user->membership_number = $this->generateMembershipNumber($user->id);
            $user->save();
        }

        return Inertia::render('Onboarding/Membership', [
            'user' => [
                'name' => $user->name,
                'country' => $user->country,
                'avatar_url' => $user->avatar_path ? Storage::url($user->avatar_path) : null,
                'membership_number' => $user->membership_number,
            ],
        ]);
    }

    public function complete(Request $request): RedirectResponse
    {
        $request->user()->update([
            'onboarding_completed' => true,
        ]);

        return redirect()->route('dashboard');
    }

    private function generateMembershipNumber(int $userId): string
    {
        $year = now()->format('Y');

        return sprintf('PPT-%s-%06d', $year, $userId);
    }
}
