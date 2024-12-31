<?php

namespace App\Enums;

enum CardPriority: string
{
    case URGENT = 'urgent';
    case High = 'High';
    case MEDIUM = 'Medium';
    case LOW = 'Low';
    case UNKNOWN = 'Unknown';

    public static function option(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values()->toArray();
    }
}
