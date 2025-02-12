<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Program extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'title', 'description', 'category_id', 'start_date', 'end_date', 
        'duration', 'cost', 'price', 'status', 'mode', 'zoom_link', 
        'location', 'image'
    ];
    protected $table = 'programs';
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
    
}