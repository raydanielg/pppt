<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\LibraryCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminBookController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Library/Books', [
            'categories' => LibraryCategory::query()->orderBy('name')->get(['id', 'name']),
            'books' => Book::query()->with(['uploader:id,name,email', 'libraryCategory:id,name'])->latest()->paginate(12),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'library_category_id' => ['required', 'integer', 'exists:library_categories,id'],
            'cover_image' => ['nullable', 'image', 'max:5120'],
            'pdf_file' => ['required', 'file', 'mimes:pdf', 'max:51200'],
        ]);

        $coverPath = null;
        if ($request->hasFile('cover_image')) {
            $coverPath = $request->file('cover_image')->store('library/covers', 'public');
        }

        $pdfPath = $request->file('pdf_file')->store('library/books', 'public');

        $sizeBytes = $request->file('pdf_file')->getSize();
        $sizeMb = $sizeBytes ? round($sizeBytes / 1024 / 1024, 2) : null;

        Book::create([
            'title' => $data['title'],
            'author' => (string) ($request->user()->name ?? 'Unknown'),
            'description' => $data['description'] ?? null,
            'cover_image' => $coverPath,
            'pdf_url' => $pdfPath,
            'library_category_id' => $data['library_category_id'],
            'file_size' => $sizeMb ? ($sizeMb.' MB') : null,
            'uploaded_by' => $request->user()->id,
        ]);

        return redirect()->route('admin.library.books.index')->with('success', 'Book uploaded.');
    }

    public function destroy(Book $book): RedirectResponse
    {
        $coverRaw = (string) ($book->getRawOriginal('cover_image') ?? '');
        if ($coverRaw !== '' && ! str_starts_with($coverRaw, 'http://') && ! str_starts_with($coverRaw, 'https://')) {
            Storage::disk('public')->delete($coverRaw);
        }

        $pdfRaw = (string) ($book->getRawOriginal('pdf_url') ?? '');
        if ($pdfRaw !== '' && ! str_starts_with($pdfRaw, 'http://') && ! str_starts_with($pdfRaw, 'https://')) {
            Storage::disk('public')->delete($pdfRaw);
        }

        $book->delete();

        return redirect()->route('admin.library.books.index')->with('success', 'Book deleted.');
    }
}
