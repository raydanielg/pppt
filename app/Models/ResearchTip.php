<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchTip extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'author_name',
        'abstract',
        'content',
        'category',
        'read_time',
        'image',
        'published_date'
    ];
}
