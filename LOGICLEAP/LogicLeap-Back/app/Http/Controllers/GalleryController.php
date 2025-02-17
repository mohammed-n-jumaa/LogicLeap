<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::all();
        return response()->json($galleries);
    }

    public function store(Request $request)
    {
        $request->validate([
            'program_id' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status' => 'required|in:active,inactive',
        ]);

        $imagePath = $request->file('image')->store('gallery', 'public');

        $gallery = Gallery::create([
            'program_id' => $request->program_id,
            'image_path' => $imagePath,
            'status' => $request->status,
        ]);

        return response()->json($gallery, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'program_id' => 'sometimes|integer',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status' => 'sometimes|in:active,inactive',
        ]);

        $gallery = Gallery::findOrFail($id);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($gallery->image_path);
            $imagePath = $request->file('image')->store('gallery', 'public');
            $gallery->image_path = $imagePath;
        }

        if ($request->has('program_id')) {
            $gallery->program_id = $request->program_id;
        }

        if ($request->has('status')) {
            $gallery->status = $request->status;
        }

        $gallery->save();

        return response()->json($gallery);
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();

        return response()->json(null, 204);
    }

    public function softDelete($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->status = 'inactive';
        $gallery->save();

        return response()->json(null, 204);
    }
}