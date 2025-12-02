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
    public function index(Request $request): JsonResponse
    {
        $query = Task::where('user_id', $request->user()->id);

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $tasks = $query->orderByDesc('created_at')->get();

        return response()->json([
            'message' => 'List tasks',
            'success' => true,
            'data'    => TaskResource::collection($tasks),
        ]);
    }

    public function store(StoreTaskRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        if (! isset($data['status'])) {
            $data['status'] = 'pending';
        }

        $task = Task::create($data);

        return response()->json([
            'message' => 'Task created',
            'success' => true,
            'data'    => new TaskResource($task),
        ], 201);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $task = Task::where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json([
            'message' => 'Task detail',
            'success' => true,
            'data'    => new TaskResource($task),
        ]);
    }

    public function update(UpdateTaskRequest $request, int $id): JsonResponse
    {
        $task = Task::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $task->update($request->validated());

        return response()->json([
            'message' => 'Task updated',
            'success' => true,
            'data'    => new TaskResource($task),
        ]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $task = Task::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $task->delete();

        return response()->json([
            'message' => 'Task deleted',
            'success' => true,
            'data'    => null,
        ]);
    }

    public function markDone(Request $request, int $id): JsonResponse
    {
        $task = Task::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $task->status = 'done';
        $task->save();

        return response()->json([
            'message' => 'Task marked as done',
            'success' => true,
            'data'    => new TaskResource($task),
        ]);
    }
}
