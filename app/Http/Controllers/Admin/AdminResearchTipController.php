<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ResearchTip;
use App\Models\ResearchTipCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminResearchTipController extends Controller
{
    public function index(Request $request): Response
    {
        $q = trim((string) $request->query('q', ''));

        $query = ResearchTip::query()->latest();

        if ($q !== '') {
            $query->where(function ($qb) use ($q) {
                $qb->where('title', 'like', '%'.$q.'%')
                    ->orWhere('abstract', 'like', '%'.$q.'%')
                    ->orWhere('author_name', 'like', '%'.$q.'%')
                    ->orWhere('category', 'like', '%'.$q.'%');
            });
        }

        return Inertia::render('Admin/ResearchTips/Index', [
            'filters' => [
                'q' => $q,
            ],
            'tips' => $query->paginate(12)->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/ResearchTips/Create', [
            'categories' => ResearchTipCategory::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author_name' => ['required', 'string', 'max:255'],
            'abstract' => ['required', 'string'],
            'content' => ['required', 'string'],
            'category' => ['required', 'string', 'max:255'],
            'read_time' => ['nullable', 'string', 'max:255'],
            'published_date' => ['required', 'date'],
        ]);

        $baseSlug = Str::slug($data['title']);
        $slug = $baseSlug;
        $i = 2;
        while (ResearchTip::query()->where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$i;
            $i++;
        }

        ResearchTip::create([
            'title' => $data['title'],
            'slug' => $slug,
            'author_name' => $data['author_name'],
            'abstract' => $data['abstract'],
            'content' => $data['content'],
            'category' => $data['category'],
            'read_time' => $data['read_time'] ?? null,
            'published_date' => $data['published_date'],
        ]);

        return redirect()->route('admin.research-tips.index')->with('success', 'Research tip created.');
    }

    public function destroy(ResearchTip $researchTip): RedirectResponse
    {
        $researchTip->delete();

        return redirect()->route('admin.research-tips.index')->with('success', 'Research tip deleted.');
    }
}
