<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LogoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Sudah dicek lewat middleware auth:sanctum
        return true;
    }

    public function rules(): array
    {
        // Logout tidak butuh input apa-apa
        return [];
    }
}
