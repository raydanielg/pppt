<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminGalleryImageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Gallery/Images', [
            'categories' => GalleryCategory::query()->orderBy('name')->get(['id', 'name']),
            'images' => GalleryImage::query()->with('category:id,name')->latest()->paginate(12),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'gallery_category_id' => ['required', 'integer', 'exists:gallery_categories,id'],
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['required', 'image', 'max:5120'],
        ]);

        $path = $request->file('image')->store('gallery', 'public');
        $url = Storage::disk('public')->url($path);

        GalleryImage::create([
            'gallery_category_id' => $data['gallery_category_id'],
            'title' => $data['title'] ?? null,
            'description' => $data['description'] ?? null,
            'image_url' => $url,
        ]);

        return redirect()->route('admin.gallery-images.index')->with('success', 'Image uploaded.');
    }

    public function destroy(GalleryImage $galleryImage): RedirectResponse
    {
        $galleryImage->delete();

        return redirect()->route('admin.gallery-images.index')->with('success', 'Image deleted.');
    }
}
