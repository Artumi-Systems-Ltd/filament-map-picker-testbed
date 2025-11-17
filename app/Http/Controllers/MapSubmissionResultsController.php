<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;

class MapSubmissionResultsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        dd($request->all());
    }
}
