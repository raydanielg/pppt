<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OpportunityApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'opportunity_id',
        'advert_name',
        'cover_letter_path',
        'cover_letter_original_name',
        'cover_letter_mime',
        'cover_letter_size',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
