<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gallery;
use App\Models\GalleryImage;
use App\Models\Program;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class GalleryController extends Controller
{
    public function index()
    {
        try {
            $galleries = galleries::with(['program', 'images'])->get();
            
            $galleries = $galleries->map(function($galleries) {
                return [
                    'id' => $galleries->id,
                    'program_id' => $galleries->program_id,
                    'program_name' => $galleries->program ? $galleries->program->title : 'Unknown',
                    'images' => $gallery->images->map(function($image) {
                        return [
                            'id' => $image->id,
                            'image_path' => $image->image_path
                        ];
                    }),
                    'status' => $galleries->status,
                    'created_at' => $galleries->created_at,
                    'updated_at' => $galleries->updated_at
                ];
            });
            
            return response()->json($galleries);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
{
    try {
        $request->validate([
            'program_id' => 'required|exists:programs,id',
            'images' => 'required|array',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:active,inactive',
        ]);

        DB::beginTransaction();

        // تحقق أولاً إذا كانت هناك صور
        if (!$request->hasFile('images')) {
            return response()->json(['error' => 'No valid images provided'], 422);
        }

        // استخدم الإدراج المباشر مع تحديد image_path
        $firstImage = $request->file('images')[0];
        $firstImagePath = $firstImage->store('gallery', 'public');
        
        // استخدم الإدراج المباشر بأسلوب DB بدلاً من Eloquent create()
        $galleryId = DB::table('galleries')->insertGetId([
            'program_id' => $request->program_id,
            'status' => $request->status,
            'image_path' => $firstImagePath,
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        // أضف جميع الصور إلى جدول gallery_images
        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('gallery', 'public');
            GalleryImage::create([
                'gallery_id' => $galleryId,
                'image_path' => $imagePath
            ]);
        }
        
        DB::commit();
        
        // استعلم عن السجل المنشأ مع العلاقات
        $gallery = galleries::with(['program', 'images'])->find($galleryId);
        
        return response()->json([
            'id' => $gallery->id,
            'program_id' => $gallery->program_id,
            'program_name' => $gallery->program ? $gallery->program->title : 'Unknown',
            'images' => $gallery->images->map(function($image) {
                return [
                    'id' => $image->id,
                    'image_path' => $image->image_path
                ];
            }),
            'status' => $gallery->status,
            'created_at' => $gallery->created_at,
            'updated_at' => $gallery->updated_at
        ], 201);
        
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['error' => $e->getMessage()], 422);
    }
}

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'program_id' => 'required|exists:programs,id',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'status' => 'required|in:active,inactive',
                'delete_image_ids' => 'nullable|array',
                'delete_image_ids.*' => 'exists:gallery_images,id'
            ]);

            DB::beginTransaction();

            $gallery = galleries::findOrFail($id);
            $gallery->program_id = $request->program_id;
            $gallery->status = $request->status;
            $gallery->save();

            // Delete selected images
            if ($request->has('delete_image_ids')) {
                $imagesToDelete = GalleryImages::whereIn('id', $request->delete_image_ids)
                    ->where('gallery_id', $gallery->id)
                    ->get();

                foreach ($imagesToDelete as $image) {
                    if (Storage::disk('public')->exists($image->image_path)) {
                        Storage::disk('public')->delete($image->image_path);
                    }
                    $image->delete();
                }
            }

            // Add new images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('gallery', 'public');
                    GalleryImages::create([
                        'gallery_id' => $gallery->id,
                        'image_path' => $imagePath
                    ]);
                }
            }

            DB::commit();

            $gallery->load(['program', 'images']);
            
            return response()->json([
                'id' => $gallery->id,
                'program_id' => $gallery->program_id,
                'program_name' => $gallery->program ? $gallery->program->title : 'Unknown',
                'images' => $gallery->images->map(function($image) {
                    return [
                        'id' => $image->id,
                        'image_path' => $image->image_path
                    ];
                }),
                'status' => $gallery->status,
                'created_at' => $gallery->created_at,
                'updated_at' => $gallery->updated_at
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $gallery = galleries::findOrFail($id);

            // Delete all associated images
            foreach ($gallery->images as $image) {
                if (Storage::disk('public')->exists($image->image_path)) {
                    Storage::disk('public')->delete($image->image_path);
                }
            }

            $gallery->images()->delete();
            $gallery->delete();

            DB::commit();

            return response()->json(null, 204);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}