<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gallery extends Model
{
    use SoftDeletes, HasFactory;
    
    protected $table = 'gallery';

    protected $fillable = [
        'program_id',
        'status'  // Removed image_path as it's now in GalleryImage model
    ];

    /**
     * Get the program that owns the gallery.
     */
    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * Get the images for the gallery.
     */
    public function images()  // Changed from GalleryImage to images for consistency
    {
        return $this->hasMany(GalleryImage::class);
    }
}