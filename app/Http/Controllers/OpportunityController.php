<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use App\Models\OpportunityApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class OpportunityController extends Controller
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

    public function index(Request $request)
    {
        $appliedIds = [];
        if ($request->user() && Schema::hasTable('opportunity_applications')) {
            $appliedIds = OpportunityApplication::query()
                ->where('user_id', $request->user()->id)
                ->pluck('opportunity_id')
                ->map(fn ($id) => (int) $id)
                ->values()
                ->all();
        }

        $vacancies = [];
        if (Schema::hasTable('opportunities')) {
            $vacancies = Opportunity::query()
                ->where('is_active', true)
                ->orderByDesc('close_date')
                ->get()
                ->map(fn (Opportunity $o) => $this->vacancyProps($o))
                ->all();
        }

        return Inertia::render('Opportunities/Index', [
            'vacancies' => $vacancies,
            'appliedIds' => $appliedIds,
        ]);
    }

    public function show(int $id)
    {
        $opportunity = Opportunity::query()->where('is_active', true)->findOrFail($id);
        $vacancy = $this->vacancyProps($opportunity);

        return Inertia::render('Opportunities/Show', [
            'vacancy' => $vacancy,
        ]);
    }
}
