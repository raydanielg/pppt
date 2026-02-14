<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'summary',
        'content',
        'image',
        'category',
        'author_name',
        'is_hot'
    ];

    public function comments()
    {
        return $this->hasMany(NewsComment::class)->whereNull('parent_id')->with('user', 'replies')->latest();
    }
}
