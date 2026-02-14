<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use App\Models\OpportunityApplication;
use Illuminate\Http\Request;
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

    public function create(int $id)
    {
        $opportunity = Opportunity::query()->where('is_active', true)->findOrFail($id);
        $vacancy = $this->vacancyProps($opportunity);

        return Inertia::render('Opportunities/Apply', [
            'vacancy' => $vacancy,
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

        $validated = $request->validate([
            'advert_name' => ['required', 'string', 'max:255'],
            'cover_letter' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
        ]);

        $file = $request->file('cover_letter');
        $path = $file->store('opportunity-applications', 'local');

        OpportunityApplication::create([
            'user_id' => $user->id,
            'opportunity_id' => $opportunity->id,
            'advert_name' => $validated['advert_name'],
            'cover_letter_path' => $path,
            'cover_letter_original_name' => $file->getClientOriginalName(),
            'cover_letter_mime' => (string) $file->getClientMimeType(),
            'cover_letter_size' => (int) $file->getSize(),
        ]);

        return redirect()->route('opportunities.thank-you', $id)->with('success', 'Application received. Thank you for applying!');
    }
}
