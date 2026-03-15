<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OpportunityApplication;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminOpportunityApplicationController extends Controller
{
    public function index(Request $request): Response
    {
        $q = trim((string) $request->query('q', ''));

        $query = OpportunityApplication::query()
            ->with([
                'user:id,name,email',
                'opportunity:id,advert_name,employer_name',
            ])
            ->orderByDesc('created_at');

        if ($q !== '') {
            $query->where(function ($qb) use ($q) {
                $qb->where('advert_name', 'like', '%'.$q.'%')
                    ->orWhereHas('user', fn ($u) => $u->where('name', 'like', '%'.$q.'%')->orWhere('email', 'like', '%'.$q.'%'));
            });
        }

        return Inertia::render('Admin/Opportunities/Applications', [
            'filters' => [
                'q' => $q,
            ],
            'applications' => $query->paginate(15)->withQueryString(),
            'hasReviewed' => Schema::hasColumn('opportunity_applications', 'is_reviewed'),
        ]);
    }

    public function show(OpportunityApplication $opportunityApplication): Response
    {
        $opportunityApplication->load([
            'user:id,name,email',
            'opportunity:id,advert_name,employer_name,open_date,close_date,posts,remuneration',
        ]);

        return Inertia::render('Admin/Opportunities/ApplicationShow', [
            'application' => $opportunityApplication,
            'hasReviewed' => Schema::hasColumn('opportunity_applications', 'is_reviewed'),
        ]);
    }

    public function markReviewed(Request $request, OpportunityApplication $opportunityApplication): RedirectResponse
    {
        if (! Schema::hasColumn('opportunity_applications', 'is_reviewed')) {
            return redirect()->route('admin.opportunity-applications.index');
        }

        $data = $request->validate([
            'is_reviewed' => ['required', 'boolean'],
        ]);

        $opportunityApplication->update([
            'is_reviewed' => (bool) $data['is_reviewed'],
        ]);

        return redirect()->back()->with('success', 'Application updated.');
    }

    public function download(OpportunityApplication $opportunityApplication)
    {
        $path = (string) $opportunityApplication->cover_letter_path;

        if ($path === '' || ! Storage::disk('local')->exists($path)) {
            abort(404);
        }

        $name = (string) ($opportunityApplication->cover_letter_original_name ?: 'cover-letter');

        return Storage::disk('local')->download($path, $name);
    }

    public function destroy(OpportunityApplication $opportunityApplication): RedirectResponse
    {
        $path = (string) $opportunityApplication->cover_letter_path;
        if ($path !== '' && Storage::disk('local')->exists($path)) {
            Storage::disk('local')->delete($path);
        }

        $opportunityApplication->delete();

        return redirect()->route('admin.opportunity-applications.index')->with('success', 'Application deleted.');
    }
}
