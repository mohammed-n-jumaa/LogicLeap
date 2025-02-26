<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use App\Models\User;
use App\Models\SiteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ServiceRequestController extends Controller
{
    /**
     * Display a listing of the service requests.
     */
    public function index()
    {
        $requests = ServiceRequest::with('user', 'siteService')->get();
        
        return response()->json($requests);
    }
    
    /**
     * Store a newly created service request in storage.
     */
    public function store(Request $request)
{
    try {
        // Log the incoming request data for debugging
        Log::info('Service request data:', $request->all());
        
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191',
            'phone' => 'required|string|max:20',
            'details' => 'required|string',
            'service_id' => 'required|exists:site_services,id',
        ]);
        
        // Get user_id from request if available, otherwise use default (1)
        $user_id = $request->user_id ?? 1;
        
        // Create the service request
        $serviceRequest = ServiceRequest::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'details' => $validated['details'],
            'service_id' => $validated['service_id'],
            'status' => 'pending', // Default status
            'user_id' => $user_id, // Use provided user_id or default to 1
        ]);
        
        Log::info('Service request created:', ['id' => $serviceRequest->id]);
        
        return response()->json($serviceRequest, 201);
    } catch (\Exception $e) {
        // Log the error
        Log::error('Error creating service request: ' . $e->getMessage(), [
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString()
        ]);
        
        // Return error response
        return response()->json([
            'message' => 'Error creating service request',
            'error' => $e->getMessage()
        ], 500);
    }
}
    
    /**
     * Display the specified service request.
     */
    public function show($id)
    {
        $serviceRequest = ServiceRequest::with('user', 'siteService')->findOrFail($id);
        
        return response()->json($serviceRequest);
    }
    
    /**
     * Update the specified service request in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email',
            'phone' => 'sometimes|string',
            'details' => 'sometimes|required|string',
            'service_id' => 'sometimes|exists:site_services,id',
            'status' => 'sometimes|required|string',
        ]);
        
        $serviceRequest = ServiceRequest::findOrFail($id);
        $serviceRequest->update($validated);
        
        return response()->json($serviceRequest);
    }
    
    /**
     * Soft delete the specified service request.
     */
    public function destroy($id)
    {
        $serviceRequest = ServiceRequest::findOrFail($id);
        
        $serviceRequest->delete();
        
        return response()->json(['message' => 'Service request soft deleted successfully']);
    }
}