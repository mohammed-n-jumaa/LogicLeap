<?php
// app/Http/Controllers/ServiceRequestController.php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use App\Models\User;
use App\Models\SiteService;
use Illuminate\Http\Request;

class ServiceRequestController extends Controller
{
    /**
     * Display a listing of the service requests.
     */

public function index()
{
    $requests = ServiceRequest::with('user', 'siteService')->get();  // تأكد من أنك تستخدم with لجلب العلاقات
    
    return response()->json($requests);  // إرجاع البيانات مع العلاقات المرتبطة
}

    
    
    

    /**
     * Store a newly created service request in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'site_service_id' => 'required|exists:site_services,id',
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'service_type' => 'required|string',
        ]);

        $serviceRequest = ServiceRequest::create($validated);

        return response()->json($serviceRequest, 201);
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
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'service_type' => 'required|string',
            'status' => 'required|string',
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
