<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPaymentController extends Controller
{
    public function index(Request $request): Response
    {
        $q = trim((string) $request->query('q', ''));
        $status = trim((string) $request->query('status', ''));

        $query = User::query()->orderByDesc('membership_paid_at')->orderByDesc('created_at');

        if ($status !== '') {
            $query->where('membership_payment_status', $status);
        }

        if ($q !== '') {
            $query->where(function ($qb) use ($q) {
                $qb->where('name', 'like', '%'.$q.'%')
                    ->orWhere('email', 'like', '%'.$q.'%')
                    ->orWhere('membership_number', 'like', '%'.$q.'%')
                    ->orWhere('membership_payment_reference', 'like', '%'.$q.'%');
            });
        }

        $paginated = $query->paginate(20)->withQueryString();
        $paginated->getCollection()->transform(function (User $u) {
            return [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'country' => $u->country,
                'created_at' => $u->created_at,
                'membership_number' => $u->membership_number,
                'payment_status' => $u->membership_payment_status,
                'payment_reference' => $u->membership_payment_reference,
                'payment_type' => $u->membership_payment_type,
                'paid_at' => $u->membership_paid_at,
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
