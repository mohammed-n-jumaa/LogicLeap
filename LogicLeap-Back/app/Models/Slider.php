<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'title',
        'content',
        'image',
        'link',
        'status',
    ];
}