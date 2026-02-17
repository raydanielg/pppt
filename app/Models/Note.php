<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\LibraryCategory;

class Note extends Model
{
    protected $appends = [
        'file_download_url',
    ];

    protected $fillable = [
        'title',
        'author',
        'description',
        'file_url',
        'library_category_id',
        'category',
        'file_size',
        'uploaded_by',
    ];

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function libraryCategory()
    {
        return $this->belongsTo(LibraryCategory::class, 'library_category_id');
    }

    public function getFileDownloadUrlAttribute(): ?string
    {
        $raw = (string) ($this->getRawOriginal('file_url') ?? '');
        if ($raw === '') {
            return null;
        }

        if (str_starts_with($raw, 'http://') || str_starts_with($raw, 'https://')) {
            return $raw;
        }

        return '/storage/'.ltrim($raw, '/');
    }
}
