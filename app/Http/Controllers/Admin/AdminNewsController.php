<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\NewsCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminNewsController extends Controller
{
    public function index(Request $request): Response
    {
        $q = trim((string) $request->query('q', ''));

        $query = News::query()->latest();
        if ($q !== '') {
            $query->where(function ($qb) use ($q) {
                $qb->where('title', 'like', '%'.$q.'%')
                    ->orWhere('summary', 'like', '%'.$q.'%')
                    ->orWhere('content', 'like', '%'.$q.'%')
                    ->orWhere('category', 'like', '%'.$q.'%')
                    ->orWhere('author_name', 'like', '%'.$q.'%');
            });
        }

        return Inertia::render('Admin/HotNews/Index', [
            'filters' => [
                'q' => $q,
            ],
            'news' => $query->paginate(12)->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/HotNews/Create', [
            'categories' => NewsCategory::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        // Log incoming request data for debugging
        \Log::info('News store request data:', $request->all());

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'category' => ['required', 'string', 'max:255'],
            'author_name' => ['nullable', 'string', 'max:255'],
            'is_hot' => ['nullable', 'boolean'],
        ]);

        $baseSlug = Str::slug($data['title']);
        $slug = $baseSlug;
        $i = 2;
        while (News::query()->where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$i;
            $i++;
        }

        News::create([
            'title' => $data['title'],
            'slug' => $slug,
            'summary' => $data['summary'] ?? null,
            'content' => $data['content'],
            'category' => $data['category'],
            'author_name' => $data['author_name'] ?? 'PhysioPlanet Editor',
            'is_hot' => (bool) ($data['is_hot'] ?? false),
        ]);

        return redirect()->route('admin.hot-news.index')->with('success', 'News created.');
    }

    public function edit(News $news): Response
    {
        return Inertia::render('Admin/HotNews/Edit', [
            'news' => $news,
            'categories' => NewsCategory::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, News $news): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'category' => ['required', 'string', 'max:255'],
            'author_name' => ['nullable', 'string', 'max:255'],
            'is_hot' => ['nullable', 'boolean'],
        ]);

        // Only regenerate slug if title changed
        $slug = $news->slug;
        if ($data['title'] !== $news->title) {
            $baseSlug = Str::slug($data['title']);
            $slug = $baseSlug;
            $i = 2;
            while (News::query()->where('slug', $slug)->where('id', '!=', $news->id)->exists()) {
                $slug = $baseSlug.'-'.$i;
                $i++;
            }
        }

        $news->update([
            'title' => $data['title'],
            'slug' => $slug,
            'summary' => $data['summary'] ?? null,
            'content' => $data['content'],
            'category' => $data['category'],
            'author_name' => $data['author_name'] ?? 'PhysioPlanet Editor',
            'is_hot' => (bool) ($data['is_hot'] ?? false),
        ]);

        return redirect()->route('admin.hot-news.index')->with('success', 'News updated.');
    }

    public function destroy(News $news): RedirectResponse
    {
        $news->delete();

        return redirect()->route('admin.hot-news.index')->with('success', 'News deleted.');
    }
}
