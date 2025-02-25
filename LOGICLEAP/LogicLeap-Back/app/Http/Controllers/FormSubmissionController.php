<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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
    
    // Add new submission to the array using user ID or submission ID as key
    $userId = isset($request->values['user_id']) ? $request->values['user_id'] : $submissionId;
    $existingData[$userId] = $submissionData;
    
    // Save all submissions back to the file
    Storage::put($filename, json_encode($existingData, JSON_PRETTY_PRINT));
    
    return response()->json([
        'success' => true,
        'message' => 'Form submitted successfully',
        'submission_id' => $submissionId,
        'user_id' => $userId
    ], 201);
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