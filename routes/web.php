<?php

use App\Livewire\MapSubmission;
use Illuminate\Support\Facades\Route;
use App\Livewire\FindByLocation;
use App\Livewire\WizardMap;
use App\Livewire\LocationActions;
use App\Livewire\LiveLocation;
use App\Http\Controllers\MapSubmissionResultsController;


Route::get('/', function () {
    return view('welcome');
});
Route::get('/find', FindByLocation::class);
Route::get('/map-submission', MapSubmission::class);
Route::get('/map-submission-search-results', [MapSubmissionResultsController::class, 'index']);

Route::get('/wizard-map', WizardMap::class);
Route::get('/location-actions', LocationActions::class);
Route::get('/live-location', LiveLocation::class);
