<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class OnboardingCountriesController
{
    public function index(): JsonResponse
    {
        $countries = Cache::remember('countries:list:v1', now()->addHours(24), function () {
            $response = Http::timeout(10)->get('https://www.apicountries.com/countries');

            $response->throw();

            return $response->json();
        });

        return response()->json($countries);
    }
}
