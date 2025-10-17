<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\PerformanceMonitoringMiddleware;
use App\Http\Middleware\SeoMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            SeoMiddleware::class,
            PerformanceMonitoringMiddleware::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Handle validation errors specifically
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['errors' => $e->errors()], 422);
            }

            // For web requests, let Laravel handle validation errors normally
            // This will redirect back with errors instead of showing 500 page
            return null;
        });

        // Handle 404 errors
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Not Found'], 404);
            }
            return redirect()->route('error.404');
        });

        // Handle 403 errors
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Forbidden'], 403);
            }
            return redirect()->route('error.403');
        });

        // Handle 500 errors (only for non-validation exceptions)
        $exceptions->render(function (\Throwable $e, $request) {
            // Skip validation exceptions as they are handled above
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                return null;
            }

            if ($request->expectsJson()) {
                return response()->json(['message' => 'Internal Server Error'], 500);
            }

            // Log the error
            \Log::error('Unhandled exception: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all(),
                'url' => $request->url(),
            ]);

            return redirect()->route('error.500');
        });
    })->create();
