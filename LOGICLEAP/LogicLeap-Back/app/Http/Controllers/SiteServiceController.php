<?php

namespace App\Http\Controllers;

use App\Models\SiteService;
use Illuminate\Http\Request;

class SiteServiceController extends Controller
{
    
    public function index()
    {
        $services = SiteService::with('category')->whereNull('deleted_at')->get();
        return response()->json($services);
    }
    

    
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|integer',
            'price' => 'required|string',
            'status' => 'required|string|in:active,inactive',
        ]);

        
        $service = SiteService::create($validated);

       
        return response()->json($service, 201);
    }

    
    public function update(Request $request, string $id)
    {
       
        $service = SiteService::findOrFail($id);

        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|integer',
            'price' => 'required|string',
            'status' => 'required|string|in:active,inactive',
        ]);

        
        $service->update($validated);

        return response()->json($service);
    }

   
    public function softDelete(string $id)
    {
       
        $service = SiteService::findOrFail($id);

        
        $service->delete();

        return response()->json(['message' => 'Service soft deleted successfully']);
    }
}
