<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function index()
    {
        return response()->json(Registration::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'program_id' => 'required|exists:programs,id',
            'form_id' => 'nullable|exists:forms,id',
            'registration_date' => 'required|date',
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $registration = Registration::create($validated);

        return response()->json($registration, 201);
    }

    public function show($id)
    {
        $registration = Registration::find($id);
        if (!$registration) {
            return response()->json(['message' => 'Registration not found'], 404);
        }
        return response()->json($registration, 200);
    }

    public function update(Request $request, $id)
    {
        $registration = Registration::find($id);
        if (!$registration) {
            return response()->json(['message' => 'Registration not found'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'exists:users,id',
            'program_id' => 'exists:programs,id',
            'form_id' => 'nullable|exists:forms,id',
            'registration_date' => 'date',
            'status' => 'in:pending,confirmed,cancelled',
        ]);

        $registration->update($validated);

        return response()->json($registration, 200);
    }

    public function destroy($id)
    {
        $registration = Registration::find($id);
        if (!$registration) {
            return response()->json(['message' => 'Registration not found'], 404);
        }

        $registration->delete();

        return response()->json(['message' => 'Registration deleted successfully'], 200);
    }
}