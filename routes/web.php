<?php

use App\Livewire\MapSubmission;
use Illuminate\Support\Facades\Route;
use App\Livewire\FindByLocation;
use App\Http\Controllers\MapSubmissionResultsController;


Route::get('/', function () {
    return view('welcome');
});
Route::get('/find', FindByLocation::class);
Route::get('/map-submission', MapSubmission::class);
Route::get('/map-submission-search-results', [MapSubmissionResultsController::class, 'index']);
