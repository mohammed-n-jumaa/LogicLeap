<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SuccessStory;
use Illuminate\Support\Facades\Storage;

class SuccessStoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SuccessStory::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'title' => 'required',
            'content' => 'required',
            'image' => 'image|nullable|max:1999',
            'status' => 'required|in:active,inactive',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $filename = time() . '_' . $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs('success_stories', $filename, 'public');
        }

        $story = SuccessStory::create([
            'name' => $request->name,
            'title' => $request->title,
            'content' => $request->content,
            'image' => $path,
            'status' => $request->status,
        ]);

        return response()->json($story, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $story = SuccessStory::findOrFail($id);
        return response()->json($story);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $story = SuccessStory::findOrFail($id);
        
        $validationRules = [
            'name' => 'required',
            'title' => 'required',
            'content' => 'required',
            'status' => 'required|in:active,inactive',
        ];
        
        if ($request->hasFile('image')) {
            $validationRules['image'] = 'image|max:1999';
        }
        
        $request->validate($validationRules);
        
        try {
            if ($request->hasFile('image')) {
                if ($story->image) {
                    Storage::disk('public')->delete($story->image);
                }
                $filename = time() . '_' . $request->file('image')->getClientOriginalName();
                $story->image = $request->file('image')->storeAs('success_stories', $filename, 'public');
            }
            
            $story->name = $request->name;
            $story->title = $request->title;
            $story->content = $request->content;
            $story->status = $request->status;
            $story->save();
            
            return response()->json($story);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
   public function softDelete($id)
    {
        $SuccessStory = SuccessStory::find($id);
    
        if (!$SuccessStory) {
            return response()->json(['message' => 'SuccessStory not found'], 404);
        }
    
        $SuccessStory->delete(); 
        return response()->json(['message' => 'SuccessStory deleted successfully']);
    }
}