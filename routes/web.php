<?php

use Illuminate\Support\Facades\Route;
use App\Livewire\FindByLocation;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/find', FindByLocation::class);
