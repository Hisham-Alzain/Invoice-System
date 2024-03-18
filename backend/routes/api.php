<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ForgetPasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        "email"=>$request->user()->email
        ]
    );   
});
Route::post('/password/reset-link', [ForgetPasswordController::class, 'forgotPassword']);
Route::post('/password/reset', [ForgetPasswordController::class, 'reset']);
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('items',ItemController::class);
    Route::apiResource('invoices',InvoiceController::class);
    Route::apiResource('clients',ClientController::class);
});

