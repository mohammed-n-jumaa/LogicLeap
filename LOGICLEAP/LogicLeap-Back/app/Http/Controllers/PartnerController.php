<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PartnerController extends Controller
{
    public function index()
    {
        return Partner::whereNull('deleted_at')->get();
    }

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'logo' => 'required|image',
        'website' => 'required|url',
    ]);
    
    // Store in the public disk directly
    $path = $request->file('logo')->store('partners', 'public');
    
    $partner = Partner::create([
        'name' => $request->name,
        'logo' => $path, // Store only the relative path
        'website' => $request->website,
    ]);
    
    return response()->json($partner, 201);
}


public function update(Request $request, $id)
{
    $partner = Partner::findOrFail($id);
    
    $rules = [
        'name' => 'required|string|max:255',
        'website' => 'required|url',
        'logo' => 'nullable|image'
    ];
    
    $validator = validator($request->all(), $rules);
    
    if ($validator->fails()) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422);
    }
    
    try {
        if ($request->hasFile('logo')) {
            // حذف الشعار القديم
            if ($partner->logo && Storage::disk('public')->exists($partner->logo)) {
                Storage::disk('public')->delete($partner->logo);
            }
            // تخزين الشعار الجديد
            $path = $request->file('logo')->store('partners', 'public');
            $partner->logo = $path;
        }
        
        $partner->name = $request->input('name');
        $partner->website = $request->input('website');
        $partner->save();
        
        return response()->json($partner);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to update partner',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function softDelete($id)
    {
        $partner = Partner::findOrFail($id);
        $partner->delete();
        return response()->json(null, 204);
    }
}