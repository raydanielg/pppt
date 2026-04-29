<?php

namespace App\Http\Controllers;

use App\Models\OpportunityApplication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SnippeWebhookController
{
    public function handle(Request $request): Response
    {
        $payload = $request->getContent();

        $secret = config('services.snippe.webhook_secret');

        if ($secret) {
            $timestamp = (string) $request->header('X-Webhook-Timestamp');
            $signature = (string) $request->header('X-Webhook-Signature');

            if (! $timestamp || ! $signature) {
                return response('Missing signature headers', 400);
            }

            $eventTime = (int) $timestamp;
            $now = (int) floor(now()->timestamp);

            if (abs($now - $eventTime) > 300) {
                return response('Webhook timestamp too old', 400);
            }

            $message = $timestamp.'.'.$payload;
            $expected = hash_hmac('sha256', $message, $secret);

            if (! hash_equals($expected, $signature)) {
                return response('Invalid signature', 400);
            }
        }

        $event = json_decode($payload, true);

        if (! is_array($event)) {
            return response('Invalid JSON', 400);
        }

        $type = $event['type'] ?? $event['event'] ?? null;
        $data = $event['data'] ?? $event;

        $metadata = $data['metadata'] ?? [];
        $userId = $metadata['user_id'] ?? null;
        $purpose = $metadata['purpose'] ?? 'membership';
        $opportunityId = $metadata['opportunity_id'] ?? null;

        if (! $type || ! $userId) {
            return response('Missing required fields', 200);
        }

        $reference = $data['reference'] ?? null;

        // Handle job application payments
        if ($purpose === 'job_application' && $opportunityId) {
            $application = OpportunityApplication::query()
                ->where('user_id', $userId)
                ->where('opportunity_id', $opportunityId)
                ->where('payment_reference', $reference)
                ->first();

            if (! $application) {
                return response('Application not found', 200);
            }

            if ($type === 'payment.completed') {
                $application->update([
                    'payment_status' => 'completed',
                    'paid_at' => now(),
                ]);
                return response('OK', 200);
            }

            if ($type === 'payment.failed') {
                $application->update(['payment_status' => 'failed']);
                return response('OK', 200);
            }

            if ($type === 'payment.expired' || $type === 'payment.voided') {
                $application->update(['payment_status' => 'expired']);
                return response('OK', 200);
            }

            return response('OK', 200);
        }

        // Handle membership payments (default)
        $user = User::find($userId);

        if (! $user) {
            return response('User not found', 200);
        }

        if ($type === 'payment.completed') {
            $user->membership_payment_status = 'completed';
            $user->membership_payment_reference = $reference;
            $user->membership_paid_at = now();

            if (! $user->membership_number) {
                $user->membership_number = $this->generateMembershipNumber($user->id);
            }

            $user->save();

            return response('OK', 200);
        }

        if ($type === 'payment.failed') {
            $user->update([
                'membership_payment_status' => 'failed',
                'membership_payment_reference' => $reference,
            ]);

            return response('OK', 200);
        }

        if ($type === 'payment.expired' || $type === 'payment.voided') {
            $user->update([
                'membership_payment_status' => 'expired',
                'membership_payment_reference' => $reference,
            ]);

            return response('OK', 200);
        }

        return response('OK', 200);
    }

    private function generateMembershipNumber(int $userId): string
    {
        $year = now()->format('Y');

        return sprintf('PPT-%s-%06d', $year, $userId);
    }
}
