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

// User Route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Programs Routes
Route::prefix('programs')->group(function () {
    Route::get('/', [ProgramController::class, 'index']);
    Route::post('/', [ProgramController::class, 'store']);
    Route::put('/{id}', [ProgramController::class, 'update']);
    Route::delete('/{id}', [ProgramController::class, 'softDelete']);
});

// Users Routes
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'softDelete']);
});

// Categories Routes
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'softDelete']);
});

// Registrations Routes
Route::prefix('registrations')->group(function () {
    Route::get('/', [RegistrationController::class, 'index']);
    Route::post('/', [RegistrationController::class, 'store']);
    Route::put('/{id}', [RegistrationController::class, 'update']);
    Route::delete('/{id}', [RegistrationController::class, 'softDelete']);
});

// Service Requests Routes
Route::prefix('service-requests')->group(function () {
    Route::get('/', [ServiceRequestController::class, 'index']);
    Route::post('/', [ServiceRequestController::class, 'store']);
    Route::put('/{id}', [ServiceRequestController::class, 'update']);
    Route::delete('/{id}', [ServiceRequestController::class, 'softDelete']);
});

// Sliders Routes
Route::prefix('sliders')->group(function () {
    Route::get('/', [SliderController::class, 'index']);
    Route::post('/', [SliderController::class, 'store']);
    Route::put('/{id}', [SliderController::class, 'update']);
    Route::delete('/{id}', [SliderController::class, 'softDelete']);
});

// Partners Routes
Route::prefix('partners')->group(function () {
    Route::get('/', [PartnerController::class, 'index']);
    Route::post('/', [PartnerController::class, 'store']);
    Route::put('/{id}', [PartnerController::class, 'update']);
    Route::delete('/{id}', [PartnerController::class, 'softDelete']);
});

// Contacts Routes
Route::prefix('contacts')->group(function () {
    Route::get('/', [ContactController::class, 'index']);
    Route::post('/', [ContactController::class, 'store']);
    Route::put('/{id}', [ContactController::class, 'update']);
    Route::delete('/{id}', [ContactController::class, 'softDelete']);
});

// Forms Routes
Route::prefix('forms')->group(function () {
    Route::get('/', [FormController::class, 'index']);
    Route::post('/', [FormController::class, 'store']);
    Route::put('/{id}', [FormController::class, 'update']);
    Route::delete('/{id}', [FormController::class, 'softDelete']);
});

// Site Services Routes
Route::prefix('site-services')->group(function () {
    Route::get('/', [SiteServiceController::class, 'index']);
    Route::post('/', [SiteServiceController::class, 'store']);
    Route::put('/{id}', [SiteServiceController::class, 'update']);
    Route::delete('/{id}', [SiteServiceController::class, 'softDelete']);
});

// Success Stories Routes
Route::prefix('success-stories')->group(function () {
    Route::get('/', [SuccessStoryController::class, 'index']);
    Route::post('/', [SuccessStoryController::class, 'store']);
    Route::put('/{id}', [SuccessStoryController::class, 'update']);
    Route::delete('/{id}', [SuccessStoryController::class, 'softDelete']);
});

// FAQs Routes
Route::prefix('faqs')->group(function () {
    Route::get('/', [FAQController::class, 'index']);
    Route::post('/', [FAQController::class, 'store']);
    Route::put('/{id}', [FAQController::class, 'update']);
    Route::delete('/{id}', [FAQController::class, 'softDelete']);
});
