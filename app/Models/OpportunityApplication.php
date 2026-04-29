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
        'payment_status',
        'payment_reference',
        'paid_at',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
    ];

    public function hasPaid(): bool
    {
        return $this->payment_status === 'completed' && $this->paid_at !== null;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function opportunity(): BelongsTo
    {
        return $this->belongsTo(Opportunity::class);
    }
}
