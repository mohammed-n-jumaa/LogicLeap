<?php
namespace App\Http\Controllers;

use App\Models\Registration; 
use App\Models\Program; 
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // Fetch the latest 5 registrations
    public function latestRegistrations()
    {
        try {
            $registrations = Registration::latest()->take(5)->get();
            return response()->json($registrations);
        } catch (\Exception $e) {

            \Log::error('Error fetching latest registrations: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching data.'], 500);
        }
    }

    // Fetch the most requested programs (top 3)
   // Fetch the most requested programs (top 3)
public function mostRequested()
{
    try {
        // Get total registration count
        $totalCount = Registration::count();
        
        // Get programs with registration counts
        $programs = Program::withCount('registrations')
            ->orderBy('registrations_count', 'desc')
            ->take(3)
            ->get();
            
        // Transform the data to match what the React component expects
        $result = $programs->map(function($program) use ($totalCount) {
            // Calculate percentage
            $percentage = $totalCount > 0 
                ? round(($program->registrations_count / $totalCount) * 100) 
                : 0;
                
            return [
                'id' => $program->id,
                'title' => $program->title,
                'requestCount' => $percentage
            ];
        });
        
        return response()->json($result);
    } catch (\Exception $e) {
        \Log::error('Error fetching most requested programs: ' . $e->getMessage());
        return response()->json(['error' => 'An error occurred while fetching data.'], 500);
    }
}

    // Fetch the latest 3 courses
    public function getCourses()
    {
        try {
            $courses = Program::latest()->take(3)->get();
            return response()->json($courses);
        } catch (\Exception $e) {
            \Log::error('Error fetching latest courses: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching data.'], 500);
        }
    }
}