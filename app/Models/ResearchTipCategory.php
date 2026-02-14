<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchTipCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'icon',
    ];
}
