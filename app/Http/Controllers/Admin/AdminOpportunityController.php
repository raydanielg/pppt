<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Opportunity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminOpportunityController extends Controller
{
    private function linesToArray(?string $text): array
    {
        $text = (string) $text;
        $lines = preg_split("/\r\n|\r|\n/", $text) ?: [];

        return collect($lines)
            ->map(fn ($l) => trim((string) $l))
            ->filter(fn ($l) => $l !== '')
            ->values()
            ->all();
    }

    private function arrayToLines($arr): string
    {
        if (! is_array($arr)) {
            return '';
        }
        return implode("\n", array_values(array_filter(array_map(fn ($v) => trim((string) $v), $arr), fn ($v) => $v !== '')));
    }

    public function index(Request $request): Response
    {
        $q = trim((string) $request->query('q', ''));

        $query = Opportunity::query()->orderByDesc('created_at');
        if ($q !== '') {
            $query->where(function ($qb) use ($q) {
                $qb->where('advert_name', 'like', '%'.$q.'%')
                    ->orWhere('employer_name', 'like', '%'.$q.'%')
                    ->orWhere('remuneration', 'like', '%'.$q.'%');
            });
        }

        return Inertia::render('Admin/Opportunities/Index', [
            'filters' => [
                'q' => $q,
            ],
            'opportunities' => $query->paginate(12)->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Opportunities/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'advert_name' => ['required', 'string', 'max:255'],
            'posts' => ['required', 'integer', 'min:1'],
            'employer_name' => ['required', 'string', 'max:255'],
            'open_date' => ['required', 'date'],
            'close_date' => ['required', 'date'],
            'remuneration' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
            'duties_text' => ['nullable', 'string'],
            'qualifications_text' => ['nullable', 'string'],
        ]);

        Opportunity::create([
            'advert_name' => $data['advert_name'],
            'posts' => (int) $data['posts'],
            'employer_name' => $data['employer_name'],
            'open_date' => $data['open_date'],
            'close_date' => $data['close_date'],
            'remuneration' => $data['remuneration'] ?? null,
            'is_active' => (bool) ($data['is_active'] ?? false),
            'duties' => $this->linesToArray($data['duties_text'] ?? ''),
            'qualifications' => $this->linesToArray($data['qualifications_text'] ?? ''),
        ]);

        return redirect()->route('admin.opportunities.index')->with('success', 'Opportunity created.');
    }

    public function edit(Opportunity $opportunity): Response
    {
        return Inertia::render('Admin/Opportunities/Edit', [
            'opportunity' => [
                'id' => $opportunity->id,
                'advert_name' => $opportunity->advert_name,
                'posts' => (int) $opportunity->posts,
                'employer_name' => $opportunity->employer_name,
                'open_date' => optional($opportunity->open_date)->format('Y-m-d'),
                'close_date' => optional($opportunity->close_date)->format('Y-m-d'),
                'remuneration' => $opportunity->remuneration,
                'is_active' => (bool) $opportunity->is_active,
                'duties_text' => $this->arrayToLines($opportunity->duties),
                'qualifications_text' => $this->arrayToLines($opportunity->qualifications),
            ],
        ]);
    }

    public function update(Request $request, Opportunity $opportunity): RedirectResponse
    {
        $data = $request->validate([
            'advert_name' => ['required', 'string', 'max:255'],
            'posts' => ['required', 'integer', 'min:1'],
            'employer_name' => ['required', 'string', 'max:255'],
            'open_date' => ['required', 'date'],
            'close_date' => ['required', 'date'],
            'remuneration' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
            'duties_text' => ['nullable', 'string'],
            'qualifications_text' => ['nullable', 'string'],
        ]);

        $opportunity->update([
            'advert_name' => $data['advert_name'],
            'posts' => (int) $data['posts'],
            'employer_name' => $data['employer_name'],
            'open_date' => $data['open_date'],
            'close_date' => $data['close_date'],
            'remuneration' => $data['remuneration'] ?? null,
            'is_active' => (bool) ($data['is_active'] ?? false),
            'duties' => $this->linesToArray($data['duties_text'] ?? ''),
            'qualifications' => $this->linesToArray($data['qualifications_text'] ?? ''),
        ]);

        return redirect()->route('admin.opportunities.index')->with('success', 'Opportunity updated.');
    }

    public function destroy(Opportunity $opportunity): RedirectResponse
    {
        $opportunity->delete();

        return redirect()->route('admin.opportunities.index')->with('success', 'Opportunity deleted.');
    }
}
