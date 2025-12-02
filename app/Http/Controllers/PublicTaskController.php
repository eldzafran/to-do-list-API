<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class PublicTaskController extends Controller
{
    // GET /api/public/tasks
    public function index(): JsonResponse
    {
        $tasks = Task::where('is_public', true)
            ->orderByDesc('created_at')
            ->paginate(10); // PAGINATION 10 per halaman

        return response()->json([
            'message' => 'Public tasks',
            'success' => true,
            'data'    => TaskResource::collection($tasks),
            'meta'    => [
                'current_page' => $tasks->currentPage(),
                'last_page'    => $tasks->lastPage(),
                'per_page'     => $tasks->perPage(),
                'total'        => $tasks->total(),
            ],
        ]);
    }
}
