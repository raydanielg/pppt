<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opportunity extends Model
{
    use HasFactory;

    protected $fillable = [
        'advert_name',
        'posts',
        'employer_name',
        'open_date',
        'close_date',
        'duties',
        'qualifications',
        'remuneration',
        'is_active',
    ];

    protected $casts = [
        'open_date' => 'date',
        'close_date' => 'date',
        'duties' => 'array',
        'qualifications' => 'array',
        'is_active' => 'boolean',
    ];
}
