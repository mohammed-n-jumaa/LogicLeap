<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\RegisterUserRequest;  
use Illuminate\Support\Facades\Hash;
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
                $token = $user->createToken('auth-token')->plainTextToken;
                
                return response()->json([
                    'user' => $user,
                    'token' => $token
                ], 200);
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

    public function register(RegisterUserRequest $request)
    {
        try {
            $validated = $request->validated();
    
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'password' => Hash::make($validated['password']),
            ]);
    
            // Optionally create and return token
            $token = $user->createToken('auth-token')->plainTextToken;
    
            return response()->json([
                'message' => 'User registered successfully!',
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Registration error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    
    public function validateRegister(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20|unique:users',
            'password' => 'nullable|string|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        return response()->json(['message' => 'Validation passed.']);
    }
}