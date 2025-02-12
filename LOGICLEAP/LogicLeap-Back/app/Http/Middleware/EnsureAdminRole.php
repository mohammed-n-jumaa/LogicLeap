<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureAdminRole
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && (Auth::user()->role === 'admin' || Auth::user()->role === 'super_admin')) {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}