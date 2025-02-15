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
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;

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

// Authentication Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/me', [UserController::class, 'me'])->middleware('auth:sanctum');
// Public Routes (No Protection)
Route::prefix('programs')->group(function () {
    Route::get('/', [ProgramController::class, 'index']);
    Route::post('/', [ProgramController::class, 'store']);
    Route::get('/{program}', [ProgramController::class, 'show']);
    Route::post('/{program}', [ProgramController::class, 'update']);
    Route::delete('/{id}', [ProgramController::class, 'softDelete']);
    
});
Route::prefix('users')->group(function () {
    Route::put('/{id}', [UserController::class, 'update'])->middleware('auth:sanctum');
});
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
    
});

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
});

Route::prefix('registrations')->group(function () {
    Route::get('/', [RegistrationController::class, 'index']);
    Route::post('/', [RegistrationController::class, 'store']);
    Route::put('/{id}', [RegistrationController::class, 'update']);
    Route::delete('/{id}', [RegistrationController::class, 'softDelete']);
});

Route::prefix('service-requests')->group(function () {
    Route::get('/', [ServiceRequestController::class, 'index']);
    Route::post('/', [ServiceRequestController::class, 'store']);
    Route::put('/{id}', [ServiceRequestController::class, 'update']);
    Route::delete('/{id}', [ServiceRequestController::class, 'destroy']);
});

Route::prefix('sliders')->group(function () {
    Route::get('/', [SliderController::class, 'index']);
    Route::post('/', [SliderController::class, 'store']);
    Route::get('/{id}', [SliderController::class, 'show']);
    Route::put('/{id}', [SliderController::class, 'update']);
    Route::delete('/{id}/soft-delete', [SliderController::class, 'softDelete']);
});

Route::prefix('partners')->group(function () {
    Route::get('/', [PartnerController::class, 'index']);
    Route::post('/', [PartnerController::class, 'store']);
    Route::post('/{id}', [PartnerController::class, 'update']);
    Route::delete('/{id}', [PartnerController::class, 'softDelete']);
});

Route::get('/contacts', [ContactController::class, 'index']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::put('/contacts/{id}', [ContactController::class, 'update']);
Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);

Route::prefix('forms')->group(function () {
    Route::get('/', [FormController::class, 'index']);
    Route::post('/', [FormController::class, 'store']);
    Route::put('/{id}', [FormController::class, 'update']);
    Route::delete('/{id}', [FormController::class, 'softDelete']);
});

Route::prefix('site-services')->group(function () {
    Route::get('/', [SiteServiceController::class, 'index']);
    Route::post('/', [SiteServiceController::class, 'store']);
    Route::put('/{id}', [SiteServiceController::class, 'update']);
    Route::delete('/{id}', [SiteServiceController::class, 'softDelete']);
});

Route::prefix('success-stories')->group(function () {
    Route::get('/', [SuccessStoryController::class, 'index']);
    Route::post('/', [SuccessStoryController::class, 'store']);
    Route::put('/{id}', [SuccessStoryController::class, 'update']);
    Route::delete('/{id}', [SuccessStoryController::class, 'softDelete']);
});

Route::prefix('faqs')->group(function () {
    Route::get('/', [FAQController::class, 'index']);
    Route::post('/', [FAQController::class, 'store']);
    Route::put('/{id}', [FAQController::class, 'update']);
    Route::delete('/{id}', [FAQController::class, 'softDelete']);
});

// Dashboard Routes
Route::get('/latest-registrations', [DashboardController::class, 'latestRegistrations']);
Route::get('/most-requested', [DashboardController::class, 'mostRequested']);
Route::get('/courses', [DashboardController::class, 'getCourses']);
