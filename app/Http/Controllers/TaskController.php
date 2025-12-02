<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // GET /api/tasks?status=pending/done
    public function index(Request $request): JsonResponse
    {
        $query = Task::where('user_id', $request->user()->id);

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        // PAGINATION 10 per halaman
        $tasks = $query->orderByDesc('created_at')->paginate(10);

        return response()->json([
            'message' => 'List tasks',
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

    // POST /api/tasks
    public function store(StoreTaskRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $data['status'] ??= 'pending';

        $task = Task::create($data);

        return response()->json([
            'message' => 'Task created',
            'success' => true,
            'data'    => new TaskResource($task),
        ], 201);
    }

    // GET /api/tasks/{id}
    public function show(Request $request, int $id): JsonResponse
    {
        $task = Task::where('user_id', $request->user()->id)->findOrFail($id);

        return response()->json([
            'message' => 'Task detail',
            'success' => true,
            'data'    => new TaskResource($task),
        ]);
    }

    // PUT/PATCH /api/tasks/{id}
    public function update(UpdateTaskRequest $request, int $id): JsonResponse
    {
        $task = Task::where('user_id', $request->user()->id)->findOrFail($id);

        $data = $request->validated();
        $task->update($data);

        return response()->json([
            'message' => 'Task updated',
            'success' => true,
            'data'    => new TaskResource($task),
        ]);
    }

    // DELETE /api/tasks/{id}
    public function destroy(Request $request, int $id): JsonResponse
    {
        $task = Task::where('user_id', $request->user()->id)->findOrFail($id);
        $task->delete();

        return response()->json([
            'message' => 'Task deleted',
            'success' => true,
            'data'    => null,
        ]);
    }

    // PATCH /api/tasks/{id}/done
    public function markDone(Request $request, int $id): JsonResponse
    {
        $task = Task::where('user_id', $request->user()->id)->findOrFail($id);
        $task->status = 'done';
        $task->save();

        return response()->json([
            'message' => 'Task marked as done',
            'success' => true,
            'data'    => new TaskResource($task),
        ]);
    }
}
