<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProgramController extends Controller
{
    public function index()
    {
        return Program::with('category')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'duration' => 'required|integer|min:1',
            'cost' => 'required_if:price,paid|nullable|numeric|min:0',
            'price' => 'required|in:free,paid',
            'status' => 'required|in:active,inactive',
            'mode' => 'required|in:online,onsite,hybrid',
            'zoom_link' => 'nullable|url',
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'modules' => 'nullable|string',
            'what_youll_learn' => 'nullable|string',
            'program_terms' => 'nullable|string', // التحقق من صحة البيانات الجديدة
            'whatsapp_link' => 'nullable|url' // التحقق من صحة البيانات الجديدة
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('programs', 'public');
        }

        $program = Program::create($data);

        return response()->json([
            'message' => 'Program created successfully', 
            'program' => $program->load('category')
        ], 201);
    }

    public function show(Program $program)
    {
        return $program->load('category');
    }

    public function update(Request $request, Program $program)
    {
        if (!$program) {
            return response()->json(['message' => 'Program not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'duration' => 'required|integer|min:1',
            'cost' => 'required_if:price,paid|nullable|numeric|min:0',
            'price' => 'required|in:free,paid',
            'status' => 'required|in:active,inactive',
            'mode' => 'required|in:online,onsite,hybrid',
            'zoom_link' => 'nullable|url',
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'modules' => 'nullable|string',
            'what_youll_learn' => 'nullable|string',
            'program_terms' => 'nullable|string', 
            'whatsapp_link' => 'nullable|url' 
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($program->image) {
                Storage::disk('public')->delete($program->image);
            }
            
            $data['image'] = $request->file('image')->store('programs', 'public');
        }

        $program->update($data);

        return response()->json([
            'message' => 'Program updated successfully', 
        ]);
    }

    public function softDelete($id)
    {
        $program = Program::find($id);
        
        if (!$program) {
            return response()->json(['message' => 'Program not found'], 404);
        }
        
        $program->delete(); 
        return response()->json(['message' => 'Program deleted successfully']);
    }

    public function forceDelete($id)
    {
        $program = Program::withTrashed()->find($id);

        if (!$program) {
            return response()->json(['message' => 'Program not found'], 404);
        }

        // Delete the program image if it exists
        if ($program->image) {
            Storage::disk('public')->delete($program->image);
        }

        $program->forceDelete();
        return response()->json(['message' => 'Program permanently deleted']);
    }
}