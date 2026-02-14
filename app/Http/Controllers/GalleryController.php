<?php

namespace App\Http\Controllers;

use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use Inertia\Inertia;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        return Inertia::render('Gallery/Index', [
            'categories' => GalleryCategory::with('images')->get(),
            'all_images' => GalleryImage::with('category')->latest()->get(),
        ]);
    }
}
