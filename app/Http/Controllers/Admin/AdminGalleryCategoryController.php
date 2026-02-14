<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminGalleryCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Gallery/Categories', [
            'categories' => GalleryCategory::query()->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $baseSlug = Str::slug($data['name']);
        $slug = $baseSlug;
        $i = 2;
        while (GalleryCategory::query()->where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$i;
            $i++;
        }

        GalleryCategory::create([
            'name' => $data['name'],
            'slug' => $slug,
            'description' => $data['description'] ?? null,
        ]);

        return redirect()->route('admin.gallery-categories.index')->with('success', 'Gallery category created.');
    }

    public function destroy(GalleryCategory $galleryCategory): RedirectResponse
    {
        $galleryCategory->delete();

        return redirect()->route('admin.gallery-categories.index')->with('success', 'Gallery category deleted.');
    }
}
