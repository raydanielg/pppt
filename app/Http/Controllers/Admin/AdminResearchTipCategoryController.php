<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ResearchTipCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminResearchTipCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/ResearchTips/Categories', [
            'categories' => ResearchTipCategory::query()->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
        ]);

        $baseSlug = Str::slug($data['name']);
        $slug = $baseSlug;
        $i = 2;
        while (ResearchTipCategory::query()->where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$i;
            $i++;
        }

        ResearchTipCategory::create([
            'name' => $data['name'],
            'slug' => $slug,
            'icon' => $data['icon'] ?? null,
        ]);

        return redirect()->route('admin.research-tip-categories.index')->with('success', 'Category created.');
    }

    public function destroy(ResearchTipCategory $researchTipCategory): RedirectResponse
    {
        $researchTipCategory->delete();

        return redirect()->route('admin.research-tip-categories.index')->with('success', 'Category deleted.');
    }
}
