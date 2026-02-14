<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthTip extends Model
{
    protected $fillable = ['user_id', 'health_tip_category_id', 'title', 'slug', 'description', 'content', 'image', 'duration', 'tag'];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(HealthTipCategory::class, 'health_tip_category_id');
    }
}
