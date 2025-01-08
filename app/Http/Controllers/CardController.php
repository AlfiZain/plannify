<?php

namespace App\Http\Controllers;

use App\Enums\CardPriority;
use App\Enums\CardStatus;
use App\Http\Requests\CardRequest;
use App\Http\Resources\CardSingleResource;
use App\Models\Card;
use App\Models\Workspace;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CardController extends Controller
{
    public function create(Workspace $workspace): Response
    {
        return Inertia('Cards/Create', [
            'page_settings' => [
                'title' => 'Create Card',
                'subtitle' => 'Fill out this form to add a new card',
                'method' => 'POST',
                'action' => route('cards.store', $workspace),
            ],
            'status' => request()->status ?? 'To Do',
            'statuses' => CardStatus::option(),
            'priority' => request()->priority ?? CardPriority::UNKNOWN->value,
            'priorities' => CardPriority::option(),
            'workspace' => fn() => $workspace->only('slug'),
        ]);
    }

    public function store(Workspace $workspace, CardRequest $request): RedirectResponse
    {
        $card = $request->user()->cards()->create([
            'workspace_id' => $workspace->id,
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $status = $request->status,
            'order' => $this->ordering($workspace, $status),
            'priority' => $request->priority,
        ]);

        flashMessage('Card information saved successfully');

        return to_route('workspaces.show', [$workspace]);
    }

    public function ordering(Workspace $workspace, string $status): int
    {
        $lastCard = Card::query()
            ->where('workspace_id', $workspace->id)
            ->where('status', $status)
            ->orderByDesc('created_at')
            ->first();

        if (!$lastCard) return 1;
        return $lastCard->order + 1;
    }

    public function show(Workspace $workspace, Card $card): Response
    {
        return inertia('Cards/Show', [
            'card' => fn() => new CardSingleResource($card->load(['members', 'user', 'tasks', 'attachments'])),
            'page_settings' => [
                'title' => 'Detail Card',
                'subtitle' => 'Detail Card Information',
            ],
        ]);
    }
}
