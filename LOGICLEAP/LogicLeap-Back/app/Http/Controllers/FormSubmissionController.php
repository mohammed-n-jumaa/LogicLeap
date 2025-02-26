<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Registration;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class FormSubmissionController extends Controller
{
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'form_id' => 'required',
            'program_id' => 'required',
            'values' => 'required|array'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        // Generate a unique submission ID
        $submissionId = (string) Str::uuid();
        
        // Prepare submission data
        $submissionData = [
            'id' => $submissionId,
            'form_id' => $request->form_id,
            'program_id' => $request->program_id,
            'values' => $request->values,
            'submitted_at' => now()->toIso8601String(),
            'ip_address' => $request->ip()
        ];
        
        // Create a single submissions file or open it if exists
        $filename = "all_submissions.json";
        
        // Check if file exists
        if (Storage::exists($filename)) {
            // Read existing data
            $existingData = json_decode(Storage::get($filename), true);
            if (!is_array($existingData)) {
                $existingData = [];
            }
        } else {
            // Create new array if file doesn't exist
            $existingData = [];
        }
        
        // Add new submission to the array
        $existingData[$submissionId] = $submissionData;
        
        // Save all submissions back to the file
        Storage::put($filename, json_encode($existingData, JSON_PRETTY_PRINT));
        
        // Also save to the registrations table with status 'pending'
        try {
            // Look for user_id in form values
            $userId = null;
            
            // Check if token exists in the request
            if ($request->bearerToken()) {
                try {
                    // Get user from token
                    $user = auth('api')->user(); // or another appropriate guard
                    if ($user) {
                        $userId = $user->id;
                    }
                } catch (\Exception $e) {
                    \Log::error('Token authentication failed: ' . $e->getMessage());
                    // Continue to next authentication method
                }
            }
            
            // If no user from token, check if we have a user_id in values
            if (!$userId && isset($request->values['user_id']) && !empty($request->values['user_id'])) {
                $userId = $request->values['user_id'];
            }
            
            // If no user_id in values, check if user is authenticated in session
            if (!$userId && auth()->check()) {
                $userId = auth()->id();
            }
            
            // If no authentication, check local storage token if provided in request
            if (!$userId && isset($request->values['auth_token']) && !empty($request->values['auth_token'])) {
                try {
                    // Verify and extract user from the token
                    // This depends on your token implementation
                    $tokenUser = User::findByToken($request->values['auth_token']);
                    if ($tokenUser) {
                        $userId = $tokenUser->id;
                    }
                } catch (\Exception $e) {
                    \Log::error('Local storage token validation failed: ' . $e->getMessage());
                }
            }
            
            // If still no user_id, try to find by email from the form
            if (!$userId && isset($request->values['email']) && !empty($request->values['email'])) {
                $user = User::where('email', $request->values['email'])->first();
                if ($user) {
                    $userId = $user->id;
                } else {
                    // Create a new user with the email and other data provided in the form
                    $userData = [
                        'name' => $request->values['name'] ?? ($request->values['first_name'] ? $request->values['first_name'] . ' ' . ($request->values['last_name'] ?? '') : 'New User'),
                        'email' => $request->values['email'],
                        'password' => bcrypt(Str::random(16)),
                        'phone' => $request->values['phone'] ?? 'not-provided'
                    ];
                    
                    $user = User::create($userData);
                    $userId = $user->id;
                }
            }
            
            // If still no user_id, use a default guest user (if available)
            if (!$userId) {
                $guestUser = User::where('email', 'guest@example.com')->first();
                if ($guestUser) {
                    $userId = $guestUser->id;
                } else {
                    // Create a persistent guest user if none exists
                    $guestUser = User::create([
                        'name' => 'Guest User',
                        'email' => 'guest@example.com',
                        'password' => bcrypt(Str::random(32)),
                        'phone' => 'not-provided'
                    ]);
                    $userId = $guestUser->id;
                }
            }
            
            // Ensure we have a valid user_id now
            if (!$userId) {
                throw new \Exception('Unable to determine user ID for registration.');
            }
            
            // Create registration record
            $registration = Registration::create([
                'user_id' => $userId,
                'program_id' => $request->program_id,
                'form_id' => $request->form_id,
                'registration_date' => now(),
                'status' => 'pending', // Default status is pending
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Form submitted successfully',
                'submission_id' => $submissionId,
                'registration_id' => $registration->id
            ], 201);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Registration creation failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Form submission saved but registration failed: ' . $e->getMessage(),
                'submission_id' => $submissionId
            ], 500);
        }
    }
    
public function index()
{
    $filename = "all_submissions.json";
    
    if (!Storage::exists($filename)) {
        return response()->json([]);
    }
    
    $content = Storage::get($filename);
    $submissions = json_decode($content, true);
    
    // Convert to indexed array if we need a list format
    $submissionsList = [];
    foreach ($submissions as $userId => $submission) {
        $submissionsList[] = $submission;
    }
    
    return response()->json($submissionsList);
}

public function show($id)
{
    $filename = "all_submissions.json";
    
    if (!Storage::exists($filename)) {
        return response()->json(['error' => 'Submissions file not found'], 404);
    }
    
    $content = Storage::get($filename);
    $submissions = json_decode($content, true);
    
    // Try to find submission by ID (could be either user ID or submission ID)
    if (isset($submissions[$id])) {
        return response()->json($submissions[$id]);
    }
    
    // If not found by direct key, search through all submissions
    foreach ($submissions as $submission) {
        if ($submission['id'] === $id) {
            return response()->json($submission);
        }
    }
    
    return response()->json(['error' => 'Submission not found'], 404);
}
}