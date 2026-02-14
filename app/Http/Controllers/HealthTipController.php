<?php

namespace App\Http\Controllers;

use App\Models\HealthTip;
use App\Models\HealthTipCategory;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HealthTipController extends Controller
{
    public function index()
    {
        return Inertia::render('HealthTips/Index', [
            'categories' => HealthTipCategory::all(),
            'tips' => HealthTip::with(['author', 'category'])->latest()->paginate(8),
        ]);
    }

    public function show($id)
    {
        $tip = HealthTip::with(['author', 'category'])->findOrFail($id);
        $relatedPosts = HealthTip::where('health_tip_category_id', $tip->health_tip_category_id)
            ->where('id', '!=', $tip->id)
            ->limit(3)
            ->get();

        return Inertia::render('HealthTips/Show', [
            'tip' => $tip,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
