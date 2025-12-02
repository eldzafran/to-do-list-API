<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class PublicTaskController extends Controller
{
    public function index(): JsonResponse
    {
        $tasks = Task::where('is_public', true)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'message' => 'Public tasks list',
            'success' => true,
            'data'    => TaskResource::collection($tasks),
        ]);
    }
}
