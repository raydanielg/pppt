<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LibraryCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminLibraryCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Library/Categories', [
            'categories' => LibraryCategory::query()->orderBy('name')->get(['id', 'name', 'slug', 'description']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:library_categories,name'],
            'description' => ['nullable', 'string'],
        ]);

        LibraryCategory::create([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
            'description' => $data['description'] ?? null,
        ]);

        return redirect()->route('admin.library.categories.index')->with('success', 'Category created.');
    }

    public function destroy(LibraryCategory $libraryCategory): RedirectResponse
    {
        $libraryCategory->delete();

        return redirect()->route('admin.library.categories.index')->with('success', 'Category deleted.');
    }
}
