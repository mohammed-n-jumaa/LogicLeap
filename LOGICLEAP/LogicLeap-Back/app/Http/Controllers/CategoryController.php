<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return response()->json($category, 201);
    }

  
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if ($category) {
            $category->update([
                'name' => $request->name,
            ]);
            return response()->json($category, 200);
        }
        return response()->json(['message' => 'Category not found'], 404);
    }

  
    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category) {
            $category->delete();
            return response()->json(['message' => 'Category deleted'], 200);
        }
        return response()->json(['message' => 'Category not found'], 404);
    }
}
