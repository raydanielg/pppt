<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\OpportunityApplication;
use App\Models\PaymentAttempt;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPaymentController extends Controller
{
    public function index(Request $request): Response
    {
        $q = trim((string) $request->query('q', ''));
        $status = trim((string) $request->query('status', ''));

        $query = PaymentAttempt::with(['user', 'opportunity'])
            ->latest();

        if ($status !== '') {
            $query->where('status', $status);
        }

        if ($q !== '') {
            $query->where(function ($qb) use ($q) {
                $qb->whereHas('user', function($uq) use ($q) {
                    $uq->where('name', 'like', '%'.$q.'%')
                       ->orWhere('email', 'like', '%'.$q.'%');
                })
                ->orWhere('reference', 'like', '%'.$q.'%')
                ->orWhere('type', 'like', '%'.$q.'%');
            });
        }

        $paginated = $query->paginate(20)->withQueryString();

        $paginated->getCollection()->transform(function ($attempt) {
            return [
                'id' => $attempt->id,
                'name' => $attempt->user->name ?? 'Unknown',
                'email' => $attempt->user->email ?? 'N/A',
                'type' => $attempt->type,
                'status' => $attempt->status,
                'reference' => $attempt->reference,
                'paid_at' => $attempt->paid_at,
                'created_at' => $attempt->created_at,
                'extra_info' => $attempt->type === 'job_application' 
                    ? ($attempt->opportunity->advert_name ?? 'Job Application') 
                    : 'Membership Registration',
                'amount' => $attempt->amount . ' ' . $attempt->currency,
                'phone' => $attempt->phone_number,
            ];
        });

        return Inertia::render('Admin/Payments/Index', [
            'filters' => [
                'q' => $q,
                'status' => $status,
            ],
            'payments' => $paginated,
        ]);
    }
}
