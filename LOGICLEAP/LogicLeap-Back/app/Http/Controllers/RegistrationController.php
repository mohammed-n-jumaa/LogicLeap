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

    public function getUserConfirmedPrograms($userId)
    {
        $registrations = Registration::with('program')
            ->where('user_id', $userId)
            ->where('status', 'confirmed')
            ->get();
    
        $programs = $registrations->map(function ($registration) {
            return [
                'id' => $registration->program->id,
                'name' => $registration->program->name,
                'description' => $registration->program->description,
                'start_date' => $registration->program->start_date,
                'end_date' => $registration->program->end_date,
                'zoom_link' => $registration->program->zoom_link,
                'cost' => $registration->program->cost,
            ];
        });
    
        return response()->json($programs);
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