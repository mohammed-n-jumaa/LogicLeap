<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use App\Models\User; 
use App\Models\Program; 
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = Registration::with(['user', 'program'])->get();
        return response()->json($registrations);
    }

    public function update(Request $request, $id)
    {
        $registration = Registration::findOrFail($id);
        $registration->status = $request->status; 
        $registration->save();

        return response()->json($registration);
    }

    public function softDelete($id)
    {
        $slider = SuccessStory::find($id);
    
        if (!$slider) {
            return response()->json(['message' => 'SuccessStory not found'], 404);
        }
    
        $slider->delete(); 
        return response()->json(['message' => 'SuccessStory deleted successfully']);
    }
}