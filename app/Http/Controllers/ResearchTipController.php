<?php

namespace App\Http\Controllers;

use App\Models\ResearchTip;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ResearchTipController extends Controller
{
    public function index()
    {
        return Inertia::render('ResearchTips/Index', [
            'research' => ResearchTip::latest()->paginate(8),
        ]);
    }

    public function show($slug)
    {
        $research = ResearchTip::where('slug', $slug)->firstOrFail();
        $relatedResearch = ResearchTip::where('category', $research->category)
            ->where('id', '!=', $research->id)
            ->limit(3)
            ->get();

        return Inertia::render('ResearchTips/Show', [
            'research' => $research,
            'relatedResearch' => $relatedResearch,
        ]);
    }
}
