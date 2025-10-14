<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ErrorController extends Controller
{
    /**
     * Display 404 error page
     */
    public function notFound(): Response
    {
        return Inertia::render('errors/404');
    }

    /**
     * Display 500 error page
     */
    public function serverError(): Response
    {
        return Inertia::render('errors/500');
    }

    /**
     * Display 403 error page
     */
    public function forbidden(): Response
    {
        return Inertia::render('errors/403');
    }

    /**
     * Display 503 error page
     */
    public function serviceUnavailable(): Response
    {
        return Inertia::render('errors/503');
    }

    /**
     * Display generic error page
     */
    public function generic(int $status = 500, string $title = 'Terjadi Kesalahan', string $description = 'Maaf, terjadi kesalahan yang tidak terduga.'): Response
    {
        return Inertia::render('errors/generic', [
            'status' => $status,
            'title' => $title,
            'description' => $description,
        ]);
    }
}
