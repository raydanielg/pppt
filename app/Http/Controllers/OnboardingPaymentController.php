<?php

namespace App\Http\Controllers;

use App\Models\PaymentAttempt;
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

        // Check for any pending or initiated attempt in the last 1 minute
        $latestAttempt = PaymentAttempt::where('user_id', $user->id)
            ->where('type', 'membership')
            ->whereIn('status', ['initiated', 'pending'])
            ->where('created_at', '>=', now()->subMinute())
            ->latest()
            ->first();

        return Inertia::render('Onboarding/Payment', [
            'amount' => 10000,
            'currency' => 'TZS',
            'payment' => [
                'status' => $user->membership_payment_status,
                'reference' => $user->membership_payment_reference,
                'type' => $user->membership_payment_type,
                'paid_at' => $user->membership_paid_at,
                'active_attempt' => $latestAttempt ? [
                    'reference' => $latestAttempt->reference,
                    'status' => $latestAttempt->status,
                    'created_at' => $latestAttempt->created_at,
                    'expires_at' => $latestAttempt->created_at->addMinute(),
                ] : null,
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

        // Don't allow multiple active attempts within 2 minutes to prevent spam
        $recentAttempt = PaymentAttempt::where('user_id', $user->id)
            ->where('type', 'membership')
            ->where('created_at', '>=', now()->subMinutes(2))
            ->exists();

        if ($recentAttempt) {
            return response()->json([
                'status' => 'error',
                'code' => 429,
                'message' => 'Please wait a moment before trying again.',
            ], 429);
        }

        $validated = $request->validate([
            'payment_type' => ['required', 'in:mobile'],
            'phone_number' => ['required', 'string', 'max:30'],
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
        $phone = $validated['phone_number'];

        $idempotencyKey = (string) Str::uuid();

        $payload = [
            'payment_type' => $paymentType,
            'details' => [
                'amount' => 10000,
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

        $attempt = PaymentAttempt::create([
            'user_id' => $user->id,
            'type' => 'membership',
            'amount' => 10000,
            'phone_number' => $phone,
            'status' => 'initiated',
            'metadata' => ['idempotency_key' => $idempotencyKey],
        ]);

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
            $attempt->update(['status' => 'failed', 'metadata' => array_merge($attempt->metadata ?? [], ['error' => 'timeout'])]);
            return response()->json([
                'status' => 'error',
                'code' => 504,
                'message' => 'Unable to reach Snippe API (timeout). Please try again.',
            ], 504);
        }

        if (! $response->successful()) {
            $errorData = $response->json();
            $attempt->update([
                'status' => 'failed',
                'metadata' => array_merge($attempt->metadata ?? [], ['api_error' => $errorData])
            ]);
            
            return response()->json([
                'status' => 'error',
                'code' => $response->status(),
                'message' => $response->json('message') ?? 'Failed to create payment',
                'data' => $errorData,
            ], 422);
        }

        $data = $response->json('data') ?? [];

        $attempt->update([
            'reference' => $data['reference'] ?? null,
            'status' => $data['status'] ?? 'pending',
            'metadata' => array_merge($attempt->metadata ?? [], ['api_response' => $data]),
        ]);

        $user->update([
            'membership_payment_status' => $data['status'] ?? 'pending',
            'membership_payment_reference' => $data['reference'] ?? null,
            'membership_payment_type' => $paymentType,
        ]);

        return response()->json([
            'status' => 'success',
            'code' => 201,
            'data' => array_merge($data, [
                'expires_at' => now()->addMinute(),
            ]),
        ]);
    }

    public function status(Request $request): JsonResponse
    {
        $user = $request->user();

        // If user already marked as paid in DB, return success immediately
        if ($user->hasPaidMembership()) {
            return response()->json([
                'status' => 'success',
                'code' => 200,
                'data' => [
                    'status' => 'completed',
                    'has_paid' => true,
                    'paid_at' => $user->membership_paid_at,
                ],
            ]);
        }

        // Check if there was a cancellation or failure
        $latestAttempt = PaymentAttempt::where('user_id', $user->id)
            ->where('type', 'membership')
            ->latest()
            ->first();

        return response()->json([
            'status' => 'success',
            'code' => 200,
            'data' => [
                'status' => $user->membership_payment_status,
                'reference' => $user->membership_payment_reference,
                'type' => $user->membership_payment_type,
                'paid_at' => $user->membership_paid_at,
                'has_paid' => $user->hasPaidMembership(),
                'latest_attempt_status' => $latestAttempt?->status,
                'is_expired' => $latestAttempt && $latestAttempt->created_at->addMinute()->isPast(),
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
