<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        return Inertia::render('PTLibrary/Index', [
            'books' => Book::with('uploader')->latest()->get(),
        ]);
    }
}
