<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingPaymentController
{
    public function show(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if ($user->hasPaidMembership()) {
            return redirect()->route('onboarding.confirm');
        }

        return Inertia::render('Onboarding/Payment', [
            'amount' => 5000,
            'currency' => 'TZS',
            'payment' => [
                'status' => $user->membership_payment_status,
                'reference' => $user->membership_payment_reference,
                'type' => $user->membership_payment_type,
                'paid_at' => $user->membership_paid_at,
            ],
        ]);
    }

    public function start(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->hasPaidMembership()) {
            return response()->json([
                'status' => 'success',
                'code' => 200,
                'data' => [
                    'status' => 'completed',
                    'reference' => $user->membership_payment_reference,
                ],
            ]);
        }

        $validated = $request->validate([
            'payment_type' => ['required', 'in:mobile'],
            'phone_number' => ['nullable', 'string', 'max:30'],
        ]);

        $apiKey = config('services.snippe.api_key');

        if (! $apiKey) {
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Snippe API key not configured',
            ], 500);
        }

        $paymentType = $validated['payment_type'];
        $phone = $validated['phone_number'] ?? null;

        $idempotencyKey = (string) Str::uuid();

        $payload = [
            'payment_type' => $paymentType,
            'details' => [
                'amount' => 5000,
                'currency' => 'TZS',
            ],
            'phone_number' => $phone,
            'customer' => [
                'firstname' => $this->guessFirstName($user->name),
                'lastname' => $this->guessLastName($user->name),
                'email' => $user->email,
            ],
            'webhook_url' => secure_url(route('webhooks.snippe', [], false)),
            'metadata' => [
                'user_id' => $user->id,
                'purpose' => 'membership',
            ],
        ];

        try {
            $response = Http::connectTimeout(10)
                ->timeout(60)
                ->retry(2, 500, throw: false)
                ->withToken($apiKey)
                ->withHeaders([
                    'Idempotency-Key' => $idempotencyKey,
                    'Content-Type' => 'application/json',
                ])
                ->post('https://api.snippe.sh/v1/payments', $payload);
        } catch (ConnectionException $e) {
            return response()->json([
                'status' => 'error',
                'code' => 504,
                'message' => 'Unable to reach Snippe API (timeout). Please try again.',
            ], 504);
        }

        if (! $response->successful()) {
            return response()->json([
                'status' => 'error',
                'code' => $response->status(),
                'message' => $response->json('message') ?? 'Failed to create payment',
                'data' => $response->json(),
            ], 422);
        }

        $data = $response->json('data') ?? [];

        $user->update([
            'membership_payment_status' => $data['status'] ?? 'pending',
            'membership_payment_reference' => $data['reference'] ?? null,
            'membership_payment_type' => $paymentType,
        ]);

        return response()->json([
            'status' => 'success',
            'code' => 201,
            'data' => $data,
        ]);
    }

    public function status(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'status' => 'success',
            'code' => 200,
            'data' => [
                'status' => $user->membership_payment_status,
                'reference' => $user->membership_payment_reference,
                'type' => $user->membership_payment_type,
                'paid_at' => $user->membership_paid_at,
                'has_paid' => $user->hasPaidMembership(),
            ],
        ]);
    }

    private function guessFirstName(string $name): string
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [];

        return $parts[0] ?? 'Member';
    }

    private function guessLastName(string $name): string
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [];

        if (count($parts) <= 1) {
            return 'Member';
        }

        return $parts[count($parts) - 1];
    }
}
