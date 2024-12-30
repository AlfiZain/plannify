<?php

namespace App\Enums;

enum WorkspaceVisibillity: string
{
    case PUBLIC = 'public';
    case PRIVATE = 'private';

    public static function option(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values()->toArray();
    }
}
