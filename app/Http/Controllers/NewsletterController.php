<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:newsletter_subscriptions,email',
        ], [
            'email.unique' => 'Barua pepe hii tayari imesajiliwa kwenye jarida letu.',
            'email.email' => 'Tafadhali weka barua pepe sahihi.',
            'email.required' => 'Barua pepe inahitajika.',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        NewsletterSubscription::create([
            'email' => $request->email,
            'is_active' => true,
        ]);

        return back()->with('success', 'Asante kwa kujiunga na jarida letu la PhysioPlanet!');
    }
}
