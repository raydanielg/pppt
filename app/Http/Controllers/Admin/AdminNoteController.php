<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\LibraryCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminNoteController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Library/Notes', [
            'categories' => LibraryCategory::query()->orderBy('name')->get(['id', 'name']),
            'notes' => Note::query()->with(['uploader:id,name,email', 'libraryCategory:id,name'])->latest()->paginate(12),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'library_category_id' => ['required', 'integer', 'exists:library_categories,id'],
            'file' => ['required', 'file', 'max:51200', 'mimes:pdf,doc,docx,ppt,pptx,xls,xlsx,txt'],
        ]);

        $path = $request->file('file')->store('library/notes', 'public');

        $sizeBytes = $request->file('file')->getSize();
        $sizeMb = $sizeBytes ? round($sizeBytes / 1024 / 1024, 2) : null;

        Note::create([
            'title' => $data['title'],
            'author' => (string) ($request->user()->name ?? 'Unknown'),
            'description' => $data['description'] ?? null,
            'file_url' => $path,
            'library_category_id' => $data['library_category_id'],
            'file_size' => $sizeMb ? ($sizeMb.' MB') : null,
            'uploaded_by' => $request->user()->id,
        ]);

        return redirect()->route('admin.library.notes.index')->with('success', 'Notes uploaded.');
    }

    public function destroy(Note $note): RedirectResponse
    {
        $raw = (string) ($note->getRawOriginal('file_url') ?? '');
        if ($raw !== '' && ! str_starts_with($raw, 'http://') && ! str_starts_with($raw, 'https://')) {
            Storage::disk('public')->delete($raw);
        }

        $note->delete();

        return redirect()->route('admin.library.notes.index')->with('success', 'Notes deleted.');
    }
}
