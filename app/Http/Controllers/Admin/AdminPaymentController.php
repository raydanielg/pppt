<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\OpportunityApplication;
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

        // Query Registration Payments (Users table)
        $regPayments = DB::table('users')
            ->select([
                DB::raw("'registration' as type"),
                'id as source_id',
                'name',
                'email',
                'membership_payment_status as status',
                'membership_payment_reference as reference',
                'membership_paid_at as paid_at',
                'created_at',
                DB::raw("NULL as extra_info")
            ]);

        // Query Job Application Payments (OpportunityApplications table)
        $jobPayments = DB::table('opportunity_applications')
            ->join('users', 'opportunity_applications.user_id', '=', 'users.id')
            ->select([
                DB::raw("'job_application' as type"),
                'opportunity_applications.id as source_id',
                'users.name',
                'users.email',
                'opportunity_applications.payment_status as status',
                'opportunity_applications.payment_reference as reference',
                'opportunity_applications.paid_at as paid_at',
                'opportunity_applications.created_at',
                'opportunity_applications.advert_name as extra_info'
            ]);

        // Combine using Union
        $combinedQuery = DB::table(DB::raw("({$regPayments->toSql()} UNION ALL {$jobPayments->toSql()}) as combined"))
            ->mergeBindings($regPayments)
            ->mergeBindings($jobPayments)
            ->orderByDesc('paid_at')
            ->orderByDesc('created_at');

        if ($status !== '') {
            $combinedQuery->where('status', $status);
        }

        if ($q !== '') {
            $combinedQuery->where(function ($qb) use ($q) {
                $qb->where('name', 'like', '%'.$q.'%')
                    ->orWhere('email', 'like', '%'.$q.'%')
                    ->orWhere('reference', 'like', '%'.$q.'%')
                    ->orWhere('extra_info', 'like', '%'.$q.'%');
            });
        }

        $payments = $combinedQuery->paginate(20)->withQueryString();

        return Inertia::render('Admin/Payments/Index', [
            'filters' => [
                'q' => $q,
                'status' => $status,
            ],
            'payments' => $payments,
        ]);
    }
}
