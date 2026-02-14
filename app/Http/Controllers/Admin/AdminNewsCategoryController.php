<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminNewsCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/HotNews/Categories', [
            'categories' => NewsCategory::query()->orderBy('name')->get(),
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
        while (NewsCategory::query()->where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$i;
            $i++;
        }

        NewsCategory::create([
            'name' => $data['name'],
            'slug' => $slug,
            'icon' => $data['icon'] ?? null,
        ]);

        return redirect()->route('admin.hot-news-categories.index')->with('success', 'Category created.');
    }

    public function destroy(NewsCategory $newsCategory): RedirectResponse
    {
        $newsCategory->delete();

        return redirect()->route('admin.hot-news-categories.index')->with('success', 'Category deleted.');
    }
}
