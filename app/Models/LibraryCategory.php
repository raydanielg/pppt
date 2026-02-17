<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Book;
use App\Models\Note;

class LibraryCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    public function books()
    {
        return $this->hasMany(Book::class, 'library_category_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class, 'library_category_id');
    }
}
