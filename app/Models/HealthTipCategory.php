<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthTipCategory extends Model
{
    protected $fillable = ['name', 'slug', 'icon'];

    public function healthTips()
    {
        return $this->hasMany(HealthTip::class);
    }
}
