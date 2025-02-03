<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\SiteServiceController;
use App\Http\Controllers\SuccessStoryController;
use App\Http\Controllers\FAQController;
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
    return $request->user();
});
Route::apiResource('users', UserController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('programs', ProgramController::class);
Route::apiResource('registrations', RegistrationController::class);
Route::apiResource('service-requests', ServiceRequestController::class);
Route::apiResource('sliders', SliderController::class);
Route::apiResource('partners', PartnerController::class);
Route::apiResource('contacts', ContactController::class);
Route::apiResource('forms', FormController::class);
Route::apiResource('site-services', SiteServiceController::class);
Route::apiResource('success-stories', SuccessStoryController::class);
Route::apiResource('faq', FAQController::class);