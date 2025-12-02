<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PublicTaskController;
use App\Http\Controllers\TaskController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Auth (guest)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Guest / Public endpoint (tanpa auth)
Route::get('/public/tasks', [PublicTaskController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    // Auth (butuh token)
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return response()->json([
            'message' => 'Authenticated user',
            'success' => true,
            'data'    => new UserResource($request->user()),
        ]);
    });

    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::get('/tasks/{id}', [TaskController::class, 'show']);
    Route::put('/tasks/{id}', [TaskController::class, 'update']);
    Route::patch('/tasks/{id}', [TaskController::class, 'update']);
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

    Route::patch('/tasks/{id}/done', [TaskController::class, 'markDone']);
});
