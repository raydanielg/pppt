<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentAttempt extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'source_id',
        'reference',
        'amount',
        'currency',
        'phone_number',
        'status',
        'paid_at',
        'metadata',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
        'metadata' => 'json',
        'amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function opportunity(): BelongsTo
    {
        return $this->belongsTo(Opportunity::class, 'source_id');
    }
}
