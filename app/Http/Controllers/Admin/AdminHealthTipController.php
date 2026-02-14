<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HealthTip;
use App\Models\HealthTipCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminHealthTipController extends Controller
{
    public function index(Request $request): Response
    {
        $q = trim((string) $request->query('q', ''));

        $tipsQuery = HealthTip::query()
            ->with(['author:id,name', 'category:id,name'])
            ->latest();

        if ($q !== '') {
            $tipsQuery->where(function ($qb) use ($q) {
                $qb->where('title', 'like', '%'.$q.'%')
                    ->orWhere('description', 'like', '%'.$q.'%')
                    ->orWhere('tag', 'like', '%'.$q.'%');
            });
        }

        return Inertia::render('Admin/HealthTips/Index', [
            'filters' => [
                'q' => $q,
            ],
            'tips' => $tipsQuery->paginate(12)->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/HealthTips/Create', [
            'categories' => HealthTipCategory::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'health_tip_category_id' => ['required', 'integer', 'exists:health_tip_categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'content' => ['required', 'string'],
            'duration' => ['required', 'string', 'max:255'],
            'tag' => ['nullable', 'string', 'max:255'],
        ]);

        $baseSlug = Str::slug($data['title']);
        $slug = $baseSlug;
        $i = 2;
        while (HealthTip::query()->where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$i;
            $i++;
        }

        HealthTip::create([
            'user_id' => $request->user()->id,
            'health_tip_category_id' => $data['health_tip_category_id'],
            'title' => $data['title'],
            'slug' => $slug,
            'description' => $data['description'],
            'content' => $data['content'],
            'duration' => $data['duration'],
            'tag' => $data['tag'] ?? null,
        ]);

        return redirect()->route('admin.health-tips.index')->with('success', 'Health tip created.');
    }

    public function destroy(HealthTip $healthTip): RedirectResponse
    {
        $healthTip->delete();

        return redirect()->route('admin.health-tips.index')->with('success', 'Health tip deleted.');
    }
}
