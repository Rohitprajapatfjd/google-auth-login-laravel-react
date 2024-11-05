<?php

use App\Http\Controllers\API\GoogleAuthController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::controller(GoogleAuthController::class)->group(function(){
    Route::get('auth/google/redirect','redirect');
    Route::get('auth/google/callback','callback');
});

