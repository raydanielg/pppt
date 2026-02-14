<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsComment extends Model
{
    protected $fillable = ['news_id', 'user_id', 'parent_id', 'content'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function news()
    {
        return $this->belongsTo(News::class);
    }

    public function replies()
    {
        return $this->hasMany(NewsComment::class, 'parent_id')->with('user', 'replies');
    }

    public function parent()
    {
        return $this->belongsTo(NewsComment::class, 'parent_id');
    }
}
