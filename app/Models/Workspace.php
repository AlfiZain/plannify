<?php

namespace App\Models;

use App\Enums\WorkspaceVisibillity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'cover',
        'logo',
        'visibility',
    ];

    protected function cast(): array
    {
        return [
            'visibility' => WorkspaceVisibillity::class,
        ];
    }
}
