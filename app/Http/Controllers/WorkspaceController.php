<?php

namespace App\Http\Controllers;

use App\Enums\WorkspaceVisibillity;
use App\Http\Requests\WorkspaceRequest;
use App\Http\Resources\WorkspaceResource;
use App\Models\User;
use App\Models\Workspace;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class WorkspaceController extends Controller
{
    use HasFile;
    public function create(): Response
    {
        return inertia(component: 'Workspaces/Create', props: [
            'page_settings' => [
                'title' => 'Create Workspace',
                'subtitle' => 'Fill out this form to add a new workspace',
                'method' => 'POST',
                'action' => route('workspaces.store'),
            ],
            'visibilities' => WorkspaceVisibillity::option(),
        ]);
    }

    public function store(WorkspaceRequest $request): RedirectResponse
    {
        $workspace = $request->user()->workspaces()->create(
            [
                'name' => $name = $request->input('name'),
                'slug' => str()->slug($name . str()->uuid(10)),
                'cover' => $this->upload_file($request, 'cover', 'workspaces/cover'),
                'logo' => $this->upload_file($request, 'logo', 'workspaces/logo'),
                'visibility' => $request->visibility,
            ]
        );

        $workspace->members()->create([
            'user_id' => $request->user()->id,
            'role' => $workspace->user_id === $request->user()->id ? 'Owner' : 'Member',
        ]);

        flashMessage('Workspace information saved successfully');

        return to_route('workspaces.show', $workspace);
    }

    public function show(Workspace $workspace): Response
    {
        return inertia(component: 'Workspaces/Show', props: [
            'workspace' => fn() => new WorkspaceResource($workspace),
        ]);
    }

    public function edit(Workspace $workspace): Response
    {
        return inertia(component: 'Workspaces/Setting', props: [
            'workspace' => fn() => new WorkspaceResource($workspace->load('members')),
            'page_settings' => [
                'title' => 'Edit Workspace',
                'subtitle' => 'Fill out this form to edit workspace',
                'method' => 'PUT',
                'action' => route('workspaces.update', $workspace),
            ],
            'visibilities' => WorkspaceVisibillity::option(),
        ]);
    }

    public function update(Workspace $workspace, WorkspaceRequest $request): RedirectResponse
    {
        $workspace->update([
            'name' => $name = $request->input('name'),
            'slug' => str()->slug($name . str()->uuid(10)),
            'cover' => $request->hasFile('cover') ? $this->upload_file($request, 'cover', 'workspaces/cover') : $workspace->cover,
            'logo' => $request->hasFile('logo') ? $this->upload_file($request, 'logo', 'workspaces/logo') : $workspace->logo,
            'visibility' => $request->visibility,
        ]);

        flashMessage('Succesfully update workspace');

        return to_route('workspaces.show', $workspace);
    }

    public function member_store(Workspace $workspace, Request $request): RedirectResponse
    {
        $request->validate([
            'email' => [
                'required',
                'email',
                'string',
            ],
        ]);

        $user = User::query()->where('email', $request->email)->first();
        if (!$user) {
            flashMessage('Unregistered user', 'error');
            return back();
        }

        if ($workspace->members()->where('user_id', $user->id)->exists()) {
            flashMessage('User is already a member of this workspace', 'error');
            return back();
        }

        $workspace->members()->create([
            'user_id' => $user->id,
            'role' => 'Member',
        ]);

        flashMessage('Member succesfully invited');
        return back();
    }
}
