<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function index()
    {
        return response()->json(Slider::all());
    }

    public function store(Request $request)
    {
        // التحقق من صحة البيانات المدخلة
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'link' => 'required|url',
            'status' => 'required|in:active,inactive',
        ]);
    
        // تخزين الصورة في مجلد 'sliders'
        $imagePath = $request->file('image')->store('sliders', 'public');
        $slider = Slider::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $imagePath,
            'link' => $request->link,
            'status' => $request->status,
        ]);
    
        return response()->json($slider, 201);
    }

    public function show($id)
    {
        // عرض سلايدر محدد
        return response()->json(Slider::findOrFail($id));
    }

    public function update(Request $request, $id)
{
    $slider = Slider::findOrFail($id);

    $request->validate([
        'title' => 'sometimes|required|string|max:255',
        'content' => 'sometimes|required|string',
        'link' => 'sometimes|required|url',
        'status' => 'sometimes|required|in:active,inactive',
        'image' => 'sometimes|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    // تحديث الحقول
    $slider->update($request->only('title', 'content', 'link', 'status'));

    // إذا كانت هناك صورة جديدة
    if ($request->hasFile('image')) {
        if ($slider->image) {
            \Storage::disk('public')->delete($slider->image);
        }

        $imagePath = $request->file('image')->store('sliders', 'public');
        $slider->image = $imagePath;
    }

    $slider->save();

    return response()->json($slider);
}
    

    public function softDelete($id)
    {
        $slider = Slider::find($id);
    
        if (!$slider) {
            return response()->json(['message' => 'Slider not found'], 404);
        }
    
        $slider->delete(); 
        return response()->json(['message' => 'Slider deleted successfully']);
    }
}