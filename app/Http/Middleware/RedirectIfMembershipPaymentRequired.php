<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfMembershipPaymentRequired
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return $next($request);
        }

        if (method_exists($user, 'hasRole') && $user->hasRole('admin')) {
            return $next($request);
        }

        // Users with ID >= 250 must pay (ID-based cutoff)
        if ($user->id < 250) {
            return $next($request);
        }

        if ($user->hasPaidMembership()) {
            return $next($request);
        }

        if ($request->routeIs('onboarding.*')) {
            return $next($request);
        }

        return redirect()->route('onboarding.payment');
    }
}
