<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    protected $fillable = ['gallery_category_id', 'title', 'image_url', 'description'];

    public function getImageUrlAttribute($value)
    {
        $value = (string) $value;

        if ($value === '') {
            return $value;
        }

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return $value;
        }

        return '/storage/'.ltrim($value, '/');
    }

    public function category()
    {
        return $this->belongsTo(GalleryCategory::class, 'gallery_category_id');
    }
}
