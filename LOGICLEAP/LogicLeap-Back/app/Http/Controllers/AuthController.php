<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);
    
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                
                // Check if the user role is 'user'
                if ($user->role === 'user') {
                    $token = $user->createToken('auth-token')->plainTextToken;
                    
                    return response()->json([
                        'user' => $user,
                        'token' => $token
                    ], 200);
                } else {
                    return response()->json([
                        'message' => 'You are not authorized to access this page.'
                    ], 403);
                }
            }
    
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred during login'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        // Check if the user is authenticated
        if ($request->user()) {
            // Revoke the current access token
            $request->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Logged out successfully'], 200);
        }

        return response()->json(['message' => 'No authenticated user'], 401);
    }
}