<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        //
    }

    /**
     * Convert an exception into an HTTP response.
     */
    public function render($request, Throwable $e)
    {
        // Khusus untuk route API, kita pakai format JSON standar sendiri
        if ($request->is('api/*')) {

            // 422 - Validasi
            if ($e instanceof ValidationException) {
                return response()->json([
                    'message' => 'Validation failed',
                    'success' => false,
                    'data'    => null,
                    'errors'  => $e->errors(),
                ], 422);
            }

            // 401 - Belum login / token invalid
            if ($e instanceof AuthenticationException) {
                return response()->json([
                    'message' => 'Unauthenticated.',
                    'success' => false,
                    'data'    => null,
                    'errors'  => null,
                ], 401);
            }

            // 403 - Tidak punya hak akses
            if ($e instanceof AuthorizationException) {
                return response()->json([
                    'message' => 'Forbidden.',
                    'success' => false,
                    'data'    => null,
                    'errors'  => null,
                ], 403);
            }

            // 404 - Data tidak ditemukan / route tidak ada
            if ($e instanceof ModelNotFoundException || $e instanceof NotFoundHttpException) {
                return response()->json([
                    'message' => 'Resource not found.',
                    'success' => false,
                    'data'    => null,
                    'errors'  => null,
                ], 404);
            }

            // 500 - Error lain (server error)
            return response()->json([
                'message' => config('app.debug')
                    ? ($e->getMessage() ?: 'Server error.')
                    : 'Server error.',
                'success' => false,
                'data'    => null,
                'errors'  => config('app.debug') ? [
                    'exception' => class_basename($e),
                ] : null,
            ], 500);
        }

        // Untuk route non-API (web), pakai handler default Laravel
        return parent::render($request, $e);
    }
}
