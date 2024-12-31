<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Member extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'role',
        'memberable_id',
        'memberable_type',
    ];

    protected $with = ['user'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function memberable(): MorphTo
    {
        return $this->morphTo();
    }
}
