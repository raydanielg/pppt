<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use App\Models\OpportunityApplication;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OpportunityApplicationController extends Controller
{
    private function vacancyProps(Opportunity $opportunity): array
    {
        return [
            'id' => $opportunity->id,
            'advertName' => $opportunity->advert_name,
            'posts' => (int) $opportunity->posts,
            'employerName' => $opportunity->employer_name,
            'openDate' => optional($opportunity->open_date)->format('d/m/Y'),
            'closeDate' => optional($opportunity->close_date)->format('d/m/Y'),
            'isClosed' => (bool) ($opportunity->close_date && $opportunity->close_date->isBefore(now()->startOfDay())),
            'duties' => $opportunity->duties ?? [],
            'qualifications' => $opportunity->qualifications ?? [],
            'remuneration' => $opportunity->remuneration,
        ];
    }

    public function create(Request $request, int $id)
    {
        $user = $request->user();
        $opportunity = Opportunity::query()->where('is_active', true)->findOrFail($id);
        $vacancy = $this->vacancyProps($opportunity);

        // Check if user already has paid for this application
        $existing = OpportunityApplication::query()
            ->where('user_id', $user->id)
            ->where('opportunity_id', $opportunity->id)
            ->where('payment_status', 'completed')
            ->first();

        return Inertia::render('Opportunities/Apply', [
            'vacancy' => $vacancy,
            'payment' => $existing ? [
                'status' => $existing->payment_status,
                'reference' => $existing->payment_reference,
                'paid_at' => $existing->paid_at,
            ] : null,
        ]);
    }

    public function thankYou(int $id)
    {
        $opportunity = Opportunity::query()->where('is_active', true)->findOrFail($id);
        $vacancy = $this->vacancyProps($opportunity);

        return Inertia::render('Opportunities/ThankYou', [
            'vacancy' => $vacancy,
        ]);
    }

    public function store(Request $request, int $id)
    {
        $user = $request->user();
        $opportunity = Opportunity::query()->where('is_active', true)->findOrFail($id);

        // Find existing application with completed payment
        $application = OpportunityApplication::query()
            ->where('user_id', $user->id)
            ->where('opportunity_id', $opportunity->id)
            ->where('payment_status', 'completed')
            ->first();

        if (! $application) {
            return redirect()->back()->with('error', 'Payment required before submitting application.');
        }

        $validated = $request->validate([
            'advert_name' => ['required', 'string', 'max:255'],
            'cover_letter' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
        ]);

        $file = $request->file('cover_letter');
        $path = $file->store('opportunity-applications', 'local');

        // Update existing application with file details
        $application->update([
            'advert_name' => $validated['advert_name'],
            'cover_letter_path' => $path,
            'cover_letter_original_name' => $file->getClientOriginalName(),
            'cover_letter_mime' => (string) $file->getClientMimeType(),
            'cover_letter_size' => (int) $file->getSize(),
        ]);

        return redirect()->route('opportunities.thank-you', $id)->with('success', 'Application received. Thank you for applying!');
    }

    public function startPayment(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $opportunity = Opportunity::query()->where('is_active', true)->findOrFail($id);

        // Check if already applied and paid
        $existing = OpportunityApplication::query()
            ->where('user_id', $user->id)
            ->where('opportunity_id', $opportunity->id)
            ->where('payment_status', 'completed')
            ->first();

        if ($existing) {
            return response()->json([
                'status' => 'success',
                'code' => 200,
                'data' => [
                    'reference' => $existing->payment_reference,
                    'status' => 'completed',
                ],
            ]);
        }

        $validated = $request->validate([
            'phone_number' => ['required', 'string', 'max:30'],
        ]);

        $apiKey = config('services.snippe.api_key');

        if (! $apiKey) {
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => 'Payment service not configured',
            ], 500);
        }

        $idempotencyKey = (string) Str::uuid();

        $payload = [
            'payment_type' => 'mobile',
            'details' => [
                'amount' => 10000,
                'currency' => 'TZS',
            ],
            'phone_number' => $validated['phone_number'],
            'customer' => [
                'firstname' => $this->guessFirstName($user->name),
                'lastname' => $this->guessLastName($user->name),
                'email' => $user->email,
            ],
            'webhook_url' => secure_url(route('webhooks.snippe')),
            'metadata' => [
                'user_id' => $user->id,
                'opportunity_id' => $opportunity->id,
                'purpose' => 'job_application',
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
                'message' => 'Unable to reach payment service. Please try again.',
            ], 504);
        }

        if (! $response->successful()) {
            return response()->json([
                'status' => 'error',
                'code' => $response->status(),
                'message' => $response->json('message') ?? 'Failed to start payment',
                'data' => $response->json(),
            ], 422);
        }

        $data = $response->json('data') ?? [];

        // Create application record with pending payment
        OpportunityApplication::create([
            'user_id' => $user->id,
            'opportunity_id' => $opportunity->id,
            'advert_name' => $opportunity->advert_name,
            'payment_status' => $data['status'] ?? 'pending',
            'payment_reference' => $data['reference'] ?? null,
        ]);

        return response()->json([
            'status' => 'success',
            'code' => 201,
            'data' => $data,
        ]);
    }

    public function checkPaymentStatus(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $opportunity = Opportunity::query()->where('is_active', true)->findOrFail($id);

        $application = OpportunityApplication::query()
            ->where('user_id', $user->id)
            ->where('opportunity_id', $opportunity->id)
            ->latest()
            ->first();

        if (! $application) {
            return response()->json([
                'status' => 'error',
                'code' => 404,
                'message' => 'No application found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'code' => 200,
            'data' => [
                'payment_status' => $application->payment_status,
                'payment_reference' => $application->payment_reference,
                'paid_at' => $application->paid_at,
                'has_paid' => $application->hasPaid(),
            ],
        ]);
    }

    private function guessFirstName(string $name): string
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [];
        return $parts[0] ?? 'Applicant';
    }

    private function guessLastName(string $name): string
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [];
        if (count($parts) <= 1) {
            return 'Applicant';
        }
        return $parts[count($parts) - 1];
    }
}
