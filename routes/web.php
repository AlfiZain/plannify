<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware('auth');

Route::controller(WorkspaceController::class)->group(function () {
    Route::get('workspaces/create', 'create')->name('workspaces.create');
    Route::post('workspaces/create', 'store')->name('workspaces.store');
    Route::get('workspaces/p/{workspace:slug}', 'show')->name('workspaces.show');
    Route::get('workspaces/edit/{workspace:slug}', 'edit')->name('workspaces.edit');
    Route::put('workspaces/edit/{workspace:slug}', 'update')->name('workspaces.update');
    Route::delete('workspaces/destroy/{workspace:slug}', 'destroy')->name('workspaces.destroy');
    Route::post('workspaces/member/{workspace:slug}/store', 'member_store')->name('workspaces.member_store');
    Route::delete('workspaces/member/{workspace}/destroy/{member}', 'member_destroy')->name('workspaces.member_destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
