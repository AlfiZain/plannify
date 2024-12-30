<?php

namespace App\Models;

use App\Enums\WorkspaceVisibillity;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
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
