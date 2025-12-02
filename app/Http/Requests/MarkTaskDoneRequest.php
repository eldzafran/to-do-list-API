<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MarkTaskDoneRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Sudah dijaga oleh auth:sanctum dan query user_id di controller
        return true;
    }

    public function rules(): array
    {
        // PATCH /tasks/{id}/done tidak butuh body
        return [];
    }
}
