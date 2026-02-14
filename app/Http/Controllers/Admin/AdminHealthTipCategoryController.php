<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HealthTipCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminHealthTipCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/HealthTips/Categories', [
            'categories' => HealthTipCategory::query()->orderBy('name')->get(),
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
        while (HealthTipCategory::query()->where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$i;
            $i++;
        }

        HealthTipCategory::create([
            'name' => $data['name'],
            'slug' => $slug,
            'icon' => $data['icon'] ?? null,
        ]);

        return redirect()->route('admin.health-tip-categories.index')->with('success', 'Category created.');
    }

    public function destroy(HealthTipCategory $healthTipCategory): RedirectResponse
    {
        $healthTipCategory->delete();

        return redirect()->route('admin.health-tip-categories.index')->with('success', 'Category deleted.');
    }
}
