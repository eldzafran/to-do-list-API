<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'nullable|in:pending,done',
            'due_date'    => 'nullable|date',
            'is_public'   => 'nullable|boolean',
        ];
    }
}
