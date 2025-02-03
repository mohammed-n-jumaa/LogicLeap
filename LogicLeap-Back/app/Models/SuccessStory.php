<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuccessStory extends Model
{
    use HasFactory, SoftDeletes;
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'name',
        'title',
        'content',
        'image',
        'status',
    ];
}