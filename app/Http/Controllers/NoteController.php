<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\LibraryCategory;
use Inertia\Inertia;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $category = trim((string) $request->query('category', ''));

        $notesQuery = Note::query()->with(['uploader', 'libraryCategory']);

        if ($category !== '') {
            $notesQuery->whereHas('libraryCategory', fn ($q) => $q->where('slug', $category));
        }

        if ($search !== '') {
            $notesQuery->where(function ($q) use ($search) {
                $q->where('title', 'like', '%'.$search.'%')
                    ->orWhere('author', 'like', '%'.$search.'%');
            });
        }

        return Inertia::render('PTLibrary/Notes', [
            'notes' => $notesQuery->latest()->get(),
            'categories' => LibraryCategory::query()->orderBy('name')->get(['id', 'name', 'slug']),
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }
}
