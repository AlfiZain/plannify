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

    public function edit(Workspace $workspace, Card $card): Response
    {
        return inertia('Cards/Edit', [
            'card' => fn() => new CardSingleResource($card->load(['members', 'user', 'tasks', 'attachments'])),
            'page_settings' => [
                'title' => 'Edit Card',
                'subtitle' => 'Fill out this form to edit card',
                'method' => 'PUT',
                'action' => route('cards.update', [$workspace, $card])
            ],
            'statuses' => CardStatus::option(),
            'priorities' => CardPriority::option(),
            'workspace' => fn() => $workspace->only('slug'),
        ]);
    }

    public function update(Workspace $workspace, Card $card, CardRequest $request): RedirectResponse
    {
        $last_status = $card->status->value;

        $card->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $status = $request->status,
            'priority' => $request->priority,
            'order' => $this->ordering($workspace, $status),
        ]);

        $this->adjustOrdering($workspace, $last_status);

        flashMessage('Successfully updated card information');
        return back();
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

    public function adjustOrdering(Workspace $workspace, string $status)
    {
        $order = 1;
        return Card::where('workspace_id', $workspace->id)
            ->where('status', $status)
            ->orderBy('order')
            ->get()
            ->each(function ($card) use (&$order) {
                $card->order = $order;
                $card->save();
                $order++;
            });
    }
}
