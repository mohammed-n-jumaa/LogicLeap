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
        'location', 'image','modules',
        'what_youll_learn'
    ];
    protected $table = 'programs';
    
   // في ملف Program.php
public function category()
{
    return $this->belongsTo(Category::class, 'category_id');
}

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
    
}