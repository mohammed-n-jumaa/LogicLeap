<?php
namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;

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
            'end_date' => 'required|date',
            'duration' => 'required|integer',
            'cost' => 'required|numeric',
            'price' => 'required|string',
            'status' => 'required|string',
            'mode' => 'required|string',
            'zoom_link' => 'nullable|url',
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
    
        $path = $request->file('image')->store('programs', 'public');
    
        $program = Program::create([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'duration' => $request->duration,
            'cost' => $request->cost,
            'price' => $request->price,
            'status' => $request->status,
            'mode' => $request->mode,
            'zoom_link' => $request->zoom_link,
            'location' => $request->location,
            'image' => $path,
        ]);
    
        return response()->json(['message' => 'Program created successfully', 'program' => $program], 201);
    }

    public function show(Program $program)
    {
        return $program->load('category');
    }

    public function update(Request $request, Program $program)
{
    // تحقق من وجود البرنامج
    if (!$program) {
        return response()->json(['message' => 'Program not found'], 404);
    }

    // التحقق من صحة البيانات المدخلة
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'category_id' => 'required|integer',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'duration' => 'required|integer',
        'cost' => 'required|numeric',
        'price' => 'required|string',
        'status' => 'required|string',
        'mode' => 'required|string',
        'zoom_link' => 'nullable|url',
        'location' => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    // تحديث الحقول العامة
    $program->fill($request->only('title', 'description', 'category_id', 'start_date', 'end_date', 'duration', 'cost', 'price', 'status', 'mode', 'zoom_link', 'location'));

    // إذا تم تحميل صورة جديدة، قم بتحديثها
    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('programs', 'public');
        $program->image = $path; // تحديث مسار الصورة
    }

    // حفظ التغييرات
    $program->save();

    return response()->json(['message' => 'Program updated successfully', 'program' => $program]);
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

        $program->forceDelete();
        return response()->json(['message' => 'Program permanently deleted']);
    }
}